import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Button, Divider, notification, Tag } from 'antd'
import { calculateFee, coin, GasPrice } from '@cosmjs/stargate'
import Swal from 'sweetalert2'
import Helmet from 'react-helmet'
import { useParams } from 'react-router-dom'
import { history } from 'index'
import style from './style.module.scss'

const PostPage = ({ chain }) => {
  const [postDetails, setPostDetails] = useState([])
  const [postContent, setPostContent] = useState()
  const [heroImage, setHeroImage] = useState()
  const [postSideContent, setPostSideContent] = useState([])
  const { id } = useParams()

  useEffect(() => {
    const onConnect = async () => {
      if (
        chain &&
        chain.cosmWasmClient &&
        chain.cosmWasmClient.queryClient &&
        chain.cosmWasmClient.queryClient.wasm.queryContractSmart
      ) {
        const singlePost = { post: { post_id: Number(id) } }
        // Do query type 'smart'
        console.log(chain.cosmWasmClient)
        const queryResult = await chain.cosmWasmClient.queryClient.wasm.queryContractSmart(
          process.env.REACT_APP_CONTRACT_ADDR,
          singlePost,
        )
        setPostDetails(queryResult.post)
        console.log(queryResult.post)
        fetch(`${queryResult.post.external_id}`).then((r) => {
          r.text().then((d) => {
            const result = JSON.parse(d)
            setPostSideContent(result.sideContent)
            setPostContent(result.content)
            setHeroImage(result.heroImage)
          })
        })
      }
    }

    onConnect()
  }, [chain, id])

  const convertTime = (alxTimeTime) => {
    if (alxTimeTime) {
      const splitTime = alxTimeTime.split('.')
      const timestamp = splitTime[0]
      const date = new Date(Number(timestamp) * 1000)
      return `${date.toLocaleDateString('en-US')}, ${date.toLocaleTimeString('en-US')}`
    }
    return ''
  }

  const editPost = () => {
    history.push(`/post/edit/${id}`)
  }

  const deletePost = async () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this delete!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#832C21',
      cancelButtonColor: '#cdcdcd',
      confirmButtonText: 'Yes, delete this post!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const entrypoint = {
            delete_post: {
              post_id: Number(id),
            },
          }
          // Gas fee estimation

          const gasPrice = GasPrice.fromString(`500${process.env.REACT_APP_COIN_MIN_DENOM}`)
          const txFee = calculateFee(200000, gasPrice)
          // Send Tx

          const accounts = await chain.offlineSigner.getAccounts()

          await chain.cosmWasmClient.execute(
            accounts[0].address,
            process.env.REACT_APP_CONTRACT_ADDR,
            entrypoint,
            txFee,
            '',
            [coin(process.env.REACT_APP_DELETE_FEE, process.env.REACT_APP_COIN_MIN_DENOM)],
          )
          notification.success({
            error: 'Post has been deleted successfully!',
          })
          history.push('/')
        } catch (error) {
          notification.error({
            message: `Error deleting - ${error}`,
          })
        }
      }
    })
  }

  const likePost = async () => {
    if (chain.user) {
      const gasPrice = GasPrice.fromString(`500${process.env.REACT_APP_COIN_MIN_DENOM}`)
      const txFee = calculateFee(200000, gasPrice)

      const accounts = await chain.offlineSigner.getAccounts()
      const likePostRequest = { like_post: { post_id: Number(id) } }

      try {
        await chain.cosmWasmClient.execute(
          accounts[0].address,
          process.env.REACT_APP_CONTRACT_ADDR,
          likePostRequest,
          txFee,
          '',
          [coin(process.env.REACT_APP_LIKE_FEE, process.env.REACT_APP_COIN_MIN_DENOM)],
        )
        notification.success({
          message: 'You liked this post!',
        })

        if (
          chain &&
          chain.cosmWasmClient &&
          chain.cosmWasmClient.queryClient &&
          chain.cosmWasmClient.queryClient.wasm.queryContractSmart
        ) {
          const singlePost = { post: { post_id: Number(id) } }
          // Do query type 'smart'
          console.log(chain.cosmWasmClient)
          const queryResult = await chain.cosmWasmClient.queryClient.wasm.queryContractSmart(
            process.env.REACT_APP_CONTRACT_ADDR,
            singlePost,
          )
          setPostDetails(queryResult.post)
          console.log(queryResult.post)
          fetch(`${queryResult.post.external_id}`).then((r) => {
            r.text().then((d) => {
              const result = JSON.parse(d)
              setPostSideContent(result.sideContent)
              setPostContent(result.content)
              setHeroImage(result.heroImage)
            })
          })
        }
      } catch (error) {
        console.log(error)
        notification.error({
          message: 'Error Occurred!',
        })
      }
    } else {
      notification.error({
        message: 'Please Connect the wallet to like the post!',
      })
    }
  }

  return (
    <>
      <Helmet title={`${postDetails.post_title}`} />
      <div className={`${style.background}`}>
        <div className="container">
          {postDetails && (
            <div className="row">
              <div className="col-md-10 text-left">
                <h1 style={{ fontWeight: 'bold' }}>{postDetails.post_title}</h1>
                <div className="mt-2">{postDetails.text}</div>
              </div>
              <div className="col-md-2 text-right">
                <div>
                  <button className={style.button} type="button" onClick={() => likePost()}>
                    <span role="img" aria-label="Confretti">
                      🎉
                    </span>
                    <span>Like</span>
                    {postDetails.likes}
                  </button>
                </div>
              </div>
              <Divider />
              <div className="col-md-12">
                {(postSideContent.length > 0 || heroImage) && (
                  <div className={style.sideContent}>
                    <div className={`${style.sideContentContainer} container-full`}>
                      <div className="row">
                        <div className="col-md-12 text-center mb-3">
                          <div className={style.postTitleSidebar}>{postDetails.post_title}</div>
                        </div>
                        {heroImage && (
                          <>
                            <div className="col-md-12">
                              <Divider className="mt-1" />
                            </div>
                            <div className="col-md-12 mb-3" style={{ textAlign: 'center' }}>
                              <img
                                src={heroImage}
                                alt="hero"
                                style={{ maxWidth: 200, maxHeight: 200 }}
                              />
                            </div>
                          </>
                        )}
                        <div className="col-md-12">
                          <Divider className={style.lessBorder} />
                        </div>
                      </div>
                      {postSideContent &&
                        postSideContent.map((pair, index) => {
                          return (
                            <div key={index}>
                              <div className="row">
                                <div className="col-md-6">{pair.subtitle}</div>
                                <div className="col-md-6" style={{ overflowWrap: 'break-word' }}>
                                  {pair.value}
                                </div>
                              </div>
                              {/* <Divider /> */}
                            </div>
                          )
                        })}
                    </div>
                  </div>
                )}
                <div dangerouslySetInnerHTML={{ __html: postContent }} className="post-details" />
              </div>
              <Divider />
              {postDetails && postDetails.tags && postDetails.tags.length > 0 && (
                <div className="col-md-12">
                  {postDetails.tags.map((tag, index) => (
                    <Tag color="orange" key={index}>
                      {tag}
                    </Tag>
                  ))}
                </div>
              )}
              <Divider />
              <div className="col-md-12 mt-3 mb-3">
                <span>{postDetails.author}</span>
                <br />
                <span>{convertTime(postDetails.creation_date)}</span>
              </div>
              <Divider />
              {chain.user && (
                <div className="col-md-12">
                  <Button onClick={() => editPost()} type="primary" className="mr-3">
                    Edit Post
                  </Button>
                  <Button onClick={() => deletePost()} type="dashed">
                    Delete Post
                  </Button>
                </div>
              )}
              <div className="col-12 text-center">
                <Divider />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

const mapStateToProps = ({ user, chain, dispatch }) => ({
  dispatch,
  user,
  chain,
})
export default connect(mapStateToProps)(PostPage)
