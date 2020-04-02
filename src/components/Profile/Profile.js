import React, { useState, useEffect, Fragment } from 'react'

import { myProfile, unFriend } from '../../api/friend'

const Profile = props => {
  const [person, setPerson] = useState({})
  const [friends, setFriends] = useState([])

  useEffect(() => {
    myProfile(props)
      .then(res => {
        setPerson(res.data.user)
        if (res.data.user.friends) {
          setFriends(res.data.user.friends)
        }
      })
      .then(() => props.msgAlert({
        heading: 'Profile available',
        message: 'Successfully retrieved profile',
        variant: 'success'
      }))
      .catch(error => {
        props.msgAlert({
          heading: 'Retrieving Profile Failed with error: ' + error.message,
          message: 'Retrieving profile failed',
          variant: 'danger'
        })
      })
  }, [])

  const removeFriend = event => {
    event.preventDefault()

    unFriend(props, event.target.value)
      .then(() => props.msgAlert({
        heading: 'Friend Remove Successful',
        message: 'You deleted a Friend',
        variant: 'success'
      }))
      .then(() => {
        myProfile(props)
          .then(res => {
            setPerson(res.data.user)
            if (res.data.user.friends) {
              setFriends(res.data.user.friends)
            }
          })
          .then(() => props.msgAlert({
            heading: 'Profile available',
            message: 'Successfully retrieved profile',
            variant: 'success'
          }))
          .catch(error => {
            props.msgAlert({
              heading: 'Retrieving Profile Failed with error: ' + error.message,
              message: 'Retrieving profile failed',
              variant: 'danger'
            })
          })
      })
      .catch(error => {
        props.msgAlert({
          heading: 'Deleting post Failed with error: ' + error.message,
          message: 'Deleting post failed',
          variant: 'danger'
        })
      })
  }

  const friendList = friends.map(friend => (
    <Fragment key={friend._id}>
      <li>
        {friend.username}
      </li>
      <button className='btn btn-danger' onClick={removeFriend} value={friend.username}>unFriend</button>
    </Fragment>
  ))

  return (
    <div>
      <h4>{person.username}</h4>
      <h5>{person.email}</h5>
      Friends:
      <ul>
        {friends.length > 0 ? friendList : 'No friends, go add some friends :)'}
      </ul>
    </div>
  )
}

export default Profile
