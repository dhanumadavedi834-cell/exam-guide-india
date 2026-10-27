import React from 'react';
import { ExamRecord } from '../types/exam';
import { useAuth } from '../context/AuthContext';
import { useExam } from '../context/ExamContext';
import {
  Calendar,
  Building2,
  Clock,
  Bookmark,
  ExternalLink,
  GraduationCap,
  MapPin,
  ChevronRight,
  CheckCircle2,
} from 'lucide-react';

interface ExamCardProps {
  exam: ExamRecord;
  onSelect: (exam: ExamRecord) => void;
}

export const ExamCard: React.FC<ExamCardProps> = ({ exam, onSelect }) => {
  const { isExamSaved, toggleSaveExam } = useAuth();
  const { addToast } = useExam();
  const saved = isExamSaved(exam.id);

  // Compute days remaining
  const calculateDaysLeft = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const end = new Date(exam.applicationEndDate);
    if (isNaN(end.getTime())) return null;
    const diff = Math.ceil((end.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return diff;
  };

  const daysLeft = calculateDaysLeft();

  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleSaveExam(exam.id);
    addToast(
      saved ? `Removed "${exam.shortName}" from bookmarks` : `Saved "${exam.shortName}" to bookmarks`,
      'info'
    );
  };

  return (
    <article
      onClick={() => onSelect(exam)}
      className="group relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 hover:border-orange-500/50 dark:hover:border-orange-500/50 hover:shadow-md transition-all duration-200 flex flex-col justify-between cursor-pointer"
    >
      <div>
        {/* Top Kicker: Clean unboxed metadata with typographic separators */}
        <div className="flex items-center justify-between gap-2 mb-2 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-1.5 truncate">
            <Building2 className="w-3.5 h-3.5 shrink-0 text-orange-600 dark:text-orange-500" />
            <span className="font-medium truncate">{exam.conductingBodyShort}</span>
            <span aria-hidden="true">·</span>
            <span className="capitalize">{exam.category}</span>
            <span aria-hidden="true">·</span>
            <span className="text-[11px] text-emerald-700 dark:text-emerald-400 font-medium">Verified Notice</span>
          </div>

          {/* Bookmark Action */}
          <button
            onClick={handleBookmarkClick}
            aria-label={saved ? 'Remove from saved' : 'Save exam to bookmarks'}
            className={`p-1.5 rounded-lg transition-colors ${
              saved
                ? 'text-orange-600 bg-orange-50 dark:bg-orange-950/40 dark:text-orange-400'
                : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Bookmark className={`w-4 h-4 ${saved ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Title */}
        <h3 className="text-base font-bold text-slate-900 dark:text-white leading-snug group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors mb-2">
          {exam.name}
        </h3>

        {/* Sub-details: Qualification & State */}
        <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300 mb-4">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="truncate">{exam.qualification}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="truncate">{exam.state}</span>
            <span aria-hidden="true" className="text-slate-300 dark:text-slate-600">·</span>
            <span className="truncate text-slate-500 dark:text-slate-400">{exam.vacancies}</span>
          </div>
        </div>
      </div>

      {/* Footer information & action bar */}
      <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80">
        <div className="flex items-center justify-between text-xs mb-3">
          {/* Important Deadline Date */}
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <div>
              <span className="text-[11px] text-slate-400 block leading-none">Last Date</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200 tabular-nums">
                {exam.applicationEndDate}
              </span>
            </div>
          </div>

          {/* Exam Date */}
          <div className="text-right">
            <span className="text-[11px] text-slate-400 block leading-none">Exam Date</span>
            <span className="font-semibold text-slate-800 dark:text-slate-200 tabular-nums">
              {exam.examDate}
            </span>
          </div>
        </div>

        {/* Action Row */}
        <div className="flex items-center justify-between pt-1">
          {/* Urgency indicator or status */}
          <div className="text-xs">
            {daysLeft !== null && daysLeft > 0 ? (
              <span className={`text-[11px] font-semibold ${
                daysLeft <= 7
                  ? 'text-rose-600 dark:text-rose-400'
                  : 'text-emerald-700 dark:text-emerald-400'
              }`}>
                {daysLeft === 1 ? 'Last 24 Hours' : `${daysLeft} days left`}
              </span>
            ) : daysLeft !== null && daysLeft <= 0 ? (
              <span className="text-[11px] text-slate-400">Applications Closed</span>
            ) : (
              <span className="text-[11px] text-slate-500">Dates on Portal</span>
            )}
          </div>

          <div className="flex items-center gap-1.5 text-xs font-semibold text-orange-600 dark:text-orange-400 group-hover:translate-x-0.5 transition-transform">
            <span>View Details</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>
    </article>
  );
};
