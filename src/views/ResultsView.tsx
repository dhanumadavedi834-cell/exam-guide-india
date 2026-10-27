import React, { useState } from 'react';
import { useExam } from '../context/ExamContext';
import { ExamRecord } from '../types/exam';
import {
  Award,
  ExternalLink,
  CheckCircle2,
  Calendar,
  TrendingUp,
  FileText,
  AlertCircle,
} from 'lucide-react';

interface ResultsViewProps {
  onSelectExam: (exam: ExamRecord) => void;
}

export const ResultsView: React.FC<ResultsViewProps> = ({ onSelectExam }) => {
  const { exams } = useExam();
  const [filterState, setFilterState] = useState<'all' | 'declared' | 'awaited'>('all');

  const filtered = exams.filter((e) => {
    const isDeclared = e.results.status === 'declared' || e.results.status === 'prelims_out' || e.results.status === 'merit_list_out';
    if (filterState === 'declared') return isDeclared;
    if (filterState === 'awaited') return !isDeclared;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Title & Filter Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white flex items-center gap-2.5">
            <Award className="w-7 h-7 text-orange-600" />
            <span>Results & Cut-Off Marks 2026</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Official scorecards, merit lists, qualifying percentiles, and category-wise cut-off marks
          </p>
        </div>

        {/* Segmented Filter Control */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
          {[
            { id: 'all', label: 'All Exams' },
            { id: 'declared', label: 'Results Declared' },
            { id: 'awaited', label: 'Results Awaited' },
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

      {/* Grid of Results Records */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((exam) => {
          const isDeclared = exam.results.status === 'declared' || exam.results.status === 'prelims_out' || exam.results.status === 'merit_list_out';
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
                      isDeclared
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                        : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                    }`}
                  >
                    {exam.results.status.replace('_', ' ')}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                  {exam.name}
                </h3>

                <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400 mb-4">
                  {exam.results.announcedDate && (
                    <div className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                      <span>Declared Date: {exam.results.announcedDate}</span>
                    </div>
                  )}

                  {exam.results.cutOffSummary ? (
                    <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-lg text-slate-700 dark:text-slate-300 border border-slate-100 dark:border-slate-800">
                      <span className="text-[10px] font-bold uppercase text-slate-400 block mb-0.5">
                        Cut-Off Summary
                      </span>
                      <p className="text-xs leading-relaxed">{exam.results.cutOffSummary}</p>
                    </div>
                  ) : (
                    <p className="text-slate-400 text-xs italic">
                      Official cut-off marks will be published along with final results.
                    </p>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                <button
                  onClick={() => onSelectExam(exam)}
                  className="flex-1 px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors text-center"
                >
                  Exam Overview
                </button>

                <a
                  href={exam.results.resultsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3.5 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 dark:bg-orange-600 dark:hover:bg-orange-700 rounded-lg transition-colors inline-flex items-center gap-1 shrink-0"
                >
                  <span>Scorecard</span>
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
