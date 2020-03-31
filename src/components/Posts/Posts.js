import React, { useState, useEffect, Fragment } from 'react'
import { Link } from 'react-router-dom'

import { indexPost } from '../../api/post'

const Posts = props => {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    indexPost(props)
      .then(res => setPosts(res.data.posts))
      .then(() => props.msgAlert({
        heading: 'Posts available',
        message: 'Successfully retrieved Posts',
        variant: 'success'
      }))
      .catch(error => {
        props.msgAlert({
          heading: 'Retrieving posts Failed with error: ' + error.message,
          message: 'Retrieving posts failed',
          variant: 'danger'
        })
      })
  }, [])

  const postList = posts.map(post => (
    <li key={post._id}>
      <Link to={`/posts/${post._id}`}>{post.title}</Link>
      <p>{post.text}</p>
    </li>
  ))

  return (
    <Fragment>
      <h4>Posts</h4>
      <ul>
        {postList}
      </ul>
    </Fragment>
  )
}

export default Posts
