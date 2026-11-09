import React, { useState, useMemo } from 'react';
import {
  Bookmark,
  Calendar,
  Briefcase,
  Users,
  Trash2,
  ExternalLink,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import EventCard from '../components/EventCard';
import OpportunityCard from '../components/OpportunityCard';
import StudentCard from '../components/StudentCard';
import EmptyState from '../components/EmptyState';
import Modal from '../components/Modal';
import { calculateCompatibility } from '../utils/matching';

const SavedItemsPage = () => {
  const {
    profile,
    events,
    registeredEventIds,
    savedEventIds,
    registerForEvent,
    cancelEventRegistration,
    toggleSaveEvent,
    opportunities,
    savedOpportunityIds,
    appliedOpportunityIds,
    toggleSaveOpportunity,
    markOpportunityApplied,
    students,
    savedStudentIds,
    toggleSaveStudent,
    collabRequests,
    sendCollabRequest
  } = useApp();

  const [activeTab, setActiveTab] = useState('events'); // 'events', 'opportunities', 'students'
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedOpportunity, setSelectedOpportunity] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);

  // Invite Collab Modal state
  const [inviteModalOpen, setInviteModalOpen] = useState(false);
  const [inviteTargetStudent, setInviteTargetStudent] = useState(null);
  const [inviteProjectTitle, setInviteProjectTitle] = useState('');
  const [inviteMessage, setInviteMessage] = useState('');

  // Filter saved lists
  const savedEventsList = useMemo(() => {
    return events.filter(evt => savedEventIds.includes(evt.id));
  }, [events, savedEventIds]);

  const savedOpportunitiesList = useMemo(() => {
    return opportunities.filter(opp => savedOpportunityIds.includes(opp.id));
  }, [opportunities, savedOpportunityIds]);

  const savedStudentsList = useMemo(() => {
    return students
      .filter(std => savedStudentIds.includes(std.id))
      .map(student => ({
        student,
        compatibility: calculateCompatibility(profile, student)
      }));
  }, [students, savedStudentIds, profile]);

  const handleOpenInvite = (student) => {
    setInviteTargetStudent(student);
    setInviteProjectTitle("HackCampus 2026 Collaboration");
    setInviteMessage(`Hi ${student.name}, let's build something awesome together!`);
    setInviteModalOpen(true);
  };

  const handleSendInvite = (e) => {
    e.preventDefault();
    if (inviteTargetStudent) {
      sendCollabRequest(inviteTargetStudent.id, inviteProjectTitle, inviteMessage);
      setInviteModalOpen(false);
      setInviteTargetStudent(null);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Saved Items</h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Quickly access your bookmarked events, tracked opportunities, and saved teammate profiles.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveTab('events')}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-xl transition-colors ${
            activeTab === 'events'
              ? 'bg-brand-600 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>Saved Events ({savedEventsList.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('opportunities')}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-xl transition-colors ${
            activeTab === 'opportunities'
              ? 'bg-brand-600 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Briefcase className="w-4 h-4" />
          <span>Opportunities ({savedOpportunitiesList.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('students')}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-xl transition-colors ${
            activeTab === 'students'
              ? 'bg-brand-600 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Teammates ({savedStudentsList.length})</span>
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'events' && (
        <div>
          {savedEventsList.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedEventsList.map(evt => (
                <EventCard
                  key={evt.id}
                  event={evt}
                  isRegistered={registeredEventIds.includes(evt.id)}
                  isSaved={true}
                  onRegister={registerForEvent}
                  onCancelRegistration={cancelEventRegistration}
                  onToggleSave={toggleSaveEvent}
                  onViewDetails={e => setSelectedEvent(e)}
                />
              ))}
            </div>
          ) : (
            <EmptyState
              icon={Calendar}
              title="No saved campus events"
              description="Explore the Campus Events hub and tap the bookmark icon on events you wish to track."
            />
          )}
        </div>
      )}

      {activeTab === 'opportunities' && (
        <div>
          {savedOpportunitiesList.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedOpportunitiesList.map(opp => (
                <OpportunityCard
                  key={opp.id}
                  opportunity={opp}
                  isSaved={true}
                  isApplied={appliedOpportunityIds.includes(opp.id)}
                  onToggleSave={toggleSaveOpportunity}
                  onApply={o => setSelectedOpportunity(o)}
                  onViewDetails={o => setSelectedOpportunity(o)}
                />
              ))}
            </div>
          ) : (
            <EmptyState
              icon={Briefcase}
              title="No saved opportunities"
              description="Save internships, scholarships, and coding contests to track their deadlines."
            />
          )}
        </div>
      )}

      {activeTab === 'students' && (
        <div>
          {savedStudentsList.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedStudentsList.map(({ student, compatibility }) => {
                const req = collabRequests.find(r => r.toStudentId === student.id && r.fromStudentId === profile.id);
                const collabStatus = req ? req.status : 'none';

                return (
                  <StudentCard
                    key={student.id}
                    student={student}
                    compatibility={compatibility}
                    isSaved={true}
                    onToggleSave={toggleSaveStudent}
                    onConnect={handleOpenInvite}
                    onViewProfile={s => setSelectedStudent(s)}
                    collabStatus={collabStatus}
                  />
                );
              })}
            </div>
          ) : (
            <EmptyState
              icon={Users}
              title="No saved students"
              description="Browse the Team Finder to save candidates with complementary tech stacks for future collaborations."
            />
          )}
        </div>
      )}

      {/* Details Modals */}
      <Modal
        isOpen={!!selectedEvent}
        onClose={() => setSelectedEvent(null)}
        title={selectedEvent?.title || "Event Details"}
      >
        {selectedEvent && (
          <div className="space-y-4">
            <img src={selectedEvent.banner} alt={selectedEvent.title} className="w-full h-48 object-cover rounded-xl" />
            <h4 className="text-base font-bold text-slate-800">{selectedEvent.title}</h4>
            <p className="text-xs text-slate-600 leading-relaxed">{selectedEvent.description}</p>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs space-y-1">
              <p><strong>Organizer:</strong> {selectedEvent.organizer}</p>
              <p><strong>Date & Time:</strong> {selectedEvent.date} ({selectedEvent.time})</p>
              <p><strong>Venue:</strong> {selectedEvent.venue}</p>
            </div>
            <div className="flex justify-end gap-2 pt-2 border-t">
              <button
                onClick={() => setSelectedEvent(null)}
                className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-xl"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </Modal>

      <Modal
        isOpen={!!selectedOpportunity}
        onClose={() => setSelectedOpportunity(null)}
        title={selectedOpportunity?.title || "Opportunity Details"}
      >
        {selectedOpportunity && (
          <div className="space-y-4">
            <h4 className="text-base font-bold text-slate-800">{selectedOpportunity.organization}</h4>
            <p className="text-xs text-slate-600 leading-relaxed">{selectedOpportunity.description}</p>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs space-y-1">
              <p><strong>Deadline:</strong> {selectedOpportunity.deadline}</p>
              <p><strong>Eligibility:</strong> {selectedOpportunity.eligibility}</p>
              {selectedOpportunity.stipend && <p><strong>Stipend:</strong> {selectedOpportunity.stipend}</p>}
            </div>
            <div className="flex justify-end gap-2 pt-2 border-t">
              <button
                onClick={() => setSelectedOpportunity(null)}
                className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-xl"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </Modal>

      <Modal
        isOpen={inviteModalOpen}
        onClose={() => setInviteModalOpen(false)}
        title={`Invite ${inviteTargetStudent?.name || 'Student'}`}
      >
        <form onSubmit={handleSendInvite} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Project Title</label>
            <input
              type="text"
              required
              value={inviteProjectTitle}
              onChange={e => setInviteProjectTitle(e.target.value)}
              className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-200 rounded-xl"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Message</label>
            <textarea
              rows={3}
              required
              value={inviteMessage}
              onChange={e => setInviteMessage(e.target.value)}
              className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-200 rounded-xl"
            />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setInviteModalOpen(false)}
              className="px-4 py-2 text-xs text-slate-600 hover:bg-slate-100 rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-xs font-semibold text-white bg-brand-600 hover:bg-brand-700 rounded-xl"
            >
              Send Invitation
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default SavedItemsPage;

