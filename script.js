/* ========================================
   MS Net Centre - Enhanced JavaScript
   ======================================== */

// Preloader with percentage counter
(function() {
    const progress = document.querySelector('.loader-progress');
    const percentEl = document.querySelector('.loader-percent');
    const preloader = document.getElementById('preloader');
    let loaded = 0;
    
    const interval = setInterval(() => {
        loaded += Math.random() * 8 + 2;
        if (loaded >= 100) {
            loaded = 100;
            clearInterval(interval);
            setTimeout(() => {
                preloader.classList.add('hidden');
            }, 400);
        }
        progress.style.width = loaded + '%';
        if (percentEl) percentEl.textContent = Math.floor(loaded) + '%';
    }, 80);
    
    // Fallback: force hide after 3s
    setTimeout(() => {
        clearInterval(interval);
        if (progress) progress.style.width = '100%';
        if (percentEl) percentEl.textContent = '100%';
        setTimeout(() => preloader.classList.add('hidden'), 300);
    }, 3000);
})();

// Navbar Scroll Effect
const navbar = document.getElementById('navbar');
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    
    if (scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    if (backToTop && scrollY > 400) {
        backToTop.classList.add('visible');
    } else if (backToTop) {
        backToTop.classList.remove('visible');
    }
});

// Mobile Navigation
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    navToggle.classList.toggle('active');
});

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Active link on scroll
const sections = document.querySelectorAll('section[id]');

function setActiveLink() {
    const scrollY = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + sectionId) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', setActiveLink);

// Counter Animation
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2000;
        const startTime = performance.now();
        
        function easeOutCubic(t) {
            return 1 - Math.pow(1 - t, 3);
        }
        
        function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easedProgress = easeOutCubic(progress);
            
            counter.textContent = Math.floor(easedProgress * target);
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        }
        
        requestAnimationFrame(updateCounter);
    });
}

// Intersection Observer for counter animation
const heroSection = document.querySelector('.hero');
let counterAnimated = false;

if (heroSection) {
    const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !counterAnimated) {
                counterAnimated = true;
                setTimeout(animateCounters, 500);
            }
        });
    }, { threshold: 0.3 });
    
    heroObserver.observe(heroSection);
}

// Particle Effect - Enhanced
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;
    
    const particleCount = 35;
    const colors = [
        'rgba(129, 140, 248, 0.3)',
        'rgba(249, 115, 22, 0.2)',
        'rgba(6, 182, 212, 0.25)',
        'rgba(255, 255, 255, 0.15)'
    ];
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        const size = Math.random() * 5 + 2;
        const left = Math.random() * 100;
        const delay = Math.random() * 12;
        const duration = Math.random() * 12 + 10;
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        particle.style.cssText = 
            'width:' + size + 'px;' +
            'height:' + size + 'px;' +
            'left:' + left + '%;' +
            'animation-delay:' + delay + 's;' +
            'animation-duration:' + duration + 's;' +
            'background:' + color + ';';
        
        particlesContainer.appendChild(particle);
    }
}

createParticles();

// Scroll Reveal Animation - Improved
function revealOnScroll() {
    const elements = document.querySelectorAll(
        '.service-card, .esevai-card, .pricing-card, .why-card, .testimonial-card, .contact-card, .about-content, .image-frame'
    );
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
    
    elements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.7s cubic-bezier(0.4, 0, 0.2, 1) ' + (index % 6) * 0.08 + 's, transform 0.7s cubic-bezier(0.4, 0, 0.2, 1) ' + (index % 6) * 0.08 + 's';
        observer.observe(element);
    });
}

revealOnScroll();

// Section header reveal animation
function revealSectionHeaders() {
    const headers = document.querySelectorAll('.section-header');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    headers.forEach(header => {
        header.style.opacity = '0';
        header.style.transform = 'translateY(25px)';
        header.style.transition = 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(header);
    });
}

revealSectionHeaders();

// Contact Form
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        const email = document.getElementById('email').value;
        const service = document.getElementById('service').value;
        const message = document.getElementById('message').value;
        
        const whatsappMessage = encodeURIComponent(
            ' *New Enquiry - MS Net Centre*\n\n' +
            ' *Name:* ' + name + '\n' +
            ' *Phone:* ' + phone + '\n' +
            ' *Email:* ' + (email || 'Not provided') + '\n' +
            ' *Service:* ' + service + '\n' +
            ' *Message:* ' + message
        );
        
        contactForm.innerHTML = 
            '<div class="form-success">' +
                '<i class="fas fa-check-circle"></i>' +
                '<h3>Thank You, ' + name + '!</h3>' +
                '<p>Your message has been received. We will contact you shortly.</p>' +
                '<p style="margin-top: 10px; font-size: 13px; color: #64748B;">You can also reach us directly on WhatsApp for instant response.</p>' +
            '</div>';
        
        contactForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
}

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// 3D tilt effect on service cards
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 25;
        const rotateY = (centerX - x) / 25;
        
        card.style.transform = 'perspective(1000px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) translateY(-8px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// Dynamic year in footer
const yearSpan = document.querySelector('.footer-bottom p');
if (yearSpan) {
    const currentYear = new Date().getFullYear();
    yearSpan.innerHTML = yearSpan.innerHTML.replace('2026', currentYear);
}

console.log(' MS Net Centre - Premium Website Loaded');
console.log(' Nochimedu, Manjampatti, Manapparai, Trichy');
