export const GOOGLE_APPS_SCRIPT_SOURCE = `/**
 * =========================================================================
 * GOOGLE APPS SCRIPT: SISTEM UJIAN CBT ANBK - SMP NEGERI 1 WANARAYA
 * TAHUN AJARAN 2026/2027
 * Topik: Ujian Formatif Bab 3: Rasio (Matematika Kelas 7 Fase D)
 * =========================================================================
 * 
 * PETUNJUK PEMASANGAN DI GOOGLE SPREADSHEET:
 * 1. Buka Google Spreadsheet baru di browser Anda (https://sheets.new).
 * 2. Beri nama spreadsheet, contoh: "CBT_SMPN1_Wanaraya_Bab3_Rasio".
 * 3. Klik menu: Ekstensi (Extensions) > Apps Script.
 * 4. Hapus semua kode default di editor, lalu PASTE SELURUH KODE DI BAWAH INI.
 * 5. Klik tombol "Simpan" (ikon disket / Ctrl+S).
 * 6. Klik tombol biru "Terapkan" (Deploy) > "Penerapan baru" (New deployment).
 * 7. Pada ikon gerigi pilih jenis: "Aplikasi Web" (Web app).
 * 8. Pengaturan:
 *    - Deskripsi: CBT SMPN 1 Wanaraya v1
 *    - Jalankan sebagai (Execute as): "Saya" (Me / akun Google Anda)
 *    - Siapa yang memiliki akses (Who has access): "Siapa saja" (Anyone) -> SANGAT PENTING!
 * 9. Klik "Terapkan" (Deploy), berikan izin otorisasi Google jika diminta.
 * 10. Salin URL Aplikasi Web (Web App URL) yang berakhiran "/exec".
 * 11. Tempelkan URL tersebut ke kolom Pengaturan di aplikasi CBT ini.
 */

function doGet(e) {
  return handleRequest(e);
}

function doPost(e) {
  return handleRequest(e);
}

function handleRequest(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(15000);

  try {
    var params = {};
    if (e.postData && e.postData.contents) {
      try {
        params = JSON.parse(e.postData.contents);
      } catch (err) {
        params = e.parameter;
      }
    } else if (e.parameter) {
      params = e.parameter;
    }

    var action = params.action || 'ping';
    var ss = SpreadsheetApp.getActiveSpreadsheet();

    // 1. Uji Koneksi (Test Connection / Ping)
    if (action === 'ping' || action === 'testConnection') {
      return createJsonResponse({
        status: 'success',
        connected: true,
        school: 'SMP Negeri 1 Wanaraya',
        message: 'Koneksi ke Google Spreadsheet Berhasil dan Aktif!'
      });
    }

    // 2. Mengambil Data Login Siswa (Sheet: UserLogin)
    if (action === 'getUsers') {
      var sheetUser = getOrCreateSheet(ss, 'UserLogin', [
        'Kode Siswa', 'Username', 'Nama Peserta', 'Kelas', 'Password', 'Token Ujian', 'Status'
      ]);
      var data = sheetUser.getDataRange().getValues();
      var users = [];
      
      // Jika sheet masih kosong (hanya header), tambahkan data siswa default
      if (data.length <= 1) {
        seedDefaultUsers(sheetUser);
        data = sheetUser.getDataRange().getValues();
      }

      for (var i = 1; i < data.length; i++) {
        var row = data[i];
        if (row[1]) { // Pastikan username terisi
          users.push({
            id: String(row[0] || 'std-' + i),
            username: String(row[1]).trim(),
            name: String(row[2]).trim(),
            class: String(row[3]).trim(),
            password: String(row[4]).trim(),
            token: String(row[5] || 'RASIO7WNR').trim(),
            status: String(row[6] || 'Belum Ujian').trim()
          });
        }
      }

      return createJsonResponse({
        status: 'success',
        count: users.length,
        users: users
      });
    }

    // 3. Simpan Hasil Ujian Siswa (Sheet: JawabanUjian)
    if (action === 'submitExam') {
      var sheetJawaban = getOrCreateSheet(ss, 'JawabanUjian', [
        'Timestamp', 'Kode Siswa', 'Nama Peserta', 'Kelas', 'Token Digunakan',
        'Durasi (Menit)', 'Skor Akhir (0-100)', 'Jumlah Benar', 'Total Soal',
        'Nilai Pemahaman', 'Nilai Aplikasi', 'Nilai Penalaran',
        'Jawaban Soal 1 s.d 20 (Ringkasan JSON)'
      ]);

      var timestamp = Utilities.formatDate(new Date(), 'Asia/Makassar', 'yyyy-MM-dd HH:mm:ss');
      var kodeSiswa = params.kodeSiswa || params.username || '-';
      var namaPeserta = params.namaPeserta || params.studentName || '-';
      var kelas = params.kelas || params.studentClass || '-';
      var token = params.token || params.tokenUsed || '-';
      var durasi = params.durasi || params.durationSpentMinutes || 0;
      var totalScore = params.totalScore !== undefined ? params.totalScore : 0;
      var correctCount = params.correctCount || 0;
      var totalQuestions = params.totalQuestions || 20;
      
      var skorPemahaman = (params.scoreByLevel && params.scoreByLevel.pemahaman) ? params.scoreByLevel.pemahaman.score : '-';
      var skorAplikasi = (params.scoreByLevel && params.scoreByLevel.aplikasi) ? params.scoreByLevel.aplikasi.score : '-';
      var skorPenalaran = (params.scoreByLevel && params.scoreByLevel.penalaran) ? params.scoreByLevel.penalaran.score : '-';
      var answersJson = JSON.stringify(params.answers || {});

      sheetJawaban.appendRow([
        timestamp, kodeSiswa, namaPeserta, kelas, token,
        durasi, totalScore, correctCount, totalQuestions,
        skorPemahaman, skorAplikasi, skorPenalaran,
        answersJson
      ]);

      // Update status di sheet UserLogin jika ada
      try {
        var sheetUser = ss.getSheetByName('UserLogin');
        if (sheetUser) {
          var uData = sheetUser.getDataRange().getValues();
          for (var j = 1; j < uData.length; j++) {
            if (String(uData[j][1]).trim().toLowerCase() === String(kodeSiswa).trim().toLowerCase()) {
              sheetUser.getRange(j + 1, 7).setValue('Sudah Ujian (Skor: ' + totalScore + ')');
              break;
            }
          }
        }
      } catch (eUser) {}

      return createJsonResponse({
        status: 'success',
        message: 'Hasil ujian siswa ' + namaPeserta + ' berhasil disimpan di spreadsheet!',
        timestamp: timestamp
      });
    }

    // 4. Sinkronisasi Siswa Baru / Update Token (Sheet: UserLogin)
    if (action === 'syncStudents') {
      var sheetUser = getOrCreateSheet(ss, 'UserLogin', [
        'Kode Siswa', 'Username', 'Nama Peserta', 'Kelas', 'Password', 'Token Ujian', 'Status'
      ]);
      var students = params.students || [];
      if (students.length > 0) {
        // Bersihkan dan tulis ulang data siswa
        sheetUser.clearContents();
        sheetUser.appendRow(['Kode Siswa', 'Username', 'Nama Peserta', 'Kelas', 'Password', 'Token Ujian', 'Status']);
        for (var s = 0; s < students.length; s++) {
          var st = students[s];
          sheetUser.appendRow([
            st.id || ('std-' + (s + 1)),
            st.username,
            st.name,
            st.class,
            st.password || '123',
            st.token || 'RASIO7WNR',
            st.status || 'Belum Ujian'
          ]);
        }
      }
      return createJsonResponse({
        status: 'success',
        message: 'Data siswa berhasil diperbarui di spreadsheet (' + students.length + ' siswa)'
      });
    }

    return createJsonResponse({
      status: 'error',
      message: 'Aksi "' + action + '" tidak dikenali.'
    });

  } catch (error) {
    return createJsonResponse({
      status: 'error',
      message: error.toString()
    });
  } finally {
    lock.releaseLock();
  }
}

function getOrCreateSheet(ss, sheetName, headers) {
  var sheet = ss.getSheetByName(sheetName);
  if (!sheet) {
    sheet = ss.insertSheet(sheetName);
    sheet.appendRow(headers);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, headers.length).setBackground('#1E40AF').setFontColor('#FFFFFF').setFontWeight('bold');
  }
  return sheet;
}

function seedDefaultUsers(sheet) {
  var defaults = [
    ['std-7a-01', 'ahmad7a', 'Ahmad Fauzan', '7A', '123', 'RASIO7WNR', 'Siap'],
    ['std-7a-02', 'anisa7a', 'Anisa Nur Aini', '7A', '123', 'RASIO7WNR', 'Siap'],
    ['std-7a-03', 'bagas7a', 'Bagas Pratama', '7A', '123', 'RASIO7WNR', 'Siap'],
    ['std-7a-04', 'citra7a', 'Citra Kirana', '7A', '123', 'RASIO7WNR', 'Siap'],
    ['std-7b-01', 'aditya7b', 'Aditya Saputra', '7B', '123', 'RASIO7WNR', 'Siap'],
    ['std-7b-02', 'bunga7b', 'Bunga Lestari', '7B', '123', 'RASIO7WNR', 'Siap'],
    ['std-7b-03', 'deni7b', 'Deni Kurniawan', '7B', '123', 'RASIO7WNR', 'Siap'],
    ['std-7b-04', 'elsa7b', 'Elsa Febriyanti', '7B', '123', 'RASIO7WNR', 'Siap']
  ];
  for (var i = 0; i < defaults.length; i++) {
    sheet.appendRow(defaults[i]);
  }
}

function createJsonResponse(data) {
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
`;
