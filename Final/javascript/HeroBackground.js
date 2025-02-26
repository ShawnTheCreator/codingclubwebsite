class Particle {
    constructor(container) {
        this.container = container;
        this.element = document.createElement('div');
        this.element.className = 'particle';
        this.size = Math.random() * 200 + 100; // Random size between 100-300px
        this.position = {
            x: Math.random() * 100,
            y: Math.random() * 100
        };
        this.offset = {
            x: 0,
            y: 0
        };
        this.speed = {
            x: (Math.random() - 0.5) * 0.2,
            y: (Math.random() - 0.5) * 0.2,
            rotation: (Math.random() - 0.5) * 0.1
        };
        this.rotation = 0;
        this.init();
    }

    init() {
        this.element.style.width = `${this.size}px`;
        this.element.style.height = `${this.size}px`;
        this.element.style.left = `${this.position.x}%`;
        this.element.style.top = `${this.position.y}%`;
        this.container.appendChild(this.element);
    }

    update() {
        // Update position and rotation
        this.offset.x += this.speed.x;
        this.offset.y += this.speed.y;
        this.rotation += this.speed.rotation;

        // Create smooth circular motion
        const radius = 20;
        const circularX = Math.sin(this.offset.x) * radius;
        const circularY = Math.cos(this.offset.y) * radius;

        // Apply transforms for smooth animation
        this.element.style.transform = `
            translate(${circularX}px, ${circularY}px)
            rotate(${this.rotation}deg)
        `;
    }
}

class ParticleSystem {
    constructor() {
        this.container = document.getElementById('particles');
        this.particles = [];
        this.init();
        this.animate();
    }

    init() {
        // Create particles
        const numParticles = 20; 
        for (let i = 0; i < numParticles; i++) {
            this.particles.push(new Particle(this.container));
        }
    }

    animate() {
        // Update all particles
        this.particles.forEach(particle => particle.update());
        
        // Continue animation loop
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize particle system when page loads
window.addEventListener('load', () => {
    new ParticleSystem();
});

// Optional: Add mouse interaction
document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    document.querySelector('.gradient-overlay').style.background = 
        `radial-gradient(circle at ${mouseX * 100}% ${mouseY * 100}%, 
        rgba(0, 102, 255, 0.1), transparent 50%)`;
});
