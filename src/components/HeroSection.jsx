import React from 'react'
import { Link } from 'react-router-dom'

const HeroSection = () => {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-gray-900 overflow-hidden">

      <div className="absolute inset-0">
        {/* Large bubble effects like in the screenshot */}
        <div className="absolute top-10 left-10 w-96 h-96 bg-blue-600/8 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-blue-400/6 rounded-full blur-2xl"></div>
        <div className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-blue-600/7 rounded-full blur-3xl"></div>
        
        {/* Medium floating bubbles */}
        <div className="absolute top-1/4 right-1/3 w-32 h-32 bg-blue-400/8 rounded-full blur-xl"></div>
        <div className="absolute bottom-1/4 left-1/3 w-40 h-40 bg-blue-500/6 rounded-full blur-xl"></div>
        <div className="absolute top-2/3 left-1/6 w-24 h-24 bg-blue-300/10 rounded-full blur-lg"></div>
        
        {/* Small scattered dots */}
        <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-blue-400/60 rounded-full"></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-blue-300/40 rounded-full"></div>
        <div className="absolute bottom-1/3 left-1/3 w-1 h-1 bg-blue-400/50 rounded-full"></div>
        <div className="absolute top-2/3 right-1/4 w-1 h-1 bg-blue-300/60 rounded-full"></div>
        <div className="absolute top-1/2 left-1/6 w-1 h-1 bg-blue-400/40 rounded-full"></div>
        <div className="absolute bottom-1/6 right-1/6 w-1 h-1 bg-blue-400/50 rounded-full"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center">
          {/* Main Logo/Icon */}
          <div className="mb-12">
            <div className="w-32 h-32 mx-auto mb-8 relative">
              <div className="w-full h-full flex items-center justify-center relative p-2">
                <img 
                  src="/Logo.png" 
                  alt="Clin Technologies Logo" 
                  className="w-full h-full object-contain relative z-10"
                />
              </div>
            </div>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold text-blue-400 mb-8 tracking-tight">
            Clin Technologies
          </h1>
          <div className="max-w-5xl mx-auto mb-12">
            <p className="text-xl md:text-2xl text-gray-500 leading-relaxed mb-6">
              Revolutionizing clinical documentation through{' '}
              <span className="text-orange-400 font-semibold ">
                HIPAA COMPLIANT
              </span>{' '}
              advanced artificial intelligence, giving healthcare providers more time for what truly matters — patient care. try it for{' '}
              <span className="text-orange-400 font-semibold"> FREE</span> today
            </p>
          </div>

          {/* Description */}
          <div className="max-w-4xl mx-auto mb-16">
            <p className="text-lg md:text-xl text-gray-100 leading-relaxed">
              Our sophisticated AI platform intelligently processes clinical conversations, creating accurate documentation that integrates with your existing EMR system.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link 
              to="/auth" 
              className="bg-transparent border-2 border-blue-500 hover:bg-blue-990 text-white hover:text-white px-10 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 min-w-[140px]"
            >
              Login
            </Link>
            <Link 
              to="/auth" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 min-w-[140px] shadow-lg shadow-blue-600/25"
            >
              Signup
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  )
}

export default HeroSection
