import { Link } from "react-router-dom";
import { formatDate, getCategoryIcon } from "@/lib/data";
import { Badge } from "@/components/ui/badge";

const EventCard = ({ event }) => {
  return (
    <Link 
      to={`/event/${event.id}`}
      className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col h-full"
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={event.imageUrl} 
          alt={event.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 right-3">
          <Badge className="bg-sydney-blue/90 hover:bg-sydney-blue text-white">
            {getCategoryIcon(event.category)} {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
          </Badge>
        </div>
      </div>
      
      <div className="p-4 flex flex-col flex-grow">
        <div className="text-sm text-sydney-blue font-medium mb-2">
          {formatDate(event.date)}
        </div>
        
        <h3 className="text-lg font-semibold mb-2 group-hover:text-sydney-blue transition-colors line-clamp-2">
          {event.title}
        </h3>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-3">
          {event.description}
        </p>
        
        <div className="mt-auto flex items-center justify-between">
          <div className="text-sm text-gray-600">
            {event.location.split(',')[0]}
          </div>
          <div className="font-medium text-sydney-green">
            {event.price}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default EventCard;