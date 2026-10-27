import React, { useState } from 'react';
import { useExam } from '../context/ExamContext';
import { ExamRecord, ExamCategory, QualificationLevel } from '../types/exam';
import { STATES_LIST } from '../data/mockExams';
import {
  ShieldAlert,
  Plus,
  Trash2,
  Edit2,
  RotateCcw,
  CheckCircle2,
  X,
  FileText,
  AlertTriangle,
} from 'lucide-react';

interface AdminViewProps {
  onClose: () => void;
  onSelectExam: (exam: ExamRecord) => void;
}

export const AdminView: React.FC<AdminViewProps> = ({ onClose, onSelectExam }) => {
  const { exams, addExam, updateExam, deleteExam, resetToDefaultData, addToast } = useExam();

  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    shortName: '',
    conductingBody: '',
    conductingBodyShort: '',
    category: 'government' as ExamCategory,
    subCategory: 'Administrative',
    state: 'All India / Central',
    notificationDate: '2026-03-01',
    applicationStartDate: '2026-03-01',
    applicationEndDate: '2026-03-31',
    examDate: '2026-06-15',
    isExamDateTentative: false,
    minAge: 21,
    maxAge: 30,
    ageRelaxation: 'OBC: +3 yrs, SC/ST: +5 yrs',
    qualification: 'Bachelor\'s Degree from recognized university',
    qualificationLevel: 'graduate' as QualificationLevel,
    vacancies: '500+ Posts',
    salaryOrStipend: 'Level 7 Pay Scale (₹44,900/mo)',
    feesGeneral: '₹100',
    feesScSt: 'Nil',
    feesFemale: 'Nil',
    syllabusOverview: 'Objective CBT screening followed by descriptive test.',
    stage1Name: 'Tier 1 Objective CBT',
    officialWebsiteUrl: 'https://upsc.gov.in',
    officialNotificationPdfUrl: 'https://upsc.gov.in',
  });

  const handleEditClick = (exam: ExamRecord) => {
    setEditingId(exam.id);
    setIsCreating(true);
    setFormData({
      name: exam.name,
      shortName: exam.shortName,
      conductingBody: exam.conductingBody,
      conductingBodyShort: exam.conductingBodyShort,
      category: exam.category,
      subCategory: exam.subCategory,
      state: exam.state,
      notificationDate: exam.notificationDate,
      applicationStartDate: exam.applicationStartDate,
      applicationEndDate: exam.applicationEndDate,
      examDate: exam.examDate,
      isExamDateTentative: exam.isExamDateTentative,
      minAge: exam.minAge,
      maxAge: exam.maxAge,
      ageRelaxation: exam.ageRelaxation,
      qualification: exam.qualification,
      qualificationLevel: exam.qualificationLevel,
      vacancies: exam.vacancies,
      salaryOrStipend: exam.salaryOrStipend,
      feesGeneral: exam.fees.general,
      feesScSt: exam.fees.sc_st_pwd,
      feesFemale: exam.fees.female,
      syllabusOverview: exam.syllabusSummary.overview,
      stage1Name: exam.syllabusSummary.stages[0]?.stageName || 'Preliminary Stage',
      officialWebsiteUrl: exam.officialWebsiteUrl,
      officialNotificationPdfUrl: exam.officialNotificationPdfUrl,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.conductingBody.trim()) {
      addToast('Please enter an exam title and conducting body.', 'error');
      return;
    }

    const payload = {
      name: formData.name.trim(),
      shortName: formData.shortName.trim() || formData.name.slice(0, 15),
      conductingBody: formData.conductingBody.trim(),
      conductingBodyShort: formData.conductingBodyShort.trim() || 'ORG',
      category: formData.category,
      subCategory: formData.subCategory,
      state: formData.state,
      notificationDate: formData.notificationDate,
      applicationStartDate: formData.applicationStartDate,
      applicationEndDate: formData.applicationEndDate,
      examDate: formData.examDate,
      isExamDateTentative: formData.isExamDateTentative,
      minAge: Number(formData.minAge) || 18,
      maxAge: Number(formData.maxAge) || 35,
      ageRelaxation: formData.ageRelaxation,
      qualification: formData.qualification,
      qualificationLevel: formData.qualificationLevel,
      vacancies: formData.vacancies,
      salaryOrStipend: formData.salaryOrStipend,
      fees: {
        general: formData.feesGeneral,
        sc_st_pwd: formData.feesScSt,
        female: formData.feesFemale,
        paymentMode: 'Online Payment Gateway',
      },
      selectionProcess: ['Written / CBT Examination', 'Document Verification & Final Merit'],
      syllabusSummary: {
        overview: formData.syllabusOverview,
        stages: [
          {
            stageName: formData.stage1Name,
            mode: 'Online (CBT)' as const,
            totalMarks: 200,
            durationMinutes: 120,
            negativeMarking: '0.25 marks penalty',
            subjects: [
              { name: 'General Awareness & Reasoning', marks: 100, questions: 50, topics: ['Static GK', 'Current Events', 'Analytical Ability'] },
              { name: 'Subject Core & Quantitative', marks: 100, questions: 50, topics: ['Mathematics', 'Core domain fundamentals'] },
            ],
          },
        ],
        recommendedBooks: ['Standard competitive study materials'],
      },
      admitCard: {
        status: 'upcoming' as const,
        downloadUrl: formData.officialWebsiteUrl,
        instructions: ['Download call letter with registration details.'],
      },
      results: {
        status: 'awaited' as const,
        resultsUrl: formData.officialWebsiteUrl,
      },
      officialWebsiteUrl: formData.officialWebsiteUrl,
      officialNotificationPdfUrl: formData.officialNotificationPdfUrl,
      lastVerifiedDate: new Date().toISOString().split('T')[0],
      verificationSource: 'Local Editorial Entry',
    };

    if (editingId) {
      updateExam(editingId, payload);
    } else {
      addExam(payload);
    }

    setIsCreating(false);
    setEditingId(null);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in">
      <div className="bg-white dark:bg-slate-900 w-full max-w-4xl rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="bg-slate-900 text-white p-5 shrink-0 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-orange-600 flex items-center justify-center text-white">
              <ShieldAlert className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <span>Local Content Management Console</span>
                <span className="text-[10px] bg-slate-700 text-slate-300 px-2 py-0.5 rounded font-mono">
                  EDITORIAL
                </span>
              </h2>
              <p className="text-[11px] text-slate-400">
                Create, update, and manage exam notifications locally in your browser storage.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Security architecture warning notice */}
        <div className="bg-amber-50 dark:bg-amber-950/30 border-b border-amber-200 dark:border-amber-900/50 p-3.5 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-2.5 shrink-0">
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <strong>Architecture Notice:</strong> In this client-side editorial console, publishing and editing
            actions update browser <code className="bg-amber-100 dark:bg-amber-900 px-1 py-0.2 rounded font-mono">localStorage</code>.
            No unverified third-party endpoints are called. In a multi-user production deployment, this console connects
            to authenticated API endpoints.
          </div>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-slate-800 dark:text-slate-200">
          {/* Action Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="text-xs font-semibold text-slate-500">
              Total Records in Storage: <strong className="text-slate-900 dark:text-white">{exams.length}</strong>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setEditingId(null);
                  setIsCreating(!isCreating);
                }}
                className="px-3.5 py-1.5 bg-orange-600 hover:bg-orange-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{isCreating ? 'Cancel' : 'Add New Exam'}</span>
              </button>

              <button
                onClick={resetToDefaultData}
                className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
                title="Reset local changes and restore original sample exams"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset to Defaults</span>
              </button>
            </div>
          </div>

          {/* CREATE / EDIT FORM */}
          {isCreating && (
            <form
              onSubmit={handleSubmit}
              className="bg-slate-50 dark:bg-slate-800/40 p-5 rounded-xl border border-slate-200 dark:border-slate-800 space-y-4"
            >
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                {editingId ? 'Edit Exam Record' : 'Create New Exam Opportunity'}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="sm:col-span-2">
                  <label className="block text-slate-500 mb-1 font-medium">Full Official Exam Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g., UPSC Combined Medical Services Examination 2026"
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-500 mb-1 font-medium">Short / Code Name</label>
                  <input
                    type="text"
                    value={formData.shortName}
                    onChange={(e) => setFormData({ ...formData, shortName: e.target.value })}
                    placeholder="e.g., UPSC CMS 2026"
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-500 mb-1 font-medium">Conducting Body Full Name</label>
                  <input
                    type="text"
                    required
                    value={formData.conductingBody}
                    onChange={(e) => setFormData({ ...formData, conductingBody: e.target.value })}
                    placeholder="e.g., Union Public Service Commission"
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-500 mb-1 font-medium">Conducting Body Abbreviation</label>
                  <input
                    type="text"
                    value={formData.conductingBodyShort}
                    onChange={(e) => setFormData({ ...formData, conductingBodyShort: e.target.value })}
                    placeholder="e.g., UPSC"
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-500 mb-1 font-medium">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                  >
                    <option value="government">Government Jobs</option>
                    <option value="entrance">Entrance Exams</option>
                    <option value="university">University Admissions</option>
                    <option value="scholarship">Scholarships & Aid</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-500 mb-1 font-medium">State / Central</label>
                  <select
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                  >
                    {STATES_LIST.map((st) => (
                      <option key={st} value={st}>
                        {st}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-500 mb-1 font-medium">Application End Date (Last Date) *</label>
                  <input
                    type="date"
                    required
                    value={formData.applicationEndDate}
                    onChange={(e) => setFormData({ ...formData, applicationEndDate: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-500 mb-1 font-medium">Exam Date</label>
                  <input
                    type="date"
                    value={formData.examDate}
                    onChange={(e) => setFormData({ ...formData, examDate: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-500 mb-1 font-medium">Educational Qualification</label>
                  <input
                    type="text"
                    value={formData.qualification}
                    onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                    placeholder="e.g., Graduate in any stream"
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-500 mb-1 font-medium">Vacancies</label>
                  <input
                    type="text"
                    value={formData.vacancies}
                    onChange={(e) => setFormData({ ...formData, vacancies: e.target.value })}
                    placeholder="e.g., 850 Posts"
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-500 mb-1 font-medium">Official Portal Link</label>
                  <input
                    type="url"
                    value={formData.officialWebsiteUrl}
                    onChange={(e) => setFormData({ ...formData, officialWebsiteUrl: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-200 dark:border-slate-700">
                <button
                  type="button"
                  onClick={() => {
                    setIsCreating(false);
                    setEditingId(null);
                  }}
                  className="px-3.5 py-2 text-xs font-medium text-slate-600 hover:text-slate-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg text-xs font-semibold shadow-sm"
                >
                  {editingId ? 'Update Record' : 'Save Record Locally'}
                </button>
              </div>
            </form>
          )}

          {/* Exam Records Table */}
          <div className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 border-b border-slate-200 dark:border-slate-700">
                <tr>
                  <th className="p-3 font-semibold">Exam Title</th>
                  <th className="p-3 font-semibold">Body</th>
                  <th className="p-3 font-semibold">Category</th>
                  <th className="p-3 font-semibold">Last Date</th>
                  <th className="p-3 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {exams.map((exam) => (
                  <tr key={exam.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                    <td className="p-3">
                      <div className="font-semibold text-slate-900 dark:text-white">{exam.shortName}</div>
                      <div className="text-[11px] text-slate-400 truncate max-w-xs">{exam.name}</div>
                    </td>
                    <td className="p-3 font-medium text-slate-700 dark:text-slate-300">
                      {exam.conductingBodyShort}
                    </td>
                    <td className="p-3 capitalize text-slate-600 dark:text-slate-400">
                      {exam.category}
                    </td>
                    <td className="p-3 tabular-nums font-medium text-slate-800 dark:text-slate-200">
                      {exam.applicationEndDate}
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleEditClick(exam)}
                          className="p-1 text-slate-500 hover:text-orange-600 transition-colors"
                          title="Edit"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm(`Delete "${exam.shortName}" from local records?`)) {
                              deleteExam(exam.id);
                            }
                          }}
                          className="p-1 text-slate-500 hover:text-rose-600 transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
