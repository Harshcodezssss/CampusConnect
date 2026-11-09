import React, { useState } from 'react';
import {
  User,
  GraduationCap,
  Sparkles,
  Save,
  RotateCcw,
  Plus,
  X,
  CheckCircle,
  Briefcase,
  Layers,
  Heart,
  AlertTriangle
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { calculateProfileCompletion } from '../utils/matching';
import Modal from '../components/Modal';

const ProfilePage = () => {
  const { profile, updateProfile, resetAllDemoData } = useApp();

  const [formData, setFormData] = useState({ ...profile });
  const [skillInput, setSkillInput] = useState('');
  const [interestInput, setInterestInput] = useState('');
  const [roleInput, setRoleInput] = useState('');
  const [resetModalOpen, setResetModalOpen] = useState(false);

  const completionPercentage = calculateProfileCompletion(formData);

  const departments = [
    'Computer Science & Engineering',
    'Information Technology',
    'Data Science & AI',
    'Design & Media Studies',
    'Electronics & Communication',
    'Business & Management',
    'Cyber Security & Forensics',
    'Mechanical Engineering'
  ];

  const academicYears = ['1st Year', '2nd Year', '3rd Year', '4th Year', 'Postgraduate'];

  const availabilityOptions = [
    'Available for Hackathons',
    'Open for Projects',
    'Busy with Academics'
  ];

  const handleAddSkill = (e) => {
    e.preventDefault();
    if (skillInput.trim() && !formData.skills.includes(skillInput.trim())) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, skillInput.trim()]
      }));
      setSkillInput('');
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skillToRemove)
    }));
  };

  const handleAddInterest = (e) => {
    e.preventDefault();
    if (interestInput.trim() && !formData.interests.includes(interestInput.trim())) {
      setFormData(prev => ({
        ...prev,
        interests: [...prev.interests, interestInput.trim()]
      }));
      setInterestInput('');
    }
  };

  const handleRemoveInterest = (interestToRemove) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.filter(i => i !== interestToRemove)
    }));
  };

  const handleAddRole = (e) => {
    e.preventDefault();
    if (roleInput.trim() && !formData.preferredRoles.includes(roleInput.trim())) {
      setFormData(prev => ({
        ...prev,
        preferredRoles: [...prev.preferredRoles, roleInput.trim()]
      }));
      setRoleInput('');
    }
  };

  const handleRemoveRole = (roleToRemove) => {
    setFormData(prev => ({
      ...prev,
      preferredRoles: prev.preferredRoles.filter(r => r !== roleToRemove)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile(formData);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">My Student Profile</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Personalize your skills and preferences to improve algorithmic teammate recommendations.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setResetModalOpen(true)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-xl border border-rose-200 transition-colors self-start sm:self-auto"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Demo Data</span>
        </button>
      </div>

      {/* Profile Card & Strength Banner */}
      <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-soft">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-100">
          <div className="flex items-center gap-4">
            <img
              src={formData.avatar}
              alt={formData.name}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-brand-200 shadow-sm"
            />
            <div>
              <h2 className="text-xl font-bold text-slate-800">{formData.name}</h2>
              <p className="text-xs text-slate-500 font-medium">
                {formData.department} • <span className="text-brand-600 font-semibold">{formData.year}</span>
              </p>
              <div className="mt-2 inline-block">
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  {formData.availability}
                </span>
              </div>
            </div>
          </div>

          {/* Profile Strength */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 min-w-[220px]">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="font-semibold text-slate-600">Profile Completion</span>
              <span className="font-bold text-brand-600">{completionPercentage}%</span>
            </div>
            <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
              <div
                className="bg-brand-600 h-full rounded-full transition-all duration-300"
                style={{ width: `${completionPercentage}%` }}
              />
            </div>
            <p className="text-[11px] text-slate-400 mt-1.5">
              {completionPercentage >= 90 ? "Optimal matching accuracy reached!" : "Add skills & roles to hit 100%"}
            </p>
          </div>
        </div>

        {/* Profile Edit Form */}
        <form onSubmit={handleSubmit} className="pt-6 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-3.5 py-2 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Student Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className="w-full px-3.5 py-2 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Department</label>
              <select
                value={formData.department}
                onChange={(e) => setFormData(prev => ({ ...prev, department: e.target.value }))}
                className="w-full px-3.5 py-2 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
              >
                {departments.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Academic Year</label>
              <select
                value={formData.year}
                onChange={(e) => setFormData(prev => ({ ...prev, year: e.target.value }))}
                className="w-full px-3.5 py-2 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
              >
                {academicYears.map((y) => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Availability Status</label>
              <select
                value={formData.availability}
                onChange={(e) => setFormData(prev => ({ ...prev, availability: e.target.value }))}
                className="w-full px-3.5 py-2 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
              >
                {availabilityOptions.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Avatar Image URL</label>
              <input
                type="url"
                value={formData.avatar}
                onChange={(e) => setFormData(prev => ({ ...prev, avatar: e.target.value }))}
                className="w-full px-3.5 py-2 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Short Bio</label>
            <textarea
              rows={3}
              value={formData.bio}
              onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
              placeholder="Tell other students about your focus areas, projects, or hackathon aspirations..."
              className="w-full px-3.5 py-2 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 placeholder:text-slate-400"
            />
          </div>

          {/* Technical Skills Manager */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Technical Skills (Used for complementary match scoring)
            </label>
            <div className="flex flex-wrap gap-2 mb-2.5">
              {(formData.skills || []).map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-50 text-brand-700 border border-brand-200 rounded-xl text-xs font-medium"
                >
                  <span>{skill}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(skill)}
                    className="hover:text-rose-600"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Add a skill (e.g., Python, Docker, UI/UX, Go)..."
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddSkill(e);
                  }
                }}
                className="flex-1 px-3.5 py-2 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 placeholder:text-slate-400"
              />
              <button
                type="button"
                onClick={handleAddSkill}
                className="px-4 py-2 text-xs font-semibold text-brand-700 bg-brand-50 hover:bg-brand-100 rounded-xl border border-brand-200 transition-colors"
              >
                Add Skill
              </button>
            </div>
          </div>

          {/* Preferred Roles Manager */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Preferred Project Roles
            </label>
            <div className="flex flex-wrap gap-2 mb-2.5">
              {(formData.preferredRoles || []).map((role) => (
                <span
                  key={role}
                  className="inline-flex items-center gap-1.5 px-3 py-1 bg-purple-50 text-purple-700 border border-purple-200 rounded-xl text-xs font-medium"
                >
                  <span>{role}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveRole(role)}
                    className="hover:text-rose-600"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Add role (e.g., Frontend Lead, AI Engineer, UI/UX Designer)..."
                value={roleInput}
                onChange={(e) => setRoleInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddRole(e);
                  }
                }}
                className="flex-1 px-3.5 py-2 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 placeholder:text-slate-400"
              />
              <button
                type="button"
                onClick={handleAddRole}
                className="px-4 py-2 text-xs font-semibold text-purple-700 bg-purple-50 hover:bg-purple-100 rounded-xl border border-purple-200 transition-colors"
              >
                Add Role
              </button>
            </div>
          </div>

          {/* Interests Manager */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Interests & Fields of Interest
            </label>
            <div className="flex flex-wrap gap-2 mb-2.5">
              {(formData.interests || []).map((interest) => (
                <span
                  key={interest}
                  className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-700 border border-blue-200 rounded-xl text-xs font-medium"
                >
                  <span>{interest}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveInterest(interest)}
                    className="hover:text-rose-600"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Add interest (e.g., FinTech, Open Source, Hackathons)..."
                value={interestInput}
                onChange={(e) => setInterestInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddInterest(e);
                  }
                }}
                className="flex-1 px-3.5 py-2 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 placeholder:text-slate-400"
              />
              <button
                type="button"
                onClick={handleAddInterest}
                className="px-4 py-2 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-xl border border-blue-200 transition-colors"
              >
                Add Interest
              </button>
            </div>
          </div>

          {/* Submit Actions */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-6 py-2.5 text-xs sm:text-sm font-semibold text-white bg-brand-600 hover:bg-brand-700 rounded-xl transition-all shadow-sm"
            >
              <Save className="w-4 h-4" />
              <span>Save Changes</span>
            </button>
          </div>
        </form>
      </div>

      {/* Confirmation Modal for Resetting Demo Data */}
      <Modal
        isOpen={resetModalOpen}
        onClose={() => setResetModalOpen(false)}
        title="Confirm Reset Demo Data"
      >
        <div className="space-y-4">
          <div className="flex items-start gap-3 p-3 bg-rose-50 text-rose-800 rounded-xl border border-rose-200">
            <AlertTriangle className="w-5 h-5 flex-shrink-0 text-rose-600 mt-0.5" />
            <p className="text-xs leading-relaxed">
              This action will restore all campus events, sample student profiles, opportunities, registered events, saved bookmarks, and community posts back to the default initial mock data state.
            </p>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setResetModalOpen(false)}
              className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-xl"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => {
                resetAllDemoData();
                setResetModalOpen(false);
              }}
              className="px-5 py-2 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded-xl shadow-sm"
            >
              Yes, Reset Everything
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ProfilePage;

