import React from 'react'

const PageHeader = ({ isLeftSidebarOpen, setIsLeftSidebarOpen, title, subtitle }) => {
  return (
    <div className="flex items-center justify-between p-6 border-b border-gray-700 bg-gray-900">
      <div className="flex items-center space-x-4">
        {!isLeftSidebarOpen && (
          <button
            onClick={() => setIsLeftSidebarOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition-colors mr-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        )}
        <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-white">{title || 'Guest'}</h2>
          <p className="text-gray-400 text-sm">{subtitle || 'Welcome back'}</p>
        </div>
      </div>
    </div>
  )
}

export default PageHeader
