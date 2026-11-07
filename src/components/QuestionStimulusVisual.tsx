import React, { useState } from 'react';
import { Sparkles, MapPin, Compass, Building, Ruler, Droplets, FlaskConical, Maximize, Wheat, Image as ImageIcon } from 'lucide-react';

interface QuestionStimulusVisualProps {
  imageUrl?: string;
  imageCaption?: string;
  diagramType?: string;
  title: string;
}

export const QuestionStimulusVisual: React.FC<QuestionStimulusVisualProps> = ({
  imageUrl,
  imageCaption,
  diagramType,
  title
}) => {
  const [imgError, setImgError] = useState(false);

  // If a high-res image is provided
  if (imageUrl && !imgError) {
    return (
      <div className="rounded-xl overflow-hidden border border-slate-200 bg-slate-100 shadow-xs mb-3 group">
        <div className="relative aspect-video max-h-56 w-full overflow-hidden bg-slate-900">
          <img
            src={imageUrl}
            alt={imageCaption || title}
            referrerPolicy="no-referrer"
            onError={() => setImgError(true)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />
          <div className="absolute bottom-2 left-3 right-3 text-white text-[11px] font-medium drop-shadow-sm flex items-center justify-between">
            <span className="truncate">{imageCaption || 'Dokumentasi Kontekstual Wanaraya'}</span>
            <span className="text-[10px] bg-black/40 px-2 py-0.5 rounded backdrop-blur-xs text-slate-200 shrink-0">
              Konteks Nyata
            </span>
          </div>
        </div>
      </div>
    );
  }

  // Vector / SVG Infographics based on diagramType
  switch (diagramType) {
    case 'map_route':
      return (
        <div className="rounded-xl p-3.5 bg-gradient-to-br from-sky-50 to-indigo-50 border border-sky-200 shadow-xs mb-3 space-y-2">
          <div className="flex items-center justify-between text-[11px] font-bold text-sky-900">
            <span className="flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-blue-600" />
              Sketsa Peta Transportasi Darat Barito Kuala
            </span>
            <span className="font-mono bg-white px-2 py-0.5 rounded text-blue-800 border border-sky-200">
              Skala 1 : 250.000
            </span>
          </div>
          <svg viewBox="0 0 400 120" className="w-full h-28 bg-white rounded-lg border border-sky-100 p-2">
            {/* Background grid */}
            <defs>
              <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#f1f5f9" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="400" height="120" fill="url(#grid)" />
            {/* Sungai Barito winding */}
            <path d="M 20 100 Q 150 40 280 80 T 380 30" fill="none" stroke="#93c5fd" strokeWidth="14" opacity="0.6" strokeLinecap="round" />
            <text x="180" y="55" fontSize="8" fill="#1e40af" fontWeight="bold">Sungai Barito</text>
            
            {/* Jalan darat */}
            <path d="M 60 70 C 130 30, 240 90, 340 50" fill="none" stroke="#3b82f6" strokeWidth="3" strokeDasharray="5,3" />
            
            {/* Titik Marabahan */}
            <circle cx="60" cy="70" r="5" fill="#ef4444" />
            <text x="60" y="90" fontSize="9" fontWeight="bold" fill="#0f172a" textAnchor="middle">Marabahan (Dinas)</text>
            
            {/* Titik SMPN 1 Wanaraya */}
            <circle cx="340" cy="50" r="5" fill="#10b981" />
            <text x="340" y="70" fontSize="9" fontWeight="bold" fill="#0f172a" textAnchor="middle">SMPN 1 Wanaraya</text>
            
            {/* Garis Ukur Peta */}
            <line x1="60" y1="25" x2="340" y2="25" stroke="#475569" strokeWidth="1.5" />
            <line x1="60" y1="20" x2="60" y2="30" stroke="#475569" strokeWidth="1.5" />
            <line x1="340" y1="20" x2="340" y2="30" stroke="#475569" strokeWidth="1.5" />
            <rect x="160" y="15" width="80" height="18" fill="#ffffff" stroke="#cbd5e1" rx="4" />
            <text x="200" y="27" fontSize="9" fontWeight="bold" fill="#1e293b" textAnchor="middle">Jarak Peta = 14 cm</text>
          </svg>
          <p className="text-[10px] text-slate-500 italic text-center">
            *Ilustrasi visual rute garis lurus pada lembar peta topografi resmi Dinas Pendidikan.
          </p>
        </div>
      );

    case 'sasirangan':
      return (
        <div className="rounded-xl p-3.5 bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 shadow-xs mb-3 space-y-2">
          <div className="flex items-center justify-between text-[11px] font-bold text-amber-900">
            <span className="flex items-center gap-1.5">
              <Droplets className="w-3.5 h-3.5 text-amber-600" />
              Formula Celup Pewarna Alami Sasirangan Barito Kuala
            </span>
            <span className="bg-white px-2 py-0.5 rounded text-amber-800 border border-amber-200 text-[10px]">
              Kearifan Lokal
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-white p-2.5 rounded-lg border border-amber-100 flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-amber-100 flex items-center justify-center font-bold text-amber-800 text-xs shrink-0">
                6 m
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block">Kain Mori Standar:</span>
                <span className="font-bold text-slate-800">450 gram Pewarna</span>
              </div>
            </div>
            <div className="bg-white p-2.5 rounded-lg border border-amber-100 flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-orange-100 flex items-center justify-center font-bold text-orange-800 text-xs shrink-0">
                24 m
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block">Pesanan Seragam:</span>
                <span className="font-bold text-amber-700 font-mono">x gram (Dihitung)</span>
              </div>
            </div>
          </div>
          <p className="text-[10px] text-slate-500 italic text-center">
            *Proporsi takaran bahan pewarna alami menjaga konsistensi kepekatan warna kain Sasirangan.
          </p>
        </div>
      );

    case 'blueprint':
      return (
        <div className="rounded-xl p-3.5 bg-gradient-to-br from-slate-900 to-blue-950 border border-blue-900 text-white shadow-xs mb-3 space-y-2">
          <div className="flex items-center justify-between text-[11px] font-bold text-blue-200">
            <span className="flex items-center gap-1.5">
              <Ruler className="w-3.5 h-3.5 text-blue-400" />
              Cetak Biru (Blueprint) Perpustakaan SMPN 1 Wanaraya
            </span>
            <span className="font-mono bg-blue-900/60 text-sky-300 px-2 py-0.5 rounded border border-blue-700/50 text-[10px]">
              Skala 1 : 120
            </span>
          </div>
          <svg viewBox="0 0 360 110" className="w-full h-28 bg-blue-950/70 rounded-lg border border-blue-800/80 p-2">
            {/* Grid blueprint */}
            <defs>
              <pattern id="bpGrid" width="15" height="15" patternUnits="userSpaceOnUse">
                <path d="M 15 0 L 0 0 0 15" fill="none" stroke="#1e3a8a" strokeWidth="0.7" />
              </pattern>
            </defs>
            <rect width="360" height="110" fill="url(#bpGrid)" />
            {/* Ruang perpustakaan */}
            <rect x="70" y="20" width="220" height="70" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" strokeDasharray="4,2" />
            <text x="180" y="58" fontSize="11" fontWeight="bold" fill="#ffffff" textAnchor="middle">RUANG PERPUSTAKAAN</text>
            
            {/* Ukuran Panjang */}
            <line x1="70" y1="12" x2="290" y2="12" stroke="#facc15" strokeWidth="1.5" />
            <line x1="70" y1="8" x2="70" y2="16" stroke="#facc15" strokeWidth="1.5" />
            <line x1="290" y1="8" x2="290" y2="16" stroke="#facc15" strokeWidth="1.5" />
            <text x="180" y="10" fontSize="9" fontWeight="bold" fill="#facc15" textAnchor="middle">Panjang Denah = 10 cm</text>
            
            {/* Ukuran Lebar */}
            <line x1="58" y1="20" x2="58" y2="90" stroke="#facc15" strokeWidth="1.5" />
            <line x1="54" y1="20" x2="62" y2="20" stroke="#facc15" strokeWidth="1.5" />
            <line x1="54" y1="90" x2="62" y2="90" stroke="#facc15" strokeWidth="1.5" />
            <text x="50" y="58" fontSize="9" fontWeight="bold" fill="#facc15" textAnchor="middle" transform="rotate(-90 50 58)">Lebar = 7,5 cm</text>
          </svg>
          <p className="text-[10px] text-blue-300 italic text-center">
            *Ukuran tertera adalah dimensi pada kertas denah sebelum dikonversi ke luas lapangan sebenarnya.
          </p>
        </div>
      );

    case 'rice_field':
      return (
        <div className="rounded-xl p-3 bg-gradient-to-br from-emerald-50 to-green-50 border border-emerald-200 shadow-xs mb-3 space-y-2">
          <div className="flex items-center justify-between text-[11px] font-bold text-emerald-900">
            <span className="flex items-center gap-1.5">
              <Wheat className="w-3.5 h-3.5 text-emerald-600" />
              Peta Petak Sawah Lahan Rawa Pasang Surut Wanaraya
            </span>
            <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-semibold">
              Musim Tanam Gadu
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-2.5 rounded-lg bg-white border border-emerald-100">
              <span className="font-bold text-emerald-900 block text-xs">Kelompok Subur Makmur</span>
              <p className="text-[11px] text-slate-600 mt-0.5">Luas Lahan: <strong>8 Hektar</strong></p>
              <p className="text-[11px] text-slate-600">Total Panen: <strong>36 Ton Gabah</strong></p>
            </div>
            <div className="p-2.5 rounded-lg bg-white border border-emerald-100">
              <span className="font-bold text-emerald-900 block text-xs">Kelompok Karya Bersama</span>
              <p className="text-[11px] text-slate-600 mt-0.5">Luas Lahan: <strong>12 Hektar</strong></p>
              <p className="text-[11px] text-slate-600">Total Panen: <strong>60 Ton Gabah</strong></p>
            </div>
          </div>
        </div>
      );

    case 'fertilizer_mix':
      return (
        <div className="rounded-xl p-3 bg-gradient-to-br from-teal-50 to-emerald-50 border border-teal-200 shadow-xs mb-3 space-y-2">
          <div className="flex items-center justify-between text-[11px] font-bold text-teal-900">
            <span className="flex items-center gap-1.5">
              <FlaskConical className="w-3.5 h-3.5 text-teal-600" />
              Tabung Formulasi Pupuk Organik Cair (POC) Trichoderma
            </span>
            <span className="text-[10px] bg-white text-teal-800 px-2 py-0.5 rounded border border-teal-200 font-mono font-bold">
              Target: 120 Liter
            </span>
          </div>
          <div className="p-3 rounded-lg bg-white border border-teal-100 flex items-center justify-around gap-4 text-xs">
            <div className="text-center">
              <div className="w-12 h-16 bg-amber-100 border border-amber-300 rounded-md mx-auto flex items-end justify-center pb-1 font-bold text-amber-900">
                3 Bagian
              </div>
              <span className="text-[11px] font-semibold text-slate-700 block mt-1">Molase Tetes Tebu</span>
            </div>
            <span className="text-lg font-bold text-slate-400">:</span>
            <div className="text-center">
              <div className="w-12 h-16 bg-emerald-100 border border-emerald-300 rounded-md mx-auto flex items-end justify-center pb-1 font-bold text-emerald-900">
                7 Bagian
              </div>
              <span className="text-[11px] font-semibold text-slate-700 block mt-1">Biang Bakteri Hayati</span>
            </div>
          </div>
        </div>
      );

    case 'stage_scale':
      return (
        <div className="rounded-xl p-3 bg-gradient-to-br from-indigo-50 to-blue-50 border border-indigo-200 shadow-xs mb-3 space-y-2">
          <div className="flex items-center justify-between text-[11px] font-bold text-indigo-900">
            <span className="flex items-center gap-1.5">
              <Maximize className="w-3.5 h-3.5 text-indigo-600" />
              Perbandingan Skala Denah Panggung Seni Budaya
            </span>
            <span className="text-[10px] bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded font-bold">
              Faktor Skala k = 2
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-2.5 rounded-lg bg-white border border-indigo-100 text-center">
              <div className="w-20 h-14 bg-blue-100 border border-blue-300 rounded mx-auto flex items-center justify-center font-bold text-blue-900 text-[11px]">
                12 cm × 8 cm
              </div>
              <span className="text-[10px] text-slate-500 block mt-1 font-medium">Denah Awal (Skala 1:100)</span>
            </div>
            <div className="p-2.5 rounded-lg bg-white border border-indigo-100 text-center">
              <div className="w-28 h-16 bg-indigo-100 border border-indigo-400 rounded mx-auto flex items-center justify-center font-bold text-indigo-900 text-[11px]">
                Perbesaran k = 2
              </div>
              <span className="text-[10px] text-slate-500 block mt-1 font-medium">Denah Presentasi Baru</span>
            </div>
          </div>
        </div>
      );

    case 'pump_debit':
      return (
        <div className="rounded-xl p-3 bg-gradient-to-br from-sky-50 to-cyan-50 border border-sky-200 shadow-xs mb-3 space-y-2">
          <div className="flex items-center justify-between text-[11px] font-bold text-sky-900">
            <span className="flex items-center gap-1.5">
              <Droplets className="w-3.5 h-3.5 text-sky-600" />
              Instalasi Pompa Pengeringan Rawa Lebak Wanaraya
            </span>
            <span className="text-[10px] bg-sky-100 text-sky-800 px-2 py-0.5 rounded font-bold">
              Pemantauan Debit
            </span>
          </div>
          <div className="p-2.5 bg-white rounded-lg border border-sky-100 flex items-center justify-around text-center text-xs">
            <div>
              <span className="text-[10px] text-slate-400 block">Menit ke-15</span>
              <span className="font-mono font-bold text-sky-800">5.400 Liter</span>
            </div>
            <span className="text-slate-300">&rarr;</span>
            <div>
              <span className="text-[10px] text-slate-400 block">Menit ke-30</span>
              <span className="font-mono font-bold text-sky-800">10.800 Liter</span>
            </div>
            <span className="text-slate-300">&rarr;</span>
            <div>
              <span className="text-[10px] text-slate-400 block">Menit ke-60</span>
              <span className="font-mono font-bold text-sky-800">21.600 Liter</span>
            </div>
          </div>
        </div>
      );

    default:
      return null;
  }
};
