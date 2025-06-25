import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSignupMutation, useSigninMutation } from '../store/api/authApi'
import { useDispatch } from 'react-redux'
import { setCredentials } from '../store/slices/authSlice'

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [errors, setErrors] = useState({})

  const dispatch = useDispatch()
  const [signup, { isLoading: isSignupLoading }] = useSignupMutation()
  const [signin, { isLoading: isSigninLoading }] = useSigninMutation()

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
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

    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid'
    }

    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }

    if (!isLogin && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return

    try {
      const credentials = {
        email: formData.email,
        password: formData.password
      }

      let result
      if (isLogin) {
        result = await signin(credentials).unwrap()
      } else {
        result = await signup(credentials).unwrap()
      }

      dispatch(setCredentials({
        user: result.user,
        token: result.token || result.access_token
      }))

      if (result.isMock) {
        setErrors({ submit: 'Demo mode: Authentication successful! (API not configured)' })
        setTimeout(() => {
          setErrors({})
          // You could redirect to dashboard here in real app
        }, 3000)
      } else {
        // Real API success - redirect to dashboard
        setErrors({ submit: 'Authentication successful!' })
        setTimeout(() => {
          setErrors({})
          // Redirect to dashboard
        }, 2000)
      }
    } catch (error) {
      console.error('Auth error:', error)
      setErrors({ submit: error.data?.message || 'Authentication failed' })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center px-6 py-12">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <Link to="/" className="flex items-center justify-center space-x-2 mb-8">
            <img 
              src="/Logo.png" 
              alt="Clin Technologies Logo" 
              className="w-10 h-10 object-contain"
            />
            <span className="text-gray-900 font-semibold text-2xl">Clin</span>
          </Link>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            {isLogin ? 'Hello, Welcome!' : 'Create account'}
          </h2>
          <p className="mt-2 text-gray-500 text-sm">
            {isLogin ? 'Please Enter Your Details Below To Continue' : 'Enter The Email Address Associated With Your Account. We\'ll Send You An OTP To Your Email.'}
          </p>
        </div>

        {/* Form */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                {isLogin ? 'Your Email' : 'Your Email'}
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white transition-colors"
                placeholder={isLogin ? "Enter Email" : "Enter Email"}
              />
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                {isLogin ? 'Password' : 'New Password'}
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white transition-colors pr-10"
                  placeholder={isLogin ? "Enter Password" : "Enter New Password"}
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
              </div>
              {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
            </div>

            {!isLogin && (
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white transition-colors pr-10"
                    placeholder="Confirm New Password"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                </div>
                {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>}
              </div>
            )}

            {isLogin && (
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                    Remember Me
                  </label>
                </div>
                <div className="text-sm">
                  <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                    Forgot Password?
                  </a>
                </div>
              </div>
            )}
          </div>

          {errors.submit && (
            <div className={`border rounded-lg p-3 ${
              errors.submit.includes('successful') 
                ? 'bg-green-50 border-green-200' 
                : 'bg-red-50 border-red-200'
            }`}>
              <p className={`text-sm ${
                errors.submit.includes('successful') 
                  ? 'text-green-600' 
                  : 'text-red-600'
              }`}>
                {errors.submit}
              </p>
            </div>
          )}

          <button
            type="submit"
            disabled={isSignupLoading || isSigninLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-8 py-4 rounded-lg font-semibold text-base transition-all duration-300 disabled:cursor-not-allowed shadow-sm"
          >
            {(isSignupLoading || isSigninLoading) ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                {isLogin ? 'Signing in...' : 'Signing up...'}
              </div>
            ) : (
              isLogin ? 'Login' : 'Sign Up'
            )}
          </button>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              {isLogin ? (
                <>
                  create account,{' '}
                  <button
                    type="button"
                    onClick={() => {
                      setIsLogin(!isLogin)
                      setErrors({})
                      setFormData({ email: '', password: '', confirmPassword: '' })
                    }}
                    className="font-medium text-blue-600 hover:text-blue-700"
                  >
                    sign up
                  </button>
                </>
              ) : (
                <>
                  Already Have An Account?{' '}
                  <button
                    type="button"
                    onClick={() => {
                      setIsLogin(!isLogin)
                      setErrors({})
                      setFormData({ email: '', password: '', confirmPassword: '' })
                    }}
                    className="font-medium text-blue-600 hover:text-blue-700"
                  >
                    Login
                  </button>
                </>
              )}
            </p>
          </div>

          <div className="text-center">
            <Link to="/" className="text-gray-500 hover:text-gray-700 font-medium text-sm">
              ← Back to home
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AuthPage
