import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Signin from './Signin';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

const EventCards = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null); // Track the selected event for Signin

  useEffect(() => {
    axios.get(`${API_BASE_URL}/api/events`, { withCredentials: true })
      .then(res => {
        console.log('Fetched events:', res.data);
        const data = Array.isArray(res.data) ? res.data : res.data.events;
        setEvents(data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching events:', err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-center py-10">Loading events...</div>;

  // If an event is selected, show the Signin component
if (selectedEvent) {
  return <Signin event={selectedEvent} onClose={() => setSelectedEvent(null)} />;
}

  return (
  <>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6 md:p-8 lg:p-20">
      {events.map(event => (
        <div
          key={event._id}
          className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col"
        >
          <img
            src={event.image_url || 'https://via.placeholder.com/400x200?text=No+Image'}
            alt={event.title}
            className="h-48 w-full object-cover"
          />
          <div className="p-4 flex-1 flex flex-col">
            <h2 className="text-xl font-semibold mb-2">{event.title}</h2>
            <p className="text-gray-600 mb-1">{event.date} {event.time && `| ${event.time}`}</p>
            <p className="text-gray-500 mb-2">{event.location}</p>
            <p className="text-gray-700 flex-1 mb-2 line-clamp-3">{event.description}</p>
            <div className="flex items-center justify-between mt-auto">
              <span className="text-indigo-600 font-bold">{event.price || 'Free'}</span>
              <button
                onClick={() => setSelectedEvent(event)}
                className="text-white bg-indigo-500 hover:bg-indigo-600 px-3 py-1 rounded text-sm"
              >
                View Event
              </button>
            </div>
            {event.tags && event.tags.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-1">
                {event.tags.map(tag => (
                  <span
                    key={tag}
                    className="bg-gray-200 text-gray-700 text-xs px-2 py-0.5 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>

    {/* Signin modal popup */}
    {selectedEvent && (
      <Signin event={selectedEvent} onClose={() => setSelectedEvent(null)} />
    )}
  </>
);
};

export default EventCards;