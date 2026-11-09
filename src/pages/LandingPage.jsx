import React from 'react';
import { Link } from 'react-router-dom';
import {
  Calendar,
  Users,
  Briefcase,
  MessageSquare,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  CheckCircle,
  GraduationCap,
  Award
} from 'lucide-react';
import Navbar from '../components/Navbar';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white text-slate-800 flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 sm:pt-20 sm:pb-28 bg-gradient-to-b from-brand-50/60 via-white to-white">
        {/* Soft background glow accents */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brand-300/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-10 right-10 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-100/80 text-brand-800 text-xs font-semibold mb-6 border border-brand-200 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-brand-600" />
            <span>Next-Gen Student Life Platform</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.15] max-w-4xl mx-auto mb-6">
            Your Campus. Your People.{' '}
            <span className="bg-gradient-to-r from-brand-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent">
              Your Opportunities.
            </span>
          </h1>

          <p className="text-base sm:text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
            One platform to discover events, build teams, explore opportunities, and make the most of student life.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto mb-16">
            <Link
              to="/dashboard"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 text-base font-semibold text-white bg-brand-600 hover:bg-brand-700 rounded-xl transition-all shadow-md shadow-brand-500/25 hover:shadow-lg hover:shadow-brand-500/30"
            >
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/events"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 text-base font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200/80 rounded-xl transition-all"
            >
              <Calendar className="w-4 h-4 text-brand-600" />
              <span>Explore Events</span>
            </Link>
          </div>

          {/* Interactive UI Dashboard Teaser */}
          <div className="relative mx-auto max-w-5xl rounded-3xl p-3 sm:p-4 bg-gradient-to-b from-brand-200/50 to-slate-200/40 shadow-soft-xl border border-white">
            <div className="bg-white rounded-2xl p-4 sm:p-8 shadow-sm border border-slate-100 text-left">
              <div className="flex items-center justify-between pb-6 border-b border-slate-100 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-rose-400" />
                  <div className="w-3 h-3 rounded-full bg-amber-400" />
                  <div className="w-3 h-3 rounded-full bg-emerald-400" />
                  <span className="text-xs font-medium text-slate-400 ml-2">campusconnect.app/dashboard</span>
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Live Preview
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-xs font-semibold uppercase text-brand-600">Upcoming Hackathon</span>
                  <h4 className="text-sm font-bold text-slate-800 mt-1">HackCampus 2026: 36h National</h4>
                  <p className="text-xs text-slate-500 mt-2">Registration open • 48 slots remaining</p>
                </div>
                <div className="p-4 rounded-xl bg-brand-50/50 border border-brand-100">
                  <span className="text-xs font-semibold uppercase text-brand-700">Team Match Engine</span>
                  <h4 className="text-sm font-bold text-slate-800 mt-1">94% Compatibility Match</h4>
                  <p className="text-xs text-slate-600 mt-2">Pairs Python & PyTorch with your React frontend</p>
                </div>
                <div className="p-4 rounded-xl bg-blue-50/50 border border-blue-100">
                  <span className="text-xs font-semibold uppercase text-blue-700">Top Opportunity</span>
                  <h4 className="text-sm font-bold text-slate-800 mt-1">Microsoft Summer SWE Intern</h4>
                  <p className="text-xs text-slate-600 mt-2">Deadline: 2026-12-15 • Stipend provided</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Cards Section */}
      <section id="features" className="py-20 bg-slate-50 border-t border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-xs font-bold uppercase tracking-wider text-brand-600 mb-2">Designed for modern universities</h2>
            <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight">Everything a student needs in one hub</h3>
            <p className="text-sm text-slate-600 mt-3">From hackathon registration to finding your next startup co-founder, CampusConnect centralizes campus life.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-soft hover:shadow-soft-lg transition-all">
              <div className="p-3 bg-brand-50 text-brand-600 rounded-xl w-fit mb-4">
                <Calendar className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-slate-800 mb-2">Campus Event Hub</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Discover hackathons, technical workshops, sports, and cultural festivals with one-click registration and seat tracking.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-soft hover:shadow-soft-lg transition-all">
              <div className="p-3 bg-purple-50 text-purple-600 rounded-xl w-fit mb-4">
                <Users className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-slate-800 mb-2">Smart Team Finder</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Our algorithmic match engine calculates complementary skill synergy, shared interests, and role compatibility for your team.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-soft hover:shadow-soft-lg transition-all">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-xl w-fit mb-4">
                <Briefcase className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-slate-800 mb-2">Opportunity Board</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Track top summer internships, scholarships, coding contests, and research grants with countdown clocks and deadlines.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-soft hover:shadow-soft-lg transition-all">
              <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl w-fit mb-4">
                <MessageSquare className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-slate-800 mb-2">Student Community</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Share updates, discuss course tips, ask questions, and engage with peers through threaded comments and category tags.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-xs font-bold uppercase tracking-wider text-brand-600 mb-2">Effortless Workflow</h2>
            <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight">How CampusConnect Works</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-brand-100 text-brand-700 font-extrabold text-xl flex items-center justify-center mb-5 shadow-sm">
                1
              </div>
              <h4 className="text-base font-bold text-slate-800 mb-2">Build Your Skill Profile</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Add your academic branch, year, technical skills, interests, and preferred collaboration roles.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-blue-100 text-blue-700 font-extrabold text-xl flex items-center justify-center mb-5 shadow-sm">
                2
              </div>
              <h4 className="text-base font-bold text-slate-800 mb-2">Discover & Match</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Find teammates with high complementary compatibility scores and register for trending campus events.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-emerald-100 text-emerald-700 font-extrabold text-xl flex items-center justify-center mb-5 shadow-sm">
                3
              </div>
              <h4 className="text-base font-bold text-slate-800 mb-2">Build & Collaborate</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Send invites, manage requests, track your opportunity deadlines, and conquer college hackathons together.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Student Community Preview Section */}
      <section id="community-preview" className="py-20 bg-slate-50 border-t border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between mb-12">
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-brand-600 mb-1">Peer Network</h2>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Active campus conversations</h3>
            </div>
            <Link
              to="/community"
              className="mt-4 md:mt-0 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:text-brand-700"
            >
              <span>Join discussions</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-soft">
              <div className="flex items-center gap-3 mb-3">
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150"
                  alt="Rhea Sen"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <h4 className="text-sm font-bold text-slate-800">Rhea Sen</h4>
                  <span className="text-xs text-slate-400">Computer Science • Technical</span>
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                "Just open-sourced our campus paper summarizer using Llama 3 & LangChain! Would love feedback on prompt templates. 🚀"
              </p>
              <div className="text-xs text-slate-400 flex items-center gap-4">
                <span>18 Likes</span>
                <span>2 Comments</span>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-soft">
              <div className="flex items-center gap-3 mb-3">
                <img
                  src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=150"
                  alt="Ananya Iyer"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <h4 className="text-sm font-bold text-slate-800">Ananya Iyer</h4>
                  <span className="text-xs text-slate-400">Design Studies • Events</span>
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                "Reminder for the Figma Micro-Interactions workshop this Wednesday: Please install the LottieFiles plugin beforehand!"
              </p>
              <div className="text-xs text-slate-400 flex items-center gap-4">
                <span>24 Likes</span>
                <span>1 Comment</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto bg-white border-t border-slate-100 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-brand-600 flex items-center justify-center text-white">
                <GraduationCap className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-base tracking-tight text-slate-800">
                CampusConnect
              </span>
            </div>

            <div className="flex flex-wrap justify-center gap-6 text-xs text-slate-500">
              <Link to="/dashboard" className="hover:text-slate-800">Dashboard</Link>
              <Link to="/events" className="hover:text-slate-800">Events</Link>
              <Link to="/teams" className="hover:text-slate-800">Team Finder</Link>
              <Link to="/opportunities" className="hover:text-slate-800">Opportunities</Link>
              <Link to="/community" className="hover:text-slate-800">Community</Link>
            </div>

            <p className="text-xs text-slate-400">
              © {new Date().getFullYear()} CampusConnect. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;

