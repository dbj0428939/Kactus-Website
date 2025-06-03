// Texas Threads & Treasures - Main JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');
        });
    }
    
    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Close mobile menu if open
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    mobileMenuBtn.classList.remove('active');
                }
                
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Offset for fixed header
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Form Submission Handling
    const customRequestForm = document.getElementById('custom-request-form');
    const contactForm = document.getElementById('contact-form');
    const newsletterForm = document.querySelector('.newsletter-form');
    
    // Custom Request Form
    if (customRequestForm) {
        customRequestForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // In a real implementation, you would send this data to a server
            // For now, we'll just show a success message
            
            // Get form data
            const formData = new FormData(customRequestForm);
            const formValues = {};
            
            for (let [key, value] of formData.entries()) {
                formValues[key] = value;
            }
            
            console.log('Custom Request Form Data:', formValues);
            
            // Show success message
            const formContainer = customRequestForm.parentElement;
            formContainer.innerHTML = `
                <div class="success-message">
                    <i class="fas fa-check-circle"></i>
                    <h3>Request Submitted Successfully!</h3>
                    <p>Thank you for your custom request. We'll review your details and get back to you within 24-48 hours.</p>
                    <button class="btn" onclick="window.location.reload()">Submit Another Request</button>
                </div>
            `;
        });
    }
    
    // Contact Form
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const formValues = {};
            
            for (let [key, value] of formData.entries()) {
                formValues[key] = value;
            }
            
            console.log('Contact Form Data:', formValues);
            
            // Show success message
            const formContainer = contactForm.parentElement;
            formContainer.innerHTML = `
                <div class="success-message">
                    <i class="fas fa-check-circle"></i>
                    <h3>Message Sent Successfully!</h3>
                    <p>Thank you for contacting us. We'll get back to you as soon as possible.</p>
                    <button class="btn" onclick="window.location.reload()">Send Another Message</button>
                </div>
            `;
        });
    }
    
    // Newsletter Form
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = newsletterForm.querySelector('input[type="email"]');
            const email = emailInput.value;
            
            console.log('Newsletter Subscription:', email);
            
            // Show success message
            const formContainer = newsletterForm.parentElement;
            const originalContent = formContainer.innerHTML;
            
            formContainer.innerHTML = `
                <div class="success-message">
                    <i class="fas fa-check-circle"></i>
                    <h3>Subscribed Successfully!</h3>
                    <p>Thank you for subscribing to our newsletter!</p>
                </div>
            `;
            
            // Restore the form after 3 seconds
            setTimeout(() => {
                formContainer.innerHTML = originalContent;
                const newForm = formContainer.querySelector('.newsletter-form');
                
                if (newForm) {
                    newForm.addEventListener('submit', arguments.callee);
                }
            }, 3000);
        });
    }
    
    // Product Image Hover Effect
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const img = this.querySelector('.product-img img');
            if (img) {
                img.style.transform = 'scale(1.1)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const img = this.querySelector('.product-img img');
            if (img) {
                img.style.transform = 'scale(1)';
            }
        });
    });
    
    // Add CSS class for active navigation based on scroll position
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        
        document.querySelectorAll('section').forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                document.querySelectorAll('.nav-links a').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
    
    // Add additional CSS for active navigation links
    const style = document.createElement('style');
    style.innerHTML = `
        .nav-links a.active {
            color: var(--texas-red) !important;
            font-weight: 700;
        }
        
        .success-message {
            text-align: center;
            padding: 30px;
        }
        
        .success-message i {
            font-size: 3rem;
            color: #4CAF50;
            margin-bottom: 20px;
        }
        
        .success-message h3 {
            font-size: 1.5rem;
            margin-bottom: 15px;
            color: var(--texas-blue);
        }
        
        .success-message p {
            margin-bottom: 20px;
            color: #555;
        }
        
        .nav-links.active {
            display: flex;
            flex-direction: column;
            position: absolute;
            top: 80px;
            left: 0;
            width: 100%;
            background-color: white;
            padding: 20px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
            z-index: 100;
        }
        
        .nav-links.active li {
            margin: 10px 0;
        }
        
        .mobile-menu.active i:before {
            content: '\\f00d';
        }
    `;
    document.head.appendChild(style);
});
