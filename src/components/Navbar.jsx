import React, { useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import {
  GraduationCap,
  Menu,
  X,
  LayoutDashboard,
  Calendar,
  Users,
  Briefcase,
  MessageSquare,
  Bookmark,
  User,
  RotateCcw
} from 'lucide-react';
import { useApp } from '../context/AppContext';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { profile } = useApp();
  const location = useLocation();

  const isLandingPage = location.pathname === '/';

  const navLinks = [
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { label: 'Events', path: '/events', icon: Calendar },
    { label: 'Team Finder', path: '/teams', icon: Users },
    { label: 'Opportunities', path: '/opportunities', icon: Briefcase },
    { label: 'Community', path: '/community', icon: MessageSquare },
    { label: 'Saved', path: '/saved', icon: Bookmark },
    { label: 'Profile', path: '/profile', icon: User },
  ];

  return (
    <header className="bg-white/90 backdrop-blur-md border-b border-slate-100 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-500 flex items-center justify-center text-white shadow-sm shadow-brand-500/20">
              <GraduationCap className="w-5 h-5" />
            </div>
            <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-brand-700 to-indigo-600 bg-clip-text text-transparent">
              CampusConnect
            </span>
          </Link>

          {/* Desktop Right Side Navigation */}
          {isLandingPage ? (
            <div className="hidden md:flex items-center gap-6">
              <a href="#features" className="text-sm font-medium text-slate-600 hover:text-brand-600 transition-colors">
                Features
              </a>
              <a href="#how-it-works" className="text-sm font-medium text-slate-600 hover:text-brand-600 transition-colors">
                How It Works
              </a>
              <a href="#community-preview" className="text-sm font-medium text-slate-600 hover:text-brand-600 transition-colors">
                Community
              </a>
              <Link
                to="/events"
                className="text-sm font-medium text-slate-700 hover:text-brand-600 transition-colors"
              >
                Explore Events
              </Link>
              <Link
                to="/dashboard"
                className="inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-white bg-brand-600 rounded-xl hover:bg-brand-700 transition-colors shadow-sm shadow-brand-500/20"
              >
                Go to Dashboard
              </Link>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-4">
              <Link
                to="/profile"
                className="flex items-center gap-2.5 pl-3 pr-2 py-1.5 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-200"
              >
                <div className="text-right">
                  <p className="text-xs font-semibold text-slate-800 leading-none">{profile.name}</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">{profile.department.split('&')[0]}</p>
                </div>
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  className="w-8 h-8 rounded-full object-cover border border-brand-200"
                />
              </Link>
            </div>
          )}

          {/* Mobile hamburger button */}
          <div className="flex md:hidden items-center gap-2">
            {!isLandingPage && (
              <Link to="/profile" className="flex items-center">
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  className="w-8 h-8 rounded-full object-cover border border-slate-200"
                />
              </Link>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-100 bg-white px-4 pt-3 pb-5 space-y-2 animate-in fade-in duration-150">
          {isLandingPage ? (
            <div className="space-y-2">
              <a
                href="#features"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 text-sm font-medium text-slate-600 rounded-lg hover:bg-slate-50"
              >
                Features
              </a>
              <a
                href="#how-it-works"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 text-sm font-medium text-slate-600 rounded-lg hover:bg-slate-50"
              >
                How It Works
              </a>
              <Link
                to="/events"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 text-sm font-medium text-slate-600 rounded-lg hover:bg-slate-50"
              >
                Explore Events
              </Link>
              <Link
                to="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full text-center px-4 py-2.5 text-sm font-semibold text-white bg-brand-600 rounded-xl"
              >
                Go to Dashboard
              </Link>
            </div>
          ) : (
            <div className="space-y-1">
              {navLinks.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                        isActive
                          ? 'bg-brand-50 text-brand-700 font-semibold'
                          : 'text-slate-600 hover:bg-slate-50'
                      }`
                    }
                  >
                    <Icon className="w-4 h-4 text-brand-600" />
                    <span>{item.label}</span>
                  </NavLink>
                );
              })}
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;

