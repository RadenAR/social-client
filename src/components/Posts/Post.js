import React, { useState, useEffect } from 'react'
// import { Link } from 'react-router-dom'
// import axios from 'axios'

// import apiUrl from '../../apiConfig'
import { indexPost } from '../../api/post'

const Posts = props => {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    indexPost(props.user)
      .then(res => setPosts(res.data.posts))
      .catch(console.error)
  }, [])

  const postList = posts.map(post => (
    <li key={post.id}>
      <h5>{post.title}</h5>
      <p>{post.text}</p>
    </li>
  ))

  return (
    <React.Fragment>
      <h4>Posts</h4>
      <ul>
        {postList}
      </ul>
    </React.Fragment>
  )
}

export default Posts
