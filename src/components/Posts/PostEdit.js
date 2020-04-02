import React, { useState, useEffect, Fragment } from 'react'
import { Redirect } from 'react-router-dom'
import io from 'socket.io-client'

import apiUrl from '../../apiConfig'

import { showPost, updatePost } from '../../api/post'
import PostForm from '../shared/PostForm'

const PostEdit = props => {
  const [post, setPost] = useState({ title: '', text: '' })
  const [updated, setUpdated] = useState(null)

  const socket = io(apiUrl)
  socket.connect()

  useEffect(() => {
    showPost(props)
      .then(res => setPost(res.data.post))
      .then(() => props.msgAlert({
        heading: 'Retrieval Successful',
        message: 'Successfully retrieved a post',
        variant: 'success'
      }))
      .catch(error => {
        props.msgAlert({
          heading: 'Retrieving post Failed with error: ' + error.message,
          message: 'Retrieving post failed',
          variant: 'danger'
        })
      })
  }, [])

  const handleChange = event => {
    const updatedField = { [event.target.name]: event.target.value }
    const editedPost = Object.assign({ ...post }, updatedField)
    setPost(editedPost)
  }

  const handleSubmit = event => {
    event.preventDefault()

    updatePost(props, post)
      .then(res => {
        socket.emit('edited post', 'a post was edited')
        return res
      })
      .then(() => setUpdated(true))
      .then(() => props.msgAlert({
        heading: 'Edit Successful',
        message: 'Successfully edited a post',
        variant: 'success'
      }))
      .catch(error => {
        props.msgAlert({
          heading: 'Editing post Failed with error: ' + error.message,
          message: 'Editing post failed',
          variant: 'danger'
        })
      })
  }

  if (updated) {
    return <Redirect to={`/posts/${props.match.params.id}`} />
  }

  return (
    <Fragment>
      <PostForm
        post={post}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        cancelPath={`/posts/${props.match.params.id}`}
      />
    </Fragment>
  )
}

export default PostEdit
