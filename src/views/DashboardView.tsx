import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useExam } from '../context/ExamContext';
import { ExamRecord } from '../types/exam';
import { ExamCard } from '../components/ExamCard';
import { STATES_LIST } from '../data/mockExams';
import {
  User,
  Bookmark,
  Clock,
  History,
  Settings,
  LogOut,
  AlertCircle,
  GraduationCap,
  MapPin,
  CheckCircle2,
  Bell,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

interface DashboardViewProps {
  onSelectExam: (exam: ExamRecord) => void;
  onNavigate: (view: string) => void;
  onOpenAuth: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  onSelectExam,
  onNavigate,
  onOpenAuth,
}) => {
  const { user, isLoggedIn, logout, updateProfile } = useAuth();
  const { exams, addToast } = useExam();

  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileName, setProfileName] = useState(user?.name || '');
  const [targetCategory, setTargetCategory] = useState(user?.targetCategory || '');
  const [homeState, setHomeState] = useState(user?.homeState || 'All India / Central');

  if (!isLoggedIn || !user) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 text-center space-y-4">
        <div className="w-14 h-14 rounded-2xl bg-orange-100 dark:bg-orange-950/50 text-orange-600 flex items-center justify-center mx-auto shadow-sm">
          <User className="w-7 h-7" />
        </div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          Aspirant Workspace & Study Planner
        </h2>
        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
          Sign in or create your student profile to track upcoming application deadlines, personalize your target exam focus,
          and save bookmarks locally on this device.
        </p>
        <button
          onClick={onOpenAuth}
          className="px-6 py-2.5 bg-orange-600 hover:bg-orange-700 text-white rounded-xl text-xs font-bold shadow-md shadow-orange-600/20 transition-colors"
        >
          Open Student Workspace
        </button>
      </div>
    );
  }

  // Retrieve saved exams
  const savedExams = exams.filter((e) => user.savedExamIds.includes(e.id));

  // Retrieve recently viewed exams
  const recentlyViewed = user.recentlyViewedIds
    .map((id) => exams.find((e) => e.id === id))
    .filter((e): e is ExamRecord => !!e);

  // Compute upcoming deadlines specifically for user's saved exams
  const savedDeadlines = savedExams
    .filter((e) => {
      const today = new Date();
      const end = new Date(e.applicationEndDate);
      return !isNaN(end.getTime()) && end >= today;
    })
    .sort((a, b) => new Date(a.applicationEndDate).getTime() - new Date(b.applicationEndDate).getTime());

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name: profileName,
      targetCategory,
      homeState,
    });
    setIsEditingProfile(false);
    addToast('Profile preferences updated in browser storage.', 'success');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Welcome Header */}
      <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div className="flex items-start sm:items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-orange-600 text-white flex items-center justify-center font-bold text-xl shrink-0 shadow-md">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <div className="flex items-center gap-2 text-xs text-orange-400 font-semibold mb-1">
              <span>Student Aspirant Portal</span>
              <span>·</span>
              <span className="bg-orange-500/20 px-2 py-0.5 rounded text-[10px]">
                Workspace Profile
              </span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-white">
              Welcome back, {user.name}
            </h1>
            <p className="text-xs text-slate-400 mt-1 flex flex-wrap items-center gap-3">
              <span>Goal: <strong>{user.targetCategory}</strong></span>
              <span>·</span>
              <span>State: <strong>{user.homeState}</strong></span>
              <span>·</span>
              <span>Joined: <strong>{user.joinedDate}</strong></span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setIsEditingProfile(!isEditingProfile)}
            className="px-3.5 py-2 text-xs font-semibold bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors flex items-center gap-1.5"
          >
            <Settings className="w-3.5 h-3.5" />
            <span>{isEditingProfile ? 'Cancel Edit' : 'Edit Preferences'}</span>
          </button>
          <button
            onClick={logout}
            className="px-3.5 py-2 text-xs font-semibold bg-rose-600/80 hover:bg-rose-600 text-white rounded-lg transition-colors flex items-center gap-1.5"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Edit Profile Form Modal / Inline Box */}
      {isEditingProfile && (
        <form
          onSubmit={handleSaveProfile}
          className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-sm space-y-4"
        >
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">
            Update Student Profile Preferences
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block text-slate-500 mb-1 font-medium">Display Name</label>
              <input
                type="text"
                value={profileName}
                onChange={(e) => setProfileName(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-1 focus:ring-orange-500"
                required
              />
            </div>
            <div>
              <label className="block text-slate-500 mb-1 font-medium">Target Exam Focus</label>
              <input
                type="text"
                value={targetCategory}
                onChange={(e) => setTargetCategory(e.target.value)}
                placeholder="e.g., UPSC CSE, SSC, JEE"
                className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-1 focus:ring-orange-500"
              />
            </div>
            <div>
              <label className="block text-slate-500 mb-1 font-medium">Home State Preference</label>
              <select
                value={homeState}
                onChange={(e) => setHomeState(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-1 focus:ring-orange-500"
              >
                {STATES_LIST.map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setIsEditingProfile(false)}
              className="px-3 py-1.5 text-xs text-slate-500 hover:text-slate-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 bg-orange-600 hover:bg-orange-700 text-white rounded-lg text-xs font-semibold"
            >
              Save Changes
            </button>
          </div>
        </form>
      )}

      {/* Privacy & Storage Notice Alert */}
      <div className="p-4 rounded-xl bg-orange-50 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-900/50 flex items-start gap-3 text-xs text-orange-900 dark:text-orange-200">
        <ShieldCheck className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong>Local Device Mode:</strong> Your saved exams, recent views, and study targets are kept
          locally in your browser's private storage. No passwords or private biometric details are stored or transmitted.
        </p>
      </div>

      {/* SECTION: UPCOMING DEADLINES FOR SAVED EXAMS */}
      {savedDeadlines.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Clock className="w-5 h-5 text-rose-600" />
              <span>Deadlines For Your Saved Exams</span>
            </h2>
            <span className="text-xs text-slate-400">{savedDeadlines.length} active deadlines</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {savedDeadlines.map((exam) => {
              const today = new Date();
              const end = new Date(exam.applicationEndDate);
              const daysLeft = Math.ceil((end.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
              return (
                <div
                  key={exam.id}
                  onClick={() => onSelectExam(exam)}
                  className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-orange-500 transition-all cursor-pointer flex items-center justify-between gap-3 group"
                >
                  <div className="min-w-0">
                    <span className="text-[10px] text-slate-400 block uppercase truncate">
                      {exam.conductingBodyShort}
                    </span>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate group-hover:text-orange-600">
                      {exam.shortName}
                    </h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Last Date: <strong>{exam.applicationEndDate}</strong>
                    </p>
                  </div>
                  <span className={`px-2 py-1 rounded text-[11px] font-bold tabular-nums shrink-0 ${
                    daysLeft <= 7
                      ? 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300'
                      : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                  }`}>
                    {daysLeft} days left
                  </span>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* SECTION: SAVED EXAMS / BOOKMARKS */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Bookmark className="w-5 h-5 text-orange-600" />
            <span>My Saved Exams &amp; Bookmarks ({savedExams.length})</span>
          </h2>
          <button
            onClick={() => onNavigate('exams')}
            className="text-xs font-semibold text-orange-600 dark:text-orange-400 hover:underline"
          >
            Explore More Exams
          </button>
        </div>

        {savedExams.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {savedExams.map((exam) => (
              <ExamCard key={exam.id} exam={exam} onSelect={onSelectExam} />
            ))}
          </div>
        ) : (
          <div className="p-8 text-center bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
            <Bookmark className="w-8 h-8 text-slate-300 mx-auto mb-2" />
            <p className="text-xs text-slate-500 mb-3">You haven't bookmarked any exams yet.</p>
            <button
              onClick={() => onNavigate('exams')}
              className="px-4 py-2 bg-slate-900 dark:bg-orange-600 text-white rounded-lg text-xs font-semibold"
            >
              Browse Latest Exams
            </button>
          </div>
        )}
      </section>

      {/* SECTION: RECENTLY VIEWED EXAMS */}
      {recentlyViewed.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <History className="w-5 h-5 text-slate-500" />
              <span>Recently Viewed Exams</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {recentlyViewed.map((exam) => (
              <div
                key={exam.id}
                onClick={() => onSelectExam(exam)}
                className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-orange-500/50 cursor-pointer transition-all group"
              >
                <span className="text-[10px] text-slate-400 block uppercase">
                  {exam.conductingBodyShort}
                </span>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate group-hover:text-orange-600">
                  {exam.shortName}
                </h4>
                <div className="mt-2 text-[11px] text-slate-500 flex items-center justify-between">
                  <span>Exam: {exam.examDate}</span>
                  <span className="text-orange-600 font-medium">View</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
