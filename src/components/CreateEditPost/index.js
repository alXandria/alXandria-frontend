import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Button, Divider, Form, Input, message, notification, Select, Spin, Upload } from 'antd'
import { GasPrice, calculateFee, coin } from '@cosmjs/stargate'
import { history } from 'index'
import { convertToRaw, EditorState, ContentState, convertFromHTML } from 'draft-js'
import { LoadingOutlined, MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { create } from 'ipfs-http-client'
import draftToHtml from 'draftjs-to-html'
import { Editor } from 'react-draft-wysiwyg'
import style from './style.module.scss'

// const ipfsClient = require('ipfs-http-client')

const CreateEditPost = ({ editPost = false, postId = null, chain }) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty())
  // const authorization = `Basic ${btoa(projectId)}:${projectSecret}`
  const authorization = `Basic ${Buffer.from(
    `${process.env.REACT_APP_INFURA_PROJECT_ID}:${process.env.REACT_APP_INFURA_PROJECT_SECRET}`,
  ).toString('base64')}`
  const [loading, setLoading] = useState(false)
  const [loadingTitle, setLoadingTitle] = useState('Loading...')
  const [postDetails, setPostDetails] = useState([])
  const [postSideContent, setPostSideContent] = useState([])
  const [postImage, setPostImage] = useState(null)
  const [editLoading, setEditLoading] = useState(editPost)

  let ipfs
  try {
    ipfs = create({
      url: 'https://ipfs.infura.io:5001/api/v0',
      headers: {
        authorization,
      },
    })
  } catch (error) {
    console.error('IPFS error ', error)
    ipfs = undefined
  }

  const submitValueToIPFS = async (values) => {
    const finalHtmlContent = `
      ${draftToHtml(convertToRaw(editorState.getCurrentContent()))}
    `
    const request = {
      content: finalHtmlContent,
      sideContent: values.sideContent,
      heroImage: imageUrl,
    }

    const file = new File([JSON.stringify(request)], 'some.txt', { type: 'text/plain' })
    const result = await ipfs.add(file)
    if (result.path) {
      setLoadingTitle(` ${editPost ? 'Editing' : 'Creating'} Post in Blockchain...`)
      managePost(result.path, values)
    }
  }

  const customContentStateConverter = (contentState) => {
    // changes block type of images to 'atomic'
    const newBlockMap = contentState.getBlockMap().map((block) => {
      const entityKey = block.getEntityAt(0)
      if (entityKey !== null) {
        const entityBlock = contentState.getEntity(entityKey)
        const entityType = entityBlock.getType()
        switch (entityType) {
          case 'IMAGE': {
            const newBlock = block.merge({
              type: 'atomic',
              text: 'img',
            })
            return newBlock
          }
          default:
            return block
        }
      }
      return block
    })
    const newContentState = contentState.set('blockMap', newBlockMap)
    return newContentState
  }

  useEffect(() => {
    if (editPost) {
      const getPostDetails = async () => {
        setEditLoading(true)
        // Query arguments
        const singlePost = { post: { post_id: Number(postId) } }
        // Do query type 'smart'
        const queryResult = await chain.cosmWasmClient.queryClient.wasm.queryContractSmart(
          process.env.REACT_APP_CONTRACT_ADDR,
          singlePost,
        )

        setPostDetails(queryResult.post)
        await fetch(`${queryResult.post.external_id}`).then((r) => {
          r.text().then((d) => {
            const result = JSON.parse(d)
            setPostSideContent(result.sideContent)
            setPostImage(result.heroImage)

            const blocksFromHTML = convertFromHTML(result.content)
            const state = ContentState.createFromBlockArray(
              blocksFromHTML.contentBlocks,
              blocksFromHTML.entityMap,
            )
            setEditorState(EditorState.createWithContent(customContentStateConverter(state)))
            setEditLoading(false)
          })
        })
      }

      getPostDetails()
    }
  }, [editPost, postId, chain.cosmWasmClient])

  const managePost = async (externalId, postInfo) => {
    const gasPrice = GasPrice.fromString(`0.002${process.env.REACT_APP_COIN_MIN_DENOM}`)
    const txFee = calculateFee(200000, gasPrice)
    const accounts = await chain.offlineSigner.getAccounts()
    if (editPost) {
      const entrypoint = {
        edit_post: {
          post_id: Number(postId),
          external_id: `${process.env.REACT_APP_INFURA_ENDPOINT}/${externalId}`,
          text: postInfo.shortDescription,
          tags: postInfo.tags,
        },
      }

      try {
        await chain.cosmWasmClient.execute(
          accounts[0].address,
          process.env.REACT_APP_CONTRACT_ADDR,
          entrypoint,
          txFee,
          '',
          [coin(2000000, process.env.REACT_APP_COIN_MIN_DENOM)],
        )
        notification.success({ message: 'The post has been edited' })
        history.push('/')
      } catch (error) {
        console.log(error)
        notification.error({ message: 'Error editing post, make sure you have 2junox' })
      }
      setLoading(false)
    } else {
      // create
      const entrypoint = {
        create_post: {
          post_title: postInfo.title,
          external_id: `${process.env.REACT_APP_INFURA_ENDPOINT}/${externalId}`,
          text: postInfo.shortDescription,
          tags: postInfo.tags,
        },
      }

      try {
        await chain.cosmWasmClient.execute(
          accounts[0].address,
          process.env.REACT_APP_CONTRACT_ADDR,
          entrypoint,
          txFee,
          '',
          [coin(1000000, process.env.REACT_APP_COIN_MIN_DENOM)],
        )
        notification.success({ message: 'The post has been created' })
        history.push('/')
        setLoading(false)
      } catch (error) {
        console.log(error)
        notification.error({
          message: 'Error Creating Post, Make sure you have enough Juno to create a post!',
        })
        setLoading(false)
      }
    }
  }

  const onFinish = async (value) => {
    setLoading(true)
    setLoadingTitle('Saving to IPFS....')
    await submitValueToIPFS(value)
  }

  const getBase64 = (img, callback) => {
    const reader = new FileReader()
    reader.addEventListener('load', () => callback(reader.result))
    reader.readAsDataURL(img)
  }

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!')
    }
    const isLt2M = file.size / 1024 / 1024 < 2
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!')
    }
    return isJpgOrPng && isLt2M
  }

  const [imageLoading, setImageLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState()
  const handleChange = (info) => {
    console.log(info)
    if (info.file.status === 'uploading') {
      setImageLoading(true)
      getBase64(info.file.originFileObj, (url) => {
        setImageLoading(false)
        console.log(url)
        setImageUrl(url)
      })
    }
  }
  const uploadButton = (
    <div>
      {imageLoading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  )

  const dummyRequest = ({ file, onSuccess }) => {
    console.log(file)
    setTimeout(() => {
      onSuccess('ok')
    }, 0)
  }

  return (
    <Spin spinning={loading} tip={loadingTitle}>
      {!editLoading && (
        <div className={`${style.background}`}>
          <div className="container">
            <div className="row">
              <div className="col-12 text-left">
                <h2>{editPost ? 'Edit Post' : 'New Post'}</h2>
              </div>
            </div>
            <Divider />
            <Form
              name="control-ref"
              onFinish={onFinish}
              layout="vertical"
              requiredMark={false}
              initialValues={{
                title: editPost ? postDetails.post_title : '',
                shortDescription: editPost ? postDetails.text : '',
                tags: editPost ? postDetails.tags : [],
                sideContent: editPost ? postSideContent : [],
              }}
            >
              <div className="row">
                <div className="col-md-6 col-sm-12">
                  <Form.Item
                    name="title"
                    label="Title"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 col-sm-12">
                  <Form.Item
                    name="shortDescription"
                    label="Short Description"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 col-sm-12">
                  <Form.Item name="hero-image" label="Post Image">
                    <Upload
                      name="postImage"
                      listType="picture-card"
                      className="avatar-uploader"
                      showUploadList={false}
                      beforeUpload={beforeUpload}
                      onChange={handleChange}
                      customRequest={dummyRequest}
                    >
                      {imageUrl || postImage ? (
                        <img
                          src={!imageUrl ? postImage : imageUrl}
                          alt="avatar"
                          style={{
                            width: '100%',
                          }}
                        />
                      ) : (
                        uploadButton
                      )}
                    </Upload>
                  </Form.Item>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 col-sm-12">
                  <Form.Item
                    name="tags"
                    label="Tags"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Select
                      mode="tags"
                      style={{
                        width: '100%',
                      }}
                      placeholder="Select Tags"
                    />
                  </Form.Item>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12 mb-2">Side Content</div>
                <div className="col-md-12">
                  <Form.List name="sideContent">
                    {(fields, { add, remove }) => (
                      <>
                        {fields.map(({ key, name, ...restField }) => (
                          <div className="row" key={key}>
                            <div className="col-md-4">
                              <Form.Item
                                {...restField}
                                name={[name, 'subtitle']}
                                rules={[
                                  {
                                    required: true,
                                    message: 'Missing Subtitle name',
                                  },
                                ]}
                              >
                                <Input placeholder="Subtitle Name" />
                              </Form.Item>
                            </div>
                            <div className="col-md-4">
                              <Form.Item
                                {...restField}
                                name={[name, 'value']}
                                rules={[
                                  {
                                    required: true,
                                    message: 'Missing value',
                                  },
                                ]}
                              >
                                <Input placeholder="Value" />
                              </Form.Item>
                            </div>
                            <div className="col-md-4">
                              <MinusCircleOutlined onClick={() => remove(name)} />
                            </div>
                          </div>
                        ))}
                        <div className="col-md-6">
                          <Form.Item>
                            <Button
                              type="dashed"
                              onClick={() => add()}
                              block
                              icon={<PlusOutlined />}
                            >
                              Add Side Content
                            </Button>
                          </Form.Item>
                        </div>
                      </>
                    )}
                  </Form.List>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12 mb-2">Content</div>
                <div className="col-md-12">
                  <Editor
                    editorState={editorState}
                    wrapperClassName="demo-wrapper"
                    editorClassName={style.editor}
                    onEditorStateChange={(value) => setEditorState(value)}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <Button type="primary" htmlType="submit" className="mt-3 mr-3">
                    {editPost ? 'Edit' : 'Create'}
                  </Button>
                </div>
              </div>
            </Form>

            {/* <textarea disabled value={draftToHtml(convertToRaw(editorState.getCurrentContent()))} /> */}
            {/* <Divider /> */}
            {/* <Button onClick={() => submitValueToIPFS()}>Create IPFS Content</Button>
          <Button onClick={() => createPost()}>Create Post</Button> */}
          </div>
        </div>
      )}
    </Spin>
  )
}

const mapStateToProps = ({ user, chain, dispatch }) => ({
  dispatch,
  user,
  chain,
})
export default connect(mapStateToProps)(CreateEditPost)
