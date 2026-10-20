# undangan-garden

Undangan pernikahan digital bertema **taman bunga** — penuh bunga dan animasi.
Arsitektur sama dengan `undangan-lintang`: frontend vanilla di `public/`, server statis Express,
RSVP & ucapan di Firebase Firestore (koleksi `rsvp`).

## Berkas

| Berkas | Isi |
|---|---|
| `public/js/config.js` | **Semua konten** (nama, tanggal, acara, galeri, rekening, efek taman) |
| `public/js/app.js` | Konten, countdown, peta, galeri + lightbox, RSVP/buku tamu, salin rekening |
| `public/js/flora.js` | Generator ilustrasi bunga (SVG murni) untuk setiap `[data-flora]` |
| `public/js/garden.js` | Semua gerak dekoratif (lihat di bawah) |
| `public/js/db.js` | Firestore / mode demo localStorage |

## Animasi

- Sampul: empat buket pojok mekar kelopak demi kelopak lalu bergoyang tertiup angin; saat
  "Buka Undangan" buket tersibak ke luar disertai hujan kelopak
- Kelopak berjatuhan (canvas) yang ikut bergeser saat digulir; kupu-kupu terbang bebas dan
  menghindar dari jari/kursor
- Hero: mahkota bunga mengikuti lengkung foto, padang bunga 3 lapis (tangkai tergambar,
  bunga mekar, rumput bergoyang dengan kecepatan berbeda)
- Pembatas sulur yang tergambar + bunga mekar di sepanjangnya
- Karangan bunga berputar pelan (sampul & penutup), lencana countdown berbentuk bunga
- Cerita: batang sulur tumbuh mengikuti gulir, tiap bab ditandai bunga yang mekar
- Ketuk area kosong → bunga tumbuh di titik itu lalu layu (`garden.plant`)
- RSVP terkirim → ledakan kelopak; pil Hadir/Berhalangan mekar saat dipilih

Bunga, daun & kupu-kupu dibuat dengan kode (tanpa file gambar). Reduced motion / garden.js
gagal dimuat → semua dekorasi tetap tampil, tanpa gerak.

Efek bisa dimatikan di `config.js`:

```js
garden: { petals: true, butterflies: 3, plant: true }
```

## Mengedit konten

Semua teks, tanggal, foto, rekening ada di `public/js/config.js`. `?to=Nama` mengisi nama tamu.
Foto ditaruh di `public/images/` — file yang belum ada tampil sebagai placeholder.
Foto & musik saat ini hanya CONTOH (CC0 / domain publik, lihat `CREDITS.md`) — ganti dengan
foto pasangan asli.

## Firebase

1. Buat project Firebase + Firestore, salin config web ke `public/js/firebase-config.js`.
2. Publish `firestore.rules` (`firebase deploy --only firestore:rules`).

Selama `apiKey` masih `ISI_...`, RSVP berjalan dalam **mode demo** (tersimpan di
localStorage perangkat sendiri, tidak terlihat tamu lain).

## Menjalankan

```bash
npm install
npm start
```

Buka http://localhost:3055/?to=Budi+Santoso
