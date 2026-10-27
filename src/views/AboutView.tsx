import React from 'react';
import {
  GraduationCap,
  ShieldCheck,
  FileCheck2,
  Search,
  BookOpen,
  Calendar,
  ExternalLink,
  Info,
} from 'lucide-react';
import { OFFICIAL_CONDUCTING_BODIES } from '../data/mockExams';

interface AboutViewProps {
  onNavigate: (view: string) => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Hero Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-950/40 px-3 py-1 rounded-full border border-orange-200/60 dark:border-orange-900/50">
          <GraduationCap className="w-4 h-4" />
          <span>Independent Educational Information Portal</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          About ExamGuide India
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          ExamGuide India is an independent, free discovery platform dedicated to providing accurate,
          timely, and structured examination information to students and job seekers across India.
        </p>
      </div>

      {/* Primary Mission & Purpose */}
      <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2.5">
          <ShieldCheck className="w-5 h-5 text-orange-600" />
          <span>Our Purpose</span>
        </h2>
        <div className="space-y-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          <p>
            India conducts dozens of national and state-level competitive recruitments and entrance
            tests every year. Aspirants often struggle to track authentic notifications across scattered
            gazettes, regional employment portals, and statutory board websites.
          </p>
          <p>
            Our objective is to organize this critical information into clear, structured formats:
            verified application opening dates, closing deadlines, age relaxation matrices,
            educational qualifications, selection processes, exam patterns, and direct links to
            official application portals.
          </p>
        </div>
      </section>

      {/* Information Scope */}
      <section className="space-y-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Information We Provide
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Carefully collated parameters across all major examination verticals
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-orange-100 dark:bg-orange-950/60 text-orange-600 flex items-center justify-center font-bold">
              <Calendar className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white text-sm">Key Dates & Deadlines</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Official notification dates, registration opening dates, last dates for fee submission,
              and examination dates as confirmed by conducting bodies.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-950/60 text-blue-600 flex items-center justify-center font-bold">
              <FileCheck2 className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white text-sm">Eligibility & Pattern</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Age limits, reservation relaxations, degree requirements, test stage breakdowns,
              negative marking rules, and subject mark distributions.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center font-bold">
              <ExternalLink className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white text-sm">Direct Official Links</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Direct access to official examination authority portals, gazette notification PDFs,
              admit card download servers, and result scorecards.
            </p>
          </div>
        </div>
      </section>

      {/* Verification Process & Disclaimers */}
      <section className="p-6 sm:p-8 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-orange-600" />
          <span>How Information Is Verified</span>
        </h2>
        <div className="space-y-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          <p>
            Information published on ExamGuide India is verified directly against official press releases,
            gazette notifications, and published information brochures released by respective authorities
            such as UPSC, SSC, NTA, IBPS, RRB, and State Public Service Commissions.
          </p>
          <p>
            Each exam profile specifies its <strong>Last Verified Date</strong> and <strong>Official Source</strong>.
            If an examination date or vacancy count has not yet been formally notified by the conducting board,
            it is explicitly labeled as awaiting notification.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/50 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-3">
          <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <strong>Important Legal Notice:</strong> ExamGuide India is an independently operated information
            service. It is <strong>not</strong> an official government website, nor is it associated with any
            ministry, statutory body, or recruitment board. The official conducting authority always remains the
            final and definitive source for exam dates, eligibility verification, and application submissions.
          </div>
        </div>
      </section>

      {/* Quick Links to Official Bodies */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white">
          Primary Conducting Bodies
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          {OFFICIAL_CONDUCTING_BODIES.map((b, i) => (
            <a
              key={i}
              href={b.portal}
              target="_blank"
              rel="noreferrer"
              className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-orange-500/50 transition-colors flex items-center justify-between group"
            >
              <span className="font-semibold text-slate-800 dark:text-slate-200">{b.name}</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-orange-600" />
            </a>
          ))}
        </div>
      </section>
    </div>
  );
};
