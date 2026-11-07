import { Question } from '../types';

export const QUESTIONS_DATA: Question[] = [
  // ==========================================
  // SOAL 1 s/d 10: PILIHAN GANDA (PG)
  // ==========================================
  {
    id: 1,
    number: 1,
    type: 'pg',
    level: 'Pemahaman',
    competency: '3.1',
    competencyTitle: 'Konsep Rasio & Perbedaan dengan Selisih',
    indicatorABCD: {
      condition: 'Disajikan narasi hasil panen buah jeruk Siam Banjar di perkebunan Wanaraya Barito Kuala,',
      audience: 'peserta didik kelas 7',
      behavior: 'dapat menentukan rasio bentuk paling sederhana serta membedakannya dari nilai selisih kuantitas',
      degree: 'dengan tepat dan logis.'
    },
    stimulus: {
      title: 'Hasil Panen Jeruk Siam Banjar di Kecamatan Wanaraya',
      context: 'Kecamatan Wanaraya di Kabupaten Barito Kuala dikenal sebagai salah satu sentra penghasil Jeruk Siam Banjar berkualitas tinggi. Pada panen raya bulan ini, Kelompok Tani Barokah memanen buah jeruk dan melakukan penyortiran kualitas. Dari hasil pemetikan di lahan blok A, diperoleh 150 kg jeruk mutu super (grade A) dan 90 kg jeruk mutu sedang (grade B). Petani ingin membandingkan hasil panen tersebut baik secara perbandingan multiplikatif (rasio) untuk menentukan efisiensi pohon maupun perbandingan aditif (selisih) untuk menghitung surplus panen grade A.',
      imageUrl: '/src/assets/images/kebun_jeruk_wanaraya_1794020305025.jpg',
      imageCaption: 'Aktivitas Panen Jeruk Siam Banjar di Perkebunan Rakyat Wanaraya',
      tableData: {
        headers: ['Kualitas Jeruk', 'Jumlah Panen (kg)', 'Harga per kg'],
        rows: [
          ['Grade A (Super)', 150, 'Rp18.000'],
          ['Grade B (Sedang)', 90, 'Rp12.000']
        ]
      }
    },
    prompt: 'Berdasarkan data panen tersebut, bentuk rasio paling sederhana antara berat jeruk Grade A terhadap Grade B serta selisih berat kedua grade tersebut berturut-turut adalah ....',
    options: [
      { label: 'A', text: '5 : 3 dan 60 kg' },
      { label: 'B', text: '3 : 5 dan 60 kg' },
      { label: 'C', text: '5 : 2 dan 40 kg' },
      { label: 'D', text: '15 : 9 dan 80 kg' }
    ],
    correctAnswer: 'A',
    explanation: 'Rasio berat Jeruk Grade A terhadap Grade B = 150 : 90. Dibagi FPB(150, 90) = 30, menghasilkan rasio paling sederhana 5 : 3. Sedangkan selisih aditif berat kedua grade = 150 kg - 90 kg = 60 kg. Jawaban yang tepat adalah opsi A (5 : 3 dan 60 kg).'
  },
  {
    id: 2,
    number: 2,
    type: 'pg',
    level: 'Aplikasi',
    competency: '3.2',
    competencyTitle: 'Faktor Skala dalam Pemecahan Masalah',
    indicatorABCD: {
      condition: 'Disajikan peta jaringan jalan dari Marabahan menuju SMPN 1 Wanaraya berskala 1 : 250.000,',
      audience: 'peserta didik kelas 7',
      behavior: 'dapat menghitung jarak sebenarnya antara kedua lokasi dalam satuan kilometer',
      degree: 'dengan benar sesuai konsep skala.'
    },
    stimulus: {
      title: 'Peta Akses Transportasi Wilayah Barito Kuala',
      context: 'Dinas Pendidikan dan Kebudayaan Kabupaten Barito Kuala menerbitkan peta distribusi sekolah jenjang SMP untuk mempermudah pemantauan fasilitas pendidikan. Pada peta resmi berskala 1 : 250.000 tersebut, jarak garis lurus antara kantor Dinas Pendidikan di ibukota Marabahan dengan gerbang SMP Negeri 1 Wanaraya terukur sepanjang 14 cm pada penggaris siswa. Siswa kelas 7 diminta menghitung estimasi jarak sebenarnya guna merencanakan rute kunjungan studi literasi sains.',
      diagramType: 'map_route',
      imageCaption: 'Sketsa Garis Ukur Peta Jalur Marabahan - SMPN 1 Wanaraya (Skala 1 : 250.000)',
      tableData: {
        headers: ['Parameter Peta', 'Nilai'],
        rows: [
          ['Skala Peta', '1 : 250.000'],
          ['Jarak pada Peta', '14 cm'],
          ['Satuan Target', 'Kilometer (km)']
        ]
      }
    },
    prompt: 'Jarak sebenarnya antara Marabahan dan SMP Negeri 1 Wanaraya di lapangan adalah ....',
    options: [
      { label: 'A', text: '25 km' },
      { label: 'B', text: '35 km' },
      { label: 'C', text: '42 km' },
      { label: 'D', text: '350 km' }
    ],
    correctAnswer: 'B',
    explanation: 'Jarak Sebenarnya = Jarak Peta / Skala = 14 cm × 250.000 = 3.500.000 cm. Mengonversi cm ke km (dibagi 100.000): 3.500.000 / 100.000 = 35 km. Jawaban yang tepat adalah opsi B (35 km).'
  },
  {
    id: 3,
    number: 3,
    type: 'pg',
    level: 'Aplikasi',
    competency: '3.3',
    competencyTitle: 'Rasio Ekuivalen & Proporsi',
    indicatorABCD: {
      condition: 'Disajikan data proporsi pewarna alami kain Sasirangan Barito Kuala,',
      audience: 'peserta didik kelas 7',
      behavior: 'dapat menerapkan konsep proporsi senilai untuk menentukan kuantitas bahan yang belum diketahui',
      degree: 'secara tepat.'
    },
    stimulus: {
      title: 'Kerajinan Batik Sasirangan Ramah Lingkungan',
      context: 'Pengrajin kain Sasirangan tradisional di Barito Kuala mempertahankan teknik pewarnaan alami menggunakan rebusan daun ketapang dan kunyit hutan. Dalam satu resep standar pewarnaan celup, untuk mewarnai 6 meter kain mori dibutuhkan 450 gram serbuk pewarna alami. Menjelang peringatan Hari Jadi Kabupaten Barito Kuala, kelompok pengrajin mendapatkan pesanan seragam kain Sasirangan sepanjang 24 meter dengan corak daun bayam gulung yang sama.',
      diagramType: 'sasirangan',
      imageCaption: 'Takaran Proporsi Ekstrak Daun Ketapang Pewarna Alami Sasirangan',
      tableData: {
        headers: ['Panjang Kain Mori (meter)', 'Kebutuhan Pewarna (gram)'],
        rows: [
          ['6 meter', '450 gram'],
          ['24 meter', 'x gram (belum diketahui)']
        ]
      }
    },
    prompt: 'Banyak serbuk pewarna alami yang dibutuhkan pengrajin untuk memenuhi pesanan kain 24 meter tersebut adalah ....',
    options: [
      { label: 'A', text: '1.200 gram' },
      { label: 'B', text: '1.500 gram' },
      { label: 'C', text: '1.800 gram' },
      { label: 'D', text: '2.400 gram' }
    ],
    correctAnswer: 'C',
    explanation: 'Menggunakan proporsi senilai: 6 / 450 = 24 / x. Menggunakan perkalian silang: 6x = 450 × 24 -> 6x = 10.800 -> x = 10.800 / 6 = 1.800 gram (atau 1,8 kg). Jawaban benar adalah opsi C (1.800 gram).'
  },
  {
    id: 4,
    number: 4,
    type: 'pg',
    level: 'Aplikasi',
    competency: '3.4',
    competencyTitle: 'Rasio Satuan & Laju Perubahan Satuan',
    indicatorABCD: {
      condition: 'Disajikan wacana navigasi perahu kelotok menyeberangi Sungai Barito dengan data jarak dan waktu tempuh,',
      audience: 'peserta didik kelas 7',
      behavior: 'dapat menghitung laju perubahan satuan (kecepatan rata-rata dalam km/jam)',
      degree: 'dengan cermat.'
    },
    stimulus: {
      title: 'Laju Kecepatan Perahu Kelotok di Sungai Barito',
      context: 'Perahu kelotok bermesin tempel merupakan sarana transportasi vital bagi masyarakat pesisir Sungai Barito, menghubungkan dermaga penyeberangan dengan desa-desa pasang surut. Sebuah kelotok yang membawa penumpang dan hasil kebun menempuh jarak sungai sejauh 7,2 kilometer dari muara dermaga menuju dermaga transit Wanaraya dalam waktu 24 menit dengan kecepatan konstan tanpa kendala arus air.',
      imageUrl: '/src/assets/images/perahu_kelotok_barito_1794020304682.jpg',
      imageCaption: 'Perahu Kelotok Penyeberangan Sungai Barito Menuju Wanaraya',
      tableData: {
        headers: ['Jarak Tempuh', 'Waktu Tempuh', 'Satuan Target'],
        rows: [
          ['7,2 km', '24 menit', 'km/jam']
        ]
      }
    },
    prompt: 'Laju kecepatan rata-rata perahu kelotok tersebut jika dinyatakan dalam satuan kilometer per jam (km/jam) adalah ....',
    options: [
      { label: 'A', text: '15 km/jam' },
      { label: 'B', text: '18 km/jam' },
      { label: 'C', text: '20 km/jam' },
      { label: 'D', text: '24 km/jam' }
    ],
    correctAnswer: 'B',
    explanation: 'Waktu tempuh 24 menit dikonversi ke jam = 24/60 jam = 0,4 jam (atau 2/5 jam). Kecepatan rata-rata (laju satuan) = Jarak / Waktu = 7,2 km ÷ 0,4 jam = 72 ÷ 4 = 18 km/jam. Jawaban yang benar adalah B (18 km/jam).'
  },
  {
    id: 5,
    number: 5,
    type: 'pg',
    level: 'Aplikasi',
    competency: '3.2',
    competencyTitle: 'Faktor Skala dalam Pemecahan Masalah',
    indicatorABCD: {
      condition: 'Disajikan informasi maket arsitektur Jembatan Barito dengan data panjang miniatur dan panjang fisik sebenarnya,',
      audience: 'peserta didik kelas 7',
      behavior: 'dapat menentukan faktor skala miniatur maket tersebut',
      degree: 'secara tepat.'
    },
    stimulus: {
      title: 'Maket Miniatur Jembatan Barito Terpanjang di Kalimantan Selatan',
      context: 'Jembatan Barito yang membentang di atas Sungai Barito dan menghubungkan Kabupaten Barito Kuala dengan Kota Banjarmasin memiliki panjang total 1.082 meter (dibulatkan menjadi 1.080 meter untuk kepentingan perhitungan teknik dasar). Pada pameran karya teknologi di SMPN 1 Wanaraya, tim ekstrakurikuler robotika dan arsitektur membuat maket miniatur jembatan Barito dengan panjang bentang pada maket tepat 54 cm.',
      imageUrl: '/src/assets/images/jembatan_barito_kalsel_1794020305779.jpg',
      imageCaption: 'Jembatan Barito Penghubung Kabupaten Barito Kuala (Panjang 1.080 m)',
      tableData: {
        headers: ['Objek', 'Dimensi'],
        rows: [
          ['Panjang Jembatan Sebenarnya', '1.080 meter'],
          ['Panjang Jembatan pada Maket', '54 cm']
        ]
      }
    },
    prompt: 'Faktor skala yang digunakan oleh siswa dalam membuat maket jembatan Barito tersebut adalah ....',
    options: [
      { label: 'A', text: '1 : 200' },
      { label: 'B', text: '1 : 500' },
      { label: 'C', text: '1 : 2.000' },
      { label: 'D', text: '1 : 20.000' }
    ],
    correctAnswer: 'C',
    explanation: 'Samakan satuan terlebih dahulu: 1.080 meter = 1.080 × 100 cm = 108.000 cm. Faktor Skala = Ukuran Maket / Ukuran Sebenarnya = 54 cm / 108.000 cm. Bagi pembilang dan penyebut dengan 54: 54/54 = 1 dan 108.000/54 = 2.000. Maka skalanya adalah 1 : 2.000. Pilihan C tepat.'
  },
  {
    id: 6,
    number: 6,
    type: 'pg',
    level: 'Pemahaman',
    competency: '3.1',
    competencyTitle: 'Konsep Rasio & Perbedaan dengan Selisih',
    indicatorABCD: {
      condition: 'Disajikan rincian inventaris perlengkapan belajar di Koperasi Siswa SMPN 1 Wanaraya,',
      audience: 'peserta didik kelas 7',
      behavior: 'dapat menghitung rasio bagian terhadap kuantitas keseluruhan inventaris',
      degree: 'dengan cermat.'
    },
    stimulus: {
      title: 'Inventaris Alat Tulis Koperasi Sekolah',
      context: 'Koperasi Siswa Mandiri SMP Negeri 1 Wanaraya menyediakan kebutuhan alat tulis bagi siswa baru tahun ajaran 2026/2027. Pada awal semester ganjil, pengurus koperasi mencatat stok awal perlengkapan belajar yang terdiri dari 120 buku tulis, 90 pena tinta gel, dan 30 penggaris siku kayu. Guru pembina koperasi meminta bendahara menghitung proporsi stok pena terhadap seluruh stok barang inventaris yang ada di etalase.',
      tableData: {
        headers: ['Jenis Barang', 'Jumlah Stok'],
        rows: [
          ['Buku Tulis', '120 buah'],
          ['Pena Gel', '90 buah'],
          ['Penggaris Siku', '30 buah']
        ]
      }
    },
    prompt: 'Rasio jumlah stok pena gel terhadap TOTAL seluruh barang inventaris di etalase koperasi tersebut dalam bentuk paling sederhana adalah ....',
    options: [
      { label: 'A', text: '3 : 8' },
      { label: 'B', text: '3 : 5' },
      { label: 'C', text: '3 : 4' },
      { label: 'D', text: '9 : 24' }
    ],
    correctAnswer: 'A',
    explanation: 'Total seluruh barang inventaris = 120 + 90 + 30 = 240 buah. Rasio pena gel terhadap total barang = 90 : 240. Bagi kedua bilangan dengan FPB yaitu 30: 90/30 = 3 dan 240/30 = 8. Diperoleh bentuk paling sederhana 3 : 8. Opsi A benar.'
  },
  {
    id: 7,
    number: 7,
    type: 'pg',
    level: 'Aplikasi',
    competency: '3.4',
    competencyTitle: 'Rasio Satuan & Laju Perubahan Satuan',
    indicatorABCD: {
      condition: 'Disajikan tabel penawaran harga kemasan beras lokal Siam Unus Wanaraya di pasar agribisnis,',
      audience: 'peserta didik kelas 7',
      behavior: 'dapat menentukan paket kemasan dengan laju harga satuan (price per unit) paling ekonomis',
      degree: 'secara analitis.'
    },
    stimulus: {
      title: 'Analisis Harga Satuan Beras Siam Unus Wanaraya',
      context: 'Beras Siam Unus merupakan varietas beras lokal pasang surut unggulan Kabupaten Barito Kuala yang memiliki aroma khas pulen dan tahan simpan lama. Toko Beras Sumber Rezeki di Pasar Wanaraya menawarkan empat jenis kemasan penjualan dengan bobot dan harga yang bervariasi. Seorang pembeli ingin menentukan kemasan mana yang memberikan nilai ekonomis terbaik (harga per kilogram terendah).',
      tableData: {
        headers: ['Merek Paket', 'Berat Bersih (kg)', 'Harga Kemasan (Rp)'],
        rows: [
          ['Paket Hemat (A)', '2,5 kg', 'Rp37.500'],
          ['Paket Standar (B)', '5 kg', 'Rp72.500'],
          ['Paket Jumbo (C)', '10 kg', 'Rp140.000'],
          ['Paket Karung (D)', '20 kg', 'Rp270.000']
        ]
      }
    },
    prompt: 'Paket manakah yang memiliki harga satuan (rupiah per kilogram) paling murah bagi konsumen?',
    options: [
      { label: 'A', text: 'Paket Hemat (A)' },
      { label: 'B', text: 'Paket Standar (B)' },
      { label: 'C', text: 'Paket Jumbo (C)' },
      { label: 'D', text: 'Paket Karung (D)' }
    ],
    correctAnswer: 'D',
    explanation: 'Hitung harga per kg tiap paket: Paket A = 37.500 / 2,5 = Rp15.000/kg; Paket B = 72.500 / 5 = Rp14.500/kg; Paket C = 140.000 / 10 = Rp14.000/kg; Paket D = 270.000 / 20 = Rp13.500/kg. Maka harga satuan paling murah adalah Paket Karung (D) dengan Rp13.500/kg. Pilihan D benar.'
  },
  {
    id: 8,
    number: 8,
    type: 'pg',
    level: 'Aplikasi',
    competency: '3.3',
    competencyTitle: 'Rasio Ekuivalen & Proporsi',
    indicatorABCD: {
      condition: 'Disajikan permasalahan perbandingan senilai terhubung persamaan linier satu variabel tentang pohon bibit jeruk,',
      audience: 'peserta didik kelas 7',
      behavior: 'dapat menyelesaikan nilai variabel aljabar untuk menentukan total kuantitas kedua objek',
      degree: 'dengan tepat.'
    },
    stimulus: {
      title: 'Pembibitan Jeruk Siam dan Madu di Green House Sekolah',
      context: 'Dalam rangka program Adiwiyata Berbasis Kewirausahaan, siswa SMPN 1 Wanaraya menanam bibit pohon jeruk Siam dan jeruk Madu di kebun pembibitan sekolah. Rasio banyaknya bibit jeruk Siam terhadap bibit jeruk Madu yang berhasil tumbuh adalah 7 : 4. Dari penghitungan fisik di kebun, diketahui selisih antara banyak bibit jeruk Siam dan jeruk Madu adalah 24 polybag.',
      tableData: {
        headers: ['Varietas Bibit', 'Rasio Bagian', 'Keterangan'],
        rows: [
          ['Jeruk Siam', '7 bagian', 'Tumbuh subur di tanah pasang surut'],
          ['Jeruk Madu', '4 bagian', 'Varietas manis unggulan'],
          ['Selisih Kuantitas', '24 polybag', 'Bibit Siam lebih banyak 24 buah']
        ]
      }
    },
    prompt: 'Berdasarkan informasi tersebut, jumlah seluruh bibit pohon jeruk (jeruk Siam dan jeruk Madu) di kebun pembibitan adalah ....',
    options: [
      { label: 'A', text: '56 polybag' },
      { label: 'B', text: '72 polybag' },
      { label: 'C', text: '88 polybag' },
      { label: 'D', text: '96 polybag' }
    ],
    correctAnswer: 'C',
    explanation: 'Misalkan faktor pengali adalah x. Banyak bibit jeruk Siam = 7x dan jeruk Madu = 4x. Selisih = 7x - 4x = 3x = 24 -> x = 24 / 3 = 8. Maka banyak bibit jeruk Siam = 7 × 8 = 56 polybag, dan jeruk Madu = 4 × 8 = 32 polybag. Total seluruh bibit = 56 + 32 = 88 polybag (atau (7 + 4) × 8 = 11 × 8 = 88 polybag). Jawaban C tepat.'
  },
  {
    id: 9,
    number: 9,
    type: 'pg',
    level: 'Aplikasi',
    competency: '3.4',
    competencyTitle: 'Rasio Satuan & Laju Perubahan Satuan',
    indicatorABCD: {
      condition: 'Disajikan data laju kerja mesin pompa irigasi sawah pasang surut Barito Kuala,',
      audience: 'peserta didik kelas 7',
      behavior: 'dapat menentukan durasi waktu yang dibutuhkan untuk mengisi volume tertentu',
      degree: 'dengan perhitungan matematika yang akurat.'
    },
    stimulus: {
      title: 'Debit Aliran Pompa Pengairan Sawah Pasang Surut',
      context: 'Sistem pengairan sawah pasang surut di Wanaraya memanfaatkan saluran tersier yang dikontrol oleh pompa air berdaya dorong stabil saat air sungai surut. Sebuah mesin pompa diesel menyedot air dari saluran sekunder ke petak sawah dengan kemampuan mengalirkan volume 4.800 liter air dalam durasi waktu 40 menit secara terus-menerus.',
      tableData: {
        headers: ['Waktu Pompa Bekerja', 'Volume Air Mengalir', 'Laju Aliran (Debit)'],
        rows: [
          ['40 menit', '4.800 liter', 'Konstan']
        ]
      }
    },
    prompt: 'Jika petani membutuhkan pasokan air sebanyak 18.000 liter untuk merendam lahan persemaian benih padi, berapa lama mesin pompa tersebut harus dioperasikan?',
    options: [
      { label: 'A', text: '120 menit (2 jam)' },
      { label: 'B', text: '150 menit (2,5 jam)' },
      { label: 'C', text: '160 menit (2 jam 40 menit)' },
      { label: 'D', text: '180 menit (3 jam)' }
    ],
    correctAnswer: 'B',
    explanation: 'Laju aliran (debit) pompa = 4.800 liter ÷ 40 menit = 120 liter/menit. Waktu yang diperlukan untuk mengalirkan 18.000 liter = Volume / Laju Aliran = 18.000 liter ÷ 120 liter/menit = 150 menit (atau 2 jam 30 menit). Opsi B benar.'
  },
  {
    id: 10,
    number: 10,
    type: 'pg',
    level: 'Aplikasi',
    competency: '3.2',
    competencyTitle: 'Faktor Skala dalam Pemecahan Masalah',
    indicatorABCD: {
      condition: 'Disajikan gambar denah ruang perpustakaan sekolah dengan ukuran skala 1 : 120,',
      audience: 'peserta didik kelas 7',
      behavior: 'dapat menghitung luas sebenarnya ruang perpustakaan dalam satuan meter persegi',
      degree: 'secara tepat.'
    },
    stimulus: {
      title: 'Perluasan Gedung Perpustakaan SMPN 1 Wanaraya',
      context: 'Dalam rangka meningkatkan budaya literasi numerasi, SMPN 1 Wanaraya merancang perluasan ruang perpustakaan sekolah tahun 2026/2027. Pada lembar cetak biru rancang bangun yang digantung di papan informasi, denah ruang perpustakaan digambar dengan bentuk persegi panjang berukuran panjang 10 cm dan lebar 7,5 cm menggunakan skala 1 : 120.',
      diagramType: 'blueprint',
      imageCaption: 'Cetak Biru Rancang Bangun Perpustakaan SMPN 1 Wanaraya (Skala 1 : 120)',
      tableData: {
        headers: ['Dimensi pada Denah', 'Panjang = 10 cm', 'Lebar = 7,5 cm'],
        rows: [
          ['Skala Rancang Bangun', '1 : 120', 'Konversi cm ke meter: 1 m = 100 cm']
        ]
      }
    },
    prompt: 'Luas lantai sebenarnya dari ruang perpustakaan sekolah tersebut adalah ....',
    options: [
      { label: 'A', text: '90 m²' },
      { label: 'B', text: '108 m²' },
      { label: 'C', text: '120 m²' },
      { label: 'D', text: '135 m²' }
    ],
    correctAnswer: 'B',
    explanation: 'Panjang sebenarnya = 10 cm × 120 = 1.200 cm = 12 meter. Lebar sebenarnya = 7,5 cm × 120 = 900 cm = 9 meter. Luas sebenarnya = Panjang sebenarnya × Lebar sebenarnya = 12 m × 9 m = 108 m². Opsi B benar.'
  },

  // ==========================================
  // SOAL 11 s/d 14: PILIHAN GANDA KOMPLEKS (PGK MCMA)
  // Instruksi: "Pilihlah Pernyataan berikut jawaban pilih lebih dari 1 jawaban yang benar."
  // ==========================================
  {
    id: 11,
    number: 11,
    type: 'pgk_mcma',
    level: 'Penalaran',
    competency: '3.1',
    competencyTitle: 'Konsep Rasio & Perbedaan dengan Selisih',
    instruction: 'Pilihlah Pernyataan berikut jawaban pilih lebih dari 1 jawaban yang benar.',
    indicatorABCD: {
      condition: 'Disajikan data komparasi produksi gabah dua kelompok tani di Wanaraya Barito Kuala,',
      audience: 'peserta didik kelas 7',
      behavior: 'dapat mengevaluasi dan menalar perbandingan produktivitas per hektar serta karakteristik selisih aditif vs rasio multiplikatif',
      degree: 'secara kritis dan multi-kriteria.'
    },
    stimulus: {
      title: 'Evaluasi Produktivitas Pertanian Padi Lahan Rawa Pasang Surut',
      context: 'Dua kelompok tani di Kecamatan Wanaraya menerapkan metode pemupukan berimbang pada musim tanam gadu. Kelompok Tani "Subur Makmur" menggarap lahan seluas 8 hektar dan berhasil memanen 36 ton gabah kering panen. Sementara itu, Kelompok Tani "Karya Bersama" menggarap lahan seluas 12 hektar dan memperoleh total hasil panen sebesar 60 ton gabah kering panen. Para penyuluh pertanian melakukan analisis komparatif produktivitas.',
      diagramType: 'rice_field',
      imageCaption: 'Peta Petak Sawah Pasang Surut Kelompok Tani Wanaraya',
      tableData: {
        headers: ['Kelompok Tani', 'Luas Lahan (hektar)', 'Hasil Panen (ton)', 'Produktivitas (ton/ha)'],
        rows: [
          ['Subur Makmur', '8 ha', '36 ton', '4,5 ton/ha'],
          ['Karya Bersama', '12 ha', '60 ton', '5,0 ton/ha']
        ]
      }
    },
    prompt: 'Manakah pernyataan-pernyataan berikut yang bernilai BENAR mengenai rasio dan selisih produktivitas kedua kelompok tani tersebut? (Pilih semua yang benar)',
    options: [
      { id: 'A', text: 'Produktivitas rata-rata per hektar Kelompok Tani Subur Makmur adalah 4,5 ton/ha.' },
      { id: 'B', text: 'Rasio produktivitas per hektar antara Subur Makmur dan Karya Bersama adalah 9 : 10.' },
      { id: 'C', text: 'Selisih produktivitas hasil panen kedua kelompok tani tersebut adalah 1,5 ton per hektar.' },
      { id: 'D', text: 'Kelompok Tani Karya Bersama memiliki rasio efisiensi lahan yang lebih tinggi dibandingkan Subur Makmur.' }
    ],
    correctAnswers: ['A', 'B', 'D'],
    explanation: 'Pembahasan:\n1. Produktivitas Subur Makmur = 36 ton / 8 ha = 4,5 ton/ha (Pernyataan A BENAR).\n2. Produktivitas Karya Bersama = 60 ton / 12 ha = 5,0 ton/ha. Rasio produktivitas = 4,5 : 5,0 = 45 : 50 = 9 : 10 (Pernyataan B BENAR).\n3. Selisih produktivitas = 5,0 - 4,5 = 0,5 ton/ha, bukan 1,5 ton/ha (Pernyataan C SALAH).\n4. Karena 5,0 > 4,5, Karya Bersama memiliki rasio efisiensi lahan lebih tinggi (Pernyataan D BENAR).\nJawaban benar: A, B, dan D.'
  },
  {
    id: 12,
    number: 12,
    type: 'pgk_mcma',
    level: 'Penalaran',
    competency: '3.3',
    competencyTitle: 'Rasio Ekuivalen & Proporsi',
    instruction: 'Pilihlah Pernyataan berikut jawaban pilih lebih dari 1 jawaban yang benar.',
    indicatorABCD: {
      condition: 'Disajikan resep ramuan pupuk organik cair trichoderma dengan formulasi rasio tertentu,',
      audience: 'peserta didik kelas 7',
      behavior: 'dapat menganalisis perubahan proporsi dan menentukan nilai kebenaran volume campuran dalam persamaan linear rasio',
      degree: 'dengan penalaran matematika mendalam.'
    },
    stimulus: {
      title: 'Formulasi Pupuk Organik Hayati untuk Tanaman Jeruk',
      context: 'Laboratorium Pertanian Terpadu SMPN 1 Wanaraya membuat formulasi pupuk organik cair (POC) hayati untuk mencegah jamur akar pada tanaman jeruk Siam. Komposisi racikan terdiri dari molase tetes tebu dan biang bakteri pengurai dengan perbandingan volume 3 : 7. Tim siswa hendak membuat larutan pekat sebanyak 120 liter untuk didistribusikan kepada petani binaan sekolah.',
      diagramType: 'fertilizer_mix',
      imageCaption: 'Formulasi Tabung Proporsi Molase dan Bakteri Hayati POC Trichoderma',
      tableData: {
        headers: ['Komponen POC', 'Rasio Komposisi', 'Volume Total Target'],
        rows: [
          ['Molase Tetes Tebu', '3 bagian', '120 liter larutan'],
          ['Biang Bakteri Hayati', '7 bagian', 'Siap pakai']
        ]
      }
    },
    prompt: 'Berdasarkan formula rasio campuran tersebut, pilihlah pernyataan-pernyataan yang BENAR di bawah ini!',
    options: [
      { id: 'A', text: 'Volume molase tetes tebu yang dibutuhkan dalam campuran 120 liter adalah 36 liter.' },
      { id: 'B', text: 'Volume biang bakteri hayati yang diperlukan adalah 84 liter.' },
      { id: 'C', text: 'Selisih volume antara biang bakteri dan molase dalam campuran tersebut adalah 42 liter.' },
      { id: 'D', text: 'Jika ditambahkan 12 liter molase murni ke dalam campuran 120 liter tersebut, rasio baru molase terhadap biang bakteri menjadi 4 : 7.' }
    ],
    correctAnswers: ['A', 'B', 'D'],
    explanation: 'Pembahasan:\nTotal bagian rasio = 3 + 7 = 10 bagian. Nilai 1 bagian = 120 / 10 = 12 liter.\n- Volume molase = 3 × 12 = 36 liter (Pernyataan A BENAR).\n- Volume biang bakteri = 7 × 12 = 84 liter (Pernyataan B BENAR).\n- Selisih volume = 84 - 36 = 48 liter, bukan 42 liter (Pernyataan C SALAH).\n- Jika molase ditambah 12 liter, volume molase menjadi 36 + 12 = 48 liter. Rasio baru = 48 : 84. Dibagi 12: 48/12 = 4 dan 84/12 = 7 -> rasio 4 : 7 (Pernyataan D BENAR).\nJawaban benar: A, B, dan D.'
  },
  {
    id: 13,
    number: 13,
    type: 'pgk_mcma',
    level: 'Penalaran',
    competency: '3.4',
    competencyTitle: 'Rasio Satuan & Laju Perubahan Satuan',
    instruction: 'Pilihlah Pernyataan berikut jawaban pilih lebih dari 1 jawaban yang benar.',
    indicatorABCD: {
      condition: 'Disajikan studi kasus konsumsi bahan bakar dan laju tempuh dua mobil operasional dinas pendidikan di jalur trans Kalimantan,',
      audience: 'peserta didik kelas 7',
      behavior: 'dapat mengevaluasi laju satuan efisiensi bahan bakar dan merumuskan kesimpulan komparatif',
      degree: 'secara logis dan sistematis.'
    },
    stimulus: {
      title: 'Uji Efisiensi Bahan Bakar Kendaraan Dinas Pengawas Sekolah',
      context: 'Dua unit minibus operasional sekolah melakukan perjalanan monitoring literasi dari Wanaraya menuju Banjarmasin dan kembali ke Marabahan melalui rute yang sama. Minibus A menempuh total jarak 168 kilometer dengan menghabiskan 14 liter bensin Pertalite. Sementara itu, Minibus B menempuh jarak 180 kilometer dan menghabiskan 12 liter bensin jenis yang sama. Siswa kelas 7 diajak meneliti rasio efisiensi bahan bakar (laju kilometer per liter).',
      tableData: {
        headers: ['Kendaraan', 'Jarak Tempuh (km)', 'Konsumsi Bahan Bakar (liter)'],
        rows: [
          ['Minibus A', '168 km', '14 liter'],
          ['Minibus B', '180 km', '12 liter']
        ]
      }
    },
    prompt: 'Pilihlah pernyataan yang bernilai BENAR terkait laju efisiensi kedua kendaraan tersebut!',
    options: [
      { id: 'A', text: 'Minibus A memiliki laju konsumsi bensin rata-rata 12 km per liter.' },
      { id: 'B', text: 'Minibus B memiliki laju konsumsi bensin rata-rata 15 km per liter.' },
      { id: 'C', text: 'Minibus A lebih hemat dan efisien dalam penggunaan bensin dibanding Minibus B.' },
      { id: 'D', text: 'Untuk menempuh jarak 300 km, Minibus B memerlukan 20 liter bensin.' }
    ],
    correctAnswers: ['A', 'B', 'D'],
    explanation: 'Pembahasan:\n- Laju efisiensi Minibus A = 168 km / 14 liter = 12 km/liter (Pernyataan A BENAR).\n- Laju efisiensi Minibus B = 180 km / 12 liter = 15 km/liter (Pernyataan B BENAR).\n- Minibus B mampu menempuh jarak lebih jauh per liternya (15 km vs 12 km), artinya Minibus B yang lebih hemat, bukan Minibus A (Pernyataan C SALAH).\n- Bensin Minibus B untuk 300 km = 300 / 15 = 20 liter (Pernyataan D BENAR).\nJawaban benar: A, B, dan D.'
  },
  {
    id: 14,
    number: 14,
    type: 'pgk_mcma',
    level: 'Penalaran',
    competency: '3.2',
    competencyTitle: 'Faktor Skala dalam Pemecahan Masalah',
    instruction: 'Pilihlah Pernyataan berikut jawaban pilih lebih dari 1 jawaban yang benar.',
    indicatorABCD: {
      condition: 'Disajikan rancang gambar denah panggung seni budaya SMPN 1 Wanaraya yang mengalami perubahan faktor skala,',
      audience: 'peserta didik kelas 7',
      behavior: 'dapat menganalisis dampak perubahan faktor skala terhadap keliling, luas, dan ukuran sebenarnya',
      degree: 'secara akurat.'
    },
    stimulus: {
      title: 'Desain Panggung Peringatan Hari Pendidikan Nasional',
      context: 'Panitia pentas seni SMPN 1 Wanaraya merancang denah panggung pertunjukan terbuka. Pada denah rancangan awal berukuran panjang 12 cm dan lebar 8 cm dengan skala 1 : 100. Guru pembimbing menyarankan membuat denah presentasi baru yang diperbesar dengan faktor skala k = 2 (semua panjang sisi denah dilipatgandakan 2 kali) agar detail ornamen kain Sasirangan terlihat lebih jelas saat rapat komite sekolah.',
      diagramType: 'stage_scale',
      imageCaption: 'Rancangan Denah Panggung Terbuka Seni Budaya Hardiknas',
      tableData: {
        headers: ['Rancangan', 'Panjang Denah', 'Lebar Denah', 'Skala Representasi'],
        rows: [
          ['Denah Awal', '12 cm', '8 cm', '1 : 100'],
          ['Denah Presentasi Baru', 'Perbesaran 2x', 'Perbesaran 2x', 'Diperbesar k = 2']
        ]
      }
    },
    prompt: 'Pilihlah pernyataan-pernyataan di bawah ini yang bernilai BENAR!',
    options: [
      { id: 'A', text: 'Ukuran panjang sebenarnya panggung tersebut adalah 12 meter dan lebar sebenarnya 8 meter.' },
      { id: 'B', text: 'Pada denah presentasi baru, ukuran panjangnya menjadi 24 cm dan lebarnya 16 cm.' },
      { id: 'C', text: 'Luas denah baru pada kertas gambar menjadi 2 kali lipat dari luas denah awal.' },
      { id: 'D', text: 'Skala pada denah presentasi baru yang telah diperbesar 2 kali tersebut berubah menjadi 1 : 50 terhadap objek sebenarnya.' }
    ],
    correctAnswers: ['A', 'B', 'D'],
    explanation: 'Pembahasan:\n- Panjang nyata = 12 cm × 100 = 1.200 cm = 12 m; Lebar nyata = 8 cm × 100 = 800 cm = 8 m (Pernyataan A BENAR).\n- Dimensi denah baru = panjang 12 × 2 = 24 cm, lebar 8 × 2 = 16 cm (Pernyataan B BENAR).\n- Luas awal denah = 12 × 8 = 96 cm²; Luas baru = 24 × 16 = 384 cm² = 4 kali lipat luas awal (bukan 2 kali lipat) karena perbesaran luas mengikuti k² = 2² = 4 (Pernyataan C SALAH).\n- Skala baru = 24 cm : 1.200 cm = 1 : 50 (Pernyataan D BENAR).\nJawaban benar: A, B, dan D.'
  },

  // ==========================================
  // SOAL 15 s/d 20: PILIHAN GANDA KATEGORIK (BENAR / SALAH)
  // Instruksi: "Pilihlah Pernyataan berikut jawaban yang benar atau salah." (3 pernyataan per nomor)
  // ==========================================
  {
    id: 15,
    number: 15,
    type: 'pgk_kategori',
    level: 'Pemahaman',
    competency: '3.1',
    competencyTitle: 'Konsep Rasio & Perbedaan dengan Selisih',
    instruction: 'Pilihlah Pernyataan berikut jawaban yang benar atau salah.',
    indicatorABCD: {
      condition: 'Disajikan konsep matematis tentang perbedaan esensial sifat perbandingan multiplikatif (rasio) dan perbandingan aditif (selisih),',
      audience: 'peserta didik kelas 7',
      behavior: 'dapat membedakan karakteristik perubahan nilai ketika kedua kuantitas dijumlahkan atau dikalikan bilangan konstan',
      degree: 'secara tepat.'
    },
    stimulus: {
      title: 'Eksplorasi Konsep: Perbandingan Multiplikatif vs Aditif',
      context: 'Dua siswa kelas 7A, Radit dan Galih, sedang mengamati perbandingan koleksi buku matematika di pojok baca kelas. Radit memiliki 8 buku, sedangkan Galih memiliki 12 buku. Mereka mendiskusikan apakah rasio dan selisih akan tetap sama jika jumlah buku keduanya ditambah dengan jumlah yang sama atau dilipatgandakan dengan faktor pengali yang sama. Guru matematika menegaskan pentingnya memahami aksioma rasio.',
      tableData: {
        headers: ['Kondisi', 'Buku Radit (A)', 'Buku Galih (B)', 'Rasio (A : B)', 'Selisih (|A - B|)'],
        rows: [
          ['Kondisi Awal', 8, 12, '2 : 3', '4 buku'],
          ['Ditambah 4 buku masing-masing', 12, 16, '3 : 4', '4 buku'],
          ['Dikalikan 2 masing-masing', 16, 24, '2 : 3', '8 buku']
        ]
      }
    },
    prompt: 'Tentukan BENAR atau SALAH untuk setiap pernyataan berikut berdasarkan prinsip dasar rasio dan selisih!',
    statements: [
      {
        id: 's1',
        statement: 'Rasio dua kuantitas tidak akan berubah jika kedua kuantitas dikalikan dengan bilangan bulat positif yang sama.',
        correctAnswer: 'Benar'
      },
      {
        id: 's2',
        statement: 'Jika kedua kuantitas ditambah dengan bilangan bulat positif yang sama, nilai rasionya akan selalu tetap sama dengan rasio mula-mula.',
        correctAnswer: 'Salah'
      },
      {
        id: 's3',
        statement: 'Selisih antara dua kuantitas tetap konstan (tidak berubah) ketika kedua kuantitas tersebut ditambah dengan kuantitas yang sama besar.',
        correctAnswer: 'Benar'
      }
    ],
    explanation: 'Pembahasan:\n- Pernyataan 1 (BENAR): Rasio adalah multiplikatif. Jika a : b dikalikan c, maka ac : bc = a : b (ekuivalen).\n- Pernyataan 2 (SALAH): Menambahkan kuantitas yang sama mengubah rasio. Contoh: 8 : 12 = 2 : 3 (0,67), jika masing-masing ditambah 4 menjadi 12 : 16 = 3 : 4 (0,75).\n- Pernyataan 3 (BENAR): Selisih aditif (a + c) - (b + c) = a - b, sehingga nilai selisihnya selalu tetap konstan.'
  },
  {
    id: 16,
    number: 16,
    type: 'pgk_kategori',
    level: 'Aplikasi',
    competency: '3.3',
    competencyTitle: 'Rasio Ekuivalen & Proporsi',
    instruction: 'Pilihlah Pernyataan berikut jawaban yang benar atau salah.',
    indicatorABCD: {
      condition: 'Disajikan data tabel produksi kerajinan anyaman purun khas Barito Kuala,',
      audience: 'peserta didik kelas 7',
      behavior: 'dapat menghitung dan memvalidasi kebutuhan bahan baku dan target produksi menggunakan proporsi senilai',
      degree: 'dengan benar.'
    },
    stimulus: {
      title: 'Kerajinan Anyaman Purun Tradisional Barito Kuala',
      context: 'Tanaman purun danau (Lepironia articulata) yang melimpah di lahan basah Barito Kuala dimanfaatkan para perajin untuk membuat tas belanja, tikar, dan topi etnik. Seorang perajin anyaman di Wanaraya mencatat bahwa untuk menganyam 4 buah tas purun dibutuhkan 18 ikat serat purun kering pilihan dan menghabiskan waktu pengerjaan 10 jam kerja secara proporsional.',
      imageUrl: '/src/assets/images/anyaman_purun_batola_1794020305573.jpg',
      imageCaption: 'Aktivitas Pengrajin Anyaman Purun Tradisional Barito Kuala',
      tableData: {
        headers: ['Kuantitas Tas Purun', 'Kebutuhan Serat Purun', 'Waktu Pengerjaan'],
        rows: [
          ['4 buah tas', '18 ikat purun', '10 jam kerja'],
          ['Hubungan Variabel', 'Proporsi Senilai', 'Laju Konstan']
        ]
      }
    },
    prompt: 'Tentukan BENAR atau SALAH untuk setiap pernyataan terkait produksi tas purun tersebut!',
    statements: [
      {
        id: 's1',
        statement: 'Untuk membuat 10 buah tas purun dengan model yang sama, perajin membutuhkan 45 ikat serat purun kering.',
        correctAnswer: 'Benar'
      },
      {
        id: 's2',
        statement: 'Jika perajin memiliki persediaan 36 ikat purun, maka perajin dapat menghasilkan 9 buah tas purun.',
        correctAnswer: 'Salah'
      },
      {
        id: 's3',
        statement: 'Waktu yang diperlukan perajin untuk menyelesaikan 6 buah tas purun dengan ritme kerja yang sama adalah 15 jam.',
        correctAnswer: 'Benar'
      }
    ],
    explanation: 'Pembahasan:\n- Kebutuhan purun per tas = 18 / 4 = 4,5 ikat per tas.\n  Pernyataan 1: Untuk 10 tas = 10 × 4,5 = 45 ikat purun (BENAR).\n  Pernyataan 2: Dengan 36 ikat purun = 36 / 4,5 = 8 tas (bukan 9 tas) (SALAH).\n- Waktu per tas = 10 jam / 4 tas = 2,5 jam per tas.\n  Pernyataan 3: Untuk 6 tas = 6 × 2,5 jam = 15 jam (BENAR).'
  },
  {
    id: 17,
    number: 17,
    type: 'pgk_kategori',
    level: 'Penalaran',
    competency: '3.4',
    competencyTitle: 'Rasio Satuan & Laju Perubahan Satuan',
    instruction: 'Pilihlah Pernyataan berikut jawaban yang benar atau salah.',
    indicatorABCD: {
      condition: 'Disajikan grafik/tabel laju pengeringan lahan lebak pasang surut menggunakan mesin pompa air bergerak,',
      audience: 'peserta didik kelas 7',
      behavior: 'dapat mengevaluasi debit perubahan volume air terhadap durasi pengoperasian pompa',
      degree: 'secara kritis.'
    },
    stimulus: {
      title: 'Pengendalian Muka Air Sawah Rawa Lebak Wanaraya',
      context: 'Saat musim hujan lebat, lahan persawahan rawa lebak di Wanaraya sering mengalami genangan berlebih yang dapat membusukkan bibit padi muda. Gabungan Kelompok Tani (Gapoktan) mengoperasikan pompa sedot air berkekuatan tinggi untuk membuang genangan air kembali ke saluran primer. Berdasarkan catatan alat ukur digital, pompa beroperasi stabil dengan laju debit yang tercatat pada tabel pemantauan berikut.',
      diagramType: 'pump_debit',
      imageCaption: 'Pemantauan Debit Pemompaan Saluran Irigasi Sawah Rawa Lebak',
      tableData: {
        headers: ['Waktu Pengoperasian (menit)', '15', '30', '45', '60'],
        rows: [
          ['Volume Air Dibuang (liter)', '5.400', '10.800', '16.200', '21.600']
        ]
      }
    },
    prompt: 'Berdasarkan data laju pengoperasian pompa air tersebut, tentukan BENAR atau SALAH untuk setiap pernyataan berikut!',
    statements: [
      {
        id: 's1',
        statement: 'Laju perubahan volume pembuangan air (debit pompa) adalah 360 liter per menit.',
        correctAnswer: 'Benar'
      },
      {
        id: 's2',
        statement: 'Jika pompa beroperasi terus-menerus selama 2,5 jam, volume air yang berhasil dipindahkan adalah 54.000 liter.',
        correctAnswer: 'Benar'
      },
      {
        id: 's3',
        statement: 'Untuk membuang genangan air sebanyak 72.000 liter, pompa membutuhkan waktu operasi tepat 3 jam 30 menit.',
        correctAnswer: 'Salah'
      }
    ],
    explanation: 'Pembahasan:\n- Laju debit = 5.400 / 15 = 360 liter/menit (Pernyataan 1 BENAR).\n- 2,5 jam = 2,5 × 60 menit = 150 menit. Volume = 150 menit × 360 liter/menit = 54.000 liter (Pernyataan 2 BENAR).\n- Waktu untuk 72.000 liter = 72.000 / 360 = 200 menit = 3 jam 20 menit (bukan 3 jam 30 menit) (Pernyataan 3 SALAH).'
  },
  {
    id: 18,
    number: 18,
    type: 'pgk_kategori',
    level: 'Penalaran',
    competency: '3.3',
    competencyTitle: 'Rasio Ekuivalen & Proporsi',
    instruction: 'Pilihlah Pernyataan berikut jawaban yang benar atau salah.',
    indicatorABCD: {
      condition: 'Disajikan studi kasus penyelesaian renovasi fasilitas gedung sekolah dengan target percepatan waktu pengerjaan,',
      audience: 'peserta didik kelas 7',
      behavior: 'dapat menganalisis model hubungan perbandingan berbalik nilai dalam konteks tenaga kerja dan durasi waktu',
      degree: 'dengan nalar pemecahan masalah yang tepat.'
    },
    stimulus: {
      title: 'Renovasi Pagar dan Lapangan Olahraga SMPN 1 Wanaraya',
      context: 'Komite sekolah bersama tim teknis merencanakan perbaikan pagar dan paving lapangan basket sekolah. Dari perhitungan teknis awal, pekerjaan tersebut diproyeksikan selesai dalam waktu 24 hari jika dikerjakan oleh 6 orang tukang bangunan dengan kemampuan kerja rata-rata sama. Namun karena sekolah akan menjadi tuan rumah Porseni tingkat kecamatan, pekerjaan harus dituntaskan lebih awal dalam waktu 16 hari kerja.',
      tableData: {
        headers: ['Rencana Kerja', 'Jumlah Pekerja', 'Waktu Penyelesaian'],
        rows: [
          ['Rencana Semula', '6 orang', '24 hari'],
          ['Rencana Dipercepat', 'x orang (ditambah)', '16 hari']
        ]
      }
    },
    prompt: 'Tentukan BENAR atau SALAH untuk setiap pernyataan terkait perencanaan tenaga kerja renovasi tersebut!',
    statements: [
      {
        id: 's1',
        statement: 'Hubungan antara jumlah pekerja dan waktu penyelesaian pekerjaan merupakan bentuk perbandingan berbalik nilai.',
        correctAnswer: 'Benar'
      },
      {
        id: 's2',
        statement: 'Jumlah total pekerja yang dibutuhkan agar proyek selesai dalam 16 hari adalah 9 orang.',
        correctAnswer: 'Benar'
      },
      {
        id: 's3',
        statement: 'Panitia renovasi perlu menambah pekerja baru sebanyak 4 orang dari tenaga kerja awal yang sudah ada.',
        correctAnswer: 'Salah'
      }
    ],
    explanation: 'Pembahasan:\n- Semakin banyak pekerja, semakin sedikit waktu yang diperlukan -> Perbandingan berbalik nilai: p1 × h1 = p2 × h2 (Pernyataan 1 BENAR).\n- 6 × 24 = p2 × 16 -> 144 = 16 p2 -> p2 = 144 / 16 = 9 orang (Pernyataan 2 BENAR).\n- Tambahan pekerja yang dibutuhkan = Pekerja baru - Pekerja awal = 9 - 6 = 3 orang, bukan 4 orang (Pernyataan 3 SALAH).'
  },
  {
    id: 19,
    number: 19,
    type: 'pgk_kategori',
    level: 'Penalaran',
    competency: '3.2',
    competencyTitle: 'Faktor Skala dalam Pemecahan Masalah',
    instruction: 'Pilihlah Pernyataan berikut jawaban yang benar atau salah.',
    indicatorABCD: {
      condition: 'Disajikan peta rute studi wisata lintas objek Kalimantan Selatan berskala 1 : 400.000 dengan segmen multi-titik,',
      audience: 'peserta didik kelas 7',
      behavior: 'dapat mengevaluasi jarak kumulatif dan estimasi waktu tempuh perjalanan menggunakan gabungan konsep skala dan laju kecepatan',
      degree: 'secara komprehensif.'
    },
    stimulus: {
      title: 'Peta Rute Kunjungan Wisata Budaya Kalimantan Selatan',
      context: 'OSIS SMPN 1 Wanaraya menyusun rencana studi wisata edukasi menyusuri situs warisan budaya dan agrowisata Kalimantan Selatan. Pada peta rute berskala 1 : 400.000, perjalanan dibagi menjadi dua etape: Etape 1 (SMPN 1 Wanaraya menuju Jembatan Barito) berjarak 6,5 cm pada peta; dan Etape 2 (Jembatan Barito menuju Dermaga Pasar Terapung Lok Baintan) berjarak 8,5 cm pada peta. Bus wisata rombongan dijadwalkan melaju dengan kecepatan rata-rata 50 km/jam.',
      tableData: {
        headers: ['Etape Perjalanan', 'Jarak pada Peta', 'Skala Peta'],
        rows: [
          ['Etape 1: Wanaraya - Jbt Barito', '6,5 cm', '1 : 400.000'],
          ['Etape 2: Jbt Barito - Lok Baintan', '8,5 cm', '1 : 400.000']
        ]
      }
    },
    prompt: 'Tentukan BENAR atau SALAH untuk setiap pernyataan terkait perjalanan wisata edukasi tersebut!',
    statements: [
      {
        id: 's1',
        statement: 'Jarak sebenarnya pada Etape 1 (Wanaraya ke Jembatan Barito) di lapangan adalah 26 kilometer.',
        correctAnswer: 'Benar'
      },
      {
        id: 's2',
        statement: 'Total jarak sebenarnya yang ditempuh bus dari SMPN 1 Wanaraya hingga Pasar Terapung Lok Baintan adalah 60 kilometer.',
        correctAnswer: 'Benar'
      },
      {
        id: 's3',
        statement: 'Dengan kecepatan rata-rata 50 km/jam tanpa waktu istirahat, total waktu tempuh bus di jalan adalah 1 jam 30 menit.',
        correctAnswer: 'Salah'
      }
    ],
    explanation: 'Pembahasan:\n- Etape 1 jarak sebenarnya = 6,5 cm × 400.000 = 2.600.000 cm = 26 km (Pernyataan 1 BENAR).\n- Etape 2 jarak sebenarnya = 8,5 cm × 400.000 = 3.400.000 cm = 34 km.\n  Total jarak sebenarnya = 26 km + 34 km = 60 km (Pernyataan 2 BENAR).\n- Waktu tempuh = Jarak / Kecepatan = 60 km / 50 km/jam = 1,2 jam. 1,2 jam = 1 jam + (0,2 × 60) menit = 1 jam 12 menit, bukan 1 jam 30 menit (Pernyataan 3 SALAH).'
  },
  {
    id: 20,
    number: 20,
    type: 'pgk_kategori',
    level: 'Penalaran',
    competency: '3.4',
    competencyTitle: 'Rasio Satuan & Laju Perubahan Satuan',
    instruction: 'Pilihlah Pernyataan berikut jawaban yang benar atau salah.',
    indicatorABCD: {
      condition: 'Disajikan studi kasus sistem transaksi jual beli di Koperasi Petani Wanaraya yang memadukan rasio harga satuan dan persamaan linier belanja,',
      audience: 'peserta didik kelas 7',
      behavior: 'dapat merumuskan model persamaan aljabar untuk menentukan harga per unit masing-masing jenis barang serta memvalidasi total belanja gabungan',
      degree: 'secara kritis dan teliti.'
    },
    stimulus: {
      title: 'Transaksi Penjualan Buah Jeruk dan Madu Kelulut Wanaraya',
      context: 'Koperasi Usaha Bersama Petani Wanaraya menjual paket produk andalan daerah: Jeruk Siam Grade Super dan Madu Kelulut Asli Barito Kuala. Rasio harga 1 kg Jeruk Siam Super terhadap harga 1 botol Madu Kelulut adalah 1 : 4. Seorang pembeli memesan 6 kg Jeruk Siam Super dan 3 botol Madu Kelulut untuk oleh-oleh keluarga dengan total tagihan pembayaran tepat sebesar Rp270.000.',
      tableData: {
        headers: ['Komoditas', 'Rasio Harga per Satuan', 'Pembelian Pembeli'],
        rows: [
          ['Jeruk Siam Super (per kg)', '1 bagian (x)', '6 kg'],
          ['Madu Kelulut (per botol)', '4 bagian (4x)', '3 botol'],
          ['Total Pembayaran', '6(x) + 3(4x) = Rp270.000', 'Tunai']
        ]
      }
    },
    prompt: 'Berdasarkan informasi harga dan rasio transaksi tersebut, tentukan BENAR atau SALAH untuk setiap pernyataan berikut!',
    statements: [
      {
        id: 's1',
        statement: 'Harga satuan untuk 1 kilogram Jeruk Siam Super adalah Rp15.000.',
        correctAnswer: 'Benar'
      },
      {
        id: 's2',
        statement: 'Harga satuan untuk 1 botol Madu Kelulut Asli adalah Rp60.000.',
        correctAnswer: 'Benar'
      },
      {
        id: 's3',
        statement: 'Jika seorang pembeli lain ingin membeli 4 kg Jeruk Siam Super dan 2 botol Madu Kelulut, ia harus membayar sebesar Rp170.000.',
        correctAnswer: 'Salah'
      }
    ],
    explanation: 'Pembahasan:\nMisalkan harga 1 kg Jeruk Siam = x, maka harga 1 botol Madu = 4x.\nPersamaan linier: 6(x) + 3(4x) = 270.000 -> 6x + 12x = 270.000 -> 18x = 270.000 -> x = 15.000.\n- Harga 1 kg Jeruk Siam = x = Rp15.000 (Pernyataan 1 BENAR).\n- Harga 1 botol Madu = 4x = 4 × 15.000 = Rp60.000 (Pernyataan 2 BENAR).\n- Biaya 4 kg Jeruk + 2 botol Madu = (4 × 15.000) + (2 × 60.000) = 60.000 + 120.000 = Rp180.000, bukan Rp170.000 (Pernyataan 3 SALAH).'
  }
];
