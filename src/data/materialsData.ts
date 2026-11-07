export interface MaterialSection {
  id: string;
  number: string;
  title: string;
  summary: string;
  content: string[];
  interactiveType: 'ratio_compare' | 'scale_calc' | 'proportion_calc' | 'unit_rate_calc';
  quickFormulas: { label: string; formula: string; desc: string }[];
  didYouKnow: string;
}

export const MATERIALS_DATA: MaterialSection[] = [
  {
    id: "konsep-rasio",
    number: "01",
    title: "Konsep Rasio dan Bedanya dengan Selisih",
    summary: "Memahami perbandingan multiplikatif dan aditif dalam kehidupan nyata.",
    content: [
      "Rasio adalah hubungan perkalian (multiplikatif) yang membandingkan dua kuantitas. Jika sebuah kelas memiliki 18 siswa laki-laki dan 12 siswa perempuan, rasionya ditulis 18 : 12 atau disederhanakan menjadi 3 : 2.",
      "Perbedaan mendasar dengan selisih: Selisih (18 - 12 = 6) hanyalah perbandingan aditif yang menunjukkan berapa banyak satu kuantitas melebihi kuantitas lainnya.",
      "Jika jumlah murid dilipatgandakan 3 kali (laki-laki menjadi 54 dan perempuan 36), selisihnya melonjak menjadi 18 orang, namun rasionya tetap kokoh pada 3 : 2.",
      "Oleh karena itu, rasio mempertahankan hubungan proporsional, sementara selisih tidak."
    ],
    interactiveType: "ratio_compare",
    quickFormulas: [
      { label: "Bentuk Rasio", formula: "a : b = a / b (b ≠ 0)", desc: "Menyatakan bagian pertama terhadap bagian kedua" },
      { label: "Bentuk Selisih", formula: "|a - b|", desc: "Jarak atau perbedaan selisih nilai absolut" }
    ],
    didYouKnow: "Dalam konteks lokal Kalimantan Selatan, perahu kelotok tradisional memiliki rasio panjang terhadap lebar sekitar 6 : 1 agar memiliki stabilitas dan kelincahan saat bermanuver di arus Sungai Barito!"
  },
  {
    id: "faktor-skala",
    number: "02",
    title: "Faktor Skala dalam Pengukuran dan Geometri",
    summary: "Penerapan faktor skala k pada peta, maket, dan gambar teknik.",
    content: [
      "Faktor skala (k) adalah rasio perbandingan antara dimensi model/gambar dengan dimensi benda sebenarnya: k = Ukuran Gambar / Ukuran Sebenarnya.",
      "Pada skala peta 1 : 500.000, setiap 1 cm pada peta mewakili 500.000 cm (5 km) di lapangan.",
      "Jika k > 1, maka gambar merupakan perbesaran (misalnya gambar mikroskopis atau detail teknik). Jika 0 < k < 1, maka gambar merupakan pengecilan (misalnya denah bangunan atau peta wilayah Kabupaten Barito Kuala).",
      "Untuk menghitung jarak sebenarnya: Jarak Sebenarnya = Jarak pada Peta ÷ Skala (atau Jarak Peta × Angka Skala)."
    ],
    interactiveType: "scale_calc",
    quickFormulas: [
      { label: "Skala", formula: "Skala = Jarak Peta / Jarak Sebenarnya", desc: "Satuan harus disamakan terlebih dahulu (biasanya cm)" },
      { label: "Jarak Sebenarnya", formula: "Jarak Nyata = Jarak Peta × Nilai Penyebut Skala", desc: "Konversikan hasil cm ke m atau km" }
    ],
    didYouKnow: "Peta wilayah Kecamatan Wanaraya sering dibuat dengan skala 1 : 50.000. Jarak 4 cm pada peta tersebut setara dengan 2 kilometer jarak sebenarnya di lapangan!"
  },
  {
    id: "rasio-proporsi",
    number: "03",
    title: "Rasio Ekuivalen dan Persamaan Proporsi",
    summary: "Menghubungkan dua rasio yang setara untuk menemukan nilai variabel yang belum diketahui.",
    content: [
      "Proporsi adalah persamaan yang menyatakan bahwa dua rasio bernilai sama, ditulis sebagai a/b = c/d (dibaca: a berbanding b sama dengan c berbanding d).",
      "Sifat dasar proporsi adalah perkalian silang (cross multiplication): Jika a/b = c/d, maka a × d = b × c.",
      "Konsep ini sangat berguna dalam menyelesaikan masalah sehari-hari seperti takaran resep, pencampuran pupuk pertanian, dan perbandingan harga senilai.",
      "Jika a/b = c/x, maka x = (b × c) / a. Ini adalah bentuk persamaan linear satu variabel yang sering muncul pada asesmen TKA SMP."
    ],
    interactiveType: "proportion_calc",
    quickFormulas: [
      { label: "Sifat Perkalian Silang", formula: "a / b = c / d  <=>  a · d = b · c", desc: "Fondasi aljabar untuk mencari nilai variabel" },
      { label: "Mencari Variabel x", formula: "x = (b · c) / a", desc: "Solusi cepat sistem perbandingan senilai" }
    ],
    didYouKnow: "Petani jeruk Siam di Wanaraya Barito Kuala menggunakan proporsi pupuk organik cair 1 : 20 (1 liter pupuk pekat untuk 20 liter air) untuk memastikan pohon berbuah lebat tanpa merusak pH tanah gambut pasang surut."
  },
  {
    id: "laju-satuan",
    number: "04",
    title: "Rasio Satuan dan Laju Perubahan (Unit Rate)",
    summary: "Membandingkan dua besaran dengan satuan berbeda menjadi satu satuan standar.",
    content: [
      "Laju satuan (unit rate) adalah rasio yang membandingkan kuantitas pertama terhadap TEPAT SATU satuan kuantitas kedua.",
      "Contoh laju satuan meliputi: Kecepatan (kilometer per jam), Harga Satuan (rupiah per kilogram), Efisiensi Bahan Bakar (kilometer per liter), dan Debit Aliran (liter per detik).",
      "Laju satuan memungkinkan kita membandingkan penawaran mana yang lebih hemat ('best buy') atau kendaraan mana yang bergerak lebih cepat secara objektif.",
      "Contoh: Toko A menjual 3 kg jeruk seharga Rp45.000 (laju: Rp15.000/kg). Toko B menjual 5 kg jeruk seharga Rp70.000 (laju: Rp14.000/kg). Maka Toko B menawarkan harga satuan yang lebih murah."
    ],
    interactiveType: "unit_rate_calc",
    quickFormulas: [
      { label: "Laju Satuan", formula: "Laju = Kuantitas Total / Satuan Pembanding", desc: "Misal: Jarak / Waktu = Kecepatan (km/jam)" },
      { label: "Harga Satuan", formula: "Harga per Satuan = Total Biaya / Jumlah Kuantitas", desc: "Menentukan nilai keekonomisan produk" }
    ],
    didYouKnow: "Jembatan Barito memiliki panjang sekitar 1.082 meter. Jika seorang pejalan kaki melintasinya dengan kecepatan rata-rata 4 km/jam (atau ~66,7 meter/menit), ia memerlukan waktu sekitar 16 menit untuk menyeberang dari satu sisi ke sisi lain!"
  }
];

export const INFOGRAPHIC_META = {
  title: "Infografis Bab 3: Rasio - Matematika SMP Kelas 7",
  sourceUrl: "https://freeimage.host/i/ntUpCw7",
  alt: "Infografis Bab 3 Rasio Matematika SMP Kelas 7",
  highlights: [
    "Pengertian Rasio: Membandingkan dua besaran yang sejenis atau berlainan satuan dengan pembagian sederhana.",
    "Perbandingan Senilai: Jika kuantitas A bertambah, maka kuantitas B bertambah dengan rasio konstan (a1/b1 = a2/b2).",
    "Faktor Skala: Perbandingan ukuran gambar dengan benda nyata pada peta, denah, atau gambar model.",
    "Laju Satuan (Unit Rate): Mengukur rasio terhadap 1 satuan baku (kecepatan km/jam, harga per kilogram, debit air)."
  ]
};
