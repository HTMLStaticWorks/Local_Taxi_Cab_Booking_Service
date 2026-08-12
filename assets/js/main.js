document.addEventListener('DOMContentLoaded', () => {
    // Safe navbar reference (may not exist on auth pages)
    const navbar = document.querySelector('.navbar');

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }

        // Scroll to top button visibility
        const scrollTopBtn = document.getElementById('scrollTop');
        if (scrollTopBtn) {
            if (window.scrollY > 300) {
                scrollTopBtn.style.display = 'flex';
            } else {
                scrollTopBtn.style.display = 'none';
            }
        }
    });

    // Theme toggle (moon <-> sun icon)
    const themeToggles = document.querySelectorAll('.js-theme-toggle');
    themeToggles.forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            e.preventDefault();
            document.body.classList.toggle('dark-mode');

            const icon = toggle.querySelector('i');
            if (icon) {
                if (document.body.classList.contains('dark-mode')) {
                    icon.classList.remove('ph-moon');
                    icon.classList.add('ph-sun');
                } else {
                    icon.classList.remove('ph-sun');
                    icon.classList.add('ph-moon');
                }
            }
        });
    });

    // RTL toggle - toggles html dir attribute between ltr and rtl
    const rtlToggles = document.querySelectorAll('.js-rtl-toggle');
    rtlToggles.forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            e.preventDefault();
            const html = document.documentElement;
            if (html.getAttribute('dir') === 'rtl') {
                html.setAttribute('dir', 'ltr');
                toggle.style.color = '';
            } else {
                html.setAttribute('dir', 'rtl');
                toggle.style.color = 'var(--primary-accent)';
            }
        });
    });

    // Intersection Observer for fade-up animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.card, .split-content').forEach(el => {
        el.style.opacity = 0.8;
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });
});
