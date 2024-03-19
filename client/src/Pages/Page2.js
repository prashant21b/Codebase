// Page2.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CodeModal from './CodeModal'; 

const Page2 = () => {
    function formatDateTime(dateTimeString) {
        const [datePart, timePart] = dateTimeString.split('T');
        const [year, month, day] = datePart.split('-');
        const [hours, minutes] = timePart.slice(0, -5).split(':'); 
        return `${year}-${month}-${day} ${hours}:${minutes}`;
      }
      
     
     
  const [snippets, setSnippets] = useState([]);
  const [selectedCode, setSelectedCode] = useState(null); 
  useEffect(() => {
    const fetchSnippets = async () => {
      try {
        const response = await axios.get('/snippets');
        setSnippets(response.data);
      } catch (error) {
        console.error('Error fetching snippets:', error);
      }
    };

    fetchSnippets();
  }, []);
  console.log("31",snippets)
  const openCodeModal = (code) => {
    setSelectedCode(code);
  };

  const closeCodeModal = () => {
    setSelectedCode(null);
  };

  return (
    <div className="container mx-auto mt-10">
    <h1 className="text-3xl font-bold mb-5 text-center">Submitted Snippets</h1>
  
    <table className="table w-full border border-collapse shadow-md rounded-lg">
      <thead>
        <tr>
          <th className="px-4 py-2 text-left bg-gray-200">Username</th>
          <th className="px-4 py-2 text-left bg-gray-200">Language</th>
          <th className="px-4 py-2 text-left bg-gray-200">Standard Input</th>
          <th className="px-4 py-2 text-left bg-gray-200">Source Code</th>
          <th className="px-4 py-2 text-left bg-gray-200">Timestamp</th>
        </tr>
      </thead>
      <tbody>
        {snippets.map((snippet, index) => (
          <tr key={index}>
            <td className="border px-4 py-2">{snippet.username}</td>
            <td className="border px-4 py-2">{snippet.language}</td>
            <td className="border px-4 py-2">
              {snippet.stdin.map((input, index) => (
                <div key={index}>{input}</div>
              ))}
            </td>
            <td className="border px-4 py-2">
              <div className="truncate">{snippet.code.substring(0, 100)}...</div>
              <button
                className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                onClick={() => openCodeModal(snippet.code)}
              >
                View
              </button>
            </td>
            <td className="border px-4 py-2">{formatDateTime(snippet.timestamp)}</td>
          </tr>
        ))}
      </tbody>
    </table>
    {selectedCode && (
      <CodeModal code={selectedCode} onClose={closeCodeModal} />
    )}
  </div>
  
  );
};

export default Page2;
