import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { store } from './store'
import LandingPage from './pages/LandingPage'
import AuthPage from './pages/AuthPage'
import HomePage from './pages/HomePage'
import UserProfile from './components/UserProfile'
import ProtectedRoute from './components/ProtectedRoute'
import './App.css'

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/home" element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute>
                <UserProfile />
              </ProtectedRoute>
            } />
          </Routes>
        </div>
      </Router>
    </Provider>
  )
}

export default App
