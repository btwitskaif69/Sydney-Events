import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Signin from './Signin';

const API_BASE_URL = import.meta.env.VITE_APP_BACKEND_URL || 'http://localhost:5000';

const EventCards = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    axios.get(`${API_BASE_URL}/api/events`)
      .then(res => {
        const data = Array.isArray(res.data) ? res.data : res.data.events;
        setEvents(data || []);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching events:', err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-center py-10 text-gray-500">Loading events...</div>;

  if (selectedEvent) {
    return <Signin event={selectedEvent} onClose={() => setSelectedEvent(null)} />;
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 p-6 md:p-8 lg:p-20">
        {events.map(event => (
          <div
            key={event._id}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden flex flex-col"
          >
            <img
              src={event.image_url || 'https://via.placeholder.com/400x200?text=No+Image'}
              alt={event.title}
              className="h-52 w-full object-cover"
            />
            <div className="p-5 flex-1 flex flex-col">
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">{event.title}</h2>
              <p className="text-sm text-gray-500 mb-1">{event.date} {event.time && `| ${event.time}`}</p>
              <p className="text-sm text-gray-400 mb-2">{event.location}</p>
              <p className="text-gray-600 mb-3 flex-1 line-clamp-3">{event.description}</p>
              <div className="flex items-center justify-between mt-auto">
                <span className="text-indigo-600 font-bold text-base">{event.price || 'Free'}</span>
                <button
                  onClick={() => setSelectedEvent(event)}
                  className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-md text-sm transition"
                >
                  View Event
                </button>
              </div>
              {event.tags && event.tags.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {event.tags.map(tag => (
                    <span
                      key={tag}
                      className="bg-indigo-100 text-indigo-700 text-xs font-medium px-2 py-0.5 rounded-full"
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
