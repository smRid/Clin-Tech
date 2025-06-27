import React, { useState, useRef } from 'react'

const FAQ = () => {
  const [openItem, setOpenItem] = useState(null) 
  const itemRefs = useRef({})

  const faqData = [
    {
      id: 1,
      question: "Is Clin Technologies HIPAA compliant?",
      answer: "Yes, all of our AI-powered solutions are fully HIPAA compliant. We follow a security-first architecture with comprehensive encryption (at rest and in transit), zero-trust principles, and role-based access controls to protect patient data. We also offer Business Associate Agreements (BAAs) for added assurance."
    },
    {
      id: 2,
      question: "Can I integrate Clin Technologies with my existing EMR system?",
      answer: "Absolutely. Our AI platform is built with seamless EMR integration in mind. Once set up, the AI-generated documentation is automatically formatted to match your system's requirements, streamlining your workflow and minimizing manual entry."
    },
    {
      id: 3,
      question: "How does the AI personalize my documentation process?",
      answer: "Our system includes a Learning Mode that adapts to your specific workflow and preferences over time. The AI refines its understanding based on your feedback, ensuring highly accurate and customized output tailored to your specialty and charting habits."
    },
    {
      id: 4,
      question: "What if the AI-generated documentation isn't accurate?",
      answer: "You can always review and adjust the output. If something doesn't align with your expectations, simply provide feedback through the system. Our AI learns continuously to improve accuracy and precision over time.\n\nFor example:\n\n• \"The SOAP note was too generic. Please include more detail about the patient's symptoms and clinical reasoning.\"\n\n• \"This chart includes terms we don't use in our clinic. Please adjust the language to match our documentation style.\""
    },
    {
      id: 5,
      question: "What solutions does Clin Technologies offer?",
      answer: "We offer a suite of AI-powered tools to enhance every part of your clinical documentation:\n\n• **TranscriptX:** Accurate medical transcriptions of clinical encounters.\n\n• **Chartwright:** Converts raw input into fully formatted charts with customization.\n\n• **Redactify:** Redacts patient identifiers to support compliance and data protection.\n\n• **Validify:** Reviews charts for coding accuracy, documentation gaps, and regulatory compliance."
    },
    {
      id: 6,
      question: "Who can use Clin Technologies?",
      answer: "Clin Technologies is ideal for healthcare professionals across all specialties — from solo practitioners and primary care providers to large clinics, hospitals, and behavioral health practices. If you document patient care, Clin can help."
    },
    {
      id: 7,
      question: "Do you offer a free trial?",
      answer: "Yes! We encourage healthcare providers to try Clin Technologies for FREE to experience how our AI transforms clinical documentation. Just click \"Signup\" on our website to get started."
    },
    {
      id: 8,
      question: "I have another question. How can I contact support?",
      answer: "We're happy to help! Please reach out through our support page or email us directly at support@clintechso.com. Our team is ready to assist with setup, customization, or general inquiries."
    }
  ]

  const toggleItem = (id) => {
    const newOpenItem = openItem === id ? null : id
    setOpenItem(newOpenItem)
    
    if (newOpenItem && itemRefs.current[id]) {
      setTimeout(() => {
        itemRefs.current[id].scrollIntoView({
          behavior: 'smooth',
          block: 'nearest'
        })
      }, 100) 
    }
  }

  return (
    <div className="flex-1 flex flex-col p-4 sm:p-8 pt-6 sm:pt-12 overflow-y-auto">
      <div className="max-w-4xl w-full mx-auto">
        <div className="space-y-4 pb-8">
          {faqData.map((item) => (
            <div 
              key={item.id} 
              ref={el => itemRefs.current[item.id] = el}
              className="border border-gray-600 rounded-lg bg-gray-800"
            >
              <button
                onClick={() => toggleItem(item.id)}
                className="w-full flex items-center justify-between p-4 sm:p-6 text-left hover:bg-gray-700 transition-colors"
              >
                <h3 className="text-white font-medium text-base sm:text-lg pr-4">
                  {item.question}
                </h3>
                <div className="flex-shrink-0">
                  {openItem === item.id ? (
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white transform transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white transform transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  )}
                </div>
              </button>
              
              {openItem === item.id && (
                <div className="px-4 sm:px-6 pb-4 sm:pb-6 animate-in slide-in-from-top-2 duration-300">
                  <div className="text-gray-300 leading-relaxed whitespace-pre-line text-sm sm:text-base">
                    {item.answer}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default FAQ
