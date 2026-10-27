import React, { createContext, useContext, useEffect, useState } from 'react';
import { StudentProfile, AuthContextType } from '../types/auth';

const STORAGE_KEY = 'examguide_student_profile';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<StudentProfile | null>(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) return JSON.parse(stored);
      } catch (e) {
        console.error('Failed to parse student profile from localStorage', e);
      }
    }
    return null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [user]);

  const loginAsStudent = (email: string, name?: string) => {
    const defaultName = name || email.split('@')[0] || 'Candidate';
    const profile: StudentProfile = {
      id: 'student_' + Date.now(),
      name: defaultName,
      email: email.trim().toLowerCase(),
      targetCategory: 'Civil Services & Banking',
      qualificationLevel: 'graduate',
      homeState: 'All India / Central',
      savedExamIds: user?.savedExamIds || ['upsc-cse-2026', 'jee-main-2026'],
      recentlyViewedIds: user?.recentlyViewedIds || ['upsc-cse-2026'],
      joinedDate: new Date().toISOString().split('T')[0],
      receiveEmailAlerts: true,
    };
    setUser(profile);
  };

  const loadPresetStudent = (role: 'civil_services' | 'engineering' | 'banking' = 'civil_services') => {
    const presets = {
      civil_services: {
        name: 'Aarav Sharma',
        email: 'aarav.aspirant@example.in',
        targetCategory: 'Civil Services (UPSC & State PSCs)',
        qualificationLevel: 'graduate' as const,
        homeState: 'Uttar Pradesh',
        savedExamIds: ['upsc-cse-2026', 'uppsc-pcs-2026', 'ssc-cgl-2026'],
      },
      engineering: {
        name: 'Priya Patel',
        email: 'priya.tech@example.in',
        targetCategory: 'Engineering & PSU Research',
        qualificationLevel: 'engineering' as const,
        homeState: 'Gujarat',
        savedExamIds: ['jee-main-2026', 'gate-2027'],
      },
      banking: {
        name: 'Rohan Verma',
        email: 'rohan.banker@example.in',
        targetCategory: 'Banking & Financial Sector',
        qualificationLevel: 'graduate' as const,
        homeState: 'Maharashtra',
        savedExamIds: ['ibps-po-2026', 'sbi-clerk-2026', 'rrb-ntpc-2026'],
      },
    };

    const selected = presets[role];
    const profile: StudentProfile = {
      id: 'student_' + role + '_' + Date.now(),
      name: selected.name,
      email: selected.email,
      targetCategory: selected.targetCategory,
      qualificationLevel: selected.qualificationLevel,
      homeState: selected.homeState,
      savedExamIds: selected.savedExamIds,
      recentlyViewedIds: [selected.savedExamIds[0]],
      joinedDate: new Date().toISOString().split('T')[0],
      receiveEmailAlerts: true,
    };
    setUser(profile);
  };

  const registerStudent = (userData: Omit<StudentProfile, 'id' | 'savedExamIds' | 'recentlyViewedIds' | 'joinedDate'>) => {
    const profile: StudentProfile = {
      ...userData,
      id: 'student_' + Date.now(),
      savedExamIds: [],
      recentlyViewedIds: [],
      joinedDate: new Date().toISOString().split('T')[0],
    };
    setUser(profile);
  };

  const updateProfile = (updates: Partial<StudentProfile>) => {
    setUser((prev) => (prev ? { ...prev, ...updates } : null));
  };

  const logout = () => {
    setUser(null);
  };

  const toggleSaveExam = (examId: string) => {
    if (!user) {
      // Guest local storage bookmarks
      const guestKey = 'examguide_guest_saved';
      const stored = JSON.parse(localStorage.getItem(guestKey) || '[]');
      const exists = stored.includes(examId);
      const updated = exists ? stored.filter((id: string) => id !== examId) : [...stored, examId];
      localStorage.setItem(guestKey, JSON.stringify(updated));
      return;
    }

    setUser((prev) => {
      if (!prev) return null;
      const exists = prev.savedExamIds.includes(examId);
      const nextSaved = exists
        ? prev.savedExamIds.filter((id) => id !== examId)
        : [...prev.savedExamIds, examId];
      return { ...prev, savedExamIds: nextSaved };
    });
  };

  const recordExamView = (examId: string) => {
    if (!user) return;
    setUser((prev) => {
      if (!prev) return null;
      const filtered = prev.recentlyViewedIds.filter((id) => id !== examId);
      return {
        ...prev,
        recentlyViewedIds: [examId, ...filtered].slice(0, 8),
      };
    });
  };

  const isExamSaved = (examId: string): boolean => {
    if (user) {
      return user.savedExamIds.includes(examId);
    }
    if (typeof window !== 'undefined') {
      const stored: string[] = JSON.parse(localStorage.getItem('examguide_guest_saved') || '[]');
      return stored.includes(examId);
    }
    return false;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        loginAsStudent,
        loadPresetStudent,
        registerStudent,
        updateProfile,
        logout,
        toggleSaveExam,
        recordExamView,
        isExamSaved,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
