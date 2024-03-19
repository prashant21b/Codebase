// App.js

import React from 'react';
import { BrowserRouter, Route, Routes,} from 'react-router-dom';
import Page1 from './Pages/Page1';
import Page2 from './Pages/Page2';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Page1/>} />
        <Route path="/code" element={<Page2/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
