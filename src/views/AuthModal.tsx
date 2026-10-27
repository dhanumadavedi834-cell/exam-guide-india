import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useExam } from '../context/ExamContext';
import { STATES_LIST } from '../data/mockExams';
import { QualificationLevel } from '../types/exam';
import {
  X,
  User,
  GraduationCap,
  ShieldCheck,
  Zap,
  CheckCircle2,
  Lock,
  ArrowRight,
  Info,
} from 'lucide-react';

interface AuthModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ onClose, onSuccess }) => {
  const { loginAsStudent, registerStudent, loadPresetStudent } = useAuth();
  const { addToast } = useExam();

  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');

  // Login form state
  const [loginEmail, setLoginEmail] = useState('');

  // Register form state
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regTarget, setRegTarget] = useState('Civil Services & Administrative');
  const [regQual, setRegQual] = useState<QualificationLevel>('graduate');
  const [regState, setRegState] = useState('All India / Central');

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail.trim() || !loginEmail.includes('@')) {
      addToast('Please enter a valid email address.', 'error');
      return;
    }
    loginAsStudent(loginEmail);
    addToast('Signed in to student workspace.', 'success');
    onSuccess();
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regName.trim() || !regEmail.trim() || !regEmail.includes('@')) {
      addToast('Please enter your name and a valid email.', 'error');
      return;
    }
    registerStudent({
      name: regName.trim(),
      email: regEmail.trim().toLowerCase(),
      targetCategory: regTarget,
      qualificationLevel: regQual,
      homeState: regState,
      receiveEmailAlerts: true,
    });
    addToast('Aspirant profile created successfully.', 'success');
    onSuccess();
  };

  const handlePresetSelect = (preset: 'civil_services' | 'engineering' | 'banking') => {
    loadPresetStudent(preset);
    addToast(`Loaded aspirant profile: ${preset.replace('_', ' ').toUpperCase()}`, 'success');
    onSuccess();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/65 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-lg w-full shadow-2xl overflow-hidden relative">
        {/* Header */}
        <div className="bg-slate-900 text-white p-6 border-b border-slate-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-orange-600 flex items-center justify-center text-white">
                <GraduationCap className="w-4 h-4" />
              </div>
              <h2 className="text-lg font-bold text-white tracking-tight">
                Student Workspace · Aspirant Profile
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1 text-slate-400 hover:text-white rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <p className="text-xs text-slate-400 mt-2">
            Save bookmarks, personalize exam deadlines, and organize your syllabus notes locally.
          </p>

          {/* Tabs */}
          <div className="flex items-center gap-2 mt-5 border-b border-slate-800 -mb-6">
            <button
              onClick={() => setActiveTab('login')}
              className={`pb-2.5 px-3 text-xs font-semibold border-b-2 transition-colors ${
                activeTab === 'login'
                  ? 'border-orange-500 text-orange-400'
                  : 'border-transparent text-slate-400 hover:text-white'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setActiveTab('register')}
              className={`pb-2.5 px-3 text-xs font-semibold border-b-2 transition-colors ${
                activeTab === 'register'
                  ? 'border-orange-500 text-orange-400'
                  : 'border-transparent text-slate-400 hover:text-white'
              }`}
            >
              Create Aspirant Profile
            </button>
          </div>
        </div>

        {/* Client-Side Storage Information */}
        <div className="p-4 bg-orange-50 dark:bg-orange-950/20 border-b border-orange-200/60 dark:border-orange-900/40 text-xs text-orange-900 dark:text-orange-200 flex items-start gap-2.5">
          <ShieldCheck className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
          <div className="leading-relaxed text-[11px]">
            <strong>Client-Side Workspace:</strong> To ensure your privacy, ExamGuide India does not collect or transmit passwords.
            Your saved bookmarks, category preferences, and deadlines are preserved directly in your browser's private local storage.
          </div>
        </div>

        <div className="p-6 space-y-5">
          {/* Quick Aspirant Profiles */}
          <div>
            <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
              <Zap className="w-3.5 h-3.5 text-orange-500" />
              <span>Quick Aspirant Profiles (Presets)</span>
            </div>
            <div className="grid grid-cols-3 gap-2 text-xs">
              <button
                type="button"
                onClick={() => handlePresetSelect('civil_services')}
                className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-orange-500 text-left bg-slate-50 dark:bg-slate-800/60 transition-all hover:bg-orange-50/30 group"
              >
                <span className="font-bold text-slate-900 dark:text-white block group-hover:text-orange-600">
                  UPSC Aspirant
                </span>
                <span className="text-[10px] text-slate-500 line-clamp-1">Aarav (Graduate)</span>
              </button>

              <button
                type="button"
                onClick={() => handlePresetSelect('engineering')}
                className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-orange-500 text-left bg-slate-50 dark:bg-slate-800/60 transition-all hover:bg-orange-50/30 group"
              >
                <span className="font-bold text-slate-900 dark:text-white block group-hover:text-orange-600">
                  Engineering
                </span>
                <span className="text-[10px] text-slate-500 line-clamp-1">Priya (JEE/GATE)</span>
              </button>

              <button
                type="button"
                onClick={() => handlePresetSelect('banking')}
                className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-orange-500 text-left bg-slate-50 dark:bg-slate-800/60 transition-all hover:bg-orange-50/30 group"
              >
                <span className="font-bold text-slate-900 dark:text-white block group-hover:text-orange-600">
                  Banking &amp; SSC
                </span>
                <span className="text-[10px] text-slate-500 line-clamp-1">Rohan (IBPS/SBI)</span>
              </button>
            </div>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="border-t border-slate-200 dark:border-slate-800 w-full" />
            <span className="bg-white dark:bg-slate-900 px-3 text-[11px] text-slate-400 font-medium uppercase absolute">
              or enter your details
            </span>
          </div>

          {/* TAB 1: LOGIN */}
          {activeTab === 'login' && (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Your Registered Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="aspirant@example.in"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <p className="text-[10px] text-slate-400 mt-1">
                  Enter your email to load your locally saved bookmarks and preferences.
                </p>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-orange-600 hover:bg-orange-700 text-white rounded-xl text-xs font-bold transition-colors shadow-md shadow-orange-600/20"
              >
                Access Student Workspace
              </button>
            </form>
          )}

          {/* TAB 2: REGISTER */}
          {activeTab === 'register' && (
            <form onSubmit={handleRegisterSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-slate-700 dark:text-slate-300 mb-1 font-semibold">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Ananya Sharma"
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-1 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 mb-1 font-semibold">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="ananya@example.in"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-1 focus:ring-orange-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 mb-1 font-semibold">
                    Current Qualification
                  </label>
                  <select
                    value={regQual}
                    onChange={(e) => setRegQual(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-1 focus:ring-orange-500"
                  >
                    <option value="10th">10th Pass</option>
                    <option value="12th">12th Pass</option>
                    <option value="graduate">Graduate (Any Stream)</option>
                    <option value="engineering">B.E. / B.Tech</option>
                    <option value="medical">Medical (MBBS)</option>
                    <option value="post-graduate">Post Graduate</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 dark:text-slate-300 mb-1 font-semibold">
                    Home State
                  </label>
                  <select
                    value={regState}
                    onChange={(e) => setRegState(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-1 focus:ring-orange-500"
                  >
                    {STATES_LIST.map((st) => (
                      <option key={st} value={st}>
                        {st}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 mb-1 font-semibold">
                  Primary Target Focus
                </label>
                <input
                  type="text"
                  placeholder="e.g., UPSC Civil Services, Banking PO, State PSC"
                  value={regTarget}
                  onChange={(e) => setRegTarget(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-1 focus:ring-orange-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-orange-600 hover:bg-orange-700 text-white rounded-xl text-xs font-bold transition-colors shadow-md shadow-orange-600/20 mt-2"
              >
                Create Aspirant Profile
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
