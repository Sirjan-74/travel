gsap.registerPlugin(ScrollTrigger);

// --- HERO PARALLAX JS ---
gsap.to(".parallax-bg-hero-main", {
    yPercent: -15,
    ease: "none",
    scrollTrigger: {
        trigger: "#hero",
        start: "top top",
        end: "bottom top",
        scrub: true
    }
});

gsap.to(".hero-layer-mid", {
    yPercent: 10,
    ease: "none",
    scrollTrigger: {
        trigger: "#hero",
        start: "top top",
        end: "bottom top",
        scrub: true
    }
});

gsap.to(".hero-layer-front", {
    yPercent: 30,
    ease: "none",
    scrollTrigger: {
        trigger: "#hero",
        start: "top top",
        end: "bottom top",
        scrub: true
    }
});

gsap.to(".hero-center-content", {
    y: 50,
    ease: "none",
    scrollTrigger: {
        trigger: "#hero",
        start: "top top",
        end: "bottom top",
        scrub: true
    }
});

// --- SMOOTH SCROLL ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80, // Adjust for fixed header
                behavior: 'smooth'
            });
        }
    });
});

// --- SPARKLE GENERATOR (for buttons, etc.) ---
const sparkleContainer = document.createElement('div');
sparkleContainer.id = 'sparkle-container';
document.body.appendChild(sparkleContainer);

function createSparkle(x, y) {
    if (!sparkleContainer) return;
    const sparkle = document.createElement('div');
    sparkle.classList.add('sparkle-particle');
    sparkle.innerHTML = '✨';
    sparkle.style.position = 'fixed';
    sparkle.style.top = `${y}px`;
    sparkle.style.left = `${x}px`;
    sparkle.style.fontSize = `${Math.random() * 20 + 10}px`;
    sparkle.style.opacity = Math.random();
    sparkle.style.pointerEvents = 'none';
    sparkle.style.zIndex = '9999';
    sparkle.style.filter = 'drop-shadow(0 0 5px rgba(255, 255, 255, 0.7))';

    sparkleContainer.appendChild(sparkle);

    gsap.to(sparkle, {
        y: y - (Math.random() * 100 + 50),
        x: x + (Math.random() * 80 - 40),
        opacity: 0,
        scale: 0.5,
        duration: Math.random() * 3 + 2,
        ease: "power1.out",
        onComplete: () => sparkle.remove()
    });
}

function initSparkles() {
    document.addEventListener('click', e => {
        if (e.target.closest('.sparkle-hover, .hero-adventure-button, .logo, .contact-submit-btn, .sparkle')) {
            for (let i = 0; i < 3; i++) {
                setTimeout(() => {
                    createSparkle(
                        e.clientX + Math.random() * 30 - 15,
                        e.clientY + Math.random() * 30 - 15
                    );
                }, i * 50);
            }
        }
    });

    setInterval(() => {
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight * 0.8;
        createDot(); // Uses dot creation for ambient
    }, 5000);
}

// --- MOUSE-TRACKING 3D TILT ON NEWS ITEMS ---
function initNewsItemTilt() {
    const newsItems = document.querySelectorAll('.news-item');

    newsItems.forEach(item => {
        item.addEventListener('mousemove', e => {
            const rect = item.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateY = ((x - centerX) / centerX) * -8;
            const rotateX = ((y - centerY) / centerY) * 8;

            item.style.transform = `perspective(1000px) translateY(-12px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
        });

        item.addEventListener('mouseleave', () => {
            item.style.transform = `perspective(1000px) translateY(0px) rotateX(0deg) rotateY(0deg) scale(1)`;
        });
    });
}


// --- GLOBAL LOAD AND SCROLL EVENTS ---
window.addEventListener('load', () => {
    initSparkles(); // Initialize the sparkle effect
    initNewsItemTilt(); // Initialize the news item tilt effect
    
    const header = document.getElementById('main-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.background = 'rgba(0,0,0,0.8)';
            header.style.boxShadow = '0 4px 10px rgba(0,0,0,0.3)'; // Add shadow on scroll
        } else {
            header.style.background = 'rgba(0,0,0,0.3)';
            header.style.boxShadow = 'none';
        }
    });
});


// --- HAMBURGER MENU TOGGLE ---
const hamburger = document.getElementById('hamburger-menu');
const mainNav = document.querySelector('.main-nav');

if (hamburger && mainNav) { // Ensure elements exist
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        mainNav.classList.toggle('active');
    });

    // Close nav when a link is clicked (for single-page navigation)
    mainNav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (mainNav.classList.contains('active')) {
                hamburger.classList.remove('active');
                mainNav.classList.remove('active');
            }
        });
    });
}

// --- DOTS BACKGROUND GENERATOR ---
const dotsBg = document.getElementById('dots-bg');
if (dotsBg) {
    function createDot() {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        dot.style.width = dot.style.height = `${Math.random() * 10 + 5}px`;
        dot.style.left = `${Math.random() * 100}%`;
        dot.style.animationDuration = `${Math.random() * 10 + 5}s`;
        dot.style.animationDelay = `${Math.random() * 5}s`;
        dotsBg.appendChild(dot);

        dot.addEventListener('animationend', () => dot.remove());
    }

    // Generate a few dots initially
    for (let i = 0; i < 20; i++) {
        createDot();
    }

    // Continuously generate dots
    setInterval(createDot, 1000);
}