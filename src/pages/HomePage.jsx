import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { 
  useLogoutMutation, 
  useCreateChatMutation, 
  useAddMessageToChatMutation,
  useGetUserChatListQuery 
} from '../store/api/authApi'
import { clearCredentials } from '../store/slices/authSlice'
import SupportForm from '../components/SupportForm'
import SubscriptionManager from '../components/SubscriptionManager'
import UserManager from '../components/UserManager'
import FAQ from '../components/FAQ'
import ResponsiveSidebar from '../components/ResponsiveSidebar'

const HomePage = () => {
  const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState(false) // Mobile-first: closed by default
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(true) // Default to dark mode
  const [showSupportForm, setShowSupportForm] = useState(false)
  const [showSubscriptionManager, setShowSubscriptionManager] = useState(false)
  const [showUserManager, setShowUserManager] = useState(false)
  const [showFAQ, setShowFAQ] = useState(false)
  const [activeTab, setActiveTab] = useState('Chartwright')
  const [message, setMessage] = useState('')
  const [chatHistory, setChatHistory] = useState([])
  const [currentChatId, setCurrentChatId] = useState(null)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [logout, { isLoading: isLoggingOut }] = useLogoutMutation()
  const [createChat, { isLoading: isCreatingChat }] = useCreateChatMutation()
  const [addMessageToChat, { isLoading: isAddingMessage }] = useAddMessageToChatMutation()
  const { data: userChats, refetch: refetchChats } = useGetUserChatListQuery()

  useEffect(() => {
    if (userChats && userChats.length > 0) {
      setCurrentChatId(userChats[0].id)
      setChatHistory(userChats[0].messages || [])
    }
  }, [userChats])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsLeftSidebarOpen(false)
        setIsRightSidebarOpen(false)
      } else {
        setIsLeftSidebarOpen(true)
      }
    }


    window.addEventListener('resize', handleResize)
    

    handleResize()

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleLogout = async () => {
    try {
      await logout().unwrap()
      dispatch(clearCredentials())

      navigate('/')
    } catch (error) {
      console.error('Logout error:', error)

      dispatch(clearCredentials())
      navigate('/')
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleSendMessage = async () => {
    if (!message.trim()) return

    const newMessage = {
      id: Date.now(),
      text: message,
      type: 'user',
      timestamp: new Date().toISOString()
    }

    setChatHistory(prev => [...prev, newMessage])
    setMessage('')

    try {
      if (!currentChatId) {
        const chatResponse = await createChat({
          title: message.slice(0, 50) + (message.length > 50 ? '...' : ''),
          messages: [newMessage]
        }).unwrap()
        
        setCurrentChatId(chatResponse.id)
        refetchChats()
      } else {
        await addMessageToChat({
          chatId: currentChatId,
          message: newMessage
        }).unwrap()
      }

      setTimeout(() => {
        const aiResponse = {
          id: Date.now() + 1,
          text: "Thank you for your message. I'm processing your request...",
          type: 'assistant',
          timestamp: new Date().toISOString()
        }
        setChatHistory(prev => [...prev, aiResponse])
      }, 1000)

    } catch (error) {
      console.error('Send message error:', error)
      const errorMessage = {
        id: Date.now() + 1,
        text: 'Failed to send message. Please try again.',
        type: 'error',
        timestamp: new Date().toISOString()
      }
      setChatHistory(prev => [...prev, errorMessage])
    }
  }

  const handleNewChat = async () => {
    setCurrentChatId(null)
    setChatHistory([])
    setShowSubscriptionManager(false)
    setShowUserManager(false)
    setShowSupportForm(false)
    setShowFAQ(false)
  }

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
  }

  // Theme classes
  const themeClasses = {
    background: isDarkMode ? 'bg-gray-900' : 'bg-white',
    text: isDarkMode ? 'text-white' : 'text-gray-900',
    textSecondary: isDarkMode ? 'text-gray-400' : 'text-gray-600',
    border: isDarkMode ? 'border-gray-700' : 'border-gray-300',
    cardBackground: isDarkMode ? 'bg-gray-800' : 'bg-gray-100',
    inputBackground: isDarkMode ? 'bg-gray-800' : 'bg-white',
    hoverBackground: isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'
  }

  return (
    <div className={`flex h-screen ${themeClasses.background} ${themeClasses.text} relative`}>
      <ResponsiveSidebar 
        isLeftSidebarOpen={isLeftSidebarOpen}
        setIsLeftSidebarOpen={setIsLeftSidebarOpen}
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
        handleNewChat={handleNewChat}
        isCreatingChat={isCreatingChat}
        setShowSubscriptionManager={setShowSubscriptionManager}
        setShowUserManager={setShowUserManager}
        setShowSupportForm={setShowSupportForm}
        setShowFAQ={setShowFAQ}
        handleLogout={handleLogout}
        isLoggingOut={isLoggingOut}
        activeSection={showSupportForm ? "support" : showFAQ ? "faq" : showSubscriptionManager ? "subscription" : showUserManager ? "users" : ""}
        themeClasses={themeClasses}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col transition-all duration-300 min-w-0">
        <div className={`flex items-center justify-between p-3 sm:p-6 ${themeClasses.border} border-b ${themeClasses.background}`}>
          <div className="flex items-center space-x-2 sm:space-x-4 min-w-0">
            {/* Dynamic Header Content */}
            {showSubscriptionManager ? (
              <h2 className={`text-lg sm:text-2xl font-semibold ${themeClasses.text} truncate`}>Manage Subscription</h2>
            ) : showUserManager ? (
              <h2 className={`text-lg sm:text-2xl font-semibold ${themeClasses.text} truncate`}>User Management</h2>
            ) : showSupportForm ? (
              <h2 className={`text-lg sm:text-2xl font-semibold ${themeClasses.text} truncate`}>Help And Support</h2>
            ) : showFAQ ? (
              <h2 className={`text-lg sm:text-2xl font-semibold ${themeClasses.text} truncate`}>FAQ</h2>
            ) : (
              <>
                <div className={`w-8 h-8 sm:w-10 sm:h-10 ${isDarkMode ? 'bg-gray-600' : 'bg-gray-400'} rounded-full flex items-center justify-center flex-shrink-0`}>
                  <svg className={`w-4 h-4 sm:w-6 sm:h-6 ${themeClasses.text}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div className="min-w-0">
                  <h2 className={`text-lg sm:text-xl font-semibold ${themeClasses.text} truncate`}>Guest</h2>
                  <p className={`${themeClasses.textSecondary} text-xs sm:text-sm hidden sm:block`}>Welcome back</p>
                </div>
              </>
            )}
          </div>
          {(!showSupportForm && !showFAQ && !showSubscriptionManager && !showUserManager) && !isRightSidebarOpen && (
            <button
              onClick={() => setIsRightSidebarOpen(!isRightSidebarOpen)}
              className="p-2 sm:p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors shadow-lg flex-shrink-0"
              title="Toggle Chat History"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
          )}
        </div>

        {/* Dynamic Content Area*/}
        {showSupportForm ? (
          <SupportForm />
        ) : showFAQ ? (
          <FAQ />
        ) : showSubscriptionManager ? (
          <SubscriptionManager />
        ) : showUserManager ? (
          <UserManager />
        ) : (
          /* Main Chat Interface */
          <>
            {/* Chat Area */}
            <div className="flex-1 flex flex-col">
              {/* AI Tabs */}
              <div className={`p-3 sm:p-6 ${themeClasses.background}`}>
                <div className="flex justify-center">
                  <div className="flex space-x-1 sm:space-x-2 overflow-x-auto pb-2">
                    {['Chartwright', 'TranscriptX', 'Redactify', 'Validify'].map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`py-2 px-3 sm:px-6 rounded-full text-xs sm:text-sm font-medium transition-colors whitespace-nowrap flex-shrink-0 ${
                          activeTab === tab
                            ? 'bg-blue-600 text-white shadow-lg'
                            : `${themeClasses.cardBackground} ${themeClasses.textSecondary} hover:text-white ${themeClasses.hoverBackground} border ${themeClasses.border}`
                        }`}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 flex items-center justify-center px-3 sm:px-6">
                {chatHistory.length === 0 ? (
                  <div className="text-center">
                    <h1 className="text-2xl sm:text-4xl font-bold text-blue-500 mb-2">Hello,</h1>
                    <p className={`text-lg sm:text-xl ${themeClasses.textSecondary}`}>How Can I Help You Today</p>
                  </div>
                ) : (
                  <div className="w-full max-w-4xl mx-auto p-3 sm:p-6 space-y-4">
                    {chatHistory.map((msg) => (
                      <div
                        key={msg.id}
                        className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[85%] sm:max-w-sm px-3 sm:px-4 py-2 rounded-lg break-words ${
                            msg.type === 'user'
                              ? 'bg-blue-600 text-white'
                              : msg.type === 'error'
                              ? 'bg-red-600 text-white'
                              : `${themeClasses.cardBackground} ${themeClasses.text}`
                          }`}
                        >
                          {msg.text}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Message Input */}
              <div className={`p-3 sm:p-6 ${themeClasses.background}`}>
                <div className="max-w-4xl mx-auto">
                  <div className="relative">
                    <div className={`flex items-center ${themeClasses.inputBackground} rounded-full border ${themeClasses.border} px-2 sm:px-4 py-2 sm:py-3`}>
                      <button className={`${themeClasses.textSecondary} hover:text-white p-1 sm:p-2 rounded-lg ${themeClasses.hoverBackground} transition-colors mr-1 sm:mr-2 flex-shrink-0`}>
                        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                        </svg>
                      </button>
                      <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Type your message..."
                        className={`flex-1 bg-transparent ${themeClasses.text} ${isDarkMode ? 'placeholder-gray-400' : 'placeholder-gray-500'} focus:outline-none text-sm sm:text-base min-w-0`}
                      />
                      <button className={`${themeClasses.textSecondary} hover:text-white p-1 sm:p-2 rounded-lg ${themeClasses.hoverBackground} transition-colors mx-1 sm:mx-2 flex-shrink-0 hidden sm:block`}>
                        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                        </svg>
                      </button>
                      <button
                        onClick={handleSendMessage}
                        disabled={!message.trim() || isCreatingChat || isAddingMessage}
                        className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white p-1.5 sm:p-2 rounded-lg transition-colors disabled:cursor-not-allowed flex-shrink-0"
                      >
                        {(isCreatingChat || isAddingMessage) ? (
                          <svg className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                        ) : (
                          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Right Sidebar for Chat History */}
      {(!showSupportForm && !showFAQ && !showSubscriptionManager && !showUserManager) && isRightSidebarOpen && (
        <>
          {/* Mobile Overlay */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            onClick={() => setIsRightSidebarOpen(false)}
          />
          
          <div className={`fixed md:relative right-0 top-0 h-full w-80 max-w-[85vw] ${themeClasses.cardBackground} border-l ${themeClasses.border} flex flex-col z-50 md:z-auto`}>
            <div className={`flex items-center justify-between p-4 border-b ${themeClasses.border}`}>
              <h3 className={`text-lg font-semibold ${themeClasses.text}`}>History</h3>
              <button
                onClick={() => setIsRightSidebarOpen(false)}
                className={`p-1 ${themeClasses.textSecondary} hover:text-white transition-colors`}
                title="Close History"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* Search Input */}
            <div className="p-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search chats..."
                  className={`w-full ${themeClasses.cardBackground} ${themeClasses.text} ${isDarkMode ? 'placeholder-gray-400' : 'placeholder-gray-500'} rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 border ${themeClasses.border} text-sm`}
                />
              </div>
            </div>
            
            {/* Chat List */}
            <div className="flex-1 px-4 pb-4 overflow-y-auto">
              {userChats && userChats.length > 0 ? (
                <div className="space-y-2">
                  {userChats.map((chat) => (
                    <div
                      key={chat.id}
                      className={`p-3 rounded-lg cursor-pointer transition-colors ${
                        currentChatId === chat.id ? 'bg-blue-600' : `${themeClasses.cardBackground} ${themeClasses.hoverBackground}`
                      }`}
                      onClick={() => {
                        setCurrentChatId(chat.id)
                        setChatHistory(chat.messages || [])
                        // Close sidebar on mobile after selection
                        if (window.innerWidth < 768) {
                          setIsRightSidebarOpen(false)
                        }
                      }}
                    >
                      <p className={`${themeClasses.text} font-medium truncate text-sm`}>{chat.title}</p>
                      <p className={`${themeClasses.textSecondary} text-xs`}>
                        {new Date(chat.updated_at).toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className={`${themeClasses.textSecondary} text-sm`}>No chats found.</p>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default HomePage
