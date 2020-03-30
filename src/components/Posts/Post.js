import React, { useState, useEffect } from 'react'
import { Link, Redirect } from 'react-router-dom'
import moment from 'moment'

import { showPost, destroyPost } from '../../api/post'

const Post = props => {
  const [post, setPost] = useState(null)
  const [deleted, setDeleted] = useState(false)

  useEffect(() => {
    showPost(props)
      .then(res => setPost(res.data.post))
      .catch(console.error)
  }, [])

  const destroy = () => {
    destroyPost(props)
      .then(() => setDeleted(true))
      .catch(console.error)
  }

  if (!post) {
    return <p>Loading...</p>
  }

  if (deleted) {
    return <Redirect to={
      { pathname: '/posts', state: { msg: 'Post succesfully deleted!' } }
    } />
  }

  return (
    <React.Fragment>
      <h4>{post.title}</h4>
      <p>{post.text}</p>
      <p>posted: {moment(post.createdAt, 'YYYYMMDD').fromNow()}</p>
      <button onClick={destroy}>Delete</button>
      <Link to={`/posts/${props.match.params.id}/edit`}>
        <button>Edit</button>
      </Link>
      <Link to='/posts'>Back to all posts</Link>
    </React.Fragment>
  )
}

export default Post
