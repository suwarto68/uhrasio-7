import React, { useState, useEffect, useMemo } from 'react';
import { 
  Question, 
  SingleChoiceQuestion, 
  ComplexMcmaQuestion, 
  ComplexKategoriQuestion, 
  StudentUser, 
  StudentAnswer, 
  ExamSubmission, 
  AppSettings 
} from '../types';
import { QUESTIONS_DATA } from '../data/questionsData';
import { submitExamToSpreadsheet } from '../services/apiService';
import { QuestionStimulusVisual } from './QuestionStimulusVisual';
import { 
  Clock, 
  CheckCircle2, 
  HelpCircle, 
  Grid, 
  Send, 
  LogOut, 
  ChevronLeft, 
  ChevronRight, 
  AlertTriangle, 
  Sparkles, 
  Check, 
  X, 
  Award,
  RefreshCw,
  Eye,
  FileSpreadsheet,
  Home
} from 'lucide-react';

interface ExamViewProps {
  currentUser: StudentUser;
  tokenUsed: string;
  settings: AppSettings;
  onLogout: () => void;
  onExamComplete: (submission: ExamSubmission) => void;
  onBackToHome: () => void;
}

export const ExamView: React.FC<ExamViewProps> = ({
  currentUser,
  tokenUsed,
  settings,
  onLogout,
  onExamComplete,
  onBackToHome
}) => {
  // Soal Acak untuk setiap siswa: acak urutan berdasarkan seed username
  const shuffledQuestions = useMemo(() => {
    const list = [...QUESTIONS_DATA];
    // Deterministic shuffle per student so it stays consistent during their session
    let seed = 0;
    for (let i = 0; i < currentUser.username.length; i++) {
      seed = (seed * 31 + currentUser.username.charCodeAt(i)) % 10007;
    }
    for (let i = list.length - 1; i > 0; i--) {
      seed = (seed * 9301 + 49297) % 233280;
      const j = Math.floor((seed / 233280) * (i + 1));
      [list[i], list[j]] = [list[j], list[i]];
    }
    return list;
  }, [currentUser.username]);

  const sessionKey = `cbt_session_${currentUser.username}`;

  // Initial restoration from localStorage if available
  const initialSession = useMemo(() => {
    try {
      const stored = localStorage.getItem(sessionKey);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      // fallback
    }
    return null;
  }, [sessionKey]);

  // Current Question Index (0 - 19)
  const [currentIndex, setCurrentIndex] = useState<number>(() => {
    if (initialSession && typeof initialSession.currentIndex === 'number') {
      return Math.min(Math.max(0, initialSession.currentIndex), shuffledQuestions.length - 1);
    }
    return 0;
  });

  // Answers State: Record of question id to StudentAnswer
  const [answers, setAnswers] = useState<Record<number, StudentAnswer>>(() => {
    if (initialSession && initialSession.answers) {
      return initialSession.answers;
    }
    return {};
  });

  // Timer State (in seconds)
  const [secondsRemaining, setSecondsRemaining] = useState<number>(() => {
    if (initialSession && typeof initialSession.secondsRemaining === 'number' && initialSession.secondsRemaining > 0) {
      return initialSession.secondsRemaining;
    }
    return settings.examDurationMinutes * 60;
  });
  const [isTimeUp, setIsTimeUp] = useState<boolean>(false);

  // UI Modals
  const [showQuestionDrawer, setShowQuestionDrawer] = useState<boolean>(false);
  const [showConfirmSubmitModal, setShowConfirmSubmitModal] = useState<boolean>(false);
  const [showExitConfirmModal, setShowExitConfirmModal] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [examResult, setExamResult] = useState<ExamSubmission | null>(null);

  // Auto-sync current session to localStorage
  useEffect(() => {
    if (!examResult) {
      try {
        localStorage.setItem(sessionKey, JSON.stringify({
          currentIndex,
          answers,
          secondsRemaining
        }));
      } catch {
        // ignore storage errors
      }
    }
  }, [currentIndex, answers, secondsRemaining, examResult, sessionKey]);

  // Current Active Question
  const currentQuestion = shuffledQuestions[currentIndex] || shuffledQuestions[0];
  const currentAnswer = answers[currentQuestion.id] || {
    questionId: currentQuestion.id,
    questionNumber: currentIndex + 1,
    type: currentQuestion.type,
    answer: currentQuestion.type === 'pgk_mcma' ? [] : currentQuestion.type === 'pgk_kategori' ? {} : '',
    isDoubtful: false,
    isAnswered: false
  };

  // Timer Countdown Effect
  useEffect(() => {
    if (examResult) return; // Ujian telah selesai

    const interval = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsTimeUp(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [examResult]);

  // Auto-submit saat waktu habis
  useEffect(() => {
    if (isTimeUp && !examResult) {
      handleFinalSubmit();
    }
  }, [isTimeUp, examResult]);

  // Format Timer HH:MM:SS
  const formatTimer = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  // Count answered questions
  const answeredCount = useMemo(() => {
    return Object.values(answers).filter(a => a.isAnswered).length;
  }, [answers]);

  const doubtfulCount = useMemo(() => {
    return Object.values(answers).filter(a => a.isDoubtful).length;
  }, [answers]);

  // Progress Bar Percentage
  const progressPercent = Math.round((answeredCount / shuffledQuestions.length) * 100);

  // Update Answer Handlers
  const handleSelectSingle = (optionLabel: string) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: {
        questionId: currentQuestion.id,
        questionNumber: currentIndex + 1,
        type: 'pg',
        answer: optionLabel,
        isDoubtful: prev[currentQuestion.id]?.isDoubtful || false,
        isAnswered: true
      }
    }));
  };

  const handleToggleMcma = (optionId: string) => {
    const currentList: string[] = Array.isArray(currentAnswer.answer) ? currentAnswer.answer : [];
    let updatedList: string[];
    if (currentList.includes(optionId)) {
      updatedList = currentList.filter(id => id !== optionId);
    } else {
      updatedList = [...currentList, optionId].sort();
    }

    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: {
        questionId: currentQuestion.id,
        questionNumber: currentIndex + 1,
        type: 'pgk_mcma',
        answer: updatedList,
        isDoubtful: prev[currentQuestion.id]?.isDoubtful || false,
        isAnswered: updatedList.length > 0
      }
    }));
  };

  const handleSelectKategori = (statementId: string, choice: 'Benar' | 'Salah') => {
    const currentObj: Record<string, 'Benar' | 'Salah'> = 
      typeof currentAnswer.answer === 'object' && !Array.isArray(currentAnswer.answer) 
        ? { ...currentAnswer.answer } 
        : {};

    currentObj[statementId] = choice;

    const kategoriQ = currentQuestion as ComplexKategoriQuestion;
    const allStatementsAnswered = kategoriQ.statements.every(s => currentObj[s.id] !== undefined);

    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: {
        questionId: currentQuestion.id,
        questionNumber: currentIndex + 1,
        type: 'pgk_kategori',
        answer: currentObj,
        isDoubtful: prev[currentQuestion.id]?.isDoubtful || false,
        isAnswered: allStatementsAnswered
      }
    }));
  };

  const handleToggleDoubtful = () => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: {
        ...currentAnswer,
        questionId: currentQuestion.id,
        questionNumber: currentIndex + 1,
        type: currentQuestion.type,
        isDoubtful: !currentAnswer.isDoubtful
      }
    }));
  };

  // Navigasi Soal
  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < shuffledQuestions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  // Hitung Skor & Kirim ke Google Spreadsheet (sheet JawabanUjian)
  const handleFinalSubmit = async () => {
    setIsSubmitting(true);

    let totalPoints = 0; // max 20 points
    let pemahamanCorrect = 0;
    let pemahamanTotal = 0;
    let aplikasiCorrect = 0;
    let aplikasiTotal = 0;
    let penalaranCorrect = 0;
    let penalaranTotal = 0;

    const answerRecord: Record<number, any> = {};

    shuffledQuestions.forEach(q => {
      const studentAns = answers[q.id];
      answerRecord[q.id] = studentAns?.answer || '-';

      // Hitung total kategori soal
      if (q.level === 'Pemahaman') pemahamanTotal++;
      if (q.level === 'Aplikasi') aplikasiTotal++;
      if (q.level === 'Penalaran') penalaranTotal++;

      if (!studentAns || !studentAns.isAnswered) {
        return; // Tidak dijawab
      }

      if (q.type === 'pg') {
        const sq = q as SingleChoiceQuestion;
        if (studentAns.answer === sq.correctAnswer) {
          totalPoints += 1;
          if (q.level === 'Pemahaman') pemahamanCorrect++;
          if (q.level === 'Aplikasi') aplikasiCorrect++;
          if (q.level === 'Penalaran') penalaranCorrect++;
        }
      } else if (q.type === 'pgk_mcma') {
        const mq = q as ComplexMcmaQuestion;
        const selected = Array.isArray(studentAns.answer) ? studentAns.answer : [];
        const isExactMatch = 
          selected.length === mq.correctAnswers.length &&
          selected.every(val => mq.correctAnswers.includes(val));
        
        if (isExactMatch) {
          totalPoints += 1;
          if (q.level === 'Pemahaman') pemahamanCorrect++;
          if (q.level === 'Aplikasi') aplikasiCorrect++;
          if (q.level === 'Penalaran') penalaranCorrect++;
        } else {
          // Parsial jika separuh benar
          const correctPicks = selected.filter(val => mq.correctAnswers.includes(val)).length;
          const wrongPicks = selected.filter(val => !mq.correctAnswers.includes(val)).length;
          if (wrongPicks === 0 && correctPicks > 0) {
            const partial = correctPicks / mq.correctAnswers.length;
            totalPoints += partial;
            if (q.level === 'Penalaran') penalaranCorrect += partial;
          }
        }
      } else if (q.type === 'pgk_kategori') {
        const kq = q as ComplexKategoriQuestion;
        const userObj = studentAns.answer as Record<string, 'Benar' | 'Salah'>;
        let correctStatements = 0;
        kq.statements.forEach(st => {
          if (userObj[st.id] === st.correctAnswer) {
            correctStatements++;
          }
        });
        const scoreFraction = correctStatements / kq.statements.length;
        totalPoints += scoreFraction;
        if (scoreFraction === 1) {
          if (q.level === 'Pemahaman') pemahamanCorrect++;
          if (q.level === 'Aplikasi') aplikasiCorrect++;
          if (q.level === 'Penalaran') penalaranCorrect++;
        }
      }
    });

    const scaledScore = Math.round((totalPoints / shuffledQuestions.length) * 100);
    const durationSpentMinutes = Math.max(1, Math.round((settings.examDurationMinutes * 60 - secondsRemaining) / 60));

    const submission: ExamSubmission = {
      id: 'sub-' + Date.now(),
      username: currentUser.username,
      studentName: currentUser.name,
      studentClass: currentUser.class,
      tokenUsed: tokenUsed,
      submittedAt: new Date().toISOString(),
      durationSpentMinutes: durationSpentMinutes,
      totalScore: scaledScore,
      correctCount: Math.round(totalPoints * 10) / 10,
      totalQuestions: shuffledQuestions.length,
      answers: answerRecord,
      scoreByLevel: {
        pemahaman: {
          correct: pemahamanCorrect,
          total: pemahamanTotal,
          score: pemahamanTotal > 0 ? Math.round((pemahamanCorrect / pemahamanTotal) * 100) : 0
        },
        aplikasi: {
          correct: aplikasiCorrect,
          total: aplikasiTotal,
          score: aplikasiTotal > 0 ? Math.round((aplikasiCorrect / aplikasiTotal) * 100) : 0
        },
        penalaran: {
          correct: penalaranCorrect,
          total: penalaranTotal,
          score: penalaranTotal > 0 ? Math.round((penalaranCorrect / penalaranTotal) * 100) : 0
        }
      },
      syncedToSheet: false
    };

    // Kirim ke Google Apps Script (Sheet: JawabanUjian)
    await submitExamToSpreadsheet(settings.googleAppsScriptUrl, submission);

    try {
      localStorage.removeItem(sessionKey);
    } catch {
      // ignore
    }

    setIsSubmitting(false);
    setShowConfirmSubmitModal(false);
    setExamResult(submission);
    onExamComplete(submission);
  };

  // ==========================================
  // JIKA UJIAN SELESAI -> TAMPILKAN HASIL SKOR
  // ==========================================
  if (examResult) {
    return (
      <div className="max-w-3xl mx-auto py-8 px-4 space-y-6">
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xl text-center space-y-5 animate-in fade-in zoom-in-95">
          <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
            <Award className="w-10 h-10" />
          </div>

          <div>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 inline-block mb-2">
              Ujian Berhasil Diselesaikan & Disimpan
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Hasil Ujian Formatif Bab 3: Rasio
            </h1>
            <p className="text-sm text-slate-600 mt-1">
              SMP Negeri 1 Wanaraya · Tahun Ajaran 2026/2027
            </p>
          </div>

          {/* Rincian Identitas Siswa */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200 text-left text-xs">
            <div>
              <span className="text-slate-400 block text-[10px]">Nama Peserta:</span>
              <span className="font-bold text-slate-800">{examResult.studentName}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px]">Kelas:</span>
              <span className="font-bold text-slate-800">{examResult.studentClass}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px]">Waktu Pengerjaan:</span>
              <span className="font-bold text-slate-800">{examResult.durationSpentMinutes} Menit</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px]">Status Spreadsheet:</span>
              <span className="font-bold text-emerald-600 flex items-center gap-1">
                <Check className="w-3.5 h-3.5" /> Tersimpan
              </span>
            </div>
          </div>

          {/* Nilai / Skor Utama (0 - 100) */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-900 to-indigo-950 text-white shadow-md">
            <span className="text-xs font-semibold text-blue-200 uppercase tracking-wider block">
              Skor Akhir Ujian (Skala 100)
            </span>
            <div className="text-5xl sm:text-6xl font-black font-mono text-amber-300 my-2">
              {examResult.totalScore}
            </div>
            <p className="text-xs text-blue-200">
              Total Benar: <strong>{examResult.correctCount}</strong> dari {examResult.totalQuestions} Soal
            </p>
          </div>

          {/* Penguraian Per Level Kognitif TKA Puspendik */}
          <div className="space-y-3 pt-2">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider text-left">
              Capaian Berdasarkan Level Kognitif TKA Puspendik:
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200 text-left">
                <span className="text-[11px] font-bold text-blue-800 block">Pemahaman (10%)</span>
                <span className="text-xl font-mono font-black text-blue-900">{examResult.scoreByLevel.pemahaman.score}</span>
                <span className="text-[10px] text-blue-600 block mt-0.5">
                  {examResult.scoreByLevel.pemahaman.correct} dari {examResult.scoreByLevel.pemahaman.total} butir
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-left">
                <span className="text-[11px] font-bold text-emerald-800 block">Aplikasi (50%)</span>
                <span className="text-xl font-mono font-black text-emerald-900">{examResult.scoreByLevel.aplikasi.score}</span>
                <span className="text-[10px] text-emerald-600 block mt-0.5">
                  {examResult.scoreByLevel.aplikasi.correct} dari {examResult.scoreByLevel.aplikasi.total} butir
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-purple-50 border border-purple-200 text-left">
                <span className="text-[11px] font-bold text-purple-800 block">Penalaran HOTS (40%)</span>
                <span className="text-xl font-mono font-black text-purple-900">{examResult.scoreByLevel.penalaran.score}</span>
                <span className="text-[10px] text-purple-600 block mt-0.5">
                  {examResult.scoreByLevel.penalaran.correct} dari {examResult.scoreByLevel.penalaran.total} butir
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4 border-t border-slate-100">
            <button
              onClick={onBackToHome}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow transition-colors"
            >
              Kembali ke Beranda
            </button>
            <button
              onClick={onLogout}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors"
            >
              Logout Peserta
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // TAMPILAN SESI UJIAN AKTIF (CBT ANBK STYLE)
  // ==========================================
  return (
    <div className="space-y-4 pb-12">
      
      {/* Top Bar Status Ujian & Timer ANBK */}
      <div className="bg-white rounded-xl p-3.5 sm:p-4 border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
        {/* Info Peserta & Soal Aktif */}
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-blue-50 text-blue-700 font-extrabold text-sm border border-blue-200">
            Soal No. {currentIndex + 1}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-800">{currentUser.name}</span>
              <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-semibold border border-slate-200">
                {currentUser.class}
              </span>
            </div>
            <div className="text-[11px] text-slate-500 font-medium">
              Tipe: {currentQuestion.type === 'pg' ? 'Pilihan Ganda' : currentQuestion.type === 'pgk_mcma' ? 'Pilihan Ganda Kompleks' : 'PGK Kategori (Benar/Salah)'} · Level: {currentQuestion.level}
            </div>
          </div>
        </div>

        {/* Timer 80 Menit Countdown */}
        <div className="flex items-center gap-3">
          <div className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl font-mono text-sm sm:text-base font-bold shadow-xs border ${
            secondsRemaining < 300 
              ? 'bg-red-50 text-red-700 border-red-300 animate-pulse' 
              : secondsRemaining < 600
              ? 'bg-amber-50 text-amber-800 border-amber-300'
              : 'bg-slate-900 text-emerald-400 border-slate-800'
          }`}>
            <Clock className="w-4 h-4 shrink-0" />
            <span>{formatTimer(secondsRemaining)}</span>
          </div>

          {/* Tombol Buka Daftar Soal (Drawer) */}
          <button
            type="button"
            onClick={() => setShowQuestionDrawer(true)}
            className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold border border-slate-200 flex items-center gap-1.5 transition-colors shadow-xs"
          >
            <Grid className="w-4 h-4 text-blue-600" />
            <span className="hidden sm:inline">Daftar</span> Soal ({answeredCount}/{shuffledQuestions.length})
          </button>

          {/* Tombol Keluar ke Beranda Utama */}
          <button
            type="button"
            onClick={() => setShowExitConfirmModal(true)}
            className="px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold border border-rose-200 flex items-center gap-1.5 transition-colors shadow-xs"
            title="Keluar dari sesi kuis dan kembali ke Beranda utama"
          >
            <Home className="w-4 h-4 text-rose-600" />
            <span className="hidden sm:inline">Keluar ke Home</span>
            <span className="sm:hidden">Home</span>
          </button>
        </div>
      </div>

      {/* Progress Bar Soal Terjawab */}
      <div className="bg-slate-200 h-2 rounded-full overflow-hidden shadow-inner">
        <div 
          className="bg-emerald-500 h-full transition-all duration-300 ease-out"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Main Split Layout: Kiri Stimulus/Soal, Kanan Opsi Jawaban (Sesuai Desain Spesifikasi) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* Kolom Kiri: Teks / Stimulus Soal Kontekstual Puspendik (7 kolom) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white rounded-2xl p-5 sm:p-7 border border-slate-200 shadow-xs space-y-4 min-h-[460px] flex flex-col justify-between">
            <div className="space-y-4">
              {/* Badge Indikator Soal */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200">
                  TP {currentQuestion.competency} · {currentQuestion.competencyTitle}
                </span>
                <span className={`text-[11px] font-bold px-2 py-0.5 rounded ${
                  currentQuestion.level === 'Pemahaman' 
                    ? 'bg-blue-100 text-blue-800' 
                    : currentQuestion.level === 'Aplikasi'
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-purple-100 text-purple-800'
                }`}>
                  Level {currentQuestion.level}
                </span>
              </div>

              {/* Judul Stimulus */}
              <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                {currentQuestion.stimulus.title}
              </h3>

              {/* Gambar / Infografis Kontekstual Wanaraya (Tanpa Memberikan Kunci Jawaban) */}
              {(currentQuestion.stimulus.imageUrl || currentQuestion.stimulus.diagramType) && (
                <QuestionStimulusVisual
                  imageUrl={currentQuestion.stimulus.imageUrl}
                  imageCaption={currentQuestion.stimulus.imageCaption}
                  diagramType={currentQuestion.stimulus.diagramType}
                  title={currentQuestion.stimulus.title}
                />
              )}

              {/* Wacana Kontekstual ~100 Kata */}
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed text-justify bg-slate-50/70 p-4 rounded-xl border border-slate-200">
                {currentQuestion.stimulus.context}
              </p>

              {/* Tabel Stimulus jika ada */}
              {currentQuestion.stimulus.tableData && (
                <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-xs">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-blue-900 text-white text-[11px] font-semibold">
                      <tr>
                        {currentQuestion.stimulus.tableData.headers.map((h, i) => (
                          <th key={i} className="px-3.5 py-2.5">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                      {currentQuestion.stimulus.tableData.rows.map((row, rIdx) => (
                        <tr key={rIdx} className={rIdx % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                          {row.map((cell, cIdx) => (
                            <td key={cIdx} className="px-3.5 py-2 font-medium text-slate-700">{cell}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Kalimat Pertanyaan (Prompt) */}
              <div className="pt-2">
                <p className="text-xs sm:text-sm font-bold text-slate-900 leading-relaxed">
                  {currentQuestion.prompt}
                </p>
              </div>
            </div>

            {/* Catatan Indikator ABCD (Quiet Note for Academic Quality) */}
            <div className="pt-3 border-t border-slate-100 text-[10px] text-slate-400">
              Kerangka TKA: {currentQuestion.indicatorABCD.behavior}
            </div>
          </div>
        </div>

        {/* Kolom Kanan: Pilihan Jawaban (5 kolom) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-xs space-y-4 min-h-[460px] flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Lembar Jawaban Siswa
                </h4>
                {currentAnswer.isAnswered ? (
                  <span className="text-[11px] font-bold text-emerald-600 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Terjawab
                  </span>
                ) : (
                  <span className="text-[11px] font-medium text-slate-400">
                    Belum dijawab
                  </span>
                )}
              </div>

              {/* TIPE 1: PILIHAN GANDA (1 JAWABAN BENAR) */}
              {currentQuestion.type === 'pg' && (
                <div className="space-y-2.5 pt-1">
                  {(currentQuestion as SingleChoiceQuestion).options.map((opt) => {
                    const isSelected = currentAnswer.answer === opt.label;
                    return (
                      <button
                        key={opt.label}
                        type="button"
                        onClick={() => handleSelectSingle(opt.label)}
                        className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-start gap-3 ${
                          isSelected
                            ? 'bg-blue-50/90 border-blue-600 ring-2 ring-blue-500 shadow-xs'
                            : 'bg-white hover:bg-slate-50 border-slate-200'
                        }`}
                      >
                        <div className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 transition-colors ${
                          isSelected
                            ? 'bg-blue-600 text-white'
                            : 'bg-slate-100 text-slate-700'
                        }`}>
                          {opt.label}
                        </div>
                        <span className="text-xs sm:text-sm font-medium text-slate-800 pt-0.5 leading-relaxed">
                          {opt.text}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* TIPE 2: PILIHAN GANDA KOMPLEKS (MCMA - PILIH LEBIH DARI 1) */}
              {currentQuestion.type === 'pgk_mcma' && (
                <div className="space-y-3 pt-1">
                  <div className="p-2.5 rounded-lg bg-amber-50 text-amber-800 text-xs font-semibold border border-amber-200">
                    {(currentQuestion as ComplexMcmaQuestion).instruction}
                  </div>

                  <div className="space-y-2.5">
                    {(currentQuestion as ComplexMcmaQuestion).options.map((opt) => {
                      const selectedList = Array.isArray(currentAnswer.answer) ? currentAnswer.answer : [];
                      const isSelected = selectedList.includes(opt.id);

                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => handleToggleMcma(opt.id)}
                          className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-start gap-3 ${
                            isSelected
                              ? 'bg-blue-50 border-blue-600 ring-2 ring-blue-400 shadow-xs'
                              : 'bg-white hover:bg-slate-50 border-slate-200'
                          }`}
                        >
                          <div className={`w-5 h-5 rounded flex items-center justify-center font-bold text-xs shrink-0 transition-colors mt-0.5 ${
                            isSelected
                              ? 'bg-blue-600 text-white'
                              : 'border-2 border-slate-300 bg-white'
                          }`}>
                            {isSelected && <Check className="w-3.5 h-3.5" />}
                          </div>
                          <span className="text-xs sm:text-sm font-medium text-slate-800 leading-relaxed">
                            <strong className="font-bold text-blue-900 mr-1.5">{opt.id}.</strong>
                            {opt.text}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* TIPE 3: PILIHAN GANDA KATEGORIK (BENAR / SALAH - 3 PERNYATAAN) */}
              {currentQuestion.type === 'pgk_kategori' && (
                <div className="space-y-3 pt-1">
                  <div className="p-2.5 rounded-lg bg-purple-50 text-purple-800 text-xs font-semibold border border-purple-200">
                    {(currentQuestion as ComplexKategoriQuestion).instruction}
                  </div>

                  <div className="space-y-3">
                    {(currentQuestion as ComplexKategoriQuestion).statements.map((st, sIdx) => {
                      const userObj = typeof currentAnswer.answer === 'object' && !Array.isArray(currentAnswer.answer) 
                        ? (currentAnswer.answer as Record<string, 'Benar' | 'Salah'>) 
                        : {};
                      const selected = userObj[st.id];

                      return (
                        <div key={st.id} className="p-3 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                          <p className="text-xs text-slate-800 font-medium leading-relaxed">
                            <strong className="text-slate-900 mr-1">{sIdx + 1}.</strong> {st.statement}
                          </p>

                          <div className="grid grid-cols-2 gap-2 pt-1">
                            <button
                              type="button"
                              onClick={() => handleSelectKategori(st.id, 'Benar')}
                              className={`py-1.5 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                                selected === 'Benar'
                                  ? 'bg-emerald-600 text-white shadow-xs ring-2 ring-emerald-300'
                                  : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-300'
                              }`}
                            >
                              <Check className="w-3.5 h-3.5" />
                              Benar
                            </button>

                            <button
                              type="button"
                              onClick={() => handleSelectKategori(st.id, 'Salah')}
                              className={`py-1.5 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                                selected === 'Salah'
                                  ? 'bg-rose-600 text-white shadow-xs ring-2 ring-rose-300'
                                  : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-300'
                              }`}
                            >
                              <X className="w-3.5 h-3.5" />
                              Salah
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Info Status Ragu-Ragu */}
            {currentAnswer.isDoubtful && (
              <div className="p-2 rounded-lg bg-amber-100 text-amber-900 text-xs font-semibold flex items-center gap-1.5 border border-amber-300">
                <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0" />
                <span>Soal ini ditandai Ragu-ragu oleh siswa.</span>
              </div>
            )}
          </div>
        </div>

      </div>

      {/* Navigasi Bawah ANBK: Merah (Sebelumnya), Kuning (Ragu-ragu), Biru (Berikutnya) Sesuai Spesifikasi */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3 sticky bottom-4 z-30">
        
        {/* Tombol Merah: Soal Sebelumnya */}
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all ${
            currentIndex === 0
              ? 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
              : 'bg-red-600 hover:bg-red-700 active:bg-red-800 text-white shadow-md'
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Soal Sebelumnya</span>
        </button>

        {/* Tombol Kuning: Ragu-ragu */}
        <button
          onClick={handleToggleDoubtful}
          className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all shadow-md ${
            currentAnswer.isDoubtful
              ? 'bg-amber-400 hover:bg-amber-500 text-blue-950 ring-2 ring-amber-300'
              : 'bg-amber-300 hover:bg-amber-400 text-blue-950 border border-amber-400'
          }`}
        >
          <HelpCircle className="w-4 h-4" />
          <span>{currentAnswer.isDoubtful ? '✓ Batal Ragu-ragu' : 'Ragu-ragu'}</span>
        </button>

        {/* Tombol Biru: Soal Berikutnya / Selesai Ujian */}
        {currentIndex < shuffledQuestions.length - 1 ? (
          <button
            onClick={handleNext}
            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-md transition-all"
          >
            <span>Soal Berikutnya</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={() => setShowConfirmSubmitModal(true)}
            className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-md transition-all"
          >
            <Send className="w-4 h-4" />
            <span>Selesai & Kumpulkan Ujian</span>
          </button>
        )}

      </div>

      {/* MODAL DAFTAR SOAL (NOMOR 1 s/d 20) */}
      {showQuestionDrawer && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-900">Daftar Nomor Soal Ujian</h3>
                <p className="text-xs text-slate-500">Klik nomor soal untuk melompat langsung</p>
              </div>
              <button
                onClick={() => setShowQuestionDrawer(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Grid 20 Soal */}
            <div className="grid grid-cols-5 sm:grid-cols-5 gap-2.5 max-h-[300px] overflow-y-auto p-1">
              {shuffledQuestions.map((q, qIdx) => {
                const ans = answers[q.id];
                const isCurrent = qIdx === currentIndex;
                const isAns = ans?.isAnswered;
                const isDoubt = ans?.isDoubtful;

                let colorClass = 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'; // Belum dijawab
                if (isDoubt) {
                  colorClass = 'bg-amber-400 text-blue-950 border-amber-500 font-bold'; // Ragu-ragu
                } else if (isAns) {
                  colorClass = 'bg-emerald-600 text-white border-emerald-600 font-bold'; // Terjawab
                }

                return (
                  <button
                    key={q.id}
                    onClick={() => {
                      setCurrentIndex(qIdx);
                      setShowQuestionDrawer(false);
                    }}
                    className={`h-11 rounded-xl text-xs font-mono font-bold flex flex-col items-center justify-center border transition-all ${colorClass} ${
                      isCurrent ? 'ring-3 ring-blue-600 shadow-md scale-105' : ''
                    }`}
                  >
                    <span>{qIdx + 1}</span>
                    <span className="text-[9px] font-sans font-normal opacity-80">
                      {isDoubt ? 'Ragu' : isAns ? 'Isi' : '-'}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Keterangan Warna Sesuai Standar ANBK */}
            <div className="pt-3 border-t border-slate-100 grid grid-cols-3 gap-2 text-[11px] text-center">
              <div className="flex items-center justify-center gap-1.5 p-1.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                <span className="w-3 h-3 rounded bg-emerald-600" />
                <span>Terjawab ({answeredCount})</span>
              </div>
              <div className="flex items-center justify-center gap-1.5 p-1.5 rounded bg-amber-50 text-amber-800 border border-amber-200">
                <span className="w-3 h-3 rounded bg-amber-400" />
                <span>Ragu-ragu ({doubtfulCount})</span>
              </div>
              <div className="flex items-center justify-center gap-1.5 p-1.5 rounded bg-slate-50 text-slate-700 border border-slate-200">
                <span className="w-3 h-3 rounded bg-white border border-slate-400" />
                <span>Belum ({shuffledQuestions.length - answeredCount})</span>
              </div>
            </div>

            <div className="pt-2 flex justify-between gap-3">
              <button
                type="button"
                onClick={() => setShowQuestionDrawer(false)}
                className="w-1/2 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors"
              >
                Tutup
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowQuestionDrawer(false);
                  setShowConfirmSubmitModal(true);
                }}
                className="w-1/2 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow transition-colors"
              >
                Selesai Ujian
              </button>
            </div>

            <button
              type="button"
              onClick={() => {
                setShowQuestionDrawer(false);
                setShowExitConfirmModal(true);
              }}
              className="w-full mt-2 py-2 rounded-xl text-xs font-bold text-rose-600 hover:bg-rose-50 border border-transparent hover:border-rose-200 flex items-center justify-center gap-1.5 transition-colors"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Keluar dari Ujian ke Home</span>
            </button>
          </div>
        </div>
      )}

      {/* MODAL KONFIRMASI SELESAI UJIAN */}
      {showConfirmSubmitModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95">
            <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <div className="text-center">
              <h3 className="text-lg font-extrabold text-slate-900">
                Konfirmasi Pengumpulan Ujian
              </h3>
              <p className="text-xs text-slate-600 mt-1">
                Apakah Anda yakin ingin mengakhiri dan mengumpulkan jawaban ujian ini?
              </p>
            </div>

            {/* Status Pengerjaan */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-600">Total Soal:</span>
                <span className="font-bold text-slate-800">{shuffledQuestions.length} Soal</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Soal Terjawab:</span>
                <span className="font-bold text-emerald-600">{answeredCount} Soal</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Soal Masih Ragu-ragu:</span>
                <span className="font-bold text-amber-600">{doubtfulCount} Soal</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Soal Belum Dijawab:</span>
                <span className="font-bold text-red-600">{shuffledQuestions.length - answeredCount} Soal</span>
              </div>
            </div>

            {(doubtfulCount > 0 || answeredCount < shuffledQuestions.length) && (
              <p className="text-[11px] text-amber-700 bg-amber-50 p-2.5 rounded-lg border border-amber-200 leading-tight">
                ⚠️ Perhatian: Anda masih memiliki soal yang belum dijawab atau ditandai ragu-ragu.
              </p>
            )}

            <div className="flex gap-2.5 pt-2">
              <button
                type="button"
                disabled={isSubmitting}
                onClick={() => setShowConfirmSubmitModal(false)}
                className="w-1/2 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors"
              >
                Cek Kembali
              </button>
              <button
                type="button"
                disabled={isSubmitting}
                onClick={handleFinalSubmit}
                className="w-1/2 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5"
              >
                {isSubmitting ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Menyimpan...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Ya, Kumpulkan</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL KONFIRMASI KELUAR KE HOME */}
      {showExitConfirmModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95">
            <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mx-auto shadow-inner">
              <Home className="w-6 h-6" />
            </div>

            <div className="text-center">
              <h3 className="text-lg font-extrabold text-slate-900">
                Keluar ke Beranda Utama?
              </h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Anda sedang dalam sesi <strong>Ujian Formatif Bab 3: Rasio</strong>. Progres <strong>{answeredCount}</strong> dari <strong>{shuffledQuestions.length}</strong> soal dan sisa waktu tetap tersimpan pada sesi ini jika Anda memilih kembali ke Beranda.
              </p>
            </div>

            {/* Pilihan Aksi Keluar */}
            <div className="space-y-2.5 pt-2">
              {/* Opsi 1: Kembali ke Beranda (Simpan Sesi) */}
              <button
                type="button"
                onClick={() => {
                  setShowExitConfirmModal(false);
                  onBackToHome();
                }}
                className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
              >
                <Home className="w-4 h-4" />
                <span>Kembali ke Beranda Utama (Simpan Sesi)</span>
              </button>

              {/* Opsi 2: Logout Siswa & Keluar */}
              <button
                type="button"
                onClick={() => {
                  try {
                    localStorage.removeItem(sessionKey);
                  } catch {
                    // ignore
                  }
                  setShowExitConfirmModal(false);
                  onLogout();
                }}
                className="w-full py-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs border border-rose-200 transition-colors flex items-center justify-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout Siswa & Keluar ke Beranda</span>
              </button>

              {/* Opsi 3: Batal / Lanjutkan Ujian */}
              <button
                type="button"
                onClick={() => setShowExitConfirmModal(false)}
                className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors"
              >
                Lanjutkan Mengerjakan Soal
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
