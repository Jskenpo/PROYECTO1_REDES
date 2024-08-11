
import './App.css';
import React from 'react';
import Login from './paginas/login/login';
import Register from './paginas/register/register';
import Chat from './paginas/chat/chat';

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div id="app">
      <Router /*basename="/chat/dist_react/index.html"*/>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </Router>
    </div>
    
  );
}

export default App;
