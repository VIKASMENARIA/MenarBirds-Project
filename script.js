document.addEventListener('DOMContentLoaded', () => {

    // 1. Feather Icons Replacement
    // ---------------------------------
    feather.replace();

    // 2. Mobile Navigation Toggle
    // ---------------------------------
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.querySelector('.nav__menu');
    const navLinks = document.querySelectorAll('.nav__link');

    // Function to toggle the menu
    const toggleMenu = () => {
        navMenu.classList.toggle('nav__menu--open');
        // Change icon to 'x' when menu is open
        if (navMenu.classList.contains('nav__menu--open')) {
            navToggle.innerHTML = '<i data-feather="x"></i>';
        } else {
            navToggle.innerHTML = '<i data-feather="menu"></i>';
        }
        feather.replace(); // Re-run feather to draw the new icon
    };

    // Open/close menu on toggle click
    navToggle.addEventListener('click', toggleMenu);

    // Close menu when a nav link is clicked (good for single-page apps)
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('nav__menu--open')) {
                toggleMenu();
            }
        });
    });

    // 3. Sticky Header on Scroll
    // ---------------------------------
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('header--scrolled');
        } else {
            header.classList.remove('header--scrolled');
        }
    });

    // 4. Fade-in Animations on Scroll (Intersection Observer)
    // ---------------------------------
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    // Create the observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // If the element is in the viewport
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, {
        threshold: 0.1 // Trigger when 10% of the element is visible
    });

    // Observe each animated element
    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // 5. Update Footer Year
    // ---------------------------------
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});