import React, { useState, useEffect } from 'react'
import { Link, Redirect } from 'react-router-dom'
import moment from 'moment'

import { showPost, destroyPost } from '../../api/post'
import { likeCount, didLike, like, unlike } from '../../api/like'

const Post = props => {
  const [post, setPost] = useState(null)
  const [deleted, setDeleted] = useState(false)
  const [likeNum, setLikeNum] = useState(null)
  const [liked, setLiked] = useState(false)

  useEffect(() => {
    showPost(props)
      .then(res => setPost(res.data.post))
      .catch(console.error)
  }, [])

  useEffect(() => {
    likeCount(props, props.match.params.id)
      .then(res => setLikeNum(res.data.likeCount))
      .catch(console.error)
  }, [])

  useEffect(() => {
    didLike(props, props.match.params.id)
      .then(res => setLiked(res.data.liked))
      .then(() => console.log('got liked status', liked))
  }, [])

  const changeLike = () => {
    if (liked) {
      unlike(props, props.match.params.id)
        .then(() => setLiked(false))
        .then(() => {
          console.log('Created')
          didLike(props, props.match.params.id)
            .then(res => setLiked(res.data.liked))
            .then(() => {
              likeCount(props, props.match.params.id)
                .then(res => setLikeNum(res.data.likeCount))
                .catch(console.error)
            })
            .catch(console.error)
        })
        .catch(console.error)
    } else {
      console.log(props, props.match.params.id, 'we hit the else')
      like(props, props.match.params.id)
        .then(() => {
          setLiked(true)
          didLike(props, props.match.params.id)
            .then(res => setLiked(res.data.liked))
            .then(() => {
              likeCount(props, props.match.params.id)
                .then(res => setLikeNum(res.data.likeCount))
                .catch(console.error)
            })
            .catch(console.error)
        })
        .catch(console.error)
    }
  }

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
    <div>
      <h4>{post.title}</h4>
      <p>{post.text}</p>
      <p>posted: {moment(post.createdAt, 'YYYYMMDD').fromNow()}</p>
      <button className='btn btn-secondary' onClick={changeLike}>{liked ? 'Unlike' : 'Like'} {likeNum}</button>
      <button className='btn btn-danger' onClick={destroy}>Delete</button>
      <Link to={`/posts/${props.match.params.id}/edit`}>
        <button className='btn btn-primary'>Edit</button>
      </Link>
      <Link to='/posts'>Back to all posts</Link>
    </div>
  )
}

export default Post
