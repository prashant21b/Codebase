// Page1.js

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
const Page1 = ({ onSubmit }) => {
    const navigate=useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    language: '',
    stdin: [],
    code: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleStdinChange = (e, index) => {
    const newStdin = [...formData.stdin];
    newStdin[index] = e.target.value;
    setFormData({ ...formData, stdin: newStdin });
  };

  const addStdin = () => {
    setFormData({ ...formData, stdin: [...formData.stdin, ''] });
  };

  const removeStdin = (index) => {
    const newStdin = [...formData.stdin];
    newStdin.splice(index, 1);
    setFormData({ ...formData, stdin: newStdin });
  };

  const handleSubmit = async (e) => { 
    e.preventDefault();
    console.log("36",formData)
    try {
      await axios.post('/submit', formData); 
         toast.success('Item added')
       navigate('/code')
    } catch (error) {
      console.error('Error submitting snippet:', error);
    }
  };

  return (
    <div className="container mx-auto mt-10">
  <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto border rounded-lg shadow-lg p-8 bg-white">
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">Username</label>
      <input
        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="username"
        type="text"
        name="username"
        value={formData.username}
        onChange={handleChange}
        placeholder="Enter your username"
        required
      />
    </div>
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="language">Preferred Language</label>
      <select
        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="language"
        name="language"
        value={formData.language}
        onChange={handleChange}
        required
      >
        <option value="">Select language</option>
        <option value="C++">C++</option>
        <option value="Java">Java</option>
        <option value="JavaScript">JavaScript</option>
        <option value="Python">Python</option>
      </select>
    </div>
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="stdin">Standard Input</label>
      {formData.stdin.map((input, index) => (
        <div key={index} className="flex mb-2">
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2"
            type="text"
            value={input}
            onChange={(e) => handleStdinChange(e, index)}
            placeholder="Enter standard input"
            required
          />
          <button
            type="button"
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={() => removeStdin(index)}
          >
            Remove
          </button>
        </div>
      ))}
      <button
        type="button"
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        onClick={addStdin}
      >
        Add Standard Input
      </button>
    </div>
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="code">Source Code</label>
      <textarea
        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="code"
        name="code"
        value={formData.code}
        onChange={handleChange}
        placeholder="Enter your source code"
        required
      />
    </div>
    <div className="flex items-center justify-center">
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="submit"
      >
        Submit
      </button>
    </div>
  </form>
  <button
        className="fixed bottom-4 right-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        onClick={() => navigate('/code')}
      >
        Go to Submitted Code
      </button>
</div>

  );
};

export default Page1;
