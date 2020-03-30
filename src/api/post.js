import apiUrl from '../apiConfig'
import axios from 'axios'

export const createPost = (props, post) => {
  return axios({
    method: 'POST',
    url: apiUrl + '/posts',
    headers: {
      Authorization: `Token token=${props.user.token}`
    },
    data: { post: post }
  })
}

export const updatePost = (props, post) => {
  return axios({
    method: 'PATCH',
    url: apiUrl + '/posts/' + props.match.params.id,
    headers: {
      Authorization: `Token token=${props.user.token}`
    },
    data: { post: post }
  })
}

export const destroyPost = props => {
  return axios({
    method: 'DELETE',
    url: apiUrl + '/posts/' + props.match.params.id,
    headers: {
      Authorization: `Token token=${props.user.token}`
    }
  })
}

export const indexPost = props => {
  return axios({
    method: 'GET',
    url: apiUrl + '/posts',
    headers: {
      Authorization: `Token token=${props.user.token}`
    }
  })
}

export const showPost = props => {
  return axios({
    method: 'GET',
    url: apiUrl + '/posts/' + props.match.params.id,
    headers: {
      Authorization: `Token token=${props.user.token}`
    }
  })
}
