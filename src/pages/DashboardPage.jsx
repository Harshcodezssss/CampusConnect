import React, { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Calendar,
  Bookmark,
  Users,
  MessageSquare,
  ArrowRight,
  Sparkles,
  Briefcase,
  CheckCircle,
  ExternalLink,
  PlusCircle,
  Award,
  ChevronRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import StatCard from '../components/StatCard';
import EventCard from '../components/EventCard';
import StudentCard from '../components/StudentCard';
import OpportunityCard from '../components/OpportunityCard';
import Modal from '../components/Modal';
import { calculateCompatibility, calculateProfileCompletion } from '../utils/matching';

const DashboardPage = () => {
  const navigate = useNavigate();
  const {
    profile,
    events,
    registeredEventIds,
    savedEventIds,
    registerForEvent,
    cancelEventRegistration,
    toggleSaveEvent,
    students,
    savedStudentIds,
    toggleSaveStudent,
    collabRequests,
    sendCollabRequest,
    opportunities,
    savedOpportunityIds,
    appliedOpportunityIds,
    toggleSaveOpportunity,
    markOpportunityApplied,
    communityPosts,
    createCommunityPost
  } = useApp();

  // Selected item states for Modals
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedOpportunity, setSelectedOpportunity] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);

  // Invite Collab Modal state
  const [inviteModalOpen, setInviteModalOpen] = useState(false);
  const [inviteTargetStudent, setInviteTargetStudent] = useState(null);
  const [inviteProjectTitle, setInviteProjectTitle] = useState('');
  const [inviteMessage, setInviteMessage] = useState('');

  // Post modal state
  const [postModalOpen, setPostModalOpen] = useState(false);
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostCategory, setNewPostCategory] = useState('General');

  // Stats calculation
  const completionPercentage = useMemo(() => calculateProfileCompletion(profile), [profile]);
  const activeCollabRequestsCount = useMemo(() => {
    return collabRequests.filter(r => r.status === 'pending').length;
  }, [collabRequests]);

  // Upcoming Registered & Featured Events
  const upcomingEvents = useMemo(() => {
    return events.slice(0, 3);
  }, [events]);

  // Recommended opportunities based on profile interests & skills
  const recommendedOpportunities = useMemo(() => {
    const userInterests = (profile.interests || []).map(i => i.toLowerCase());
    return opportunities
      .slice()
      .sort((a, b) => {
        const aMatch = (a.tags || []).some(t => userInterests.includes(t.toLowerCase()));
        const bMatch = (b.tags || []).some(t => userInterests.includes(t.toLowerCase()));
        return (bMatch ? 1 : 0) - (aMatch ? 1 : 0);
      })
      .slice(0, 3);
  }, [opportunities, profile.interests]);

  // Recommended teammates with highest algorithmic compatibility scores
  const topRecommendedTeammates = useMemo(() => {
    return students
      .map(student => ({
        student,
        compatibility: calculateCompatibility(profile, student)
      }))
      .sort((a, b) => b.compatibility.score - a.compatibility.score)
      .slice(0, 3);
  }, [students, profile]);

  const handleOpenInvite = (student) => {
    setInviteTargetStudent(student);
    setInviteProjectTitle("HackCampus 2026 Innovation Team");
    setInviteMessage(`Hi ${student.name}, I'm looking for a teammate with your skills to build a project together!`);
    setInviteModalOpen(true);
  };

  const handleSubmitInvite = (e) => {
    e.preventDefault();
    if (inviteTargetStudent) {
      sendCollabRequest(inviteTargetStudent.id, inviteProjectTitle, inviteMessage);
      setInviteModalOpen(false);
      setInviteTargetStudent(null);
    }
  };

  const handleCreatePost = (e) => {
    e.preventDefault();
    if (createCommunityPost({ content: newPostContent, category: newPostCategory })) {
      setNewPostContent('');
      setPostModalOpen(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* 1. Welcome Section */}
      <div className="bg-gradient-to-r from-brand-600 via-indigo-600 to-purple-600 rounded-3xl p-6 sm:p-8 text-white shadow-soft-lg relative overflow-hidden">
        {/* Abstract background shapes */}
        <div className="absolute -right-12 -top-12 w-64 h-64 rounded-full bg-white/10 blur-2xl pointer-events-none" />
        <div className="absolute right-1/3 -bottom-10 w-48 h-48 rounded-full bg-indigo-400/20 blur-xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4 sm:gap-5">
            <img
              src={profile.avatar}
              alt={profile.name}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-white/80 shadow-md"
            />
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/15 text-white/90 text-xs font-semibold mb-1.5 backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5 text-brand-200" />
                <span>Student Hub</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                {profile.name}
              </h1>
              <p className="text-xs sm:text-sm text-brand-100 font-medium">
                {profile.department} • <span className="text-white font-semibold">{profile.year}</span>
              </p>
            </div>
          </div>

          {/* Profile Completion Indicator */}
          <div className="bg-white/15 backdrop-blur-md rounded-2xl p-4 border border-white/20 min-w-[240px]">
            <div className="flex items-center justify-between text-xs mb-2 font-medium">
              <span className="text-brand-100">Profile Strength</span>
              <span className="font-bold text-white">{completionPercentage}%</span>
            </div>
            <div className="w-full bg-white/20 h-2.5 rounded-full overflow-hidden">
              <div
                className="bg-emerald-400 h-full rounded-full transition-all duration-500"
                style={{ width: `${completionPercentage}%` }}
              />
            </div>
            <p className="text-[11px] text-brand-100 mt-2 flex items-center justify-between">
              <span>{completionPercentage === 100 ? "Complete profile" : "Add more skills to boost matching"}</span>
              <Link to="/profile" className="font-semibold text-white underline hover:opacity-80">
                Edit
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* 2. Quick Statistics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Registered Events"
          value={registeredEventIds.length}
          subtitle="Upcoming campus events"
          icon={Calendar}
          color="brand"
        />
        <StatCard
          title="Saved Items"
          value={savedOpportunityIds.length + savedEventIds.length + savedStudentIds.length}
          subtitle="Events & opportunities"
          icon={Bookmark}
          color="blue"
        />
        <StatCard
          title="Active Requests"
          value={activeCollabRequestsCount}
          subtitle="Team invitations"
          icon={Users}
          color="emerald"
        />
        <StatCard
          title="Community Posts"
          value={communityPosts.length}
          subtitle="Campus discussions"
          icon={MessageSquare}
          color="purple"
        />
      </div>

      {/* 3. Quick Actions */}
      <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-soft">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500">
            Quick Actions
          </h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <Link
            to="/events"
            className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-50 hover:bg-brand-50 text-slate-700 hover:text-brand-700 transition-colors border border-slate-100 hover:border-brand-200 group"
          >
            <div className="p-2 rounded-lg bg-brand-100 text-brand-600 group-hover:scale-105 transition-transform">
              <Calendar className="w-4 h-4" />
            </div>
            <div className="text-left">
              <p className="text-xs font-bold leading-tight">Explore Events</p>
              <p className="text-[11px] text-slate-400">Discover & register</p>
            </div>
          </Link>

          <Link
            to="/teams"
            className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-50 hover:bg-purple-50 text-slate-700 hover:text-purple-700 transition-colors border border-slate-100 hover:border-purple-200 group"
          >
            <div className="p-2 rounded-lg bg-purple-100 text-purple-600 group-hover:scale-105 transition-transform">
              <Users className="w-4 h-4" />
            </div>
            <div className="text-left">
              <p className="text-xs font-bold leading-tight">Find Teammates</p>
              <p className="text-[11px] text-slate-400">Match by skills</p>
            </div>
          </Link>

          <Link
            to="/opportunities"
            className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-blue-700 transition-colors border border-slate-100 hover:border-blue-200 group"
          >
            <div className="p-2 rounded-lg bg-blue-100 text-blue-600 group-hover:scale-105 transition-transform">
              <Briefcase className="w-4 h-4" />
            </div>
            <div className="text-left">
              <p className="text-xs font-bold leading-tight">Browse Opps</p>
              <p className="text-[11px] text-slate-400">Internships & grants</p>
            </div>
          </Link>

          <button
            onClick={() => setPostModalOpen(true)}
            className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-50 hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 transition-colors border border-slate-100 hover:border-emerald-200 group"
          >
            <div className="p-2 rounded-lg bg-emerald-100 text-emerald-600 group-hover:scale-105 transition-transform">
              <PlusCircle className="w-4 h-4" />
            </div>
            <div className="text-left">
              <p className="text-xs font-bold leading-tight">Create Post</p>
              <p className="text-[11px] text-slate-400">Share with campus</p>
            </div>
          </button>
        </div>
      </div>

      {/* 4. Smart Team Recommendations */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-brand-600" />
              <h2 className="text-lg font-bold text-slate-900">Recommended Teammates</h2>
            </div>
            <p className="text-xs text-slate-500">
              Students whose skills complement your tech stack for upcoming hackathons
            </p>
          </div>
          <Link
            to="/teams"
            className="text-xs font-semibold text-brand-600 hover:text-brand-700 flex items-center gap-1"
          >
            <span>View All</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {topRecommendedTeammates.map(({ student, compatibility }) => {
            const isSaved = savedStudentIds.includes(student.id);
            const req = collabRequests.find(r => r.toStudentId === student.id && r.fromStudentId === profile.id);
            const collabStatus = req ? req.status : 'none';

            return (
              <StudentCard
                key={student.id}
                student={student}
                compatibility={compatibility}
                isSaved={isSaved}
                onToggleSave={toggleSaveStudent}
                onConnect={handleOpenInvite}
                onViewProfile={(std) => setSelectedStudent(std)}
                collabStatus={collabStatus}
              />
            );
          })}
        </div>
      </section>

      {/* 5. Upcoming Events */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Upcoming Campus Events</h2>
            <p className="text-xs text-slate-500">Workshops, competitions, and seminars happening this month</p>
          </div>
          <Link
            to="/events"
            className="text-xs font-semibold text-brand-600 hover:text-brand-700 flex items-center gap-1"
          >
            <span>All Events</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {upcomingEvents.map((evt) => (
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
      </section>

      {/* 6. Recommended Opportunities */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Recommended Opportunities</h2>
            <p className="text-xs text-slate-500">Hand-picked internships, programs, and grants</p>
          </div>
          <Link
            to="/opportunities"
            className="text-xs font-semibold text-brand-600 hover:text-brand-700 flex items-center gap-1"
          >
            <span>Explore Board</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {recommendedOpportunities.map((opp) => (
            <OpportunityCard
              key={opp.id}
              opportunity={opp}
              isSaved={savedOpportunityIds.includes(opp.id)}
              isApplied={appliedOpportunityIds.includes(opp.id)}
              onToggleSave={toggleSaveOpportunity}
              onApply={(item) => setSelectedOpportunity(item)}
              onViewDetails={(item) => setSelectedOpportunity(item)}
            />
          ))}
        </div>
      </section>

      {/* Event Details Modal */}
      <Modal
        isOpen={!!selectedEvent}
        onClose={() => setSelectedEvent(null)}
        title={selectedEvent?.title || "Event Details"}
      >
        {selectedEvent && (
          <div className="space-y-4">
            <img
              src={selectedEvent.banner}
              alt={selectedEvent.title}
              className="w-full h-52 object-cover rounded-xl"
            />
            <div className="flex items-center justify-between text-xs text-brand-600 font-semibold">
              <span>{selectedEvent.category}</span>
              <span>{selectedEvent.seatsAvailable} seats available</span>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">{selectedEvent.description}</p>
            <div className="bg-slate-50 p-3.5 rounded-xl space-y-1.5 text-xs text-slate-700 border border-slate-100">
              <p><strong>Organizer:</strong> {selectedEvent.organizer}</p>
              <p><strong>Date & Time:</strong> {selectedEvent.date} at {selectedEvent.time}</p>
              <p><strong>Venue:</strong> {selectedEvent.venue}</p>
              {selectedEvent.prizes && <p><strong>Perks/Prizes:</strong> {selectedEvent.prizes}</p>}
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
              {registeredEventIds.includes(selectedEvent.id) ? (
                <button
                  onClick={() => {
                    cancelEventRegistration(selectedEvent.id);
                    setSelectedEvent(null);
                  }}
                  className="px-4 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50 rounded-xl border border-rose-200"
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
                  className="px-5 py-2 text-xs font-semibold text-white bg-brand-600 hover:bg-brand-700 rounded-xl disabled:bg-slate-300"
                >
                  {selectedEvent.seatsAvailable === 0 ? "Fully Booked" : "Confirm Registration"}
                </button>
              )}
            </div>
          </div>
        )}
      </Modal>

      {/* Opportunity Details / Application Modal */}
      <Modal
        isOpen={!!selectedOpportunity}
        onClose={() => setSelectedOpportunity(null)}
        title={selectedOpportunity?.title || "Opportunity Details"}
      >
        {selectedOpportunity && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-brand-600 bg-brand-50 px-2.5 py-1 rounded-lg">
                {selectedOpportunity.category}
              </span>
              <span className="text-xs font-medium text-slate-500">
                Deadline: {selectedOpportunity.deadline}
              </span>
            </div>

            <div>
              <h4 className="text-base font-bold text-slate-800">{selectedOpportunity.organization}</h4>
              {selectedOpportunity.location && (
                <p className="text-xs text-slate-500">{selectedOpportunity.location}</p>
              )}
            </div>

            <p className="text-sm text-slate-600 leading-relaxed">{selectedOpportunity.description}</p>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-2 text-xs text-slate-700">
              <p><strong>Eligibility:</strong> {selectedOpportunity.eligibility}</p>
              {selectedOpportunity.stipend && (
                <p><strong>Compensation / Grant:</strong> <span className="text-emerald-700 font-semibold">{selectedOpportunity.stipend}</span></p>
              )}
              {selectedOpportunity.requirements && (
                <div>
                  <strong>Key Requirements:</strong>
                  <ul className="list-disc pl-4 mt-1 space-y-0.5 text-slate-600">
                    {selectedOpportunity.requirements.map((req, i) => (
                      <li key={i}>{req}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-800">
              ℹ️ <strong>Demo Opportunity Application:</strong> In this student prototype, clicking "Submit Application" records your application status in your local student portal.
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
              <button
                onClick={() => setSelectedOpportunity(null)}
                className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-xl"
              >
                Close
              </button>
              {!appliedOpportunityIds.includes(selectedOpportunity.id) && (
                <button
                  onClick={() => {
                    markOpportunityApplied(selectedOpportunity.id);
                    setSelectedOpportunity(null);
                  }}
                  className="px-5 py-2 text-xs font-semibold text-white bg-brand-600 hover:bg-brand-700 rounded-xl shadow-sm"
                >
                  Submit Application
                </button>
              )}
            </div>
          </div>
        )}
      </Modal>

      {/* Invite Collaboration Modal */}
      <Modal
        isOpen={inviteModalOpen}
        onClose={() => setInviteModalOpen(false)}
        title={`Invite ${inviteTargetStudent?.name || 'Student'} to Team`}
      >
        <form onSubmit={handleSubmitInvite} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Project / Hackathon Title</label>
            <input
              type="text"
              required
              value={inviteProjectTitle}
              onChange={(e) => setInviteProjectTitle(e.target.value)}
              className="w-full px-3.5 py-2 text-sm bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Invitation Message</label>
            <textarea
              rows={4}
              required
              value={inviteMessage}
              onChange={(e) => setInviteMessage(e.target.value)}
              className="w-full px-3.5 py-2 text-sm bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setInviteModalOpen(false)}
              className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-semibold text-white bg-brand-600 hover:bg-brand-700 rounded-xl shadow-sm"
            >
              Send Request
            </button>
          </div>
        </form>
      </Modal>

      {/* Create Community Post Modal */}
      <Modal
        isOpen={postModalOpen}
        onClose={() => setPostModalOpen(false)}
        title="Create Community Post"
      >
        <form onSubmit={handleCreatePost} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Category</label>
            <select
              value={newPostCategory}
              onChange={(e) => setNewPostCategory(e.target.value)}
              className="w-full px-3.5 py-2 text-sm bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
            >
              <option value="General">General</option>
              <option value="Technical">Technical</option>
              <option value="Events">Events</option>
              <option value="Academics">Academics</option>
              <option value="Opportunities">Opportunities</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Post Content</label>
            <textarea
              rows={4}
              required
              placeholder="What's happening on campus? Ask questions, share project updates or resources..."
              value={newPostContent}
              onChange={(e) => setNewPostContent(e.target.value)}
              className="w-full px-3.5 py-2 text-sm bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 placeholder:text-slate-400"
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setPostModalOpen(false)}
              className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-semibold text-white bg-brand-600 hover:bg-brand-700 rounded-xl shadow-sm"
            >
              Publish Post
            </button>
          </div>
        </form>
      </Modal>

      {/* View Student Profile Modal */}
      <Modal
        isOpen={!!selectedStudent}
        onClose={() => setSelectedStudent(null)}
        title={selectedStudent?.name || "Student Profile"}
      >
        {selectedStudent && (
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <img
                src={selectedStudent.avatar}
                alt={selectedStudent.name}
                className="w-16 h-16 rounded-full object-cover border-2 border-brand-200"
              />
              <div>
                <h4 className="text-base font-bold text-slate-800">{selectedStudent.name}</h4>
                <p className="text-xs text-slate-500">{selectedStudent.department} • {selectedStudent.year}</p>
                <span className="inline-block mt-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  {selectedStudent.availability}
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-100">
              {selectedStudent.bio}
            </p>

            <div>
              <p className="text-xs font-semibold text-slate-700 mb-1.5">Skills</p>
              <div className="flex flex-wrap gap-1.5">
                {selectedStudent.skills?.map((skill, i) => (
                  <span key={i} className="text-xs px-2.5 py-1 rounded-lg bg-brand-50 text-brand-700 font-medium">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold text-slate-700 mb-1.5">Interests</p>
              <div className="flex flex-wrap gap-1.5">
                {selectedStudent.interests?.map((item, i) => (
                  <span key={i} className="text-xs px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700">
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
              <button
                onClick={() => setSelectedStudent(null)}
                className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-xl"
              >
                Close
              </button>
              <button
                onClick={() => {
                  const std = selectedStudent;
                  setSelectedStudent(null);
                  handleOpenInvite(std);
                }}
                className="px-5 py-2 text-xs font-semibold text-white bg-brand-600 hover:bg-brand-700 rounded-xl shadow-sm"
              >
                Invite to Team
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default DashboardPage;

