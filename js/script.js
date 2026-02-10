document.addEventListener('DOMContentLoaded', () => {
    
    // --- Sticky Navbar ---
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.background = 'rgba(15, 23, 42, 0.98)';
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.4)';
            header.style.padding = '0.5rem 0';
        } else {
            header.style.background = 'rgba(15, 23, 42, 0.95)';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.3)';
            header.style.padding = '1rem 0';
        }
    });

    // --- Mobile Menu Toggle ---
    const menuToggle = document.getElementById('mobile-menu');
    const navList = document.querySelector('.nav-list');
    const navLinks = document.querySelectorAll('.nav-link');

    menuToggle.addEventListener('click', () => {
        navList.classList.toggle('active');
        // Simple hamburger animation could go here by toggling classes on bars
    });

    // Close menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navList.classList.remove('active');
        });
    });

    // --- Active Link Highlight on Scroll ---
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // --- Scroll Animations (Intersection Observer) ---
    const observerOptions = {
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    const hiddenElements = document.querySelectorAll('.hidden');
    // Initially add hidden class to sections if not manually added in HTML
    sections.forEach(section => {
        section.classList.add('hidden');
        observer.observe(section);
    });

    // --- Back to Top Button ---
    const scrollTopBtn = document.getElementById('scrollTop');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollTopBtn.classList.add('active');
        } else {
            scrollTopBtn.classList.remove('active');
        }
    });

    // --- Contact Form Mock Submission ---
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Basic Validation (HTML attributes already handle required)
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        if(name && email && message) {
            // Mock Success
            formMessage.textContent = "Thank you! Your message has been sent successfully.";
            formMessage.classList.add('success');
            formMessage.classList.remove('error');
            
            // Clear form
            contactForm.reset();

            // Clear message after 3 seconds
            setTimeout(() => {
                formMessage.textContent = "";
                formMessage.classList.remove('success');
            }, 5000);
        } else {
            formMessage.textContent = "Please fill in all fields.";
            formMessage.classList.add('error');
            formMessage.classList.remove('success');
        }
    });

});
