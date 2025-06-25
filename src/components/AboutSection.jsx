import React from 'react'

const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-slate-800">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-blue-400 mb-8">About Clin Technologies</h2>
        </div>

        <div className="max-w-5xl mx-auto space-y-8 text-gray-300 text-lg leading-relaxed">
          <p>
            Headquartered in the Midwest, Clin Technologies is a{' '}
            <span className="text-white font-semibold">specialized AI firm</span> that empowers healthcare providers across the Midwest 
            and beyond to conquer their most pressing operational challenges. We deliver this through a powerful and flexible AI platform that 
            powers both a{' '}
            <span className="text-white font-semibold">suite of ready-to-deploy solutions</span> for documentation and compliance, and the creation of{' '}
            <span className="text-white font-semibold">fully bespoke engines</span> for 
            enterprise-level transformation.
          </p>

          <p>
            Our expertise lies in applying cutting-edge{' '}
            <span className="text-white font-semibold">Large Language Models (LLMs) and machine learning (ML)</span> to solve real-world 
            challenges in healthcare documentation. We partner closely with individual practitioners, clinics, and healthcare organizations, 
            leveraging{' '}
            <span className="text-white font-semibold">meticulously gathered real-world data</span> from professionals to build the exceptionally robust and uniquely effective 
            datasets that power these advanced systems.
          </p>

          <p>
            This same proven AI framework serves as the foundation for our enterprise partnerships. Whether you need an{' '}
            <span className="text-white font-semibold">immediate solution 
            from our product suite</span> or a{' '}
            <span className="text-white font-semibold">strategic partner to build a custom engine</span> for challenges like Utilization Management, we provide the 
            right tool for the job. Our mission is to transform your data into a proprietary asset, enabling data-driven decisions that{' '}
            <span className="text-white font-semibold">eliminate 
            administrative friction</span> and allow you to focus on what matters most.
          </p>
        </div>
      </div>
    </section>
  )
}

export default AboutSection
