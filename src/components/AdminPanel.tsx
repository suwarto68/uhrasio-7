import React, { useState } from 'react';
import { StudentUser, ExamSubmission, AppSettings } from '../types';
import { QUESTIONS_DATA } from '../data/questionsData';
import { 
  testGoogleAppsScriptConnection, 
  fetchUsersFromSpreadsheet,
  saveStoredSettings,
  saveStoredStudents
} from '../services/apiService';
import { QuestionStimulusVisual } from './QuestionStimulusVisual';
import { StudentAnalyticsDashboard } from './StudentAnalyticsDashboard';
import { 
  Users, 
  FileSpreadsheet, 
  Settings as SettingsIcon, 
  BookOpenCheck, 
  Lock, 
  Key, 
  Download, 
  RefreshCw, 
  CheckCircle2, 
  AlertCircle, 
  Plus, 
  Trash2, 
  ExternalLink, 
  Search, 
  Filter,
  BarChart3,
  Table
} from 'lucide-react';

interface AdminPanelProps {
  settings: AppSettings;
  onUpdateSettings: (newSettings: AppSettings) => void;
  studentsList: StudentUser[];
  onUpdateStudentsList: (newList: StudentUser[]) => void;
  submissionsList: ExamSubmission[];
  onOpenAppsScriptGuide: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  settings,
  onUpdateSettings,
  studentsList,
  onUpdateStudentsList,
  submissionsList,
  onOpenAppsScriptGuide
}) => {
  // Navigation tab inside admin
  const [activeTab, setActiveTab] = useState<'users' | 'results' | 'settings' | 'pembahasan'>('users');

  // Sub-tab for results view mode: 'both', 'charts', or 'table'
  const [resultsSubTab, setResultsSubTab] = useState<'both' | 'charts' | 'table'>('both');

  // Password Protection for Pembahasan
  const [isPembahasanUnlocked, setIsPembahasanUnlocked] = useState<boolean>(false);
  const [enteredPassword, setEnteredPassword] = useState<string>('');
  const [pembahasanError, setPembahasanError] = useState<string>('');

  // Settings form states
  const [durationInput, setDurationInput] = useState<number>(settings.examDurationMinutes);
  const [tokenInput, setTokenInput] = useState<string>(settings.examToken);
  const [appsScriptUrlInput, setAppsScriptUrlInput] = useState<string>(settings.googleAppsScriptUrl);
  const [testResult, setTestResult] = useState<{ status: 'idle' | 'testing' | 'success' | 'error'; message: string }>({
    status: 'idle',
    message: ''
  });

  // Pull from spreadsheet state
  const [isPullingUsers, setIsPullingUsers] = useState<boolean>(false);
  const [pullMessage, setPullMessage] = useState<string>('');

  // Users filter & add modal
  const [selectedClassFilter, setSelectedClassFilter] = useState<'all' | '7A' | '7B'>('all');
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [showAddUserModal, setShowAddUserModal] = useState<boolean>(false);
  const [newUsername, setNewUsername] = useState<string>('');
  const [newName, setNewName] = useState<string>('');
  const [newClass, setNewClass] = useState<'7A' | '7B'>('7A');
  const [newPassword, setNewPassword] = useState<string>('123');

  // Filtered users
  const filteredStudents = studentsList.filter(s => {
    const matchClass = selectedClassFilter === 'all' || s.class === selectedClassFilter;
    const matchSearch = s.name.toLowerCase().includes(searchKeyword.toLowerCase()) || 
                        s.username.toLowerCase().includes(searchKeyword.toLowerCase());
    return matchClass && matchSearch;
  });

  // Handle Unlock Pembahasan
  const handleUnlockPembahasan = (e: React.FormEvent) => {
    e.preventDefault();
    setPembahasanError('');
    if (enteredPassword.trim() === settings.adminPasswordHash || enteredPassword.trim() === 'adminwanaraya2026') {
      setIsPembahasanUnlocked(true);
      setEnteredPassword('');
    } else {
      setPembahasanError('Kata sandi salah! Akses pembahasan hanya untuk Guru Pengajar / Proktor.');
    }
  };

  // Handle Save Settings
  const handleSaveSettings = () => {
    const updated: AppSettings = {
      ...settings,
      examDurationMinutes: Number(durationInput) || 80,
      examToken: tokenInput.trim().toUpperCase() || 'RASIO7WNR',
      googleAppsScriptUrl: appsScriptUrlInput.trim()
    };
    saveStoredSettings(updated);
    onUpdateSettings(updated);
    alert('Pengaturan berhasil disimpan!');
  };

  // Handle Test Connection
  const handleTestConnection = async () => {
    setTestResult({ status: 'testing', message: 'Menghubungi Google Apps Script...' });
    const res = await testGoogleAppsScriptConnection(appsScriptUrlInput.trim());
    if (res.success) {
      setTestResult({ status: 'success', message: res.message });
      const updated: AppSettings = {
        ...settings,
        googleAppsScriptUrl: appsScriptUrlInput.trim(),
        isGoogleSheetConnected: true
      };
      saveStoredSettings(updated);
      onUpdateSettings(updated);
    } else {
      setTestResult({ status: 'error', message: res.message });
    }
  };

  // Handle "Tarik dari spreadsheet" (Sheet UserLogin)
  const handlePullFromSpreadsheet = async () => {
    if (!settings.googleAppsScriptUrl) {
      setPullMessage('Masukkan dan simpan URL Google Apps Script terlebih dahulu di menu Pengaturan.');
      return;
    }
    setIsPullingUsers(true);
    setPullMessage('Menghubungi Google Spreadsheet (sheet UserLogin)...');
    const res = await fetchUsersFromSpreadsheet(settings.googleAppsScriptUrl);
    setIsPullingUsers(false);
    if (res.success && res.users) {
      onUpdateStudentsList(res.users);
      setPullMessage(`Sukses: Berhasil menarik ${res.users.length} akun siswa dari spreadsheet!`);
    } else {
      setPullMessage(`Gagal: ${res.message}`);
    }
  };

  // Handle Add Student Manual
  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUsername.trim() || !newName.trim()) return;

    const newStudent: StudentUser = {
      id: 'std-' + Date.now(),
      username: newUsername.trim().toLowerCase(),
      name: newName.trim(),
      class: newClass,
      password: newPassword.trim() || '123',
      token: settings.examToken
    };

    const updated = [newStudent, ...studentsList];
    saveStoredStudents(updated);
    onUpdateStudentsList(updated);
    setShowAddUserModal(false);
    setNewUsername('');
    setNewName('');
    alert(`Siswa ${newName} berhasil ditambahkan ke kelas ${newClass}`);
  };

  // Handle Export Submissions CSV
  const handleExportCSV = () => {
    if (submissionsList.length === 0) {
      alert('Belum ada data ujian yang tersimpan untuk diekspor.');
      return;
    }

    const headers = ['ID', 'Nama Siswa', 'Kelas', 'Username', 'Waktu Submit', 'Durasi (menit)', 'Skor Total', 'Benar', 'Total Soal', 'Skor Pemahaman', 'Skor Aplikasi', 'Skor Penalaran'];
    const rows = submissionsList.map(s => [
      s.id,
      `"${s.studentName}"`,
      s.studentClass,
      s.username,
      s.submittedAt,
      s.durationSpentMinutes,
      s.totalScore,
      s.correctCount,
      s.totalQuestions,
      s.scoreByLevel.pemahaman.score,
      s.scoreByLevel.aplikasi.score,
      s.scoreByLevel.penalaran.score
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Hasil_Ujian_Bab3_Rasio_SMPN1_Wanaraya_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Header Card */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-700 bg-purple-50 px-3 py-1 rounded-full border border-purple-200 mb-2">
            <Lock className="w-3.5 h-3.5" />
            <span>Panel Administrator & Proktor Ujian</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Pusat Kendali Asesmen CBT
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            SMP Negeri 1 Wanaraya · Manajemen Data Siswa, Hasil Ujian, Integrasi Google Sheets, dan Kisi-Kisi TKA
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={onOpenAppsScriptGuide}
            className="px-3.5 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold border border-blue-200 transition-colors flex items-center gap-1.5 shadow-xs"
          >
            <FileSpreadsheet className="w-4 h-4" />
            Panduan & Kode Apps Script
          </button>
        </div>
      </div>

      {/* Admin Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-3">
        <button
          onClick={() => setActiveTab('users')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
            activeTab === 'users'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
          }`}
        >
          <Users className="w-4 h-4" />
          Data Pengguna (Siswa)
        </button>

        <button
          onClick={() => setActiveTab('results')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
            activeTab === 'results'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
          }`}
        >
          <BarChart3 className="w-4 h-4 text-emerald-300" />
          Hasil & Visualisasi ({submissionsList.length})
        </button>

        <button
          onClick={() => setActiveTab('settings')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
            activeTab === 'settings'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
          }`}
        >
          <SettingsIcon className="w-4 h-4" />
          Pengaturan & Database
        </button>

        <button
          onClick={() => setActiveTab('pembahasan')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
            activeTab === 'pembahasan'
              ? 'bg-purple-600 text-white shadow-sm'
              : 'bg-purple-50 hover:bg-purple-100 text-purple-800 border border-purple-200'
          }`}
        >
          <BookOpenCheck className="w-4 h-4" />
          Akses Pembahasan & Kisi-Kisi (Berpassword)
        </button>
      </div>

      {/* TAB 1: DATA PENGGUNA (SISWA) */}
      {activeTab === 'users' && (
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Daftar Peserta Ujian (Kelas 7A & 7B)
              </h2>
              <p className="text-xs text-slate-500">
                Total {studentsList.length} siswa terdaftar di database lokal / tersinkron Google Spreadsheet.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              {/* Tombol Wajib Sesuai Instruksi: "Tarik dari spreadsheet" */}
              <button
                onClick={handlePullFromSpreadsheet}
                disabled={isPullingUsers}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white text-xs font-bold shadow-xs flex items-center gap-1.5 transition-all"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isPullingUsers ? 'animate-spin' : ''}`} />
                <span>Tarik dari Spreadsheet</span>
              </button>

              <button
                onClick={() => setShowAddUserModal(true)}
                className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs flex items-center gap-1.5 transition-all"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Tambah Siswa</span>
              </button>
            </div>
          </div>

          {pullMessage && (
            <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-800 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
              <span>{pullMessage}</span>
            </div>
          )}

          {/* Filter Bar */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
              <input
                type="text"
                placeholder="Cari nama atau username siswa..."
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                className="w-full pl-10 pr-3.5 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <div className="flex gap-1.5">
              <button
                onClick={() => setSelectedClassFilter('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${selectedClassFilter === 'all' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700'}`}
              >
                Semua ({studentsList.length})
              </button>
              <button
                onClick={() => setSelectedClassFilter('7A')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${selectedClassFilter === '7A' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700'}`}
              >
                Kelas 7A ({studentsList.filter(s => s.class === '7A').length})
              </button>
              <button
                onClick={() => setSelectedClassFilter('7B')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${selectedClassFilter === '7B' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700'}`}
              >
                Kelas 7B ({studentsList.filter(s => s.class === '7B').length})
              </button>
            </div>
          </div>

          {/* Tabel Pengguna */}
          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                <tr>
                  <th className="px-4 py-3">No</th>
                  <th className="px-4 py-3">Nama Siswa</th>
                  <th className="px-4 py-3">Username / NIS</th>
                  <th className="px-4 py-3">Kelas</th>
                  <th className="px-4 py-3">Password</th>
                  <th className="px-4 py-3">Token Ujian</th>
                  <th className="px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {filteredStudents.length > 0 ? (
                  filteredStudents.map((st, idx) => {
                    const hasSubmitted = submissionsList.some(sub => sub.username === st.username);
                    return (
                      <tr key={st.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-4 py-2.5 text-slate-400 font-mono">{idx + 1}</td>
                        <td className="px-4 py-2.5 font-bold text-slate-900">{st.name}</td>
                        <td className="px-4 py-2.5 font-mono text-blue-700">{st.username}</td>
                        <td className="px-4 py-2.5">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800">
                            {st.class}
                          </span>
                        </td>
                        <td className="px-4 py-2.5 font-mono text-slate-500">{st.password}</td>
                        <td className="px-4 py-2.5 font-mono font-semibold text-amber-700">{st.token || settings.examToken}</td>
                        <td className="px-4 py-2.5">
                          {hasSubmitted ? (
                            <span className="text-emerald-700 font-bold flex items-center gap-1 text-[11px]">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Sudah Ujian
                            </span>
                          ) : (
                            <span className="text-slate-400 font-medium text-[11px]">
                              Belum Ujian
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={7} className="text-center py-8 text-slate-400">
                      Tidak ada data siswa ditemukan untuk kriteria pencarian ini.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: HASIL UJIAN & VISUALISASI RECHARTS */}
      {activeTab === 'results' && (
        <div className="space-y-6">
          {/* Controls Bar */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-200">
                  Visualisasi Recharts Aktif
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  {submissionsList.length} dari {studentsList.length} siswa telah selesai
                </span>
              </div>
              <h2 className="text-lg font-bold text-slate-900 mt-1">
                Analitik Performa & Rekapitulasi Hasil Ujian
              </h2>
              <p className="text-xs text-slate-500">
                Data otomatis tersinkronisasi dengan Google Spreadsheet (Sheet: <strong>JawabanUjian</strong>).
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {/* Sub-tab view buttons */}
              <div className="bg-slate-100 p-1 rounded-xl flex items-center border border-slate-200 text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setResultsSubTab('both')}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    resultsSubTab === 'both'
                      ? 'bg-white text-blue-700 font-bold shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Semua Tampilan
                </button>
                <button
                  type="button"
                  onClick={() => setResultsSubTab('charts')}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    resultsSubTab === 'charts'
                      ? 'bg-white text-blue-700 font-bold shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Grafik Recharts
                </button>
                <button
                  type="button"
                  onClick={() => setResultsSubTab('table')}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    resultsSubTab === 'table'
                      ? 'bg-white text-blue-700 font-bold shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Tabel Nilai
                </button>
              </div>

              <button
                onClick={handleExportCSV}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs flex items-center gap-1.5 transition-all"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Unduh CSV</span>
              </button>
            </div>
          </div>

          {/* Recharts Analytics Dashboard */}
          {(resultsSubTab === 'both' || resultsSubTab === 'charts') && (
            <StudentAnalyticsDashboard
              submissions={submissionsList}
              students={studentsList}
            />
          )}

          {/* Submissions Table */}
          {(resultsSubTab === 'both' || resultsSubTab === 'table') && (
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-800">
                    Tabel Rekap Nilai Siswa Per Nomor & Domain Kognitif
                  </h3>
                  <p className="text-xs text-slate-400">
                    Rincian nilai skor total (0–100), capaian kognitif, dan status pengiriman ke database.
                  </p>
                </div>
                <span className="text-xs font-mono text-slate-500 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200">
                  Total Entri: {submissionsList.length}
                </span>
              </div>

              <div className="overflow-x-auto rounded-xl border border-slate-200">
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                    <tr>
                      <th className="px-4 py-3">No</th>
                      <th className="px-4 py-3">Nama Siswa</th>
                      <th className="px-4 py-3">Kelas</th>
                      <th className="px-4 py-3">Waktu Selesai</th>
                      <th className="px-4 py-3">Durasi</th>
                      <th className="px-4 py-3">Skor (0-100)</th>
                      <th className="px-4 py-3">Pemahaman</th>
                      <th className="px-4 py-3">Aplikasi</th>
                      <th className="px-4 py-3">Penalaran</th>
                      <th className="px-4 py-3">Spreadsheet</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white">
                    {submissionsList.length > 0 ? (
                      submissionsList.map((sub, sIdx) => (
                        <tr key={sub.id} className="hover:bg-slate-50 transition-colors">
                          <td className="px-4 py-2.5 font-mono text-slate-400">{sIdx + 1}</td>
                          <td className="px-4 py-2.5 font-bold text-slate-900">{sub.studentName}</td>
                          <td className="px-4 py-2.5">
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800">
                              {sub.studentClass}
                            </span>
                          </td>
                          <td className="px-4 py-2.5 text-slate-500 font-mono text-[11px]">
                            {new Date(sub.submittedAt).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} WITA
                          </td>
                          <td className="px-4 py-2.5 text-slate-600">{sub.durationSpentMinutes} mnt</td>
                          <td className="px-4 py-2.5">
                            <span className="px-2.5 py-1 rounded-lg font-mono font-black text-sm bg-blue-50 text-blue-900 border border-blue-200">
                              {sub.totalScore}
                            </span>
                          </td>
                          <td className="px-4 py-2.5 font-mono font-bold text-blue-700">{sub.scoreByLevel.pemahaman.score}</td>
                          <td className="px-4 py-2.5 font-mono font-bold text-emerald-700">{sub.scoreByLevel.aplikasi.score}</td>
                          <td className="px-4 py-2.5 font-mono font-bold text-purple-700">{sub.scoreByLevel.penalaran.score}</td>
                          <td className="px-4 py-2.5">
                            <span className="text-[11px] font-bold text-emerald-600 flex items-center gap-1">
                              <CheckCircle2 className="w-3.5 h-3.5" /> Tersimpan
                            </span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={10} className="text-center py-8 text-slate-400">
                          Belum ada siswa yang menyelesaikan ujian pada sesi ini. Grafik di atas menampilkan mode simulasi untuk demonstrasi Recharts.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: PENGATURAN & DATABASE APPS SCRIPT */}
      {activeTab === 'settings' && (
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Pengaturan Sistem & Database Google Sheets
            </h2>
            <p className="text-xs text-slate-500">
              Konfigurasi durasi waktu ujian, token aktif harian, dan URL Web App Google Apps Script.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            
            {/* Durasi Ujian */}
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Durasi Waktu Ujian (Menit)
              </label>
              <input
                type="number"
                min="10"
                max="180"
                value={durationInput}
                onChange={(e) => setDurationInput(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm font-semibold rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 font-mono"
              />
              <span className="text-[11px] text-slate-500 mt-1 block">Default standar CBT ANBK: 80 menit.</span>
            </div>

            {/* Token Ujian Aktif */}
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Token Ujian Aktif (Hari Ini)
              </label>
              <input
                type="text"
                value={tokenInput}
                onChange={(e) => setTokenInput(e.target.value.toUpperCase())}
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm font-bold uppercase rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 font-mono tracking-wider text-amber-900 bg-amber-50"
              />
              <span className="text-[11px] text-slate-500 mt-1 block">Siswa wajib memasukkan token ini saat login CBT.</span>
            </div>

            {/* URL Google Apps Script Web App */}
            <div className="md:col-span-2">
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-bold text-slate-700">
                  URL Google Apps Script Web App (Database Spreadsheet)
                </label>
                <button
                  type="button"
                  onClick={onOpenAppsScriptGuide}
                  className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1"
                >
                  <FileSpreadsheet className="w-3.5 h-3.5" />
                  Lihat Panduan & Salin Skrip .gs
                </button>
              </div>

              <input
                type="url"
                placeholder="https://script.google.com/macros/s/.../exec"
                value={appsScriptUrlInput}
                onChange={(e) => setAppsScriptUrlInput(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs font-mono rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600"
              />
              
              <div className="mt-2 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={handleTestConnection}
                  disabled={testResult.status === 'testing'}
                  className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-1.5 transition-colors shadow-xs"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${testResult.status === 'testing' ? 'animate-spin' : ''}`} />
                  <span>Uji Koneksi Spreadsheet</span>
                </button>

                {testResult.status === 'success' && (
                  <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" /> {testResult.message}
                  </span>
                )}

                {testResult.status === 'error' && (
                  <span className="text-xs font-medium text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4 shrink-0" /> {testResult.message}
                  </span>
                )}
              </div>
            </div>

          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-end">
            <button
              onClick={handleSaveSettings}
              className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-bold shadow-md transition-all"
            >
              Simpan Pengaturan
            </button>
          </div>
        </div>
      )}

      {/* TAB 4: AKSES PEMBAHASAN & KISI-KISI (BERPASSWORD SESUAI INSTRUKSI) */}
      {activeTab === 'pembahasan' && (
        <div className="space-y-6">
          {!isPembahasanUnlocked ? (
            /* Kunci Password Pembahasan */
            <div className="bg-white rounded-2xl p-8 border border-purple-200 shadow-md max-w-lg mx-auto text-center space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center mx-auto shadow-inner">
                <Lock className="w-8 h-8" />
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  Akses Pembahasan Soal & Kunci Jawaban
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Bagian ini dilindungi kata sandi khusus Guru / Proktor agar kunci jawaban tidak bocor kepada peserta didik.
                </p>
              </div>

              <form onSubmit={handleUnlockPembahasan} className="space-y-3 pt-2">
                {pembahasanError && (
                  <p className="text-xs text-red-600 font-semibold bg-red-50 p-2 rounded-lg border border-red-200">
                    {pembahasanError}
                  </p>
                )}

                <div className="relative">
                  <input
                    type="password"
                    placeholder="Masukkan Kata Sandi Guru / Proktor"
                    value={enteredPassword}
                    onChange={(e) => setEnteredPassword(e.target.value)}
                    className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-purple-600"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5"
                >
                  <Key className="w-4 h-4" />
                  <span>Buka Kunci Pembahasan</span>
                </button>
              </form>

              <p className="text-[11px] text-slate-400">
                (Kata sandi default: <code className="font-mono font-bold text-purple-700">adminwanaraya2026</code>)
              </p>
            </div>
          ) : (
            /* Isi Pembahasan 20 Soal Lengkap dengan Kisi-Kisi ABCD TKA */
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
              <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                <div>
                  <span className="text-xs font-bold text-purple-700 bg-purple-50 px-2.5 py-1 rounded-md border border-purple-200">
                    Akses Guru Pengajar Terbuka
                  </span>
                  <h2 className="text-xl font-bold text-slate-900 mt-2">
                    Kisi-Kisi & Pembahasan Lengkap 20 Soal TKA Bab 3 Rasio
                  </h2>
                  <p className="text-xs text-slate-500">
                    Sesuai Kerangka Asesmen TKA BSKAP Kemendikdasmen No. 047/H/AN/2025 dengan kaidah ABCD.
                  </p>
                </div>

                <button
                  onClick={() => setIsPembahasanUnlocked(false)}
                  className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold"
                >
                  Kunci Kembali
                </button>
              </div>

              {/* Rincian 20 Soal */}
              <div className="space-y-6">
                {QUESTIONS_DATA.map((q) => (
                  <div key={q.id} className="p-5 rounded-2xl border border-slate-200 bg-slate-50/70 space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-sm text-blue-900 bg-blue-100 px-2 py-0.5 rounded">
                          Soal #{q.number}
                        </span>
                        <span className="text-xs font-bold text-slate-700">
                          {q.type === 'pg' ? 'Pilihan Ganda' : q.type === 'pgk_mcma' ? 'PGK MCMA' : 'PGK Kategori'}
                        </span>
                      </div>
                      <span className={`text-[11px] font-bold px-2 py-0.5 rounded ${
                        q.level === 'Pemahaman' ? 'bg-blue-100 text-blue-800' : q.level === 'Aplikasi' ? 'bg-emerald-100 text-emerald-800' : 'bg-purple-100 text-purple-800'
                      }`}>
                        Level {q.level} · TP {q.competency}
                      </span>
                    </div>

                    {/* Indikator ABCD */}
                    <div className="text-[11px] bg-white p-3 rounded-xl border border-slate-200 space-y-1 text-slate-600">
                      <strong className="text-slate-900 block text-xs">Indikator Soal (Kaidah ABCD TKA):</strong>
                      <p>• <strong>Condition:</strong> {q.indicatorABCD.condition}</p>
                      <p>• <strong>Audience:</strong> {q.indicatorABCD.audience}</p>
                      <p>• <strong>Behavior:</strong> {q.indicatorABCD.behavior}</p>
                      <p>• <strong>Degree:</strong> {q.indicatorABCD.degree}</p>
                    </div>

                    {/* Visual Stimulus Infografis / Foto Kontekstual */}
                    {(q.stimulus.imageUrl || q.stimulus.diagramType) && (
                      <QuestionStimulusVisual
                        imageUrl={q.stimulus.imageUrl}
                        imageCaption={q.stimulus.imageCaption}
                        diagramType={q.stimulus.diagramType}
                        title={q.stimulus.title}
                      />
                    )}

                    <p className="text-xs text-slate-800 font-bold">
                      {q.prompt}
                    </p>

                    {/* Kunci Jawaban */}
                    <div className="flex items-center gap-2 text-xs">
                      <span className="font-bold text-slate-700">Kunci Jawaban:</span>
                      {q.type === 'pg' && (
                        <span className="font-mono font-black text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                          {q.correctAnswer}
                        </span>
                      )}
                      {q.type === 'pgk_mcma' && (
                        <span className="font-mono font-black text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                          {q.correctAnswers.join(', ')}
                        </span>
                      )}
                      {q.type === 'pgk_kategori' && (
                        <span className="font-mono font-black text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                          {q.statements.map(s => s.correctAnswer).join(', ')}
                        </span>
                      )}
                    </div>

                    {/* Pembahasan Step-by-Step */}
                    <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200 text-xs text-slate-800 leading-relaxed whitespace-pre-line">
                      <strong className="font-bold text-amber-900 block mb-1">Pembahasan Terperinci:</strong>
                      {q.explanation}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Modal Tambah Siswa */}
      {showAddUserModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-200">
            <h3 className="text-base font-bold text-slate-900">Tambah Akun Siswa Baru</h3>
            <form onSubmit={handleAddStudent} className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Nama Siswa</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Muhammad Ilham"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Username / NIS</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: ilham7a"
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Kelas</label>
                <select
                  value={newClass}
                  onChange={(e) => setNewClass(e.target.value as '7A' | '7B')}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
                >
                  <option value="7A">Kelas 7A</option>
                  <option value="7B">Kelas 7B</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Password</label>
                <input
                  type="text"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg font-mono"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddUserModal(false)}
                  className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow"
                >
                  Simpan Siswa
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
