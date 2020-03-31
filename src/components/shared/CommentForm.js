import React from 'react'
import { Link } from 'react-router-dom'

const CommentForm = ({ comment, handleSubmit, handleChange, cancelPath }) => (
  <div className='row'>
    <div className='col-sm-10 col-md-8 mx-auto mt-5'>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label>Title</label>
          <input
            placeholder='A title for your comment'
            value={comment.title || ''}
            name='title'
            onChange={handleChange}
            className='form-control'
          />
          <label>Text</label>
          <input
            placeholder='The real meat and potatoes'
            value={comment.text || ''}
            name='text'
            onChange={handleChange}
            className='form-control'
          />
          <button type='submit' className='btn btn-primary'>Submit</button>
          <Link to={cancelPath}>
            <button className='btn btn-secondary'>Cancel</button>
          </Link>
        </div>
      </form>
    </div>
  </div>
)

export default CommentForm
