import React, { useState, useEffect } from 'react'
import { useVerifyOtpMutation, useResendOtpMutation } from '../store/api/authApi'
import { useDispatch } from 'react-redux'
import { setCredentials } from '../store/slices/authSlice'

const OtpVerification = ({ email, onBack, onSuccess }) => {
  const [otp, setOtp] = useState('')
  const [errors, setErrors] = useState({})
  const [countdown, setCountdown] = useState(60)
  const [canResend, setCanResend] = useState(false)

  const dispatch = useDispatch()
  const [verifyOtp, { isLoading: isVerifying }] = useVerifyOtpMutation()
  const [resendOtp, { isLoading: isResending }] = useResendOtpMutation()

  // Countdown timer for resend OTP
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    } else {
      setCanResend(true)
    }
  }, [countdown])

  const handleOtpChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 4) // Only numbers, max 4 digits
    setOtp(value)
    if (errors.otp || errors.submit) {
      setErrors(prev => ({ ...prev, otp: '', submit: '' }))
    }
  }

  const handleVerifyOtp = async (e) => {
    e.preventDefault()
    
    // Clear previous errors
    setErrors({})
    
    if (!otp) {
      setErrors({ otp: 'Please enter the OTP' })
      return
    }
    
    if (otp.length !== 4) {
      setErrors({ otp: 'OTP must be 4 digits' })
      return
    }

    try {
      console.log('Verifying OTP with:', { email, otp })
      
      const result = await verifyOtp({
        email,
        otp
      }).unwrap()

      console.log('OTP verification result:', result)

      // Handle successful OTP verification
      if (result.user && (result.token || result.access_token)) {
        dispatch(setCredentials({
          user: result.user,
          token: result.token || result.access_token
        }))
        
        setErrors({ submit: 'OTP verified successfully!' })
        
        // Call success callback if provided
        setTimeout(() => {
          if (onSuccess) {
            onSuccess(result)
          }
        }, 1000)
      } else {
        console.error('Invalid response structure:', result)
        setErrors({ submit: 'Invalid response from server. Please try again.' })
      }
      
    } catch (error) {
      console.error('OTP verification error:', error)
      console.error('Error status:', error.status)
      console.error('Error data:', error.data)
      
      if (error.status === 400) {
        if (error.data?.message) {
          setErrors({ otp: error.data.message })
        } else if (error.data?.error?.message) {
          setErrors({ otp: error.data.error.message })
        } else {
          setErrors({ otp: 'Invalid OTP. Please try again.' })
        }
      } else if (error.status === 404) {
        setErrors({ submit: 'OTP has expired. Please request a new one.' })
      } else if (error.status === 422) {
        setErrors({ otp: 'Invalid OTP format. Please enter a 4-digit code.' })
      } else {
        const errorMessage = error.data?.message || error.data?.error?.message || 'OTP verification failed. Please try again.'
        setErrors({ submit: errorMessage })
      }
    }
  }

  const handleResendOtp = async () => {
    try {
      console.log('Resending OTP to:', email)
      
      const result = await resendOtp({ email }).unwrap()
      console.log('Resend OTP result:', result)
      
      setCountdown(60)
      setCanResend(false)
      setOtp('') // Clear the OTP input
      setErrors({ submit: 'New OTP sent to your email!' })
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setErrors(prev => ({ ...prev, submit: '' }))
      }, 3000)
      
    } catch (error) {
      console.error('Resend OTP error:', error)
      console.error('Error status:', error.status)
      console.error('Error data:', error.data)
      
      const errorMessage = error.data?.message || error.data?.error?.message || 'Failed to resend OTP. Please try again.'
      setErrors({ submit: errorMessage })
    }
  }

  return (
    <div className="max-w-md w-full space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Verify Your Email
        </h2>
        <p className="mt-2 text-gray-500 text-sm">
          We've sent a 4-digit verification code to
        </p>
        <p className="text-blue-600 font-semibold">{email}</p>
      </div>

      {/* OTP Form */}
      <form className="mt-8 space-y-6" onSubmit={handleVerifyOtp}>
        <div>
          <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-2">
            Enter Verification Code
          </label>
          <input
            id="otp"
            name="otp"
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            value={otp}
            onChange={handleOtpChange}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white transition-colors text-center text-2xl tracking-widest"
            placeholder="0000"
            maxLength={4}
          />
          {errors.otp && <p className="mt-1 text-sm text-red-600">{errors.otp}</p>}
        </div>

        {errors.submit && (
          <div className={`border rounded-lg p-3 ${
            typeof errors.submit === 'string' && (errors.submit.includes('successfully') || errors.submit.includes('sent')) 
              ? 'bg-green-50 border-green-200' 
              : 'bg-red-50 border-red-200'
          }`}>
            <p className={`text-sm ${
              typeof errors.submit === 'string' && (errors.submit.includes('successfully') || errors.submit.includes('sent')) 
                ? 'text-green-600' 
                : 'text-red-600'
            }`}>
              {typeof errors.submit === 'string' ? errors.submit : 'An error occurred. Please try again.'}
            </p>
          </div>
        )}

        <button
          type="submit"
          disabled={isVerifying}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-8 py-4 rounded-lg font-semibold text-base transition-all duration-300 disabled:cursor-not-allowed shadow-sm"
        >
          {isVerifying ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Verifying...
            </div>
          ) : (
            'Verify OTP'
          )}
        </button>

        {/* Resend OTP */}
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Didn't receive the code?{' '}
            {canResend ? (
              <button
                type="button"
                onClick={handleResendOtp}
                disabled={isResending}
                className="font-medium text-blue-600 hover:text-blue-700 disabled:text-blue-400"
              >
                {isResending ? 'Resending...' : 'Resend OTP'}
              </button>
            ) : (
              <span className="text-gray-400">
                Resend in {countdown}s
              </span>
            )}
          </p>
        </div>

        {/* Back button */}
        <div className="text-center">
          <button
            type="button"
            onClick={onBack}
            className="text-gray-500 hover:text-gray-700 font-medium text-sm"
          >
            ← Back to login
          </button>
        </div>
      </form>
    </div>
  )
}

export default OtpVerification
