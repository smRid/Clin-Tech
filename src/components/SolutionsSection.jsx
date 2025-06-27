import React from 'react'

const SolutionsSection = () => {
  const solutions = [
    {
      id: 'validify',
      title: 'Validify',
      borderColor: 'border-t-green-400',
      description: 'Mitigate compliance risk with powerful AI that optimizes chart reviews for accuracy, integrity, coding, and compliance. Validify automatically identifies documentation gaps, ensures coding accuracy, and maintains regulatory compliance.',
      icon: (
        <svg className="w-8 h-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      )
    },
    {
      id: 'redactify',
      title: 'Redactify', 
      borderColor: 'border-t-orange-400',
      description: 'Effortlessly redact HIPAA identifiers from text, documents, and structured data with Redactify – automating your compliance workflow. Protect sensitive patient information while maintaining clinical context.',
      icon: (
        <svg className="w-8 h-8 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    },
    {
      id: 'transcriptx',
      title: 'TranscriptX',
      borderColor: 'border-t-blue-400',
      description: 'Spend less time documenting. TranscriptX dictates highly accurate medical transcriptions of patient encounters into text, understanding complex medical terminology and clinical context for superior accuracy.',
      icon: (
        <svg className="w-8 h-8 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
        </svg>
      )
    },
    {
      id: 'chartwright',
      title: 'Chartwright',
      borderColor: 'border-t-purple-400',
      description: 'Your best friend with charting – turn any normal text into a high-quality chart, delivered exactly how healthcare professionals need it with extensive customization options to match your workflow and documentation standards.',
      icon: (
        <svg className="w-8 h-8 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    }
  ]

  return (
    <section id="solutions" className="py-20 bg-slate-900">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-blue-400 mb-6">Our Solutions</h2>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Our comprehensive suite of AI-powered solutions transforms every aspect of healthcare documentation:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {solutions.map((solution) => (
            <div
              key={solution.id}
              className={`bg-slate-800 rounded-xl p-8 border-t-4 ${solution.borderColor} hover:bg-slate-750 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10 hover:-translate-y-2 transform cursor-pointer`}
            >
              <div className="flex justify-start mb-6">
                <div className="p-3 bg-slate-700 rounded-lg">
                  {solution.icon}
                </div>
              </div>
              
              <h3 className="text-2xl font-bold text-blue-400 mb-4">{solution.title}</h3>
              
              <p className="text-gray-300 leading-relaxed text-base">
                {solution.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default SolutionsSection
