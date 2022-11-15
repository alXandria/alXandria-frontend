import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { SigningCosmWasmClient } from '@cosmjs/cosmwasm-stargate'
import { Button, Form, Input, Select, Spin } from 'antd'
import { GasPrice, calculateFee, coin } from '@cosmjs/stargate'
import { history, persistor } from 'index'
import { convertToRaw, EditorState } from 'draft-js'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import draftToHtml from 'draftjs-to-html'
import { create } from 'ipfs-http-client'
import { Editor } from 'react-draft-wysiwyg'
import style from './style.module.scss'
import { useParams } from 'react-router-dom'

// const ipfsClient = require('ipfs-http-client')

const EditPost = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty())
  const projectId = '2FRmPwD9JmHkoFHE1g9BY2uUNab'
  const projectSecret = 'bea29c4ba48440ee676802b921504c65'
  // const authorization = `Basic ${btoa(projectId)}:${projectSecret}`
  const authorization = `Basic ${Buffer.from(`${projectId}:${projectSecret}`).toString('base64')}`
  const [loading, setLoading] = useState(false)
  const [loadingTitle, setLoadingTitle] = useState('Loading...')
  const { id } = useParams()

  const ChainInfo = {
    chainId: 'uni-5',
    chainName: 'juno testnet',
    rpc: 'https://rpc.uni.junonetwork.io',
    rest: 'https://api.uni.junonetwork.io',
    bip44: {
      coinType: 118,
    },
    bech32Config: {
      bech32PrefixAccAddr: 'juno',
      bech32PrefixAccPub: 'junopub',
      bech32PrefixValAddr: 'junovaloper',
      bech32PrefixValPub: 'junovaloperpub',
      bech32PrefixConsAddr: 'junovalcons',
      bech32PrefixConsPub: 'junovalconspub',
    },
    currencies: [
      {
        coinDenom: 'JUNOX',
        coinMinimalDenom: 'ujunox',
        coinDecimals: 6,
        coinGeckoId: 'JUNOX',
      },
    ],
    feeCurrencies: [
      {
        coinDenom: 'JUNOX',
        coinMinimalDenom: 'ujunox',
        coinDecimals: 6,
        coinGeckoId: 'JUNOX',
      },
    ],
    stakeCurrency: {
      coinDenom: 'JUNOX',
      coinMinimalDenom: 'ujunox',
      coinDecimals: 6,
      coinGeckoId: 'JUNOX',
    },
    coinType: 118,
    gasPriceStep: {
      low: 0.01,
      average: 0.025,
      high: 0.03,
    },
  }

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
    console.log(finalHtmlContent)

    const request = {
      content: finalHtmlContent,
      sideContent: values.sideContent,
    }

    console.log(JSON.stringify(request))
    console.log(new File([JSON.stringify(request)], 'some.txt', { type: 'text/plain' }))

    const file = new File([JSON.stringify(request)], 'some.txt', { type: 'text/plain' })
    const result = await ipfs.add(file)
    if (result.path) {
      setLoadingTitle('Creating Post in Blockchain...')
      createPost(result.path, values)
    }
  }

  useEffect(() => {
    persistor.purge()
    localStorage.clear()
  }, [])

  const createPost = async (externalId, postDetails) => {
    if (window.keplr) {
      if (window.keplr.experimentalSuggestChain) {
        await window.keplr.experimentalSuggestChain(ChainInfo)
        await window.keplr.enable(ChainInfo.chainId)
        const offlineSigner = await window.getOfflineSigner(ChainInfo.chainId)
        const CosmWasmClient = await SigningCosmWasmClient.connectWithSigner(
          ChainInfo.rpc,
          offlineSigner,
        )

        // This async waits for the user to authorize your dApp
        // it returns their account address only after permissions
        // to read that address are granted
        const accounts = await offlineSigner.getAccounts()

        const queryHandler = CosmWasmClient.queryClient.wasm.queryContractSmart
        // Gas price
        const gasPrice = GasPrice.fromString('0.002ujunox')

        console.log('Wallet connected', {
          offlineSigner,
          CosmWasmClient,
          accounts,
          ChainInfo,
          queryHandler,
          gasPrice,
        })

        const ContractAddress = 'juno1apd88gqrqms48n3nvkcnxsttt86w02syk4n4t9we0sadqwh9x46sevje08'
        // Query arguments
        const entrypoint = {
          create_post: {
            post_title: postDetails.title,
            external_id: `https://alxandria.infura-ipfs.io/ipfs/${externalId}`,
            text: postDetails.shortDescription,
            tags: postDetails.tags,
          },
        }
        // Gas fee estimation
        const txFee = calculateFee(200000, gasPrice)
        // Send Tx
        const tx = await CosmWasmClient.execute(
          accounts[0].address,
          ContractAddress,
          entrypoint,
          txFee,
          '',
          [coin(1000000, 'ujunox')],
        )
        console.log('Increment Tx', tx)
        history.push('/')
        setLoading(false)
      } else {
        console.warn('Error accessing experimental features, please update Keplr')
      }
    } else {
      console.warn('Error accessing Keplr, please install Keplr')
    }
  }

  const onFinish = async (value) => {
    console.log(value)
    setLoading(true)
    setLoadingTitle('Saving to IPFS....')
    await submitValueToIPFS(value)
  }

  return (
    <Spin spinning={loading} tip={loadingTitle}>
      <div className={`${style.background}`}>
        <div className="container">
          <div className="row mb-5">
            <div className="col-12 text-left">
              <h4>New Post</h4>
            </div>
          </div>
          <Form name="control-ref" onFinish={onFinish} layout="vertical" requiredMark={false}>
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
                          <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
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
                  Submit
                </Button>
                <Button htmlType="button">Reset</Button>
              </div>
            </div>
          </Form>

          {/* <textarea disabled value={draftToHtml(convertToRaw(editorState.getCurrentContent()))} /> */}
          {/* <Divider /> */}
          {/* <Button onClick={() => submitValueToIPFS()}>Create IPFS Content</Button>
          <Button onClick={() => createPost()}>Create Post</Button> */}
        </div>
      </div>
    </Spin>
  )
}

const mapStateToProps = ({ user, chain, dispatch }) => ({
  dispatch,
  user,
  chain,
})
export default connect(mapStateToProps)(EditPost)
