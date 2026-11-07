import React from 'react';
import { 
  BookOpen, 
  Target, 
  HelpCircle, 
  ArrowRight, 
  GraduationCap, 
  CheckCircle, 
  Calendar,
  Sparkles
} from 'lucide-react';

interface HomeViewProps {
  onNavigate: (tab: 'objectives' | 'materials' | 'exam' | 'admin') => void;
  onOpenExamLogin: () => void;
  studentLoggedIn: boolean;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onNavigate,
  onOpenExamLogin,
  studentLoggedIn
}) => {
  return (
    <div className="space-y-8 pb-12">
      {/* Hero Banner Cerah dengan Salam Pembuka Khusus */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-50 via-sky-50 to-amber-50 border border-sky-100 p-6 sm:p-10 shadow-sm">
        <div className="absolute top-0 right-0 -mt-6 -mr-6 w-56 h-56 bg-sky-200/40 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-8 w-48 h-48 bg-amber-200/30 rounded-full blur-xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl">
          {/* Tagline / Subtitle Pembuka */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100/80 text-blue-800 text-xs font-semibold mb-4 border border-blue-200/60 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>LMS & CBT Asesmen Matematika Fase D</span>
          </div>

          {/* Salam Pembuka Wajib Sesuai Instruksi User */}
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            “Salam Belajar dan Terus Belajar Sepanjang Hayat”
          </h1>

          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
            Selamat datang di Portal Ujian Formatif <strong>Bab 3: Rasio</strong> jenjang SMP Kelas 7 Fase D{' '}
            <strong>SMP Negeri 1 Wanaraya</strong> Tahun Ajaran 2026/2027. Sistem asesmen ini disusun berbasis{' '}
            <strong>Kerangka Asesmen TKA Puspendik Kemendikdasmen RI</strong> dengan stimulus literasi & numerasi kontekstual Kalimantan Selatan.
          </p>

          {/* Info Badge Singkat */}
          <div className="mt-6 flex flex-wrap items-center gap-3 text-xs text-slate-600 font-medium">
            <span className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-xs">
              <Calendar className="w-3.5 h-3.5 text-blue-600" />
              Tahun Ajaran 2026/2027
            </span>
            <span className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-xs">
              <GraduationCap className="w-3.5 h-3.5 text-emerald-600" />
              Kelas 7A & 7B (Fase D)
            </span>
            <span className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-xs">
              <CheckCircle className="w-3.5 h-3.5 text-amber-600" />
              Format ANBK & TKA Terstandar
            </span>
          </div>

          {/* Tombol Aksi Cepat */}
          <div className="mt-8 flex flex-wrap gap-3">
            <button
              onClick={onOpenExamLogin}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-sm shadow-md transition-all hover:scale-[1.01]"
            >
              <HelpCircle className="w-4 h-4" />
              {studentLoggedIn ? 'Lanjutkan Masuk Ruang Ujian CBT' : 'Mulai Masuk Ujian CBT'}
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onNavigate('materials')}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 font-semibold text-sm border border-slate-300 shadow-xs transition-colors"
            >
              <BookOpen className="w-4 h-4 text-blue-600" />
              Pelajari Materi & Infografis
            </button>
          </div>
        </div>
      </div>

      {/* Tiga Menu Utama Sesuai Spesifikasi */}
      <div>
        <div className="mb-4">
          <h2 className="text-xl font-bold text-slate-900">Menu Pembelajaran & Asesmen</h2>
          <p className="text-xs text-slate-500">Pilih menu di bawah ini untuk mengakses capaian pembelajaran, materi, atau evaluasi kuis.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          
          {/* Menu 1: Tujuan Pembelajaran */}
          <div 
            onClick={() => onNavigate('objectives')}
            className="group relative bg-white rounded-2xl p-6 border border-slate-200 hover:border-blue-400 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <Target className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-blue-600 tracking-wider">MENU 1</span>
              <h3 className="text-lg font-bold text-slate-900 mt-1 mb-2 group-hover:text-blue-700 transition-colors">
                Tujuan Pembelajaran
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Memuat rincian 4 target kompetensi esensial: konsep rasio vs selisih (3.1), faktor skala (3.2), proporsi ekuivalen (3.3), dan laju perubahan satuan (3.4).
              </p>
              <ul className="text-[11px] text-slate-500 space-y-1.5 border-t border-slate-100 pt-3">
                <li className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  3.1 Rasio vs Selisih Kuantitas
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  3.2 Faktor Skala Peta & Maket
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  3.3 Rasio Ekuivalen & Proporsi
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  3.4 Masalah Laju Satuan (Rate)
                </li>
              </ul>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-blue-600 group-hover:translate-x-1 transition-transform">
              <span>Buka Tujuan Pembelajaran</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>

          {/* Menu 2: Materi Pembelajaran */}
          <div 
            onClick={() => onNavigate('materials')}
            className="group relative bg-white rounded-2xl p-6 border border-slate-200 hover:border-emerald-400 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <BookOpen className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-emerald-600 tracking-wider">MENU 2</span>
              <h3 className="text-lg font-bold text-slate-900 mt-1 mb-2 group-hover:text-emerald-700 transition-colors">
                Materi & Infografis
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Eksplorasi materi Bab 3 Rasio dilengkapi ringkasan visual infografis kurikulum, simulator perbandingan interaktif, dan penerapan kontekstual di Kalimantan Selatan.
              </p>
              <ul className="text-[11px] text-slate-500 space-y-1.5 border-t border-slate-100 pt-3">
                <li className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  Kalkulator Komparasi Rasio vs Selisih
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  Simulator Skala Peta & Jarak Sebenarnya
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  Perkalian Silang Proporsi Senilai
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  Kalkulator Best Buy & Laju Satuan
                </li>
              </ul>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-emerald-600 group-hover:translate-x-1 transition-transform">
              <span>Buka Materi Pembelajaran</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>

          {/* Menu 3: Kuis & Ujian CBT */}
          <div 
            onClick={onOpenExamLogin}
            className="group relative bg-white rounded-2xl p-6 border-2 border-amber-300 hover:border-amber-500 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between ring-1 ring-amber-100"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <HelpCircle className="w-6 h-6" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-700 tracking-wider">MENU 3</span>
                <span className="text-[10px] font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">
                  20 Soal CBT
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mt-1 mb-2 group-hover:text-amber-700 transition-colors">
                Kuis / Ujian CBT ANBK
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Ujian Formatif Matematika Kelas 7 dengan antarmuka CBT ANBK: timer 80 menit, navigasi tombol warna (Merah, Biru, Kuning), dan simpan otomatis ke Google Spreadsheet.
              </p>
              <ul className="text-[11px] text-slate-500 space-y-1.5 border-t border-slate-100 pt-3">
                <li className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  10 Pilihan Ganda (1 Benar, Opsi A-D)
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  4 Pilihan Ganda Kompleks (MCMA)
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  6 Pilihan Ganda Kategorik (Benar/Salah)
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  Kognitif: 10% Pemahaman, 50% Aplikasi, 40% HOTS
                </li>
              </ul>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-amber-700 group-hover:translate-x-1 transition-transform">
              <span>Masuk Ruang Ujian</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>

        </div>
      </div>

      {/* Profil Sekolah & Landasan Kerangka Asesmen TKA */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <h3 className="text-base sm:text-lg font-bold text-slate-900">
              Kerangka Asesmen Tes Kemampuan Akademik (TKA)
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
              Berdasarkan <strong>Peraturan Kepala BSKAP Kemendikdasmen RI No. 047/H/AN/2025</strong>, asesmen mengukur kemampuan matematis pada tiga level kognitif: 
              <span className="font-semibold text-blue-700"> Pengetahuan & Pemahaman (10%)</span>, 
              <span className="font-semibold text-emerald-700"> Aplikasi (50%)</span>, dan 
              <span className="font-semibold text-purple-700"> Penalaran HOTS (40%)</span>. Seluruh stimulus diangkat dari realitas agribisnis dan budaya lokal Kalimantan Selatan (Barito Kuala & Wanaraya).
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            <button
              onClick={() => onNavigate('admin')}
              className="px-4 py-2.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-800 text-xs font-bold border border-purple-200 transition-colors text-center"
            >
              Panel Guru & Pembahasan (Berpassword)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
