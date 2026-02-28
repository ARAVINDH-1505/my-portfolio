// Dynamic Background Animation System
class DynamicBackground {
    constructor(canvasId, config = {}) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;

        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.config = {
            particleCount: config.particleCount || 50,
            baseColor: config.baseColor || [59, 130, 246], // RGB for accent blue
            maxSpeed: config.maxSpeed || 0.5,
            particleSize: config.particleSize || 2,
            connectionDistance: config.connectionDistance || 150,
            ...config
        };

        this.resize();
        this.init();
        this.animate();

        window.addEventListener('resize', () => this.resize());
    }

    resize() {
        const section = this.canvas.parentElement;
        this.canvas.width = section.offsetWidth;
        this.canvas.height = section.offsetHeight;
    }

    init() {
        this.particles = [];
        for (let i = 0; i < this.config.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * this.config.maxSpeed,
                vy: (Math.random() - 0.5) * this.config.maxSpeed,
                size: Math.random() * this.config.particleSize + 1
            });
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Update and draw particles
        this.particles.forEach((particle, i) => {
            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;

            // Bounce off edges
            if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1;

            // Draw particle
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(${this.config.baseColor[0]}, ${this.config.baseColor[1]}, ${this.config.baseColor[2]}, 0.5)`;
            this.ctx.fill();

            // Draw connections
            for (let j = i + 1; j < this.particles.length; j++) {
                const other = this.particles[j];
                const dx = particle.x - other.x;
                const dy = particle.y - other.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < this.config.connectionDistance) {
                    const opacity = (1 - distance / this.config.connectionDistance) * 0.3;
                    this.ctx.beginPath();
                    this.ctx.moveTo(particle.x, particle.y);
                    this.ctx.lineTo(other.x, other.y);
                    this.ctx.strokeStyle = `rgba(${this.config.baseColor[0]}, ${this.config.baseColor[1]}, ${this.config.baseColor[2]}, ${opacity})`;
                    this.ctx.lineWidth = 0.5;
                    this.ctx.stroke();
                }
            }
        });

        requestAnimationFrame(() => this.animate());
    }
}

// Project Data
const projectData = {
    'skin-cancer': {
        title: 'Skin Cancer Prediction using Explainable AI',
        timeline: 'Oct 2024 – Dec 2024',
        gif: 'assets/xai.gif',
        description: [
            'Built multi-class CNN for dermoscopic classification',
            'Integrated SHAP & LIME for pixel-level explanations',
            'Improved trust in medical AI diagnostics'
        ],
        highlights: [
            'Achieved 91% accuracy on HAM10000 dataset',
            'Implemented explainability layer for clinical validation',
            'Developed robust preprocessing pipeline'
        ],
        tools: ['PyTorch', 'SHAP', 'LIME', 'OpenCV', 'CNN', 'XAI']
    },
    'malware': {
        title: 'Malware Detection via Dynamic Algorithmic Configuration',
        timeline: 'Jan 2025 – Apr 2025',
        gif: 'assets/mal.gif',
        description: [
            'Federated learning with adaptive algorithms',
            'Reduced false positives using ensemble classifiers',
            'Dynamic hyperparameter tuning'
        ],
        highlights: [
            'Achieved 98% accuracy on malware detection',
            'Published in IEEE IDCIoT 2025 conference',
            'Implemented privacy-preserving federated approach'
        ],
        tools: ['Federated Learning', 'Ensemble Methods', 'Bayesian Optimization', 'Python'],
        link: 'DOI: 10.1109/IDCIOT64235.2025.10914737'
    },
    'ipl': {
        title: 'IPL Match Outcome & Performance Forecasting',
        timeline: 'May 2025',
        gif: 'assets/ipl.gif',
        description: [
            'Hybrid ensemble using PyTorch MLP and XGBoost',
            'Player-level runs and wickets prediction',
            'Probabilistic match outcome estimation',
            'Two-stage stochastic simulation for forecasting'
        ],
        highlights: [
            'Combined deep learning and gradient boosting',
            'Developed player performance prediction models',
            'Implemented Monte Carlo simulation for match outcomes'
        ],
        tools: ['PyTorch', 'XGBoost', 'MLP', 'Ensemble Learning', 'Statistical Modeling']
    },
    'tictactoe': {
        title: 'Reinforcement Learning: Tic Tac Toe Agent (DQN)',
        timeline: 'Jun 2025',
        gif: 'assets/tic.gif',
        description: [
            'Self-learning agent using Deep Q-Networks',
            'Mastered Tic Tac Toe through gameplay',
            'Experience Replay implementation'
        ],
        highlights: [
            'Implemented DQN from scratch',
            'Achieved optimal play through self-play',
            'Explored epsilon-greedy exploration strategy'
        ],
        tools: ['Reinforcement Learning', 'DQN', 'Python', 'PyTorch', 'Q-Learning']
    },
    'captcha': {
        title: 'CAPTCHA Recognition System',
        timeline: 'Jul 2025',
        gif: 'assets/captcha.gif',
        description: [
            'CV-based character extraction and recognition',
            'Preprocessing pipeline using OpenCV',
            'Deep Learning for character classification'
        ],
        highlights: [
            'Developed end-to-end CAPTCHA solver',
            'Implemented image segmentation and character isolation',
            'Trained CNN for character recognition'
        ],
        tools: ['OpenCV', 'Deep Learning', 'CNN', 'Image Processing', 'Python']
    },
    'house': {
        title: 'House Price Prediction API',
        timeline: 'Aug 2025',
        gif: 'assets/house.gif',
        description: [
            'Regression models for price estimation',
            'Deployed as a RESTful API',
            'Scalable model serving'
        ],
        highlights: [
            'Built production-ready ML API',
            'Implemented feature engineering pipeline',
            'Deployed using FastAPI with model versioning'
        ],
        tools: ['Regression', 'FastAPI', 'REST API', 'Scikit-learn', 'Docker']
    },
    'spotify': {
        title: 'Spotify Analytics Dashboard',
        timeline: 'Sep 2025',
        gif: 'assets/spotify.gif',
        description: [
            'Data fetching via Spotify API',
            'MySQL database storage',
            'Interactive dashboard for music insights'
        ],
        highlights: [
            'Integrated Spotify Web API for data collection',
            'Built interactive visualization dashboard',
            'Implemented data pipeline with MySQL backend'
        ],
        tools: ['Spotify API', 'MySQL', 'Streamlit', 'Python', 'Data Visualization']
    }
};

// Main Scripts
document.addEventListener('DOMContentLoaded', () => {
    console.log("Portfolio Loaded");

    // Initialize Dynamic Backgrounds
    new DynamicBackground('hero-canvas', {
        particleCount: 60,
        baseColor: [59, 130, 246],
        maxSpeed: 0.3,
        particleSize: 2,
        connectionDistance: 120
    });

    new DynamicBackground('about-canvas', {
        particleCount: 40,
        baseColor: [160, 160, 160],
        maxSpeed: 0.2,
        particleSize: 1.5,
        connectionDistance: 100
    });

    new DynamicBackground('skills-canvas', {
        particleCount: 50,
        baseColor: [59, 130, 246],
        maxSpeed: 0.25,
        particleSize: 2,
        connectionDistance: 110
    });

    new DynamicBackground('projects-canvas', {
        particleCount: 35,
        baseColor: [100, 100, 100],
        maxSpeed: 0.15,
        particleSize: 1.5,
        connectionDistance: 90
    });

    // Experience section - 20% more particles than hero (60 * 1.2 = 72)
    new DynamicBackground('experience-canvas', {
        particleCount: 72,
        baseColor: [59, 130, 246],
        maxSpeed: 0.3,
        particleSize: 2,
        connectionDistance: 120
    });

    // Achievements section - 20% more particles than about (40 * 1.2 = 48)
    new DynamicBackground('achievements-canvas', {
        particleCount: 48,
        baseColor: [160, 160, 160],
        maxSpeed: 0.2,
        particleSize: 1.5,
        connectionDistance: 100
    });

    // Education section - 20% more particles than skills (50 * 1.2 = 60)
    new DynamicBackground('education-canvas', {
        particleCount: 60,
        baseColor: [59, 130, 246],
        maxSpeed: 0.25,
        particleSize: 2,
        connectionDistance: 110
    });


    // Project Modal Functionality
    const modal = document.getElementById('project-modal');
    const modalBody = document.getElementById('modal-body');
    const closeBtn = document.querySelector('.modal-close');
    const backdrop = document.querySelector('.modal-backdrop');

    function openProjectModal(projectId) {
        const project = projectData[projectId];
        if (!project) return;

        // Build modal content
        let content = `
            <img src="${project.gif}" alt="${project.title}">
            <h2>${project.title}</h2>
            <span class="modal-timeline">${project.timeline}</span>
            
            <h3>Project Overview</h3>
            <ul>
                ${project.description.map(item => `<li>${item}</li>`).join('')}
            </ul>
            
            <h3>Technical Highlights</h3>
            <ul>
                ${project.highlights.map(item => `<li>${item}</li>`).join('')}
            </ul>
            
            <ul class="modal-stats">
                ${project.tools.map(tool => `<li>${tool}</li>`).join('')}
            </ul>
        `;

        if (project.link) {
            content += `<p style="margin-top: 1.5rem; color: var(--accent); font-size: 0.9rem;">${project.link}</p>`;
        }

        modalBody.innerHTML = content;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeProjectModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Add click listeners to project cards
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('click', () => {
            const projectId = card.getAttribute('data-project');
            openProjectModal(projectId);
        });
    });

    // Close modal listeners
    closeBtn.addEventListener('click', closeProjectModal);
    backdrop.addEventListener('click', closeProjectModal);

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeProjectModal();
        }
    });

    // Contact Form Handler
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerText;

            // Set loading state
            submitBtn.innerText = 'Sending...';
            submitBtn.disabled = true;

            // Clear previous messages
            if (formMessage) {
                formMessage.textContent = 'Sending your message...';
                formMessage.className = 'loading';
                formMessage.style.display = 'block';
            }

            const formData = new FormData(contactForm);

            try {
                // Submit directly to Netlify form endpoint
                const response = await fetch('/', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    body: new URLSearchParams(formData).toString()
                });

                if (response.ok) {
                    // Success
                    if (formMessage) {
                        formMessage.textContent = 'Message sent successfully! I will get back to you soon.';
                        formMessage.className = 'success';
                    }
                    contactForm.reset();
                } else {
                    // Error
                    if (formMessage) {
                        formMessage.textContent = 'Failed to send message. Please try again.';
                        formMessage.className = 'error';
                    }
                }
            } catch (error) {
                console.error('Error:', error);
                if (formMessage) {
                    formMessage.textContent = 'An error occurred. Please check your connection and try again.';
                    formMessage.className = 'error';
                }
            } finally {
                // Reset button
                submitBtn.innerText = originalText;
                submitBtn.disabled = false;

                // Auto-hide success message after 5 seconds
                if (formMessage && formMessage.classList.contains('success')) {
                    setTimeout(() => {
                        formMessage.style.display = 'none';
                    }, 5000);
                }
            }
        });
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Scroll Animation Observer
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Target elements to animate
    const animatedElements = document.querySelectorAll('.section-title, .about-text, .about-details-card, .skill-card, .timeline-item, .project-card, .achievement-item, .edu-card, .cert-card, .contact-info, .contact-form');

    animatedElements.forEach(el => {
        el.classList.add('hidden');
        observer.observe(el);
    });
});
