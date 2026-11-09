import React from 'react';
import { Calendar, Clock, MapPin, Bookmark, CheckCircle, ArrowRight, Award } from 'lucide-react';

const EventCard = ({
  event,
  isRegistered,
  isSaved,
  onRegister,
  onCancelRegistration,
  onToggleSave,
  onViewDetails
}) => {
  return (
    <div className="group bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-soft hover:shadow-soft-lg transition-all duration-200 flex flex-col">
      {/* Banner & Badges */}
      <div className="relative h-44 w-full overflow-hidden bg-slate-100">
        <img
          src={event.banner}
          alt={event.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-black/20" />
        
        {/* Category Badge */}
        <span className="absolute top-3 left-3 px-2.5 py-1 text-xs font-semibold rounded-lg bg-white/90 backdrop-blur-md text-brand-700 shadow-sm">
          {event.category}
        </span>

        {/* Save Bookmark Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleSave(event.id);
          }}
          aria-label={isSaved ? "Remove bookmark" : "Bookmark event"}
          className={`absolute top-3 right-3 p-2 rounded-xl backdrop-blur-md transition-all shadow-sm ${
            isSaved
              ? 'bg-amber-500 text-white'
              : 'bg-white/80 text-slate-700 hover:bg-white hover:text-slate-900'
          }`}
        >
          <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
        </button>

        {/* Registered Indicator Banner */}
        {isRegistered && (
          <div className="absolute bottom-3 left-3 flex items-center gap-1.5 px-2.5 py-1 bg-emerald-600/90 backdrop-blur-md text-white rounded-lg text-xs font-medium shadow-sm">
            <CheckCircle className="w-3.5 h-3.5" />
            <span>Registered</span>
          </div>
        )}
      </div>

      {/* Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="text-xs text-brand-600 font-medium mb-1">
            {event.organizer}
          </div>

          <h3 
            onClick={() => onViewDetails(event)}
            className="text-base font-bold text-slate-800 group-hover:text-brand-600 transition-colors line-clamp-2 cursor-pointer mb-2"
          >
            {event.title}
          </h3>

          <p className="text-xs text-slate-500 line-clamp-2 mb-4 leading-relaxed">
            {event.description}
          </p>

          <div className="space-y-1.5 text-xs text-slate-600 mb-4 bg-slate-50/70 p-3 rounded-xl border border-slate-100">
            <div className="flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5 text-brand-500 flex-shrink-0" />
              <span>{event.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-blue-500 flex-shrink-0" />
              <span>{event.time}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-rose-500 flex-shrink-0" />
              <span className="truncate">{event.venue}</span>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
          <div className="text-xs">
            <span className="font-semibold text-slate-800">{event.seatsAvailable}</span>
            <span className="text-slate-400"> / {event.totalSeats} seats left</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onViewDetails(event)}
              className="px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
            >
              Details
            </button>

            {isRegistered ? (
              <button
                onClick={() => onCancelRegistration(event.id)}
                className="px-3 py-1.5 text-xs font-medium text-rose-600 hover:bg-rose-50 rounded-lg transition-colors border border-rose-200"
              >
                Cancel
              </button>
            ) : (
              <button
                onClick={() => onRegister(event.id)}
                disabled={event.seatsAvailable === 0}
                className="px-3.5 py-1.5 text-xs font-semibold text-white bg-brand-600 hover:bg-brand-700 disabled:bg-slate-300 rounded-lg transition-colors shadow-sm flex items-center gap-1"
              >
                <span>{event.seatsAvailable === 0 ? "Full" : "Register"}</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;

