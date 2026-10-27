import React from 'react';
import { GraduationCap, ShieldAlert, ExternalLink, Heart, Mail, Info, FileText } from 'lucide-react';
import { OFFICIAL_CONDUCTING_BODIES } from '../data/mockExams';

interface FooterProps {
  onNavigate: (view: string) => void;
  onOpenAdmin?: () => void;
  onOpenDeploymentGuide?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 text-xs">
      {/* Upper Directory Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Col 1: Brand & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-orange-600 flex items-center justify-center text-white">
                <GraduationCap className="w-4 h-4" />
              </div>
              <span className="text-lg font-bold text-white tracking-tight">
                ExamGuide <span className="text-orange-500">India</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              An independent educational discovery platform organizing verified examination timelines,
              eligibility criteria, comprehensive syllabi, admit card releases, and official links for Indian students.
            </p>
            <div className="pt-2 text-[11px] text-slate-400 flex flex-wrap items-center gap-3">
              <button onClick={() => onNavigate('about')} className="hover:text-white underline">
                About Us
              </button>
              <span>·</span>
              <button onClick={() => onNavigate('contact')} className="hover:text-white underline">
                Contact Us
              </button>
              <span>·</span>
              <button onClick={() => onNavigate('privacy')} className="hover:text-white underline">
                Privacy Policy
              </button>
              <span>·</span>
              <button onClick={() => onNavigate('terms')} className="hover:text-white underline">
                Terms of Use
              </button>
              <span>·</span>
              <button onClick={() => onNavigate('disclaimer')} className="hover:text-orange-400 underline font-semibold text-orange-400">
                Disclaimer
              </button>
            </div>
          </div>

          {/* Col 2: Exam Sectors */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3">
              Exam Verticals
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate('gov-jobs')} className="hover:text-white transition-colors">
                  Civil Services & UPSC
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('gov-jobs')} className="hover:text-white transition-colors">
                  Staff Selection (SSC)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('gov-jobs')} className="hover:text-white transition-colors">
                  Banking (IBPS & SBI)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('gov-jobs')} className="hover:text-white transition-colors">
                  Railways (RRB NTPC)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('entrance')} className="hover:text-white transition-colors">
                  Engineering (JEE & GATE)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('entrance')} className="hover:text-white transition-colors">
                  Medical (NEET UG)
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Student Tools */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3">
              Student Portals
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate('admit-cards')} className="hover:text-white transition-colors">
                  Admit Cards 2026
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('results')} className="hover:text-white transition-colors">
                  Results & Cut-Offs
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('syllabus')} className="hover:text-white transition-colors">
                  Syllabus & Exam Pattern
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('saved')} className="hover:text-white transition-colors">
                  My Saved Exams
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('dashboard')} className="hover:text-white transition-colors">
                  Student Workspace
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Official Conducting Portals */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3">
              Official Portals
            </h4>
            <ul className="space-y-2 text-xs">
              {OFFICIAL_CONDUCTING_BODIES.slice(0, 6).map((org, i) => (
                <li key={i}>
                  <a
                    href={org.portal}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-white transition-colors inline-flex items-center gap-1 group"
                  >
                    <span>{org.name} Portal</span>
                    <ExternalLink className="w-3 h-3 text-slate-500 group-hover:text-orange-400 transition-colors" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Prominent Legal Disclaimer Banner */}
        <div className="mt-10 p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-[11px] leading-relaxed text-slate-400">
          <span className="font-bold text-orange-400 block mb-1">
            STATUTORY NON-AFFILIATION NOTICE:
          </span>
          ExamGuide India is an independent informational and educational portal. It is NOT affiliated with, authorized
          by, or connected with the Union Public Service Commission (UPSC), Staff Selection Commission (SSC), National
          Testing Agency (NTA), Railway Recruitment Boards (RRB), Institute of Banking Personnel Selection (IBPS),
          or any State or Central Government department. Dates, notifications, and syllabus outlines are collated from
          official gazettes. Candidates must verify all application details directly on official conducting body portals.
        </div>

        {/* Bottom Copyright */}
        <div className="mt-8 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © 2026 ExamGuide India. All rights reserved. Independent educational information portal.
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => onNavigate('privacy')} className="hover:text-slate-300">Privacy</button>
            <span>·</span>
            <button onClick={() => onNavigate('terms')} className="hover:text-slate-300">Terms</button>
            <span>·</span>
            <button onClick={() => onNavigate('disclaimer')} className="hover:text-slate-300">Disclaimer</button>
            <span>·</span>
            <button onClick={() => onNavigate('contact')} className="hover:text-slate-300">Contact</button>
          </div>
        </div>
      </div>
    </footer>
  );
};
