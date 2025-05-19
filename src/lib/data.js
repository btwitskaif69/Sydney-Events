// No TypeScript types, just plain JS

// This is mock data - in a real application, this would be fetched from a scraping service
export const events = [
  {
    id: "1",
    title: "Sydney Symphony Orchestra: Beethoven's 9th",
    description: "Experience the power and joy of Beethoven's 9th Symphony performed by the Sydney Symphony Orchestra at the iconic Sydney Opera House. This timeless masterpiece, featuring the famous 'Ode to Joy', will be brought to life by a full orchestra and chorus under the direction of the acclaimed conductor Simone Young.",
    date: "2025-06-12",
    time: "19:30",
    location: "Sydney Opera House, Sydney",
    category: "music",
    imageUrl: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    price: "$85 - $180",
    ticketUrl: "https://www.sydneysymphony.com",
    source: "Sydney Symphony Orchestra"
  },
  {
    id: "2",
    title: "Bondi Beach Food Festival",
    description: "Join us for the annual Bondi Beach Food Festival featuring the best of Sydney's culinary scene. Sample dishes from top local restaurants, enjoy cooking demonstrations from celebrity chefs, and experience a variety of food trucks offering cuisines from around the world. With the stunning backdrop of Bondi Beach, this is a food lover's paradise.",
    date: "2025-05-28",
    time: "11:00",
    location: "Bondi Beach, Sydney",
    category: "food",
    imageUrl: "https://images.unsplash.com/photo-1582674828627-0a150e6609c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    price: "$25",
    ticketUrl: "https://www.bondifoodfestival.com.au",
    source: "Bondi Food Festival"
  },
  {
    id: "3",
    title: "NRL Finals: Sydney Roosters vs South Sydney Rabbitohs",
    description: "The greatest rivalry in the National Rugby League comes to a head in this finals clash. The Sydney Roosters take on the South Sydney Rabbitohs in what promises to be an epic battle. Don't miss the bone-crunching tackles, spectacular tries, and the electric atmosphere of a packed Allianz Stadium.",
    date: "2025-06-05",
    time: "19:45",
    location: "Allianz Stadium, Moore Park",
    category: "sports",
    imageUrl: "https://images.unsplash.com/photo-1547022092-52d3f8777e57?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    price: "$45 - $120",
    ticketUrl: "https://www.nrl.com/tickets",
    source: "National Rugby League"
  },
  {
    id: "4",
    title: "Contemporary Art Exhibition: Future Visions",
    description: "The Museum of Contemporary Art presents 'Future Visions', a groundbreaking exhibition featuring works from emerging Australian artists. Explore thought-provoking installations, digital art, and mixed media pieces that challenge perceptions and imagine possible futures. The exhibition includes interactive elements and artist talks throughout its duration.",
    date: "2025-05-25",
    time: "10:00",
    location: "Museum of Contemporary Art, Circular Quay",
    category: "arts",
    imageUrl: "https://images.unsplash.com/photo-1498464619740-386503e7e8b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    price: "$22",
    ticketUrl: "https://www.mca.com.au",
    source: "Museum of Contemporary Art"
  },
  {
    id: "5",
    title: "Sydney Harbour Night Cruise: Vivid Festival",
    description: "Experience the magic of Sydney's Vivid Festival from the water with this special night cruise. See the spectacular light installations that transform the city's landmarks, including the Sydney Opera House and Harbour Bridge, from the unique vantage point of Sydney Harbour. The cruise includes dinner, drinks, and live commentary.",
    date: "2025-06-18",
    time: "19:00",
    location: "Circular Quay, Sydney",
    category: "nightlife",
    imageUrl: "https://images.unsplash.com/photo-1595740229246-cfdda61917c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2356&q=80",
    price: "$150",
    ticketUrl: "https://www.sydneyharbourcruises.com.au",
    source: "Sydney Harbour Cruises"
  },
  {
    id: "6",
    title: "Royal Botanic Garden Family Day",
    description: "Bring the whole family for a day of fun and discovery at the Royal Botanic Garden. Activities include plant treasure hunts, wildlife spotting, craft workshops using natural materials, and guided tours designed for all ages. Learn about Australia's unique flora and the importance of conservation in this beautiful setting.",
    date: "2025-05-31",
    time: "09:00",
    location: "Royal Botanic Garden, Sydney",
    category: "family",
    imageUrl: "https://images.unsplash.com/photo-1552717940-9ea01244af3d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    price: "Free",
    ticketUrl: "https://www.rbgsyd.nsw.gov.au",
    source: "Royal Botanic Gardens"
  },
  {
    id: "7",
    title: "Sydney Writers' Festival: Author Panel",
    description: "Join three of Australia's most celebrated authors for an engaging discussion on 'Writing in the Digital Age'. This special panel event, part of the Sydney Writers' Festival, will explore how technology is changing the way stories are told and consumed. There will be a Q&A session and book signing following the discussion.",
    date: "2025-06-08",
    time: "14:00",
    location: "State Library of New South Wales, Sydney",
    category: "arts",
    imageUrl: "https://images.unsplash.com/photo-1474932430478-367dbb6832c1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    price: "$30",
    ticketUrl: "https://www.swf.org.au",
    source: "Sydney Writers' Festival"
  },
  {
    id: "8",
    title: "Community Market: Paddington",
    description: "The Paddington Markets have been a Sydney institution since 1973. Browse stalls offering everything from vintage clothing and artisanal foods to handcrafted jewelry and unique gifts. Meet local designers and producers while enjoying live music and the vibrant atmosphere of this historic Sydney neighborhood.",
    date: "2025-06-01",
    time: "10:00",
    location: "Paddington, Sydney",
    category: "community",
    imageUrl: "https://images.unsplash.com/photo-1519248825733-628ffd7e9491?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    price: "Free entry",
    ticketUrl: "https://www.paddingtonmarkets.com.au",
    source: "Paddington Markets"
  }
];

// Function to filter events based on criteria
export const filterEvents = (events, filters) => {
  return events.filter(event => {
    // Filter by category
    if (filters.category && filters.category !== "all" && event.category !== filters.category) {
      return false;
    }

    // Filter by search query
    if (
      filters.searchQuery &&
      !event.title.toLowerCase().includes(filters.searchQuery.toLowerCase()) &&
      !event.description.toLowerCase().includes(filters.searchQuery.toLowerCase()) &&
      !event.location.toLowerCase().includes(filters.searchQuery.toLowerCase())
    ) {
      return false;
    }

    // Filter by date range
    if (filters.dateRange) {
      const eventDate = new Date(event.date);
      if (filters.dateRange.from && eventDate < filters.dateRange.from) {
        return false;
      }
      if (filters.dateRange.to && eventDate > filters.dateRange.to) {
        return false;
      }
    }

    return true;
  });
};

// Get event categories with counts
export const getEventCategories = (events) => {
  const categories = new Map();
  categories.set("all", events.length);

  events.forEach(event => {
    const currentCount = categories.get(event.category) || 0;
    categories.set(event.category, currentCount + 1);
  });

  return categories;
};

// Get event by ID
export const getEventById = (id) => {
  return events.find(event => event.id === id);
};

// Format date to display in a readable format
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-AU', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
};

// Format time to display in a readable format
export const formatTime = (timeString) => {
  const [hours, minutes] = timeString.split(':');
  const time = new Date();
  time.setHours(parseInt(hours));
  time.setMinutes(parseInt(minutes));

  return time.toLocaleTimeString('en-AU', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
};

// Get a map of the event categories with display names
export const eventCategoryMap = {
  all: "All Events",
  music: "Music",
  arts: "Arts & Culture",
  sports: "Sports",
  food: "Food & Drink",
  family: "Family",
  nightlife: "Nightlife",
  community: "Community",
  other: "Other"
};

// Get category icon (emoji) for visual representation
export const getCategoryIcon = (category) => {
  const icons = {
    all: "🎭",
    music: "🎵",
    arts: "🎨",
    sports: "🏆",
    food: "🍽️",
    family: "👨‍👩‍👧‍👦",
    nightlife: "🌃",
    community: "🤝",
    other: "✨"
  };

  return icons[category] || icons.other;
};