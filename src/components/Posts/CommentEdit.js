import React, { useState, useEffect, Fragment } from 'react'
import { Redirect } from 'react-router-dom'
import useSocket from 'use-socket.io-client'

import apiUrl from '../../apiConfig'

import { showComment, updateComment } from '../../api/comment'
import CommentForm from '../shared/CommentForm'

const CommentEdit = props => {
  const [comment, setComment] = useState({ title: '', text: '' })
  const [updated, setUpdated] = useState(null)

  const [socket] = useSocket(apiUrl)
  socket.connect()

  useEffect(() => {
    showComment(props)
      .then(res => setComment(res.data.comment))
      .then(() => props.msgAlert({
        heading: 'Retrieval Successful',
        message: 'Successfully retrieved a comment',
        variant: 'success'
      }))
      .catch(error => {
        props.msgAlert({
          heading: 'Retrieving comment Failed with error: ' + error.message,
          message: 'Retrieving comment failed',
          variant: 'danger'
        })
      })
  }, [])

  const handleChange = event => {
    const updatedField = { [event.target.name]: event.target.value }
    const editedComment = Object.assign({ ...comment }, updatedField)
    setComment(editedComment)
  }

  const handleSubmit = event => {
    event.preventDefault()

    updateComment(props, comment)
      .then(res => {
        socket.emit('edited comment', 'a post was edited')
        return res
      })
      .then(() => setUpdated(true))
      .then(() => props.msgAlert({
        heading: 'Edit Successful',
        message: 'Successfully edited a comment',
        variant: 'success'
      }))
      .catch(error => {
        props.msgAlert({
          heading: 'Editing comment Failed with error: ' + error.message,
          message: 'Editing comment failed',
          variant: 'danger'
        })
      })
  }

  if (updated) {
    return <Redirect to={`/posts/${props.match.params.id}`} />
  }

  return (
    <Fragment>
      <CommentForm
        comment={comment}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        cancelPath={`/posts/${props.match.params.id}`}
      />
    </Fragment>
  )
}

export default CommentEdit
