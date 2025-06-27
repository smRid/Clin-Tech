import React, { useState } from 'react'
import { useSendSupportRequestMutation } from '../store/api/authApi'

const SupportForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    query: ''
  })
  const [errors, setErrors] = useState({})

  const [sendSupportRequest, { isLoading }] = useSendSupportRequestMutation()

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

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid'
    }

    if (!formData.query.trim()) {
      newErrors.query = 'Message is required'
    } else if (formData.query.trim().length < 10) {
      newErrors.query = 'Message must be at least 10 characters'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return

    try {
      await sendSupportRequest({
        email: formData.email.trim(),
        query: formData.query.trim()
      }).unwrap()

      setErrors({ submit: 'Support request sent successfully! We\'ll get back to you soon.' })
      
      // Clear form
      setFormData({ email: '', query: '' })
      
    } catch (error) {
      console.error('Support request error:', error)
      
      if (error.status === 400) {
        setErrors({ submit: error.data?.message || 'Invalid request data' })
      } else if (error.status === 500) {
        setErrors({ submit: 'Server error. Please try again later.' })
      } else {
        setErrors({ submit: error.data?.message || 'Failed to send support request. Please try again.' })
      }
    }
  }

  return (
    <div className="flex-1 flex flex-col p-8 pt-12">
      <div className="max-w-4xl w-full mx-auto">
        <div className="max-w-2xl">
          {/* Support Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="support-email" className="block text-sm font-medium text-white mb-2">
                Your Email
              </label>
              <input
                id="support-email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                placeholder="Enter Email"
              />
              {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="support-query" className="block text-sm font-medium text-white mb-2">
                Description
              </label>
              <textarea
                id="support-query"
                name="query"
                rows={6}
                value={formData.query}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none"
                placeholder="Enter your query or feedback"
              />
              {errors.query && <p className="mt-1 text-sm text-red-400">{errors.query}</p>}
            </div>

            {errors.submit && (
              <div className={`border rounded-lg p-3 ${
                errors.submit.includes('successfully') 
                  ? 'bg-green-900 border-green-600' 
                  : 'bg-red-900 border-red-600'
              }`}>
                <p className={`text-sm ${
                  errors.submit.includes('successfully') 
                    ? 'text-green-300' 
                    : 'text-red-300'
                }`}>
                  {errors.submit}
                </p>
              </div>
            )}

            {/* Send Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isLoading}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-8 py-3 rounded-lg font-medium transition-colors disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Sending...
                  </div>
                ) : (
                  'Send'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SupportForm
