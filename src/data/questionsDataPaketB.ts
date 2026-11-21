import { Question } from '../types';

export const QUESTIONS_DATA_PAKET_B: Question[] = [
  // ==========================================
  // SOAL 1 s/d 10: PILIHAN GANDA (PG) - KUNCI ACAK: D, A, B, D, A, C, B, D, C, A
  // ==========================================
  {
    id: 101,
    number: 1,
    type: 'pg',
    level: 'Pemahaman',
    competency: '3.1',
    competencyTitle: 'Konsep Rasio & Perbedaan dengan Selisih',
    indicatorABCD: {
      condition: 'Disajikan narasi hasil panen buah jeruk Siam Banjar di Blok C perkebunan Wanaraya Barito Kuala,',
      audience: 'peserta didik kelas 7',
      behavior: 'dapat menentukan rasio bentuk paling sederhana serta membedakannya dari nilai selisih kuantitas',
      degree: 'dengan tepat dan logis.'
    },
    stimulus: {
      title: 'Hasil Panen Jeruk Siam Banjar Blok C di Kecamatan Wanaraya',
      context: 'Pada panen musim kemarau bulan ini, Kelompok Tani Harapan Maju di Kecamatan Wanaraya memanen jeruk Siam Banjar dari lahan Blok C dan memilahnya berdasarkan ukuran buah. Dari hasil penyortiran, terkumpul 180 kg jeruk ukuran besar (Kelas I) dan 120 kg jeruk ukuran sedang (Kelas II). Pengurus kelompok tani ingin membandingkan perolehan panen tersebut menggunakan rasio paling sederhana dan selisih berat untuk laporan evaluasi hasil panen.',
      imageUrl: '/src/assets/images/kebun_jeruk_wanaraya_1794020305025.jpg',
      imageCaption: 'Penyortiran Hasil Panen Jeruk Siam Banjar di Perkebunan Rakyat Wanaraya',
      tableData: {
        headers: ['Kualitas Jeruk', 'Jumlah Panen (kg)', 'Harga per kg'],
        rows: [
          ['Kelas I (Besar)', 180, 'Rp19.000'],
          ['Kelas II (Sedang)', 120, 'Rp13.000']
        ]
      }
    },
    prompt: 'Berdasarkan data panen tersebut, bentuk rasio paling sederhana antara berat jeruk Kelas I terhadap Kelas II serta selisih berat keduanya berturut-turut adalah ....',
    options: [
      { label: 'A', text: '2 : 3 dan 60 kg' },
      { label: 'B', text: '3 : 2 dan 40 kg' },
      { label: 'C', text: '9 : 6 dan 60 kg' },
      { label: 'D', text: '3 : 2 dan 60 kg' }
    ],
    correctAnswer: 'D',
    explanation: 'Rasio berat Jeruk Kelas I terhadap Kelas II = 180 : 120. Dibagi FPB(180, 120) = 60, menghasilkan rasio paling sederhana 3 : 2. Sedangkan selisih aditif berat kedua kelas = 180 kg - 120 kg = 60 kg. Jawaban yang tepat adalah opsi D (3 : 2 dan 60 kg).'
  },
  {
    id: 102,
    number: 2,
    type: 'pg',
    level: 'Aplikasi',
    competency: '3.2',
    competencyTitle: 'Faktor Skala dalam Pemecahan Masalah',
    indicatorABCD: {
      condition: 'Disajikan peta jalur transportasi dari SMPN 1 Wanaraya menuju Pelabuhan Trisakti Banjarmasin berskala 1 : 300.000,',
      audience: 'peserta didik kelas 7',
      behavior: 'dapat menghitung jarak sebenarnya antara kedua lokasi dalam satuan kilometer',
      degree: 'dengan benar sesuai konsep skala.'
    },
    stimulus: {
      title: 'Peta Rute Distribusi Hasil Bumi Barito Kuala - Banjarmasin',
      context: 'Dalam kegiatan proyek P5 kewirausahaan, siswa kelas 7 SMP Negeri 1 Wanaraya memetakan rute distribusi hasil pertanian jeruk menuju kawasan Pelabuhan Trisakti Banjarmasin. Pada lembar peta wilayah Kalimantan Selatan berskala 1 : 300.000, jarak garis lurus antara titik SMPN 1 Wanaraya dan Pelabuhan Trisakti terukur sepanjang 12 cm pada mistar ukur peta.',
      diagramType: 'map_route',
      imageCaption: 'Sketsa Garis Ukur Peta Jalur SMPN 1 Wanaraya - Pelabuhan Trisakti (Skala 1 : 300.000)',
      chartData: {
        headerTitle: 'Sketsa Peta Jalur Logistik Barito Kuala - Banjarmasin',
        scale: '1 : 300.000',
        from: 'SMPN 1 Wanaraya',
        to: 'Pelabuhan Trisakti',
        mapDistance: '12 cm'
      },
      tableData: {
        headers: ['Parameter Peta', 'Nilai'],
        rows: [
          ['Skala Peta', '1 : 300.000'],
          ['Jarak pada Peta', '12 cm'],
          ['Satuan Target', 'Kilometer (km)']
        ]
      }
    },
    prompt: 'Jarak sebenarnya antara SMP Negeri 1 Wanaraya dan Pelabuhan Trisakti Banjarmasin pada rute peta tersebut adalah ....',
    options: [
      { label: 'A', text: '36 km' },
      { label: 'B', text: '25 km' },
      { label: 'C', text: '3,6 km' },
      { label: 'D', text: '360 km' }
    ],
    correctAnswer: 'A',
    explanation: 'Jarak Sebenarnya = Jarak Peta × Penyebut Skala = 12 cm × 300.000 = 3.600.000 cm. Mengonversi cm ke km (dibagi 100.000): 3.600.000 / 100.000 = 36 km. Jawaban yang tepat adalah opsi A (36 km).'
  },
  {
    id: 103,
    number: 3,
    type: 'pg',
    level: 'Aplikasi',
    competency: '3.3',
    competencyTitle: 'Rasio Ekuivalen & Proporsi',
    indicatorABCD: {
      condition: 'Disajikan data proporsi pewarna alami kain Sasirangan motif gelombang Barito,',
      audience: 'peserta didik kelas 7',
      behavior: 'dapat menerapkan konsep proporsi senilai untuk menentukan kuantitas bahan yang belum diketahui',
      degree: 'secara tepat.'
    },
    stimulus: {
      title: 'Produksi Kain Sasirangan Pewarna Alami Akar Mengkudu',
      context: 'Sentra UMKM Sasirangan di Barito Kuala mengembangkan pewarnaan alami ramah lingkungan berbahan ekstrak akar mengkudu dan kulit kayu ulin. Sesuai takaran baku pengrajin, untuk mewarnai 8 meter kain mori dibutuhkan 600 gram serbuk pewarna alami. Untuk memenuhi pesanan seragam acara festival budaya daerah, pengrajin harus mewarnai 20 meter kain mori dengan tingkat kepekatan warna yang sama.',
      diagramType: 'sasirangan',
      imageCaption: 'Takaran Proporsi Ekstrak Pewarna Alami Kain Sasirangan Barito Kuala',
      chartData: {
        title: 'Formula Celup Pewarna Alami Akar Mengkudu Sasirangan',
        baseMeters: '8 m',
        baseGrams: '600 gram Pewarna',
        targetMeters: '20 m'
      },
      tableData: {
        headers: ['Panjang Kain Mori (meter)', 'Kebutuhan Pewarna (gram)'],
        rows: [
          ['8 meter', '600 gram'],
          ['20 meter', 'x gram (belum diketahui)']
        ]
      }
    },
    prompt: 'Banyak serbuk pewarna alami yang harus disiapkan pengrajin untuk mewarnai 20 meter kain mori tersebut adalah ....',
    options: [
      { label: 'A', text: '1.200 gram' },
      { label: 'B', text: '1.500 gram' },
      { label: 'C', text: '1.600 gram' },
      { label: 'D', text: '1.800 gram' }
    ],
    correctAnswer: 'B',
    explanation: 'Menggunakan proporsi senilai: 8 / 600 = 20 / x. Kebutuhan per meter = 600 / 8 = 75 gram/meter. Maka untuk 20 meter kain = 20 × 75 gram = 1.500 gram. Jawaban yang tepat adalah opsi B (1.500 gram).'
  },
  {
    id: 104,
    number: 4,
    type: 'pg',
    level: 'Aplikasi',
    competency: '3.4',
    competencyTitle: 'Rasio Satuan & Laju Perubahan Satuan',
    indicatorABCD: {
      condition: 'Disajikan wacana perjalanan perahu kelotok mengangkut hasil kebun menyusuri Sungai Barito dengan data jarak dan waktu tempuh,',
      audience: 'peserta didik kelas 7',
      behavior: 'dapat menghitung laju perubahan satuan (kecepatan rata-rata dalam km/jam)',
      degree: 'dengan cermat.'
    },
    stimulus: {
      title: 'Kecepatan Angkutan Air Perahu Kelotok di Sungai Barito',
      context: 'Perahu kelotok kayu masih menjadi andalan petani di pesisir Sungai Barito untuk mendistribusikan hasil kebun menuju pasar mingguan. Pada pagi hari saat arus sungai tenang, sebuah kelotok pengangkut hasil panen berlayar menempuh lintasan sungai sejauh 12,6 kilometer dalam waktu tempuh 36 menit tanpa berhenti di dermaga perantara.',
      imageUrl: '/src/assets/images/perahu_kelotok_barito_1794020304682.jpg',
      imageCaption: 'Perahu Kelotok Angkutan Hasil Kebun di Aliran Sungai Barito',
      tableData: {
        headers: ['Jarak Tempuh', 'Waktu Tempuh', 'Satuan Target'],
        rows: [
          ['12,6 km', '36 menit', 'km/jam']
        ]
      }
    },
    prompt: 'Laju kecepatan rata-rata perahu kelotok tersebut apabila dinyatakan dalam satuan kilometer per jam (km/jam) adalah ....',
    options: [
      { label: 'A', text: '16 km/jam' },
      { label: 'B', text: '18 km/jam' },
      { label: 'C', text: '19 km/jam' },
      { label: 'D', text: '21 km/jam' }
    ],
    correctAnswer: 'D',
    explanation: 'Waktu tempuh 36 menit dikonversi ke satuan jam = 36/60 jam = 0,6 jam (atau 3/5 jam). Kecepatan rata-rata (laju satuan) = Jarak ÷ Waktu = 12,6 km ÷ 0,6 jam = 126 ÷ 6 = 21 km/jam. Jawaban benar adalah opsi D (21 km/jam).'
  },
  {
    id: 105,
    number: 5,
    type: 'pg',
    level: 'Aplikasi',
    competency: '3.2',
    competencyTitle: 'Faktor Skala dalam Pemecahan Masalah',
    indicatorABCD: {
      condition: 'Disajikan informasi rancangan maket jembatan bentang Sungai Barito dengan data panjang miniatur dan panjang fisik sebenarnya,',
      audience: 'peserta didik kelas 7',
      behavior: 'dapat menentukan faktor skala miniatur maket tersebut',
      degree: 'secara tepat.'
    },
    stimulus: {
      title: 'Miniatur Proyek Teknik Jembatan Bentang Sungai Barito',
      context: 'Dalam lomba karya ilmiah remaja tingkat Kabupaten Barito Kuala, kelompok siswa SMPN 1 Wanaraya membangun model miniatur struktur jembatan bentang sungai. Diketahui panjang bentang struktur utama jembatan sebenarnya adalah 900 meter. Tim siswa berhasil merakit miniatur jembatan tersebut di meja pameran dengan panjang bentang model tepat 36 cm.',
      imageUrl: '/src/assets/images/jembatan_barito_kalsel_1794020305779.jpg',
      imageCaption: 'Bentang Jembatan Sungai Barito Kalimantan Selatan (Bentang Uji 900 m)',
      tableData: {
        headers: ['Objek Pengukuran', 'Dimensi'],
        rows: [
          ['Panjang Bentang Sebenarnya', '900 meter'],
          ['Panjang Bentang pada Maket', '36 cm']
        ]
      }
    },
    prompt: 'Faktor skala yang digunakan tim siswa pada maket miniatur jembatan tersebut adalah ....',
    options: [
      { label: 'A', text: '1 : 2.500' },
      { label: 'B', text: '1 : 250' },
      { label: 'C', text: '1 : 3.000' },
      { label: 'D', text: '1 : 25.000' }
    ],
    correctAnswer: 'A',
    explanation: 'Samakan satuan terlebih dahulu: 900 meter = 900 × 100 cm = 90.000 cm. Faktor Skala = Ukuran Maket / Ukuran Sebenarnya = 36 cm / 90.000 cm. Sederhanakan dengan membagi 36: 36/36 = 1 dan 90.000/36 = 2.500. Maka skala maket tersebut adalah 1 : 2.500. Opsi A benar.'
  },
  {
    id: 106,
    number: 6,
    type: 'pg',
    level: 'Pemahaman',
    competency: '3.1',
    competencyTitle: 'Konsep Rasio & Perbedaan dengan Selisih',
    indicatorABCD: {
      condition: 'Disajikan rincian stok atribut seragam sekolah di Koperasi Siswa SMPN 1 Wanaraya,',
      audience: 'peserta didik kelas 7',
      behavior: 'dapat menghitung rasio bagian terhadap kuantitas keseluruhan inventaris',
      degree: 'dengan cermat.'
    },
    stimulus: {
      title: 'Inventaris Atribut Seragam Koperasi SMPN 1 Wanaraya',
      context: 'Menjelang tahun ajaran baru 2026/2027, Koperasi Siswa SMP Negeri 1 Wanaraya mendata ulang persediaan atribut seragam sekolah bagi peserta didik kelas 7. Data inventaris gudang mencatat terdapat 105 buah dasi biru SMP, 60 buah topi logo sekolah, dan 45 buah sabuk berlogo sekolah. Pembina koperasi meminta siswa menghitung rasio stok topi terhadap total seluruh atribut yang tersedia.',
      tableData: {
        headers: ['Jenis Atribut Seragam', 'Jumlah Stok'],
        rows: [
          ['Dasi Biru SMP', '105 buah'],
          ['Topi Logo Sekolah', '60 buah'],
          ['Sabuk Logo Sekolah', '45 buah']
        ]
      }
    },
    prompt: 'Rasio jumlah stok topi sekolah terhadap TOTAL seluruh atribut seragam di koperasi tersebut dalam bentuk paling sederhana adalah ....',
    options: [
      { label: 'A', text: '2 : 5' },
      { label: 'B', text: '3 : 7' },
      { label: 'C', text: '2 : 7' },
      { label: 'D', text: '6 : 21' }
    ],
    correctAnswer: 'C',
    explanation: 'Total seluruh atribut seragam = 105 + 60 + 45 = 210 buah. Rasio jumlah topi terhadap total barang = 60 : 210. Bagi kedua bilangan dengan FPB(60, 210) = 30: 60/30 = 2 dan 210/30 = 7. Bentuk paling sederhananya adalah 2 : 7. Pilihan C benar.'
  },
  {
    id: 107,
    number: 7,
    type: 'pg',
    level: 'Aplikasi',
    competency: '3.4',
    competencyTitle: 'Rasio Satuan & Laju Perubahan Satuan',
    indicatorABCD: {
      condition: 'Disajikan tabel penawaran harga empat jenis kemasan beras lokal Siam Mayang di Pasar Wanaraya,',
      audience: 'peserta didik kelas 7',
      behavior: 'dapat menentukan paket kemasan dengan laju harga satuan (price per unit) paling ekonomis',
      degree: 'secara analitis.'
    },
    stimulus: {
      title: 'Perbandingan Harga Satuan Beras Siam Mayang Barito Kuala',
      context: 'Toko Pangan Berkah di Pasar Wanaraya menjual beras varietas lokal Siam Mayang dalam empat ukuran kemasan yang berbeda. Karena sedang ada promo khusus untuk kemasan ukuran keluarga, harga per kilogram tiap paket tidak selalu lebih murah pada karung terbesar. Seorang ibu rumah tangga ingin menghitung harga satuan per kilogram untuk memilih kemasan yang paling hemat.',
      tableData: {
        headers: ['Jenis Kemasan', 'Berat Bersih (kg)', 'Harga Kemasan (Rp)'],
        rows: [
          ['Kemasan Mini', '2 kg', 'Rp31.000'],
          ['Kemasan Keluarga', '4 kg', 'Rp56.000'],
          ['Kemasan Ekonomis', '8 kg', 'Rp116.000'],
          ['Kemasan Grosir', '15 kg', 'Rp225.000']
        ]
      }
    },
    prompt: 'Kemasan manakah yang menawarkan harga satuan (rupiah per kilogram) paling murah bagi pembeli?',
    options: [
      { label: 'A', text: 'Kemasan Mini (2 kg)' },
      { label: 'B', text: 'Kemasan Keluarga (4 kg)' },
      { label: 'C', text: 'Kemasan Ekonomis (8 kg)' },
      { label: 'D', text: 'Kemasan Grosir (15 kg)' }
    ],
    correctAnswer: 'B',
    explanation: 'Hitung harga satuan (Rp/kg) masing-masing kemasan:\n- Kemasan Mini = Rp31.000 / 2 kg = Rp15.500/kg\n- Kemasan Keluarga = Rp56.000 / 4 kg = Rp14.000/kg\n- Kemasan Ekonomis = Rp116.000 / 8 kg = Rp14.500/kg\n- Kemasan Grosir = Rp225.000 / 15 kg = Rp15.000/kg\nMaka harga satuan paling murah adalah Kemasan Keluarga (4 kg) seharga Rp14.000/kg. Pilihan B tepat.'
  },
  {
    id: 108,
    number: 8,
    type: 'pg',
    level: 'Aplikasi',
    competency: '3.3',
    competencyTitle: 'Rasio Ekuivalen & Proporsi',
    indicatorABCD: {
      condition: 'Disajikan permasalahan perbandingan senilai terhubung persamaan linier satu variabel tentang bibit jeruk Kasturi dan Jeruk Purut,',
      audience: 'peserta didik kelas 7',
      behavior: 'dapat menyelesaikan nilai variabel aljabar untuk menentukan total kuantitas kedua jenis bibit',
      degree: 'dengan tepat.'
    },
    stimulus: {
      title: 'Pembibitan Jeruk Kasturi dan Jeruk Purut di Kebun Sekolah',
      context: 'Siswa kelas 7 SMPN 1 Wanaraya membudidayakan dua jenis bibit jeruk khas Kalimantan di kebun praktik sekolah, yaitu Jeruk Kasturi dan Jeruk Purut. Perbandingan banyak bibit Jeruk Kasturi terhadap Jeruk Purut adalah 8 : 5. Setelah dilakukan pencatatan di rak pembibitan, selisih antara jumlah bibit Jeruk Kasturi dan bibit Jeruk Purut tercatat sebanyak 27 polybag.',
      tableData: {
        headers: ['Varietas Bibit', 'Rasio Bagian', 'Keterangan'],
        rows: [
          ['Jeruk Kasturi', '8 bagian', 'Tanaman khas aroma harum Kalimantan'],
          ['Jeruk Purut', '5 bagian', 'Tanaman bumbu dapur bernilai jual'],
          ['Selisih Kuantitas', '27 polybag', 'Bibit Kasturi lebih banyak 27 buah']
        ]
      }
    },
    prompt: 'Berdasarkan data pembibitan tersebut, jumlah seluruh bibit jeruk (Jeruk Kasturi dan Jeruk Purut) yang ada di kebun sekolah adalah ....',
    options: [
      { label: 'A', text: '72 polybag' },
      { label: 'B', text: '90 polybag' },
      { label: 'C', text: '104 polybag' },
      { label: 'D', text: '117 polybag' }
    ],
    correctAnswer: 'D',
    explanation: 'Misalkan faktor pengali rasio adalah x. Banyak bibit Jeruk Kasturi = 8x dan Jeruk Purut = 5x. Selisihnya: 8x - 5x = 3x = 27 -> x = 27 / 3 = 9. Total seluruh bibit = (8 + 5) × 9 = 13 × 9 = 117 polybag (72 bibit Kasturi + 45 bibit Purut). Jawaban yang benar adalah opsi D (117 polybag).'
  },
  {
    id: 109,
    number: 9,
    type: 'pg',
    level: 'Aplikasi',
    competency: '3.4',
    competencyTitle: 'Rasio Satuan & Laju Perubahan Satuan',
    indicatorABCD: {
      condition: 'Disajikan data laju aliran mesin pompa pengairan lahan hortikultura Wanaraya,',
      audience: 'peserta didik kelas 7',
      behavior: 'dapat menentukan durasi waktu yang dibutuhkan untuk mengalirkan volume air tertentu',
      degree: 'dengan perhitungan matematika yang akurat.'
    },
    stimulus: {
      title: 'Kapasitas Debit Pompa Pengairan Kebun Hortikultura',
      context: 'Untuk menyiram bedengan tanaman hortikultura pada musim kemarau, Kelompok Tani Muda Wanaraya menggunakan pompa air bertenaga stabil dari tandon kanal. Dari hasil pengujian awal, pompa tersebut mampu mengalirkan volume air sebanyak 5.400 liter dalam waktu 36 menit secara konstan tanpa mengalami penurunan tekanan.',
      tableData: {
        headers: ['Waktu Pompa Bekerja', 'Volume Air Mengalir', 'Laju Aliran (Debit)'],
        rows: [
          ['36 menit', '5.400 liter', 'Konstan']
        ]
      }
    },
    prompt: 'Jika petani memerlukan pasokan air sebanyak 21.000 liter untuk mengisi penuh bak penampungan irigasi kebun, berapa lama mesin pompa harus dijalankan?',
    options: [
      { label: 'A', text: '120 menit (2 jam)' },
      { label: 'B', text: '135 menit (2 jam 15 menit)' },
      { label: 'C', text: '140 menit (2 jam 20 menit)' },
      { label: 'D', text: '150 menit (2 jam 30 menit)' }
    ],
    correctAnswer: 'C',
    explanation: 'Laju aliran (debit) pompa = 5.400 liter ÷ 36 menit = 150 liter/menit. Waktu untuk mengisi 21.000 liter = Volume ÷ Debit = 21.000 ÷ 150 = 140 menit (atau 2 jam 20 menit). Opsi C tepat.'
  },
  {
    id: 110,
    number: 10,
    type: 'pg',
    level: 'Aplikasi',
    competency: '3.2',
    competencyTitle: 'Faktor Skala dalam Pemecahan Masalah',
    indicatorABCD: {
      condition: 'Disajikan gambar denah ruang Laboratorium IPA sekolah dengan ukuran skala 1 : 125,',
      audience: 'peserta didik kelas 7',
      behavior: 'dapat menghitung luas sebenarnya ruang Laboratorium IPA dalam satuan meter persegi',
      degree: 'secara tepat.'
    },
    stimulus: {
      title: 'Pembangunan Ruang Laboratorium IPA Terpadu SMPN 1 Wanaraya',
      context: 'SMPN 1 Wanaraya merencanakan renovasi ruang Laboratorium IPA untuk menunjang praktikum sains siswa Fase D pada tahun ajaran 2026/2027. Pada lembar cetak biru arsitek berskala 1 : 125, denah ruangan berbentuk persegi panjang tersebut digambar dengan ukuran panjang 12 cm dan lebar 8 cm.',
      diagramType: 'blueprint',
      imageCaption: 'Cetak Biru Ruang Laboratorium IPA SMPN 1 Wanaraya (Skala 1 : 125)',
      chartData: {
        headerTitle: 'Cetak Biru (Blueprint) Lab IPA SMPN 1 Wanaraya',
        roomLabel: 'RUANG LABORATORIUM IPA',
        scale: '1 : 125',
        length: '12 cm',
        width: '8 cm'
      },
      tableData: {
        headers: ['Dimensi pada Denah', 'Panjang = 12 cm', 'Lebar = 8 cm'],
        rows: [
          ['Skala Rancang Bangun', '1 : 125', 'Konversi cm ke meter: 1 m = 100 cm']
        ]
      }
    },
    prompt: 'Luas lantai sebenarnya dari ruang Laboratorium IPA tersebut adalah ....',
    options: [
      { label: 'A', text: '150 m²' },
      { label: 'B', text: '120 m²' },
      { label: 'C', text: '180 m²' },
      { label: 'D', text: '240 m²' }
    ],
    correctAnswer: 'A',
    explanation: 'Panjang sebenarnya = 12 cm × 125 = 1.500 cm = 15 meter. Lebar sebenarnya = 8 cm × 125 = 1.000 cm = 10 meter. Luas sebenarnya = Panjang sebenarnya × Lebar sebenarnya = 15 m × 10 m = 150 m². Jawaban benar adalah opsi A (150 m²).'
  },

  // ==========================================
  // SOAL 11 s/d 14: PILIHAN GANDA KOMPLEKS (PGK MCMA)
  // KUNCI ACAK: ['B','C','D'], ['A','C'], ['B','D'], ['A','C','D']
  // ==========================================
  {
    id: 111,
    number: 11,
    type: 'pgk_mcma',
    level: 'Penalaran',
    competency: '3.1',
    competencyTitle: 'Konsep Rasio & Perbedaan dengan Selisih',
    instruction: 'Pilihlah Pernyataan berikut jawaban pilih lebih dari 1 jawaban yang benar.',
    indicatorABCD: {
      condition: 'Disajikan data komparasi luas lahan dan hasil panen padi dua kelompok tani di Wanaraya Barito Kuala,',
      audience: 'peserta didik kelas 7',
      behavior: 'dapat menghitung dan menalar perbandingan produktivitas per hektar serta perbedaan antara rasio multiplikatif dan selisih aditif',
      degree: 'secara kritis dan multi-kriteria.'
    },
    stimulus: {
      title: 'Komparasi Produktivitas Padi Unggul Rawa Pasang Surut',
      context: 'Dua kelompok tani muda di Barito Kuala mencatat hasil panen padi musim tanam rendengan. Kelompok Tani "Tunas Harapan" menggarap lahan seluas 6 hektar dan memperoleh total panen 27 ton gabah kering. Sementara itu, Kelompok Tani "Mandiri Jaya" menggarap lahan seluas 10 hektar dan berhasil memanen 55 ton gabah kering. Penyuluh pertanian meminta siswa mengevaluasi tingkat produktivitas per hektar masing-masing kelompok.',
      diagramType: 'rice_field',
      imageCaption: 'Data Petak Sawah Lahan Rawa Kelompok Tani Tunas Harapan & Mandiri Jaya',
      chartData: {
        group1: 'Kelompok Tunas Harapan',
        area1: '6 Hektar',
        harvest1: '27 Ton Gabah',
        group2: 'Kelompok Mandiri Jaya',
        area2: '10 Hektar',
        harvest2: '55 Ton Gabah'
      },
      tableData: {
        headers: ['Kelompok Tani', 'Luas Lahan (hektar)', 'Total Hasil Panen (ton)'],
        rows: [
          ['Tunas Harapan', '6 ha', '27 ton'],
          ['Mandiri Jaya', '10 ha', '55 ton']
        ]
      }
    },
    prompt: 'Manakah pernyataan-pernyataan berikut yang bernilai BENAR mengenai rasio dan selisih produktivitas kedua kelompok tani tersebut? (Pilih semua yang benar)',
    options: [
      { id: 'A', text: 'Produktivitas rata-rata per hektar Kelompok Tani Tunas Harapan adalah 4,8 ton/ha.' },
      { id: 'B', text: 'Produktivitas rata-rata per hektar Kelompok Tani Mandiri Jaya adalah 5,5 ton/ha.' },
      { id: 'C', text: 'Rasio produktivitas per hektar antara Tunas Harapan dan Mandiri Jaya dalam bentuk paling sederhana adalah 9 : 11.' },
      { id: 'D', text: 'Selisih produktivitas hasil panen per hektar kedua kelompok tani tersebut adalah 1,0 ton/ha.' }
    ],
    correctAnswers: ['B', 'C', 'D'],
    explanation: 'Pembahasan:\n1. Produktivitas Tunas Harapan = 27 ton / 6 ha = 4,5 ton/ha, bukan 4,8 ton/ha (Pernyataan A SALAH).\n2. Produktivitas Mandiri Jaya = 55 ton / 10 ha = 5,5 ton/ha (Pernyataan B BENAR).\n3. Rasio produktivitas = 4,5 : 5,5 = 45 : 55 = 9 : 11 (Pernyataan C BENAR).\n4. Selisih produktivitas = 5,5 - 4,5 = 1,0 ton/ha (Pernyataan D BENAR).\nJawaban benar: B, C, dan D.'
  },
  {
    id: 112,
    number: 12,
    type: 'pgk_mcma',
    level: 'Penalaran',
    competency: '3.3',
    competencyTitle: 'Rasio Ekuivalen & Proporsi',
    instruction: 'Pilihlah Pernyataan berikut jawaban pilih lebih dari 1 jawaban yang benar.',
    indicatorABCD: {
      condition: 'Disajikan resep formulasi larutan Eco-Enzyme dari kulit jeruk Siam Wanaraya dengan rasio komposisi tertentu,',
      audience: 'peserta didik kelas 7',
      behavior: 'dapat menganalisis volume tiap bahan dan perubahan rasio jika salah satu komponen ditambah',
      degree: 'dengan penalaran matematika mendalam.'
    },
    stimulus: {
      title: 'Pembuatan Cairan Eco-Enzyme Limbah Kulit Jeruk Wanaraya',
      context: 'Ekstrakurikuler KIR SMPN 1 Wanaraya mengolah limbah kulit jeruk Siam menjadi larutan pembersih ramah lingkungan dan pupuk cair (Eco-Enzyme). Komposisi larutan biang yang dibuat menggunakan perbandingan volume gula merah cair dan sari kulit jeruk sebesar 2 : 5. Tim siswa menyiapkan drum fermentasi berkapasitas total larutan campuran 140 liter.',
      diagramType: 'fertilizer_mix',
      imageCaption: 'Tabung Formulasi Campuran Eco-Enzyme Kulit Jeruk Wanaraya',
      chartData: {
        headerTitle: 'Tabung Formulasi Larutan Eco-Enzyme Kulit Jeruk',
        target: 'Target: 140 Liter',
        part1Val: '2 Bagian',
        part1Label: 'Gula Merah Cair',
        part2Val: '5 Bagian',
        part2Label: 'Sari Kulit Jeruk'
      },
      tableData: {
        headers: ['Komponen Larutan', 'Rasio Komposisi', 'Volume Total Target'],
        rows: [
          ['Gula Merah Cair', '2 bagian', '140 liter campuran'],
          ['Sari Kulit Jeruk', '5 bagian', 'Siap fermentasi']
        ]
      }
    },
    prompt: 'Berdasarkan formula rasio campuran tersebut, pilihlah pernyataan-pernyataan yang BENAR di bawah ini!',
    options: [
      { id: 'A', text: 'Volume gula merah cair yang dibutuhkan dalam campuran 140 liter adalah 40 liter.' },
      { id: 'B', text: 'Volume sari kulit jeruk yang diperlukan dalam campuran tersebut adalah 90 liter.' },
      { id: 'C', text: 'Selisih volume antara sari kulit jeruk dan gula merah cair dalam campuran tersebut adalah 60 liter.' },
      { id: 'D', text: 'Jika ditambahkan 10 liter gula merah cair murni ke dalam campuran 140 liter, rasio baru gula merah terhadap sari kulit jeruk menjadi 3 : 5.' }
    ],
    correctAnswers: ['A', 'C'],
    explanation: 'Pembahasan:\nTotal bagian rasio = 2 + 5 = 7 bagian. Nilai 1 bagian = 140 / 7 = 20 liter.\n- Volume gula merah cair = 2 × 20 = 40 liter (Pernyataan A BENAR).\n- Volume sari kulit jeruk = 5 × 20 = 100 liter, bukan 90 liter (Pernyataan B SALAH).\n- Selisih volume = 100 - 40 = 60 liter (Pernyataan C BENAR).\n- Jika gula merah ditambah 10 liter, volumenya menjadi 40 + 10 = 50 liter. Rasio baru = 50 : 100 = 1 : 2, bukan 3 : 5 (Pernyataan D SALAH).\nJawaban benar: A dan C.'
  },
  {
    id: 113,
    number: 13,
    type: 'pgk_mcma',
    level: 'Penalaran',
    competency: '3.4',
    competencyTitle: 'Rasio Satuan & Laju Perubahan Satuan',
    instruction: 'Pilihlah Pernyataan berikut jawaban pilih lebih dari 1 jawaban yang benar.',
    indicatorABCD: {
      condition: 'Disajikan studi kasus konsumsi bahan bakar solar dan jarak tempuh dua mobil angkutan hasil kebun jalur Wanaraya - Banjarmasin,',
      audience: 'peserta didik kelas 7',
      behavior: 'dapat mengevaluasi laju satuan efisiensi bahan bakar dan merumuskan kesimpulan komparatif',
      degree: 'secara logis dan sistematis.'
    },
    stimulus: {
      title: 'Uji Efisiensi Bahan Bakar Mobil Angkutan Hasil Kebun',
      context: 'Koperasi petani melakukan uji efisiensi bahan bakar solar pada dua unit mobil bak terbuka pengangkut jeruk di rute Wanaraya menuju pasar induk Banjarmasin. Mobil Angkut P mampu menempuh jarak total 192 kilometer dengan menghabiskan 16 liter solar. Sementara itu, Mobil Angkut Q menempuh total jarak 252 kilometer dengan menghabiskan 14 liter solar.',
      tableData: {
        headers: ['Kendaraan Angkut', 'Jarak Tempuh (km)', 'Konsumsi Solar (liter)'],
        rows: [
          ['Mobil Angkut P', '192 km', '16 liter'],
          ['Mobil Angkut Q', '252 km', '14 liter']
        ]
      }
    },
    prompt: 'Pilihlah pernyataan-pernyataan yang bernilai BENAR terkait efisiensi bahan bakar kedua kendaraan tersebut!',
    options: [
      { id: 'A', text: 'Mobil Angkut P memiliki laju efisiensi penggunaan solar rata-rata 14 km per liter.' },
      { id: 'B', text: 'Mobil Angkut Q memiliki laju efisiensi penggunaan solar rata-rata 18 km per liter.' },
      { id: 'C', text: 'Mobil Angkut P lebih hemat bahan bakar dibandingkan Mobil Angkut Q.' },
      { id: 'D', text: 'Untuk menempuh jarak 270 km dengan kondisi jalur sama, Mobil Angkut Q membutuhkan 15 liter solar.' }
    ],
    correctAnswers: ['B', 'D'],
    explanation: 'Pembahasan:\n- Laju efisiensi Mobil Angkut P = 192 km / 16 liter = 12 km/liter, bukan 14 km/liter (Pernyataan A SALAH).\n- Laju efisiensi Mobil Angkut Q = 252 km / 14 liter = 18 km/liter (Pernyataan B BENAR).\n- Mobil Angkut Q menempuh jarak lebih jauh per liternya (18 km vs 12 km), sehingga Q lebih hemat daripada P (Pernyataan C SALAH).\n- Kebutuhan solar Mobil Q untuk 270 km = 270 / 18 = 15 liter (Pernyataan D BENAR).\nJawaban benar: B dan D.'
  },
  {
    id: 114,
    number: 14,
    type: 'pgk_mcma',
    level: 'Penalaran',
    competency: '3.2',
    competencyTitle: 'Faktor Skala dalam Pemecahan Masalah',
    instruction: 'Pilihlah Pernyataan berikut jawaban pilih lebih dari 1 jawaban yang benar.',
    indicatorABCD: {
      condition: 'Disajikan rancang gambar denah Taman Literasi SMPN 1 Wanaraya yang mengalami perbesaran faktor skala,',
      audience: 'peserta didik kelas 7',
      behavior: 'dapat menganalisis dampak perubahan faktor skala terhadap dimensi gambar, luas denah, dan skala representasi',
      degree: 'secara akurat.'
    },
    stimulus: {
      title: 'Rancangan Denah Taman Literasi SMPN 1 Wanaraya',
      context: 'Tim Adiwiyata SMPN 1 Wanaraya merancang denah pembangunan Taman Literasi Sekolah berbentuk persegi panjang. Pada denah awal, gambar taman memiliki panjang 10 cm dan lebar 6 cm dengan skala 1 : 150. Agar mudah dipresentasikan di depan dewan guru, siswa menggambar ulang denah presentasi baru yang diperbesar dengan faktor skala k = 2 (panjang dan lebar gambar digandakan 2 kali lipat).',
      diagramType: 'stage_scale',
      imageCaption: 'Perbandingan Skala Denah Awal dan Denah Presentasi Baru Taman Literasi',
      chartData: {
        headerTitle: 'Perbandingan Skala Denah Taman Literasi Sekolah',
        factor: 'Faktor Skala k = 2',
        initialDim: '10 cm × 6 cm',
        initialLabel: 'Denah Awal (Skala 1:150)',
        newDim: 'Perbesaran k = 2',
        newLabel: 'Denah Presentasi Baru'
      },
      tableData: {
        headers: ['Rancangan', 'Panjang Denah', 'Lebar Denah', 'Skala Representasi'],
        rows: [
          ['Denah Awal', '10 cm', '6 cm', '1 : 150'],
          ['Denah Presentasi Baru', 'Perbesaran 2x', 'Perbesaran 2x', 'Diperbesar k = 2']
        ]
      }
    },
    prompt: 'Pilihlah pernyataan-pernyataan di bawah ini yang bernilai BENAR!',
    options: [
      { id: 'A', text: 'Ukuran panjang sebenarnya taman literasi tersebut adalah 15 meter dan lebar sebenarnya 9 meter.' },
      { id: 'B', text: 'Luas gambar denah baru pada kertas menjadi tepat 2 kali lipat dari luas denah awal.' },
      { id: 'C', text: 'Pada denah presentasi baru, ukuran panjang gambar menjadi 20 cm dan lebarnya menjadi 12 cm.' },
      { id: 'D', text: 'Skala pada denah presentasi baru yang telah diperbesar 2 kali tersebut berubah menjadi 1 : 75 terhadap ukuran nyata.' }
    ],
    correctAnswers: ['A', 'C', 'D'],
    explanation: 'Pembahasan:\n- Panjang nyata = 10 cm × 150 = 1.500 cm = 15 m; Lebar nyata = 6 cm × 150 = 900 cm = 9 m (Pernyataan A BENAR).\n- Luas denah awal = 10 × 6 = 60 cm². Dimensi baru = 20 cm × 12 cm -> Luas baru = 240 cm². Perbandingan luas = 240 / 60 = 4 kali lipat (k² = 2² = 4), bukan 2 kali lipat (Pernyataan B SALAH).\n- Panjang dan lebar denah baru = 20 cm dan 12 cm (Pernyataan C BENAR).\n- Skala baru = 20 cm : 1.500 cm = 1 : 75 (Pernyataan D BENAR).\nJawaban benar: A, C, dan D.'
  },

  // ==========================================
  // SOAL 15 s/d 20: PILIHAN GANDA KATEGORIK (BENAR / SALAH)
  // KUNCI ACAK BERVARIASI:
  // 15: [Salah, Benar, Benar]
  // 16: [Benar, Salah, Salah]
  // 17: [Salah, Benar, Salah]
  // 18: [Benar, Salah, Benar]
  // 19: [Salah, Salah, Benar]
  // 20: [Benar, Benar, Salah]
  // ==========================================
  {
    id: 115,
    number: 15,
    type: 'pgk_kategori',
    level: 'Pemahaman',
    competency: '3.1',
    competencyTitle: 'Konsep Rasio & Perbedaan dengan Selisih',
    instruction: 'Pilihlah Pernyataan berikut jawaban yang benar atau salah.',
    indicatorABCD: {
      condition: 'Disajikan tabel data perbandingan koleksi pot tanaman hias dua siswi kelas 7B pada berbagai perlakuan,',
      audience: 'peserta didik kelas 7',
      behavior: 'dapat membedakan sifat perubahan nilai rasio (multiplikatif) dan selisih (aditif) saat kuantitas ditambah atau dikalikan bilangan konstan',
      degree: 'secara tepat.'
    },
    stimulus: {
      title: 'Perbandingan Multiplikatif vs Aditif pada Koleksi Tanaman Sekolah',
      context: 'Dua siswi kelas 7B, Nabila dan Aisyah, merawat koleksi pot bunga di depan kelas mereka. Saat ini Nabila merawat 10 pot dan Aisyah merawat 15 pot. Mereka menyelidiki perubahan nilai rasio dan selisih apabila jumlah pot mereka masing-masing ditambah 5 buah dibandingkan dengan apabila jumlah pot masing-masing dilipatgandakan 3 kali.',
      tableData: {
        headers: ['Perlakuan Data', 'Pot Nabila (A)', 'Pot Aisyah (B)', 'Rasio (A : B)', 'Selisih (|A - B|)'],
        rows: [
          ['Kondisi Awal', 10, 15, '2 : 3', '5 pot'],
          ['Ditambah 5 pot masing-masing', 15, 20, '...', '...'],
          ['Dikalikan 3 masing-masing', 30, 45, '...', '...']
        ]
      }
    },
    prompt: 'Tentukan BENAR atau SALAH untuk setiap pernyataan berikut berdasarkan prinsip dasar rasio dan selisih!',
    statements: [
      {
        id: 's1',
        statement: 'Jika jumlah pot Nabila dan Aisyah masing-masing ditambah 5 pot, maka rasio koleksi mereka akan tetap 2 : 3.',
        correctAnswer: 'Salah'
      },
      {
        id: 's2',
        statement: 'Selisih jumlah pot antara Aisyah dan Nabila tidak berubah (tetap 5 pot) meskipun koleksi masing-masing ditambah 5 pot.',
        correctAnswer: 'Benar'
      },
      {
        id: 's3',
        statement: 'Rasio koleksi pot akan tetap ekuivalen (2 : 3) apabila jumlah pot keduanya sama-sama dikalikan dengan bilangan 3.',
        correctAnswer: 'Benar'
      }
    ],
    explanation: 'Pembahasan:\n- Pernyataan 1 (SALAH): Jika masing-masing ditambah 5 menjadi 15 dan 20. Rasionya berubah menjadi 15 : 20 = 3 : 4 (tidak tetap 2 : 3).\n- Pernyataan 2 (BENAR): Selisih aditif (15 + 5) - (10 + 5) = 20 - 15 = 5 pot, sehingga tetap konstan.\n- Pernyataan 3 (BENAR): Mengalikan kedua suku rasio dengan pengali konstan 3 menghasilkan 30 : 45 yang tetap ekuivalen dengan 2 : 3.'
  },
  {
    id: 116,
    number: 16,
    type: 'pgk_kategori',
    level: 'Aplikasi',
    competency: '3.3',
    competencyTitle: 'Rasio Ekuivalen & Proporsi',
    instruction: 'Pilihlah Pernyataan berikut jawaban yang benar atau salah.',
    indicatorABCD: {
      condition: 'Disajikan data produksi kerajinan tikar anyaman purun khas Kabupaten Barito Kuala,',
      audience: 'peserta didik kelas 7',
      behavior: 'dapat menghitung dan memvalidasi kebutuhan serat purun serta waktu pengerjaan dengan proporsi senilai',
      degree: 'dengan benar.'
    },
    stimulus: {
      title: 'Produksi Tikar Anyaman Purun Tradisional Barito Kuala',
      context: 'Selain tas belanja, perajin anyaman di Kecamatan Wanaraya juga memproduksi tikar purun ukuran sedang untuk kebutuhan rumah tangga dan wisata budaya. Berdasarkan catatan kelompok perajin, untuk menyelesaikan 5 lembar tikar purun ukuran sedang diperlukan bahan baku 30 ikat serat purun kering dan membutuhkan waktu kerja total selama 15 jam secara proporsional.',
      imageUrl: '/src/assets/images/anyaman_purun_batola_1794020305573.jpg',
      imageCaption: 'Proses Penganyaman Serat Purun Kering oleh Perajin Barito Kuala',
      tableData: {
        headers: ['Kuantitas Produksi', 'Kebutuhan Serat Purun', 'Waktu Pengerjaan'],
        rows: [
          ['5 lembar tikar', '30 ikat purun', '15 jam kerja'],
          ['Hubungan Variabel', 'Proporsi Senilai', 'Ritme Konstan']
        ]
      }
    },
    prompt: 'Tentukan BENAR atau SALAH untuk setiap pernyataan terkait produksi tikar purun tersebut!',
    statements: [
      {
        id: 's1',
        statement: 'Untuk menghasilkan 8 lembar tikar purun ukuran yang sama, perajin membutuhkan 48 ikat serat purun kering.',
        correctAnswer: 'Benar'
      },
      {
        id: 's2',
        statement: 'Jika perajin hanya memiliki persediaan 42 ikat serat purun, maka banyak tikar yang dapat diselesaikan paling banyak hanya 6 lembar.',
        correctAnswer: 'Salah'
      },
      {
        id: 's3',
        statement: 'Waktu pengerjaan yang diperlukan untuk menyelesaikan 9 lembar tikar purun dengan ritme kerja yang sama adalah 24 jam.',
        correctAnswer: 'Salah'
      }
    ],
    explanation: 'Pembahasan:\n- Kebutuhan serat per lembar tikar = 30 / 5 = 6 ikat/tikar.\n  Pernyataan 1: Untuk 8 lembar tikar = 8 × 6 = 48 ikat (BENAR).\n  Pernyataan 2: Dengan 42 ikat purun = 42 / 6 = 7 lembar tikar, bukan 6 lembar (SALAH).\n- Waktu per lembar tikar = 15 jam / 5 = 3 jam/tikar.\n  Pernyataan 3: Untuk 9 lembar tikar = 9 × 3 jam = 27 jam, bukan 24 jam (SALAH).'
  },
  {
    id: 117,
    number: 17,
    type: 'pgk_kategori',
    level: 'Penalaran',
    competency: '3.4',
    competencyTitle: 'Rasio Satuan & Laju Perubahan Satuan',
    instruction: 'Pilihlah Pernyataan berikut jawaban yang benar atau salah.',
    indicatorABCD: {
      condition: 'Disajikan tabel laju pembuangan air genangan lahan rawa lebak menggunakan mesin pompa air,',
      audience: 'peserta didik kelas 7',
      behavior: 'dapat mengevaluasi debit aliran air per menit dan durasi pengoperasian pompa secara proporsional',
      degree: 'secara kritis.'
    },
    stimulus: {
      title: 'Pemantauan Debit Pompa Pengeringan Lahan Rawa Lebak',
      context: 'Untuk mencegah kerusakan akar tanaman muda akibat banjir pasang surut, kelompok tani di Wanaraya mengoperasikan pompa penyedot air berkapasitas besar. Berdasarkan catatan sensor aliran digital pada pipa keluar selama 40 menit pertama, pompa bekerja dengan laju debit stabil sebagaimana disajikan pada tabel di bawah ini.',
      diagramType: 'pump_debit',
      imageCaption: 'Data Pengamatan Laju Debit Pompa Drainase Sawah Wanaraya',
      chartData: {
        headerTitle: 'Instalasi Pompa Pengeringan Rawa Lebak Wanaraya',
        m1: 'Menit ke-10',
        v1: '4.200 Liter',
        m2: 'Menit ke-20',
        v2: '8.400 Liter',
        m3: 'Menit ke-40',
        v3: '16.800 Liter'
      },
      tableData: {
        headers: ['Waktu Pengoperasian (menit)', '10', '20', '30', '40'],
        rows: [
          ['Volume Air Dibuang (liter)', '4.200', '8.400', '12.600', '16.800']
        ]
      }
    },
    prompt: 'Berdasarkan data laju pengoperasian pompa air tersebut, tentukan BENAR atau SALAH untuk setiap pernyataan berikut!',
    statements: [
      {
        id: 's1',
        statement: 'Laju perubahan volume pembuangan air (debit pompa) tersebut adalah 450 liter per menit.',
        correctAnswer: 'Salah'
      },
      {
        id: 's2',
        statement: 'Jika pompa beroperasi terus-menerus selama 2 jam, volume air yang berhasil dipindahkan adalah 50.400 liter.',
        correctAnswer: 'Benar'
      },
      {
        id: 's3',
        statement: 'Untuk membuang genangan air sebanyak 63.000 liter, pompa tersebut membutuhkan waktu operasi tepat 2 jam 15 menit.',
        correctAnswer: 'Salah'
      }
    ],
    explanation: 'Pembahasan:\n- Laju debit = 4.200 liter / 10 menit = 420 liter/menit, bukan 450 liter/menit (Pernyataan 1 SALAH).\n- 2 jam = 120 menit. Volume = 120 × 420 = 50.400 liter (Pernyataan 2 BENAR).\n- Waktu untuk 63.000 liter = 63.000 / 420 = 150 menit = 2 jam 30 menit, bukan 2 jam 15 menit (Pernyataan 3 SALAH).'
  },
  {
    id: 118,
    number: 18,
    type: 'pgk_kategori',
    level: 'Penalaran',
    competency: '3.3',
    competencyTitle: 'Rasio Ekuivalen & Proporsi',
    instruction: 'Pilihlah Pernyataan berikut jawaban yang benar atau salah.',
    indicatorABCD: {
      condition: 'Disajikan studi kasus percepatan waktu proyek pengecatan dan perbaikan taman baca SMPN 1 Wanaraya,',
      audience: 'peserta didik kelas 7',
      behavior: 'dapat menganalisis model perbandingan berbalik nilai antara jumlah pekerja dan waktu penyelesaian pekerjaan',
      degree: 'dengan nalar pemecahan masalah yang tepat.'
    },
    stimulus: {
      title: 'Percepatan Pengerjaan Taman Baca & Pengecatan Ruang Kelas',
      context: 'Menjelang penilaian lomba sekolah sehat tingkat Kabupaten Barito Kuala, panitia sekolah menjadwalkan pengecatan ulang gedung dan perbaikan taman baca. Dari estimasi awal, pekerjaan tersebut dapat diselesaikan dalam waktu 18 hari oleh 8 orang tukang dengan produktivitas kerja sama rata. Namun agar siap sebelum tim penilai datang, pekerjaan harus diselesaikan lebih cepat dalam waktu 12 hari kerja.',
      tableData: {
        headers: ['Rencana Kerja', 'Jumlah Pekerja', 'Waktu Penyelesaian'],
        rows: [
          ['Rencana Semula', '8 orang', '18 hari'],
          ['Rencana Dipercepat', 'x orang (ditambah)', '12 hari']
        ]
      }
    },
    prompt: 'Tentukan BENAR atau SALAH untuk setiap pernyataan terkait perencanaan tenaga kerja proyek sekolah tersebut!',
    statements: [
      {
        id: 's1',
        statement: 'Hubungan antara banyaknya pekerja dan lama waktu penyelesaian pekerjaan merupakan bentuk perbandingan berbalik nilai.',
        correctAnswer: 'Benar'
      },
      {
        id: 's2',
        statement: 'Agar proyek tuntas dalam waktu 12 hari, jumlah total pekerja yang diperlukan adalah 10 orang.',
        correctAnswer: 'Salah'
      },
      {
        id: 's3',
        statement: 'Panitia sekolah perlu merekrut tambahan pekerja baru sebanyak 4 orang dari jumlah pekerja awal yang sudah ada.',
        correctAnswer: 'Benar'
      }
    ],
    explanation: 'Pembahasan:\n- Semakin banyak pekerja, semakin singkat waktu penyelesaian -> Perbandingan berbalik nilai (Pernyataan 1 BENAR).\n- Persamaan berbalik nilai: 8 × 18 = p2 × 12 -> 144 = 12 p2 -> p2 = 144 / 12 = 12 orang, bukan 10 orang (Pernyataan 2 SALAH).\n- Tambahan pekerja yang dibutuhkan = 12 - 8 = 4 orang (Pernyataan 3 BENAR).'
  },
  {
    id: 119,
    number: 19,
    type: 'pgk_kategori',
    level: 'Penalaran',
    competency: '3.2',
    competencyTitle: 'Faktor Skala dalam Pemecahan Masalah',
    instruction: 'Pilihlah Pernyataan berikut jawaban yang benar atau salah.',
    indicatorABCD: {
      condition: 'Disajikan peta rute kunjungan edukasi lintas objek Kalimantan Selatan berskala 1 : 500.000 dengan dua etape perjalanan,',
      audience: 'peserta didik kelas 7',
      behavior: 'dapat mengevaluasi jarak sebenarnya tiap etape dan total waktu tempuh menggunakan konsep skala dan laju kecepatan',
      degree: 'secara komprehensif.'
    },
    stimulus: {
      title: 'Peta Rute Kunjungan Edukasi Geopark & Kota Banjarmasin',
      context: 'SMP Negeri 1 Wanaraya menjadwalkan kegiatan karyawisata pengamatan ekosistem Kalimantan Selatan. Pada peta wisata berskala 1 : 500.000, rute dibagi dalam dua etape: Etape 1 (SMPN 1 Wanaraya menuju Menara Pandang Banjarmasin) berjarak 7 cm pada peta; dan Etape 2 (Menara Pandang menuju Taman Hutan Raya Sultan Adam) berjarak 9 cm pada peta. Bus sekolah melaju dengan kecepatan rata-rata konstan 50 km/jam.',
      tableData: {
        headers: ['Etape Perjalanan', 'Jarak pada Peta', 'Skala Peta'],
        rows: [
          ['Etape 1: Wanaraya - Menara Pandang', '7 cm', '1 : 500.000'],
          ['Etape 2: Menara Pandang - Tahura Sultan Adam', '9 cm', '1 : 500.000']
        ]
      }
    },
    prompt: 'Tentukan BENAR atau SALAH untuk setiap pernyataan terkait perjalanan kunjungan edukasi tersebut!',
    statements: [
      {
        id: 's1',
        statement: 'Jarak sebenarnya pada Etape 1 (SMPN 1 Wanaraya ke Menara Pandang Banjarmasin) adalah 30 kilometer.',
        correctAnswer: 'Salah'
      },
      {
        id: 's2',
        statement: 'Total jarak sebenarnya yang ditempuh bus dari SMPN 1 Wanaraya hingga Tahura Sultan Adam adalah 75 kilometer.',
        correctAnswer: 'Salah'
      },
      {
        id: 's3',
        statement: 'Dengan kecepatan rata-rata bus 50 km/jam tanpa berhenti istirahat, total waktu tempuh di perjalanan adalah 1 jam 36 menit.',
        correctAnswer: 'Benar'
      }
    ],
    explanation: 'Pembahasan:\n- Etape 1 sebenarnya = 7 cm × 500.000 = 3.500.000 cm = 35 km, bukan 30 km (Pernyataan 1 SALAH).\n- Etape 2 sebenarnya = 9 cm × 500.000 = 4.500.000 cm = 45 km. Total jarak = 35 km + 45 km = 80 km, bukan 75 km (Pernyataan 2 SALAH).\n- Waktu tempuh = Jarak / Kecepatan = 80 km / 50 km/jam = 1,6 jam = 1 jam + (0,6 × 60 menit) = 1 jam 36 menit (Pernyataan 3 BENAR).'
  },
  {
    id: 120,
    number: 20,
    type: 'pgk_kategori',
    level: 'Penalaran',
    competency: '3.4',
    competencyTitle: 'Rasio Satuan & Laju Perubahan Satuan',
    instruction: 'Pilihlah Pernyataan berikut jawaban yang benar atau salah.',
    indicatorABCD: {
      condition: 'Disajikan studi kasus transaksi penjualan Sirup Jeruk Kasturi dan Beras Siam Unus di Koperasi Wanaraya yang memadukan rasio harga dan persamaan linier,',
      audience: 'peserta didik kelas 7',
      behavior: 'dapat menyelesaikan model persamaan aljabar untuk menentukan harga satuan masing-masing barang dan mengevaluasi tagihan pembelian',
      degree: 'secara kritis dan teliti.'
    },
    stimulus: {
      title: 'Paket Oleh-Oleh Sirup Kasturi dan Beras Siam Unus Wanaraya',
      context: 'Bazar koperasi sekolah menjual paket oleh-oleh khas daerah berupa Sirup Jeruk Kasturi botolan dan Beras Siam Unus kemasan 5 kg. Diketahui rasio harga 1 botol Sirup Kasturi terhadap harga 1 kemasan Beras Siam Unus (5 kg) adalah 1 : 3. Seorang wali murid membeli 4 botol Sirup Kasturi dan 3 kemasan Beras Siam Unus dengan total pembayaran tepat sebesar Rp260.000.',
      tableData: {
        headers: ['Komoditas', 'Rasio Harga per Satuan', 'Pembelian Wali Murid'],
        rows: [
          ['Sirup Jeruk Kasturi (per botol)', '1 bagian (x)', '4 botol'],
          ['Beras Siam Unus 5 kg (per kemasan)', '3 bagian (3x)', '3 kemasan'],
          ['Total Pembayaran', '4(x) + 3(3x) = Rp260.000', 'Tunai']
        ]
      }
    },
    prompt: 'Berdasarkan informasi harga dan rasio transaksi tersebut, tentukan BENAR atau SALAH untuk setiap pernyataan berikut!',
    statements: [
      {
        id: 's1',
        statement: 'Harga satuan untuk 1 botol Sirup Jeruk Kasturi adalah Rp20.000.',
        correctAnswer: 'Benar'
      },
      {
        id: 's2',
        statement: 'Harga satuan untuk 1 kemasan Beras Siam Unus (5 kg) adalah Rp60.000.',
        correctAnswer: 'Benar'
      },
      {
        id: 's3',
        statement: 'Jika seorang pembeli lain ingin membeli 5 botol Sirup Kasturi dan 2 kemasan Beras Siam Unus, ia harus membayar sebesar Rp240.000.',
        correctAnswer: 'Salah'
      }
    ],
    explanation: 'Pembahasan:\nMisalkan harga 1 botol Sirup Kasturi = x, maka harga 1 kemasan Beras = 3x.\nPersamaan linier: 4(x) + 3(3x) = 260.000 -> 4x + 9x = 260.000 -> 13x = 260.000 -> x = 20.000.\n- Harga 1 botol Sirup Kasturi = x = Rp20.000 (Pernyataan 1 BENAR).\n- Harga 1 kemasan Beras Siam Unus = 3x = 3 × 20.000 = Rp60.000 (Pernyataan 2 BENAR).\n- Biaya 5 botol Sirup + 2 kemasan Beras = (5 × 20.000) + (2 × 60.000) = 100.000 + 120.000 = Rp220.000, bukan Rp240.000 (Pernyataan 3 SALAH).'
  }
];
