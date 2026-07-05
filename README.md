# Undangan Pernikahan Digital - Tema Sunda Modern

## Cara Menggunakan
1. **Konfigurasi Data:** Buka file `config.js` dan ubah data mempelai, tanggal acara, lokasi, dan nomor rekening sesuai kebutuhan Anda. Jangan mengubah struktur file `.html`, `.css`, atau `.js` lainnya jika tidak memiliki dasar coding.
2. **Audio:** Masukkan file MP3 Anda ke dalam folder `assets/` dengan nama `audio.mp3`, atau sesuaikan nama file di dalam `config.js`.

## Setup Google Sheets untuk RSVP
1. Buat Google Sheet baru dan masuk ke Ekstensi > Apps Script.
2. Masukkan kode dari file `Code.gs` yang disediakan.
3. Deploy sebagai Web App dengan akses untuk "Anyone".
4. Salin URL Web App dan tempel pada properti `urlGoogleAppsScript` di file `config.js`.

## Cara Deploy Secara Gratis
Anda bisa menggunakan **GitHub Pages** atau **Netlify** agar undangan bisa diakses secara online:

**Menggunakan Netlify (Paling Mudah & Cepat):**
1. Buat akun di [Netlify](https://www.netlify.com/).
2. Masuk ke Dashboard, pilih bagian "Sites".
3. Lakukan Drag & Drop folder proyek `undangan-sunda/` Anda ke kotak yang tersedia.
4. Tunggu beberapa detik, Netlify akan memberikan link URL acak (contoh: *amazing-wedding-123.netlify.app*).
5. Anda dapat mengubah nama domain sementara melalui menu "Site settings" > "Change site name".

**Menggunakan GitHub Pages:**
1. Buat repository baru di GitHub.
2. Upload semua file dalam folder ini ke repository tersebut.
3. Masuk ke tab **Settings** repository > menu **Pages**.
4. Di bagian *Source*, pilih `main` branch dan `/root` folder, lalu klik Save.
5. Undangan Anda akan live dalam beberapa menit di URL: `https://[username].github.io/[nama-repo]/`.