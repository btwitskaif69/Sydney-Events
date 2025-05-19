import React, { useState } from 'react'
import EventsFilter from '@/components/EventsFilter'
import HeroSection from '@/components/HeroSection'
import EventsGrid from '@/components/EventsGrid'
import { events as allEvents, getEventCategories, filterEvents } from '@/lib/data'

const Home = () => {
  const [filteredEvents, setFilteredEvents] = useState(allEvents)
  const [categories] = useState(getEventCategories(allEvents))

  const handleFilterChange = (filters) => {
    setFilteredEvents(filterEvents(allEvents, filters))
  }

  return (
    <div>
      <HeroSection />
      <EventsFilter onFilterChange={handleFilterChange} categories={categories} />
      <EventsGrid events={filteredEvents} />
    </div>
  )
}

export default Home