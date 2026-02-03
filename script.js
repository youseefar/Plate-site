// Forex Plate - Premium Plate Selling Business Website
// Main JavaScript file with all interactive functionality

// DOM Elements
const themeToggle = document.getElementById('themeToggle');
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
const currentYear = document.getElementById('currentYear');
const cartNotification = document.getElementById('cartNotification');
const productButtons = document.querySelectorAll('.btn-product');
const animateElements = document.querySelectorAll('.animate-on-scroll');

// Initialize the website when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    currentYear.textContent = new Date().getFullYear();
    
    // Initialize theme based on user preference or saved setting
    initTheme();
    
    // Initialize scroll animations
    initScrollAnimations();
    
    // Initialize smooth scrolling for anchor links
    initSmoothScrolling();
    
    // Initialize product buttons
    initProductButtons();
    
    // Close mobile menu when clicking on a link
    closeMenuOnLinkClick();
    
    // Add loading animation to page
    animatePageLoad();
});

// Theme Toggle Functionality
function initTheme() {
    // Check for saved theme or prefer-color-scheme
    const savedTheme = localStorage.getItem('forexPlateTheme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Set initial theme
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
    } else if (prefersDark) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('forexPlateTheme', 'dark');
    }
    
    // Toggle theme when button is clicked
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('forexPlateTheme', newTheme);
        
        // Add animation to toggle button
        themeToggle.style.transform = 'rotate(360deg)';
        setTimeout(() => {
            themeToggle.style.transform = 'rotate(0deg)';
        }, 300);
    });
}

// Mobile Menu Toggle
menuToggle.addEventListener('click', function() {
    navLinks.classList.toggle('active');
    menuToggle.classList.toggle('active');
    
    // Toggle body scroll when menu is open
    if (navLinks.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'auto';
    }
});

// Close mobile menu when clicking on a link
function closeMenuOnLinkClick() {
    const navLinksItems = document.querySelectorAll('.nav-link');
    
    navLinksItems.forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });
}

// Smooth Scrolling for Anchor Links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            // Skip if it's a WhatsApp link
            if (this.getAttribute('href').includes('wa.me') || this.getAttribute('href').includes('whatsapp')) {
                return;
            }
            
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
}

// Scroll Reveal Animations
function initScrollAnimations() {
    // Check if elements are in viewport on initial load
    checkScroll();
    
    // Check on scroll
    window.addEventListener('scroll', checkScroll);
    
    function checkScroll() {
        const triggerBottom = window.innerHeight * 0.85;
        
        animateElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < triggerBottom) {
                element.classList.add('visible');
            }
        });
    }
}

// Product Buttons - Add to Cart Simulation
function initProductButtons() {
    productButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productName = this.getAttribute('data-product');
            
            // Show cart notification
            showCartNotification(productName);
            
            // Add animation to button
            this.innerHTML = '<i class="fas fa-check"></i> Added';
            this.style.backgroundColor = '#4caf50';
            this.style.color = 'white';
            
            // Reset button after 2 seconds
            setTimeout(() => {
                this.innerHTML = 'Add to Cart';
                this.style.backgroundColor = '';
                this.style.color = '';
            }, 2000);
        });
    });
}

// Show Cart Notification
function showCartNotification(productName) {
    const notificationText = cartNotification.querySelector('span');
    notificationText.textContent = `${productName} added to cart!`;
    
    cartNotification.classList.add('active');
    
    // Hide notification after 3 seconds
    setTimeout(() => {
        cartNotification.classList.remove('active');
    }, 3000);
}

// Page Load Animation
function animatePageLoad() {
    // Add a slight delay to ensure DOM is ready
    setTimeout(() => {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease';
        
        // Trigger reflow
        document.body.offsetHeight;
        
        // Fade in
        document.body.style.opacity = '1';
        
        // Animate hero elements with a delay
        const heroTitle = document.querySelector('.hero-title');
        const heroSubtitle = document.querySelector('.hero-subtitle');
        const heroCta = document.querySelector('.hero-cta');
        const heroImage = document.querySelector('.hero-image');
        
        if (heroTitle) {
            setTimeout(() => {
                heroTitle.classList.add('visible');
            }, 300);
        }
        
        if (heroSubtitle) {
            setTimeout(() => {
                heroSubtitle.classList.add('visible');
            }, 500);
        }
        
        if (heroCta) {
            setTimeout(() => {
                heroCta.classList.add('visible');
            }, 700);
        }
        
        if (heroImage) {
            setTimeout(() => {
                heroImage.classList.add('visible');
            }, 900);
        }
    }, 100);
}

// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    const scrollPosition = window.scrollY;
    
    if (scrollPosition > 100) {
        header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
        header.style.padding = '0';
    } else {
        header.style.boxShadow = 'none';
        header.style.padding = '';
    }
});

// Plate animation on hover
const plates = document.querySelectorAll('.plate');
plates.forEach(plate => {
    plate.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
    });
    
    plate.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
});

// Gallery item click handler (for future expansion)
const galleryItems = document.querySelectorAll('.gallery-item');
galleryItems.forEach(item => {
    item.addEventListener('click', function() {
        // In a real implementation, this would open a lightbox
        // For now, just add a visual feedback
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 200);
    });
});

// WhatsApp order button animation
const whatsappButtons = document.querySelectorAll('[href*="whatsapp"], [href*="wa.me"]');
whatsappButtons.forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05)';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
});

// Add a subtle parallax effect to the hero background
window.addEventListener('scroll', function() {
    const heroBackground = document.querySelector('.hero-background');
    const scrollPosition = window.scrollY;
    
    if (heroBackground) {
        heroBackground.style.transform = `translateY(${scrollPosition * 0.2}px)`;
    }
});
