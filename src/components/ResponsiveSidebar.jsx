import React from 'react'

const ResponsiveSidebar = ({ 
  isLeftSidebarOpen, 
  setIsLeftSidebarOpen,
  isDarkMode,
  toggleDarkMode,
  handleNewChat, 
  isCreatingChat, 
  setShowSubscriptionManager,
  setShowUserManager,
  setShowSupportForm,
  setShowFAQ,
  handleLogout,
  isLoggingOut,
  activeSection = '',
  themeClasses
}) => {
  const showOnlySection = (sectionToShow) => {
    setShowSubscriptionManager(false)
    setShowUserManager(false)
    setShowSupportForm(false)
    setShowFAQ(false)
    
    switch(sectionToShow) {
      case 'subscription':
        setShowSubscriptionManager(true)
        break
      case 'users':
        setShowUserManager(true)
        break
      case 'support':
        setShowSupportForm(true)
        break
      case 'faq':
        setShowFAQ(true)
        break
      default:
        break
    }
  }

  return (
    <>
      {/* Left Sidebar */}
      <div className={`${isLeftSidebarOpen ? 'w-64' : 'w-16'} ${themeClasses.background} border-r ${themeClasses.border} flex flex-col transition-all duration-300`}>
        {/* Blue toggle button  */}
        {!isLeftSidebarOpen && (
          <div className="px-2 py-6 flex justify-center">
            <button
              onClick={() => setIsLeftSidebarOpen(true)}
              className="p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors shadow-lg"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        )}

        {/* Divider */}
        {!isLeftSidebarOpen && (
          <div className="mx-2 mb-4">
            <div className={`h-px ${isDarkMode ? 'bg-gray-700' : 'bg-gray-300'}`}></div>
          </div>
        )}
        
        {/* Header Logo  */}
        {isLeftSidebarOpen && (
          <div className="p-4 flex items-center justify-between">
            <img 
              src="/HomeLogo.png" 
              alt="Technologies" 
              className="w-14 h-16 transition-all duration-300"
            />
            <button
              onClick={() => setIsLeftSidebarOpen(false)}
              className={`${themeClasses.textSecondary} hover:text-white transition-colors`}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          </div>
        )}

        {/* New Chat Button*/}
        {isLeftSidebarOpen && (
          <div className="px-4 mb-6">
            <button
              onClick={handleNewChat}
              disabled={isCreatingChat}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-3 px-4 rounded-lg font-medium transition-all disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span>New Chat</span>
            </button>
          </div>
        )}

        {/* Navigation */}
        <nav className={`flex-1 ${isLeftSidebarOpen ? 'px-4' : 'px-2'}`}>
          {isLeftSidebarOpen && (
            <div 
              onClick={toggleDarkMode}
              className={`group flex items-center space-x-3 justify-between rounded-lg cursor-pointer transition-all duration-200 ${themeClasses.hoverBackground} mb-3 px-3 py-3`}
            >
              <div className="flex items-center space-x-3">
                <svg className={`w-5 h-5 ${themeClasses.text} flex-shrink-0`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
                <span className={`${themeClasses.text} font-medium`}>Dark</span>
              </div>
              <div className={`${isDarkMode ? 'bg-blue-600' : 'bg-gray-400'} rounded-full p-1 w-12 h-6 flex items-center transition-colors`}>
                <div className={`bg-white rounded-full w-4 h-4 transition-transform ${isDarkMode ? 'ml-auto' : ''}`}></div>
              </div>
            </div>
          )}
          
          <div 
            className={`group flex items-center ${isLeftSidebarOpen ? 'space-x-3' : ''} rounded-lg cursor-pointer transition-all duration-200 ${activeSection === 'subscription' ? 'bg-blue-600' : themeClasses.hoverBackground} ${isLeftSidebarOpen ? 'mb-3 px-3 py-3' : 'mb-4 px-2 py-3 justify-center'}`}
            onClick={() => showOnlySection('subscription')}
            title={!isLeftSidebarOpen ? 'Manage Subscription' : ''}
          >
            <svg className={`w-5 h-5 ${themeClasses.text} flex-shrink-0`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            {isLeftSidebarOpen && <span className={`${activeSection === 'subscription' ? 'text-white' : `${themeClasses.textSecondary} group-hover:text-white`} transition-colors font-medium`}>Manage Subscription</span>}
          </div>
          
          <div 
            className={`group flex items-center ${isLeftSidebarOpen ? 'space-x-3' : ''} rounded-lg cursor-pointer transition-all duration-200 ${activeSection === 'users' ? 'bg-blue-600' : themeClasses.hoverBackground} ${isLeftSidebarOpen ? 'mb-3 px-3 py-3' : 'mb-4 px-2 py-3 justify-center'}`}
            onClick={() => showOnlySection('users')}
            title={!isLeftSidebarOpen ? 'Users' : ''}
          >
            <svg className={`w-5 h-5 ${themeClasses.text} flex-shrink-0`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
            </svg>
            {isLeftSidebarOpen && <span className={`${activeSection === 'users' ? 'text-white' : `${themeClasses.textSecondary} group-hover:text-white`} transition-colors font-medium`}>Users</span>}
          </div>

          <div 
            className={`group flex items-center ${isLeftSidebarOpen ? 'space-x-3' : ''} rounded-lg cursor-pointer transition-all duration-200 ${activeSection === 'support' ? 'bg-blue-600' : themeClasses.hoverBackground} ${isLeftSidebarOpen ? 'mb-3 px-3 py-3' : 'mb-4 px-2 py-3 justify-center'}`}
            onClick={() => showOnlySection('support')}
            title={!isLeftSidebarOpen ? 'Help And Support' : ''}
          >
            <svg className={`w-5 h-5 ${themeClasses.text} flex-shrink-0`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            {isLeftSidebarOpen && <span className={`${activeSection === 'support' ? 'text-white' : `${themeClasses.textSecondary} group-hover:text-white`} transition-colors font-medium`}>Help And Support</span>}
          </div>
          
          <div 
            className={`group flex items-center ${isLeftSidebarOpen ? 'space-x-3' : ''} rounded-lg cursor-pointer transition-all duration-200 ${activeSection === 'faq' ? 'bg-blue-600' : themeClasses.hoverBackground} ${isLeftSidebarOpen ? 'mb-4 px-3 py-3' : 'mb-12 px-2 py-3 justify-center'}`}
            onClick={() => showOnlySection('faq')}
            title={!isLeftSidebarOpen ? 'FAQ' : ''}
          >
            <svg className={`w-5 h-5 ${themeClasses.text} flex-shrink-0`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {isLeftSidebarOpen && <span className={`${activeSection === 'faq' ? 'text-white' : `${themeClasses.textSecondary} group-hover:text-white`} transition-colors font-medium`}>FAQ</span>}
          </div>
        </nav>

        {/* Logout Button */}
        <div className={`${isLeftSidebarOpen ? 'px-4' : 'px-2'} pb-4`}>
          <div 
            className={`group flex items-center ${isLeftSidebarOpen ? 'space-x-3' : ''} rounded-lg cursor-pointer transition-all duration-200 ${themeClasses.hoverBackground} ${isLeftSidebarOpen ? 'px-3 py-3' : 'px-2 py-3 justify-center'}`}
            onClick={handleLogout}
            title={!isLeftSidebarOpen ? (isLoggingOut ? 'Logging out...' : 'Logout') : ''}
          >
            <svg className="w-5 h-5 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            {isLeftSidebarOpen && <span className="text-red-500 font-medium">{isLoggingOut ? 'Logging out...' : 'Logout'}</span>}
          </div>
        </div>
      </div>
    </>
  )
}

export default ResponsiveSidebar
