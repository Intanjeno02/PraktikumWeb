# Dokumen Teknis Modul 2 — HTML Semantik, Tailwind CSS, dan Aksesibilitas 

Nama/NIM   : Intan Rhevita Arselina Suryana
Repositori : Prakweb-modul2

## 1. Struktur Semantik
- Kerangka landmark dan hierarki judul halaman utama
kerangka landmark judul halaman utama
PAGE
│
├── BANNER
│   └── Header / SkyWatch
│       └── NAVIGATION
│           ├── Overview
│           ├── 3-Day Forecast
│           ├── Atmosphere
│           └── Advisories
│
├── SEARCH
│   └── Search city
│
├── MAIN
│   │
│   ├── H1
│   │
│   ├── REGION
│   │   └── H2 Current Weather Conditions
│   │
│   ├── REGION
│   │   ├── H2 3-Day Sky Forecast
│   │   └── H3 Forecast cards
│   │
│   ├── REGION
│   │   ├── H2 Atmospheric & Sky Highlights
│   │   └── H3 Sensor/metric cards
│   │
│   └── COMPLEMENTARY
│       └── H2 Sky Watchers' Advisory & Daily Tips
│
└── CONTENTINFO
    └── Footer

hierarki heading 
H1
└── Live Sky Weather Dashboard and Atmospheric Conditions

    H2
    └── Current Weather Conditions

    H2
    └── 3-Day Sky Forecast
        ├── H3 Passing Fluffy Clouds & Mild Breeze
        ├── H3 Afternoon Cloudburst & Light Rain
        └── H3 Clear Azure Skies & Radiant Sun

    H2
    └── Atmospheric & Sky Highlights
        ├── H3 Wind Flow & Vector
        ├── H3 Air Quality Index (AQI)
        ├── H3 Solar UV Radiation
        ├── H3 Cloud Ceiling & Base
        ├── H3 Humidity & Dew Point
        └── H3 Solar Day & Golden Hour

    H2
    └── Sky Watchers' Advisory & Daily Tips

Kerangka landmark halaman utama SkyWatch terdiri dari banner sebagai header, navigation sebagai navigasi utama, main sebagai konten utama, region untuk setiap bagian informasi cuaca, complementary untuk bagian advisory/tips, dan contentinfo untuk footer. Hierarki heading menggunakan satu H1 sebagai judul utama halaman, kemudian H2 sebagai judul setiap section, dan H3 sebagai subjudul atau kartu informasi di dalam section. Struktur ini digunakan agar halaman lebih mudah dipahami dan dinavigasi oleh pengguna screen reader.

- Tangkapan layar pohon aksesibilitas pada DevTools
gambar ada di file accesbility tree.

## 2. Tata Letak Responsif
- Tangkapan layar pada lebar 360 px, 768 px, dan 1280 px
tangkapan layar ada pada file layar 360, 768 dan 1280

- Kelas Flexbox, Grid, dan breakpoint yang digunakan beserta alasannya
aku pake Flexbox untuk komponen seperti header dan navigation karena komponennya tersusun dalam satu dimensi. Karena elemen-elemen tersebut berada dalam satu baris/kolom dan perlu mengatur posisi, jarak, serta alignment antar elemen. Flexbox lebih cocok untuk mengatur layout satu dimensi seperti header, navigation, search bar, dan tombol.

aku pake CSS Grid di bagian forecast dan atmospheric highlights karena komponennya berupa kumpulan card yang perlu disusun dalam baris dan kolom. Grid memudahkan pengaturan jumlah kolom dan membuat card tetap terstruktur ketika ukuran layar berubah.

Saya menggunakan breakpoint agar layout dapat beradaptasi dengan ukuran layar. Pada layar kecil card dibuat satu kolom agar konten tetap mudah dibaca, kemudian pada layar yang lebih besar jumlah kolom ditambah menjadi dua dan tiga kolom untuk memanfaatkan ruang yang tersedia.

## 3. Audit Aksesibilitas
- Tabel skor Lighthouse sebelum dan sesudah perbaikan  (halaman latihan dan halaman utama)
| No | Halaman | Skor Sebelum | Skor Sesudah | Perubahan | Keterangan |
|---:|---|---:|---:|---:|---|
| 1 | Halaman Utama SkyWatch | 92 | **100** | +8 | Setelah pengujian ulang menggunakan Chrome Incognito |
| 2 | Halaman Latihan | Belum diukur | Belum diukur | - | Belum dilakukan pengujian Lighthouse |

- Daftar audit yang gagal, penyebab, dan perbaikannya
### 3.1 Audit yang Gagal Sebelum Pengujian Bersih
| No | Audit yang Gagal | Penyebab | Perbaikan / Tindakan |
|---:|---|---|---|
| 1 | Buttons do not have an accessible name | Lighthouse mendeteksi `<button>` pada elemen eksternal `chat-gpt-quick-query-*` yang tidak memiliki accessible name. Elemen tersebut bukan bagian dari aplikasi SkyWatch. | Tidak mengubah kode SkyWatch. Pengujian diulang menggunakan Chrome Incognito agar elemen eksternal tidak memengaruhi hasil audit. |
| 2 | Some elements have a `[tabindex]` value greater than 0 | Lighthouse mendeteksi `div.chat-gpt-quick-query-model-wrapper` dengan `tabindex="1"`. Elemen tersebut bukan bagian dari aplikasi SkyWatch. | Tidak mengubah kode SkyWatch. Pengujian diulang menggunakan Chrome Incognito untuk mendapatkan hasil yang lebih bersih. |

### 3.2 Hasil Pengujian Setelah Pengujian Bersih
| No | Parameter | Sebelum | Sesudah |
|---:|---|---:|---:|
| 1 | Accessibility Score | **92** | **100** |
| 2 | Buttons do not have an accessible name | Gagal* | Lulus |
| 3 | `[tabindex]` value greater than 0 | Gagal* | Lulus |
| 4 | Status | Terpengaruh elemen eksternal | Tidak ada audit gagal |

> **Catatan:** Audit yang gagal pada pengujian awal berasal dari elemen `chat-gpt-quick-query-*` yang bukan bagian dari aplikasi SkyWatch. Setelah pengujian dilakukan menggunakan Chrome Incognito, skor Accessibility menjadi **100**.

- Hasil pemeriksaan manual dengan papan ketik
### 3.3 Hasil Pemeriksaan Manual dengan Papan Ketik

| No | Pengujian | Metode Pengujian | Hasil | Keterangan |
|---:|---|---|---|---|
| 1 | Skip to Content | Menekan `Tab` lalu `Enter` pada link Skip to Content | ✅ Lulus | Fokus berpindah langsung ke konten utama |
| 2 | Navigasi Utama | Menekan `Tab` untuk berpindah antar menu | ✅ Lulus | Semua menu navigasi dapat dicapai menggunakan keyboard |
| 3 | Focus Indicator | Menekan `Tab` dan mengamati indikator fokus | ✅ Lulus | Elemen yang sedang fokus terlihat dengan jelas |
| 4 | Search | Menekan `Tab`, mengetik nama kota, lalu menekan `Enter` | ✅ Lulus | Pencarian dapat dilakukan tanpa menggunakan mouse |
| 5 | Quick Select City | Menekan `Tab` hingga tombol kota, lalu `Enter` | ✅ Lulus | Kota dapat dipilih menggunakan keyboard |
| 6 | Temperature Unit | Menekan `Tab` hingga tombol unit, lalu `Enter`/`Space` | ✅ Lulus | Satuan suhu dapat diubah menggunakan keyboard |
| 7 | Refresh Weather | Menekan `Tab` hingga tombol refresh, lalu `Enter`/`Space` | ✅ Lulus | Tombol refresh dapat dijalankan menggunakan keyboard |
| 8 | Footer Navigation | Menekan `Tab` untuk berpindah ke link pada footer | ✅ Lulus | Semua link footer dapat menerima fokus keyboard |

Kesimpulan Pemeriksaan Manual
Berdasarkan pemeriksaan manual menggunakan papan ketik, seluruh elemen interaktif yang diuji dapat diakses tanpa menggunakan mouse. Navigasi `Tab`, aktivasi menggunakan `Enter` atau `Space`, indikator fokus, Skip to Content, pencarian kota, pemilihan kota, pergantian satuan suhu, tombol refresh, dan navigasi footer dapat digunakan dengan baik. Dengan demikian, hasil pemeriksaan manual menunjukkan bahwa halaman utama dapat dinavigasi menggunakan keyboard.

## 4. Kendala dan Penyelesaian
terkendala saat melakukan push, salah melakukan push, sehingga datanya menghilang semua dari vscode terus udah aku selesaiin dengan membuat file baru lalu mengerjakan ulang. Setelah itu aku di bantu untuk melakukan push ulang oleh mike dan bang akbar.

## 5. Catatan Pemanfaatan AI Alat, perintah utama, bagian yang digunakan, dan cara memverifikasinya. Tulis "Tidak menggunakan AI" apabila tidak menggunakan AI.
perintah utama dan bagiannya udah aku berikan screenshotnya di file no.5-1 dan no.5-2