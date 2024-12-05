document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu functionality
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    const navMenu = document.querySelector('nav ul');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');
        });
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            navMenu.classList.remove('active');
            
            const target = document.querySelector(this.getAttribute('href'));
            const headerOffset = 100;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        });
    });

    // Scroll reveal animation
    const revealElements = document.querySelectorAll('.skill-item, .project-card, .about-content');
    
    const revealOnScroll = () => {
        const triggerBottom = window.innerHeight * 0.8;

        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;

            if (elementTop < triggerBottom) {
                element.classList.add('show');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Initial check

    // Typing animation for subtitle
    const subtitle = document.querySelector('.subtitle');
    if (subtitle) {
        const text = subtitle.textContent;
        subtitle.textContent = '';
        let index = 0;

        const typeWriter = () => {
            if (index < text.length) {
                subtitle.textContent += text.charAt(index);
                index++;
                setTimeout(typeWriter, 100);
            }
        };

        setTimeout(typeWriter, 1000);
    }

    // Form submission with validation and animation
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Basic form validation
            const inputs = form.querySelectorAll('input, textarea');
            let isValid = true;

            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.classList.add('error');
                } else {
                    input.classList.remove('error');
                }
            });

            if (!isValid) {
                showNotification('Please fill in all fields', 'error');
                return;
            }

            // Simulate form submission
            const submitButton = form.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.disabled = true;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

            try {
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 2000));
                
                showNotification('Message sent successfully!', 'success');
                form.reset();
            } catch (error) {
                showNotification('Failed to send message. Please try again.', 'error');
            } finally {
                submitButton.disabled = false;
                submitButton.textContent = originalText;
            }
        });
    }

    // Notification system
    function showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;

        document.body.appendChild(notification);

        // Trigger animation
        setTimeout(() => notification.classList.add('show'), 100);

        // Remove notification
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    // Parallax effect for hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        });
    }

    // Active navigation highlight
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav ul li a');

    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
});
