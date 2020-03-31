import apiUrl from '../apiConfig'
import axios from 'axios'

export const likeCount = (props, post) => {
  return axios({
    method: 'GET',
    url: apiUrl + '/likes/' + props.match.params.id,
    headers: {
      Authorization: `Token token=${props.user.token}`
    }
  })
}

export const didLike = (props, post) => {
  return axios({
    method: 'GET',
    url: apiUrl + '/likes/number/' + props.match.params.id,
    headers: {
      Authorization: `Token token=${props.user.token}`
    }
  })
}

export const like = (props, post) => {
  return axios({
    method: 'POST',
    url: apiUrl + '/likes/' + props.match.params.id,
    headers: {
      Authorization: `Token token=${props.user.token}`
    },
    data: { post: post }
  })
}

export const unlike = (props, post) => {
  return axios({
    method: 'DELETE',
    url: apiUrl + '/likes/' + props.match.params.id,
    headers: {
      Authorization: `Token token=${props.user.token}`
    }
  })
}
