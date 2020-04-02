import React, { useEffect, Fragment } from 'react'
import { Link } from 'react-router-dom'
import useSocket from 'use-socket.io-client'
import { useImmer } from 'use-immer'

import apiUrl from '../../apiConfig'

import { indexMyPost } from '../../api/post'

const Posts = props => {
  // socket things
  const [socket] = useSocket(apiUrl)
  const [posts, setPosts] = useImmer([])
  socket.connect()

  // this use effect is for the socket
  useEffect(() => {
    socket.on('send', () => {
      indexMyPost(props)
        .then(res => setPosts(posts => [...res.data.posts]))
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
    })
  }, [])

  useEffect(() => {
    socket.on('send-delete-post', () => {
      indexMyPost(props)
        .then(res => setPosts(posts => [...res.data.posts]))
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
    })
  })

  useEffect(() => {
    socket.on('send-edited-post', () => {
      indexMyPost(props)
        .then(res => setPosts(posts => [...res.data.posts]))
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
    })
  })

  useEffect(() => {
    indexMyPost(props)
      .then(res => setPosts(posts => [...res.data.posts]))
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
        {posts.length > 0 ? postList : 'No Posts yet'}
      </ul>
    </Fragment>
  )
}

export default Posts
