import React from 'react';
import { Bookmark, Building, Calendar, CheckCircle2, ArrowUpRight, DollarSign, Tag } from 'lucide-react';

const OpportunityCard = ({
  opportunity,
  isSaved,
  isApplied,
  onToggleSave,
  onApply,
  onViewDetails
}) => {
  // Days remaining calculation
  const calculateDaysLeft = (deadline) => {
    const diff = new Date(deadline) - new Date();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return days;
  };

  const daysLeft = calculateDaysLeft(opportunity.deadline);

  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-soft hover:shadow-soft-lg transition-all duration-200 flex flex-col justify-between">
      <div>
        {/* Header Badges */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-brand-50 text-brand-700">
              {opportunity.category}
            </span>
            {opportunity.location && (
              <span className="text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                {opportunity.location}
              </span>
            )}
          </div>

          <button
            onClick={() => onToggleSave(opportunity.id)}
            aria-label={isSaved ? "Remove bookmark" : "Bookmark opportunity"}
            className={`p-2 rounded-xl transition-colors ${
              isSaved
                ? 'bg-amber-50 text-amber-600'
                : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Title & Organization */}
        <h3 
          onClick={() => onViewDetails(opportunity)}
          className="text-base font-bold text-slate-800 hover:text-brand-600 transition-colors cursor-pointer mb-1 line-clamp-1"
        >
          {opportunity.title}
        </h3>

        <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-3">
          <Building className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
          <span className="font-medium text-slate-700">{opportunity.organization}</span>
        </div>

        <p className="text-xs text-slate-600 line-clamp-2 mb-4 leading-relaxed">
          {opportunity.description}
        </p>

        {/* Details Pills */}
        <div className="space-y-2 mb-4 bg-slate-50/60 p-3 rounded-xl border border-slate-100 text-xs text-slate-600">
          {opportunity.stipend && (
            <div className="flex items-center gap-2 text-emerald-700 font-medium">
              <DollarSign className="w-3.5 h-3.5 text-emerald-500" />
              <span>{opportunity.stipend}</span>
            </div>
          )}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 text-slate-500">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <span>Deadline: {opportunity.deadline}</span>
            </div>
            {daysLeft > 0 ? (
              <span className={`font-semibold px-2 py-0.5 rounded text-[11px] ${
                daysLeft <= 7 ? 'bg-rose-50 text-rose-600' : 'bg-blue-50 text-blue-600'
              }`}>
                {daysLeft} days left
              </span>
            ) : (
              <span className="text-rose-500 font-semibold text-[11px]">Expired</span>
            )}
          </div>
        </div>

        {/* Tags */}
        {opportunity.tags && opportunity.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {opportunity.tags.slice(0, 3).map((tag, idx) => (
              <span key={idx} className="text-[11px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md">
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
        <button
          onClick={() => onViewDetails(opportunity)}
          className="text-xs font-medium text-slate-600 hover:text-slate-900 transition-colors"
        >
          View Details
        </button>

        {isApplied ? (
          <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Applied</span>
          </div>
        ) : (
          <button
            onClick={() => onApply(opportunity)}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-brand-600 hover:bg-brand-700 rounded-lg transition-colors shadow-sm"
          >
            <span>Apply Now</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
};

export default OpportunityCard;

