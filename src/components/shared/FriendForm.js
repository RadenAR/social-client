import React from 'react'
import { Link } from 'react-router-dom'

const FriendForm = ({ handleSubmit, handleChange, cancelPath }) => (
  <div className='row'>
    <div className='col-sm-10 col-md-8 mx-auto mt-5'>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label>Username</label>
          <input
            placeholder='the username'
            name='username'
            onChange={handleChange}
            className='form-control'
          />
          <button type='submit' className='btn btn-primary'>Add Friend</button>
          <Link to={cancelPath}>
            <button className='btn btn-secondary'>Cancel</button>
          </Link>
        </div>
      </form>
    </div>
  </div>
)

export default FriendForm
