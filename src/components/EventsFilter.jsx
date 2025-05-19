import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { eventCategoryMap, getCategoryIcon } from "@/lib/data";

const EventsFilter = ({ onFilterChange, categories = new Map() }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [dateRange, setDateRange] = useState({});

  const handleSearch = (e) => {
    e.preventDefault();
    applyFilters();
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    applyFilters({ category });
  };

  const handleDateChange = (range) => {
    setDateRange(range);
    applyFilters({ dateRange: range });
  };

  const applyFilters = (overrides = {}) => {
    onFilterChange({
      category: overrides.category !== undefined ? overrides.category : selectedCategory,
      searchQuery,
      dateRange: overrides.dateRange !== undefined ? overrides.dateRange : dateRange,
    });
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setDateRange({});
    onFilterChange({ category: "all" });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-10 m-10 mb-8">
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <form onSubmit={handleSearch} className="flex-1">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search events, locations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-4 pr-10 py-2"
            />
            <Button 
              type="submit" 
              variant="ghost" 
              size="sm" 
              className="absolute right-0 top-0 h-full"
            >
              🔍
            </Button>
          </div>
        </form>
        
        <div className="flex gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="flex-1 md:flex-none">
                {dateRange?.from ? (
                  dateRange.to ? (
                    <>
                      {dateRange.from.toLocaleDateString()} - {dateRange.to.toLocaleDateString()}
                    </>
                  ) : (
                    dateRange.from.toLocaleDateString()
                  )
                ) : (
                  "Select Dates"
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={new Date()}
                selected={dateRange}
                onSelect={handleDateChange}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
          
          <Button variant="outline" onClick={clearFilters}>
            Clear
          </Button>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {Array.from(categories.entries()).map(([category, count]) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            className={
              selectedCategory === category 
                ? "bg-sydney-blue hover:bg-sydney-blue/90" 
                : "hover:bg-gray-100"
            }
            onClick={() => handleCategoryChange(category)}
          >
            {getCategoryIcon(category)} {eventCategoryMap[category]} ({count})
          </Button>
        ))}
      </div>
    </div>
  );
};

export default EventsFilter;