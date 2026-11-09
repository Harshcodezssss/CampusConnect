import React, { useState, useMemo } from 'react';
import {
  Users,
  Sparkles,
  Search,
  Filter,
  Check,
  X,
  Send,
  UserPlus,
  Clock,
  ArrowRight,
  ShieldCheck,
  SlidersHorizontal,
  Bookmark
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import StudentCard from '../components/StudentCard';
import SearchBar from '../components/SearchBar';
import FilterDropdown from '../components/FilterDropdown';
import EmptyState from '../components/EmptyState';
import Modal from '../components/Modal';
import { calculateCompatibility } from '../utils/matching';

const TeamFinderPage = () => {
  const {
    profile,
    students,
    savedStudentIds,
    toggleSaveStudent,
    collabRequests,
    sendCollabRequest,
    updateCollabRequestStatus
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');
  const [selectedYear, setSelectedYear] = useState('All');
  const [selectedSkill, setSelectedSkill] = useState('All');
  const [activeTab, setActiveTab] = useState('explore'); // 'explore', 'incoming', 'sent'

  // Modal states
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [inviteModalOpen, setInviteModalOpen] = useState(false);
  const [inviteTargetStudent, setInviteTargetStudent] = useState(null);
  const [inviteProjectTitle, setInviteProjectTitle] = useState('');
  const [inviteMessage, setInviteMessage] = useState('');

  // Dropdown options
  const departmentOptions = [
    { label: 'All Departments', value: 'All' },
    { label: 'Computer Science & Engineering', value: 'Computer Science & Engineering' },
    { label: 'Information Technology', value: 'Information Technology' },
    { label: 'Data Science & AI', value: 'Data Science & AI' },
    { label: 'Design & Media Studies', value: 'Design & Media Studies' },
    { label: 'Electronics & Communication', value: 'Electronics & Communication' },
    { label: 'Business & Management', value: 'Business & Management' },
    { label: 'Cyber Security & Forensics', value: 'Cyber Security & Forensics' },
  ];

  const yearOptions = [
    { label: 'All Years', value: 'All' },
    { label: '1st Year', value: '1st Year' },
    { label: '2nd Year', value: '2nd Year' },
    { label: '3rd Year', value: '3rd Year' },
    { label: '4th Year', value: '4th Year' },
  ];

  const skillOptions = [
    { label: 'All Skills', value: 'All' },
    { label: 'React.js', value: 'React.js' },
    { label: 'Python', value: 'Python' },
    { label: 'Node.js', value: 'Node.js' },
    { label: 'UI/UX', value: 'UI/UX' },
    { label: 'Figma', value: 'Figma' },
    { label: 'PyTorch', value: 'PyTorch' },
    { label: 'Flutter', value: 'Flutter' },
    { label: 'C++', value: 'C++' },
    { label: 'Solidity', value: 'Solidity' },
    { label: 'Product Management', value: 'Product Management' },
  ];

  // Matched students list with scores
  const processedStudents = useMemo(() => {
    return students
      .map((student) => ({
        student,
        compatibility: calculateCompatibility(profile, student)
      }))
      .filter(({ student }) => {
        const matchesDept = selectedDept === 'All' || student.department === selectedDept;
        const matchesYear = selectedYear === 'All' || student.year === selectedYear;
        const matchesSkill =
          selectedSkill === 'All' ||
          (student.skills || []).some(s => s.toLowerCase() === selectedSkill.toLowerCase());

        const query = searchQuery.toLowerCase();
        const matchesQuery =
          student.name.toLowerCase().includes(query) ||
          student.department.toLowerCase().includes(query) ||
          (student.skills || []).some(s => s.toLowerCase().includes(query)) ||
          (student.interests || []).some(i => i.toLowerCase().includes(query)) ||
          (student.preferredRoles || []).some(r => r.toLowerCase().includes(query));

        return matchesDept && matchesYear && matchesSkill && matchesQuery;
      })
      .sort((a, b) => b.compatibility.score - a.compatibility.score);
  }, [students, profile, selectedDept, selectedYear, selectedSkill, searchQuery]);

  // Request lists
  const incomingRequests = useMemo(() => {
    return collabRequests.filter(r => r.toStudentId === profile.id || r.type === 'incoming');
  }, [collabRequests, profile.id]);

  const sentRequests = useMemo(() => {
    return collabRequests.filter(r => r.fromStudentId === profile.id);
  }, [collabRequests, profile.id]);

  const handleOpenInvite = (student) => {
    setInviteTargetStudent(student);
    setInviteProjectTitle("HackCampus 2026 - Innovation Team");
    setInviteMessage(`Hi ${student.name}! I loved your project track record in ${student.skills?.[0] || 'tech'}. Let's team up!`);
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">Smart Team Finder</h1>
            <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-brand-100 text-brand-700 border border-brand-200">
              AI Matching Engine
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Find teammates for hackathons, capstones, and coding projects using complementary skill scoring.
          </p>
        </div>

        {/* Tab switchers: Explore vs Requests */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl self-start sm:self-auto text-xs font-semibold">
          <button
            onClick={() => setActiveTab('explore')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              activeTab === 'explore'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Explore Students ({students.length})
          </button>
          <button
            onClick={() => setActiveTab('requests')}
            className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
              activeTab === 'requests'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>Team Requests</span>
            {(incomingRequests.length > 0 || sentRequests.length > 0) && (
              <span className="w-5 h-5 rounded-full bg-brand-600 text-white text-[10px] flex items-center justify-center font-bold">
                {incomingRequests.filter(r => r.status === 'pending').length}
              </span>
            )}
          </button>
        </div>
      </div>

      {activeTab === 'explore' ? (
        <>
          {/* Transparent Matching Formula Explainer Banner */}
          <div className="bg-gradient-to-r from-brand-50 via-purple-50 to-indigo-50 border border-brand-200/80 rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-xl bg-brand-600 text-white shadow-sm mt-0.5">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">
                  Algorithmic Compatibility Formula
                </h4>
                <p className="text-xs text-slate-600 mt-0.5 max-w-2xl leading-relaxed">
                  Compatibility is calculated deterministically: <strong>40%</strong> Complementary Skill Synergy (Frontend & Backend/AI), <strong>25%</strong> Shared Interests, <strong>20%</strong> Common Technical Foundations, and <strong>15%</strong> Non-overlapping Role Balance.
                </p>
              </div>
            </div>
            <div className="text-xs text-brand-700 bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-xl border border-brand-200 font-semibold self-start md:self-center">
              Personalized for {profile.name.split(' ')[0]}
            </div>
          </div>

          {/* Search & Filters */}
          <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-soft flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search by student name, skill, interest or role..."
              className="flex-1"
            />

            <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
              <FilterDropdown
                options={departmentOptions}
                value={selectedDept}
                onChange={setSelectedDept}
              />
              <FilterDropdown
                options={yearOptions}
                value={selectedYear}
                onChange={setSelectedYear}
              />
              <FilterDropdown
                options={skillOptions}
                value={selectedSkill}
                onChange={setSelectedSkill}
              />
            </div>
          </div>

          {/* Student Grid */}
          {processedStudents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {processedStudents.map(({ student, compatibility }) => {
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
          ) : (
            <EmptyState
              icon={Users}
              title="No student profiles matched"
              description="Adjust your skill or department filters to discover more students."
              actionLabel="Reset Filters"
              onAction={() => {
                setSearchQuery('');
                setSelectedDept('All');
                setSelectedYear('All');
                setSelectedSkill('All');
              }}
            />
          )}
        </>
      ) : (
        /* Team Requests Tab (Incoming & Outgoing Requests) */
        <div className="space-y-6">
          {/* Incoming Requests */}
          <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-soft">
            <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center justify-between">
              <span>Incoming Team Invitations ({incomingRequests.length})</span>
            </h3>

            {incomingRequests.length > 0 ? (
              <div className="space-y-3">
                {incomingRequests.map((req) => {
                  const sender = students.find(s => s.id === req.fromStudentId) || {
                    name: "Prospective Teammate",
                    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250",
                    department: "Engineering",
                    skills: ["React", "Python"]
                  };

                  return (
                    <div
                      key={req.id}
                      className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={sender.avatar}
                          alt={sender.name}
                          className="w-11 h-11 rounded-full object-cover border border-slate-200"
                        />
                        <div>
                          <h4 className="text-sm font-bold text-slate-800">{sender.name}</h4>
                          <p className="text-xs text-slate-500 font-medium">
                            Project: <span className="text-brand-600 font-semibold">{req.projectTitle}</span>
                          </p>
                          <p className="text-xs text-slate-600 mt-1 italic">"{req.message}"</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 self-end md:self-center">
                        {req.status === 'pending' ? (
                          <>
                            <button
                              onClick={() => updateCollabRequestStatus(req.id, 'accepted')}
                              className="px-3 py-1.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg flex items-center gap-1 shadow-sm"
                            >
                              <Check className="w-3.5 h-3.5" />
                              <span>Accept</span>
                            </button>
                            <button
                              onClick={() => updateCollabRequestStatus(req.id, 'rejected')}
                              className="px-3 py-1.5 text-xs font-medium text-rose-600 hover:bg-rose-50 rounded-lg border border-rose-200"
                            >
                              Decline
                            </button>
                          </>
                        ) : (
                          <span className={`text-xs font-semibold px-2.5 py-1 rounded-md ${
                            req.status === 'accepted' ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-600'
                          }`}>
                            {req.status.charAt(0).toUpperCase() + req.status.slice(1)}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <EmptyState
                icon={Users}
                title="No incoming invites"
                description="When fellow students invite you to join their hackathon teams, requests will show up here."
              />
            )}
          </div>

          {/* Outgoing Sent Requests */}
          <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-soft">
            <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center justify-between">
              <span>Sent Invitations ({sentRequests.length})</span>
            </h3>

            {sentRequests.length > 0 ? (
              <div className="space-y-3">
                {sentRequests.map((req) => {
                  const targetStudent = students.find(s => s.id === req.toStudentId) || {
                    name: "Candidate Student",
                    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250",
                    department: "Campus"
                  };

                  return (
                    <div
                      key={req.id}
                      className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={targetStudent.avatar}
                          alt={targetStudent.name}
                          className="w-10 h-10 rounded-full object-cover border border-slate-200"
                        />
                        <div>
                          <h4 className="text-sm font-bold text-slate-800">{targetStudent.name}</h4>
                          <p className="text-xs text-slate-500 font-medium">
                            Invite for: <span className="text-slate-800 font-semibold">{req.projectTitle}</span>
                          </p>
                          <p className="text-xs text-slate-500 mt-0.5">{req.message}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 self-end md:self-center">
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-md ${
                          req.status === 'pending'
                            ? 'bg-amber-50 text-amber-700 border border-amber-200'
                            : req.status === 'accepted'
                            ? 'bg-emerald-50 text-emerald-700'
                            : 'bg-rose-50 text-rose-700'
                        }`}>
                          {req.status === 'pending' ? 'Pending Acceptance' : req.status.toUpperCase()}
                        </span>

                        {req.status === 'pending' && (
                          <button
                            onClick={() => updateCollabRequestStatus(req.id, 'withdrawn')}
                            className="text-xs text-slate-400 hover:text-rose-600 underline"
                          >
                            Withdraw
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <EmptyState
                icon={Send}
                title="No invitations sent yet"
                description="Explore student profiles and send invitations to form your hackathon dream team."
                actionLabel="Explore Students"
                onAction={() => setActiveTab('explore')}
              />
            )}
          </div>
        </div>
      )}

      {/* Invite Collaboration Modal */}
      <Modal
        isOpen={inviteModalOpen}
        onClose={() => setInviteModalOpen(false)}
        title={`Invite ${inviteTargetStudent?.name || 'Student'} to Team`}
      >
        <form onSubmit={handleSendInvite} className="space-y-4">
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
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Message / Pitch</label>
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
              <p className="text-xs font-semibold text-slate-700 mb-1.5">Technical Skills</p>
              <div className="flex flex-wrap gap-1.5">
                {selectedStudent.skills?.map((skill, i) => (
                  <span key={i} className="text-xs px-2.5 py-1 rounded-lg bg-brand-50 text-brand-700 font-medium">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold text-slate-700 mb-1.5">Interests & Domains</p>
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
                  const s = selectedStudent;
                  setSelectedStudent(null);
                  handleOpenInvite(s);
                }}
                className="px-5 py-2 text-xs font-semibold text-white bg-brand-600 hover:bg-brand-700 rounded-xl shadow-sm"
              >
                Send Collaboration Request
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default TeamFinderPage;

