// =====================================
// Mobile Menu Toggle
// =====================================
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('show');
        navToggle.classList.toggle('active');
    });

    // Close menu when clicking on a nav link
    const navLinks = document.querySelectorAll('.nav__link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('show');
            navToggle.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
            navMenu.classList.remove('show');
            navToggle.classList.remove('active');
        }
    });
}

// =====================================
// Scroll Animation Observer
// =====================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const animateOnScroll = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('aos-animate');
            observer.unobserve(entry.target);
        }
    });
};

const observer = new IntersectionObserver(animateOnScroll, observerOptions);

// Observe all elements with data-aos attribute
const elementsToAnimate = document.querySelectorAll('[data-aos]');
elementsToAnimate.forEach(element => {
    observer.observe(element);
});

// =====================================
// Smooth Scroll for Navigation Links
// =====================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// =====================================
// Header Scroll Effect
// =====================================
let lastScrollTop = 0;
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Add shadow on scroll
    if (scrollTop > 50) {
        header.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.08)';
    }
    
    lastScrollTop = scrollTop;
});

// =====================================
// Lazy Loading Images
// =====================================
if ('loading' in HTMLImageElement.prototype) {
    // Browser supports native lazy loading
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.src;
    });
} else {
    // Fallback for browsers that don't support lazy loading
    const imageLazyLoadObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    lazyImages.forEach(img => {
        imageLazyLoadObserver.observe(img);
    });
}

// =====================================
// CTA Button Actions
// =====================================
const ctaButtons = document.querySelectorAll('.cta-card .btn');
ctaButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        const buttonText = button.textContent.trim();
        
        if (buttonText.includes('상담 신청')) {
            // Open contact form or show alert
            alert('상담 신청이 완료되었습니다.\n곧 연락드리겠습니다.');
        } else if (buttonText.includes('카카오톡')) {
            // Open KakaoTalk or show info
            alert('카카오톡 채널로 이동합니다.\nID: @딸기아트어린이집');
        }
    });
});

// =====================================
// Add Animation Delay to Cards
// =====================================
document.addEventListener('DOMContentLoaded', () => {
    const programCards = document.querySelectorAll('.program-card');
    programCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
    
    const galleryItems = document.querySelectorAll('.gallery__item');
    galleryItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
    });
});

// =====================================
// Performance: Debounce Scroll Events
// =====================================
function debounce(func, wait = 10, immediate = true) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Apply debounce to scroll handler for better performance
const debouncedScroll = debounce(() => {
    // Additional scroll-based effects can be added here
}, 10);

window.addEventListener('scroll', debouncedScroll);

// =====================================
// Console Welcome Message
// =====================================
console.log('%c🍓 딸기아트어린이집', 'color: #FF6B9D; font-size: 24px; font-weight: bold;');
console.log('%c창의력이 자라는 곳', 'color: #5A5A5A; font-size: 14px;');
