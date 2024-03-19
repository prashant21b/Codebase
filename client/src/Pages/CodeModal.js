

import React from 'react';

const CodeModal = ({ code, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg w-3/4">
        <div className="overflow-auto" style={{ maxHeight: '80vh' }}>
          <pre>{code}</pre>
        </div>
        <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default CodeModal;
