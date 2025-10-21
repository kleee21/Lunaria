// File script.js tidak perlu diubah karena class dan ID HTML sudah disesuaikan
// dengan logika JavaScript yang sudah ada (Navbar, Scroll Reveal).
// Pastikan file ini tersimpan sebagai `js/script.js`.

document.addEventListener('DOMContentLoaded', () => {
    const loadingScreen = document.getElementById('loading-screen');
    const mainHeader = document.getElementById('main-header');
    const festMusic = document.getElementById('fest-music');
    let hasPlayedMusic = false;

    // --- 1. LOGIKA LOADING SCREEN ---
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
    }, 2000); 

    // --- 2. LOGIKA AUTOPLAY MUSIK FESTIVAL ---
    const playMusic = () => {
        if (festMusic && festMusic.paused && !hasPlayedMusic) {
            festMusic.volume = 0.4; 
            const playPromise = festMusic.play();
            
            if (playPromise !== undefined) {
                playPromise.then(_ => {
                    hasPlayedMusic = true;
                    console.log("Musik LUNARIA mulai diputar!");
                }).catch(error => {
                    console.log("Musik tidak bisa diputar otomatis, perlu interaksi lebih lanjut.");
                });
            }
        }
    };

    document.body.addEventListener('click', playMusic, { once: true });
    document.body.addEventListener('keypress', playMusic, { once: true });


    // --- 3. LOGIKA NAVBAR SCROLL EFFECT (TAILWIND) ---
    const handleScrollNavbar = () => {
        const scrollPosition = window.scrollY; 
        const triggerHeight = 100; 

        // Kelas Awal (Custom Gradien)
        const initialClass = 'navbar-initial-gradient';
        
        // Kelas Scroll (Transparan & Blur menggunakan Tailwind)
        const scrolledClasses = ['bg-black/20', 'backdrop-blur-md', 'shadow-xl']; 

        if (scrollPosition > triggerHeight) {
            mainHeader.classList.remove(initialClass);
            mainHeader.classList.add(...scrolledClasses);
        } else {
            mainHeader.classList.remove(...scrolledClasses);
            mainHeader.classList.add(initialClass);
        }
    };

    window.addEventListener('scroll', handleScrollNavbar);
    handleScrollNavbar(); 


    // --- 4. LOGIKA ANIMASI SAAT SCROLL (SCROLL-REVEAL) ---
    const elementsToAnimate = document.querySelectorAll('.element-to-animate');

    const animateOnScroll = () => {
        elementsToAnimate.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const viewportHeight = window.innerHeight;

            if (elementTop < viewportHeight * 0.8) {
                element.classList.add('is-visible');
            } else {
                element.classList.remove('is-visible'); 
            }
        });
    };

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll();

    // Add particle effect to background
    createParticles();
});

// --- 5. PARTICLE EFFECT FUNCTION ---
function createParticles() {
    const particleContainer = document.createElement('div');
    particleContainer.id = 'particle-container';
    particleContainer.style.position = 'fixed';
    particleContainer.style.top = '0';
    particleContainer.style.left = '0';
    particleContainer.style.width = '100%';
    particleContainer.style.height = '100%';
    particleContainer.style.pointerEvents = 'none';
    particleContainer.style.zIndex = '1';
    document.body.appendChild(particleContainer);

    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.position = 'absolute';
        particle.style.width = Math.random() * 4 + 2 + 'px';
        particle.style.height = particle.style.width;
        // Menggunakan skema warna baru: Emas, Perak, Ungu
        particle.style.backgroundColor = ['#FFD700', '#C0C0C0', '#8A2BE2'][Math.floor(Math.random() * 3)];
        particle.style.borderRadius = '50%';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.opacity = Math.random() * 0.5 + 0.1;
        particle.style.animation = `starTwinkle ${Math.random() * 3 + 2}s ease-in-out infinite`;
        particle.style.animationDelay = Math.random() * 2 + 's';
        particleContainer.appendChild(particle);
    }
}