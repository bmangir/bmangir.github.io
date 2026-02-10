// ========================================
// Portfolio - Main JavaScript
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    initializeNavigation();
    initializeAnimations();
    initializeContactForm();
    initializeMobileMenu();
});

// Navigation & Tab Switching
function initializeNavigation() {
    const navTabs = document.querySelectorAll('.nav-tab');
    const tabContents = document.querySelectorAll('.tab-content');

    navTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetTab = tab.dataset.tab;

            // Remove active class from all tabs and contents
            navTabs.forEach(t => t.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Add active class to clicked tab and corresponding content
            tab.classList.add('active');
            document.getElementById(targetTab).classList.add('active');

            // Trigger animations for the new section
            animateSection(targetTab);

            // Update URL hash without scrolling
            history.pushState(null, null, `#${targetTab}`);
        });
    });

    // Handle initial hash in URL
    const initialHash = window.location.hash.replace('#', '');
    if (initialHash) {
        const targetTab = document.querySelector(`[data-tab="${initialHash}"]`);
        if (targetTab) {
            targetTab.click();
        }
    }

    // Handle browser back/forward
    window.addEventListener('popstate', () => {
        const hash = window.location.hash.replace('#', '') || 'about';
        const targetTab = document.querySelector(`[data-tab="${hash}"]`);
        if (targetTab) {
            targetTab.click();
        }
    });
}

// Animations
function initializeAnimations() {
    // Initial animation for the first section
    animateSection('about');

    // Animate skill bars when skills section is visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.skill-item').forEach(item => {
        observer.observe(item);
    });
}

function animateSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (!section) return;

    // Re-trigger animations by removing and re-adding classes
    const animatedElements = section.querySelectorAll('[class*="animation"]');
    animatedElements.forEach(el => {
        el.style.animation = 'none';
        el.offsetHeight; // Trigger reflow
        el.style.animation = null;
    });

    // Reset skill bars animation
    if (sectionId === 'skills') {
        const skillBars = section.querySelectorAll('.skill-progress');
        skillBars.forEach(bar => {
            bar.style.animation = 'none';
            bar.offsetHeight;
            bar.style.animation = null;
        });
    }

    // Reset timeline items animation
    if (sectionId === 'experience') {
        const timelineItems = section.querySelectorAll('.timeline-item');
        timelineItems.forEach((item, index) => {
            item.style.animation = 'none';
            item.offsetHeight;
            item.style.animation = `fadeInUp 0.6s ease ${index * 0.1}s backwards`;
        });
    }

    // Reset project cards animation
    if (sectionId === 'projects') {
        const projectCards = section.querySelectorAll('.project-card');
        projectCards.forEach((card, index) => {
            card.style.animation = 'none';
            card.offsetHeight;
            card.style.animation = `fadeInUp 0.6s ease ${index * 0.1}s backwards`;
        });
    }
}

// Contact Form -- Later
function initializeContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitBtn = form.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;

        // Show loading state
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Gönderiliyor...';
        submitBtn.disabled = true;

        // Simulate form submission (replace with actual API call)
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Show success state
        submitBtn.innerHTML = '<i class="fas fa-check"></i> Gönderildi!';
        submitBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';

        // Reset form
        form.reset();

        // Reset button after delay
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.style.background = '';
            submitBtn.disabled = false;
        }, 3000);
    });

    // Add floating label effect
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });

        input.addEventListener('blur', () => {
            if (!input.value) {
                input.parentElement.classList.remove('focused');
            }
        });
    });
}

// Mobile Menu
function initializeMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navTabs = document.querySelector('.nav-tabs');

    if (!mobileToggle || !navTabs) return;

    mobileToggle.addEventListener('click', () => {
        navTabs.classList.toggle('mobile-open');
        mobileToggle.classList.toggle('active');

        const icon = mobileToggle.querySelector('i');
        if (navTabs.classList.contains('mobile-open')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Close mobile menu when tab is clicked
    document.querySelectorAll('.nav-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            navTabs.classList.remove('mobile-open');
            mobileToggle.classList.remove('active');
            const icon = mobileToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });
}

// Typing Effect
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Smooth Scroll for Anchors
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

// Parallax Effect for Background Orbs
document.addEventListener('mousemove', (e) => {
    const orbs = document.querySelectorAll('.gradient-orb');
    const x = (e.clientX / window.innerWidth - 0.5) * 2;
    const y = (e.clientY / window.innerHeight - 0.5) * 2;

    orbs.forEach((orb, index) => {
        const speed = (index + 1) * 10;
        orb.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
    });
});

// Download CV Button Animation
const downloadBtn = document.querySelector('.download-cv');
if (downloadBtn) {
    downloadBtn.addEventListener('click', function(e) {
        // Add ripple effect
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        this.appendChild(ripple);

        const rect = this.getBoundingClientRect();
        ripple.style.left = `${e.clientX - rect.left}px`;
        ripple.style.top = `${e.clientY - rect.top}px`;

        setTimeout(() => ripple.remove(), 600);
    });
}

// ========================================
// Console Easter Egg
// ========================================
console.log('%c🚀 Berkant Mangır Portfolio', 'font-size: 24px; font-weight: bold; color: #00d4aa;');
console.log('%cFor contact: berkant@example.com', 'font-size: 14px; color: #94a3b8;');
console.log('%To see source code: GitHub', 'font-size: 14px; color: #94a3b8;');

