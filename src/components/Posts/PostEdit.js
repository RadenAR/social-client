import React, { useState, useEffect, Fragment } from 'react'
import { Redirect } from 'react-router-dom'

import { showPost, updatePost } from '../../api/post'
import PostForm from '../shared/PostForm'

const PostEdit = props => {
  const [post, setPost] = useState({ title: '', text: '' })
  const [updated, setUpdated] = useState(null)

  useEffect(() => {
    showPost(props)
      .then(res => setPost(res.data.post))
      .catch(console.error)
  }, [])

  const handleChange = event => {
    const updatedField = { [event.target.name]: event.target.value }
    const editedPost = Object.assign({ ...post }, updatedField)
    setPost(editedPost)
  }

  const handleSubmit = event => {
    event.preventDefault()

    updatePost(props, post)
      .then(() => setUpdated(true))
      .catch(console.error)
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
