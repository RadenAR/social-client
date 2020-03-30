import React, { useState, Fragment } from 'react'
import { Redirect } from 'react-router-dom'

import { createPost } from '../../api/post'
import PostForm from '../shared/PostForm'

const PostCreate = props => {
  const [post, setPost] = useState({ title: '', text: '' })
  const [createdPostId, setCreatedPostId] = useState(null)

  const handleChange = event => {
    const updatedField = { [event.target.name]: event.target.value }
    const editedPost = Object.assign({ ...post }, updatedField)
    setPost(editedPost)
  }

  const handleSubmit = event => {
    event.preventDefault()

    createPost(props, post)
      .then(res => setCreatedPostId(res.data.post._id))
      .catch(console.error)
  }

  if (createdPostId) {
    return <Redirect to={`/posts/${createdPostId}`} />
  }

  return (
    <Fragment>
      <PostForm
        post={post}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        cancelPath='/posts'
      />
    </Fragment>
  )
}

export default PostCreate
