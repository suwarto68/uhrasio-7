import React, { useState } from 'react';
import { StudentUser, AppSettings } from '../types';
import { 
  KeyRound, 
  User, 
  GraduationCap, 
  Lock, 
  ArrowRight, 
  AlertCircle, 
  HelpCircle,
  X,
  Sparkles,
  Database,
  Home
} from 'lucide-react';

interface StudentLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: StudentUser, enteredToken: string) => void;
  studentsList: StudentUser[];
  settings: AppSettings;
  onOpenAppsScriptGuide: () => void;
}

export const StudentLoginModal: React.FC<StudentLoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  studentsList,
  settings,
  onOpenAppsScriptGuide
}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [selectedClass, setSelectedClass] = useState<'7A' | '7B'>('7A');
  const [examToken, setExamToken] = useState(settings.examToken || 'RASIO7WNR');
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!username.trim()) {
      setErrorMessage('Silakan masukkan Username / NIS Anda.');
      return;
    }
    if (!password.trim()) {
      setErrorMessage('Silakan masukkan Password akun Anda.');
      return;
    }
    if (!examToken.trim()) {
      setErrorMessage('Silakan masukkan Token Ujian dari Pengawas / Proktor.');
      return;
    }

    // Validasi token ujian
    if (examToken.trim().toUpperCase() !== settings.examToken.trim().toUpperCase()) {
      setErrorMessage(`Token ujian salah! Masukkan token aktif (${settings.examToken}).`);
      return;
    }

    // Cari siswa yang cocok di database (atau sheet UserLogin)
    const normalizedUsername = username.trim().toLowerCase();
    const foundUser = studentsList.find(
      s => s.username.toLowerCase() === normalizedUsername && s.class === selectedClass
    );

    if (!foundUser) {
      setErrorMessage(`Siswa dengan username "${username}" tidak ditemukan di Kelas ${selectedClass}. Pastikan pilihan kelas dan username sesuai.`);
      return;
    }

    if (foundUser.password !== password) {
      setErrorMessage('Password yang Anda masukkan salah. Hubungi guru pengawas jika lupa password.');
      return;
    }

    // Berhasil Login
    onLoginSuccess(foundUser, examToken.trim().toUpperCase());
  };

  // Helper quick fill for testing
  const handleQuickSelect = (st: StudentUser) => {
    setUsername(st.username);
    setPassword(st.password);
    setSelectedClass(st.class);
    setExamToken(settings.examToken);
    setErrorMessage('');
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      {/* Kotak Login Putih dengan Bayangan (Shadow) Sesuai Spesifikasi */}
      <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden relative animate-in fade-in zoom-in-95 duration-200">
        
        {/* Tombol Tutup */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Kotak Login Biru Khas ANBK */}
        <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 p-6 text-white text-center relative">
          <div className="w-14 h-14 rounded-2xl bg-white/10 p-2 mx-auto flex items-center justify-center border border-white/20 shadow-md mb-3">
            <GraduationCap className="w-8 h-8 text-amber-300" />
          </div>
          <h2 className="text-lg sm:text-xl font-extrabold tracking-tight">
            MASUK RUANG UJIAN CBT
          </h2>
          <p className="text-xs text-blue-200 mt-1 font-medium">
            SMP Negeri 1 Wanaraya · TA 2026/2027
          </p>
          <span className="inline-block mt-2 text-[11px] font-semibold bg-blue-700/80 text-blue-100 px-3 py-0.5 rounded-full border border-blue-400/30">
            Bab 3: Rasio (Kelas 7 Fase D)
          </span>
        </div>

        {/* Form Isi Login Siswa */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {errorMessage && (
            <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Dropdown Kelas [7A dan 7B] */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1.5">
              Pilih Kelas Peserta
            </label>
            <div className="relative">
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value as '7A' | '7B')}
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm font-semibold rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all text-slate-900"
              >
                <option value="7A">Kelas 7A - SMPN 1 Wanaraya</option>
                <option value="7B">Kelas 7B - SMPN 1 Wanaraya</option>
              </select>
            </div>
          </div>

          {/* Username */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1.5">
              Username / Kode Peserta
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <User className="w-4 h-4" />
              </div>
              <input
                type="text"
                placeholder="Contoh: ahmad7a atau aditya7b"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-10 pr-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 text-slate-900 font-medium"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1.5">
              Kata Sandi (Password)
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type="password"
                placeholder="Masukkan kata sandi (default: 123)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 text-slate-900 font-medium"
              />
            </div>
          </div>

          {/* Token Ujian */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-slate-700">
                Token Ujian Hari Ini
              </label>
              <span className="text-[10px] font-semibold text-blue-600">
                Token Aktif: {settings.examToken}
              </span>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <KeyRound className="w-4 h-4" />
              </div>
              <input
                type="text"
                placeholder="Masukkan Token (6-8 Karakter)"
                value={examToken}
                onChange={(e) => setExamToken(e.target.value.toUpperCase())}
                className="w-full pl-10 pr-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 text-slate-900 uppercase font-mono font-bold tracking-wider"
              />
            </div>
          </div>

          {/* Tombol Masuk */}
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 mt-2"
          >
            <span>Mulai Masuk Ujian</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          {/* Tombol Kembali ke Beranda Utama */}
          <button
            type="button"
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors flex items-center justify-center gap-1.5"
          >
            <Home className="w-3.5 h-3.5 text-slate-500" />
            <span>Kembali ke Beranda Utama</span>
          </button>
        </form>

        {/* Demo Quick Select & Spreadsheet Sync Info */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 text-xs text-slate-600 space-y-2">
          <div className="flex items-center justify-between text-[11px] font-bold text-slate-700">
            <span className="flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              Uji Coba Cepat (Akun Contoh):
            </span>
            <span className="text-slate-400 font-normal">Password: 123</span>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {studentsList.slice(0, 4).map((st) => (
              <button
                key={st.id}
                type="button"
                onClick={() => handleQuickSelect(st)}
                className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 hover:border-blue-400 text-[11px] font-medium text-slate-700 transition-colors"
              >
                {st.name} ({st.class})
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px] text-slate-500">
            <span className="flex items-center gap-1">
              <Database className="w-3 h-3 text-blue-600" />
              Tersambung: Sheet UserLogin & JawabanUjian
            </span>
            <button
              type="button"
              onClick={onOpenAppsScriptGuide}
              className="text-blue-600 hover:underline font-semibold"
            >
              Lihat Skrip
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
