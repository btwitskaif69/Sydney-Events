import React from 'react';

const About = () => {
  return (
    <section className="min-h-screen bg-white text-gray-800 py-16 px-6 md:px-20">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-indigo-600 mb-6">About Sydney Events</h1>

        <p className="text-lg text-gray-700 mb-6 leading-relaxed">
          Sydney Events is your go-to platform for discovering and exploring the most vibrant,
          exciting, and meaningful events happening across the city. Whether you're into music
          festivals, cultural exhibitions, educational workshops, or tech conferences, we bring
          everything under one roof to help you stay connected and inspired.
        </p>

        <p className="text-lg text-gray-700 mb-6 leading-relaxed">
          Founded with the goal of making event discovery seamless and inclusive, Sydney Events
          works closely with local organizers, artists, and venues to deliver up-to-date event
          information that matters to you. Our platform is built with simplicity, accessibility,
          and experience in mind—because your time and interests deserve the best.
        </p>

        <p className="text-lg text-gray-700 mb-6 leading-relaxed">
          Join us as we celebrate the creativity, diversity, and energy that make Sydney one of
          the most exciting cities in the world. Be it a cozy indie film screening or a grand
          city-wide festival, Sydney Events is here to guide you to your next memorable experience.
        </p>

        <div className="mt-10">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Our Mission</h2>
          <p className="text-md text-gray-700 leading-relaxed">
            To connect communities through events that inspire, educate, and entertain—making
            Sydney more connected, informed, and alive.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
