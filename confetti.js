// confetti.js

class Confetti {
    constructor() {
        this.canvas = document.getElementById('confetti-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.colors = ['#4299e1', '#48bb78', '#f6e05e', '#ed64a6', '#f56565', '#9f7aea'];
        this.isAnimating = false;
        
        this.resize();
        window.addEventListener('resize', () => this.resize());
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    start() {
        this.particles = [];
        for(let i = 0; i < 150; i++) {
            this.particles.push(this.createParticle());
        }
        
        if (!this.isAnimating) {
            this.isAnimating = true;
            this.animate();
        }
    }
    
    stop() {
        this.particles = [];
        this.isAnimating = false;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    
    createParticle() {
        return {
            x: Math.random() * this.canvas.width,
            y: Math.random() * this.canvas.height - this.canvas.height,
            size: Math.random() * 10 + 5,
            color: this.colors[Math.floor(Math.random() * this.colors.length)],
            speedY: Math.random() * 3 + 2,
            speedX: Math.random() * 2 - 1,
            rotation: Math.random() * 360,
            rotationSpeed: Math.random() * 10 - 5
        };
    }
    
    animate() {
        if (!this.isAnimating) return;
        
        requestAnimationFrame(() => this.animate());
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        let activeParticles = false;
        
        for (let p of this.particles) {
            p.y += p.speedY;
            p.x += p.speedX;
            p.rotation += p.rotationSpeed;
            
            if (p.y < this.canvas.height) {
                activeParticles = true;
                
                this.ctx.save();
                this.ctx.translate(p.x, p.y);
                this.ctx.rotate(p.rotation * Math.PI / 180);
                this.ctx.fillStyle = p.color;
                this.ctx.fillRect(-p.size/2, -p.size/2, p.size, p.size);
                this.ctx.restore();
            }
        }
        
        if (!activeParticles) {
            this.isAnimating = false;
        }
    }
}

const confetti = new Confetti();
