document.addEventListener('DOMContentLoaded', () => {
    // Mobile navigation toggle with improved accessibility and behavior
    const navToggle = document.querySelector('.nav-toggle');
    const mainNav = document.getElementById('mainNav');

    const openNav = () => {
        if (!navToggle || !mainNav) return;
        navToggle.setAttribute('aria-expanded', 'true');
        mainNav.classList.add('open');
        document.body.classList.add('nav-open');
    };

    const closeNav = () => {
        if (!navToggle || !mainNav) return;
        navToggle.setAttribute('aria-expanded', 'false');
        mainNav.classList.remove('open');
        document.body.classList.remove('nav-open');
    };

    if (navToggle && mainNav) {
        navToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
            if (isExpanded) closeNav(); else openNav();
        });

        // Close the mobile nav when a nav link is clicked
        mainNav.addEventListener('click', (e) => {
            const link = e.target.closest('.nav__link');
            if (link) {
                // close on link click for mobile
                if (window.innerWidth <= 780) closeNav();
            }
        });

        // Close on clicking outside
        document.addEventListener('click', (e) => {
            if (!mainNav.contains(e.target) && !navToggle.contains(e.target) && mainNav.classList.contains('open')) {
                closeNav();
            }
        });

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && mainNav.classList.contains('open')) {
                closeNav();
            }
        });

        // Ensure clean state on resize
        window.addEventListener('resize', () => {
            if (window.innerWidth > 780) {
                closeNav();
            }
        });
    }

    // Smooth scrolling for internal anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = this.getAttribute('href');
            if (!target || target === '#') return;
            const el = document.querySelector(target);
            if (!el) return; // do nothing if target not found
            e.preventDefault();
            el.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // --- Scroll-to-top button ---
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up" aria-hidden="true"></i>';
    scrollToTopBtn.classList.add('scroll-to-top');
    scrollToTopBtn.setAttribute('aria-label', 'Scroll to top');
    document.body.appendChild(scrollToTopBtn);

    const toggleScrollToTopVisibility = () => {
        if (window.scrollY > 300) {
            scrollToTopBtn.classList.add('show');
        } else {
            scrollToTopBtn.classList.remove('show');
        }
    };

    window.addEventListener('scroll', toggleScrollToTopVisibility);

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Initially check visibility on load
    toggleScrollToTopVisibility();

    // --- Project tile micro-interactions (hover reveal, keyboard focus states) ---
    const projectTiles = document.querySelectorAll('.project-tile');
    projectTiles.forEach(tile => {
        // when mouse enters, add hovered class for CSS transitions
        tile.addEventListener('mouseenter', () => tile.classList.add('hovered'));
        tile.addEventListener('mouseleave', () => tile.classList.remove('hovered'));

        // focusin/focusout (keyboard) — focus within will bubble to the tile
        tile.addEventListener('focusin', () => tile.classList.add('hovered'));
        tile.addEventListener('focusout', () => tile.classList.remove('hovered'));

        // support Space/Enter to activate the primary link when tile is focused
        tile.addEventListener('keydown', (e) => {
            if (e.key === ' ' || e.key === 'Enter') {
                const link = tile.querySelector('.tile-link');
                if (link) {
                    e.preventDefault();
                    link.click();
                }
            }
        });
    });

    // --- Modules list collapse/expand toggle on About page ---
    (function setupModulesToggle(){
        const wrapper = document.getElementById('moduleWrapper');
        const toggle = document.getElementById('toggleModules');
        const list = document.getElementById('codecademyList');
        if (!wrapper || !toggle || !list) return;

        const setExpanded = (expanded) => {
            if (expanded) {
                wrapper.classList.remove('collapsed');
                wrapper.classList.add('expanded');
                toggle.setAttribute('aria-expanded', 'true');
                toggle.textContent = 'Collapse modules';
            } else {
                wrapper.classList.add('collapsed');
                wrapper.classList.remove('expanded');
                toggle.setAttribute('aria-expanded', 'false');
                toggle.textContent = 'Show full modules';
                // scroll the list into view so the user doesn't get lost
                wrapper.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        };

    // initial state: expanded so module text is fully visible by default
    setExpanded(true);

        toggle.addEventListener('click', () => setExpanded(!wrapper.classList.contains('expanded')));
        toggle.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setExpanded(!wrapper.classList.contains('expanded'));
            }
        });
    })();
    // Inject overlay CTA into each project tile's tile-media element
    projectTiles.forEach(tile => {
        const media = tile.querySelector('.tile-media');
        const titleEl = tile.querySelector('.tile-body h3');
        const link = tile.querySelector('.tile-link');
        if (!media || !titleEl || !link) return;

        // Create overlay wrapper
        const overlay = document.createElement('div');
        overlay.className = 'tile-overlay';

        const overlayTitle = document.createElement('div');
        overlayTitle.className = 'overlay-title';
        // use the visible text content of the h3 (strip child icons)
        overlayTitle.textContent = titleEl.textContent.trim();

        const cta = document.createElement('a');
        cta.className = 'overlay-cta';
        cta.setAttribute('href', link.getAttribute('href') || '#');
        cta.setAttribute('aria-label', 'Open project');
        cta.textContent = 'Open';

        overlay.appendChild(overlayTitle);
        overlay.appendChild(cta);

        // Append overlay to media
        media.style.position = 'relative';
        media.appendChild(overlay);

        // Allow keyboard activation of overlay CTA when tile is focused
        tile.addEventListener('keydown', (e) => {
            if ((e.key === 'Enter' || e.key === ' ') && tile.contains(document.activeElement)) {
                e.preventDefault();
                cta.click();
            }
        });
    });
});
