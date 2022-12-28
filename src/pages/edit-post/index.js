import React from 'react'
import CreateEditPost from 'components/CreateEditPost'
import { useParams } from 'react-router-dom'

const EditPostPage = () => {
  const { id } = useParams()
  return (
    <div>
      <CreateEditPost editPost postId={id} />
    </div>
  )
}

export default EditPostPage
