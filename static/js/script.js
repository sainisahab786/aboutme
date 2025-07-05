// JavaScript for Vedansh Saini Portfolio

document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS (Animate On Scroll) if available
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true
        });
    }

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Contact form handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleContactForm();
        });
    }

    // Skill bar animations (for experience page)
    const skillBars = document.querySelectorAll('.skill-progress');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const skillObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBar = entry.target;
                const width = skillBar.style.width;
                skillBar.style.width = '0%';
                setTimeout(() => {
                    skillBar.style.width = width;
                }, 200);
                // Don't unobserve so animation can repeat when scrolling back
            }
        });
    }, observerOptions);

    skillBars.forEach(bar => {
        skillObserver.observe(bar);
    });

    // Skills badges animation (for home page)
    const skillBadges = document.querySelectorAll('.skills-grid .skill-item .badge');
    const skillBadgeObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const badge = entry.target;
                badge.style.opacity = '1';
                badge.style.transform = 'translateY(0)';
                badge.style.visibility = 'visible';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px'
    });

    skillBadges.forEach(badge => {
        // Ensure initial visibility
        badge.style.opacity = '1';
        badge.style.visibility = 'visible';
        badge.style.transform = 'translateY(0)';
        skillBadgeObserver.observe(badge);
    });

    // Typing effect for hero section
    const typingElement = document.querySelector('.typing-effect');
    if (typingElement) {
        const text = typingElement.textContent;
        typingElement.textContent = '';
        let index = 0;

        function typeText() {
            if (index < text.length) {
                typingElement.textContent += text.charAt(index);
                index++;
                setTimeout(typeText, 100);
            }
        }

        setTimeout(typeText, 1000);
    }

    // Navbar active link highlighting
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.navbar-nav .nav-link');

    function highlightNavItem() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', highlightNavItem);

    // Back to top button
    const backToTopButton = createBackToTopButton();
    document.body.appendChild(backToTopButton);

    // Navbar fade effect on scroll
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 100) {
            navbar.style.backgroundColor = 'rgba(52, 58, 64, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.backgroundColor = 'rgba(52, 58, 64, 0.9)';
            navbar.style.backdropFilter = 'none';
            navbar.style.boxShadow = 'none';
        }
    });

    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.style.display = 'block';
            backToTopButton.style.opacity = '1';
            backToTopButton.style.transform = 'translateY(0)';
        } else {
            backToTopButton.style.opacity = '0';
            backToTopButton.style.transform = 'translateY(20px)';
            setTimeout(() => {
                if (backToTopButton.style.opacity === '0') {
                    backToTopButton.style.display = 'none';
                }
            }, 300);
        }
    });

    // Project filter functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter projects
            projectCards.forEach(card => {
                if (filter === 'all' || card.classList.contains(filter)) {
                    card.style.display = 'block';
                    card.classList.add('fade-in');
                } else {
                    card.style.display = 'none';
                    card.classList.remove('fade-in');
                }
            });
        });
    });

    // Initialize tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    if (typeof bootstrap !== 'undefined') {
        tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl);
        });
    }

    // Lazy loading for images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => {
        imageObserver.observe(img);
    });

    // Add fade-in effect for sections on scroll
    const sectionsToFade = document.querySelectorAll('.skills-section, .overview-section, .cta-section');
    const fadeObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                entry.target.classList.add('fade-in-complete');
            } else {
                // Optional: fade out when scrolling away (uncomment if desired)
                // entry.target.style.opacity = '0.3';
                // entry.target.style.transform = 'translateY(20px)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '-50px'
    });

    sectionsToFade.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        fadeObserver.observe(section);
    });

    // Force skills visibility after page load
    setTimeout(function() {
        const skillsSection = document.querySelector('.skills-section');
        const skillItems = document.querySelectorAll('.skill-item');
        const skillBadges = document.querySelectorAll('.skill-item .badge');
        
        if (skillsSection) {
            skillsSection.style.visibility = 'visible';
            skillsSection.style.opacity = '1';
        }
        
        skillItems.forEach(item => {
            item.style.visibility = 'visible';
            item.style.opacity = '1';
            item.style.display = 'inline-block';
        });
        
        skillBadges.forEach(badge => {
            badge.style.visibility = 'visible';
            badge.style.opacity = '1';
            badge.style.display = 'inline-block';
        });
    }, 100);

    // Additional check on scroll to maintain visibility
    window.addEventListener('scroll', function() {
        const skillItems = document.querySelectorAll('.skill-item');
        skillItems.forEach(item => {
            if (item.style.display === 'none' || item.style.visibility === 'hidden') {
                item.style.display = 'inline-block';
                item.style.visibility = 'visible';
                item.style.opacity = '1';
            }
        });
    });
});

// Contact form handler
function handleContactForm() {
    const form = document.getElementById('contactForm');
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;
    
    // Show loading state
    submitButton.innerHTML = '<span class="loading"></span> Sending...';
    submitButton.disabled = true;
    
    // Get form data
    const formData = new FormData(form);
    
    // Send AJAX request
    fetch(form.action || window.location.pathname, {
        method: 'POST',
        body: formData,
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
        }
    })
    .then(response => response.json())
    .then(data => {
        // Reset button
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
        
        if (data.success) {
            // Show success message
            showNotification(data.message, 'success');
            // Reset form
            form.reset();
        } else {
            showNotification('Something went wrong. Please try again.', 'danger');
        }
    })
    .catch(error => {
        // Reset button
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
        
        // Show error message
        showNotification('Network error. Please try again.', 'danger');
        console.error('Error:', error);
    });
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `alert alert-${type} alert-dismissible fade show notification`;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        z-index: 9999;
        max-width: 300px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
    `;
    
    notification.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 5000);
}

// Create back to top button
function createBackToTopButton() {
    const button = document.createElement('button');
    button.innerHTML = '<i class="fas fa-arrow-up"></i>';
    button.className = 'btn btn-primary back-to-top';
    button.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        z-index: 1000;
        display: none;
        opacity: 0;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        box-shadow: 0 3px 10px rgba(0,0,0,0.3);
        transition: all 0.3s ease;
        transform: translateY(20px);
    `;
    
    button.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Add hover effect
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(0) scale(1.1)';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
    
    return button;
}

// Parallax effect and fade for hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.hero-section');
    const heroContent = document.querySelector('.hero-content');
    const profileCard = document.querySelector('.profile-card');
    
    if (parallax) {
        const speed = scrolled * 0.3;
        const windowHeight = window.innerHeight;
        
        // Calculate fade amount based on scroll position
        const fadeStart = 100;
        const fadeUntil = windowHeight * 0.8;
        let opacity = 1;
        
        if (scrolled >= fadeStart) {
            opacity = 1 - (scrolled - fadeStart) / (fadeUntil - fadeStart);
            opacity = Math.max(0, Math.min(1, opacity));
        }
        
        // Apply parallax movement
        parallax.style.transform = `translateY(${speed}px)`;
        
        // Apply fade effect to hero content
        if (heroContent) {
            heroContent.style.opacity = opacity;
            heroContent.style.transform = `translateY(${speed * 0.5}px)`;
        }
        
        // Apply fade effect to profile card
        if (profileCard) {
            profileCard.style.opacity = opacity;
            profileCard.style.transform = `translateY(${speed * 0.3}px) scale(${0.9 + (opacity * 0.1)})`;
        }
        
        // Fade the hero section background overlay
        const heroOverlay = parallax.querySelector('::before') || parallax;
        if (scrolled > fadeStart) {
            const backgroundOpacity = 0.3 + (1 - opacity) * 0.4;
            parallax.style.setProperty('--overlay-opacity', backgroundOpacity);
        }
    }
});

// Card hover effects
document.addEventListener('mouseover', function(e) {
    if (e.target.closest('.card')) {
        const card = e.target.closest('.card');
        card.style.transform = 'translateY(-10px)';
    }
});

document.addEventListener('mouseout', function(e) {
    if (e.target.closest('.card')) {
        const card = e.target.closest('.card');
        card.style.transform = 'translateY(0)';
    }
});

// Counter animation
function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const increment = target / 100;
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            counter.textContent = Math.floor(current);
            
            if (current >= target) {
                counter.textContent = target;
                clearInterval(timer);
            }
        }, 20);
    });
}

// Initialize counter animation when in view
const counterObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            counterObserver.unobserve(entry.target);
        }
    });
});

const counterSection = document.querySelector('.counters-section');
if (counterSection) {
    counterObserver.observe(counterSection);
}

// Theme toggle functionality (if needed in future)
function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
}

// Load saved theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    document.body.classList.add('dark-theme');
}

// Utility function for debouncing
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction() {
        const context = this;
        const args = arguments;
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

// Optimized scroll handler
const optimizedScrollHandler = debounce(function() {
    highlightNavItem();
}, 10);

window.addEventListener('scroll', optimizedScrollHandler);
