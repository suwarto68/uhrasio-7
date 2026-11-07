import React, { useState } from 'react';
import { StudentUser, AppSettings } from '../types';
import { 
  GraduationCap, 
  BookOpen, 
  FileCheck2, 
  HelpCircle, 
  ShieldCheck, 
  LogOut, 
  Database, 
  Home, 
  CheckCircle2, 
  AlertCircle
} from 'lucide-react';

interface HeaderProps {
  currentTab: 'home' | 'objectives' | 'materials' | 'exam' | 'admin';
  setCurrentTab: (tab: 'home' | 'objectives' | 'materials' | 'exam' | 'admin') => void;
  currentUser: StudentUser | null;
  onLogout: () => void;
  settings: AppSettings;
  onOpenAppsScriptGuide: () => void;
  isExamInProgress?: boolean;
  onBackToHome?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  setCurrentTab,
  currentUser,
  onLogout,
  settings,
  onOpenAppsScriptGuide,
  isExamInProgress = false,
  onBackToHome
}) => {
  const [imgError, setImgError] = useState(false);

  const handleReturnHome = () => {
    if (onBackToHome) {
      onBackToHome();
    } else {
      setCurrentTab('home');
    }
  };

  return (
    <header className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 sm:h-20 gap-4">
          
          {/* Logo Sekolah & Identitas */}
          <div 
            onClick={handleReturnHome}
            className="flex items-center gap-3.5 cursor-pointer hover:opacity-95 transition-opacity select-none"
            title="Kembali ke Beranda Utama"
          >
            <div className="w-12 h-12 rounded-xl bg-white/10 p-1 flex items-center justify-center border border-white/20 shadow-inner shrink-0 overflow-hidden">
              {!imgError ? (
                <img
                  src="https://ibb.co.com/S4095CCm"
                  alt="Logo SMPN 1 Wanaraya"
                  onError={() => setImgError(true)}
                  className="w-full h-full object-contain drop-shadow"
                />
              ) : (
                <div className="w-full h-full rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-blue-950 font-bold shadow-sm">
                  <GraduationCap className="w-6 h-6 text-blue-950" />
                </div>
              )}
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base sm:text-lg tracking-tight text-white leading-tight">
                  SMP NEGERI 1 WANARAYA
                </span>
                <span className="hidden sm:inline-block text-[11px] font-semibold bg-blue-700/80 text-blue-100 px-2 py-0.5 rounded border border-blue-400/30">
                  TA 2026/2027
                </span>
              </div>
              <span className="text-xs text-blue-200 font-medium">
                Bab 3: Rasio · Asesmen Standar TKA Fase D
              </span>
            </div>
          </div>

          {/* Navigasi Utama (Hanya Tampil Jika Tidak Sedang Sesi Ujian Berjalan) */}
          {!isExamInProgress && (
            <nav className="hidden lg:flex items-center gap-1.5 bg-blue-950/40 p-1.5 rounded-xl border border-white/10">
              <button
                onClick={() => setCurrentTab('home')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                  currentTab === 'home'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-blue-200 hover:text-white hover:bg-white/10'
                }`}
              >
                <Home className="w-3.5 h-3.5" />
                Beranda
              </button>

              <button
                onClick={() => setCurrentTab('objectives')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                  currentTab === 'objectives'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-blue-200 hover:text-white hover:bg-white/10'
                }`}
              >
                <FileCheck2 className="w-3.5 h-3.5" />
                1. Tujuan Pembelajaran
              </button>

              <button
                onClick={() => setCurrentTab('materials')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                  currentTab === 'materials'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-blue-200 hover:text-white hover:bg-white/10'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                2. Materi & Infografis
              </button>

              <button
                onClick={() => setCurrentTab('exam')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                  currentTab === 'exam'
                    ? 'bg-amber-400 text-blue-950 shadow-md ring-2 ring-amber-300'
                    : 'bg-emerald-500/90 text-white hover:bg-emerald-500 shadow-sm'
                }`}
              >
                <HelpCircle className="w-3.5 h-3.5" />
                3. Ujian / Kuis CBT
              </button>

              <button
                onClick={() => setCurrentTab('admin')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                  currentTab === 'admin'
                    ? 'bg-purple-600 text-white shadow-sm'
                    : 'text-blue-200 hover:text-white hover:bg-white/10'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                Admin Proktor
              </button>
            </nav>
          )}

          {/* Area Kanan: Status Google Sheet & Akun Siswa */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Status Koneksi Database Spreadsheet */}
            <button
              onClick={onOpenAppsScriptGuide}
              title="Klik untuk panduan koneksi Google Apps Script"
              className="flex items-center gap-1.5 text-[11px] sm:text-xs font-medium px-2.5 py-1 rounded-lg bg-blue-950/60 border border-white/15 hover:bg-blue-950 transition-colors"
            >
              <Database className="w-3.5 h-3.5 text-blue-300" />
              <span className="hidden sm:inline">Database:</span>
              {settings.googleAppsScriptUrl ? (
                <span className="flex items-center gap-1 text-emerald-300 font-semibold">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400 inline" />
                  Spreadsheet
                </span>
              ) : (
                <span className="flex items-center gap-1 text-amber-300 font-semibold">
                  <AlertCircle className="w-3 h-3 text-amber-400 inline" />
                  Mode Mandiri
                </span>
              )}
            </button>

            {/* Jika Siswa Sedang Login */}
            {currentUser ? (
              <div className="flex items-center gap-2">
                {/* Tombol Cepat Kembali ke Beranda saat Ujian */}
                {isExamInProgress && (
                  <button
                    onClick={handleReturnHome}
                    title="Kembali ke Beranda Utama"
                    className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-blue-950 text-xs font-extrabold shadow-sm transition-all"
                  >
                    <Home className="w-3.5 h-3.5 text-blue-950" />
                    <span>Kembali ke Home</span>
                  </button>
                )}

                <div className="flex items-center gap-2 bg-white/10 pl-3 pr-1.5 py-1 rounded-xl border border-white/20">
                  <div className="text-right">
                    <p className="text-xs font-bold leading-tight truncate max-w-[100px] sm:max-w-[140px] text-white">
                      {currentUser.name}
                    </p>
                    <p className="text-[10px] text-blue-200 font-semibold">
                      Kelas {currentUser.class}
                    </p>
                  </div>
                  <button
                    onClick={onLogout}
                    title="Keluar / Logout Akun Siswa"
                    className="p-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white transition-colors"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ) : null}
          </div>

        </div>

        {/* Mobile Sub-Navigation Bar */}
        {!isExamInProgress ? (
          <div className="lg:hidden flex items-center justify-between overflow-x-auto py-2 border-t border-white/10 gap-1 text-xs">
            <button
              onClick={() => setCurrentTab('home')}
              className={`px-2.5 py-1 rounded font-medium whitespace-nowrap ${currentTab === 'home' ? 'bg-blue-600 text-white' : 'text-blue-200'}`}
            >
              Beranda
            </button>
            <button
              onClick={() => setCurrentTab('objectives')}
              className={`px-2.5 py-1 rounded font-medium whitespace-nowrap ${currentTab === 'objectives' ? 'bg-blue-600 text-white' : 'text-blue-200'}`}
            >
              Tujuan (3.1-3.4)
            </button>
            <button
              onClick={() => setCurrentTab('materials')}
              className={`px-2.5 py-1 rounded font-medium whitespace-nowrap ${currentTab === 'materials' ? 'bg-blue-600 text-white' : 'text-blue-200'}`}
            >
              Materi
            </button>
            <button
              onClick={() => setCurrentTab('exam')}
              className={`px-2.5 py-1 rounded font-bold whitespace-nowrap ${currentTab === 'exam' ? 'bg-amber-400 text-blue-950' : 'bg-emerald-600 text-white'}`}
            >
              Kuis CBT
            </button>
            <button
              onClick={() => setCurrentTab('admin')}
              className={`px-2.5 py-1 rounded font-medium whitespace-nowrap ${currentTab === 'admin' ? 'bg-purple-600 text-white' : 'text-blue-200'}`}
            >
              Admin
            </button>
          </div>
        ) : (
          <div className="lg:hidden flex items-center justify-between py-2 border-t border-white/10 gap-2 text-xs">
            <button
              onClick={handleReturnHome}
              className="px-3 py-1.5 rounded-lg bg-amber-400 text-blue-950 font-bold flex items-center gap-1.5 shadow-sm"
            >
              <Home className="w-3.5 h-3.5 text-blue-950" />
              <span>Kembali ke Beranda</span>
            </button>
            <button
              onClick={onLogout}
              className="px-3 py-1.5 rounded-lg bg-red-600 text-white font-bold flex items-center gap-1.5 shadow-sm"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Keluar Ujian</span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
