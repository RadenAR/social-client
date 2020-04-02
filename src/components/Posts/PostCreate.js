import React, { useState, Fragment } from 'react'
import { Redirect } from 'react-router-dom'
import io from 'socket.io-client'

import apiUrl from '../../apiConfig'

import { createPost } from '../../api/post'
import PostForm from '../shared/PostForm'

const PostCreate = props => {
  const [post, setPost] = useState({ title: '', text: '' })
  const [createdPostId, setCreatedPostId] = useState(null)

  const socket = io(apiUrl)
  socket.connect()

  const handleChange = event => {
    const updatedField = { [event.target.name]: event.target.value }
    const editedPost = Object.assign({ ...post }, updatedField)
    setPost(editedPost)
  }

  const handleSubmit = event => {
    event.preventDefault()

    createPost(props, post)
      .then(res => {
        socket.emit('new post', 'a new post was sent')
        return res
      })
      .then(res => setCreatedPostId(res.data.post._id))
      .then(() => props.msgAlert({
        heading: 'Create Successful',
        message: 'Successfully created a post',
        variant: 'success'
      }))
      .catch(error => {
        props.msgAlert({
          heading: 'Creating post Failed with error: ' + error.message,
          message: 'Creating post failed',
          variant: 'danger'
        })
      })
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
