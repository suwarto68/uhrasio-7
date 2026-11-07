import React, { useState } from 'react';
import { MATERIALS_DATA, INFOGRAPHIC_META } from '../data/materialsData';
import { 
  BookOpen, 
  ExternalLink, 
  Sliders, 
  Calculator, 
  Layers, 
  Sparkles, 
  Check, 
  HelpCircle,
  Eye,
  Maximize2,
  RefreshCw
} from 'lucide-react';

interface MaterialsViewProps {
  onGoToExam: () => void;
}

export const MaterialsView: React.FC<MaterialsViewProps> = ({ onGoToExam }) => {
  const [selectedSectionId, setSelectedSectionId] = useState<string>('konsep-rasio');
  const [showInfographicModal, setShowInfographicModal] = useState<boolean>(false);

  // Interactive Simulator States
  // Lab 1: Rasio vs Selisih
  const [qtyA, setQtyA] = useState<number>(150);
  const [qtyB, setQtyB] = useState<number>(90);

  // Lab 2: Skala Peta
  const [mapDistanceCm, setMapDistanceCm] = useState<number>(4);
  const [scaleDenominator, setScaleDenominator] = useState<number>(250000);

  // Lab 3: Proporsi Senilai (a / b = c / x)
  const [propA, setPropA] = useState<number>(6);
  const [propB, setPropB] = useState<number>(450);
  const [propC, setPropC] = useState<number>(24);

  // Lab 4: Laju Satuan / Best Buy
  const [prod1Price, setProd1Price] = useState<number>(45000);
  const [prod1Weight, setProd1Weight] = useState<number>(3);
  const [prod2Price, setProd2Price] = useState<number>(70000);
  const [prod2Weight, setProd2Weight] = useState<number>(5);

  const activeSection = MATERIALS_DATA.find(s => s.id === selectedSectionId) || MATERIALS_DATA[0];

  // Helper gcd for ratio
  const gcd = (a: number, b: number): number => {
    a = Math.round(Math.abs(a));
    b = Math.round(Math.abs(b));
    while (b) {
      const t = b;
      b = a % b;
      a = t;
    }
    return a || 1;
  };

  const currentGcd = gcd(qtyA, qtyB);
  const simpleA = Math.round(qtyA / currentGcd);
  const simpleB = Math.round(qtyB / currentGcd);
  const difference = Math.abs(qtyA - qtyB);

  // Lab 2 calculation
  const actualDistanceKm = ((mapDistanceCm * scaleDenominator) / 100000).toFixed(2);

  // Lab 3 calculation (x = (b * c) / a)
  const propX = propA > 0 ? ((propB * propC) / propA).toFixed(1) : '0';

  // Lab 4 calculation
  const rate1 = prod1Weight > 0 ? Math.round(prod1Price / prod1Weight) : 0;
  const rate2 = prod2Weight > 0 ? Math.round(prod2Price / prod2Weight) : 0;

  return (
    <div className="space-y-8 pb-12">
      {/* Banner Materi & Sumber Infografis */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 mb-2">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Menu 2: Modul Pembelajaran Interaktif & Infografis</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Materi Bab 3: Rasio Kelas 7 SMP
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
              Materi disusun berpedoman pada silabus Kurikulum Merdeka dan rujukan infografis visual resmi. Dilengkapi simulasi interaktif untuk memperkuat pemahaman konsep rasio, skala, proporsi, dan laju satuan.
            </p>
          </div>

          {/* Kartu Rujukan Infografis */}
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-4 rounded-xl border border-emerald-200 flex flex-col gap-2.5 shrink-0 max-w-sm">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                Rujukan Infografis
              </span>
              <span className="text-[10px] bg-emerald-200 text-emerald-900 px-2 py-0.5 rounded font-semibold">
                FreeImage.host
              </span>
            </div>
            <p className="text-xs text-slate-700 leading-snug">
              Bagan infografis konsep Rasio & Perbandingan Kurikulum Matematika SMP.
            </p>
            <div className="flex items-center gap-2 pt-1">
              <button
                onClick={() => setShowInfographicModal(true)}
                className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 transition-colors shadow-xs"
              >
                <Eye className="w-3.5 h-3.5" />
                Lihat Infografis
              </button>
              <a
                href={INFOGRAPHIC_META.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-lg bg-white hover:bg-slate-50 text-emerald-700 text-xs font-semibold border border-emerald-300 flex items-center gap-1 transition-colors"
              >
                <ExternalLink className="w-3 h-3" />
                Buka Link Asli
              </a>
            </div>
          </div>
        </div>

        {/* Tab 4 Sub-Materi */}
        <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-2 pt-6 border-t border-slate-100">
          {MATERIALS_DATA.map((sec) => (
            <button
              key={sec.id}
              onClick={() => setSelectedSectionId(sec.id)}
              className={`p-3 rounded-xl text-left transition-all border ${
                selectedSectionId === sec.id
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
              }`}
            >
              <span className={`text-[11px] font-bold block ${selectedSectionId === sec.id ? 'text-emerald-100' : 'text-emerald-600'}`}>
                Sub-Bab {sec.number}
              </span>
              <p className="text-xs font-bold truncate leading-tight mt-0.5">
                {sec.title}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Main Material Section Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Kolom Penjelasan & Rumus (7 kolom) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-700 bg-emerald-100/70 px-3 py-1 rounded-md">
                Sub-Materi {activeSection.number}
              </span>
              <span className="text-xs text-slate-500 font-medium">
                Ringkasan Bab 3 Rasio
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              {activeSection.title}
            </h2>

            <p className="text-xs sm:text-sm text-slate-700 font-medium bg-emerald-50/50 p-3.5 rounded-xl border border-emerald-100">
              {activeSection.summary}
            </p>

            <div className="space-y-3 pt-2">
              {activeSection.content.map((paragraph, pIdx) => (
                <p key={pIdx} className="text-xs sm:text-sm text-slate-600 leading-relaxed text-justify">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Rumus Cepat */}
            <div className="pt-4 border-t border-slate-100">
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <Calculator className="w-4 h-4 text-emerald-600" />
                Rumus dan Kaidah Operasi
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {activeSection.quickFormulas.map((form, fIdx) => (
                  <div key={fIdx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-[11px] font-bold text-slate-500 block mb-0.5">{form.label}</span>
                    <span className="font-mono text-xs sm:text-sm font-extrabold text-blue-700 block mb-1">{form.formula}</span>
                    <span className="text-[11px] text-slate-600 leading-tight block">{form.desc}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Fakta Kontekstual Wanaraya */}
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs sm:text-sm text-amber-900 leading-relaxed">
              <strong className="font-bold flex items-center gap-1.5 text-amber-800 mb-1">
                <Sparkles className="w-4 h-4 text-amber-600" />
                Tahukah Kamu? (Konteks Kalimantan Selatan)
              </strong>
              {activeSection.didYouKnow}
            </div>
          </div>
        </div>

        {/* Kolom Simulator Interaktif (5 kolom) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-2xl p-6 border-2 border-emerald-300 shadow-sm space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-emerald-100 text-emerald-800">
                  <Sliders className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Lab Simulasi Interaktif</h3>
                  <p className="text-[11px] text-slate-500">Ubah nilai untuk melihat perubahan langsung</p>
                </div>
              </div>
              <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">
                Live Model
              </span>
            </div>

            {/* Simulator 1: Rasio vs Selisih */}
            {activeSection.interactiveType === 'ratio_compare' && (
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                    <span>Kuantitas A (Jeruk Siam):</span>
                    <span className="font-mono font-bold text-emerald-700">{qtyA} kg</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="300"
                    step="10"
                    value={qtyA}
                    onChange={(e) => setQtyA(Number(e.target.value))}
                    className="w-full accent-emerald-600"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                    <span>Kuantitas B (Jeruk Madu):</span>
                    <span className="font-mono font-bold text-blue-700">{qtyB} kg</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="300"
                    step="10"
                    value={qtyB}
                    onChange={(e) => setQtyB(Number(e.target.value))}
                    className="w-full accent-blue-600"
                  />
                </div>

                {/* Hasil Live Komparasi */}
                <div className="p-4 rounded-xl bg-slate-900 text-white space-y-3 shadow-inner">
                  <div className="flex items-center justify-between border-b border-slate-700 pb-2">
                    <span className="text-xs text-slate-300">Rasio Mentah (A : B):</span>
                    <span className="font-mono font-bold text-amber-300">{qtyA} : {qtyB}</span>
                  </div>

                  <div className="flex items-center justify-between border-b border-slate-700 pb-2">
                    <span className="text-xs text-slate-300">Rasio Sederhana (FPB = {currentGcd}):</span>
                    <span className="font-mono font-bold text-emerald-400 text-base">{simpleA} : {simpleB}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-300">Selisih Aditif (|A - B|):</span>
                    <span className="font-mono font-bold text-sky-300">{difference} kg</span>
                  </div>
                </div>

                <p className="text-[11px] text-slate-500 italic text-center">
                  💡 Amati: Mengalikan kedua nilai tidak merubah rasio ({simpleA} : {simpleB}), namun nilai selisih ({difference} kg) akan berubah!
                </p>
              </div>
            )}

            {/* Simulator 2: Faktor Skala Peta */}
            {activeSection.interactiveType === 'scale_calc' && (
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Jarak pada Peta (cm):
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={mapDistanceCm}
                    onChange={(e) => setMapDistanceCm(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 font-mono"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Penyebut Skala (1 : N):
                  </label>
                  <select
                    value={scaleDenominator}
                    onChange={(e) => setScaleDenominator(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value={50000}>1 : 50.000 (Peta Kecamatan Wanaraya)</option>
                    <option value={200000}>1 : 200.000 (Peta Kabupaten Batola)</option>
                    <option value={250000}>1 : 250.000 (Standar Soal 2)</option>
                    <option value={500000}>1 : 500.000 (Peta Provinsi Kalsel)</option>
                    <option value={1000000}>1 : 1.000.000 (Peta Pulau Kalimantan)</option>
                  </select>
                </div>

                <div className="p-4 rounded-xl bg-slate-900 text-white space-y-2.5 shadow-inner">
                  <div className="text-[11px] text-slate-400">Jarak Sebenarnya di Lapangan:</div>
                  <div className="text-2xl font-black font-mono text-emerald-400">
                    {actualDistanceKm} <span className="text-sm font-sans font-bold text-white">km</span>
                  </div>
                  <div className="text-[11px] text-slate-300 pt-1 border-t border-slate-800">
                    = {(mapDistanceCm * scaleDenominator).toLocaleString('id-ID')} cm = {((mapDistanceCm * scaleDenominator) / 100).toLocaleString('id-ID')} meter
                  </div>
                </div>
              </div>
            )}

            {/* Simulator 3: Proporsi Senilai (a / b = c / x) */}
            {activeSection.interactiveType === 'proportion_calc' && (
              <div className="space-y-4">
                <p className="text-xs text-slate-600">
                  Selesaikan persamaan proporsi: <span className="font-mono font-bold text-blue-700">a / b = c / x</span>
                </p>

                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="text-[10px] font-bold text-slate-500">Nilai a</label>
                    <input
                      type="number"
                      value={propA}
                      onChange={(e) => setPropA(Number(e.target.value))}
                      className="w-full px-2 py-1.5 text-xs border border-slate-300 rounded font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500">Nilai b</label>
                    <input
                      type="number"
                      value={propB}
                      onChange={(e) => setPropB(Number(e.target.value))}
                      className="w-full px-2 py-1.5 text-xs border border-slate-300 rounded font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500">Nilai c</label>
                    <input
                      type="number"
                      value={propC}
                      onChange={(e) => setPropC(Number(e.target.value))}
                      className="w-full px-2 py-1.5 text-xs border border-slate-300 rounded font-mono"
                    />
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-900 text-white space-y-2 shadow-inner">
                  <div className="text-xs text-slate-300">Langkah Perkalian Silang:</div>
                  <div className="font-mono text-xs text-amber-300">
                    {propA} × x = {propB} × {propC} ({propB * propC})
                  </div>
                  <div className="text-xs text-slate-300 pt-1">Hasil Variabel x:</div>
                  <div className="text-2xl font-black font-mono text-emerald-400">
                    x = {propX}
                  </div>
                </div>
              </div>
            )}

            {/* Simulator 4: Laju Satuan / Best Buy */}
            {activeSection.interactiveType === 'unit_rate_calc' && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  {/* Paket 1 */}
                  <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 space-y-2">
                    <span className="text-[11px] font-bold text-blue-700 block">Toko A</span>
                    <div>
                      <span className="text-[10px] text-slate-500">Harga (Rp):</span>
                      <input
                        type="number"
                        value={prod1Price}
                        step="1000"
                        onChange={(e) => setProd1Price(Number(e.target.value))}
                        className="w-full px-2 py-1 text-xs border border-slate-300 rounded font-mono"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500">Berat (kg):</span>
                      <input
                        type="number"
                        value={prod1Weight}
                        onChange={(e) => setProd1Weight(Number(e.target.value))}
                        className="w-full px-2 py-1 text-xs border border-slate-300 rounded font-mono"
                      />
                    </div>
                    <div className="pt-1 text-xs font-bold text-slate-800">
                      = Rp {rate1.toLocaleString('id-ID')}/kg
                    </div>
                  </div>

                  {/* Paket 2 */}
                  <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 space-y-2">
                    <span className="text-[11px] font-bold text-emerald-700 block">Toko B</span>
                    <div>
                      <span className="text-[10px] text-slate-500">Harga (Rp):</span>
                      <input
                        type="number"
                        value={prod2Price}
                        step="1000"
                        onChange={(e) => setProd2Price(Number(e.target.value))}
                        className="w-full px-2 py-1 text-xs border border-slate-300 rounded font-mono"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500">Berat (kg):</span>
                      <input
                        type="number"
                        value={prod2Weight}
                        onChange={(e) => setProd2Weight(Number(e.target.value))}
                        className="w-full px-2 py-1 text-xs border border-slate-300 rounded font-mono"
                      />
                    </div>
                    <div className="pt-1 text-xs font-bold text-slate-800">
                      = Rp {rate2.toLocaleString('id-ID')}/kg
                    </div>
                  </div>
                </div>

                <div className={`p-3.5 rounded-xl text-center text-xs font-bold ${
                  rate1 < rate2 
                    ? 'bg-blue-100 text-blue-900 border border-blue-300' 
                    : rate2 < rate1 
                    ? 'bg-emerald-100 text-emerald-900 border border-emerald-300' 
                    : 'bg-amber-100 text-amber-900'
                }`}>
                  {rate1 < rate2 && `🎉 Toko A lebih hemat Rp ${(rate2 - rate1).toLocaleString('id-ID')}/kg!`}
                  {rate2 < rate1 && `🎉 Toko B lebih hemat Rp ${(rate1 - rate2).toLocaleString('id-ID')}/kg!`}
                  {rate1 === rate2 && 'Harga satuan kedua toko sama persis!'}
                </div>
              </div>
            )}

            <button
              onClick={onGoToExam}
              className="w-full py-2.5 rounded-xl bg-amber-400 hover:bg-amber-500 text-blue-950 font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5"
            >
              <HelpCircle className="w-4 h-4" />
              Uji Pemahaman di Ujian CBT (20 Soal)
            </button>
          </div>
        </div>

      </div>

      {/* Modal Dialog Tampilan Penuh Infografis */}
      {showInfographicModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900">
                  {INFOGRAPHIC_META.title}
                </h3>
                <p className="text-xs text-slate-500">Rujukan infografis Bab 3 Rasio Kelas 7</p>
              </div>
              <button
                onClick={() => setShowInfographicModal(false)}
                className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold"
              >
                Tutup
              </button>
            </div>

            {/* Embed Image / Preview */}
            <div className="rounded-xl overflow-hidden border border-slate-200 bg-slate-100 flex flex-col items-center justify-center p-2 min-h-[300px]">
              <img
                src={INFOGRAPHIC_META.sourceUrl}
                alt={INFOGRAPHIC_META.alt}
                className="max-h-[60vh] object-contain rounded-lg"
                onError={(e) => {
                  // Fallback jika direct image host membatasi hotlink
                  const target = e.currentTarget;
                  target.style.display = 'none';
                  const parent = target.parentElement;
                  if (parent && !parent.querySelector('.infographic-fallback')) {
                    const fallbackDiv = document.createElement('div');
                    fallbackDiv.className = 'infographic-fallback p-6 text-center space-y-3';
                    fallbackDiv.innerHTML = `
                      <p class="text-sm font-bold text-slate-800">Infografis Bab 3: Rasio - Matematika SMP Kelas 7</p>
                      <p class="text-xs text-slate-500">Klik tombol di bawah untuk membuka gambar infografis asli beresolusi penuh:</p>
                      <a href="${INFOGRAPHIC_META.sourceUrl}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold shadow hover:bg-emerald-700">
                        Buka Infografis di Tab Baru &rarr;
                      </a>
                    `;
                    parent.appendChild(fallbackDiv);
                  }
                }}
              />
            </div>

            {/* Poin Rangkuman Inti Infografis */}
            <div className="space-y-2 pt-2">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Intisari Infografis:
              </h4>
              <ul className="text-xs text-slate-600 space-y-1.5 list-disc list-inside">
                {INFOGRAPHIC_META.highlights.map((point, idx) => (
                  <li key={idx} className="leading-relaxed">{point}</li>
                ))}
              </ul>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
              <a
                href={INFOGRAPHIC_META.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                Buka Link Sumber
              </a>
              <button
                onClick={() => setShowInfographicModal(false)}
                className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-semibold"
              >
                Selesai
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
