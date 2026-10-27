import React from 'react';
import { useExam } from '../context/ExamContext';
import { ExamRecord, ExamCategory, QualificationLevel, ApplicationStatus } from '../types/exam';
import { ExamCard } from '../components/ExamCard';
import { STATES_LIST } from '../data/mockExams';
import {
  Search,
  SlidersHorizontal,
  RotateCcw,
  Sparkles,
  Inbox,
  Filter,
} from 'lucide-react';

interface ExamsCatalogViewProps {
  onSelectExam: (exam: ExamRecord) => void;
  presetTitle?: string;
  presetSubtitle?: string;
}

export const ExamsCatalogView: React.FC<ExamsCatalogViewProps> = ({
  onSelectExam,
  presetTitle,
  presetSubtitle,
}) => {
  const { filteredExams, filters, setFilters, resetFilters } = useExam();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Title & Stats */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            {presetTitle || 'All Competitive & Entrance Exams 2026'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            {presetSubtitle || 'Browse, filter and track deadlines for national and state level examinations'}
          </p>
        </div>
        <div className="text-xs text-slate-500 font-medium">
          Showing <span className="font-bold text-slate-900 dark:text-white">{filteredExams.length}</span> verified exam opportunities
        </div>
      </div>

      {/* Filter & Search Bar Controls */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-4">
        {/* Row 1: Search and Reset */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search by exam name, conducting body (UPSC, NTA, SSC, IBPS)..."
              value={filters.searchQuery}
              onChange={(e) => setFilters((prev) => ({ ...prev, searchQuery: e.target.value }))}
              className="w-full pl-9 pr-4 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-orange-500"
            />
          </div>

          <button
            onClick={resetFilters}
            className="w-full sm:w-auto px-3 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors flex items-center justify-center gap-1.5 shrink-0"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset All Filters</span>
          </button>
        </div>

        {/* Row 2: Facet Selectors */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 text-xs">
          {/* Category */}
          <div>
            <label className="block text-[11px] text-slate-400 mb-1 font-medium">Category</label>
            <select
              value={filters.category}
              onChange={(e) => setFilters((prev) => ({ ...prev, category: e.target.value as any }))}
              className="w-full p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:ring-1 focus:ring-orange-500 focus:outline-none"
            >
              <option value="all">All Categories</option>
              <option value="government">Government Jobs</option>
              <option value="entrance">Entrance Exams</option>
              <option value="university">University Admissions</option>
              <option value="scholarship">Scholarships & Aid</option>
            </select>
          </div>

          {/* Qualification */}
          <div>
            <label className="block text-[11px] text-slate-400 mb-1 font-medium">Eligibility</label>
            <select
              value={filters.qualification}
              onChange={(e) => setFilters((prev) => ({ ...prev, qualification: e.target.value as any }))}
              className="w-full p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:ring-1 focus:ring-orange-500 focus:outline-none"
            >
              <option value="all">All Qualifications</option>
              <option value="10th">10th Pass</option>
              <option value="12th">12th Pass</option>
              <option value="graduate">Graduate (Any Degree)</option>
              <option value="engineering">B.E. / B.Tech</option>
              <option value="medical">MBBS / Medical</option>
            </select>
          </div>

          {/* State / Central */}
          <div>
            <label className="block text-[11px] text-slate-400 mb-1 font-medium">State / Central</label>
            <select
              value={filters.state}
              onChange={(e) => setFilters((prev) => ({ ...prev, state: e.target.value }))}
              className="w-full p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:ring-1 focus:ring-orange-500 focus:outline-none"
            >
              <option value="all">All India / All States</option>
              <option value="All India / Central">Central / All India Only</option>
              {STATES_LIST.filter((s) => s !== 'All India / Central').map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          {/* Application Status */}
          <div>
            <label className="block text-[11px] text-slate-400 mb-1 font-medium">Application Status</label>
            <select
              value={filters.status}
              onChange={(e) => setFilters((prev) => ({ ...prev, status: e.target.value as any }))}
              className="w-full p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:ring-1 focus:ring-orange-500 focus:outline-none"
            >
              <option value="all">All Statuses</option>
              <option value="open">Applications Open</option>
              <option value="closing_soon">Closing Soon (&lt; 7 Days)</option>
              <option value="upcoming">Upcoming Announcements</option>
              <option value="closed">Closed</option>
            </select>
          </div>

          {/* Sorting */}
          <div>
            <label className="block text-[11px] text-slate-400 mb-1 font-medium">Sort By</label>
            <select
              value={filters.sortBy}
              onChange={(e) => setFilters((prev) => ({ ...prev, sortBy: e.target.value as any }))}
              className="w-full p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:ring-1 focus:ring-orange-500 focus:outline-none font-medium"
            >
              <option value="closing_soon">Closing Date (Earliest First)</option>
              <option value="recently_updated">Recently Verified</option>
              <option value="exam_date">Exam Date (Nearest First)</option>
              <option value="name">Exam Title (A-Z)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Exam Cards Grid or Empty State */}
      {filteredExams.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredExams.map((exam) => (
            <ExamCard key={exam.id} exam={exam} onSelect={onSelectExam} />
          ))}
        </div>
      ) : (
        <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 max-w-md mx-auto space-y-3">
          <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 flex items-center justify-center mx-auto">
            <Inbox className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            No exams match your filters
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Try loosening your state, qualification, or status filter, or reset all search parameters.
          </p>
          <button
            onClick={resetFilters}
            className="px-4 py-2 bg-orange-600 text-white rounded-lg text-xs font-semibold hover:bg-orange-700 transition-colors shadow-sm"
          >
            Clear Filters & View All
          </button>
        </div>
      )}
    </div>
  );
};
