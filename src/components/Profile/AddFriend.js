import React, { useState, Fragment } from 'react'
import { Redirect } from 'react-router-dom'

import { makeFriend } from '../../api/friend'
import FriendForm from '../shared/FriendForm'

const AddFriend = props => {
  const [friend, setFriend] = useState(null)
  const [addedFriend, setAddedFriend] = useState(false)

  const handleChange = event => {
    const updatedField = event.target.value
    setFriend(updatedField)
  }

  const handleSubmit = event => {
    event.preventDefault()

    makeFriend(props, friend)
      .then(res => setAddedFriend(true))
      .then(() => props.msgAlert({
        heading: 'Adding Successful',
        message: 'Adding a friend was successful',
        variant: 'success'
      }))
      .catch(error => {
        props.msgAlert({
          heading: 'Adding Friend Failed with error: ' + error.message,
          message: 'Please make sure the person you are trying to add is a valid user',
          variant: 'danger'
        })
      })
  }

  if (addedFriend) {
    return <Redirect to='/profile' />
  }

  return (
    <Fragment>
      <FriendForm
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        cancelPath='/profile'
      />
    </Fragment>
  )
}

export default AddFriend
