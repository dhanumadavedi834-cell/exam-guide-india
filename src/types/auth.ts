import { QualificationLevel } from './exam';

export interface StudentProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  targetCategory: string;
  qualificationLevel: QualificationLevel;
  homeState: string;
  savedExamIds: string[];
  recentlyViewedIds: string[];
  joinedDate: string;
  receiveEmailAlerts: boolean;
}

export interface AuthContextType {
  user: StudentProfile | null;
  isLoggedIn: boolean;
  loginAsStudent: (email: string, name?: string) => void;
  loadPresetStudent: (role?: 'civil_services' | 'engineering' | 'banking') => void;
  registerStudent: (userData: Omit<StudentProfile, 'id' | 'savedExamIds' | 'recentlyViewedIds' | 'joinedDate'>) => void;
  updateProfile: (updates: Partial<StudentProfile>) => void;
  logout: () => void;
  toggleSaveExam: (examId: string) => void;
  recordExamView: (examId: string) => void;
  isExamSaved: (examId: string) => boolean;
}
