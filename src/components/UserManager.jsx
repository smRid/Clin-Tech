import React, { useState } from 'react'
import { useGetCompanyUserListQuery, useAddCompanyUserMutation } from '../store/api/authApi'

const UserManager = () => {
  const [newUserEmail, setNewUserEmail] = useState('')
  
  const { data: userList, isLoading: isLoadingUsers, refetch } = useGetCompanyUserListQuery()
  const [addUser, { isLoading: isAddingUser }] = useAddCompanyUserMutation()

  const handleAddUser = async (e) => {
    e.preventDefault()
    if (!newUserEmail.trim()) return

    try {
      await addUser({ 
        email: newUserEmail, 
        role: 'user' 
      }).unwrap()
      
      setNewUserEmail('')
      refetch()
      alert('User invited successfully!')
    } catch (error) {
      console.error('Add user error:', error)
      alert('Failed to invite user. Please try again.')
    }
  }

  return (
    <div className="flex-1 flex flex-col p-8 pt-12">
      <div className="max-w-6xl w-full mx-auto">
        {/* Invite Section */}
        <div className="mb-8">
          <form onSubmit={handleAddUser} className="flex space-x-4">
            <input
              type="email"
              value={newUserEmail}
              onChange={(e) => setNewUserEmail(e.target.value)}
              className="flex-1 bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Invite others by email"
              required
            />
            <button
              type="submit"
              disabled={isAddingUser || !newUserEmail.trim()}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white px-6 py-3 rounded-lg font-medium transition-colors disabled:cursor-not-allowed flex items-center space-x-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
              </svg>
              <span>{isAddingUser ? 'Inviting...' : 'Invite'}</span>
            </button>
          </form>
        </div>

        {/* Users List */}
        <div className="bg-gray-800 rounded-lg border border-gray-700">
          {isLoadingUsers ? (
            <div className="p-8 text-center text-gray-400">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
              Loading users...
            </div>
          ) : userList && userList.length > 0 ? (
            <div className="divide-y divide-gray-700">
              {userList.map((user, index) => (
                <div key={user.id || index} className="px-6 py-4 flex items-center justify-between hover:bg-gray-750 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-lg font-semibold">
                        {user.name?.charAt(0)?.toUpperCase() || user.email?.charAt(0)?.toUpperCase() || 'U'}
                      </span>
                    </div>
                    <div>
                      <div className="text-white font-medium text-lg">{user.name || user.email}</div>
                      <div className="text-gray-400 text-sm">{user.email}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      user.role === 'admin' ? 'bg-red-900 text-red-300' :
                      user.role === 'manager' ? 'bg-yellow-900 text-yellow-300' :
                      'bg-green-900 text-green-300'
                    }`}>
                      {user.role || 'User'}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      user.status === 'active' ? 'bg-green-900 text-green-300' : 'bg-gray-600 text-gray-300'
                    }`}>
                      {user.status || 'Active'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-12 text-center text-gray-400">
              <svg className="w-16 h-16 mx-auto mb-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
              </svg>
              <p className="text-lg mb-2">No users have been invited yet.</p>
              <p className="text-sm">Invite team members using the form above.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default UserManager
