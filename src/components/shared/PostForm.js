import React from 'react'
import { Link } from 'react-router-dom'

const PostForm = ({ post, handleSubmit, handleChange, cancelPath }) => (
  <div className='row'>
    <div className='col-sm-10 col-md-8 mx-auto mt-5'>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label>Title</label>
          <input
            placeholder='A Note From The Heart'
            value={post.title || ''}
            name='title'
            onChange={handleChange}
            className='form-control'
            required
          />
          <label>Text</label>
          <input
            placeholder='Blah Blah Blah'
            value={post.text || ''}
            name='text'
            onChange={handleChange}
            className='form-control'
            required
          />
          <br></br>
          <button type='submit' className='btn btn-primary'>Submit</button>
          <Link to={cancelPath}>
            <button className='btn btn-secondary'>Cancel</button>
          </Link>
        </div>
      </form>
    </div>
  </div>
)

export default PostForm
