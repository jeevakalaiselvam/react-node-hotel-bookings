import React from 'react';

export default function LoginForm({
  handleSubmit,
  email,
  password,
  setEmail,
  setPassword,
}) {
  return (
    <form onSubmit={handleSubmit}>
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
        disabled={!email || !password}
        className='btn btn-primary mt-4'
        type='submit'
      >
        Submit
      </button>
    </form>
  );
}
