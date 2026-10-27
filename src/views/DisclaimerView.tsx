import React from 'react';
import { AlertTriangle, ShieldAlert, CheckCircle2, ExternalLink } from 'lucide-react';
import { OFFICIAL_CONDUCTING_BODIES } from '../data/mockExams';

export const DisclaimerView: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 text-slate-800 dark:text-slate-200">
      <div className="border-b border-slate-200 dark:border-slate-800 pb-5">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white flex items-center gap-3">
          <ShieldAlert className="w-8 h-8 text-orange-600" />
          <span>Disclaimer &amp; Non-Affiliation Notice</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Mandatory Legal Declaration for ExamGuide India Visitors
        </p>
      </div>

      <div className="space-y-6 text-xs sm:text-sm leading-relaxed">
        {/* Prominent High-Visibility Callout Box */}
        <div className="p-5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border-2 border-amber-300 dark:border-amber-800 text-amber-950 dark:text-amber-100 space-y-2">
          <h2 className="font-extrabold text-sm sm:text-base text-amber-900 dark:text-amber-200 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-600" />
            <span>NON-GOVERNMENTAL INDEPENDENT ENTITY DECLARATION</span>
          </h2>
          <p className="leading-relaxed">
            <strong>ExamGuide India is an independent, non-governmental educational information website.</strong> It is
            NOT owned, operated, affiliated with, endorsed by, or in any way officially associated with the Government of India,
            any State Government, the Union Public Service Commission (UPSC), the Staff Selection Commission (SSC), the
            National Testing Agency (NTA), the Railway Recruitment Boards (RRB), the Institute of Banking Personnel Selection (IBPS),
            the Central Board of Secondary Education (CBSE), or any other examination authority or university.
          </p>
        </div>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            1. Nature of Website Content
          </h2>
          <p>
            The content published on ExamGuide India—including notification dates, application procedures, syllabus breakdowns,
            examination patterns, and qualifying benchmarks—is compiled from publicly released gazettes, official press releases,
            and published information brochures solely for candidate reference and educational assistance.
          </p>
          <p>
            While every effort is made to maintain factual accuracy and reflect current schedules, examination authorities reserve
            the exclusive right to modify dates, vacancies, test venues, and eligibility criteria at any time.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            2. Obligation to Verify on Official Portals
          </h2>
          <p className="font-semibold text-slate-900 dark:text-white">
            Aspirants must always verify all notifications, eligibility limits, fee structures, and application procedures
            directly on the respective official statutory website before submitting forms or making financial payments.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            3. Zero Fee Collection for Examinations
          </h2>
          <p>
            ExamGuide India <strong>never</strong> collects application fees, processing charges, or counseling deposits for
            any competitive examination. All examination fees must be paid exclusively on the secured payment gateways of the
            official examination authority. Beware of fraudulent portals claiming to process applications on behalf of recruitment boards.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            4. Official Gateways Directory
          </h2>
          <p>
            Always use these verified domains when completing applications or downloading hall tickets:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-xs">
            {OFFICIAL_CONDUCTING_BODIES.map((b, i) => (
              <a
                key={i}
                href={b.portal}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-orange-500 transition-colors flex items-center justify-between"
              >
                <span className="font-semibold text-slate-800 dark:text-slate-200">{b.fullName} ({b.name})</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
              </a>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
