import React, { useState } from 'react';
import { GOOGLE_APPS_SCRIPT_SOURCE } from '../utils/appsScriptCode';
import { 
  FileCode, 
  Copy, 
  Check, 
  ExternalLink, 
  X, 
  Table, 
  Database, 
  Sparkles,
  HelpCircle,
  AlertCircle
} from 'lucide-react';

interface AppsScriptGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  appsScriptUrl: string;
  onSaveUrl: (url: string) => void;
  onTestConnection: (url: string) => Promise<{ success: boolean; message: string }>;
}

export const AppsScriptGuideModal: React.FC<AppsScriptGuideModalProps> = ({
  isOpen,
  onClose,
  appsScriptUrl,
  onSaveUrl,
  onTestConnection
}) => {
  const [copied, setCopied] = useState<boolean>(false);
  const [inputUrl, setInputUrl] = useState<string>(appsScriptUrl);
  const [testStatus, setTestStatus] = useState<{ loading: boolean; success?: boolean; message?: string }>({
    loading: false
  });

  if (!isOpen) return null;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(GOOGLE_APPS_SCRIPT_SOURCE);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleRunTest = async () => {
    if (!inputUrl.trim()) {
      setTestStatus({ loading: false, success: false, message: 'Masukkan URL Web App terlebih dahulu.' });
      return;
    }
    setTestStatus({ loading: true });
    const res = await onTestConnection(inputUrl.trim());
    setTestStatus({ loading: false, success: res.success, message: res.message });
    if (res.success) {
      onSaveUrl(inputUrl.trim());
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[92vh] overflow-y-auto p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-6 animate-in fade-in zoom-in-95">
        
        {/* Header Modal */}
        <div className="flex items-start justify-between border-b border-slate-200 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-emerald-100 text-emerald-800">
              <Database className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-extrabold text-slate-900">
                Panduan Integrasi Google Spreadsheet & Apps Script
              </h2>
              <p className="text-xs text-slate-500">
                SMP Negeri 1 Wanaraya · Sinkronisasi Sheet <code className="font-bold text-blue-700">UserLogin</code> & <code className="font-bold text-emerald-700">JawabanUjian</code>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Jawaban Langsung untuk 3 Pertanyaan User */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200 space-y-1">
            <strong className="font-bold text-blue-900 block">1. Indikator Koneksi Live</strong>
            <p className="text-slate-600 leading-relaxed">
              Terdapat badge status koneksi live di header aplikasi. Memanggil fungsi <code className="font-mono font-bold text-blue-800">action=ping</code> untuk verifikasi handshake secara real-time.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 space-y-1">
            <strong className="font-bold text-emerald-900 block">2. Simpan Jawaban Ujian</strong>
            <p className="text-slate-600 leading-relaxed">
              Data Nama, Kelas, Waktu, Durasi, Skor, dan Jawaban per nomor tersimpan otomatis di sheet <code className="font-mono font-bold text-emerald-800">JawabanUjian</code> via <code className="font-mono font-bold text-emerald-800">action=submitExam</code>.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-purple-50 border border-purple-200 space-y-1">
            <strong className="font-bold text-purple-900 block">3. Data Kode, Nama & Token</strong>
            <p className="text-slate-600 leading-relaxed">
              Data kredensial tersinkron dua arah pada sheet <code className="font-mono font-bold text-purple-800">UserLogin</code> via fungsi <code className="font-mono font-bold text-purple-800">action=getUsers</code> dan <code className="font-mono font-bold text-purple-800">action=syncStudents</code>.
            </p>
          </div>
        </div>

        {/* Langkah-Langkah Pemasangan */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
            Langkah Cepat Pemasangan (Hanya 3 Menit):
          </h3>
          <ol className="text-xs text-slate-700 space-y-2 list-decimal list-inside bg-slate-50 p-4 rounded-xl border border-slate-200">
            <li>Buka tab baru dan buat Google Spreadsheet di <a href="https://sheets.new" target="_blank" rel="noopener noreferrer" className="text-blue-600 font-bold hover:underline inline-flex items-center gap-0.5">sheets.new <ExternalLink className="w-3 h-3" /></a></li>
            <li>Klik menu <strong>Ekstensi &gt; Apps Script</strong>.</li>
            <li>Hapus seluruh kode bawaan editor, lalu <strong>salin dan tempelkan kode Apps Script di bawah ini</strong>.</li>
            <li>Klik tombol biru <strong>Terapkan (Deploy) &gt; Penerapan baru (New deployment)</strong>.</li>
            <li>Pilih jenis <strong>Aplikasi Web (Web App)</strong>.</li>
            <li>
              Atur: Jalankan sebagai <strong>&quot;Saya&quot; (Me)</strong>, dan Siapa yang memiliki akses pilih <strong>&quot;Siapa saja&quot; (Anyone)</strong>.
            </li>
            <li>Klik <strong>Terapkan</strong>, berikan otorisasi izin akun Google Anda, lalu salin <strong>URL Aplikasi Web</strong> yang berakhiran <code className="font-mono bg-slate-200 px-1 py-0.5 rounded text-[11px]">/exec</code>.</li>
            <li>Tempelkan URL tersebut pada kolom input di bawah ini, lalu klik <strong>Simpan &amp; Uji Koneksi</strong>.</li>
          </ol>
        </div>

        {/* Input URL & Tes Langsung */}
        <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200 space-y-3">
          <label className="text-xs font-bold text-slate-800 block">
            Tempelkan URL Web App Google Apps Script di Sini:
          </label>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="url"
              placeholder="https://script.google.com/macros/s/AKfycb.../exec"
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
              className="flex-1 px-3.5 py-2 text-xs font-mono rounded-xl border border-slate-300 bg-white focus:ring-2 focus:ring-blue-600"
            />
            <button
              onClick={handleRunTest}
              disabled={testStatus.loading}
              className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs shrink-0 transition-colors"
            >
              {testStatus.loading ? 'Menguji...' : 'Simpan & Uji Koneksi'}
            </button>
          </div>

          {testStatus.message && (
            <div className={`p-2.5 rounded-lg text-xs font-semibold flex items-center gap-2 ${
              testStatus.success ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
            }`}>
              {testStatus.success ? <Check className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
              <span>{testStatus.message}</span>
            </div>
          )}
        </div>

        {/* Kotak Kode Apps Script (Siap Salin) */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
              <FileCode className="w-4 h-4 text-emerald-600" />
              Kode Lengkap Google Apps Script (<code className="font-mono text-emerald-700 font-bold">Code.gs</code>)
            </span>
            <button
              onClick={handleCopyCode}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors shadow-xs ${
                copied ? 'bg-emerald-600 text-white' : 'bg-slate-900 hover:bg-slate-800 text-white'
              }`}
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Tersalin ke Clipboard!' : 'Salin Seluruh Kode'}</span>
            </button>
          </div>

          <div className="relative rounded-xl overflow-hidden border border-slate-800 bg-slate-950 text-slate-200">
            <pre className="p-4 text-[11px] font-mono overflow-x-auto max-h-[300px] leading-relaxed custom-scrollbar">
              <code>{GOOGLE_APPS_SCRIPT_SOURCE}</code>
            </pre>
          </div>
        </div>

        <div className="flex justify-end pt-2 border-t border-slate-100">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold"
          >
            Tutup Panduan
          </button>
        </div>

      </div>
    </div>
  );
};
