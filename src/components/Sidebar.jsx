import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Calendar,
  Users,
  Briefcase,
  MessageSquare,
  Bookmark,
  User,
  GraduationCap
} from 'lucide-react';
import { useApp } from '../context/AppContext';

const Sidebar = () => {
  const { profile, registeredEventIds, savedOpportunityIds } = useApp();

  const navItems = [
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { label: 'Campus Events', path: '/events', icon: Calendar, badge: registeredEventIds.length },
    { label: 'Team Finder', path: '/teams', icon: Users },
    { label: 'Opportunities', path: '/opportunities', icon: Briefcase },
    { label: 'Campus Community', path: '/community', icon: MessageSquare },
    { label: 'Saved Items', path: '/saved', icon: Bookmark, badge: savedOpportunityIds.length },
    { label: 'My Profile', path: '/profile', icon: User },
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-100 flex-shrink-0 min-h-screen flex flex-col justify-between hidden md:flex sticky top-0 h-screen z-30">
      <div>
        {/* Brand Header */}
        <div className="px-6 py-6 flex items-center gap-3 border-b border-slate-50">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-500 flex items-center justify-center text-white shadow-md shadow-brand-500/20">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-brand-700 to-indigo-600 bg-clip-text text-transparent">
              CampusConnect
            </span>
            <p className="text-[11px] text-slate-400 font-medium">Smart Campus Life</p>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="p-4 space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-brand-50 text-brand-700 shadow-sm shadow-brand-500/5 font-semibold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <div className="flex items-center gap-3">
                      <Icon className={`w-4 h-4 ${isActive ? 'text-brand-600' : 'text-slate-400'}`} />
                      <span>{item.label}</span>
                    </div>
                    {item.badge !== undefined && item.badge > 0 && (
                      <span className={`text-[11px] px-1.5 py-0.5 rounded-full font-semibold ${
                        isActive ? 'bg-brand-200 text-brand-800' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Mini Profile Card in Sidebar */}
      <div className="p-4 border-t border-slate-100">
        <NavLink
          to="/profile"
          className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-50 transition-colors"
        >
          <img
            src={profile.avatar}
            alt={profile.name}
            className="w-9 h-9 rounded-full object-cover border border-slate-200"
          />
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-slate-800 truncate">{profile.name}</p>
            <p className="text-[11px] text-slate-400 truncate">{profile.department}</p>
          </div>
        </NavLink>
      </div>
    </aside>
  );
};

export default Sidebar;

