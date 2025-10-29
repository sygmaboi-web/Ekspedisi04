// Menunggu sampai semua konten HTML dimuat
document.addEventListener('DOMContentLoaded', function() {
    
    // --- 1. LOGIKA UNTUK PINDAH HALAMAN (FADE TRANSITION) ---
    
    const navLinks = document.querySelectorAll('nav ul li a');
    const pages = document.querySelectorAll('.page-section');

    function showPage(pageId) {
        pages.forEach(page => {
            page.classList.remove('active');
        });
        
        const targetPage = document.getElementById(pageId);
        if (targetPage) {
            targetPage.classList.add('active');
        }
        
        window.scrollTo(0, 0); 
    }

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            showPage(targetId);
            window.location.hash = targetId;
        });
    });

    if (window.location.hash) {
        const hashId = window.location.hash.substring(1);
        if (document.getElementById(hashId)) {
            showPage(hashId);
        } else {
            showPage('beranda');
        }
    } else {
        showPage('beranda'); 
    }

    
    // --- 2. LOGIKA BARU UNTUK MODAL (POP-UP) PROFIL ---
    
    const modalOverlay = document.getElementById('profilModal');
    const modalContent = document.querySelector('.modal-content');
    const modalCloseBtn = document.getElementById('modalCloseBtn');
    const profilTriggers = document.querySelectorAll('.profil-trigger');

    // Ambil elemen di dalam modal
    const modalFoto = document.getElementById('modalFoto');
    const modalNama = document.getElementById('modalNama');
    const modalPeran = document.getElementById('modalPeran');
    const modalSekolah = document.getElementById('modalSekolah');
    
    // == AMBIL ELEMEN TELEPON YANG BARU ==
    const modalTelpFasilitator = document.getElementById('modalTelpFasilitator');
    const modalTelpAyah = document.getElementById('modalTelpAyah');
    const modalTelpIbu = document.getElementById('modalTelpIbu');

    // Loop setiap kartu profil dan tambahkan event listener
    profilTriggers.forEach(card => {
        card.addEventListener('click', function() {
            // 1. Ambil data dari 'data-' attributes
            const nama = this.dataset.nama;
            const foto = this.dataset.foto;
            const peran = this.dataset.peran;
            const sekolah = this.dataset.sekolah;
            
            // == AMBIL DATA TELEPON YANG BARU ==
            const telpFasilitator = this.dataset.telpFasilitator;
            const telpAyah = this.dataset.telpAyah;
            const telpIbu = this.dataset.telpIbu;

            // 2. Masukkan data ke dalam modal
            modalFoto.src = foto;
            modalNama.textContent = nama;
            modalPeran.textContent = peran;
            modalSekolah.textContent = "Asal Sekolah: " + sekolah;

            // == MASUKKAN DATA TELEPON YANG BARU ==
            modalTelpFasilitator.textContent = "No. Fasilitator: " + telpFasilitator;
            modalTelpAyah.textContent = "No. Telp Ayah: " + telpAyah;
            modalTelpIbu.textContent = "No. Telp Ibu: " + telpIbu;

            // 3. Tampilkan modal dengan transisi
            modalOverlay.style.display = 'flex'; 
            setTimeout(() => { 
                modalOverlay.style.opacity = '1';
                modalContent.style.transform = 'scale(1)'; 
            }, 10);
        });
    });

    // Fungsi untuk menutup modal
    function closeModal() {
        modalOverlay.style.opacity = '0';
        modalContent.style.transform = 'scale(0.9)';
        
        setTimeout(() => { 
            modalOverlay.style.display = 'none';
        }, 300); // Sesuai durasi transisi di CSS
    }

    // Tambahkan event listener untuk tombol close
    modalCloseBtn.addEventListener('click', closeModal);
    
    // Tutup modal jika klik di luar (di overlay-nya)
    modalOverlay.addEventListener('click', function(e) {
        if (e.target === modalOverlay) {
            closeModal();
        }
    });

});
