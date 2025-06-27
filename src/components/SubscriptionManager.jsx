import React from 'react'
import { useBuySubscriptionMutation } from '../store/api/authApi'

const SubscriptionManager = () => {
  const [buySubscription, { isLoading: isBuying }] = useBuySubscriptionMutation()

  const currentSubscription = {
    type: 'individual',
    startDate: 'July 02, 2025 18:09:53'
  }

  const handleUpgrade = async () => {
    try {
      await buySubscription({ subscription_plan: 'professional' }).unwrap()
      alert('Subscription upgraded successfully!')
    } catch (error) {
      console.error('Upgrade error:', error)
      alert('Failed to upgrade subscription. Please try again.')
    }
  }

  const handleCancel = async () => {
    if (window.confirm('Are you sure you want to cancel your subscription?')) {
      try {
        alert('Subscription cancelled successfully!')
      } catch (error) {
        console.error('Cancel error:', error)
        alert('Failed to cancel subscription. Please try again.')
      }
    }
  }

  return (
    <div className="flex-1 flex items-center justify-center p-8 pt-12">
      <div className="max-w-2xl w-full">
        <div className="border border-blue-500 rounded-lg p-8 bg-gray-900">

          <div className="space-y-6 mb-8">
            <div>
              <input
                type="text"
                value={currentSubscription.type}
                readOnly
                className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <input
                type="text"
                value={currentSubscription.startDate}
                readOnly
                className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex space-x-4">
            <button
              onClick={handleUpgrade}
              disabled={isBuying}
              className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white py-3 px-6 rounded-lg font-medium transition-colors disabled:cursor-not-allowed"
            >
              {isBuying ? 'Processing...' : 'Upgrade Subscription'}
            </button>
            
            <button
              onClick={handleCancel}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 px-6 rounded-lg font-medium transition-colors"
            >
              Cancel Subscription
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SubscriptionManager