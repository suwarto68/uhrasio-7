export interface LearningObjective {
  code: string;
  title: string;
  shortDesc: string;
  detail: string;
  examples: string[];
  keyConcept: string;
  cognitiveFocus: string;
}

export const LEARNING_OBJECTIVES: LearningObjective[] = [
  {
    code: "3.1",
    title: "Konsep Rasio & Perbedaan dengan Selisih",
    shortDesc: "Menjelaskan konsep rasio dan membedakannya dengan selisih dalam perbandingan kuantitas.",
    detail: "Rasio merupakan perbandingan multiplikatif (perkalian/pembagian) antara dua besaran atau lebih yang sejenis atau berlainan satuan, dinyatakan dalam bentuk a : b atau a/b. Berbeda dengan selisih yang merupakan perbandingan aditif (pengurangan |a - b|), rasio mempertahankan proporsi ketika kuantitas diperbesar atau diperkecil secara proporsional.",
    examples: [
      "Perkebunan Wanaraya memanen 120 kg Jeruk Siam dan 40 kg Jeruk Madu. Rasio Jeruk Siam terhadap Jeruk Madu adalah 120 : 40 = 3 : 1 (tiap 3 kg jeruk siam ada 1 kg jeruk madu), sedangkan selisihnya adalah 120 - 40 = 80 kg.",
      "Jika jumlah kedua jenis jeruk dilipatgandakan 2 kali, selisihnya berubah menjadi 160 kg, tetapi rasionya tetap konsisten 3 : 1."
    ],
    keyConcept: "Perbandingan Multiplikatif (a : b) vs Perbandingan Aditif (a - b)",
    cognitiveFocus: "Pemahaman Konseptual & Penalaran Kritis"
  },
  {
    code: "3.2",
    title: "Faktor Skala dalam Pemecahan Masalah",
    shortDesc: "Menggunakan faktor skala (k) untuk memperbesar, memperkecil, dan menyelesaikan masalah proporsi.",
    detail: "Faktor skala k adalah pengali konstan yang menghubungkan ukuran pada gambar/peta/maket dengan ukuran sebenarnya: Ukuran Sebenarnya = Ukuran Gambar × Skala (atau Skala = Ukuran Gambar / Ukuran Sebenarnya). Faktor skala k > 1 memperbesar objek, sedangkan 0 < k < 1 memperkecil objek.",
    examples: [
      "Skala denah Jembatan Barito di buku cetak adalah 1 : 25.000. Jika panjang bentang jembatan pada denah adalah 4,32 cm, maka panjang jembatan sesungguhnya adalah 4,32 × 25.000 cm = 108.000 cm = 1.080 meter.",
      "Foto maket perahu kelotok berukuran panjang 15 cm diperbesar dengan faktor skala 3, maka panjang baru adalah 15 × 3 = 45 cm."
    ],
    keyConcept: "k = Ukuran Gambar / Ukuran Objek Sebenarnya",
    cognitiveFocus: "Aplikasi Matematis & Pemodelan Geometris"
  },
  {
    code: "3.3",
    title: "Rasio Ekuivalen & Proporsi",
    shortDesc: "Menghubungkan rasio ekuivalen dengan proporsi senilai serta menyelesaikan nilai variabel yang belum diketahui.",
    detail: "Dua rasio a : b dan c : d dikatakan ekuivalen jika bernilai sama, yang membentuk sebuah proporsi: a/b = c/d atau a × d = b × c (perkalian silang). Konsep ini mendasari penyelesaian persamaan linear satu variabel yang melibatkan perbandingan senilai.",
    examples: [
      "Resep pewarna alami Sasirangan Barito Kuala membutuhkan 3 sendok serbuk kunyit untuk 5 liter air (3 : 5). Jika pengrajin menggunakan 15 liter air, banyak serbuk kunyit yang dibutuhkan adalah x, sehingga 3/5 = x/15 -> 5x = 45 -> x = 9 sendok.",
      "Perbandingan harga 4 buku tulis di Koperasi SMPN 1 Wanaraya adalah Rp14.000, maka untuk 10 buku tulis berlaku proporsi 4/14.000 = 10/y -> y = Rp35.000."
    ],
    keyConcept: "Proporsi Senilai: a/b = c/d <=> a·d = b·c",
    cognitiveFocus: "Aplikasi Aljabar & Perhitungan Linier"
  },
  {
    code: "3.4",
    title: "Rasio Satuan & Laju Perubahan Satuan",
    shortDesc: "Menggunakan rasio untuk menyelesaikan masalah laju perubahan satuan (rate) dalam kehidupan nyata.",
    detail: "Laju perubahan satuan (unit rate) adalah rasio yang membandingkan dua kuantitas dengan satuan berbeda, di mana kuantitas kedua dinyatakan dalam 1 satuan tunggal. Contoh laju satuan mencakup kecepatan (km/jam), harga satuan (Rp/kg), konsumsi bahan bakar (km/liter), dan debit aliran air irigasi (liter/menit).",
    examples: [
      "Perahu kelotok penyeberangan Sungai Barito menempuh jarak 18 km dalam waktu 45 menit (3/4 jam). Laju kecepatannya adalah 18 ÷ 0,75 = 24 km/jam.",
      "Pompa air irigasi sawah pasang surut Wanaraya mampu mengalirkan 4.500 liter air dalam waktu 30 menit. Laju perubahan satuannya adalah 4.500 ÷ 30 = 150 liter/menit."
    ],
    keyConcept: "Laju Satuan = Kuantitas A / Kuantitas B (Satuan A per Satuan B)",
    cognitiveFocus: "Pemecahan Masalah Kontekstual & Penalaran HOTS"
  }
];
