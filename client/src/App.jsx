import { useState } from 'react'
import './App.css'
import Login from './components/login'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Signup from './components/signup'
import Landing from './components/landing'

function App() {
 

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing/>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
