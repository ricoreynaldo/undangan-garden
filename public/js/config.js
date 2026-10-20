// ============================================================
//  SEMUA KONTEN UNDANGAN ADA DI SINI — cukup edit file ini.
//  Foto: taruh di public/images/ lalu sesuaikan path-nya.
//  Foto yang belum ada otomatis tampil sebagai placeholder.
//  (Isi di bawah adalah data CONTOH — ganti dengan data asli.)
// ============================================================
window.INVITATION = {
  couple: {
    short: ['Arga', 'Sekar'], // tampil besar di sampul, hero & penutup
    intro: 'Dengan memohon rahmat dan ridho Allah SWT, kami bermaksud menyelenggarakan pernikahan putra-putri kami:',
    groom: {
      name: 'Arga Mahendra Putra',
      title: 'S.Hut.',
      parents: 'Putra kedua dari Bapak Wirawan Hadi & Ibu Kartika Sari',
      instagram: 'argamahendra', // tanpa @ — kosongkan untuk menyembunyikan
      photo: 'images/groom.jpg',
    },
    bride: {
      name: 'Sekar Ayu Larasati',
      title: 'S.P.',
      parents: 'Putri pertama dari Bapak Bambang Suryono & Ibu Melati Rahayu',
      instagram: 'sekarayu',
      photo: 'images/bride.jpg',
    },
  },

  // Tanggal utama (dipakai countdown) — format ISO lokal
  date: '2027-04-18T08:00:00+07:00',
  dateShort: '18 · 04 · 2027',
  dateLong: 'Minggu, 18 April 2027',

  cover: {
    photo: 'images/cover.jpg',
    defaultGuest: 'Tamu Undangan', // dipakai bila tidak ada ?to=Nama di URL
  },

  hero: {
    photo: 'images/hero.jpg',
    kicker: 'Kami menikah',
  },

  quote: {
    text: 'Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu pasangan hidup dari jenismu sendiri, supaya kamu merasa tenteram kepadanya, dan dijadikan-Nya di antaramu rasa kasih dan sayang.',
    source: 'QS. Ar-Rum: 21',
  },

  story: [
    {
      year: '2018',
      title: 'Benih pertama',
      text: 'Kami bertemu di sebuah pameran tanaman di Bogor — ia sibuk memotret anggrek, saya sibuk menawar pot. Satu percakapan kecil yang ternyata panjang.',
      photo: 'images/gallery-hands.jpg',
    },
    {
      year: '2021',
      title: 'Tumbuh perlahan',
      text: 'Seperti kebun, cinta kami dirawat pelan-pelan: lewat sabar, lewat jarak, dan lewat kebiasaan kecil yang tak pernah absen.',
      photo: 'images/gallery-forest.jpg',
    },
    {
      year: '2026',
      title: 'Mekar',
      text: 'Di halaman rumah yang penuh bunga, dua keluarga duduk bersama. Sebuah cincin, satu pertanyaan, dan satu jawaban: iya.',
      photo: 'images/gallery-rings.jpg',
    },
    {
      year: '2027',
      title: 'Taman kami',
      text: 'Hari ini kami mulai menanam taman kami sendiri. Terima kasih telah menjadi bagian dari musim-musim yang kami lalui.',
      photo: 'images/gallery-aisle.jpg',
    },
  ],

  events: [
    {
      label: 'Akad Nikah',
      date: 'Minggu, 18 April 2027',
      time: '08.00 — 10.00 WIB',
      venue: 'Masjid Raya Bogor',
      address: 'Jl. Raya Pajajaran, Bantarjati, Bogor Utara, Kota Bogor',
      // Lokasi untuk preview peta: alamat, nama tempat, atau koordinat "lat,lng"
      mapQuery: 'Masjid Raya Bogor',
      // Link tombol "Buka Maps" (opsional — kosongkan agar otomatis dari mapQuery)
      map: '',
    },
    {
      label: 'Resepsi Taman',
      date: 'Minggu, 18 April 2027',
      time: '11.00 — 14.00 WIB',
      venue: 'Kebun Raya Bogor',
      address: 'Jl. Ir. H. Juanda No. 13, Paledang, Bogor Tengah, Kota Bogor',
      mapQuery: 'Kebun Raya Bogor',
      map: '',
    },
  ],

  gallery: [
    'images/gallery-smile.jpg',
    'images/gallery-veil.jpg',
    'images/gallery-hands.jpg',
    'images/gallery-shoes.jpg',
    'images/gallery-aisle.jpg',
    'images/gallery-forest.jpg',
    'images/gallery-rings.jpg',
  ],

  gift: {
    // Rekening & e-wallet — tambah / hapus baris sesuai kebutuhan.
    // type: 'bank' (Transfer bank) atau 'ewallet' (E-wallet)
    // logo: gambar di public/images/ (png/jpg/svg) — kosongkan untuk tanpa logo
    accounts: [
      { type: 'bank', name: 'BCA', number: '6040 1122 33', holder: 'Arga Mahendra Putra', logo: '' },
      { type: 'bank', name: 'BNI', number: '0987 6543 21', holder: 'Sekar Ayu Larasati', logo: '' },
      { type: 'ewallet', name: 'DANA', number: '0813 1122 3344', holder: 'Sekar Ayu Larasati', logo: '' },
    ],
    qris: '', // isi 'images/qris.png' bila sudah ada gambar QRIS
    address: 'Jl. Pakuan No. 7, Tegallega, Bogor Tengah, Kota Bogor 16129',
    addressRecipient: 'Sekar Ayu Larasati',
  },

  closing: {
    photo: 'images/closing.jpg',
    title: 'Terima kasih',
    text: 'Kehadiran dan doa restu Anda akan membuat taman kecil kami mekar lebih indah.',
  },

  // Efek taman — matikan yang tidak diinginkan
  garden: {
    petals: true,     // kelopak berjatuhan
    butterflies: 3,   // jumlah kupu-kupu (0 = tidak ada)
    plant: true,      // ketuk area kosong untuk menanam bunga
  },

  // Tag WhatsApp di footer — nomor format bebas (0812…, +62 812…, 62812…).
  // Kosongkan whatsapp ('') untuk menyembunyikan tag.
  contact: {
    whatsapp: '085920063749',
    message: 'Halo HEAVEN, saya tertarik membuat undangan digital.',
  },

  // Taruh file musik di public/audio/ — '' untuk menonaktifkan
  music: 'audio/gymnopedie.mp3',
};
