import React, { useState, useEffect } from 'react';
import { 
  StudentUser, 
  ExamSubmission, 
  AppSettings 
} from './types';
import { 
  getStoredSettings, 
  saveStoredSettings, 
  getStoredStudents, 
  saveStoredStudents, 
  getStoredSubmissions, 
  testGoogleAppsScriptConnection 
} from './services/apiService';
import { Header } from './components/Header';
import { HomeView } from './components/HomeView';
import { LearningObjectivesView } from './components/LearningObjectivesView';
import { MaterialsView } from './components/MaterialsView';
import { ExamView } from './components/ExamView';
import { AdminPanel } from './components/AdminPanel';
import { StudentLoginModal } from './components/StudentLoginModal';
import { AppsScriptGuideModal } from './components/AppsScriptGuideModal';
import { Home } from 'lucide-react';

export default function App() {
  // Navigation State
  const [currentTab, setCurrentTab] = useState<'home' | 'objectives' | 'materials' | 'exam' | 'admin'>('home');

  // App Settings & Data
  const [settings, setSettings] = useState<AppSettings>(getStoredSettings);
  const [studentsList, setStudentsList] = useState<StudentUser[]>(getStoredStudents);
  const [submissionsList, setSubmissionsList] = useState<ExamSubmission[]>(getStoredSubmissions);

  // Student Authentication & Exam Session
  const [currentUser, setCurrentUser] = useState<StudentUser | null>(null);
  const [tokenUsed, setTokenUsed] = useState<string>(settings.examToken || 'RASIO7WNR');
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
  const [showAppsScriptGuide, setShowAppsScriptGuide] = useState<boolean>(false);

  // Check background connection on initial mount if URL exists
  useEffect(() => {
    if (settings.googleAppsScriptUrl) {
      testGoogleAppsScriptConnection(settings.googleAppsScriptUrl).then(res => {
        if (res.success && !settings.isGoogleSheetConnected) {
          const updated = { ...settings, isGoogleSheetConnected: true };
          setSettings(updated);
          saveStoredSettings(updated);
        }
      });
    }
  }, []);

  // Handle Login Success
  const handleLoginSuccess = (user: StudentUser, enteredToken: string) => {
    setCurrentUser(user);
    setTokenUsed(enteredToken);
    setShowLoginModal(false);
    setCurrentTab('exam');
  };

  // Handle Logout
  const handleLogout = () => {
    if (currentUser) {
      try {
        localStorage.removeItem(`cbt_session_${currentUser.username}`);
      } catch {
        // ignore
      }
    }
    setCurrentUser(null);
    setCurrentTab('home');
  };

  // Handle Exam Completed
  const handleExamComplete = (submission: ExamSubmission) => {
    setSubmissionsList(prev => [submission, ...prev]);
  };

  const handleUpdateSettings = (newSettings: AppSettings) => {
    setSettings(newSettings);
    saveStoredSettings(newSettings);
  };

  const handleUpdateStudentsList = (newList: StudentUser[]) => {
    setStudentsList(newList);
    saveStoredStudents(newList);
  };

  const isExamInProgress = currentTab === 'exam' && currentUser !== null;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800">
      {/* Blue Header Bar (SMPN 1 Wanaraya) */}
      <Header
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        currentUser={currentUser}
        onLogout={handleLogout}
        settings={settings}
        onOpenAppsScriptGuide={() => setShowAppsScriptGuide(true)}
        isExamInProgress={isExamInProgress}
        onBackToHome={() => setCurrentTab('home')}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* Menu Home (Salam Pembuka & 3 Menu Pilihan) */}
        {currentTab === 'home' && (
          <HomeView
            onNavigate={(tab) => {
              if (tab === 'exam' && !currentUser) {
                setShowLoginModal(true);
              } else {
                setCurrentTab(tab);
              }
            }}
            onOpenExamLogin={() => {
              if (currentUser) {
                setCurrentTab('exam');
              } else {
                setShowLoginModal(true);
              }
            }}
            studentLoggedIn={currentUser !== null}
          />
        )}

        {/* Menu 1: Tujuan Pembelajaran (3.1 - 3.4) */}
        {currentTab === 'objectives' && (
          <LearningObjectivesView
            onGoToMaterials={() => setCurrentTab('materials')}
            onGoToExam={() => {
              if (currentUser) {
                setCurrentTab('exam');
              } else {
                setShowLoginModal(true);
              }
            }}
          />
        )}

        {/* Menu 2: Materi & Infografis Bab 3 Rasio */}
        {currentTab === 'materials' && (
          <MaterialsView
            onGoToExam={() => {
              if (currentUser) {
                setCurrentTab('exam');
              } else {
                setShowLoginModal(true);
              }
            }}
          />
        )}

        {/* Menu 3: Ujian / Kuis CBT ANBK 20 Soal */}
        {currentTab === 'exam' && (
          <>
            {currentUser ? (
              <ExamView
                currentUser={currentUser}
                tokenUsed={tokenUsed}
                settings={settings}
                onLogout={handleLogout}
                onExamComplete={handleExamComplete}
                onBackToHome={() => setCurrentTab('home')}
              />
            ) : (
              <div className="max-w-md mx-auto py-12 text-center space-y-4">
                <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xl space-y-4">
                  <h2 className="text-xl font-bold text-slate-900">
                    Silakan Login Terlebih Dahulu
                  </h2>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Untuk memulai Ujian Formatif Bab 3: Rasio Kelas 7, masukkan Username, Password, dan Token Ujian.
                  </p>
                  <div className="flex flex-col gap-2 pt-1">
                    <button
                      onClick={() => setShowLoginModal(true)}
                      className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition-all"
                    >
                      Buka Kotak Login Peserta
                    </button>
                    <button
                      onClick={() => setCurrentTab('home')}
                      className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors flex items-center justify-center gap-1.5"
                    >
                      <Home className="w-3.5 h-3.5 text-slate-500" />
                      <span>Kembali ke Beranda Utama</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {/* Panel Administrator & Proktor */}
        {currentTab === 'admin' && (
          <AdminPanel
            settings={settings}
            onUpdateSettings={handleUpdateSettings}
            studentsList={studentsList}
            onUpdateStudentsList={handleUpdateStudentsList}
            submissionsList={submissionsList}
            onOpenAppsScriptGuide={() => setShowAppsScriptGuide(true)}
          />
        )}

      </main>

      {/* Footer Bersih dan Informatif */}
      <footer className="bg-white border-t border-slate-200 py-5 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>
            © 2026/2027 <strong>SMP Negeri 1 Wanaraya</strong> · Kabupaten Barito Kuala, Kalimantan Selatan
          </p>
          <div className="flex items-center gap-4 text-[11px] text-slate-600">
            <span>Ujian Formatif Bab 3: Rasio</span>
            <span>·</span>
            <span>Kerangka TKA Puspendik No. 047/H/AN/2025</span>
            <span>·</span>
            <button
              onClick={() => setCurrentTab('admin')}
              className="text-purple-600 hover:underline font-semibold"
            >
              Panel Guru
            </button>
          </div>
        </div>
      </footer>

      {/* Modal Login Siswa */}
      <StudentLoginModal
        isOpen={showLoginModal}
        onClose={() => {
          setShowLoginModal(false);
          if (!currentUser && currentTab === 'exam') {
            setCurrentTab('home');
          }
        }}
        onLoginSuccess={handleLoginSuccess}
        studentsList={studentsList}
        settings={settings}
        onOpenAppsScriptGuide={() => {
          setShowLoginModal(false);
          setShowAppsScriptGuide(true);
        }}
      />

      {/* Modal Panduan & Kode Google Apps Script */}
      <AppsScriptGuideModal
        isOpen={showAppsScriptGuide}
        onClose={() => setShowAppsScriptGuide(false)}
        appsScriptUrl={settings.googleAppsScriptUrl}
        onSaveUrl={(url) => {
          const updated = { ...settings, googleAppsScriptUrl: url, isGoogleSheetConnected: true };
          handleUpdateSettings(updated);
        }}
        onTestConnection={testGoogleAppsScriptConnection}
      />
    </div>
  );
}
