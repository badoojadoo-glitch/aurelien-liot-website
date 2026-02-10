document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links a');

    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');

            // Stagger animation for links
            if (navLinks.classList.contains('active')) {
                gsap.fromTo(links,
                    { opacity: 0, y: -20 },
                    { opacity: 1, y: 0, stagger: 0.1, duration: 0.4, ease: "power2.out" }
                );
            }
        });
    }

    // 2. Header Scroll Effect (Glassmorphism optimization)
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.boxShadow = "0 4px 20px rgba(0,0,0,0.1)";
            header.style.padding = "10px 0";
        } else {
            header.style.boxShadow = "none";
            header.style.padding = "var(--space-4) 0";
        }
    });

    // 3. Register ScrollTrigger if available
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
    }

    // 4. Hero Animations
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    if (document.querySelector('.hero')) {
        tl.from(".hero h1", { y: 60, opacity: 0, duration: 1.2 })
            .from(".hero p", { y: 30, opacity: 0, duration: 1 }, "-=0.8")
            .from(".hero .btn", { y: 20, opacity: 0, duration: 0.8 }, "-=0.6");
    }

    // 5. Scroll Animations for Cards and Sections
    const revealElements = document.querySelectorAll(".card, .section-title, .grid-3 > div");

    revealElements.forEach(el => {
        if (typeof ScrollTrigger !== 'undefined') {
            gsap.from(el, {
                scrollTrigger: {
                    trigger: el,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                },
                y: 50,
                opacity: 0,
                duration: 1,
                ease: "power3.out"
            });
        } else {
            // Fallback if ScrollTrigger is missing
            gsap.to(el, { opacity: 1, y: 0, duration: 1, delay: 0.2 });
        }
    });

    // Form Input Animation
    const inputs = document.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            gsap.to(input, { scale: 1.02, duration: 0.3 });
        });
        input.addEventListener('blur', () => {
            gsap.to(input, { scale: 1, duration: 0.3 });
        });
    });
});
