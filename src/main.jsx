import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Signup from './Signup.jsx'
import Prototype01 from './Prototype01.jsx'
import Profile from './Profile.jsx'
import Success from './Success.jsx'
import { AuthProvider } from './AuthContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/prototype-01" element={<Prototype01 />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/success" element={<Success />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>,
)
