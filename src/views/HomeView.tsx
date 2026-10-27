import React from 'react';
import { useExam } from '../context/ExamContext';
import { ExamRecord, ExamCategory } from '../types/exam';
import { ExamCard } from '../components/ExamCard';
import { OFFICIAL_CONDUCTING_BODIES, STATES_LIST } from '../data/mockExams';
import {
  Search,
  Calendar,
  GraduationCap,
  Award,
  Building2,
  Clock,
  ArrowRight,
  BookOpen,
  FileCheck2,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';

import heroStudentImg from '../assets/images/hero_student_prep_1793107270759.jpg';

interface HomeViewProps {
  onSelectExam: (exam: ExamRecord) => void;
  onNavigate: (view: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onSelectExam, onNavigate }) => {
  const { exams, filters, setFilters, getUpcomingDeadlines } = useExam();

  const deadlines = getUpcomingDeadlines();
  const govExams = exams.filter((e) => e.category === 'government').slice(0, 4);
  const entranceExams = exams.filter((e) => e.category === 'entrance').slice(0, 4);
  const universityExams = exams.filter((e) => e.category === 'university').slice(0, 2);
  const scholarships = exams.filter((e) => e.category === 'scholarship').slice(0, 2);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNavigate('exams');
  };

  const handleCategoryClick = (cat: ExamCategory) => {
    setFilters((prev) => ({ ...prev, category: cat }));
    if (cat === 'government') onNavigate('gov-jobs');
    else if (cat === 'entrance') onNavigate('entrance');
    else if (cat === 'university') onNavigate('university');
    else onNavigate('exams');
  };

  return (
    <div className="space-y-14 pb-16">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-950/40 px-3 py-1 rounded-full border border-orange-200/60 dark:border-orange-900/50">
                <span className="w-2 h-2 rounded-full bg-orange-600 animate-ping" />
                <span>2026 Examination Calendar &amp; Notifications</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15]" style={{ textWrap: 'balance' }}>
                Find Your Next Exam Opportunity with ExamGuide India
              </h1>

              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-xl leading-relaxed">
                A verified, organized information portal for Indian competitive recruitments (UPSC, SSC, Banking, Railways),
                national entrance exams (JEE, NEET, GATE, CUET), official syllabi, and scorecards.
              </p>

              {/* Comprehensive Search Bar Form */}
              <form
                onSubmit={handleSearchSubmit}
                className="p-2 sm:p-2.5 bg-white dark:bg-slate-800 rounded-2xl shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-200 dark:border-slate-700 max-w-2xl space-y-2 sm:space-y-0 sm:flex sm:items-center sm:gap-2"
              >
                <div className="flex-1 flex items-center px-3 py-1.5 gap-2">
                  <Search className="w-5 h-5 text-orange-600 shrink-0" />
                  <input
                    type="text"
                    placeholder="Search by exam name (e.g., UPSC CSE, JEE Main, SSC CGL)..."
                    value={filters.searchQuery}
                    onChange={(e) => setFilters((prev) => ({ ...prev, searchQuery: e.target.value }))}
                    className="w-full text-xs sm:text-sm bg-transparent text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none"
                  />
                </div>

                <div className="sm:border-l sm:border-slate-200 dark:sm:border-slate-700 sm:pl-2">
                  <select
                    value={filters.state}
                    onChange={(e) => setFilters((prev) => ({ ...prev, state: e.target.value }))}
                    className="w-full sm:w-auto px-2 py-1.5 text-xs bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-300 rounded-lg border-0 focus:ring-1 focus:ring-orange-500"
                  >
                    <option value="all">All States</option>
                    {STATES_LIST.map((st) => (
                      <option key={st} value={st}>
                        {st}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-5 py-2.5 bg-orange-600 hover:bg-orange-700 text-white rounded-xl text-xs sm:text-sm font-bold shadow-md shadow-orange-600/20 transition-colors whitespace-nowrap shrink-0"
                >
                  Search Exams
                </button>
              </form>

              {/* Category Quick Jump Links */}
              <div className="flex flex-wrap items-center gap-2 pt-2 text-xs text-slate-500 dark:text-slate-400">
                <span className="font-medium text-slate-700 dark:text-slate-300">Popular Sectors:</span>
                <button
                  onClick={() => handleCategoryClick('government')}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 transition-colors"
                >
                  Civil Services &amp; SSC
                </button>
                <button
                  onClick={() => handleCategoryClick('entrance')}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 transition-colors"
                >
                  JEE &amp; NEET Entrance
                </button>
                <button
                  onClick={() => handleCategoryClick('university')}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 transition-colors"
                >
                  CUET &amp; Universities
                </button>
                <button
                  onClick={() => handleCategoryClick('scholarship')}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 transition-colors"
                >
                  Scholarships &amp; Grants
                </button>
              </div>
            </div>

            {/* Right Media Asset */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-2xl group">
                <img
                  src={heroStudentImg}
                  alt="Indian college students preparing for competitive and entrance exams"
                  referrerPolicy="no-referrer"
                  className="w-full h-[320px] sm:h-[380px] object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white p-3.5 backdrop-blur-sm bg-black/40 rounded-xl border border-white/10">
                  <p className="text-xs font-semibold text-orange-400 uppercase tracking-wider mb-0.5">
                    Official Gazette Sourced
                  </p>
                  <p className="text-xs text-slate-200 leading-snug">
                    ExamGuide India tracks statutory boards and employment gazettes to help students verify recruitment announcements.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MANDATORY VERIFICATION ADVISORY BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-blue-900 dark:text-blue-200">
          <div className="flex items-start gap-2.5">
            <AlertTriangle className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong>Official Verification Notice:</strong> ExamGuide India is an independent informational guide.
              Always confirm dates, fees, and eligibility criteria directly on the respective official conducting board website before applying.
            </p>
          </div>
          <button
            onClick={() => onNavigate('disclaimer')}
            className="text-orange-700 dark:text-orange-400 font-semibold underline shrink-0 text-left"
          >
            Read Disclaimer
          </button>
        </div>
      </section>

      {/* SECTION: HOW STUDENTS CAN USE THE PORTAL */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            How to Use ExamGuide India
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Four simple steps to track and prepare for upcoming examinations
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-orange-100 dark:bg-orange-950 text-orange-600 flex items-center justify-center font-bold">
              1
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white text-sm">Find Examinations</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Search by recruitment title, qualification level (12th, Graduate, Engineering), or State to discover open opportunities.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-950 text-blue-600 flex items-center justify-center font-bold">
              2
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white text-sm">Check Age Eligibility</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Use the built-in age eligibility calculator with your date of birth and category to test minimum and maximum age criteria.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center font-bold">
              3
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white text-sm">Study Syllabus &amp; Pattern</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Inspect subject-wise mark allocations, testing modes (CBT or Pen-Paper), duration, and negative marking rules.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-950 text-amber-600 flex items-center justify-center font-bold">
              4
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white text-sm">Apply on Official Portal</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Navigate directly to statutory gateways (upsc.gov.in, ssc.gov.in, nta.ac.in) to submit authentic applications.
            </p>
          </div>
        </div>
      </section>

      {/* UPCOMING APPLICATION DEADLINES TICKER / STRIP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Clock className="w-5 h-5 text-rose-600" />
              <span>Upcoming Application Deadlines</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Active application windows closing in upcoming weeks
            </p>
          </div>
          <button
            onClick={() => onNavigate('exams')}
            className="text-xs font-semibold text-orange-600 dark:text-orange-400 hover:underline flex items-center gap-1"
          >
            <span>View All Deadlines</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {deadlines.map((exam) => {
            const today = new Date();
            const end = new Date(exam.applicationEndDate);
            const daysLeft = Math.ceil((end.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
            return (
              <div
                key={exam.id}
                onClick={() => onSelectExam(exam)}
                className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-orange-500/60 transition-all cursor-pointer flex items-center justify-between gap-3 group"
              >
                <div className="min-w-0">
                  <span className="text-[10px] font-bold text-slate-400 block uppercase truncate">
                    {exam.conductingBodyShort} · {exam.qualificationLevel}
                  </span>
                  <h3 className="text-xs font-bold text-slate-900 dark:text-white truncate group-hover:text-orange-600 transition-colors">
                    {exam.shortName}
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                    Last Date: <span className="font-semibold text-slate-800 dark:text-slate-200">{exam.applicationEndDate}</span>
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <span className={`inline-block px-2 py-1 rounded text-[11px] font-bold tabular-nums ${
                    daysLeft <= 7
                      ? 'bg-rose-50 text-rose-600 dark:bg-rose-950 dark:text-rose-300'
                      : 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                  }`}>
                    {daysLeft <= 0 ? 'Closed' : `${daysLeft}d left`}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* RESERVED GOOGLE ADSENSE BANNER CONTAINER (Clean Ad Placement) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-4 sm:p-5 rounded-2xl border border-dashed border-slate-300 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/50 flex flex-col items-center justify-center text-center space-y-1">
          <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
            Advertisement Space (Ready for Google AdSense Integration)
          </span>
          <p className="text-[11px] text-slate-500">
            Clean, non-intrusive banner zone reserved for responsive educational sponsor advertisements.
          </p>
        </div>
      </section>

      {/* SECTION: GOVERNMENT RECRUITMENT EXAMS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Building2 className="w-5 h-5 text-orange-600" />
              <span>Government Recruitment Examinations</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Civil services, banking, railways, and central ministries recruitment notices
            </p>
          </div>
          <button
            onClick={() => onNavigate('gov-jobs')}
            className="text-xs font-semibold text-orange-600 dark:text-orange-400 hover:underline flex items-center gap-1"
          >
            <span>See All ({exams.filter((e) => e.category === 'government').length})</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {govExams.map((exam) => (
            <ExamCard key={exam.id} exam={exam} onSelect={onSelectExam} />
          ))}
        </div>
      </section>

      {/* SECTION: ENTRANCE EXAMINATIONS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-orange-600" />
              <span>National Entrance Examinations</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Engineering, Medical, Management, and postgraduate entrance tests
            </p>
          </div>
          <button
            onClick={() => onNavigate('entrance')}
            className="text-xs font-semibold text-orange-600 dark:text-orange-400 hover:underline flex items-center gap-1"
          >
            <span>See All Entrance</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {entranceExams.map((exam) => (
            <ExamCard key={exam.id} exam={exam} onSelect={onSelectExam} />
          ))}
        </div>
      </section>

      {/* SECTION: UNIVERSITY ADMISSIONS & SCHOLARSHIPS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Award className="w-5 h-5 text-orange-600" />
                <span>University Admissions &amp; Scholarship Schemes</span>
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                CUET admissions, DST science fellowships, and higher education assistance
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[...universityExams, ...scholarships].map((exam) => (
              <ExamCard key={exam.id} exam={exam} onSelect={onSelectExam} />
            ))}
          </div>
        </div>
      </section>

      {/* DIRECTORY: OFFICIAL CONDUCTING BODIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Official Examination Gateways
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Direct access to official registration systems and gazettes
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 text-xs">
          {OFFICIAL_CONDUCTING_BODIES.map((body, bidx) => (
            <a
              key={bidx}
              href={body.portal}
              target="_blank"
              rel="noreferrer"
              className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-orange-500/50 hover:bg-orange-50/20 dark:hover:bg-slate-800/80 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between text-orange-600 font-bold mb-1">
                  <span>{body.name}</span>
                  <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-orange-600 transition-colors" />
                </div>
                <p className="font-semibold text-slate-800 dark:text-slate-200 text-xs mb-1 line-clamp-1">
                  {body.fullName}
                </p>
                <p className="text-[11px] text-slate-500 line-clamp-1">{body.category}</p>
              </div>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
};
