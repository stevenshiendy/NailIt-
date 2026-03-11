import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Signup from './Signup.jsx'
import Prototype01 from './Prototype01.jsx' // Import the new component

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/prototype-01" element={<Prototype01 />} /> {/* Add the new route */}
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
