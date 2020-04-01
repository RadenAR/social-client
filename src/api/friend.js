import apiUrl from '../apiConfig'
import axios from 'axios'

export const myProfile = props => {
  return axios({
    method: 'GET',
    url: apiUrl + '/friends/' + props.user.username,
    headers: {
      Authorization: `Token token=${props.user.token}`
    }
  })
}

export const makeFriend = (props, username) => {
  return axios({
    method: 'POST',
    url: apiUrl + '/friends/' + username,
    headers: {
      Authorization: `Token token=${props.user.token}`
    }
  })
}

export const unFriend = (props, username) => {
  return axios({
    method: 'DELETE',
    url: apiUrl + '/friends/' + username,
    headers: {
      Authorization: `Token token=${props.user.token}`
    }
  })
}
