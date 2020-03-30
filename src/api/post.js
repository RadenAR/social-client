import apiUrl from '../apiConfig'
import axios from 'axios'

export const createPost = (data, user) => {
  return axios({
    method: 'POST',
    url: apiUrl + '/posts',
    headers: {
      Authorization: `Token token=${user.token}`
    },
    data
  })
}

export const updatePost = (id, data, user) => {
  return axios({
    method: 'PATCH',
    url: apiUrl + '/posts/' + id,
    headers: {
      Authorization: `Token token=${user.token}`
    },
    data
  })
}

export const destroyPost = (id, user) => {
  return axios({
    method: 'DELETE',
    url: apiUrl + '/posts/' + id,
    headers: {
      Authorization: `Token token=${user.token}`
    }
  })
}

export const indexPost = user => {
  return axios({
    method: 'GET',
    url: apiUrl + '/posts',
    headers: {
      Authorization: `Token token=${user.token}`
    }
  })
}

export const showPost = (id, user) => {
  return axios({
    method: 'GET',
    url: apiUrl + '/posts/' + id,
    headers: {
      Authorization: `Token token=${user.token}`
    }
  })
}
