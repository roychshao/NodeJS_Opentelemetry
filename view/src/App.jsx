import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './pages/Home.jsx'
import User from './pages/User.jsx'
import Email from './pages/Email.jsx'
import Password from './pages/Password.jsx'
import Wait from './pages/Wait.jsx'

function App() {

  return (
    <div className="App">
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/user" element={<User/>}/>
            <Route path="/email" element={<Email/>}/>
            <Route path="/password" element={<Password/>}/>
            <Route path="/wait" element={<Wait/>}/>
        </Routes>
    </div>
  )
}

export default App
