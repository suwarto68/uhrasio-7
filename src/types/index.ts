export type QuestionType = 'pg' | 'pgk_mcma' | 'pgk_kategori';

export type CognitiveLevel = 'Pemahaman' | 'Aplikasi' | 'Penalaran';

export interface BaseQuestion {
  id: number;
  number: number;
  type: QuestionType;
  level: CognitiveLevel;
  competency: string; // e.g. 3.1, 3.2, 3.3, 3.4
  competencyTitle: string;
  indicatorABCD: {
    condition: string;  // Stimulus kontekstual wacana/tabel
    audience: string;   // Murid/Peserta didik Kelas 7
    behavior: string;   // Proses kognitif yang diukur
    degree: string;     // Kriteria ketuntasan / ketercapaian
  };
  stimulus: {
    title: string;
    context: string;   // Wacana ~100 kata atau kasus lokal Kalimantan Selatan
    tableData?: { headers: string[]; rows: (string | number)[][] };
    chartType?: 'bar' | 'ratio_bar' | 'table';
    chartData?: any;
    imageUrl?: string;
    imageCaption?: string;
    diagramType?: 'map_route' | 'sasirangan' | 'blueprint' | 'rice_field' | 'fertilizer_mix' | 'stage_scale' | 'bridge_sketch' | 'pump_debit' | 'market_balance';
  };
  prompt: string;      // Kalimat pertanyaan
  explanation: string; // Pembahasan detail
}

export interface SingleChoiceQuestion extends BaseQuestion {
  type: 'pg';
  options: { label: string; text: string }[];
  correctAnswer: string; // e.g., 'A', 'B', 'C', 'D'
}

export interface ComplexMcmaQuestion extends BaseQuestion {
  type: 'pgk_mcma';
  instruction: string; // "Pilihlah Pernyataan berikut jawaban pilih lebih dari 1 jawaban yang benar."
  options: { id: string; text: string }[];
  correctAnswers: string[]; // array of correct option ids, e.g. ['A', 'C']
}

export interface KategoriStatement {
  id: string;
  statement: string;
  correctAnswer: 'Benar' | 'Salah';
}

export interface ComplexKategoriQuestion extends BaseQuestion {
  type: 'pgk_kategori';
  instruction: string; // "Pilihlah Pernyataan berikut jawaban yang benar atau salah."
  statements: KategoriStatement[];
}

export type Question = SingleChoiceQuestion | ComplexMcmaQuestion | ComplexKategoriQuestion;

export interface StudentUser {
  id: string;
  username: string;
  name: string;
  class: '7A' | '7B';
  password: string;
  token?: string;
}

export interface StudentAnswer {
  questionId: number;
  questionNumber: number;
  type: QuestionType;
  answer: string | string[] | Record<string, 'Benar' | 'Salah'>;
  isDoubtful: boolean;
  isAnswered: boolean;
}

export interface ExamSubmission {
  id: string;
  username: string;
  studentName: string;
  studentClass: '7A' | '7B';
  tokenUsed: string;
  submittedAt: string;
  durationSpentMinutes: number;
  totalScore: number;       // Scaled to 0 - 100
  correctCount: number;
  totalQuestions: number;
  answers: Record<number, any>;
  scoreByLevel: {
    pemahaman: { correct: number; total: number; score: number };
    aplikasi: { correct: number; total: number; score: number };
    penalaran: { correct: number; total: number; score: number };
  };
  syncedToSheet: boolean;
}

export interface AppSettings {
  examDurationMinutes: number;
  examToken: string;
  googleAppsScriptUrl: string;
  isGoogleSheetConnected: boolean;
  schoolName: string;
  schoolYear: string;
  examTitle: string;
  adminPasswordHash: string; // default stored
}
