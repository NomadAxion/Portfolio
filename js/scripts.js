document.addEventListener('DOMContentLoaded', () => {
    // Mobile navigation toggle
    const navToggle = document.querySelector('.nav-toggle');
    const mainNav = document.getElementById('mainNav');

    if (navToggle && mainNav) {
        navToggle.addEventListener('click', () => {
            const isExpanded = navToggle.getAttribute('aria-expanded') === 'true' || false;
            navToggle.setAttribute('aria-expanded', !isExpanded);
            mainNav.classList.toggle('open');
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // --- New Feature: Scroll-to-top button ---
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollToTopBtn.classList.add('scroll-to-top');
    document.body.appendChild(scrollToTopBtn);

    const toggleScrollToTopVisibility = () => {
        if (window.scrollY > 300) { // Show button after scrolling 300px
            scrollToTopBtn.classList.add('show');
        } else {
            scrollToTopBtn.classList.remove('show');
        }
    };

    window.addEventListener('scroll', toggleScrollToTopVisibility);

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Initially check visibility on load
    toggleScrollToTopVisibility();
});