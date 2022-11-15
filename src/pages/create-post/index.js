import React, { useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'
import CreateEditPost from 'components/CreateEditPost'

const CreatePostPage = ({ chain, dispatch }) => {
  useEffect(() => {
    dispatch({
      type: 'chain/SETUP',
    })
  }, [dispatch])
  return (
    <div>
      <Helmet title="Home" />
      {chain.cosmLoaded && chain.cosmWasmClient && <CreateEditPost editPost={false} />}
    </div>
  )
}

const mapStateToProps = ({ chain, dispatch }) => ({
  chain,
  dispatch,
})

export default connect(mapStateToProps)(CreatePostPage)
