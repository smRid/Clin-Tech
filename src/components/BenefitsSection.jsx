import React from 'react'
import { Link } from 'react-router-dom'

const BenefitsSection = () => {
  const benefits = [
    'Reduction in documentation time by 40-60%',
    'Improved work-life balance with less after-hours charting',
    'Enhanced patient interaction due to less focus on note-taking',
    'More comprehensive and consistent clinical documentation',
    'Reduced risk of documentation errors and omissions'
  ]

  return (
    <section id="benefits" className="py-20 bg-slate-800">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-blue-400 mb-8">Benefits</h2>
          <p className="text-xl text-gray-300 mb-12">
            Healthcare providers using Clin Technologies solutions report:
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-6 mb-16">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start">
                <div className="w-2 h-2 bg-white rounded-full flex-shrink-0 mr-4 mt-3">
                </div>
                <p className="text-gray-300 text-lg leading-relaxed">{benefit}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
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
      </div>
    </section>
  )
}

export default BenefitsSection
