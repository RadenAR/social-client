import React, { useState, useEffect } from 'react'
import { Link, Redirect } from 'react-router-dom'
import moment from 'moment'
import io from 'socket.io-client'

import apiUrl from '../../apiConfig'

import { showPost, destroyPost } from '../../api/post'
import { likeCount, didLike, like, unlike } from '../../api/like'
import { indexComments, deleteComment } from '../../api/comment'

const Post = props => {
  const [post, setPost] = useState(null)
  const [deleted, setDeleted] = useState(false)
  const [likeNum, setLikeNum] = useState(null)
  const [liked, setLiked] = useState(false)
  const [comments, setComments] = useState([])

  const socket = io(apiUrl)
  socket.connect()

  // Comment axios calls
  useEffect(() => {
    indexComments(props)
      .then(res => setComments(res.data.comments))
      .then(() => props.msgAlert({
        heading: 'Comments available',
        message: 'Successfully retrieved comments',
        variant: 'success'
      }))
      .catch(error => {
        props.msgAlert({
          heading: 'Retrieving Comments Failed with error: ' + error.message,
          message: 'Retrieving comments failed',
          variant: 'danger'
        })
      })
  }, [])

  // Post axios calls
  useEffect(() => {
    showPost(props)
      .then(res => setPost(res.data.post))
      .then(() => props.msgAlert({
        heading: 'Post available',
        message: 'Successfully retrieved Post',
        variant: 'success'
      }))
      .catch(error => {
        props.msgAlert({
          heading: 'Getting Post Failed with error: ' + error.message,
          message: 'Getting a post failed',
          variant: 'danger'
        })
      })
  }, [])

  // with socket
  useEffect(() => {
    socket.on('send-edited-post', () => {
      showPost(props)
        .then(res => setPost(res.data.post))
        .then(() => props.msgAlert({
          heading: 'Post available',
          message: 'Successfully retrieved Post',
          variant: 'success'
        }))
        .catch(error => {
          props.msgAlert({
            heading: 'Getting Post Failed with error: ' + error.message,
            message: 'Getting a post failed',
            variant: 'danger'
          })
        })
    })
  }, [])

  useEffect(() => {
    socket.on('send-comment-deleted', () => {
      indexComments(props)
        .then(res => setComments(res.data.comments))
        .then(() => props.msgAlert({
          heading: 'Comments available',
          message: 'Successfully retrieved comments',
          variant: 'success'
        }))
        .catch(error => {
          props.msgAlert({
            heading: 'Retrieving Comments Failed with error: ' + error.message,
            message: 'Retrieving comments failed',
            variant: 'danger'
          })
        })
    })
  }, [])

  useEffect(() => {
    socket.on('send-comment-edit', () => {
      indexComments(props)
        .then(res => setComments(res.data.comments))
        .then(() => props.msgAlert({
          heading: 'Comments available',
          message: 'Successfully retrieved comments',
          variant: 'success'
        }))
        .catch(error => {
          props.msgAlert({
            heading: 'Retrieving Comments Failed with error: ' + error.message,
            message: 'Retrieving comments failed',
            variant: 'danger'
          })
        })
    })
  }, [])

  useEffect(() => {
    socket.on('send-comment', () => {
      indexComments(props)
        .then(res => setComments(res.data.comments))
        .then(() => props.msgAlert({
          heading: 'Comments available',
          message: 'Successfully retrieved comments',
          variant: 'success'
        }))
        .catch(error => {
          props.msgAlert({
            heading: 'Retrieving Comments Failed with error: ' + error.message,
            message: 'Retrieving comments failed',
            variant: 'danger'
          })
        })
    })
  }, [])

  useEffect(() => {
    likeCount(props, props.match.params.id)
      .then(res => setLikeNum(res.data.likeCount))
      .catch(error => {
        props.msgAlert({
          heading: 'Getting Like Count Failed with error: ' + error.message,
          message: 'Getting like count failed',
          variant: 'danger'
        })
      })
  }, [])

  // with socket for liked
  useEffect(() => {
    socket.on('like-change', () => {
      likeCount(props, props.match.params.id)
        .then(res => setLikeNum(res.data.likeCount))
        .catch(error => {
          props.msgAlert({
            heading: 'Getting Like Count Failed with error: ' + error.message,
            message: 'Getting like count failed',
            variant: 'danger'
          })
        })
    })
  }, [])

  useEffect(() => {
    didLike(props, props.match.params.id)
      .then(res => setLiked(res.data.liked))
      .catch(error => {
        props.msgAlert({
          heading: 'Checking if Liked Failed with error: ' + error.message,
          message: 'Checking if liked failed',
          variant: 'danger'
        })
      })
  }, [])

  const changeLike = () => {
    if (liked) {
      unlike(props, props.match.params.id)
        .then(res => {
          socket.emit('like change', 'unliked')
          return res
        })
        .then(() => setLiked(false))
        .then(() => {
          didLike(props, props.match.params.id)
            .then(res => setLiked(res.data.liked))
            .then(() => {
              likeCount(props, props.match.params.id)
                .then(res => setLikeNum(res.data.likeCount))
                .catch(error => {
                  props.msgAlert({
                    heading: 'Getting Like Count Failed with error: ' + error.message,
                    message: 'Getting like count failed',
                    variant: 'danger'
                  })
                })
            })
            .catch(error => {
              props.msgAlert({
                heading: 'Checking if Liked Failed with error: ' + error.message,
                message: 'Checking if liked failed',
                variant: 'danger'
              })
            })
        })
        .then(() => props.msgAlert({
          heading: 'Unlike successful',
          message: 'You unliked the Post',
          variant: 'success'
        }))
        .catch(error => {
          props.msgAlert({
            heading: 'Unliking Failed with error: ' + error.message,
            message: 'Unliking failed',
            variant: 'danger'
          })
        })
    } else {
      like(props, props.match.params.id)
        .then(res => {
          socket.emit('like change', 'liked')
          return res
        })
        .then(() => {
          setLiked(true)
          didLike(props, props.match.params.id)
            .then(res => setLiked(res.data.liked))
            .then(() => {
              likeCount(props, props.match.params.id)
                .then(res => setLikeNum(res.data.likeCount))
                .catch(error => {
                  props.msgAlert({
                    heading: 'Getting Like Count Failed with error: ' + error.message,
                    message: 'Getting like count failed',
                    variant: 'danger'
                  })
                })
            })
            .catch(error => {
              props.msgAlert({
                heading: 'Checking if Liked Failed with error: ' + error.message,
                message: 'Checking if liked failed',
                variant: 'danger'
              })
            })
        })
        .then(() => props.msgAlert({
          heading: 'Like successful',
          message: 'You liked the Post',
          variant: 'success'
        }))
        .catch(error => {
          props.msgAlert({
            heading: 'Liking Failed with error: ' + error.message,
            message: 'Liking failed',
            variant: 'danger'
          })
        })
    }
  }

  const destroy = event => {
    event.preventDefault()

    destroyPost(props)
      .then(res => {
        socket.emit('deleted post', 'a post was deleted')
        return res
      })
      .then(() => props.msgAlert({
        heading: 'Delete Successful',
        message: 'You deleted the Post',
        variant: 'success'
      }))
      .then(() => setDeleted(true))
      .catch(error => {
        props.msgAlert({
          heading: 'Deleting post Failed with error: ' + error.message,
          message: 'Deleting post failed',
          variant: 'danger'
        })
      })
  }

  if (!post) {
    return <p>Loading...</p>
  }

  if (deleted) {
    return <Redirect to={
      { pathname: '/posts', state: { msg: 'Post succesfully deleted!' } }
    } />
  }

  const onDeleteComment = event => {
    event.preventDefault()

    deleteComment(props, event.target.value)
      .then(() => {
        indexComments(props)
          .then(res => {
            socket.emit('deleted comment', 'a comment was deleted')
            return res
          })
          .then(res => setComments(res.data.comments))
          .catch(error => {
            props.msgAlert({
              heading: 'Retrieving Comments Failed with error: ' + error.message,
              message: 'Retrieving comments failed',
              variant: 'danger'
            })
          })
      })
      .catch(error => {
        props.msgAlert({
          heading: 'Deleting comment Failed with error: ' + error.message,
          message: 'Deleting comment failed',
          variant: 'danger'
        })
      })
  }

  let commentList

  if (comments.length > 0) {
    commentList = comments.map(comment => (
      <li key={comment._id}>
        <p>{comment.owner.username !== undefined ? '@' + comment.owner.username : '' }</p>
        <h5>{comment.title}</h5>
        <p>{comment.text}</p>
        {comment.owner._id === props.user._id ? (<button className='btn btn-danger' onClick={onDeleteComment} value={comment._id}>Delete Comment</button>) : ''}
        {comment.owner._id === props.user._id ? (
          <Link to={`/posts/${props.match.params.id}/${comment._id}/edit`}>
            <button className='btn btn-primary'>Edit</button>
          </Link>) : ''}
      </li>
    ))
  }

  return (
    <div>
      <p>{post.owner.username !== undefined ? '@' + post.owner.username : '' }</p>
      <h4>{post.title}</h4>
      <p>{post.text}</p>
      <p>posted: {moment(post.createdAt).fromNow()}</p>
      <button className='btn btn-secondary' onClick={changeLike}>{liked ? '❤️' : '🤍'} {liked ? (likeNum === 0 ? '' : likeNum) : ''}</button>
      {post.owner._id === props.user._id ? (<button className='btn btn-danger' onClick={destroy}>Delete</button>) : ''}
      {post.owner._id === props.user._id ? (
        <Link to={`/posts/${props.match.params.id}/edit`}>
          <button className='btn btn-primary'>Edit</button>
        </Link>) : ''}
      <Link to={`/posts/${props.match.params.id}/comment`}>
        <button className='btn btn-primary'>Comment</button>
      </Link>
      <Link to='/posts'>Back to all posts</Link>
      <div>
        Comments:
        <ul>
          {commentList !== undefined ? commentList : 'No comments yet'}
        </ul>
      </div>
    </div>
  )
}

export default Post
