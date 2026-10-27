import React, { useState, useEffect } from 'react';
import { ExamRecord } from '../types/exam';
import { useAuth } from '../context/AuthContext';
import { useExam } from '../context/ExamContext';
import { AgeEligibilityChecker } from './AgeEligibilityChecker';
import {
  X,
  Building2,
  Calendar,
  Clock,
  Bookmark,
  ExternalLink,
  GraduationCap,
  FileText,
  CreditCard,
  Layers,
  Award,
  AlertCircle,
  Share2,
  Printer,
  CheckCircle2,
  BookOpen,
} from 'lucide-react';

interface ExamDetailModalProps {
  exam: ExamRecord;
  onClose: () => void;
}

export const ExamDetailModal: React.FC<ExamDetailModalProps> = ({ exam, onClose }) => {
  const { isExamSaved, toggleSaveExam, recordExamView } = useAuth();
  const { addToast } = useExam();
  const [activeTab, setActiveTab] = useState<'overview' | 'syllabus' | 'pattern' | 'admit_result'>('overview');
  const [selectedStageIndex, setSelectedStageIndex] = useState(0);

  const saved = isExamSaved(exam.id);

  useEffect(() => {
    recordExamView(exam.id);
  }, [exam.id]);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      addToast('Exam link copied to clipboard!', 'info');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-150">
      <div className="relative bg-white dark:bg-slate-900 w-full max-w-4xl rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Top Header Banner */}
        <div className="bg-slate-900 text-white p-6 sm:p-7 shrink-0 relative">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs text-orange-400 font-medium mb-1.5">
                <Building2 className="w-4 h-4" />
                <span>{exam.conductingBody}</span>
                <span>·</span>
                <span className="capitalize">{exam.category}</span>
                <span>·</span>
                <span className="bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded text-[10px] font-semibold">
                  Verified Notification
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white mb-2">
                {exam.name}
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
                {exam.subCategory} · {exam.state} · Vacancies: {exam.vacancies}
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => {
                  toggleSaveExam(exam.id);
                  addToast(saved ? 'Removed from bookmarks' : 'Added to saved exams', 'info');
                }}
                className={`p-2 rounded-xl transition-colors ${
                  saved
                    ? 'bg-orange-600 text-white'
                    : 'bg-white/10 hover:bg-white/20 text-white'
                }`}
                title={saved ? 'Remove bookmark' : 'Bookmark this exam'}
              >
                <Bookmark className={`w-4 h-4 ${saved ? 'fill-current' : ''}`} />
              </button>
              <button
                onClick={handleShare}
                className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-colors"
                title="Share link"
              >
                <Share2 className="w-4 h-4" />
              </button>
              <button
                onClick={handlePrint}
                className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-colors hidden sm:block"
                title="Print exam summary"
              >
                <Printer className="w-4 h-4" />
              </button>
              <button
                onClick={onClose}
                className="p-2 bg-white/10 hover:bg-rose-600 text-white rounded-xl transition-colors"
                aria-label="Close dialog"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Tabs */}
          <div className="flex items-center gap-1 mt-6 border-b border-slate-700/80 -mb-6 overflow-x-auto no-scrollbar">
            {[
              { id: 'overview', label: 'Overview & Eligibility' },
              { id: 'syllabus', label: 'Syllabus & Stages' },
              { id: 'pattern', label: 'Fee & Selection' },
              { id: 'admit_result', label: 'Admit Card & Results' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 text-xs font-semibold whitespace-nowrap transition-colors border-b-2 ${
                  activeTab === tab.id
                    ? 'border-orange-500 text-orange-400'
                    : 'border-transparent text-slate-400 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-slate-800 dark:text-slate-200">
          {/* Official Verification Advisory Banner */}
          <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/50 rounded-xl p-3.5 flex items-start gap-3 text-xs text-blue-900 dark:text-blue-200">
            <AlertCircle className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <div className="leading-relaxed">
              <span className="font-semibold">Official Source Verification:</span> Sourced from{' '}
              <strong>{exam.verificationSource || 'Official Gazette'}</strong> (Verified: {exam.lastVerifiedDate}).
              ExamGuide India is an independent educational portal. Candidates must always review the complete gazette
              notification on the official{' '}
              <a
                href={exam.officialWebsiteUrl}
                target="_blank"
                rel="noreferrer"
                className="font-bold underline hover:text-blue-700 dark:hover:text-blue-100"
              >
                {exam.conductingBodyShort} portal
              </a>{' '}
              before paying fees or submitting applications.
            </div>
          </div>

          {/* TAB 1: OVERVIEW & ELIGIBILITY */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Key Dates Timeline Grid */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
                  Critical Exam Schedule & Dates
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-800">
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 block mb-1">Notification Out</span>
                    <span className="font-bold text-sm text-slate-900 dark:text-white tabular-nums">
                      {exam.notificationDate}
                    </span>
                  </div>
                  <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-800">
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 block mb-1">Application Starts</span>
                    <span className="font-bold text-sm text-slate-900 dark:text-white tabular-nums">
                      {exam.applicationStartDate}
                    </span>
                  </div>
                  <div className="p-3 bg-orange-50 dark:bg-orange-950/30 rounded-xl border border-orange-200 dark:border-orange-900/50">
                    <span className="text-[11px] text-orange-700 dark:text-orange-400 block mb-1 font-semibold">
                      Last Date to Apply
                    </span>
                    <span className="font-bold text-sm text-orange-900 dark:text-orange-200 tabular-nums">
                      {exam.applicationEndDate}
                    </span>
                  </div>
                  <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-800">
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 block mb-1">
                      Exam Date {exam.isExamDateTentative && '(Tentative)'}
                    </span>
                    <span className="font-bold text-sm text-slate-900 dark:text-white tabular-nums">
                      {exam.examDate}
                    </span>
                  </div>
                </div>
              </div>

              {/* Eligibility & Qualifications */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                  <div className="flex items-center gap-2 mb-2 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    <GraduationCap className="w-4 h-4 text-orange-600" />
                    <span>Educational Qualification</span>
                  </div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white mb-2">
                    {exam.qualification}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Level requirement: <span className="font-medium uppercase text-slate-700 dark:text-slate-300">{exam.qualificationLevel}</span>
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                  <div className="flex items-center gap-2 mb-2 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    <Clock className="w-4 h-4 text-orange-600" />
                    <span>Age Limits & Relaxation</span>
                  </div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white mb-2">
                    {exam.minAge} to {exam.maxAge} years
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    {exam.ageRelaxation}
                  </p>
                </div>
              </div>

              {/* Interactive Age Eligibility Calculator */}
              <AgeEligibilityChecker exam={exam} />

              {/* Remuneration / Salary & Vacancies */}
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                  Salary / Stipend & Career Prospects
                </h4>
                <p className="text-sm text-slate-800 dark:text-slate-200 font-medium">
                  {exam.salaryOrStipend}
                </p>
              </div>
            </div>
          )}

          {/* TAB 2: SYLLABUS & STAGES */}
          {activeTab === 'syllabus' && (
            <div className="space-y-6">
              <div className="p-4 rounded-xl bg-orange-50/50 dark:bg-orange-950/20 border border-orange-200/50 dark:border-orange-900/40">
                <h4 className="text-xs font-bold uppercase tracking-wider text-orange-900 dark:text-orange-300 mb-1">
                  Syllabus Overview
                </h4>
                <p className="text-xs leading-relaxed text-slate-700 dark:text-slate-300">
                  {exam.syllabusSummary.overview}
                </p>
              </div>

              {/* Stage selector tabs */}
              <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
                {exam.syllabusSummary.stages.map((stg, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedStageIndex(i)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                      selectedStageIndex === i
                        ? 'bg-slate-900 text-white dark:bg-orange-600'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900'
                    }`}
                  >
                    {stg.stageName}
                  </button>
                ))}
              </div>

              {/* Active Stage Details */}
              {exam.syllabusSummary.stages[selectedStageIndex] && (
                <div className="space-y-4">
                  {(() => {
                    const stage = exam.syllabusSummary.stages[selectedStageIndex];
                    return (
                      <>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                          <div className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded-lg">
                            <span className="text-slate-400 block">Mode</span>
                            <span className="font-semibold">{stage.mode}</span>
                          </div>
                          <div className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded-lg">
                            <span className="text-slate-400 block">Total Marks</span>
                            <span className="font-semibold tabular-nums">{stage.totalMarks} Marks</span>
                          </div>
                          <div className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded-lg">
                            <span className="text-slate-400 block">Duration</span>
                            <span className="font-semibold tabular-nums">{stage.durationMinutes} Minutes</span>
                          </div>
                          <div className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded-lg">
                            <span className="text-slate-400 block">Negative Marking</span>
                            <span className="font-semibold text-rose-600 dark:text-rose-400">{stage.negativeMarking}</span>
                          </div>
                        </div>

                        {/* Subjects & Topics Breakdown */}
                        <div className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
                          <table className="w-full text-left text-xs border-collapse">
                            <thead>
                              <tr className="bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 border-b border-slate-200 dark:border-slate-700">
                                <th className="p-3 font-semibold">Subject / Section</th>
                                <th className="p-3 font-semibold tabular-nums">Questions</th>
                                <th className="p-3 font-semibold tabular-nums">Marks</th>
                                <th className="p-3 font-semibold">Key Topics</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                              {stage.subjects.map((sub, sidx) => (
                                <tr key={sidx} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                                  <td className="p-3 font-semibold text-slate-900 dark:text-white">{sub.name}</td>
                                  <td className="p-3 tabular-nums">{sub.questions || 'N/A'}</td>
                                  <td className="p-3 tabular-nums font-semibold">{sub.marks}</td>
                                  <td className="p-3 text-slate-600 dark:text-slate-400">
                                    {sub.topics.join(' · ')}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </>
                    );
                  })()}
                </div>
              )}

              {/* Recommended Books */}
              {exam.syllabusSummary.recommendedBooks.length > 0 && (
                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800">
                  <div className="flex items-center gap-2 mb-2 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    <BookOpen className="w-4 h-4 text-orange-600" />
                    <span>Recommended Standard Reference Books</span>
                  </div>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700 dark:text-slate-300">
                    {exam.syllabusSummary.recommendedBooks.map((bk, bki) => (
                      <li key={bki} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-500 shrink-0" />
                        <span>{bk}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: FEE & SELECTION PROCESS */}
          {activeTab === 'pattern' && (
            <div className="space-y-6">
              {/* Fee Matrix */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
                  Application Fee Matrix
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-800">
                    <span className="text-slate-400 block mb-1">General / UR</span>
                    <span className="font-bold text-sm text-slate-900 dark:text-white">{exam.fees.general}</span>
                  </div>
                  <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-800">
                    <span className="text-slate-400 block mb-1">OBC (NCL)</span>
                    <span className="font-bold text-sm text-slate-900 dark:text-white">{exam.fees.obc || exam.fees.general}</span>
                  </div>
                  <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-800">
                    <span className="text-slate-400 block mb-1">SC / ST / PwBD</span>
                    <span className="font-bold text-sm text-slate-900 dark:text-white">{exam.fees.sc_st_pwd}</span>
                  </div>
                  <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-800">
                    <span className="text-slate-400 block mb-1">Female Candidates</span>
                    <span className="font-bold text-sm text-slate-900 dark:text-white">{exam.fees.female}</span>
                  </div>
                </div>
                <p className="text-[11px] text-slate-500 mt-2">
                  Accepted Payment Modes: {exam.fees.paymentMode}
                </p>
              </div>

              {/* Selection Process Stages */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
                  Selection Stages & Recruitment Flow
                </h3>
                <div className="space-y-2.5">
                  {exam.selectionProcess.map((proc, pidx) => (
                    <div
                      key={pidx}
                      className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center gap-3 bg-white dark:bg-slate-900"
                    >
                      <div className="w-6 h-6 rounded-full bg-orange-100 dark:bg-orange-950 text-orange-700 dark:text-orange-300 flex items-center justify-center font-bold text-xs shrink-0">
                        {pidx + 1}
                      </div>
                      <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">{proc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: ADMIT CARD & RESULTS */}
          {activeTab === 'admit_result' && (
            <div className="space-y-6">
              {/* Admit Card Status Box */}
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">Hall Ticket / Admit Card</h4>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded capitalize ${
                    exam.admitCard.status === 'released' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300' :
                    exam.admitCard.status === 'announced' ? 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300' :
                    'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                  }`}>
                    {exam.admitCard.status.replace('_', ' ')}
                  </span>
                </div>
                {exam.admitCard.releaseDate && (
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
                    Released on: <span className="font-semibold text-slate-800 dark:text-slate-200">{exam.admitCard.releaseDate}</span>
                  </p>
                )}
                {exam.admitCard.expectedDate && (
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
                    Expected release date: <span className="font-semibold text-slate-800 dark:text-slate-200">{exam.admitCard.expectedDate}</span>
                  </p>
                )}

                <div className="mb-4">
                  <h5 className="text-[11px] font-bold uppercase text-slate-400 mb-1.5">Download Instructions</h5>
                  <ul className="space-y-1 text-xs text-slate-600 dark:text-slate-400">
                    {exam.admitCard.instructions.map((ins, inx) => (
                      <li key={inx} className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{ins}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <a
                  href={exam.admitCard.downloadUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold transition-colors"
                >
                  <span>Open Official Hall Ticket Portal</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Results & Cut-Offs Status */}
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">Results & Cutoff Marks</h4>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded capitalize ${
                    exam.results.status === 'declared' || exam.results.status === 'merit_list_out'
                      ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                      : 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300'
                  }`}>
                    {exam.results.status.replace('_', ' ')}
                  </span>
                </div>
                {exam.results.announcedDate && (
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">
                    Announcement date: <span className="font-semibold text-slate-800 dark:text-slate-200">{exam.results.announcedDate}</span>
                  </p>
                )}
                {exam.results.cutOffSummary && (
                  <p className="text-xs text-slate-600 dark:text-slate-300 mb-4 bg-slate-50 dark:bg-slate-800/50 p-2.5 rounded-lg border border-slate-200/60 dark:border-slate-800">
                    {exam.results.cutOffSummary}
                  </p>
                )}

                <a
                  href={exam.results.resultsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg text-xs font-semibold transition-colors"
                >
                  <span>Official Scorecard & Merit List</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Modal Bottom Footer Actions */}
        <div className="p-4 sm:p-5 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 shrink-0 flex flex-wrap items-center justify-between gap-3">
          <div className="text-[11px] text-slate-500 dark:text-slate-400">
            Official Source: <span className="font-medium text-slate-700 dark:text-slate-300">{exam.conductingBody}</span>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={exam.officialNotificationPdfUrl}
              target="_blank"
              rel="noreferrer"
              className="px-3.5 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors inline-flex items-center gap-1.5"
            >
              <FileText className="w-3.5 h-3.5 text-orange-600" />
              <span>Official PDF Notice</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </a>

            <a
              href={exam.officialWebsiteUrl}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 text-xs font-semibold text-white bg-orange-600 hover:bg-orange-700 rounded-lg transition-colors shadow-sm inline-flex items-center gap-1.5"
            >
              <span>Apply on Official Website</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
