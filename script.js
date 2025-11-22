document.addEventListener('DOMContentLoaded', () => {

    // --- Initialize Lenis Smooth Scroll ---
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Custom easing function
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        mouseMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // --- Navbar Animation ---
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('floating');
        } else {
            navbar.classList.remove('floating');
        }
    });

    // --- Intersection Observer for Animations ---
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-active');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('[data-animate]');
    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // --- Smooth Scroll for Anchor Links (Updated for Lenis) ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                lenis.scrollTo(target); // Use Lenis for scrolling
            }
        });
    });

    // --- Mobile Menu Toggle ---
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
            if (navLinks.style.display === 'flex') {
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '100%';
                navLinks.style.left = '0';
                navLinks.style.width = '100%';
                navLinks.style.background = 'rgba(26, 47, 37, 0.98)';
                navLinks.style.padding = '20px';
                navLinks.style.borderRadius = '0 0 20px 20px';
            }
        });
    }

    // --- Flying Bird Animation ---
    function createBird() {
        const bird = document.createElement('div');
        bird.classList.add('flying-bird');
        bird.innerHTML = '<i class="fas fa-dove"></i>';
        bird.style.top = (Math.random() * 30 + 10) + '%';
        bird.style.animationDuration = (Math.random() * 10 + 15) + 's';
        bird.style.fontSize = (Math.random() * 1 + 1.5) + 'rem';
        document.body.appendChild(bird);

        setTimeout(() => {
            bird.remove();
        }, 25000);
    }

    setInterval(createBird, 8000);
    createBird();

    // --- Lightbox Functionality ---
    const lightbox = document.createElement('div');
    lightbox.classList.add('lightbox');
    lightbox.innerHTML = `
        <span class="lightbox-close">×</span>
        <img src="" alt="Lightbox Image">
    `;
    document.body.appendChild(lightbox);

    const galleryItems = document.querySelectorAll('.gallery-item img');
    const lightboxImg = lightbox.querySelector('img');
    const lightboxClose = lightbox.querySelector('.lightbox-close');

    galleryItems.forEach(img => {
        img.addEventListener('click', () => {
            lightboxImg.src = img.src;
            lightbox.classList.add('active');
            lenis.stop(); // Stop scrolling when lightbox is open
        });
    });

    lightboxClose.addEventListener('click', () => {
        lightbox.classList.remove('active');
        lenis.start(); // Resume scrolling
    });

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.classList.remove('active');
            lenis.start();
        }
    });

    // --- Visitor Counter API Logic (RESET) ---
    const countElement = document.getElementById('visitor-count');

    // CHANGED NAMESPACE TO RESET COUNT
    const namespace = 'menarwings-reset-v2025';
    const key = 'visits';

    fetch(`https://api.countapi.xyz/hit/${namespace}/${key}`)
        .then(res => res.json())
        .then(res => {
            countElement.innerText = res.value;
        })
        .catch(() => {
            // API might be down, show a fallback
            countElement.innerText = "1";
        });
});
