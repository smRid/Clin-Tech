import React, { useState, useEffect } from 'react'
import { useGetUserProfileQuery, useUpdateUserProfileMutation, useLogoutMutation } from '../store/api/authApi'
import { useDispatch, useSelector } from 'react-redux'
import { clearCredentials } from '../store/slices/authSlice'

const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: '',
    company: ''
  })
  const [errors, setErrors] = useState({})

  const dispatch = useDispatch()
  const { user } = useSelector(state => state.auth)
  
  const { data: profile, isLoading: isLoadingProfile, error: profileError } = useGetUserProfileQuery()
  const [updateProfile, { isLoading: isUpdating }] = useUpdateUserProfileMutation()
  const [logout, { isLoading: isLoggingOut }] = useLogoutMutation()

  // Update local state when profile data is loaded
  useEffect(() => {
    if (profile) {
      setProfileData({
        name: profile.name || user?.name || '',
        email: profile.email || user?.email || '',
        phone: profile.phone || '',
        company: profile.company || ''
      })
    }
  }, [profile, user])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }))
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!profileData.name.trim()) {
      newErrors.name = 'Name is required'
    }

    if (!profileData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(profileData.email)) {
      newErrors.email = 'Email is invalid'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSaveProfile = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return

    try {
      await updateProfile(profileData).unwrap()
      
      setErrors({ submit: 'Profile updated successfully!' })
      setIsEditing(false)
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setErrors(prev => ({ ...prev, submit: '' }))
      }, 3000)
      
    } catch (error) {
      console.error('Profile update error:', error)
      setErrors({ submit: error.data?.message || 'Failed to update profile. Please try again.' })
    }
  }

  const handleLogout = async () => {
    try {
      await logout().unwrap()
      dispatch(clearCredentials())
    } catch (error) {
      console.error('Logout error:', error)
      // Even if logout API fails, clear local credentials
      dispatch(clearCredentials())
    }
  }

  const handleCancelEdit = () => {
    setIsEditing(false)
    setErrors({})
    // Reset form data to original values
    if (profile) {
      setProfileData({
        name: profile.name || user?.name || '',
        email: profile.email || user?.email || '',
        phone: profile.phone || '',
        company: profile.company || ''
      })
    }
  }

  if (isLoadingProfile) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    )
  }

  if (profileError) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
            <p className="text-red-600">Failed to load profile. Please try again.</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-4 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">User Profile</h1>
              <p className="text-gray-600">Manage your account information</p>
            </div>
            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white px-6 py-2 rounded-lg font-medium transition-colors disabled:cursor-not-allowed"
            >
              {isLoggingOut ? 'Logging out...' : 'Logout'}
            </button>
          </div>
        </div>

        {/* Profile Form */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <form onSubmit={handleSaveProfile}>
            <div className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={profileData.name}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
                  placeholder="Enter your full name"
                />
                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={profileData.email}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
                  placeholder="Enter your email address"
                />
                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={profileData.phone}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
                  placeholder="Enter your phone number"
                />
              </div>

              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                  Company
                </label>
                <input
                  id="company"
                  name="company"
                  type="text"
                  value={profileData.company}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
                  placeholder="Enter your company name"
                />
              </div>
            </div>

            {errors.submit && (
              <div className={`mt-6 border rounded-lg p-3 ${
                errors.submit.includes('successfully') 
                  ? 'bg-green-50 border-green-200' 
                  : 'bg-red-50 border-red-200'
              }`}>
                <p className={`text-sm ${
                  errors.submit.includes('successfully') 
                    ? 'text-green-600' 
                    : 'text-red-600'
                }`}>
                  {errors.submit}
                </p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="mt-8 flex justify-end space-x-4">
              {isEditing ? (
                <>
                  <button
                    type="button"
                    onClick={handleCancelEdit}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isUpdating}
                    className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-3 rounded-lg font-medium transition-colors disabled:cursor-not-allowed"
                  >
                    {isUpdating ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Saving...
                      </div>
                    ) : (
                      'Save Changes'
                    )}
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  Edit Profile
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default UserProfile
