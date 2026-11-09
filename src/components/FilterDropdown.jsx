import React from 'react';
import { Filter } from 'lucide-react';

const FilterDropdown = ({ options, value, onChange, label = "Filter", className = "" }) => {
  return (
    <div className={`relative inline-flex items-center ${className}`}>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none bg-white border border-slate-200 text-slate-700 text-sm font-medium rounded-xl pl-9 pr-8 py-2 hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all cursor-pointer shadow-sm"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <Filter className="absolute left-3 w-4 h-4 text-slate-400 pointer-events-none" />
      <div className="absolute right-3 pointer-events-none text-slate-400 text-xs">
        ▼
      </div>
    </div>
  );
};

export default FilterDropdown;

