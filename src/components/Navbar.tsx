import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useExam } from '../context/ExamContext';
import {
  GraduationCap,
  Sun,
  Moon,
  Bookmark,
  Menu,
  X,
  User,
  Search,
  ShieldCheck,
  HelpCircle,
  Mail,
  FileText,
} from 'lucide-react';

interface NavbarProps {
  currentView: string;
  onNavigate: (view: string) => void;
  onOpenAuth: () => void;
  onOpenAdmin?: () => void;
  onOpenDeploymentGuide?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  onOpenAuth,
}) => {
  const { user, isLoggedIn } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const { filters, setFilters } = useExam();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'exams', label: 'Latest Exams' },
    { id: 'gov-jobs', label: 'Government Jobs' },
    { id: 'entrance', label: 'Entrance Exams' },
    { id: 'university', label: 'University Exams' },
    { id: 'syllabus', label: 'Syllabus' },
    { id: 'admit-cards', label: 'Admit Cards' },
    { id: 'results', label: 'Results' },
    { id: 'saved', label: 'Saved Exams' },
  ];

  const handleNavClick = (viewId: string) => {
    onNavigate(viewId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur border-b border-slate-200 dark:border-slate-800 transition-colors">
      {/* Top utility advisory announcement bar */}
      <div className="bg-slate-900 dark:bg-slate-950 text-slate-300 text-[11px] py-1 px-3 sm:px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-4">
          <div className="flex items-center gap-2 overflow-hidden truncate">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-orange-500 shrink-0"></span>
            <span className="font-semibold text-orange-400 uppercase tracking-wider text-[10px] shrink-0">Official Source Advisory</span>
            <span className="text-slate-500 hidden sm:inline">·</span>
            <span className="truncate text-slate-400 text-[10px] sm:text-[11px]">
              Independent student information portal. Candidates must verify all details on official conducting authority portals.
            </span>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 shrink-0 text-[10px] sm:text-xs text-slate-400">
            <button
              onClick={() => handleNavClick('about')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              About
            </button>
            <span>·</span>
            <button
              onClick={() => handleNavClick('contact')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Contact
            </button>
            <span>·</span>
            <button
              onClick={() => handleNavClick('disclaimer')}
              className="text-orange-400 hover:text-orange-300 transition-colors cursor-pointer font-medium"
            >
              Disclaimer
            </button>
          </div>
        </div>
      </div>

      {/* Main Top Bar (Three-Zone Contract) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 lg:gap-6 h-16">
          {/* Zone 1: Single text element wordmark with Graduation Cap icon */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2 text-left shrink-0 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 rounded-lg p-1"
          >
            <div className="w-8 h-8 rounded-lg bg-orange-600 flex items-center justify-center text-white shadow-sm shadow-orange-600/20 group-hover:bg-orange-700 transition-colors">
              <GraduationCap className="w-4 h-4" />
            </div>
            <div className="flex flex-col">
              <span className="text-base font-bold tracking-tight text-slate-900 dark:text-white leading-none">
                ExamGuide <span className="text-orange-600">India</span>
              </span>
              <span className="text-[9px] text-slate-500 dark:text-slate-400 font-medium tracking-wide">
                Govt &amp; Entrance Information
              </span>
            </div>
          </button>

          {/* Zone 2: Clean single-line text navigation links */}
          <nav className="hidden xl:flex items-center gap-3.5 2xl:gap-5 text-xs font-semibold tracking-normal text-slate-600 dark:text-slate-300">
            {navItems.map((item) => {
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative py-1 whitespace-nowrap shrink-0 transition-colors hover:text-orange-600 dark:hover:text-orange-400 ${
                    isActive
                      ? 'text-orange-600 dark:text-orange-500 font-bold'
                      : 'text-slate-700 dark:text-slate-300'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-600 dark:bg-orange-500 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: 1 primary action + Utilities */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Quick search input shortcut */}
            <div className="hidden lg:flex items-center relative">
              <input
                type="text"
                placeholder="Search exams..."
                value={filters.searchQuery}
                onChange={(e) => {
                  setFilters((prev) => ({ ...prev, searchQuery: e.target.value }));
                  if (currentView !== 'exams' && currentView !== 'gov-jobs' && currentView !== 'entrance') {
                    onNavigate('exams');
                  }
                }}
                className="w-36 xl:w-44 pl-7 pr-2.5 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 transition-all"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2 pointer-events-none" />
            </div>

            {/* Dark / Light Mode Switcher */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle dark mode"
              className="p-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Saved Exams shortcut */}
            <button
              onClick={() => handleNavClick('saved')}
              aria-label="View saved bookmarks"
              className={`p-2 rounded-lg transition-colors ${
                currentView === 'saved'
                  ? 'bg-orange-50 text-orange-600 dark:bg-orange-950/40 dark:text-orange-400'
                  : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
              title="Saved Exams"
            >
              <Bookmark className="w-4 h-4" />
            </button>

            {/* Primary Action: Student Workspace / Profile */}
            {isLoggedIn ? (
              <button
                onClick={() => handleNavClick('dashboard')}
                className="flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 dark:bg-orange-600 dark:hover:bg-orange-700 rounded-lg shadow-sm transition-all whitespace-nowrap shrink-0"
                title={`Student Profile: ${user?.name}`}
              >
                <User className="w-3.5 h-3.5" />
                <span className="hidden sm:inline truncate max-w-[90px]">{user?.name}</span>
              </button>
            ) : (
              <button
                onClick={onOpenAuth}
                className="flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1.5 text-xs font-semibold text-white bg-orange-600 hover:bg-orange-700 rounded-lg shadow-sm shadow-orange-600/20 transition-all whitespace-nowrap shrink-0"
              >
                <span>Student Workspace</span>
              </button>
            )}

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 text-slate-600 dark:text-slate-300 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Open mobile navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 pt-3 pb-6 shadow-xl animate-in fade-in slide-in-from-top-2">
          {/* Mobile search bar */}
          <div className="relative mb-3">
            <input
              type="text"
              placeholder="Search exams, UPSC, JEE, SSC..."
              value={filters.searchQuery}
              onChange={(e) => {
                setFilters((prev) => ({ ...prev, searchQuery: e.target.value }));
                if (currentView !== 'exams') onNavigate('exams');
              }}
              className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder:text-slate-400"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          </div>

          <div className="grid grid-cols-2 gap-1 text-sm font-medium mb-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-left px-3 py-2 rounded-lg transition-colors ${
                  currentView === item.id
                    ? 'bg-orange-50 text-orange-700 dark:bg-orange-950/50 dark:text-orange-300 font-semibold'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-3">
              <button onClick={() => handleNavClick('about')} className="hover:text-slate-900 dark:hover:text-white">
                About Us
              </button>
              <span>·</span>
              <button onClick={() => handleNavClick('contact')} className="hover:text-slate-900 dark:hover:text-white">
                Contact Us
              </button>
              <span>·</span>
              <button onClick={() => handleNavClick('disclaimer')} className="text-orange-600 dark:text-orange-400 font-medium">
                Disclaimer
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
