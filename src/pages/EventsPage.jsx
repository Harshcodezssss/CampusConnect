import React, { useState, useMemo } from 'react';
import {
  Calendar,
  Clock,
  MapPin,
  Search,
  Filter,
  CheckCircle,
  Bookmark,
  Users,
  Trophy,
  Sparkles
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import EventCard from '../components/EventCard';
import SearchBar from '../components/SearchBar';
import FilterDropdown from '../components/FilterDropdown';
import EmptyState from '../components/EmptyState';
import Modal from '../components/Modal';

const EventsPage = () => {
  const {
    events,
    registeredEventIds,
    savedEventIds,
    registerForEvent,
    cancelEventRegistration,
    toggleSaveEvent
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('date-asc'); // 'date-asc', 'date-desc', 'seats'
  const [selectedEvent, setSelectedEvent] = useState(null);

  const categories = [
    { label: 'All Categories', value: 'All' },
    { label: 'Hackathons', value: 'Hackathons' },
    { label: 'Workshops', value: 'Workshops' },
    { label: 'Technical Events', value: 'Technical Events' },
    { label: 'Seminars', value: 'Seminars' },
    { label: 'Cultural Events', value: 'Cultural Events' },
    { label: 'Sports', value: 'Sports' },
  ];

  const sortOptions = [
    { label: 'Upcoming First', value: 'date-asc' },
    { label: 'Latest Date First', value: 'date-desc' },
    { label: 'Most Available Seats', value: 'seats' },
  ];

  // Filtering & Sorting logic
  const filteredEvents = useMemo(() => {
    return events
      .filter((evt) => {
        const matchesCategory = selectedCategory === 'All' || evt.category === selectedCategory;
        const matchesSearch =
          evt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          evt.organizer.toLowerCase().includes(searchQuery.toLowerCase()) ||
          evt.venue.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (evt.tags || []).some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'date-asc') {
          return new Date(a.date) - new Date(b.date);
        } else if (sortBy === 'date-desc') {
          return new Date(b.date) - new Date(a.date);
        } else if (sortBy === 'seats') {
          return b.seatsAvailable - a.seatsAvailable;
        }
        return 0;
      });
  }, [events, selectedCategory, searchQuery, sortBy]);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Campus Event Hub</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Browse hackathons, technical workshops, seminars, and sports tournaments.
          </p>
        </div>

        {/* Registered events quick pill */}
        <div className="flex items-center gap-2 bg-brand-50 border border-brand-200 text-brand-700 px-3.5 py-1.5 rounded-xl text-xs font-semibold self-start sm:self-auto">
          <CheckCircle className="w-4 h-4 text-brand-600" />
          <span>{registeredEventIds.length} Registered Events</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-soft flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search by event title, organizer, tech or venue..."
          className="flex-1"
        />

        <div className="flex items-center gap-2.5 overflow-x-auto pb-1 md:pb-0">
          <FilterDropdown
            options={categories}
            value={selectedCategory}
            onChange={setSelectedCategory}
          />
          <FilterDropdown
            options={sortOptions}
            value={sortBy}
            onChange={setSortBy}
          />
        </div>
      </div>

      {/* Category Quick Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setSelectedCategory(cat.value)}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl whitespace-nowrap transition-colors ${
              selectedCategory === cat.value
                ? 'bg-brand-600 text-white shadow-sm'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Events Grid */}
      {filteredEvents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((evt) => (
            <EventCard
              key={evt.id}
              event={evt}
              isRegistered={registeredEventIds.includes(evt.id)}
              isSaved={savedEventIds.includes(evt.id)}
              onRegister={registerForEvent}
              onCancelRegistration={cancelEventRegistration}
              onToggleSave={toggleSaveEvent}
              onViewDetails={(e) => setSelectedEvent(e)}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={Calendar}
          title="No campus events found"
          description="Try broadening your search term or selecting a different category filter."
          actionLabel="Clear Filters"
          onAction={() => {
            setSearchQuery('');
            setSelectedCategory('All');
          }}
        />
      )}

      {/* Event Details Modal */}
      <Modal
        isOpen={!!selectedEvent}
        onClose={() => setSelectedEvent(null)}
        title={selectedEvent?.title || "Event Details"}
      >
        {selectedEvent && (
          <div className="space-y-4">
            <div className="relative h-48 w-full rounded-xl overflow-hidden bg-slate-100">
              <img
                src={selectedEvent.banner}
                alt={selectedEvent.title}
                className="w-full h-full object-cover"
              />
              <span className="absolute top-3 left-3 px-2.5 py-1 text-xs font-semibold rounded-lg bg-white/90 text-brand-700 shadow-sm backdrop-blur-md">
                {selectedEvent.category}
              </span>
            </div>

            <div>
              <p className="text-xs text-brand-600 font-semibold">{selectedEvent.organizer}</p>
              <h3 className="text-lg font-bold text-slate-800 mt-0.5">{selectedEvent.title}</h3>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              {selectedEvent.description}
            </p>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-2 text-xs text-slate-700">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-brand-600" />
                <span><strong>Date:</strong> {selectedEvent.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-600" />
                <span><strong>Time:</strong> {selectedEvent.time}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-rose-600" />
                <span><strong>Venue:</strong> {selectedEvent.venue}</span>
              </div>
              {selectedEvent.prizes && (
                <div className="flex items-center gap-2 text-amber-700">
                  <Trophy className="w-4 h-4 text-amber-500" />
                  <span><strong>Perks/Prizes:</strong> {selectedEvent.prizes}</span>
                </div>
              )}
            </div>

            {selectedEvent.tags && (
              <div className="flex flex-wrap gap-1.5">
                {selectedEvent.tags.map((tag, i) => (
                  <span key={i} className="text-[11px] bg-slate-100 text-slate-600 px-2.5 py-0.5 rounded-md font-medium">
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <div className="text-xs">
                <span className="font-bold text-slate-800">{selectedEvent.seatsAvailable}</span>
                <span className="text-slate-500"> / {selectedEvent.totalSeats} seats available</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Close
                </button>

                {registeredEventIds.includes(selectedEvent.id) ? (
                  <button
                    onClick={() => {
                      cancelEventRegistration(selectedEvent.id);
                      setSelectedEvent(null);
                    }}
                    className="px-4 py-2 text-xs font-semibold text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-xl border border-rose-200"
                  >
                    Cancel Registration
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      registerForEvent(selectedEvent.id);
                      setSelectedEvent(null);
                    }}
                    disabled={selectedEvent.seatsAvailable === 0}
                    className="px-5 py-2 text-xs font-semibold text-white bg-brand-600 hover:bg-brand-700 disabled:bg-slate-300 rounded-xl shadow-sm"
                  >
                    {selectedEvent.seatsAvailable === 0 ? "Event Full" : "Confirm Registration"}
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default EventsPage;

