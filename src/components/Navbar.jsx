import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useLogoutMutation } from '../store/api/authApi'
import { clearCredentials } from '../store/slices/authSlice'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)

  const dispatch = useDispatch()
  const { isAuthenticated, user } = useSelector(state => state.auth)
  const [logout, { isLoading: isLoggingOut }] = useLogoutMutation()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleLogout = async () => {
    try {
      await logout().unwrap()
      dispatch(clearCredentials())
    } catch (error) {
      console.error('Logout error:', error)
      dispatch(clearCredentials())
    }
    setShowUserMenu(false)
  }

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const navbarHeight = 64
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - navbarHeight

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
    setIsMenuOpen(false)
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-sm border-b border-slate-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-12 lg:px-16">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <img 
                src="/Logo.png" 
                alt="Clin Technologies Logo" 
                className="w-8 h-8 object-contain"
              />
              <span className="text-white font-semibold text-xl">Clin</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex items-baseline space-x-4">
              <button 
                onClick={() => scrollToSection('about')} 
                className="text-gray-300 hover:text-blue-400 border-b-2 border-transparent hover:border-blue-400 px-3 py-2 text-sm font-medium transition-all duration-200"
              >
                About
              </button>
              <button 
                onClick={() => scrollToSection('solutions')} 
                className="text-gray-300 hover:text-blue-400 border-b-2 border-transparent hover:border-blue-400 px-3 py-2 text-sm font-medium transition-all duration-200"
              >
                Our Solutions
              </button>
              <button 
                onClick={() => scrollToSection('in-action')} 
                className="text-gray-300 hover:text-blue-400 border-b-2 border-transparent hover:border-blue-400 px-3 py-2 text-sm font-medium transition-all duration-200"
              >
                In Action
              </button>
              <button 
                onClick={() => scrollToSection('technology')} 
                className="text-gray-300 hover:text-blue-400 border-b-2 border-transparent hover:border-blue-400 px-3 py-2 text-sm font-medium transition-all duration-200"
              >
                Technology
              </button>
              <button 
                onClick={() => scrollToSection('benefits')} 
                className="text-gray-300 hover:text-blue-400 border-b-2 border-transparent hover:border-blue-400 px-3 py-2 text-sm font-medium transition-all duration-200"
              >
                Benefits
              </button>
              <button 
                onClick={() => scrollToSection('case-use')} 
                className="text-gray-300 hover:text-blue-400 border-b-2 border-transparent hover:border-blue-400 px-3 py-2 text-sm font-medium transition-all duration-200"
              >
                Case Use
              </button>
            </div>

            {/* Authentication Section */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-2 text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-semibold">
                      {user?.name?.charAt(0)?.toUpperCase() || user?.email?.charAt(0)?.toUpperCase() || 'U'}
                    </span>
                  </div>
                  <span className="hidden lg:block">{user?.name || user?.email}</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                    <Link
                      to="/home"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setShowUserMenu(false)}
                    >
                      Dashboard
                    </Link>
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setShowUserMenu(false)}
                    >
                      Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      disabled={isLoggingOut}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 disabled:opacity-50"
                    >
                      {isLoggingOut ? 'Signing out...' : 'Sign out'}
                    </button>
                  </div>
                )}
              </div>
            ) : null}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-300 hover:text-white focus:outline-none focus:text-white"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <button 
                onClick={() => scrollToSection('about')} 
                className="text-gray-300 hover:text-blue-400 block px-3 py-2 text-base font-medium transition-colors w-full text-left"
              >
                About
              </button>
              <button 
                onClick={() => scrollToSection('solutions')} 
                className="text-gray-300 hover:text-blue-400 block px-3 py-2 text-base font-medium transition-colors w-full text-left"
              >
                Our Solutions
              </button>
              <button 
                onClick={() => scrollToSection('in-action')} 
                className="text-gray-300 hover:text-blue-400 block px-3 py-2 text-base font-medium transition-colors w-full text-left"
              >
                In Action
              </button>
              <button 
                onClick={() => scrollToSection('technology')} 
                className="text-gray-300 hover:text-blue-400 block px-3 py-2 text-base font-medium transition-colors w-full text-left"
              >
                Technology
              </button>
              <button 
                onClick={() => scrollToSection('benefits')} 
                className="text-gray-300 hover:text-blue-400 block px-3 py-2 text-base font-medium transition-colors w-full text-left"
              >
                Benefits
              </button>
              <button 
                onClick={() => scrollToSection('case-use')} 
                className="text-gray-300 hover:text-blue-400 block px-3 py-2 text-base font-medium transition-colors w-full text-left"
              >
                Case Use
              </button>
              
              <div className="border-t border-slate-700 pt-4">
                {isAuthenticated ? (
                  <div className="space-y-2">
                    <div className="flex items-center px-3 py-2">
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-3">
                        <span className="text-white text-sm font-semibold">
                          {user?.name?.charAt(0)?.toUpperCase() || user?.email?.charAt(0)?.toUpperCase() || 'U'}
                        </span>
                      </div>
                      <span className="text-gray-300 text-sm">{user?.name || user?.email}</span>
                    </div>
                    <Link
                      to="/home"
                      className="text-gray-300 hover:text-blue-400 block px-3 py-2 text-base font-medium transition-colors w-full text-left"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <Link
                      to="/profile"
                      className="text-gray-300 hover:text-blue-400 block px-3 py-2 text-base font-medium transition-colors w-full text-left"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Profile
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout()
                        setIsMenuOpen(false)
                      }}
                      disabled={isLoggingOut}
                      className="text-gray-300 hover:text-blue-400 block px-3 py-2 text-base font-medium transition-colors w-full text-left disabled:opacity-50"
                    >
                      {isLoggingOut ? 'Signing out...' : 'Sign out'}
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
