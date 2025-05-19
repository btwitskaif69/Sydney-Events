import React from "react";
import EventCard from "@/components/EventsCard";

const EventsGrid = ({ events = [], isLoading = false }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-gray-100 rounded-lg h-[400px] animate-pulse-slow" />
        ))}
      </div>
    );
  }

  if (!events.length) {
    return (
      <div className="bg-white rounded-lg p-8 text-center">
        <h3 className="text-xl font-medium mb-2">No events found</h3>
        <p className="text-gray-600">
          Try adjusting your filters or check back later for new events.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
};

export default EventsGrid;