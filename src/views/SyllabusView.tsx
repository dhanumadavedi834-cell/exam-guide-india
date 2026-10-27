import React, { useState } from 'react';
import { useExam } from '../context/ExamContext';
import { ExamRecord } from '../types/exam';
import { BookOpen, Search, Layers, Clock, AlertCircle, ExternalLink, ChevronRight } from 'lucide-react';

interface SyllabusViewProps {
  onSelectExam: (exam: ExamRecord) => void;
}

export const SyllabusView: React.FC<SyllabusViewProps> = ({ onSelectExam }) => {
  const { exams } = useExam();
  const [selectedExamId, setSelectedExamId] = useState<string>(exams[0]?.id || 'upsc-cse-2026');
  const [topicSearch, setTopicSearch] = useState('');

  const currentExam = exams.find((e) => e.id === selectedExamId) || exams[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Title */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-5">
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white flex items-center gap-2.5">
          <BookOpen className="w-7 h-7 text-orange-600" />
          <span>Syllabus & Exam Pattern Directory</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Detailed subject mark distribution, examination stages, negative marking rules, and reference books
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Selectable Exam List */}
        <div className="lg:col-span-4 space-y-2">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 px-1 mb-2">
            Select Exam
          </div>

          <div className="space-y-1.5 max-h-[600px] overflow-y-auto pr-1">
            {exams.map((exam) => {
              const isSelected = exam.id === selectedExamId;
              return (
                <button
                  key={exam.id}
                  onClick={() => setSelectedExamId(exam.id)}
                  className={`w-full text-left p-3 rounded-xl border transition-all flex items-center justify-between gap-2 ${
                    isSelected
                      ? 'bg-orange-50 border-orange-500 text-orange-950 dark:bg-orange-950/40 dark:border-orange-500 dark:text-orange-200 shadow-sm'
                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 text-slate-800 dark:text-slate-200'
                  }`}
                >
                  <div className="min-w-0">
                    <span className="text-[10px] text-slate-400 block uppercase font-medium">
                      {exam.conductingBodyShort} · {exam.category}
                    </span>
                    <h3 className="text-xs font-bold truncate leading-tight mt-0.5">
                      {exam.shortName}
                    </h3>
                  </div>
                  <ChevronRight className={`w-4 h-4 shrink-0 transition-transform ${isSelected ? 'text-orange-600 rotate-90 sm:rotate-0' : 'text-slate-400'}`} />
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Active Exam Syllabus Breakdown */}
        {currentExam && (
          <div className="lg:col-span-8 space-y-6 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
              <div>
                <span className="text-xs text-orange-600 font-semibold">{currentExam.conductingBody}</span>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-0.5">
                  {currentExam.name}
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Examination Scheme &amp; Pattern · Verified: {currentExam.lastVerifiedDate}
                </p>
              </div>

              <button
                onClick={() => onSelectExam(currentExam)}
                className="px-3.5 py-1.5 bg-slate-900 dark:bg-orange-600 text-white rounded-lg text-xs font-semibold hover:bg-slate-800 transition-colors shrink-0"
              >
                Full Exam Details
              </button>
            </div>

            {/* Overview */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/70 dark:border-slate-800 text-xs leading-relaxed text-slate-700 dark:text-slate-300">
              <span className="font-bold text-slate-900 dark:text-white block mb-1">Overview:</span>
              {currentExam.syllabusSummary.overview}
            </div>

            {/* Stages & Pattern Breakdown */}
            <div className="space-y-6">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Stage Breakdown & Marking Schemes
              </h3>

              {currentExam.syllabusSummary.stages.map((stage, sIdx) => (
                <div
                  key={sIdx}
                  className="rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden"
                >
                  <div className="p-4 bg-slate-100 dark:bg-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
                    <div>
                      <span className="text-[10px] text-orange-600 font-bold uppercase block">Stage {sIdx + 1}</span>
                      <h4 className="font-bold text-slate-900 dark:text-white text-sm">{stage.stageName}</h4>
                    </div>

                    <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
                      <span><strong>Mode:</strong> {stage.mode}</span>
                      <span>·</span>
                      <span><strong>Total:</strong> {stage.totalMarks} Marks</span>
                      <span>·</span>
                      <span><strong>Duration:</strong> {stage.durationMinutes}m</span>
                    </div>
                  </div>

                  <div className="p-4 bg-amber-50/50 dark:bg-amber-950/20 text-xs text-amber-900 dark:text-amber-200 border-b border-slate-200 dark:border-slate-800">
                    <strong>Negative Marking:</strong> {stage.negativeMarking}
                  </div>

                  {/* Subjects Table */}
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-50 dark:bg-slate-900 text-slate-500 border-b border-slate-200 dark:border-slate-800">
                        <tr>
                          <th className="p-3 font-semibold">Subject / Section</th>
                          <th className="p-3 font-semibold tabular-nums">Questions</th>
                          <th className="p-3 font-semibold tabular-nums">Marks</th>
                          <th className="p-3 font-semibold">Curriculum Topics</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                        {stage.subjects.map((sub, subIdx) => (
                          <tr key={subIdx} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                            <td className="p-3 font-semibold text-slate-900 dark:text-white">{sub.name}</td>
                            <td className="p-3 tabular-nums">{sub.questions || '—'}</td>
                            <td className="p-3 tabular-nums font-semibold">{sub.marks}</td>
                            <td className="p-3 text-slate-600 dark:text-slate-300">
                              {sub.topics.join(' · ')}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>

            {/* Standard Reference Books */}
            {currentExam.syllabusSummary.recommendedBooks.length > 0 && (
              <div className="pt-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                  Recommended Study Books
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {currentExam.syllabusSummary.recommendedBooks.map((bk, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 text-slate-800 dark:text-slate-200 flex items-center gap-2"
                    >
                      <BookOpen className="w-3.5 h-3.5 text-orange-600 shrink-0" />
                      <span className="truncate">{bk}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
