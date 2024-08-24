document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Testimonial Carousel
    const carousel = document.querySelector('.testimonial-carousel');
    if (carousel) {
        let isDown = false;
        let startX;
        let scrollLeft;

        carousel.addEventListener('mousedown', (e) => {
            isDown = true;
            startX = e.pageX - carousel.offsetLeft;
            scrollLeft = carousel.scrollLeft;
        });

        carousel.addEventListener('mouseleave', () => {
            isDown = false;
        });

        carousel.addEventListener('mouseup', () => {
            isDown = false;
        });

        carousel.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - carousel.offsetLeft;
            const walk = (x - startX) * 2;
            carousel.scrollLeft = scrollLeft - walk;
        });

        // Auto-scroll testimonials
        let scrollAmount = 0;
        const step = 1;
        const scrollSpeed = 50;

        const autoScroll = () => {
            carousel.scrollTo({
                top: 0,
                left: scrollAmount,
                behavior: 'smooth'
            });
            scrollAmount += step;
            if (scrollAmount >= carousel.scrollWidth - carousel.clientWidth) {
                scrollAmount = 0;
            }
        };

        let scrollInterval = setInterval(autoScroll, scrollSpeed);

        carousel.addEventListener('mouseenter', () => {
            clearInterval(scrollInterval);
        });

        carousel.addEventListener('mouseleave', () => {
            scrollInterval = setInterval(autoScroll, scrollSpeed);
        });
    }

    // Intersection Observer for fade-in animations
    const faders = document.querySelectorAll('.fade-in');
    const appearOptions = {
        threshold: 0.5,
        rootMargin: "0px 0px -100px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('appear');
                appearOnScroll.unobserve(entry.target);
            }
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });

    // Window Component Functionality
    const windowComponent = document.querySelector('.window-component');
    if (windowComponent) {
        const minimizeBtn = windowComponent.querySelector('.minimize-btn');
        const maximizeBtn = windowComponent.querySelector('.maximize-btn');
        const closeBtn = windowComponent.querySelector('.close-btn');
        const windowContent = windowComponent.querySelector('.window-content');

        minimizeBtn.addEventListener('click', () => {
            windowContent.style.display = windowContent.style.display === 'none' ? 'block' : 'none';
        });

        maximizeBtn.addEventListener('click', () => {
            windowComponent.classList.toggle('maximized');
        });

        closeBtn.addEventListener('click', () => {
            windowComponent.style.display = 'none';
        });
    }

    // Mobile Navigation Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('nav ul');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('show');
        });
    }
});