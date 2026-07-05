document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. POPULATE DATA DARI CONFIG ---
    document.getElementById('op-names').textContent = `${config.mempelai.pria.namaPanggilan} & ${config.mempelai.wanita.namaPanggilan}`;
    document.getElementById('hero-names').textContent = `${config.mempelai.pria.namaPanggilan} & ${config.mempelai.wanita.namaPanggilan}`;
    document.getElementById('hero-date').textContent = config.acara.tanggalTeks;
    
    document.getElementById('nama-pria').textContent = config.mempelai.pria.namaLengkap;
    document.getElementById('ortu-pria').textContent = `Bapak ${config.mempelai.pria.bapak} & Ibu ${config.mempelai.pria.ibu}`;
    document.getElementById('nama-wanita').textContent = config.mempelai.wanita.namaLengkap;
    document.getElementById('ortu-wanita').textContent = `Bapak ${config.mempelai.wanita.bapak} & Ibu ${config.mempelai.wanita.ibu}`;

    document.getElementById('waktu-akad').textContent = config.acara.akad.waktu;
    document.getElementById('waktu-resepsi').textContent = config.acara.resepsi.waktu;
    document.getElementById('lokasi-nama').textContent = config.acara.lokasi.nama;
    document.getElementById('lokasi-alamat').textContent = config.acara.lokasi.alamat;
    document.getElementById('link-maps').href = config.acara.lokasi.linkMaps;
    
    document.getElementById('footer-names').textContent = `${config.mempelai.pria.namaPanggilan} & ${config.mempelai.wanita.namaPanggilan}`;
    
    // Setup Audio Source
    document.getElementById('bg-music').src = config.musik;

    // --- 2. OPENING SCREEN LOGIC ---
    const btnBuka = document.getElementById('btn-buka');
    const openingScreen = document.getElementById('opening-screen');
    const mainContent = document.getElementById('main-content');
    const bgMusic = document.getElementById('bg-music');
    let isMusicPlaying = false;

    btnBuka.addEventListener('click', () => {
        openingScreen.classList.add('slide-up');
        mainContent.classList.remove('d-none');
        
        bgMusic.play().then(() => {
            isMusicPlaying = true;
        }).catch(err => console.log("Autoplay blocked"));

        setTimeout(() => {
            openingScreen.style.display = 'none';
        }, 1000);
    });

    // --- 3. COUNTDOWN TIMER ---
    const countdownDate = new Date(config.acara.tanggal).getTime();
    const x = setInterval(() => {
        const now = new Date().getTime();
        const distance = countdownDate - now;

        if (distance < 0) {
            clearInterval(x);
            document.getElementById("countdown-timer").innerHTML = "<h4 class='text-gold'>Acara Sedang/Telah Berlangsung</h4>";
            return;
        }

        document.getElementById("days").innerText = String(Math.floor(distance / (1000 * 60 * 60 * 24))).padStart(2, '0');
        document.getElementById("hours").innerText = String(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).padStart(2, '0');
        document.getElementById("minutes").innerText = String(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0');
        document.getElementById("seconds").innerText = String(Math.floor((distance % (1000 * 60)) / 1000)).padStart(2, '0');
    }, 1000);

    // --- 4. SCROLL ANIMATION ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));

    // --- 5. FLOATING BUTTONS ---
    const btnMusic = document.getElementById('btn-music');
    btnMusic.addEventListener('click', () => {
        if (isMusicPlaying) {
            bgMusic.pause();
            btnMusic.innerHTML = '🔇';
        } else {
            bgMusic.play();
            btnMusic.innerHTML = '🎵';
        }
        isMusicPlaying = !isMusicPlaying;
    });

    const btnTop = document.getElementById('btn-top');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) btnTop.classList.add('show');
        else btnTop.classList.remove('show');
    });
    btnTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

    // --- 6. RSVP FORM HANDLER ---
    const rsvpForm = document.getElementById('rsvp-form');
    const btnSubmit = document.getElementById('btn-submit');
    const formAlert = document.getElementById('form-alert');
    const spinner = btnSubmit.querySelector('.spinner-border');
    const wishesContainer = document.getElementById('wishes-container');

    rsvpForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        btnSubmit.disabled = true;
        spinner.classList.remove('d-none');
        formAlert.classList.add('d-none');

        const formData = new FormData(rsvpForm);
        const name = formData.get('nama');
        const message = formData.get('ucapan');
        const kehadiran = formData.get('kehadiran');
        const dataParams = new URLSearchParams(formData).toString();

        fetch(config.urlGoogleAppsScript, {
            method: 'POST',
            mode: 'no-cors',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: dataParams
        }).then(() => {
            formAlert.className = 'alert alert-success mt-3';
            formAlert.textContent = 'Terima kasih, konfirmasi Anda telah terkirim.';
            formAlert.classList.remove('d-none');
            
            if(wishesContainer.innerHTML.includes('Belum ada ucapan')) {
                wishesContainer.innerHTML = '';
            }
            const statusBadge = kehadiran === 'Hadir' ? '<span class="badge bg-success">Hadir</span>' : '';
            wishesContainer.innerHTML = `
                <div class="border-bottom pb-2 mb-2 text-start">
                    <strong class="font-lora text-dark">${name} ${statusBadge}</strong>
                    <p class="mb-0 small text-muted">${message}</p>
                </div>
            ` + wishesContainer.innerHTML;
            
            rsvpForm.reset();
        }).catch(err => {
            formAlert.className = 'alert alert-danger mt-3';
            formAlert.textContent = 'Terjadi kesalahan. Silakan coba lagi.';
            formAlert.classList.remove('d-none');
        }).finally(() => {
            btnSubmit.disabled = false;
            spinner.classList.add('d-none');
        });
    });

});