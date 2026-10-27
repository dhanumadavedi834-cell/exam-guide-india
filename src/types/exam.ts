export type ExamCategory = 'government' | 'entrance' | 'university' | 'scholarship';

export type QualificationLevel = '10th' | '12th' | 'graduate' | 'post-graduate' | 'engineering' | 'medical' | 'law';

export type ApplicationStatus = 'open' | 'closing_soon' | 'upcoming' | 'closed';

export interface ExamFeeStructure {
  general: string;
  obc?: string;
  sc_st_pwd: string;
  female: string;
  paymentMode: string;
}

export interface ExamStageSyllabus {
  stageName: string;
  mode: 'Online (CBT)' | 'Offline (OMR/Pen-Paper)' | 'Interview / Viva' | 'Skill Test';
  totalMarks: number;
  durationMinutes: number;
  negativeMarking: string;
  subjects: { name: string; marks: number; questions: number; topics: string[] }[];
}

export interface ExamRecord {
  id: string;
  name: string;
  shortName: string;
  conductingBody: string;
  conductingBodyShort: string;
  category: ExamCategory;
  subCategory: string;
  state: string; // e.g., "All India / Central", "Uttar Pradesh", "Maharashtra"
  notificationDate: string; // YYYY-MM-DD
  applicationStartDate: string;
  applicationEndDate: string;
  examDate: string;
  isExamDateTentative: boolean;
  minAge: number;
  maxAge: number;
  ageRelaxation: string;
  qualification: string;
  qualificationLevel: QualificationLevel;
  vacancies: string;
  salaryOrStipend: string;
  fees: ExamFeeStructure;
  selectionProcess: string[];
  syllabusSummary: {
    overview: string;
    stages: ExamStageSyllabus[];
    recommendedBooks: string[];
  };
  admitCard: {
    status: 'announced' | 'released' | 'upcoming' | 'closed';
    expectedDate?: string;
    releaseDate?: string;
    downloadUrl: string;
    instructions: string[];
  };
  results: {
    status: 'declared' | 'prelims_out' | 'awaited' | 'merit_list_out';
    announcedDate?: string;
    resultsUrl: string;
    cutOffSummary?: string;
  };
  officialWebsiteUrl: string;
  officialNotificationPdfUrl: string;
  lastVerifiedDate: string;
  verificationSource: string; // e.g., "Official Gazette Notification No. 05/2026-CSP"
  isPopular?: boolean;
  isFeatured?: boolean;
}

export interface FilterOptions {
  searchQuery: string;
  category: ExamCategory | 'all';
  state: string;
  qualification: QualificationLevel | 'all';
  status: ApplicationStatus | 'all';
  sortBy: 'closing_soon' | 'recently_updated' | 'exam_date' | 'name';
}
