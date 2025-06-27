import React from 'react'
import { Link } from 'react-router-dom'

const GetStartedSection = () => {
  return (
    <section className="py-20 bg-slate-800">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-blue-400 mb-8">Get Started</h2>
          <p className="text-xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
            Ready to transform your clinical documentation process? Contact our team to learn how Clin Technologies can be tailored to your 
            specific healthcare setting.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Email Contact Box */}
          <div className="mb-12 flex justify-center">
            <div className="border border-slate-600 rounded-lg p-8 bg-slate-800/50 backdrop-blur-sm max-w-md w-full">
              <p className="text-gray-300 text-center">
                Or reach us directly via email at{' '}
                <a 
                  href="mailto:support@clintechso.com" 
                  className="text-blue-400 hover:text-blue-300 underline"
                >
                  support@clintechso.com
                </a>
              </p>
            </div>
          </div>


          <div className="text-center mb-12">
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link 
                to="/auth" 
                className="bg-transparent border-2 border-blue-500 hover:bg-blue-990 text-white hover:text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105"
              >
                Login
              </Link>
              <Link 
                to="/auth" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105"
              >
                Signup
              </Link>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-20 pt-8 border-t border-slate-700">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex space-x-8 mb-4 md:mb-0">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Use</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
            </div>
            <p className="text-gray-400 text-sm">
              © 2025 Clin Technologies. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default GetStartedSection
