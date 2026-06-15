import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AppProvider } from './context/AppContext.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Monitor from './pages/Monitor.jsx'
import Tutorial from './pages/Tutorial.jsx'

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <Routes>
          <Route path="/"              element={<Dashboard />} />
          <Route path="/monitor/:id"   element={<Monitor />} />
          <Route path="/tutorial"      element={<Tutorial />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  )
}
