# Agent Brief: Aplikasi Kuis Interaktif Edukatif

Dokumen ini dibuat untuk menjelaskan arah pembangunan aplikasi kepada agent AI/developer berikutnya. Baca dokumen ini sebelum mengubah kode agar implementasi tetap sesuai tujuan produk.

## Ringkasan Proyek

Project ini adalah aplikasi kuis interaktif edukatif berbasis web dengan nuansa permainan seperti "Who Wants to Be a Millionaire". Fokus utamanya bukan hanya menjawab soal, tetapi juga memberi pembelajaran melalui pembahasan setelah pengguna memilih jawaban atau ketika waktu habis.

Aplikasi harus terasa seperti game kuis: ada pertanyaan, pilihan ganda A/B/C/D, timer, efek visual saat menjawab, bantuan "Phone a Friend", feedback benar/salah, serta tampilan menang/kalah. Bedanya, komponen video pada konsep awal tidak digunakan. Semua adegan bergerak memakai GIF. Untuk tahap sekarang, file GIF belum tersedia, jadi implementasi harus menyediakan placeholder yang rapi.

## Teknologi Project Saat Ini

- Framework: Next.js
- Bahasa: TypeScript
- UI: React, shadcn/ui-style components, Tailwind CSS
- Animasi: framer-motion sudah tersedia di dependencies
- Icon: lucide-react sudah tersedia

Ikuti pola project yang sudah ada. Jangan membuat stack baru kalau tidak diperlukan.

## Tujuan Aplikasi

1. Menyediakan permainan kuis interaktif yang menyenangkan.
2. Memuat pertanyaan secara acak dari bank soal eksternal.
3. Memberi pengalaman edukatif lewat pembahasan jawaban setelah setiap soal.
4. Menggunakan elemen multimedia: teks, gambar, animasi, audio, dan GIF.
5. Menghadirkan fitur bantuan "Phone a Friend" dengan sistem probabilitas 50:50.

## Target MVP

Untuk versi awal, aplikasi minimal harus punya:

- Halaman utama/start screen.
- Sesi kuis berjalan.
- Pertanyaan acak dari data eksternal.
- Empat opsi jawaban: A, B, C, D.
- Timer hitung mundur per soal.
- Validasi jawaban benar/salah.
- Pop-up pembahasan edukatif setelah jawaban dipilih atau waktu habis.
- Tombol lanjut ke soal berikutnya jika benar.
- Game over jika salah atau waktu habis.
- Kondisi menang jika semua tahap soal selesai.
- Bantuan "Phone a Friend" satu kali per sesi.
- GIF placeholder untuk kondisi menang, kalah, simulasi telepon, bantuan berhasil, dan bantuan gagal.

## Aturan Game

### Awal Sesi

Pengguna membuka aplikasi dan menekan tombol mulai. Sistem membuat sesi baru, mengacak pertanyaan dari bank soal, lalu menampilkan soal pertama.

Jumlah soal per sesi sebaiknya configurable. Untuk MVP, gunakan 10 soal per sesi. Struktur harus mudah diubah menjadi 15 soal jika ingin lebih mirip format Millionaire.

### Sesi Soal

Setiap soal menampilkan:

- Teks pertanyaan.
- Empat pilihan jawaban.
- Indikator timer.
- Nomor/tahap soal saat ini.
- Tombol bantuan "Phone a Friend" jika belum digunakan.

Pengguna wajib memilih satu jawaban sebelum timer habis.

### Jawaban Benar

Jika pengguna memilih jawaban benar:

1. Tombol jawaban benar diberi highlight sukses.
2. Putar SFX benar jika file audio tersedia.
3. Tampilkan pop-up pembahasan yang menjelaskan kenapa jawaban tersebut benar.
4. Pengguna dapat lanjut ke soal berikutnya.
5. Jika itu soal terakhir, tampilkan kondisi menang.

### Jawaban Salah

Jika pengguna memilih jawaban salah:

1. Tombol yang dipilih diberi highlight gagal.
2. Jawaban yang benar juga perlu ditampilkan.
3. Putar SFX salah jika file audio tersedia.
4. Tampilkan pop-up pembahasan berisi jawaban benar dan penjelasan.
5. Setelah pop-up ditutup, tampilkan GIF kekalahan.
6. Sesi berakhir dengan status game over.

### Waktu Habis

Jika timer mencapai 0:

1. Kunci semua pilihan jawaban.
2. Tampilkan jawaban benar.
3. Putar SFX salah/peringatan jika tersedia.
4. Tampilkan pop-up pembahasan.
5. Setelah itu tampilkan GIF kekalahan.
6. Sesi berakhir dengan status game over.

## Fitur Phone a Friend

Fitur ini adalah bantuan bergaya simulasi menelepon teman. Fitur hanya dapat dipakai satu kali per sesi.

Alur:

1. Pengguna menekan tombol "Phone a Friend".
2. Timer kuis dijeda selama sequence bantuan berjalan.
3. Sistem menampilkan GIF simulasi panggilan.
4. Sistem menjalankan probabilitas 50:50.
5. Jika sukses, tampilkan GIF bantuan berhasil dan beri tahu jawaban yang benar.
6. Jika gagal, tampilkan GIF bantuan gagal dan jangan beri petunjuk jawaban.
7. Setelah sequence selesai, pengguna kembali ke soal yang sama.
8. Tombol bantuan menjadi disabled/used.
9. Timer dilanjutkan.

Catatan implementasi:

- Gunakan `Math.random()` untuk MVP.
- Peluang sukses: 50%.
- Peluang gagal: 50%.
- Hasil bantuan tidak otomatis memilih jawaban. Pengguna tetap harus memilih sendiri.

## Data Pertanyaan

Bank soal berasal dari file eksternal agar konten bisa diperbarui tanpa mengubah kode aplikasi.

Rekomendasi lokasi:

```text
public/data/questions.csv
```

Format CSV yang disarankan:

```csv
id,category,difficulty,question,option_a,option_b,option_c,option_d,correct_option,explanation,image
1,Pengetahuan Umum,mudah,"Apa ibu kota Indonesia?","Jakarta","Bandung","Surabaya","Medan","A","Jakarta adalah ibu kota Indonesia.",""
```

Keterangan kolom:

- `id`: ID unik soal.
- `category`: kategori soal, misalnya Pengetahuan Umum, Sains, Sejarah, Teknologi.
- `difficulty`: tingkat kesulitan, misalnya mudah, sedang, sulit.
- `question`: teks pertanyaan.
- `option_a`: opsi jawaban A.
- `option_b`: opsi jawaban B.
- `option_c`: opsi jawaban C.
- `option_d`: opsi jawaban D.
- `correct_option`: huruf jawaban benar, hanya `A`, `B`, `C`, atau `D`.
- `explanation`: pembahasan edukatif yang muncul setelah soal dijawab.

Target akhir bank soal adalah 1000 pertanyaan. Untuk MVP, boleh mulai dengan sample kecil selama struktur datanya sudah mendukung jumlah besar.

## Multimedia

### Teks

Teks dipakai untuk:

- Pertanyaan.
- Opsi jawaban.
- Status permainan.
- Pembahasan edukatif.
- Label bantuan.
- Feedback menang/kalah.

Teks harus jelas, singkat, dan mudah dibaca.

### Gambar

Gambar dapat dipakai untuk:

- Background game.
- Ilustrasi pembahasan.
- Dekorasi UI kuis.
- Icon bantuan dan status.

Jika gambar belum tersedia, gunakan tampilan visual berbasis UI yang tetap rapi.

### Animasi

Animasi dipakai untuk:

- Transisi antar state.
- Highlight jawaban.
- Timer countdown.
- Muncul/hilangnya modal pembahasan.
- Perubahan tombol saat hover, active, benar, salah, disabled.

Gunakan animasi secukupnya agar terasa hidup, tidak mengganggu keterbacaan.

### Audio

Audio bersifat enhancement. Jika file belum tersedia, aplikasi tetap harus berjalan tanpa error.

Rekomendasi path:

```text
public/audio/bgm.mp3
public/audio/sfx-correct.mp3
public/audio/sfx-wrong.mp3
public/audio/sfx-tick.mp3
```

Audio yang diharapkan:

- BGM untuk suasana kuis.
- SFX jawaban benar.
- SFX jawaban salah.
- SFX timer/tick saat waktu hampir habis.

Tambahkan kontrol mute/unmute agar pengguna bisa mematikan audio.

### GIF

Konsep awal memakai video, tetapi project ini tidak memakai video. Semua adegan bergerak harus memakai GIF.

Untuk sekarang GIF belum tersedia. Implementasi harus memakai placeholder dulu, misalnya panel visual dengan label state, skeleton, atau fallback image. Jangan membuat aplikasi crash jika file GIF tidak ada.

Rekomendasi path asset GIF:

```text
public/gifs/win-placeholder.gif
public/gifs/lose-placeholder.gif
public/gifs/phone-call-placeholder.gif
public/gifs/phone-success-placeholder.gif
public/gifs/phone-fail-placeholder.gif
```

Kondisi GIF:

1. GIF menang: tampil saat pengguna menyelesaikan semua soal.
2. GIF kalah: tampil saat pengguna salah menjawab atau waktu habis.
3. GIF simulasi panggilan: tampil saat bantuan "Phone a Friend" dimulai.
4. GIF bantuan berhasil: tampil saat probabilitas bantuan sukses.
5. GIF bantuan gagal: tampil saat probabilitas bantuan gagal.

## State Utama Aplikasi

Minimal state yang perlu dipikirkan:

- `idle`: pengguna belum mulai.
- `playing`: kuis sedang berjalan.
- `answering`: pengguna sudah memilih jawaban dan sistem sedang menampilkan feedback.
- `explanation`: modal pembahasan sedang tampil.
- `phone_call`: sequence bantuan sedang berjalan.
- `won`: pengguna menang.
- `lost`: pengguna kalah/game over.

State pendukung:

- daftar soal sesi saat ini.
- index soal saat ini.
- jawaban yang dipilih.
- status benar/salah.
- sisa waktu.
- apakah bantuan sudah dipakai.
- hasil bantuan jika ada.
- status audio mute/unmute.

## Struktur UI yang Disarankan

### Start Screen

Isi:

- Judul aplikasi.
- Deskripsi singkat bahwa ini kuis edukatif interaktif.
- Tombol mulai.
- Info ringkas jumlah soal dan aturan bantuan.

### Quiz Screen

Isi:

- Header status: nomor soal, kategori/kesulitan, skor/progress.
- Area pertanyaan.
- Grid opsi A/B/C/D.
- Timer visual.
- Tombol "Phone a Friend".
- Kontrol audio.

### Explanation Modal

Isi:

- Status jawaban: benar, salah, atau waktu habis.
- Jawaban benar.
- Pembahasan edukatif.
- Tombol lanjut jika benar.
- Tombol akhiri/lihat hasil jika salah atau waktu habis.

### Phone a Friend Modal

Isi:

- GIF simulasi panggilan atau placeholder.
- Setelah probabilitas dijalankan, tampilkan GIF berhasil/gagal.
- Jika berhasil, tampilkan jawaban yang disarankan.
- Jika gagal, tampilkan pesan bahwa teman tidak bisa membantu.

### Result Screen

Untuk menang:

- GIF menang atau placeholder.
- Pesan selamat.
- Ringkasan skor.
- Tombol main lagi.

Untuk kalah:

- GIF kalah atau placeholder.
- Pesan game over.
- Ringkasan skor/progress.
- Tombol coba lagi.

## Prinsip Desain

- Tampilan harus terasa seperti game kuis, bukan landing page marketing.
- Prioritaskan layar permainan sebagai pengalaman utama.
- UI harus jelas, responsif, dan nyaman dipakai di desktop maupun mobile.
- Pilihan jawaban harus besar dan mudah diklik.
- Timer harus terlihat jelas tanpa membuat layout berantakan.
- Jangan membuat elemen teks bertumpuk atau keluar dari container.
- Gunakan ikon dari `lucide-react` jika perlu.
- Gunakan komponen UI existing jika sudah tersedia.

## Error Handling

Aplikasi harus tetap aman jika:

- CSV belum tersedia.
- Data CSV kosong.
- Ada soal dengan format tidak valid.
- GIF belum tersedia.
- Audio belum tersedia.
- Gambar pendukung belum tersedia.

Fallback yang disarankan:

- Jika CSV belum ada, pakai sample questions hardcoded sementara.
- Jika GIF belum ada, tampilkan placeholder visual.
- Jika audio belum ada, skip playback tanpa menampilkan error.
- Jika gambar tidak ada, sembunyikan area gambar.

## Acceptance Criteria

Implementasi dianggap sesuai jika:

- Pengguna bisa mulai kuis dari layar awal.
- Soal tampil dengan empat opsi jawaban.
- Timer berjalan dan bisa memicu kondisi kalah saat habis.
- Jawaban benar menampilkan pembahasan lalu lanjut ke soal berikutnya.
- Jawaban salah menampilkan pembahasan lalu game over.
- Semua soal selesai menampilkan kondisi menang.
- Phone a Friend bisa digunakan satu kali per sesi.
- Phone a Friend memakai probabilitas 50:50.
- Hasil Phone a Friend sukses menampilkan jawaban benar sebagai saran.
- Hasil Phone a Friend gagal tidak memberi petunjuk.
- Semua kondisi GIF punya placeholder yang tidak menyebabkan error.
- Aplikasi tetap berjalan walau asset multimedia belum lengkap.

## Catatan Penting untuk Agent Berikutnya

- Jangan implementasikan video. Gunakan GIF.
- Jangan menunggu asset GIF final. Buat placeholder dulu.
- Jangan mengunci logic ke sample data kecil. Struktur harus siap untuk 1000 soal.
- Jangan menghapus pola atau komponen project yang sudah ada tanpa alasan kuat.
- Fokus pertama adalah membuat pengalaman kuis berjalan end-to-end.
- Setelah flow utama stabil, baru polish visual, audio, dan asset multimedia.
