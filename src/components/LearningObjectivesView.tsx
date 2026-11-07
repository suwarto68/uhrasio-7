import React, { useState } from 'react';
import { LEARNING_OBJECTIVES, LearningObjective } from '../data/learningObjectives';
import { 
  Target, 
  Lightbulb, 
  Layers, 
  ChevronRight, 
  ArrowRight
} from 'lucide-react';

interface LearningObjectivesViewProps {
  onGoToMaterials: () => void;
  onGoToExam: () => void;
}

export const LearningObjectivesView: React.FC<LearningObjectivesViewProps> = ({
  onGoToMaterials,
  onGoToExam
}) => {
  const [activeCode, setActiveCode] = useState<string>('3.1');
  const activeObj: LearningObjective = LEARNING_OBJECTIVES.find(o => o.code === activeCode) || LEARNING_OBJECTIVES[0];

  return (
    <div className="space-y-8 pb-12">
      {/* Header Bar */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200 mb-2">
              <Target className="w-3.5 h-3.5" />
              <span>Menu 1: Capaian Pembelajaran Fase D</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Tujuan Pembelajaran Bab 3: Rasio
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-3xl">
              Kurikulum Merdeka Matematika SMP Kelas 7 - Elemen Bilangan & Aljabar Berdasarkan Kerangka Asesmen TKA BSKAP Kemendikdasmen No. 047/H/AN/2025.
            </p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={onGoToMaterials}
              className="px-4 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold text-xs border border-blue-200 transition-colors flex items-center gap-1.5"
            >
              Materi Terkait
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={onGoToExam}
              className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-500 text-blue-950 font-bold text-xs transition-colors flex items-center gap-1.5 shadow-xs"
            >
              Uji di Kuis CBT
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Tab Selector TP 3.1 - 3.4 */}
        <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-2 pt-6 border-t border-slate-100">
          {LEARNING_OBJECTIVES.map((tp) => (
            <button
              key={tp.code}
              onClick={() => setActiveCode(tp.code)}
              className={`p-3.5 rounded-xl text-left transition-all border ${
                activeCode === tp.code
                  ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className={`text-xs font-extrabold ${activeCode === tp.code ? 'text-blue-100' : 'text-blue-600'}`}>
                  TP {tp.code}
                </span>
                <ChevronRight className={`w-3.5 h-3.5 ${activeCode === tp.code ? 'text-white' : 'text-slate-400'}`} />
              </div>
              <p className="text-xs font-bold truncate leading-tight">
                {tp.title}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Detail Konten TP Aktif */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Kolom Kiri: Penjelasan Konsep & Teori */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-5">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <span className="text-xs font-bold text-blue-700 bg-blue-100/70 px-3 py-1 rounded-md">
                Indikator {activeObj.code}
              </span>
              <span className="text-xs font-semibold text-slate-500">
                Fokus Kognitif: <strong className="text-slate-800">{activeObj.cognitiveFocus}</strong>
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              {activeObj.title}
            </h2>

            <div className="bg-sky-50/70 rounded-xl p-4 border border-sky-200 text-slate-800 text-xs sm:text-sm leading-relaxed">
              <strong>Deskripsi Sasaran:</strong> {activeObj.shortDesc}
            </div>

            <div className="space-y-3">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Layers className="w-4 h-4 text-blue-600" />
                Uraian Konsep Matematis
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed text-justify">
                {activeObj.detail}
              </p>
            </div>

            {/* Formula / Kunci Utama */}
            <div className="p-4 rounded-xl bg-slate-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-inner">
              <div>
                <span className="text-[11px] font-semibold text-sky-400 uppercase tracking-wider block">
                  Rumus / Prinsip Kunci
                </span>
                <span className="font-mono text-sm sm:text-base font-bold text-amber-300">
                  {activeObj.keyConcept}
                </span>
              </div>
            </div>
          </div>

          {/* Contoh Kontekstual Lokal Kalimantan Selatan */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-amber-500" />
              Contoh Soal & Konteks Kehidupan Nyata (Wanaraya & Kalsel)
            </h3>
            
            <div className="space-y-3">
              {activeObj.examples.map((ex, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-amber-50/60 border border-amber-200/80 text-xs sm:text-sm text-slate-700 leading-relaxed">
                  <div className="font-bold text-amber-900 mb-1">
                    Kasus {idx + 1}:
                  </div>
                  {ex}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Kolom Kanan: Rangkuman 4 TP & Panduan Ujian */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-blue-900 to-indigo-950 rounded-2xl p-6 text-white shadow-md">
            <h3 className="text-base font-bold text-white mb-2">
              Matriks Soal Ujian TKA
            </h3>
            <p className="text-xs text-blue-200 mb-4 leading-relaxed">
              Keempat tujuan pembelajaran ini diujikan dalam 20 butir soal CBT ANBK:
            </p>

            <div className="space-y-2.5 text-xs">
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-white/10 border border-white/10">
                <span className="text-blue-100 font-medium">TP 3.1 Rasio vs Selisih</span>
                <span className="font-bold text-amber-300">Soal 1, 6, 11, 15</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-white/10 border border-white/10">
                <span className="text-blue-100 font-medium">TP 3.2 Faktor Skala</span>
                <span className="font-bold text-amber-300">Soal 2, 5, 10, 14, 19</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-white/10 border border-white/10">
                <span className="text-blue-100 font-medium">TP 3.3 Proporsi Senilai</span>
                <span className="font-bold text-amber-300">Soal 3, 8, 12, 16, 18</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-white/10 border border-white/10">
                <span className="text-blue-100 font-medium">TP 3.4 Laju Satuan</span>
                <span className="font-bold text-amber-300">Soal 4, 7, 9, 13, 17, 20</span>
              </div>
            </div>

            <button
              onClick={onGoToExam}
              className="mt-6 w-full py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-blue-950 font-bold text-xs shadow-md transition-colors text-center"
            >
              Mulai Ujian 20 Soal Sekarang
            </button>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
              Karakteristik Stimulus Asesmen
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed mb-3">
              Setiap soal disajikan dengan wacana naratif kontekstual ~100 kata, tabel data agribisnis, grafik debit, atau peta spasial Kalimantan Selatan tanpa membocorkan langsung jawabannya.
            </p>
            <div className="text-[11px] text-slate-500 font-medium space-y-1">
              <p>• 10 Soal Pilihan Ganda (1 Benar)</p>
              <p>• 4 Soal Pilihan Ganda Kompleks (MCMA)</p>
              <p>• 6 Soal PGK Kategori (Benar / Salah)</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
