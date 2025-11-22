document.addEventListener('DOMContentLoaded', () => {
    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(26, 47, 37, 0.98)';
            navbar.style.padding = '10px 0';
        } else {
            navbar.style.background = 'rgba(26, 47, 37, 0.95)';
            navbar.style.padding = '15px 0';
        }
    });

    // Intersection Observer for Animations
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

    // Smooth Scroll for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Mobile Menu Toggle (Simple)
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
            }
        });
    }

    // Flying Bird Animation
    function createBird() {
        const bird = document.createElement('div');
        bird.classList.add('flying-bird');
        bird.innerHTML = '<i class="fas fa-dove"></i>';
        bird.style.top = (Math.random() * 30 + 10) + '%'; // Top 10-40%
        bird.style.animationDuration = (Math.random() * 10 + 15) + 's'; // 15-25s duration
        bird.style.fontSize = (Math.random() * 1 + 1.5) + 'rem'; // Random size
        document.body.appendChild(bird);

        // Remove bird after animation
        setTimeout(() => {
            bird.remove();
        }, 25000);
    }

    // Create a bird every 8 seconds
    setInterval(createBird, 8000);
    createBird(); // Create one immediately

    // Lightbox Functionality
    const lightbox = document.createElement('div');
    lightbox.classList.add('lightbox');
    lightbox.innerHTML = `
        <span class="lightbox-close">&times;</span>
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
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        });
    });

    lightboxClose.addEventListener('click', () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    });

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
});