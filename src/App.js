import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Component } from './Component';
import { Contact } from './Contact';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Component />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
}

export default App; 