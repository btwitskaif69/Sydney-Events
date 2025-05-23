import React from 'react'
import bg from '../assets/herobg.png'

const HeroSection = () => {
  return (
    <section
      className="relative flex items-center justify-center h-[100vh] min-h-[400px] w-full"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Linear white gradient overlay at the top */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.0) 10%)"
        }}
      />
      {/* Optional: dark overlay for text readability */}
      <div className="absolute inset-0" />
      <div className="relative z-10 flex flex-col items-center justify-center text-center text-black px-4 w-full h-full">
        <h1 className="text-4xl md:text-7xl font-bold mb-4">Top Sydney events in one place.</h1>
        <h1 className='text-4xl md:text-7xl font-bold p-4 bg-gradient-to-b from-[#7C90FC] to-[#364FDA] bg-clip-text text-transparent'>
          Enter your email to get tickets.
        </h1>
        <p className="text-lg md:text-2xl mb-6">Your guide to the best events in Sydney — all in one place.</p>
        <a
          href="#events"
          className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-full font-semibold transition text-white"
        >
          Explore Events
        </a>
      </div>
    </section>
  )
}

export default HeroSection