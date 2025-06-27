import React, { useState } from 'react'

const InActionSection = () => {
  const [activeTab, setActiveTab] = useState('TranscriptX')
  const [isExpanded, setIsExpanded] = useState(false)
  const [activeExample, setActiveExample] = useState(1)

  const tabs = ['TranscriptX', 'Chartwright', 'Redactify', 'Validify']

  const tabContent = {
    TranscriptX: {
      title: 'Experience TranscriptX - Effortless, Accurate Medical Transcription',
      examples: [
        {
          id: 1,
          title: "Doctor's Dictation",
          subtitle: "Audio Input",
          leftTitle: "Doctor's Dictation (Audio Input Simulation)",
          leftContent: `"Okay, uh, patient is Sarah Chen, DOB 3/22/1978. Seen today, October 26th, 2023. Chief complaint... uh... right knee pain, ongoing for about 3 months, worse with activity, especially stair climbing. Subjective: Patient describes the pain as a dull ache, located medially. Rates it as a 6/10 currently, can go up to 8/10 after exercise. Some morning stiffness, lasts about 15 minutes. Had some swelling reported, denies locking or giving way. Uh... tried over-the-counter ibuprofen with some partial relief. No history of trauma, otherwise healthy. Objective: Gait is non-antalgic. Right knee exam: No effusion visible. Mild tenderness to palpation over the medial joint line. McMurray's test is negative. Lachman and drawer tests stable. Range of motion is full, though terminal flexion elicits some discomfort medially. Assessment: Likely medial compartment osteoarthritis of the right knee. Differential includes medial meniscus tear, although less likely given exam findings. Plan: Uh... Obtain bilateral knee X-rays, anti-inflammatory medication, physical therapy referral, follow up in 4 weeks."`,
          rightTitle: "TranscriptX - AI-Generated Note",
          rightContent: {
            patient: "Sarah Chen",
            dob: "03/22/1978",
            date: "October 26, 2023",
            chiefComplaint: "Right knee pain x 3 months.",
            subjective: "Patient reports right knee pain ongoing for approximately 3 months, described as a dull ache located medially. Pain worsens with activity, particularly stair climbing. Pain rated 6/10 currently, increasing to 8/10 post-exercise. Reports approximately 15 minutes of morning stiffness. Denies significant swelling, locking, or episodes of giving way. Partial relief noted with over-the-counter ibuprofen. No history of trauma. Patient is otherwise healthy.",
            objective: "Gait: Non-antalgic. Right knee examination reveals no visible effusion. Mild tenderness to palpation over medial joint line. McMurray test negative. Lachman and drawer tests demonstrate stability. Full range of motion, though terminal flexion produces mild discomfort medially.",
            assessment: "1. Likely medial compartment osteoarthritis, right knee\n2. Rule out medial meniscus pathology"
          }
        }
      ]
    },
    Chartwright: {
      title: 'Discover Chartwright - Clarify and Organize Therapy Notes',
      examples: [
        {
          id: 1,
          title: "Therapy Note",
          subtitle: "Messy Original",
          leftTitle: "Messy Original Therapy Note",
          leftContent: `Patient Name: Emily White Date: 11/04/2023 Session #: 8

          Focus: Social anxiety and assertiveness training.

          Subjective:
          Pt reported attending a social event over the weekend, which was a goal for her. First time in quite a while, almost didn't go. Managed to stay for about an hour and talk to 2 people, which she considers a small success. Noticed feeling anxious and sweating while there. Feels a bit discouraged that it was still so hard, despite practicing skills. Also mentioned a conflict at work where she felt unable to speak up for herself. Sleep has been poor past couple nights due to worry about stuff. No self harm ideation.

          Objective:
          Pt presented somewhat flat affect initially, gradually warmed up during session. Speech quiet but clear, good eye contact. Observed some fidgeting initially but settled as session progressed. Engaged well in role-play exercises.`,
          rightTitle: "Chartwright-Enhanced Chart",
          rightContent: {
            patient: "Emily White",
            visitDate: "2023-11-04",
            session: "8",
            primaryFocus: "Social Anxiety / Assertiveness Training",
            subjectiveReport: "Social Event: Attended weekend event (goal), experienced high anxiety (palpitations, sweating), stayed 1 hour, talked to 2 people (small success). Felt discouraged by difficulty.\n\nWork Conflict: Felt unable to speak up.\n\nSleep: Poor past couple nights (work worry).\n\nSafety: Denied self-harm ideation.",
            objectiveObservation: "Presentation: Initially flat affect, warmed up; quiet speech, good eye contact, initial fidgeting (settled).\n\nEngagement: Good participation in role-play exercises."
          }
        }
      ]
    },
    Redactify: {
      title: 'Experience Redactify - Effortlessly Redact HIPAA Identifiers & Automate Compliance',
      examples: [
        {
          id: 1,
          title: "Doctor's Note",
          subtitle: "Original",
          leftTitle: "Original Doctor's Note",
          leftContent: `Patient Name: Jane Smith DOB: 07/22/1968 Address: 456 Oak Avenue, Springfield, IL 62704 Phone: (217) 555-0199 MRN: 555432 Date of Visit: 2024-05-21 Attending Physician: Dr. Robert Miller Clinic: Springfield Community Health Clinic

          Subjective:
          Ms. Jane Smith, a 55-year-old female, presents for her annual check-up on May 21, 2024. She reports feeling generally well. She mentions occasional lower back pain, especially after prolonged sitting. No fever, chills, or recent illness. She is currently taking Metformin for Type 2 Diabetes. Her last A1c was 6.8%. She lives at 456 Oak Avenue with her husband. Her contact number is (217) 555-0199.

          Objective:
          Vital Signs: BP 130/80 mmHg, HR 75 bpm, RR 18/min, Temp 98.2°F, Weight: 165 lbs.`,
                    rightTitle: "Redactify AI-Enhanced Note (HIPAA Compliant)",
          rightContent: {
            patient: "REDACT",
            dob: "REDACT",
            address: "REDACT",
            phone: "REDACT",
            mrn: "REDACT",
            visitDate: "REDACT",
            physician: "REDACT",
            clinic: "REDACT",
            subjective: "Ms. REDACT, a 55-year-old female, presents for her annual check-up on REDACT. She reports feeling generally well. She mentions occasional lower back pain, especially after prolonged sitting. No fever, chills, or recent illness. She is currently taking Metformin for Type 2 Diabetes. Her last A1c was 6.8%. She lives at REDACT with her husband. Her contact number is REDACT.",
            objective: "Vital Signs: BP 130/80 mmHg, HR 75 bpm, RR 18/min, Temp 98.2°F, Weight: 165 lbs.",
            physicalExam: "General: Well-appearing female in no acute distress..."
          }
        }
      ]
    },
    Validify: {
      title: 'Discover Validify - Optimize Chart Reviews for Compliance & Accuracy (use case)',
      examples: [
        {
          id: 1,
          title: "Clinical Documentation",
          subtitle: "Original",
          leftTitle: "Original Clinical Documentation",
          leftContent: `Patient: John Smith, DOB: 03/15/1968. Encounter Date: 10/26/2023.

Chief Complaint:
          Chest pain, shortness of breath.

          History of Present Illness:
          Patient reports experiencing intermittent chest pain for the past 3 days, described as a pressure-like sensation radiating to the left arm. Also reports shortness of breath, especially with exertion. No fever, cough, or other symptoms.

          Past Medical History:
          Hypertension, Type 2 Diabetes Mellitus, Hyperlipidemia.

          Medications:
          Lisinopril 20mg daily, Metformin 1000mg twice daily, Atorvastatin 40mg daily.`,
          rightTitle: "Validify Analysis & Recommendations",
          rightContent: {
            initialReview: "Patient: John Smith, DOB: 03/15/1968 Encounter Date: 10/26/2023",
            potentialICDCodes: [
              "R07.9 Chest pain, unspecified",
              "R06.02 Shortness of breath", 
              "I10 Essential (primary) hypertension",
              "E11.9 Type 2 diabetes mellitus without complications",
              "E78.5 Hyperlipidemia, unspecified"
            ],
            potentialCPTCodes: [
              "99213 (Level 3 Established Patient Office Visit) - Consider 99214 based on complexity of the encounter",
              "93000 (Electrocardiogram, routine ECG with at least 12 leads) if performed"
            ],
            recommendations: "Initial Review: Patient John Smith, DOB 03/15/1968 Encounter Date: 10/26/2023\n\nPotential ICD-10-CM Codes (Provisional - Requires Confirmation):\nR07.9 Chest pain, unspecified\nR06.02 Shortness of breath\nI10 Essential (primary) hypertension\nE11.9 Type 2 diabetes mellitus without complications\nE78.5 Hyperlipidemia, unspecified\n\nPotential CPT/HCPCS Codes (Based on Plan - Requires Documentation Confirmation):\n99213 (Level 3 Established Patient Office Visit) - Consider 99214 based on complexity of the encounter\n93000 (Electrocardiogram, routine ECG with at least 12 leads) if performed"
          }
        }
      ]
    }
  }

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <section id="in-action" className="py-20 bg-slate-800">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-blue-400 mb-6">See Our Solutions in Action</h2>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="flex w-full max-w-2xl">
            {tabs.map((tab, index) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 px-6 py-3 font-medium transition-all duration-300 relative ${
                  activeTab === tab
                    ? 'bg-slate-700 text-white'
                    : 'bg-slate-800 text-gray-400 hover:text-white hover:bg-slate-700'
                } ${
                  index === 0 ? 'rounded-l-lg' : 
                  index === tabs.length - 1 ? 'rounded-r-lg' : ''
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500"></div>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="text-center mb-8">
          <button
            onClick={toggleExpansion}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-all duration-300"
          >
            {isExpanded ? 'Click to collapse comparison' : 'Click to expand comparison'}
          </button>
        </div>

        {isExpanded && (
          <div className="bg-slate-900 rounded-xl overflow-hidden">
            {/* Example Tabs */}
            {tabContent[activeTab].examples.length > 1 && (
              <div className="flex bg-slate-800">
                {tabContent[activeTab].examples.map((example) => (
                  <button
                    key={example.id}
                    onClick={() => setActiveExample(example.id)}
                    className={`flex-1 px-6 py-4 text-center font-medium transition-all duration-300 ${
                      activeExample === example.id
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-400 hover:text-white hover:bg-slate-700'
                    }`}
                  >
                    Example {example.id}
                  </button>
                ))}
              </div>
            )}

            <div className="p-8">
              <h3 className="text-2xl font-bold text-white mb-8 text-center">
                {tabContent[activeTab].title}
              </h3>

              {/* Two Column Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column */}
                <div className="space-y-4">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="bg-blue-600 text-white px-4 py-2 rounded text-sm font-medium">
                      {tabContent[activeTab].examples[activeExample - 1].title}
                    </div>
                    <div className="bg-gray-600 text-white px-4 py-2 rounded text-sm">
                      {tabContent[activeTab].examples[activeExample - 1].subtitle}
                    </div>
                  </div>
                  
                  <div className="bg-slate-800 rounded-lg p-6">
                    <h4 className="text-white font-semibold mb-4">
                      {tabContent[activeTab].examples[activeExample - 1].leftTitle}
                    </h4>
                    <div className="text-gray-300 text-sm leading-relaxed max-h-96 overflow-y-auto">
                      {tabContent[activeTab].examples[activeExample - 1].leftContent}
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-4">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="bg-orange-600 text-white px-4 py-2 rounded text-sm font-medium">
                      {activeTab} Note
                    </div>
                    <div className="bg-orange-500 text-white px-4 py-2 rounded text-sm">
                      AI Generated Output
                    </div>
                  </div>
                  
                  <div className="bg-slate-800 rounded-lg p-6">
                    <h4 className="text-white font-semibold mb-4">
                      {tabContent[activeTab].examples[activeExample - 1].rightTitle}
                    </h4>
                    <div className="text-gray-300 text-sm leading-relaxed max-h-96 overflow-y-auto space-y-3">
                      {typeof tabContent[activeTab].examples[activeExample - 1].rightContent === 'object' ? (
                        Object.entries(tabContent[activeTab].examples[activeExample - 1].rightContent).map(([key, value]) => (
                          <div key={key}>
                            <span className="text-blue-400 font-medium capitalize">
                              {key.replace(/([A-Z])/g, ' $1').trim()}:
                            </span>
                            <div className="text-gray-300 mt-1">
                              {Array.isArray(value) ? (
                                <ul className="list-disc list-inside ml-4">
                                  {value.map((item, idx) => (
                                    <li key={idx}>{item}</li>
                                  ))}
                                </ul>
                              ) : (
                                value
                              )}
                            </div>
                          </div>
                        ))
                      ) : (
                        tabContent[activeTab].examples[activeExample - 1].rightContent
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default InActionSection
