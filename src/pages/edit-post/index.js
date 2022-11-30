import React from 'react'
import { Helmet } from 'react-helmet'
import CreateEditPost from 'components/CreateEditPost'
import { useParams } from 'react-router-dom'

const EditPostPage = () => {
  const { id } = useParams()
  return (
    <div>
      <Helmet title="Edit Post Page" />
      <CreateEditPost editPost postId={id} />
    </div>
  )
}

export default EditPostPage
