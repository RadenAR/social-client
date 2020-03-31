import React, { useState, Fragment } from 'react'
import { Redirect } from 'react-router-dom'

import { createComment } from '../../api/comment'
import CommentForm from '../shared/CommentForm'

const CommentCreate = props => {
  const [comment, setComment] = useState({ title: '', text: '' })
  const [createdComment, setCreatedComment] = useState(false)

  const handleChange = event => {
    const updatedField = { [event.target.name]: event.target.value }
    const editedComment = Object.assign({ ...comment }, updatedField)
    setComment(editedComment)
  }

  const handleSubmit = event => {
    event.preventDefault()

    createComment(props, comment)
      .then(() => setCreatedComment(true))
      .catch(error => {
        props.msgAlert({
          heading: 'Create Comment Failed with error: ' + error.message,
          message: 'Creating a comment failed',
          variant: 'danger'
        })
      })
  }

  if (createdComment) {
    return <Redirect to={{ pathname: '/posts/' + props.match.params.id, state: { msg: 'Comment successfully created!' } }} />
  }

  return (
    <Fragment>
      <CommentForm
        comment={comment}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        cancelPath={'/posts/'}
      />
    </Fragment>
  )
}

export default CommentCreate
