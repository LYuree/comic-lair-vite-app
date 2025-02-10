import React, { useState } from 'react';
import axios from 'axios';

const Login: React.FC = () => {
  const [userName, setUserName] = useState('');
  const [passWord, setPassWord] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    if (!userName || !passWord) {
      setError('Username and password are required.');
      return false;
    }
    setError('');
    return true;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!validateForm()) return; // Ensure the form is validated
    setLoading(true);

    const formDetails = new URLSearchParams();
    formDetails.append('username', userName); // Use 'username' instead of 'userName'
    formDetails.append('password', passWord); // Use 'password' instead of 'passWord'

    try {
      const response = await axios.post('http://localhost:8000/users/token', formDetails, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded', // Set the correct content type
        },
      });
      const { access_token } = response.data;
      setLoading(false);
      localStorage.setItem('token', access_token);
      // window.location.href = '/'; // Redirect to home page
      console.log(`Login successful`);
    } catch (err) {
      setLoading(false);
      if (axios.isAxiosError(err) && err.response) {
        if (err.response.status === 401) {
          setError('Invalid username or password.');
        } else {
          setError('An error occurred. Please try again later.');
        }
      } else {
        setError('An unexpected error occurred.');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Login</h2>
        {error && (
          <div className="mb-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              id="username"
              placeholder="Enter your username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={passWord}
              onChange={(e) => setPassWord(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;