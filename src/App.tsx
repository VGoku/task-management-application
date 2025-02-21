import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NotFound from './components/NotFound';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<div>Home</div>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
