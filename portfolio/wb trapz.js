// Script sederhana untuk portofolio
// Anda bisa menambahkan gambar desain ke galeri di bawah ini
const gallery = document.querySelector('.gallery');
const designs = [
    // Contoh data desain
    { src: 'https://via.placeholder.com/250x180?text=Desain+1', title: 'Desain 1' },
    { src: 'https://via.placeholder.com/250x180?text=Desain+2', title: 'Desain 2' },
    { src: 'https://via.placeholder.com/250x180?text=Desain+3', title: 'Desain 3' }
];
designs.forEach(design => {
    const img = document.createElement('img');
    img.src = design.src;
    img.alt = design.title;
    gallery.appendChild(img);
});

// Back to Top
const backToTop = document.getElementById('backToTop');
window.onscroll = function() {
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
        backToTop.style.display = 'block';
    } else {
        backToTop.style.display = 'none';
    }
};
backToTop.onclick = function() {
    window.scrollTo({top: 0, behavior: 'smooth'});
};

// Notifikasi Form
const form = document.querySelector('form');
const notif = document.getElementById('notif');
form.addEventListener('submit', function(e) {
    e.preventDefault();
    notif.style.display = 'block';
    setTimeout(() => notif.style.display = 'none', 2500);
    form.reset();
});

// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const body = document.body;
function setTheme(theme) {
    body.classList.remove('light', 'dark');
    body.classList.add(theme);
    localStorage.setItem('theme', theme);
    themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
}
// Cek preferensi awal
const savedTheme = localStorage.getItem('theme') || 'light';
setTheme(savedTheme);
themeToggle.addEventListener('click', () => {
    const newTheme = body.classList.contains('dark') ? 'light' : 'dark';
    setTheme(newTheme);
});

// Shortcut Buttons
const downloadCV = document.getElementById('downloadCV');
const copyEmail = document.getElementById('copyEmail');
const waBtn = document.getElementById('waBtn');
const printBtn = document.getElementById('printBtn');
const refreshGallery = document.getElementById('refreshGallery');

// Download CV
if (downloadCV) {
    downloadCV.onclick = () => {
        window.open('cv.pdf', '_blank');
    };
}
// Copy Email
if (copyEmail) {
    copyEmail.onclick = () => {
        const email = 'emailanda@email.com';
        navigator.clipboard.writeText(email);
        notif.textContent = 'Email dicopy!';
        notif.style.display = 'block';
        setTimeout(() => notif.style.display = 'none', 2000);
        notif.textContent = 'Pesan berhasil dikirim!';
    };
}
// WhatsApp
if (waBtn) {
    waBtn.onclick = () => {
        window.open('https://wa.me/6281234567890?text=Halo%20saya%20tertarik%20dengan%20desain%20Anda', '_blank');
    };
}
// Print
if (printBtn) {
    printBtn.onclick = () => {
        window.print();
    };
}
// Refresh Gallery
if (refreshGallery) {
    refreshGallery.onclick = () => {
        gallery.innerHTML = '';
        designs.forEach(design => {
            const img = document.createElement('img');
            img.src = design.src;
            img.alt = design.title;
            gallery.appendChild(img);
        });
        notif.textContent = 'Galeri di-refresh!';
        notif.style.display = 'block';
        setTimeout(() => notif.style.display = 'none', 1500);
        notif.textContent = 'Pesan berhasil dikirim!';
    };
}

// Multi-Logo Button (☰) - Multi Interaction
const multiLogo = document.getElementById('multiLogo');
const multiMenu = document.getElementById('multiMenu');
let pressTimer, startY, isDragging = false;

if (multiLogo) {
    // Klik sekali: toggle menu
    multiLogo.addEventListener('click', (e) => {
        if (!isDragging) {
            multiMenu.style.display = multiMenu.style.display === 'none' ? 'block' : 'none';
        }
    });
    // Klik dua kali: reload
    multiLogo.addEventListener('dblclick', (e) => {
        window.location.reload();
    });
    // Tekan lama: tampilkan info
    multiLogo.addEventListener('mousedown', (e) => {
        pressTimer = setTimeout(() => {
            notif.textContent = 'Logo multifungsi: klik, drag, double click, tekan lama!';
            notif.style.display = 'block';
            setTimeout(() => notif.style.display = 'none', 2000);
            notif.textContent = 'Pesan berhasil dikirim!';
        }, 700);
        startY = e.clientY;
        isDragging = false;
    });
    multiLogo.addEventListener('mouseup', (e) => {
        clearTimeout(pressTimer);
    });
    // Drag: scroll
    multiLogo.addEventListener('mousemove', (e) => {
        if (e.buttons === 1 && typeof startY === 'number') {
            const deltaY = e.clientY - startY;
            if (Math.abs(deltaY) > 30) {
                isDragging = true;
                if (deltaY > 0) {
                    window.scrollBy({top: 300, behavior: 'smooth'});
                } else {
                    window.scrollBy({top: -300, behavior: 'smooth'});
                }
                startY = e.clientY;
            }
        }
    });
    // Untuk mobile: touch events
    multiLogo.addEventListener('touchstart', (e) => {
        pressTimer = setTimeout(() => {
            notif.textContent = 'Logo multifungsi: tap, swipe, double tap, tekan lama!';
            notif.style.display = 'block';
            setTimeout(() => notif.style.display = 'none', 2000);
            notif.textContent = 'Pesan berhasil dikirim!';
        }, 700);
        startY = e.touches[0].clientY;
        isDragging = false;
    });
    multiLogo.addEventListener('touchend', (e) => {
        clearTimeout(pressTimer);
    });
    multiLogo.addEventListener('touchmove', (e) => {
        const deltaY = e.touches[0].clientY - startY;
        if (Math.abs(deltaY) > 30) {
            isDragging = true;
            if (deltaY > 0) {
                window.scrollBy({top: 300, behavior: 'smooth'});
            } else {
                window.scrollBy({top: -300, behavior: 'smooth'});
            }
            startY = e.touches[0].clientY;
        }
    });
}

// Produk Section
const produkGrid = document.querySelector('.produk-grid');
const produkList = [
    {
        nama: 'Poster Art Minimalis',
        gambar: 'https://via.placeholder.com/220x150?text=Poster+1',
        deskripsi: 'Poster digital bergaya minimalis, cocok untuk dekorasi ruangan modern.',
        detail: 'Poster digital bergaya minimalis, tersedia dalam berbagai ukuran dan format file. Bisa custom warna dan tulisan.'
    },
    {
        nama: 'Logo Branding',
        gambar: 'https://via.placeholder.com/220x150?text=Logo+Branding',
        deskripsi: 'Jasa pembuatan logo profesional untuk bisnis atau personal.',
        detail: 'Logo dibuat original, file siap cetak dan digital. Termasuk 3x revisi dan file master.'
    },
    {
        nama: 'Template Feed Instagram',
        gambar: 'https://via.placeholder.com/220x150?text=IG+Template',
        deskripsi: 'Template feed Instagram kreatif, mudah edit di Canva/Photoshop.',
        detail: 'Tersedia 10+ variasi desain, bisa custom warna dan font. File PSD/Canva.'
    }
];
// Loader/Transition
const pageLoader = document.getElementById('pageLoader');
function showLoader(ms=900) {
    if(pageLoader) {
        pageLoader.style.display = 'flex';
        setTimeout(()=>{ pageLoader.style.display = 'none'; }, ms);
    }
}
// Loader saat klik menu
[...document.querySelectorAll('nav a')].forEach(a=>{
    a.addEventListener('click',e=>{
        if(a.hash && document.querySelector(a.hash)) {
            showLoader();
        }
    });
});
// Loader saat reload dari multiMenu
const reloadLink = document.querySelector('#multiMenu a[onclick]');
if(reloadLink) reloadLink.addEventListener('click',()=>showLoader(700));
// Produk Share
function produkShareBtns(idx) {
    const url = encodeURIComponent(window.location.href.split('#')[0]);
    const nama = encodeURIComponent(produkList[idx].nama);
    return `
        <div class='produk-share'>
            <button title='Share WhatsApp' onclick="window.open('https://wa.me/?text=Lihat produk ${nama} di ${url}','_blank')">🟢</button>
            <button title='Share Twitter' onclick="window.open('https://twitter.com/intent/tweet?text=Lihat produk ${nama} di ${url}','_blank')">🐦</button>
            <button title='Copy Link' onclick="navigator.clipboard.writeText('${url}');notif.textContent='Link dicopy!';notif.style.display='block';setTimeout(()=>notif.style.display='none',1500);notif.textContent='Pesan berhasil dikirim!';">🔗</button>
        </div>
    `;
}
if (produkGrid) {
    produkGrid.innerHTML = produkList.map((p, i) => `
        <div class="produk-card">
            <img src="${p.gambar}" alt="${p.nama}">
            <h3>${p.nama}</h3>
            <p>${p.deskripsi}</p>
            <button onclick="showProdukDetail(${i})">Lihat Detail</button>
            ${produkShareBtns(i)}
        </div>
    `).join('');
}
// Modal produk
const modalHtml = `
    <div class="modal-content">
        <button class="close-modal" onclick="closeProdukModal()">&times;</button>
        <img id="modalImg" src="" alt="" style="width:100%;max-width:220px;height:150px;object-fit:cover;border-radius:8px;margin-bottom:14px;">
        <h3 id="modalNama"></h3>
        <p id="modalDetail"></p>
    </div>
`;
const produkModal = document.createElement('div');
produkModal.id = 'produkModal';
produkModal.innerHTML = modalHtml;
document.body.appendChild(produkModal);
window.showProdukDetail = function(idx) {
    const p = produkList[idx];
    document.getElementById('modalImg').src = p.gambar;
    document.getElementById('modalImg').alt = p.nama;
    document.getElementById('modalNama').textContent = p.nama;
    document.getElementById('modalDetail').textContent = p.detail;
    produkModal.style.display = 'flex';
};
window.closeProdukModal = function() {
    produkModal.style.display = 'none';
};
produkModal.addEventListener('click', function(e) {
    if (e.target === produkModal) closeProdukModal();
});

// Mode Fun/Easter Egg
const funModeBtn = document.getElementById('funModeBtn');
let funMode = false;
if (funModeBtn) {
    funModeBtn.addEventListener('click', () => {
        funMode = !funMode;
        document.body.classList.toggle('fun', funMode);
        notif.textContent = funMode ? 'Mode Fun Aktif! 🎉' : 'Mode Fun Nonaktif.';
        notif.style.display = 'block';
        setTimeout(() => notif.style.display = 'none', 1800);
        notif.textContent = 'Pesan berhasil dikirim!';
    });
    funModeBtn.addEventListener('mouseenter', () => funModeBtn.style.opacity = 1);
    funModeBtn.addEventListener('mouseleave', () => funModeBtn.style.opacity = 0.5);
}
// Maskot Interaktif
const mascot = document.getElementById('mascot');
const mascotChar = document.getElementById('mascotChar');
const mascotMsg = document.getElementById('mascotMsg');
const mascotQuotes = [
    'Halo, selamat datang! 👋',
    'Klik tombol 🎉 untuk mode seru!',
    'Jangan lupa cek produk terbaru!',
    'Punya pertanyaan? Kontak saja ya!',
    'Coba klik aku atau geser aku!',
    'Desain itu seni dan solusi!'
];
let mascotTimeout;
function showMascotMsg(msg) {
    mascotMsg.textContent = msg;
    mascotMsg.style.display = 'block';
    clearTimeout(mascotTimeout);
    mascotTimeout = setTimeout(() => mascotMsg.style.display = 'none', 2500);
}
if (mascotChar) {
    mascotChar.addEventListener('click', () => {
        const msg = mascotQuotes[Math.floor(Math.random()*mascotQuotes.length)];
        showMascotMsg(msg);
        mascotChar.textContent = ['🤖','😎','🤩','🦄','🐱‍👤'][Math.floor(Math.random()*5)];
    });
    mascotChar.addEventListener('mouseenter', () => showMascotMsg('Hai! Aku maskot interaktif!'));
    mascotChar.addEventListener('mouseleave', () => mascotMsg.style.display = 'none');
    mascotChar.addEventListener('mousedown', () => mascotChar.style.transform = 'scale(1.2)');
    mascotChar.addEventListener('mouseup', () => mascotChar.style.transform = 'scale(1)');
    mascotChar.addEventListener('touchstart', () => mascotChar.style.transform = 'scale(1.2)');
    mascotChar.addEventListener('touchend', () => mascotChar.style.transform = 'scale(1)');
}

// Generator Quotes/Motivasi
const quoteBtn = document.getElementById('quoteBtn');
const quoteBox = document.getElementById('quoteBox');
const sfxPop = document.getElementById('sfxPop');
const sfxSuccess = document.getElementById('sfxSuccess');
const quotes = [
    'Desain adalah seni memecahkan masalah dengan visual. 🎨',
    'Setiap karya adalah proses belajar. Jangan takut mencoba!',
    'Warna biru itu menenangkan, seperti portofolio ini! 💙',
    'Jadilah kreatif, bukan hanya mengikuti tren.',
    'Satu desain bisa mengubah persepsi banyak orang.',
    'Kreativitas adalah kecerdasan yang bersenang-senang. – Einstein',
    'Jangan lupa istirahat, inspirasi kadang datang saat santai!'
];
if (quoteBtn && quoteBox) {
    quoteBtn.addEventListener('click', () => {
        const q = quotes[Math.floor(Math.random()*quotes.length)];
        quoteBox.textContent = q;
        quoteBox.style.display = 'block';
        quoteBox.style.animation = 'fadeIn 0.5s';
        sfxPop && sfxPop.play();
        setTimeout(() => {
            quoteBox.style.animation = 'fadeOut 0.5s';
            setTimeout(() => quoteBox.style.display = 'none', 500);
        }, 3500);
    });
}
// Sound effect pada aksi tertentu
function playSuccess() { sfxSuccess && sfxSuccess.play(); }
if (copyEmail) copyEmail.addEventListener('click', playSuccess);
if (downloadCV) downloadCV.addEventListener('click', playSuccess);
if (printBtn) printBtn.addEventListener('click', playSuccess);
if (refreshGallery) refreshGallery.addEventListener('click', playSuccess);

// Mini Game: Tebak Warna
const gameBtn = document.getElementById('gameBtn');
const gameBox = document.getElementById('gameBox');
const warnaPilihan = [
    {nama:'Biru',hex:'#1976d2'},
    {nama:'Merah',hex:'#e53935'},
    {nama:'Kuning',hex:'#fbc02d'},
    {nama:'Hijau',hex:'#43a047'},
    {nama:'Ungu',hex:'#8e24aa'}
];
let warnaBenar = 0;
function mulaiGame() {
    warnaBenar = Math.floor(Math.random()*warnaPilihan.length);
    const warna = warnaPilihan[warnaBenar];
    gameBox.innerHTML = `<div style='font-size:1.1rem;margin-bottom:10px;'>Tebak nama warna ini:</div><div style='width:60px;height:60px;margin:0 auto 16px auto;border-radius:50%;background:${warna.hex};border:2px solid #1976d2;'></div>` +
        warnaPilihan.map((w,i)=>`<button class='gameColorBtn' data-i='${i}' style='margin:4px 6px 0 0;padding:7px 16px;border-radius:6px;border:none;background:#e3eaf5;color:#1976d2;font-weight:500;cursor:pointer;'>${w.nama}</button>`).join('')+
        `<div id='gameMsg' style='margin-top:12px;min-height:24px;'></div>`;
    gameBox.style.display = 'block';
    gameBox.style.animation = 'fadeIn 0.5s';
    document.querySelectorAll('.gameColorBtn').forEach(btn => {
        btn.onclick = function() {
            const idx = +this.getAttribute('data-i');
            if(idx === warnaBenar) {
                document.getElementById('gameMsg').innerHTML = 'Benar! 🎉';
                sfxSuccess && sfxSuccess.play();
                setTimeout(()=>{ gameBox.style.display='none'; }, 1500);
            } else {
                document.getElementById('gameMsg').innerHTML = 'Salah, coba lagi! 😅';
                sfxPop && sfxPop.play();
            }
        };
    });
}
if(gameBtn && gameBox) {
    gameBtn.addEventListener('click', () => {
        mulaiGame();
    });
}

// Testimoni Klien Slider
const testiSlider = document.querySelector('.testi-slider');
const testimoniList = [
    {nama:'Andi',isi:'Desainnya keren, pelayanan cepat dan ramah!'},
    {nama:'Siti',isi:'Sangat puas dengan hasil logo bisnis saya.'},
    {nama:'Budi',isi:'Template Instagram-nya bikin feed makin estetik.'},
    {nama:'Rina',isi:'Revisi cepat, hasil sesuai keinginan. Recommended!'}
];
let testiIdx = 0;
function renderTesti() {
    if (!testiSlider) return;
    testiSlider.innerHTML = `<button class='testi-arrow' id='testiPrev'>&lt;</button>`+
        `<div class='testi-card'>"${testimoniList[testiIdx].isi}"<div class='testi-name'>- ${testimoniList[testiIdx].nama}</div></div>`+
        `<button class='testi-arrow' id='testiNext'>&gt;</button>`;
    document.getElementById('testiPrev').onclick = () => { testiIdx = (testiIdx-1+testimoniList.length)%testimoniList.length; renderTesti(); };
    document.getElementById('testiNext').onclick = () => { testiIdx = (testiIdx+1)%testimoniList.length; renderTesti(); };
}
renderTesti();
// Progress Bar Scroll
let progressBar = document.getElementById('progressBar');
if (!progressBar) {
    progressBar = document.createElement('div');
    progressBar.id = 'progressBar';
    document.body.appendChild(progressBar);
}
window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const scrolled = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = scrolled + '%';
});

// Booking Jadwal
const bookingBtn = document.getElementById('bookingBtn');
const bookingModal = document.getElementById('bookingModal');
const bookingForm = document.getElementById('bookingForm');
const closeBooking = document.getElementById('closeBooking');
if(bookingBtn && bookingModal) {
    bookingBtn.onclick = () => bookingModal.style.display = 'flex';
}
if(closeBooking) closeBooking.onclick = () => bookingModal.style.display = 'none';
if(bookingModal) bookingModal.addEventListener('click',e=>{if(e.target===bookingModal) bookingModal.style.display='none';});
if(bookingForm) bookingForm.onsubmit = function(e) {
    e.preventDefault();
    bookingModal.style.display = 'none';
    notif.textContent = 'Booking jadwal berhasil! Kami akan menghubungi Anda.';
    notif.style.display = 'block';
    setTimeout(()=>notif.style.display='none',2500);
    notif.textContent = 'Pesan berhasil dikirim!';
    bookingForm.reset();
};
