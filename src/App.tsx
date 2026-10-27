/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ExamProvider, useExam } from './context/ExamContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { NotificationTicker } from './components/NotificationTicker';
import { ToastContainer } from './components/Toast';
import { ExamDetailModal } from './components/ExamDetailModal';
import { HomeView } from './views/HomeView';
import { ExamsCatalogView } from './views/ExamsCatalogView';
import { SyllabusView } from './views/SyllabusView';
import { AdmitCardsView } from './views/AdmitCardsView';
import { ResultsView } from './views/ResultsView';
import { DashboardView } from './views/DashboardView';
import { AboutView } from './views/AboutView';
import { ContactView } from './views/ContactView';
import { PrivacyPolicyView } from './views/PrivacyPolicyView';
import { TermsView } from './views/TermsView';
import { DisclaimerView } from './views/DisclaimerView';
import { AdminView } from './views/AdminView';
import { AuthModal } from './views/AuthModal';
import { DeploymentGuideModal } from './views/DeploymentGuideModal';
import { ExamRecord } from './types/exam';

const VALID_VIEWS = [
  'home',
  'exams',
  'gov-jobs',
  'entrance',
  'university',
  'syllabus',
  'admit-cards',
  'results',
  'saved',
  'dashboard',
  'about',
  'contact',
  'privacy',
  'terms',
  'disclaimer',
];

function AppContent() {
  const [currentView, setCurrentView] = useState<string>('home');
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isDeploymentGuideOpen, setIsDeploymentGuideOpen] = useState(false);

  const { exams, selectedExam, setSelectedExam, setFilters } = useExam();
  const { user } = useAuth();

  // Handle URL hash changes for deep linking & SEO friendly browsing
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '').trim();
      if (hash && VALID_VIEWS.includes(hash)) {
        setCurrentView(hash);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (view: string) => {
    setCurrentView(view);
    window.location.hash = view;
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Apply view specific presets if needed
    if (view === 'gov-jobs') {
      setFilters((prev) => ({ ...prev, category: 'government' }));
    } else if (view === 'entrance') {
      setFilters((prev) => ({ ...prev, category: 'entrance' }));
    } else if (view === 'university') {
      setFilters((prev) => ({ ...prev, category: 'university' }));
    } else if (view === 'exams') {
      setFilters((prev) => ({ ...prev, category: 'all' }));
    }
  };

  const handleSelectExam = (exam: ExamRecord) => {
    setSelectedExam(exam);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      {/* Navigation Bar */}
      <Navbar
        currentView={currentView}
        onNavigate={handleNavigate}
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onOpenDeploymentGuide={() => setIsDeploymentGuideOpen(true)}
      />

      {/* Real-time Notification Ticker */}
      <NotificationTicker exams={exams} onSelectExam={handleSelectExam} />

      {/* Main Content Area */}
      <main className="flex-1">
        {currentView === 'home' && (
          <HomeView onSelectExam={handleSelectExam} onNavigate={handleNavigate} />
        )}

        {currentView === 'exams' && (
          <ExamsCatalogView onSelectExam={handleSelectExam} />
        )}

        {currentView === 'gov-jobs' && (
          <ExamsCatalogView
            onSelectExam={handleSelectExam}
            presetTitle="Government Recruitment Exams 2026 (Sarkari Naukri)"
            presetSubtitle="Civil Services (UPSC), Staff Selection (SSC), Banking (IBPS, SBI), Railways (RRB), and State PSCs"
          />
        )}

        {currentView === 'entrance' && (
          <ExamsCatalogView
            onSelectExam={handleSelectExam}
            presetTitle="National Entrance Examinations 2026"
            presetSubtitle="Engineering (JEE Main/Adv, GATE), Medical (NEET UG/PG), Management (CAT), and Law (CLAT)"
          />
        )}

        {currentView === 'university' && (
          <ExamsCatalogView
            onSelectExam={handleSelectExam}
            presetTitle="Central & State University Admissions 2026"
            presetSubtitle="CUET UG/PG, Delhi University, JNU, BHU, and state universities examination notifications"
          />
        )}

        {currentView === 'syllabus' && (
          <SyllabusView onSelectExam={handleSelectExam} />
        )}

        {currentView === 'admit-cards' && (
          <AdmitCardsView onSelectExam={handleSelectExam} />
        )}

        {currentView === 'results' && (
          <ResultsView onSelectExam={handleSelectExam} />
        )}

        {currentView === 'saved' && (
          <DashboardView
            onSelectExam={handleSelectExam}
            onNavigate={handleNavigate}
            onOpenAuth={() => setIsAuthOpen(true)}
          />
        )}

        {currentView === 'dashboard' && (
          <DashboardView
            onSelectExam={handleSelectExam}
            onNavigate={handleNavigate}
            onOpenAuth={() => setIsAuthOpen(true)}
          />
        )}

        {currentView === 'about' && (
          <AboutView onNavigate={handleNavigate} />
        )}

        {currentView === 'contact' && (
          <ContactView />
        )}

        {currentView === 'privacy' && (
          <PrivacyPolicyView />
        )}

        {currentView === 'terms' && (
          <TermsView />
        )}

        {currentView === 'disclaimer' && (
          <DisclaimerView />
        )}
      </main>

      {/* Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onOpenDeploymentGuide={() => setIsDeploymentGuideOpen(true)}
      />

      {/* Exam Details Modal */}
      {selectedExam && (
        <ExamDetailModal exam={selectedExam} onClose={() => setSelectedExam(null)} />
      )}

      {/* Student Workspace Auth Modal */}
      {isAuthOpen && (
        <AuthModal
          onClose={() => setIsAuthOpen(false)}
          onSuccess={() => {
            setIsAuthOpen(false);
            setCurrentView('dashboard');
          }}
        />
      )}

      {/* Local Editorial Console Modal */}
      {isAdminOpen && (
        <AdminView
          onClose={() => setIsAdminOpen(false)}
          onSelectExam={handleSelectExam}
        />
      )}

      {/* Deployment & Cloudflare Guide Modal */}
      {isDeploymentGuideOpen && (
        <DeploymentGuideModal onClose={() => setIsDeploymentGuideOpen(false)} />
      )}

      {/* Toast Feedback Alerts */}
      <ToastContainer />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ExamProvider>
          <AppContent />
        </ExamProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
