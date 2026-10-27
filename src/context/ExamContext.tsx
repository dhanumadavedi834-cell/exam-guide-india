import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { ExamRecord, FilterOptions, ApplicationStatus } from '../types/exam';
import { INITIAL_EXAMS_DATA } from '../data/mockExams';

const EXAMS_STORAGE_KEY = 'examguide_exams_data';

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'error';
  message: string;
}

interface ExamContextType {
  exams: ExamRecord[];
  filters: FilterOptions;
  setFilters: React.Dispatch<React.SetStateAction<FilterOptions>>;
  resetFilters: () => void;
  filteredExams: ExamRecord[];
  selectedExam: ExamRecord | null;
  setSelectedExam: (exam: ExamRecord | null) => void;
  addExam: (newExam: Omit<ExamRecord, 'id'>) => boolean;
  updateExam: (id: string, updatedExam: Partial<ExamRecord>) => boolean;
  deleteExam: (id: string) => boolean;
  resetToDefaultData: () => void;
  toasts: ToastMessage[];
  addToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  removeToast: (id: string) => void;
  getExamById: (id: string) => ExamRecord | undefined;
  getUpcomingDeadlines: () => ExamRecord[];
  getAdmitCardsReleased: () => ExamRecord[];
  getAnnouncedResults: () => ExamRecord[];
}

const DEFAULT_FILTERS: FilterOptions = {
  searchQuery: '',
  category: 'all',
  state: 'all',
  qualification: 'all',
  status: 'all',
  sortBy: 'closing_soon',
};

const ExamContext = createContext<ExamContextType | undefined>(undefined);

export const ExamProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [exams, setExams] = useState<ExamRecord[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem(EXAMS_STORAGE_KEY);
        if (stored) return JSON.parse(stored);
      } catch (e) {
        console.error('Failed to parse exams from localStorage', e);
      }
    }
    return INITIAL_EXAMS_DATA;
  });

  const [filters, setFilters] = useState<FilterOptions>(DEFAULT_FILTERS);
  const [selectedExam, setSelectedExam] = useState<ExamRecord | null>(null);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Sync with localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(EXAMS_STORAGE_KEY, JSON.stringify(exams));
    }
  }, [exams]);

  const addToast = (message: string, type: 'success' | 'info' | 'error' = 'info') => {
    const id = 'toast_' + Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const resetFilters = () => {
    setFilters(DEFAULT_FILTERS);
  };

  const getExamById = (id: string) => {
    return exams.find((e) => e.id === id);
  };

  // Helper to compute status for an exam
  const computeStatus = (exam: ExamRecord): ApplicationStatus => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const start = new Date(exam.applicationStartDate);
    const end = new Date(exam.applicationEndDate);

    if (isNaN(end.getTime())) return 'open';

    if (today < start) return 'upcoming';
    if (today > end) return 'closed';

    const diffDays = Math.ceil((end.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    if (diffDays <= 7) return 'closing_soon';
    return 'open';
  };

  // Filtered & sorted exams list
  const filteredExams = useMemo(() => {
    return exams.filter((exam) => {
      // Search query
      if (filters.searchQuery.trim()) {
        const query = filters.searchQuery.toLowerCase().trim();
        const matchesName = exam.name.toLowerCase().includes(query);
        const matchesShort = exam.shortName.toLowerCase().includes(query);
        const matchesBody = exam.conductingBody.toLowerCase().includes(query) || exam.conductingBodyShort.toLowerCase().includes(query);
        const matchesSubCat = exam.subCategory.toLowerCase().includes(query);
        const matchesQual = exam.qualification.toLowerCase().includes(query);
        const matchesState = exam.state.toLowerCase().includes(query);
        if (!matchesName && !matchesShort && !matchesBody && !matchesSubCat && !matchesQual && !matchesState) {
          return false;
        }
      }

      // Category filter
      if (filters.category !== 'all' && exam.category !== filters.category) {
        return false;
      }

      // State filter
      if (filters.state !== 'all') {
        if (filters.state === 'All India / Central') {
          if (exam.state !== 'All India / Central') return false;
        } else if (exam.state !== filters.state && exam.state !== 'All India / Central') {
          return false;
        }
      }

      // Qualification filter
      if (filters.qualification !== 'all') {
        if (exam.qualificationLevel !== filters.qualification) {
          return false;
        }
      }

      // Application status filter
      if (filters.status !== 'all') {
        const currentStatus = computeStatus(exam);
        if (filters.status === 'open' && (currentStatus !== 'open' && currentStatus !== 'closing_soon')) {
          return false;
        }
        if (filters.status === 'closing_soon' && currentStatus !== 'closing_soon') {
          return false;
        }
        if (filters.status === 'upcoming' && currentStatus !== 'upcoming') {
          return false;
        }
        if (filters.status === 'closed' && currentStatus !== 'closed') {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'closing_soon') {
        const endA = new Date(a.applicationEndDate).getTime();
        const endB = new Date(b.applicationEndDate).getTime();
        return endA - endB;
      }
      if (filters.sortBy === 'recently_updated') {
        const verA = new Date(a.lastVerifiedDate).getTime();
        const verB = new Date(b.lastVerifiedDate).getTime();
        return verB - verA;
      }
      if (filters.sortBy === 'exam_date') {
        const dateA = new Date(a.examDate).getTime() || 9999999999999;
        const dateB = new Date(b.examDate).getTime() || 9999999999999;
        return dateA - dateB;
      }
      if (filters.sortBy === 'name') {
        return a.name.localeCompare(b.name);
      }
      return 0;
    });
  }, [exams, filters]);

  // Derived queries
  const getUpcomingDeadlines = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return [...exams]
      .filter((exam) => {
        const end = new Date(exam.applicationEndDate);
        return !isNaN(end.getTime()) && end >= today;
      })
      .sort((a, b) => new Date(a.applicationEndDate).getTime() - new Date(b.applicationEndDate).getTime())
      .slice(0, 6);
  };

  const getAdmitCardsReleased = () => {
    return exams.filter((e) => e.admitCard.status === 'released' || e.admitCard.status === 'announced');
  };

  const getAnnouncedResults = () => {
    return exams.filter((e) => e.results.status === 'declared' || e.results.status === 'prelims_out' || e.results.status === 'merit_list_out');
  };

  const addExam = (newExamData: Omit<ExamRecord, 'id'>) => {
    const id = newExamData.shortName.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Date.now();
    const created: ExamRecord = {
      ...newExamData,
      id,
      verificationSource: newExamData.verificationSource || 'Local Editorial Entry',
    };
    setExams((prev) => [created, ...prev]);
    addToast(`Exam "${created.shortName}" created successfully in local storage.`, 'success');
    return true;
  };

  const updateExam = (id: string, updatedFields: Partial<ExamRecord>) => {
    setExams((prev) =>
      prev.map((exam) => (exam.id === id ? { ...exam, ...updatedFields } : exam))
    );
    addToast('Exam record updated successfully.', 'success');
    return true;
  };

  const deleteExam = (id: string) => {
    setExams((prev) => prev.filter((exam) => exam.id !== id));
    addToast('Exam record deleted from local storage.', 'info');
    return true;
  };

  const resetToDefaultData = () => {
    setExams(INITIAL_EXAMS_DATA);
    localStorage.removeItem(EXAMS_STORAGE_KEY);
    addToast('Sample exam dataset restored to defaults.', 'info');
  };

  return (
    <ExamContext.Provider
      value={{
        exams,
        filters,
        setFilters,
        resetFilters,
        filteredExams,
        selectedExam,
        setSelectedExam,
        addExam,
        updateExam,
        deleteExam,
        resetToDefaultData,
        toasts,
        addToast,
        removeToast,
        getExamById,
        getUpcomingDeadlines,
        getAdmitCardsReleased,
        getAnnouncedResults,
      }}
    >
      {children}
    </ExamContext.Provider>
  );
};

export const useExam = () => {
  const context = useContext(ExamContext);
  if (!context) throw new Error('useExam must be used within ExamProvider');
  return context;
};
