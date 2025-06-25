import React from 'react'

const CaseUseSection = () => {
  const cases = [
    {
      specialty: 'Primary Care',
      description: 'Dr SJ M.D reduced her documentation time by 52%, allowing her to see 3 more patients daily while finishing her charts before leaving the office.',
      quote: 'This AI tool streamlines a tedious process, reduces "click fatigue," and helps me reclaim some sanity.',
      author: '— Dr. SJ, MD'
    },
    {
      specialty: 'Emergency Medicine',
      description: 'Our ED department implemented Clin Tech, resulting in more thorough documentation and a 70% decrease in chart completion time during high-volume periods. Our nurses love it.',
      quote: '',
      author: '— Emergency Department (ED) Nurse Manager'
    },
    {
      specialty: 'Behavioral Health',
      description: '',
      quote: 'Chartwright has been transformative for our clinic. Our therapists were drowning in documentation; We\'ve slashed average charting time to under 3 minutes per patient, freeing up hours for direct care. More importantly, we\'ve seen a significant reduction in documentation errors and compliance flags. It\'s not just faster; it\'s smarter documentation.',
      author: '— Clinical Director, Behavioral Health Practice'
    },
    {
      specialty: 'Case Management',
      description: '',
      quote: 'Honestly, with the number of patients I manage, documentation felt like a constant, losing battle. But this AI feels like getting an assistant. It takes my detailed notes and instantly creates the clear, customized charts I need. I\'m getting hours back each week – hours I can now spend directly with patients, tackling barriers, not just typing.',
      author: '— Social Worker/Case Manager'
    }
  ]

  return (
    <section id="case-use" className="py-20 bg-slate-900">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-blue-400 mb-8">Case Use</h2>
          <p className="text-xl text-gray-300 mb-12">
            See how healthcare providers across specialties are transforming their practice with Clin Technologies:
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {cases.map((caseStudy, index) => (
            <div 
              key={index} 
              className="bg-slate-700 rounded-xl p-8 hover:shadow-xl hover:shadow-blue-500/20 hover:-translate-y-2 transition-all duration-300 group"
            >
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-blue-400 mb-6">{caseStudy.specialty}</h3>
                
                {caseStudy.description && (
                  <p className="text-gray-300 leading-relaxed mb-6 text-base">
                    {caseStudy.description}
                  </p>
                )}
                
                {caseStudy.quote && (
                  <blockquote className="text-gray-300 leading-relaxed mb-6 text-base italic">
                    "{caseStudy.quote}"
                  </blockquote>
                )}
                
                <p className="text-gray-400 font-medium text-sm text-right">
                  {caseStudy.author}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CaseUseSection
