import React, { useState } from 'react';
import axios from 'axios';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        'https://netzwelt-devtest.azurewebsites.net/Account/SignIn',
        {
          username: username,
          password: password,
        }
      );
      // if succesful
      if (response.data === 200) {
        console.log(response.data);
        setLoading(false);
        localStorage.setItem('token', response.data.token);
        window.location.href = '/home';
      } else {
        throw new Error('Login failed');
      }
    } catch (error) {
      console.error(error);
      setError('Invalid credentials');
      setLoading(false);
    }
  };

  return (
    <div className='bg-gray-800 flex flex-col justify-center h-screen'>
      <form
        onSubmit={handleSubmit}
        className='max-w-[400px] w-full mx-auto rounded-lg bg-gray-900 p-8 px-8'
      >
        <div className='flex flex-col text-white py-2'>
          <label htmlFor='username'>Username</label>
          <input
            type='text'
            className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none'
            id='username'
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div className='flex flex-col text-white py-2'>
          <label htmlFor='password'>Password</label>
          <input
            className='p-2 rounded-lg bg-gray-700 mt-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none'
            type='password'
            id='password'
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <div className='flex justify-between text-white py-2'>
          <p className='flex items-center'>
            <input className='mr-2' type='checkbox' /> Remember Me
          </p>
          <p>Forgot Password</p>
        </div>
        <button
          disabled={loading}
          type='submit'
          className='w-full my-5 py-2 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg'
        >
          {loading ? 'Loading...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
