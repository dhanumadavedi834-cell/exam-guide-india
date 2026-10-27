import React from 'react';
import { FileText, ShieldAlert } from 'lucide-react';

export const TermsView: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 text-slate-800 dark:text-slate-200">
      <div className="border-b border-slate-200 dark:border-slate-800 pb-5">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Terms and Conditions
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Effective Date: October 2026 · Terms of Use for ExamGuide India
        </p>
      </div>

      <div className="space-y-6 text-xs sm:text-sm leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            1. Informational & Educational Service Only
          </h2>
          <p>
            ExamGuide India is provided solely for general educational guidance, candidate discovery,
            and preparation orientation. The website summarizes publicly announced notices, eligibility criteria,
            and examination patterns released by statutory conducting boards.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            2. Non-Governmental Independence
          </h2>
          <p>
            ExamGuide India is an independent, non-governmental educational information portal.
            It does not represent, act on behalf of, or possess any formal association with the Government of India,
            State Governments, Union Public Service Commission, Staff Selection Commission, National Testing Agency,
            Railway Recruitment Boards, or any public sector university.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            3. Accuracy & Verification Obligation of Candidates
          </h2>
          <p>
            While we exercise due editorial care to cross-check dates, vacancy figures, syllabus outlines,
            and fee structures with official notifications, recruitment boards frequently publish corrigenda,
            extend deadlines, or modify exam venues.
          </p>
          <p className="font-semibold text-slate-900 dark:text-white">
            Candidates are strictly required to verify all dates, age limits, syllabus parameters, and application
            fees directly with the official gazette notification on the conducting board's portal before submitting
            applications or paying examination fees.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            4. Intellectual Property & Trademarks
          </h2>
          <p>
            All registered trademarks, acronyms (UPSC, SSC, NTA, IBPS, IIT, IIM), logos, and exam titles
            belong entirely to their respective statutory bodies. Their appearance on ExamGuide India is for
            referential and descriptive identification purposes only and does not imply sponsorship or endorsement.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            5. Limitation of Liability
          </h2>
          <p>
            In no event shall ExamGuide India or its editorial contributors be held liable for missed application
            deadlines, traveling arrangements, examination center issues, fee transactions on external portals,
            or decisions taken based on summarized website content.
          </p>
        </section>
      </div>
    </div>
  );
};
