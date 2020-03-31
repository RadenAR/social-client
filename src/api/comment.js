import apiUrl from '../apiConfig'
import axios from 'axios'

export const indexComments = props => {
  return axios({
    method: 'GET',
    url: apiUrl + '/posts/comments/' + props.match.params.id,
    headers: {
      Authorization: `Token token=${props.user.token}`
    }
  })
}

export const deleteComment = (props, commentId) => {
  return axios({
    method: 'DELETE',
    url: apiUrl + '/posts/comments/' + props.match.params.id + '/' + commentId,
    headers: {
      Authorization: `Token token=${props.user.token}`
    }
  })
}

export const createComment = (props, comment) => {
  return axios({
    method: 'POST',
    url: apiUrl + '/posts/comments/' + props.match.params.id,
    headers: {
      Authorization: `Token token=${props.user.token}`
    },
    data: { comment: comment }
  })
}

export const showComment = props => {
  return axios({
    method: 'GET',
    url: apiUrl + '/posts/comments/' + props.match.params.id + '/' + props.match.params.num,
    headers: {
      Authorization: `Token token=${props.user.token}`
    }
  })
}

export const updateComment = (props, comment) => {
  return axios({
    method: 'PATCH',
    url: apiUrl + '/posts/comments/' + props.match.params.id + '/' + props.match.params.num,
    headers: {
      Authorization: `Token token=${props.user.token}`
    },
    data: { comment: comment }
  })
}
