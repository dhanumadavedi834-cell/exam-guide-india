import React, { useState } from 'react';
import { Bell, ChevronRight, Sparkles } from 'lucide-react';
import { ExamRecord } from '../types/exam';

interface NotificationTickerProps {
  exams: ExamRecord[];
  onSelectExam: (exam: ExamRecord) => void;
}

export const NotificationTicker: React.FC<NotificationTickerProps> = ({ exams, onSelectExam }) => {
  const [isPaused, setIsPaused] = useState(false);

  // Pick high priority notifications
  const highlights = [
    ...exams.filter((e) => e.admitCard.status === 'released').map((e) => ({
      type: 'Admit Card',
      text: `${e.shortName}: Admit Card Out for download.`,
      exam: e,
      urgent: true,
    })),
    ...exams.filter((e) => e.results.status === 'declared' || e.results.status === 'merit_list_out').map((e) => ({
      type: 'Result',
      text: `${e.shortName}: Results declared. Check scorecard & cutoff list.`,
      exam: e,
      urgent: false,
    })),
    ...exams.filter((e) => {
      const today = new Date();
      const end = new Date(e.applicationEndDate);
      const diff = Math.ceil((end.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
      return diff > 0 && diff <= 10;
    }).map((e) => ({
      type: 'Deadline',
      text: `${e.shortName}: Applications closing soon (Last Date: ${e.applicationEndDate}).`,
      exam: e,
      urgent: true,
    })),
  ];

  if (highlights.length === 0) return null;

  return (
    <div className="bg-orange-50/70 dark:bg-orange-950/20 border-b border-orange-200/60 dark:border-orange-900/40 py-2 px-4 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 shrink-0 text-orange-800 dark:text-orange-300 font-semibold text-xs">
          <Bell className="w-4 h-4 text-orange-600 dark:text-orange-400 animate-pulse" />
          <span className="hidden sm:inline">Latest Updates:</span>
        </div>

        <div
          className="flex-1 overflow-x-auto no-scrollbar flex items-center gap-6 text-xs"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {highlights.slice(0, 5).map((item, idx) => (
            <button
              key={idx}
              onClick={() => onSelectExam(item.exam)}
              className="flex items-center gap-1.5 whitespace-nowrap text-slate-700 dark:text-slate-300 hover:text-orange-600 dark:hover:text-orange-400 group transition-colors text-left"
            >
              <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${
                item.type === 'Deadline' ? 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300' :
                item.type === 'Admit Card' ? 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300' :
                'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
              }`}>
                {item.type}
              </span>
              <span className="group-hover:underline underline-offset-2">{item.text}</span>
              <ChevronRight className="w-3 h-3 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
