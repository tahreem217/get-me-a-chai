import React from 'react'

const About = () => {
  return (
    <div className="container mx-auto px-8 md:px-16 lg:px-24 py-16 text-white">
      <h1 className="text-4xl font-bold text-center mb-12">About Get Me A Chai</h1>
      
    {/* Section 1: The Concept */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
  <div className="space-y-4">
    <h2 className="text-2xl font-semibold text-blue-400">What is Get Me A Chai?</h2>
    <p className="text-lg text-slate-300 leading-relaxed">
      Get Me A Chai is a crowdfunding platform created for developers, artists, and content creators. 
      It’s a space where your fans can support your work by "buying you a chai"—a small, meaningful 
      gesture that fuels your creativity and keeps the projects coming.
    </p>
    <p className="text-lg text-slate-300 leading-relaxed">
      Unlike traditional crowdfunding, we focus on micro-contributions. Whether it's a ₹100 cup of 
      cutting chai or a ₹1000 premium brew, every bit helps a creator sustain their passion.
    </p>
  </div>
  
  <div className="flex justify-center">
    {/* Updated video container: smaller max-width and aspect ratio control */}
    <video 
      src="/tea.mp4"    
      autoPlay
      loop
      muted
      className="rounded-full shadow-2xl border border-slate-700 w-full max-w-[250px] md:max-w-[300px] aspect-square object-cover"
    /> 
  </div>
</div>

      <hr className="my-16 border-slate-800" />

      {/* Section 2: How it Works */}
      <h2 className="text-3xl font-bold text-center mb-10">Why Choose Us?</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
          <h3 className="text-xl font-bold mb-3">Community First</h3>
          <p className="text-slate-400">Built by creators, for creators. We understand the daily grind of coding and creating.</p>
        </div>
        <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
          <h3 className="text-xl font-bold mb-3">Instant Payouts</h3>
          <p className="text-slate-400">Integrated with Razorpay to ensure your hard-earned support reaches you safely and quickly.</p>
        </div>
        <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
          <h3 className="text-xl font-bold mb-3">Zero Friction</h3>
          <p className="text-slate-400">Fans can support you in just two clicks. No long forms or complex signups for donors.</p>
        </div>
      </div>

      {/* Section 3: Tech Stack (Optional - good for developer portfolios) */}
       
      <div className="mt-20">
  <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 p-8 md:p-12 rounded-3xl border border-blue-500/20">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
      <div>
        <h2 className="text-3xl font-bold mb-6">Real Recognition for Real Support</h2>
        <ul className="space-y-4">
          <li className="flex items-start gap-3">
            <div className="mt-1 bg-blue-500 rounded-full p-1">
               <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
            </div>
            <p className="text-slate-300"><span className="font-bold text-white">Public Wall of Fame:</span> Every supporter is featured on your personal page, making them feel like a part of your success story.</p>
          </li>
          <li className="flex items-start gap-3">
            <div className="mt-1 bg-blue-500 rounded-full p-1">
               <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
            </div>
            <p className="text-slate-300"><span className="font-bold text-white">Direct Messaging:</span> Fans can leave personalized messages with their donations to cheer you on or give feedback.</p>
          </li>
          <li className="flex items-start gap-3">
            <div className="mt-1 bg-blue-500 rounded-full p-1">
               <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
            </div>
            <p className="text-slate-300"><span className="font-bold text-white">Goal Tracking:</span> Show your fans exactly how their contributions are helping—whether it's for new gear, coffee, or server costs.</p>
          </li>
        </ul>
      </div>
      <div className="flex justify-center">
        {/* You can use a screenshot of your Supporters list here or a placeholder */}
        <div className="bg-slate-800 p-4 rounded-lg shadow-inner border border-slate-700 w-full">
            <h4 className="text-sm font-bold text-slate-500 mb-3 uppercase tracking-widest">Live Feed Simulation</h4>
            <div className="space-y-3">
                <div className="flex items-center gap-3 bg-slate-900/50 p-2 rounded">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-red-500"></div>
                    <p className="text-xs text-slate-300"><span className="font-bold text-white">Rohan</span> donated ₹500: "Keep up the great tutorials!"</p>
                </div>
                <div className="flex items-center gap-3 bg-slate-900/50 p-2 rounded opacity-80">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500"></div>
                    <p className="text-xs text-slate-300"><span className="font-bold text-white">Sneha</span> donated ₹100: "Love the new project!"</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  </div>
</div>
    </div>
  )
}

export default About

export const metadata = {
  title: "About - Get Me A Chai",
}

