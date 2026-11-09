import React, { useState, useMemo } from 'react';
import {
  Briefcase,
  Search,
  Filter,
  Bookmark,
  CheckCircle2,
  Building,
  Calendar,
  DollarSign,
  ArrowUpRight,
  Sparkles,
  Info
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import OpportunityCard from '../components/OpportunityCard';
import SearchBar from '../components/SearchBar';
import FilterDropdown from '../components/FilterDropdown';
import EmptyState from '../components/EmptyState';
import Modal from '../components/Modal';

const OpportunityBoardPage = () => {
  const {
    opportunities,
    savedOpportunityIds,
    appliedOpportunityIds,
    toggleSaveOpportunity,
    markOpportunityApplied
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('deadline-asc'); // 'deadline-asc', 'deadline-desc'
  const [selectedOpportunity, setSelectedOpportunity] = useState(null);

  const categories = [
    { label: 'All Categories', value: 'All' },
    { label: 'Internships', value: 'Internships' },
    { label: 'Hackathons', value: 'Hackathons' },
    { label: 'Scholarships', value: 'Scholarships' },
    { label: 'Coding Competitions', value: 'Coding Competitions' },
    { label: 'Research Programs', value: 'Research Programs' },
    { label: 'Student Programs', value: 'Student Programs' },
  ];

  const sortOptions = [
    { label: 'Nearest Deadline First', value: 'deadline-asc' },
    { label: 'Furthest Deadline First', value: 'deadline-desc' },
  ];

  const filteredOpportunities = useMemo(() => {
    return opportunities
      .filter((opp) => {
        const matchesCategory = selectedCategory === 'All' || opp.category === selectedCategory;
        const query = searchQuery.toLowerCase();
        const matchesSearch =
          opp.title.toLowerCase().includes(query) ||
          opp.organization.toLowerCase().includes(query) ||
          opp.description.toLowerCase().includes(query) ||
          (opp.tags || []).some(t => t.toLowerCase().includes(query));
        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'deadline-asc') {
          return new Date(a.deadline) - new Date(b.deadline);
        } else if (sortBy === 'deadline-desc') {
          return new Date(b.deadline) - new Date(a.deadline);
        }
        return 0;
      });
  }, [opportunities, selectedCategory, searchQuery, sortBy]);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Opportunity Board</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Discover premier summer internships, student fellowships, coding cups, and open-source programs.
          </p>
        </div>

        {/* Applied pill */}
        <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-800 px-3.5 py-1.5 rounded-xl text-xs font-semibold self-start sm:self-auto">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{appliedOpportunityIds.length} Opportunities Applied</span>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-soft flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search by role, company name, tech keywords..."
          className="flex-1"
        />

        <div className="flex items-center gap-2.5 overflow-x-auto pb-1 md:pb-0">
          <FilterDropdown
            options={categories}
            value={selectedCategory}
            onChange={setSelectedCategory}
          />
          <FilterDropdown
            options={sortOptions}
            value={sortBy}
            onChange={setSortBy}
          />
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setSelectedCategory(cat.value)}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl whitespace-nowrap transition-colors ${
              selectedCategory === cat.value
                ? 'bg-brand-600 text-white shadow-sm'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Opportunity Grid */}
      {filteredOpportunities.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOpportunities.map((opp) => (
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
      ) : (
        <EmptyState
          icon={Briefcase}
          title="No opportunities found"
          description="Try modifying your keyword search or switching to another category."
          actionLabel="Clear Filters"
          onAction={() => {
            setSearchQuery('');
            setSelectedCategory('All');
          }}
        />
      )}

      {/* Opportunity Details & Application Modal */}
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

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {selectedOpportunity.description}
            </p>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-2 text-xs text-slate-700">
              <p><strong>Eligibility Criteria:</strong> {selectedOpportunity.eligibility}</p>
              {selectedOpportunity.stipend && (
                <p><strong>Stipend / Prize Pool:</strong> <span className="text-emerald-700 font-semibold">{selectedOpportunity.stipend}</span></p>
              )}
              {selectedOpportunity.requirements && (
                <div>
                  <strong>Key Requirements:</strong>
                  <ul className="list-disc pl-4 mt-1 space-y-1 text-slate-600">
                    {selectedOpportunity.requirements.map((req, i) => (
                      <li key={i}>{req}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Explanatory Notice */}
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-800 flex items-start gap-2">
              <Info className="w-4 h-4 flex-shrink-0 text-amber-600 mt-0.5" />
              <p>
                <strong>Demo Opportunity Record:</strong> This is a curated demonstration opportunity. Clicking <em>Submit Application</em> simulates applying and tracks your progress on your Student Dashboard.
              </p>
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
              <button
                onClick={() => setSelectedOpportunity(null)}
                className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-xl"
              >
                Close
              </button>

              {appliedOpportunityIds.includes(selectedOpportunity.id) ? (
                <div className="px-4 py-2 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Already Applied</span>
                </div>
              ) : (
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
    </div>
  );
};

export default OpportunityBoardPage;

