// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            navLinks.classList.remove('active');
        }
    });
});

// Hamburger menu toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// Navbar background on scroll
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(10, 10, 15, 0.98)';
        navbar.style.boxShadow = '0 5px 30px rgba(0, 255, 255, 0.2)';
    } else {
        navbar.style.background = 'rgba(10, 10, 15, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Animate on Scroll (AOS) - Custom implementation
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('aos-animate');
            // Optionally unobserve after animation
            // observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all elements with data-aos attribute
document.querySelectorAll('[data-aos]').forEach(element => {
    observer.observe(element);
});

// Animate progress bars when in view
const progressBars = document.querySelectorAll('.progress');
const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBar = entry.target;
            const width = progressBar.style.width;
            progressBar.style.width = '0';
            setTimeout(() => {
                progressBar.style.width = width;
            }, 100);
            progressObserver.unobserve(progressBar);
        }
    });
}, { threshold: 0.5 });

progressBars.forEach(bar => progressObserver.observe(bar));

// Contact form submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        
        // Create success message
        const successMessage = document.createElement('div');
        successMessage.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(0, 255, 255, 0.95);
            color: #0a0a0f;
            padding: 30px 50px;
            border-radius: 15px;
            font-family: 'Orbitron', sans-serif;
            font-size: 20px;
            font-weight: 700;
            z-index: 10000;
            box-shadow: 0 0 50px rgba(0, 255, 255, 0.8);
            animation: fadeInScale 0.5s ease-out;
        `;
        successMessage.textContent = 'Message Sent Successfully! 🚀';
        
        document.body.appendChild(successMessage);
        
        // Remove message after 3 seconds
        setTimeout(() => {
            successMessage.style.animation = 'fadeOutScale 0.5s ease-out';
            setTimeout(() => {
                document.body.removeChild(successMessage);
            }, 500);
        }, 3000);
        
        // Reset form
        contactForm.reset();
    });
}

// Add CSS for success message animations
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInScale {
        from {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.5);
        }
        to {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
        }
    }
    
    @keyframes fadeOutScale {
        from {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
        }
        to {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.5);
        }
    }
    
    .hamburger.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }
    
    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
    }
`;
document.head.appendChild(style);

// Particle effect on mouse move (subtle)
let mouseX = 0;
let mouseY = 0;
let particles = [];

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Create particle occasionally
    if (Math.random() > 0.95) {
        createParticle(mouseX, mouseY);
    }
});

function createParticle(x, y) {
    const particle = document.createElement('div');
    particle.style.cssText = `
        position: fixed;
        width: 3px;
        height: 3px;
        background: rgba(0, 255, 255, 0.8);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        left: ${x}px;
        top: ${y}px;
        box-shadow: 0 0 10px rgba(0, 255, 255, 0.8);
    `;
    
    document.body.appendChild(particle);
    
    // Animate particle
    let opacity = 1;
    let size = 3;
    const angle = Math.random() * Math.PI * 2;
    const velocity = 2;
    let posX = x;
    let posY = y;
    
    const animate = () => {
        opacity -= 0.02;
        size -= 0.05;
        posX += Math.cos(angle) * velocity;
        posY += Math.sin(angle) * velocity;
        
        if (opacity <= 0 || size <= 0) {
            document.body.removeChild(particle);
            return;
        }
        
        particle.style.opacity = opacity;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.left = posX + 'px';
        particle.style.top = posY + 'px';
        
        requestAnimationFrame(animate);
    };
    
    requestAnimationFrame(animate);
}

// Add keyboard navigation
document.addEventListener('keydown', (e) => {
    const sections = ['home', 'about', 'skills', 'projects', 'contact'];
    const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        const rect = element.getBoundingClientRect();
        return rect.top <= 100 && rect.bottom >= 100;
    });
    
    if (currentSection) {
        const currentIndex = sections.indexOf(currentSection);
        
        if (e.key === 'ArrowDown' && currentIndex < sections.length - 1) {
            e.preventDefault();
            document.getElementById(sections[currentIndex + 1]).scrollIntoView({ behavior: 'smooth' });
        } else if (e.key === 'ArrowUp' && currentIndex > 0) {
            e.preventDefault();
            document.getElementById(sections[currentIndex - 1]).scrollIntoView({ behavior: 'smooth' });
        }
    }
});

// Easter egg: Konami code
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        triggerEasterEgg();
        konamiCode = [];
    }
});

function triggerEasterEgg() {
    const cube = document.querySelector('.cube');
    if (cube) {
        cube.style.animation = 'rotateCube 2s infinite linear';
        
        // Create fireworks effect
        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                const x = Math.random() * window.innerWidth;
                const y = Math.random() * window.innerHeight;
                createFirework(x, y);
            }, i * 100);
        }
        
        // Show message
        const message = document.createElement('div');
        message.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-family: 'Orbitron', sans-serif;
            font-size: 36px;
            color: #00ffff;
            text-shadow: 0 0 30px rgba(0, 255, 255, 0.8);
            z-index: 10001;
            animation: rainbow 2s infinite;
        `;
        message.textContent = '🎉 KONAMI CODE ACTIVATED! 🎉';
        document.body.appendChild(message);
        
        setTimeout(() => {
            document.body.removeChild(message);
        }, 3000);
    }
}

function createFirework(x, y) {
    const colors = ['#00ffff', '#ff00ff', '#ffff00'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: fixed;
            width: 5px;
            height: 5px;
            background: ${color};
            border-radius: 50%;
            pointer-events: none;
            z-index: 10000;
            left: ${x}px;
            top: ${y}px;
            box-shadow: 0 0 10px ${color};
        `;
        
        document.body.appendChild(particle);
        
        const angle = (Math.PI * 2 * i) / 20;
        const velocity = 5;
        let distance = 0;
        let opacity = 1;
        
        const animate = () => {
            distance += velocity;
            opacity -= 0.02;
            
            if (opacity <= 0) {
                document.body.removeChild(particle);
                return;
            }
            
            const newX = x + Math.cos(angle) * distance;
            const newY = y + Math.sin(angle) * distance;
            
            particle.style.left = newX + 'px';
            particle.style.top = newY + 'px';
            particle.style.opacity = opacity;
            
            requestAnimationFrame(animate);
        };
        
        requestAnimationFrame(animate);
    }
}

// Add rainbow animation
const rainbowStyle = document.createElement('style');
rainbowStyle.textContent = `
    @keyframes rainbow {
        0% { color: #ff0000; }
        16.67% { color: #ff7f00; }
        33.33% { color: #ffff00; }
        50% { color: #00ff00; }
        66.67% { color: #0000ff; }
        83.33% { color: #8b00ff; }
        100% { color: #ff0000; }
    }
`;
document.head.appendChild(rainbowStyle);

// Log welcome message
console.log('%c🚀 Welcome to Venkatesh Thata\'s Portfolio! 🚀', 'font-size: 20px; color: #00ffff; font-weight: bold; text-shadow: 0 0 10px rgba(0, 255, 255, 0.8);');
console.log('%cTip: Try the Konami Code! ⬆️⬆️⬇️⬇️⬅️➡️⬅️➡️BA', 'font-size: 14px; color: #ff00ff;');

// Preload animations
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});
