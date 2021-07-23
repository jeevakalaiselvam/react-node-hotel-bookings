import React from 'react';

export default function RegisterForm({
  handleSubmit,
  name,
  email,
  password,
  setName,
  setEmail,
  setPassword,
}) {
  return (
    <form onSubmit={handleSubmit}>
      <div className='form-group mt-4'>
        <label htmlFor='name' className='form-label'>
          Name
        </label>
        <input
          type='text'
          className='form-control mt-1'
          placeholder='Enter your name..'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className='form-group mt-4'>
        <label htmlFor='email' className='form-label'>
          Email
        </label>
        <input
          type='email'
          className='form-control mt-1'
          placeholder='Enter your Email..'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className='form-group mt-4'>
        <label htmlFor='password' className='form-label'>
          Password
        </label>
        <input
          type='password'
          className='form-control mt-1'
          placeholder='Enter your password..'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button
        disabled={!email || !password || !name}
        className='btn btn-primary mt-4'
        type='submit'
      >
        Submit
      </button>
    </form>
  );
}
