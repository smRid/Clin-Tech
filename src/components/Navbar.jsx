import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
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
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
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
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
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
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
