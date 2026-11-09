import React from 'react';
import { Bookmark, Sparkles, Send, Check, Clock, UserPlus } from 'lucide-react';

const StudentCard = ({
  student,
  compatibility,
  isSaved,
  onToggleSave,
  onConnect,
  onViewProfile,
  collabStatus // 'none', 'pending', 'accepted', 'rejected'
}) => {
  const score = compatibility ? compatibility.score : 75;

  // Compatibility color coding
  const getBadgeStyle = (val) => {
    if (val >= 85) return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    if (val >= 70) return 'bg-brand-50 text-brand-700 border-brand-200';
    return 'bg-blue-50 text-blue-700 border-blue-200';
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-soft hover:shadow-soft-lg transition-all duration-200 flex flex-col justify-between">
      <div>
        {/* Top bar: Avatar, Name, Dept & Compatibility Badge */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src={student.avatar}
                alt={student.name}
                className="w-12 h-12 rounded-full object-cover border-2 border-brand-100"
              />
              <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                student.availability === 'Available for Hackathons'
                  ? 'bg-emerald-500'
                  : student.availability === 'Open for Projects'
                  ? 'bg-blue-500'
                  : 'bg-amber-400'
              }`} />
            </div>

            <div>
              <h3 
                onClick={() => onViewProfile(student)}
                className="text-base font-bold text-slate-800 hover:text-brand-600 transition-colors cursor-pointer"
              >
                {student.name}
              </h3>
              <p className="text-xs text-slate-500">
                {student.department} • <span className="font-medium text-slate-700">{student.year}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => onToggleSave(student.id)}
              aria-label={isSaved ? "Remove saved student" : "Save student profile"}
              className={`p-2 rounded-xl transition-colors ${
                isSaved
                  ? 'bg-amber-50 text-amber-600'
                  : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>

        {/* Compatibility Match Indicator */}
        {compatibility && (
          <div className={`p-3 rounded-xl border mb-3.5 text-xs ${getBadgeStyle(score)}`}>
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-1.5 font-bold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{score}% Compatibility</span>
              </div>
              <span className="text-[11px] font-medium opacity-90">Algorithmic Match</span>
            </div>
            <p className="text-[11px] leading-relaxed text-slate-600 font-normal">
              {compatibility.reason}
            </p>
          </div>
        )}

        {/* Bio */}
        <p className="text-xs text-slate-600 line-clamp-2 mb-3.5 leading-relaxed">
          {student.bio}
        </p>

        {/* Skills */}
        <div className="mb-3.5">
          <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Skills</p>
          <div className="flex flex-wrap gap-1.5">
            {(student.skills || []).slice(0, 5).map((skill, idx) => {
              const isMatch = compatibility?.matchingSkills?.some(s => s.toLowerCase() === skill.toLowerCase());
              const isComp = compatibility?.complementarySkills?.some(s => s.toLowerCase() === skill.toLowerCase());

              return (
                <span
                  key={idx}
                  className={`text-[11px] px-2 py-0.5 rounded-md font-medium ${
                    isComp
                      ? 'bg-purple-100 text-purple-700 border border-purple-200'
                      : isMatch
                      ? 'bg-brand-100 text-brand-700'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {skill}
                </span>
              );
            })}
          </div>
        </div>

        {/* Preferred Roles */}
        {student.preferredRoles && (
          <div className="mb-4">
            <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">Preferred Roles</p>
            <div className="flex flex-wrap gap-1">
              {student.preferredRoles.map((role, idx) => (
                <span key={idx} className="text-[11px] text-slate-600 bg-slate-50 border border-slate-200 px-2 py-0.5 rounded">
                  {role}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer Actions */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
        <button
          onClick={() => onViewProfile(student)}
          className="text-xs font-medium text-slate-600 hover:text-slate-900 transition-colors"
        >
          View Full Profile
        </button>

        {collabStatus === 'pending' ? (
          <div className="flex items-center gap-1.5 text-xs font-medium text-amber-700 bg-amber-50 px-3 py-1.5 rounded-lg border border-amber-200">
            <Clock className="w-3.5 h-3.5" />
            <span>Invite Pending</span>
          </div>
        ) : collabStatus === 'accepted' ? (
          <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
            <Check className="w-3.5 h-3.5" />
            <span>Connected</span>
          </div>
        ) : (
          <button
            onClick={() => onConnect(student)}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-brand-600 hover:bg-brand-700 rounded-lg transition-colors shadow-sm"
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>Invite to Team</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default StudentCard;

