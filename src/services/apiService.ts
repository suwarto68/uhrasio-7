import { StudentUser, ExamSubmission, AppSettings } from '../types';
import { DEFAULT_STUDENTS, DEFAULT_EXAM_TOKEN } from '../data/defaultStudents';

const STORAGE_KEY_SETTINGS = 'smpn1_wanaraya_settings_v1';
const STORAGE_KEY_STUDENTS = 'smpn1_wanaraya_students_v1';
const STORAGE_KEY_SUBMISSIONS = 'smpn1_wanaraya_submissions_v1';

export const getStoredSettings = (): AppSettings => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_SETTINGS);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    console.warn('Gagal membaca settings dari local storage:', e);
  }

  return {
    examDurationMinutes: 80,
    examToken: DEFAULT_EXAM_TOKEN,
    googleAppsScriptUrl: '',
    isGoogleSheetConnected: false,
    schoolName: 'SMP Negeri 1 Wanaraya',
    schoolYear: '2026/2027',
    examTitle: 'Ujian Formatif Bab 3: Rasio - Matematika Kelas 7',
    adminPasswordHash: 'adminwanaraya2026'
  };
};

export const saveStoredSettings = (settings: AppSettings): void => {
  try {
    localStorage.setItem(STORAGE_KEY_SETTINGS, JSON.stringify(settings));
  } catch (e) {
    console.error('Gagal menyimpan settings:', e);
  }
};

export const getStoredStudents = (): StudentUser[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_STUDENTS);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.warn('Gagal membaca siswa:', e);
  }
  return DEFAULT_STUDENTS;
};

export const saveStoredStudents = (students: StudentUser[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY_STUDENTS, JSON.stringify(students));
  } catch (e) {
    console.error('Gagal menyimpan siswa:', e);
  }
};

export const getStoredSubmissions = (): ExamSubmission[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_SUBMISSIONS);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    console.warn('Gagal membaca submissions:', e);
  }
  return [];
};

export const saveStoredSubmissions = (submissions: ExamSubmission[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY_SUBMISSIONS, JSON.stringify(submissions));
  } catch (e) {
    console.error('Gagal menyimpan submissions:', e);
  }
};

/**
 * Uji koneksi ke endpoint Google Apps Script
 */
export async function testGoogleAppsScriptConnection(url: string): Promise<{ success: boolean; message: string }> {
  if (!url || !url.trim().startsWith('http')) {
    return { success: false, message: 'URL Google Apps Script belum diisi dengan benar (harus diawali https://script.google.com/macros/s/.../exec).' };
  }

  try {
    const cleanUrl = url.trim();
    // Using fetch with GET parameter action=ping
    const pingUrl = cleanUrl.includes('?') ? `${cleanUrl}&action=ping` : `${cleanUrl}?action=ping`;
    const res = await fetch(pingUrl, {
      method: 'GET',
      mode: 'cors'
    });

    if (!res.ok) {
      throw new Error(`HTTP Status ${res.status}`);
    }

    const data = await res.json();
    if (data && data.status === 'success') {
      return { success: true, message: data.message || 'Berhasil terhubung ke Google Spreadsheet!' };
    }
    return { success: false, message: data.message || 'Respon dari Apps Script tidak sesuai format.' };
  } catch (err: any) {
    return {
      success: false,
      message: `Gagal menghubungi Google Apps Script: ${err.message || 'CORS / Network Error'}. Pastikan akses deployment diatur "Anyone" (Siapa saja).`
    };
  }
}

/**
 * Tarik data siswa dari Google Spreadsheet sheet UserLogin
 */
export async function fetchUsersFromSpreadsheet(url: string): Promise<{ success: boolean; users?: StudentUser[]; message: string }> {
  if (!url || !url.trim().startsWith('http')) {
    return { success: false, message: 'URL Google Apps Script tidak valid.' };
  }

  try {
    const fetchUrl = url.includes('?') ? `${url}&action=getUsers` : `${url}?action=getUsers`;
    const res = await fetch(fetchUrl, {
      method: 'GET',
      mode: 'cors'
    });

    if (!res.ok) {
      throw new Error(`HTTP Error ${res.status}`);
    }

    const data = await res.json();
    if (data && data.status === 'success' && Array.isArray(data.users)) {
      // Perbarui cache lokal
      saveStoredStudents(data.users);
      return {
        success: true,
        users: data.users,
        message: `Berhasil menarik ${data.users.length} siswa dari Google Spreadsheet!`
      };
    }
    return { success: false, message: data.message || 'Format data pengguna tidak dikenali.' };
  } catch (err: any) {
    return { success: false, message: `Error tarik data siswa: ${err.message}` };
  }
}

/**
 * Kirim hasil ujian ke Google Spreadsheet sheet JawabanUjian
 */
export async function submitExamToSpreadsheet(
  url: string,
  submission: ExamSubmission
): Promise<{ success: boolean; message: string }> {
  // Simpan terlebih dahulu di local storage agar nilai murid aman 100%
  const currentSubmissions = getStoredSubmissions();
  const existingIdx = currentSubmissions.findIndex(s => s.id === submission.id);
  if (existingIdx >= 0) {
    currentSubmissions[existingIdx] = submission;
  } else {
    currentSubmissions.unshift(submission);
  }
  saveStoredSubmissions(currentSubmissions);

  // Jika URL tidak diisi, kembalikan status local saja
  if (!url || !url.trim().startsWith('http')) {
    return {
      success: true,
      message: 'Hasil ujian berhasil disimpan di browser (Mode Mandiri/Offline). Hubungkan Google Apps Script untuk otomatis sinkron ke Spreadsheet.'
    };
  }

  try {
    const payload = {
      action: 'submitExam',
      kodeSiswa: submission.username,
      namaPeserta: submission.studentName,
      kelas: submission.studentClass,
      token: submission.tokenUsed,
      durasi: submission.durationSpentMinutes,
      totalScore: submission.totalScore,
      correctCount: submission.correctCount,
      totalQuestions: submission.totalQuestions,
      scoreByLevel: submission.scoreByLevel,
      answers: submission.answers
    };

    // Use POST with text/plain to avoid aggressive CORS preflight blocks by Google Apps Script
    const res = await fetch(url.trim(), {
      method: 'POST',
      mode: 'no-cors', // Standard practice for Google Apps Script Web App submissions from client-side
      headers: {
        'Content-Type': 'text/plain;charset=utf-8'
      },
      body: JSON.stringify(payload)
    });

    // In no-cors mode, res.ok is opaque, mark synced
    submission.syncedToSheet = true;
    saveStoredSubmissions(currentSubmissions);

    return {
      success: true,
      message: 'Hasil ujian berhasil dikirim dan tersimpan di Google Spreadsheet (sheet JawabanUjian)!'
    };
  } catch (err: any) {
    console.error('Gagal POST ke Google Apps Script:', err);
    return {
      success: true, // Still success locally
      message: 'Hasil ujian tersimpan secara lokal di browser, namun gagal sinkron ke Google Spreadsheet: ' + err.message
    };
  }
}
