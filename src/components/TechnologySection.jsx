import React from 'react'

const TechnologySection = () => {
  const technologies = [
    {
      title: 'Sophisticated Natural Language Processing',
      icon: (
        <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-600 rounded-lg flex items-center justify-center">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        </div>
      ),
      description: 'At the core of our platform is an advanced foundation model. This enables our system to grasp the nuances of clinical conversations — understanding context, recognizing intent, and accurately interpreting medical terminology. This deep comprehension allows the AI to generate clear, concise, and contextually relevant medical notes automatically.',
      bgColor: 'bg-slate-700',
      borderColor: 'border-pink-400',
      titleColor: 'text-pink-400'
    },
    {
      title: 'Learning Mode & Personalization',
      icon: (
        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-lg flex items-center justify-center">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </div>
      ),
      description: 'Our AI doesn\'t rely on generic templates. We initiate the process by learning directly from your specific cases and workflows. The system intelligently refines its understanding and output based on your ongoing feedback. With each processed case, its accuracy and alignment with your unique clinical documentation needs become increasingly precise, ensuring a truly personalized solution.',
      bgColor: 'bg-slate-700',
      borderColor: 'border-blue-400',
      titleColor: 'text-blue-400'
    },
    {
      title: 'Robust Data Privacy & Security',
      icon: null, 
      description: 'Protecting sensitive health information is paramount. Our AI solutions are architected with a security-first approach, incorporating principles like "zero trust". We utilize robust security measures, including comprehensive encryption (both at rest and in transit) and strict, role-based access controls, to ensure data integrity and confidentiality, limiting access exclusively to authorized personnel.',
      bgColor: 'bg-slate-700',
      borderColor: 'border-slate-600',
      titleColor: 'text-blue-400',
      badges: [
        { text: 'HIPAA COMPLIANT', color: 'bg-green-900 text-white' },
        { text: 'BUSINESS ASSOCIATE AGREEMENT', color: 'bg-blue-900 text-white' }
      ]
    }
  ]

  return (
    <section id="technology" className="py-20 bg-slate-900">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-blue-400 mb-6">Our Technology</h2>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            At Clin Technologies, we've built our platform on groundbreaking AI technology specifically designed for healthcare. Our solutions 
            use the latest advancements in natural language processing and machine learning to create a system that truly understands the 
            complexities of medical documentation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {technologies.map((tech, index) => (
            <div 
              key={index} 
              className={`${tech.bgColor} border-2 ${tech.borderColor} rounded-2xl p-6 hover:shadow-xl hover:shadow-blue-500/20 hover:scale-105 transition-all duration-300 group relative`}
            >
              {/* Badges positioned at top left */}
              {tech.badges && (
                <div className="mb-6 flex flex-col gap-2">
                  {tech.badges.map((badge, badgeIndex) => (
                    <span 
                      key={badgeIndex} 
                      className={`px-3 py-2 text-xs font-semibold rounded ${badge.color} transition-all duration-300 hover:scale-105 flex items-center gap-2 w-fit`}
                    >
                      {badge.text === 'HIPAA COMPLIANT' && (
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                        </svg>
                      )}
                      {badge.text === 'BUSINESS ASSOCIATE AGREEMENT' && (
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm0 2h12v8H4V6z" clipRule="evenodd" />
                        </svg>
                      )}
                      {badge.text}
                    </span>
                  ))}
                </div>
              )}

              <div className="mb-6">
                {tech.icon && (
                  <div className="mb-6">
                    {tech.icon}
                  </div>
                )}
                <h3 className={`text-2xl font-bold ${tech.titleColor} mb-4 group-hover:scale-105 transition-transform duration-300`}>
                  {tech.title}
                </h3>
              </div>
              
              <p className="text-gray-300 leading-relaxed text-base">
                {tech.description}
              </p>

              {/* Remove badges from bottom since they're now at top */}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TechnologySection
