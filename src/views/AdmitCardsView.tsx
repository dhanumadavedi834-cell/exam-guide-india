import React, { useState } from 'react';
import { useExam } from '../context/ExamContext';
import { ExamRecord } from '../types/exam';
import {
  FileCheck,
  ExternalLink,
  CheckCircle2,
  Calendar,
  Clock,
  AlertTriangle,
  Download,
} from 'lucide-react';

interface AdmitCardsViewProps {
  onSelectExam: (exam: ExamRecord) => void;
}

export const AdmitCardsView: React.FC<AdmitCardsViewProps> = ({ onSelectExam }) => {
  const { exams } = useExam();
  const [filterState, setFilterState] = useState<'all' | 'released' | 'upcoming'>('all');

  const filteredCards = exams.filter((e) => {
    if (filterState === 'released') return e.admitCard.status === 'released';
    if (filterState === 'upcoming') return e.admitCard.status === 'upcoming' || e.admitCard.status === 'announced';
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Title & Filter Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white flex items-center gap-2.5">
            <FileCheck className="w-7 h-7 text-orange-600" />
            <span>Admit Cards & Hall Tickets 2026</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Real-time tracking of call letter releases, roll numbers, and official portal download links
          </p>
        </div>

        {/* Segmented Filter Control */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
          {[
            { id: 'all', label: 'All Exams' },
            { id: 'released', label: 'Released Now' },
            { id: 'upcoming', label: 'Upcoming / Expected' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterState(tab.id as any)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                filterState === tab.id
                  ? 'bg-white text-slate-900 shadow-sm dark:bg-slate-900 dark:text-white'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Important Exam Hall Instructions Banner */}
      <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/50 rounded-xl p-4 text-xs text-blue-900 dark:text-blue-200 space-y-1">
        <span className="font-bold flex items-center gap-1.5 text-blue-800 dark:text-blue-300">
          <AlertTriangle className="w-4 h-4 text-blue-600" />
          Standard Exam Day Checklist for Candidates:
        </span>
        <p className="leading-relaxed">
          1. Carry a printed color copy of the admit card with clear photograph and roll number.
          2. Bring original government photo identity proof (Aadhaar / Voter ID / Passport / Driving License).
          3. Affix additional identical passport photographs as specified by the board.
          4. Adhere strictly to the reported center reporting time; biometric scanning gates close 30 minutes before commencement.
        </p>
      </div>

      {/* Grid of Admit Card Records */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCards.map((exam) => {
          const isReleased = exam.admitCard.status === 'released';
          return (
            <div
              key={exam.id}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 hover:border-orange-500/50 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                  <span className="font-semibold text-orange-600">{exam.conductingBodyShort}</span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded capitalize ${
                      isReleased
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                        : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                    }`}
                  >
                    {isReleased ? 'Released & Active' : 'Expected Soon'}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                  {exam.name}
                </h3>

                <div className="space-y-1 text-xs text-slate-600 dark:text-slate-400 mb-4">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>Exam Date: <strong>{exam.examDate}</strong></span>
                  </div>
                  {exam.admitCard.releaseDate && (
                    <div className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400">
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                      <span>Released on: {exam.admitCard.releaseDate}</span>
                    </div>
                  )}
                  {exam.admitCard.expectedDate && (
                    <div className="flex items-center gap-1.5 text-slate-500">
                      <Clock className="w-3.5 h-3.5 shrink-0" />
                      <span>Expected: {exam.admitCard.expectedDate}</span>
                    </div>
                  )}
                </div>

                {/* Instructions snippet */}
                <div className="border-t border-slate-100 dark:border-slate-800 pt-3 mb-4">
                  <span className="text-[11px] font-bold text-slate-400 uppercase block mb-1">
                    Key Requirement
                  </span>
                  <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2">
                    {exam.admitCard.instructions[0] || 'Carry original ID and passport photograph.'}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 pt-2">
                <button
                  onClick={() => onSelectExam(exam)}
                  className="flex-1 px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors text-center"
                >
                  View Instructions
                </button>

                <a
                  href={exam.admitCard.downloadUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3.5 py-2 text-xs font-semibold text-white bg-orange-600 hover:bg-orange-700 rounded-lg transition-colors inline-flex items-center gap-1 shrink-0"
                >
                  <span>Portal</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
