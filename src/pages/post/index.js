import React, { useEffect } from 'react'
import { Helmet } from 'react-helmet'
import PostPage from 'components/PostPage'
import { connect } from 'react-redux'

const Post = ({ chain, dispatch }) => {
  useEffect(() => {
    dispatch({
      type: 'chain/SETUP',
    })
  }, [dispatch])

  return (
    <div>
      <Helmet title="Post" />
      {chain.cosmLoaded && chain.cosmWasmClient && <PostPage />}
    </div>
  )
}

const mapStateToProps = ({ chain, dispatch }) => ({
  chain,
  dispatch,
})

export default connect(mapStateToProps)(Post)
