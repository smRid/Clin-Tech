import React from 'react'
import Navbar from '../components/Navbar'
import HeroSection from '../components/HeroSection'
import AboutSection from '../components/AboutSection'
import SolutionsSection from '../components/SolutionsSection'
import InActionSection from '../components/InActionSection'
import TechnologySection from '../components/TechnologySection'
import BenefitsSection from '../components/BenefitsSection'
import CaseUseSection from '../components/CaseUseSection'
import GetStartedSection from '../components/GetStartedSection'

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-slate-900">
      <Navbar />
      <div className="pt-16">
        <HeroSection />
        <AboutSection />
        <SolutionsSection />
        <InActionSection />
        <TechnologySection />
        <BenefitsSection />
        <CaseUseSection />
        <GetStartedSection />
      </div>
    </div>
  )
}

export default LandingPage
