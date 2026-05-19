document.addEventListener('DOMContentLoaded', () => {
    const nav = document.getElementById('nav');
    const fades = document.querySelectorAll('.fade');
    const avatarImg = document.getElementById('avatarImg');
    const canvas = document.getElementById('particles');
    const ctx = canvas.getContext('2d');

    /* Avatar - use Roblox legacy endpoint */
    avatarImg.src = 'https://www.roblox.com/headshot-thumbnail/image?userId=5662903226&width=48&height=48&format=png';
    avatarImg.onerror = function() {
        this.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><circle cx="24" cy="18" r="10" fill="%23333"/><ellipse cx="24" cy="42" rx="16" ry="12" fill="%23333"/></svg>';
    };

    /* Scroll animations */
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -30px 0px' });

    fades.forEach(el => observer.observe(el));

    window.addEventListener('scroll', () => {
        nav.classList.toggle('scrolled', window.scrollY > 40);
    });

    /* Particles */
    let particles = [];
    let mouseX = -1000;
    let mouseY = -1000;

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        for (let i = 0; i < 3; i++) {
            particles.push({
                x: mouseX + (Math.random() - 0.5) * 10,
                y: mouseY + (Math.random() - 0.5) * 10,
                size: Math.random() * 2 + 0.5,
                alpha: 0.8,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5 - 0.3
            });
        }
    });

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles = particles.filter(p => p.alpha > 0.01);
        for (const p of particles) {
            p.x += p.vx;
            p.y += p.vy;
            p.alpha -= 0.012;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`;
            ctx.fill();
        }
        requestAnimationFrame(animateParticles);
    }
    animateParticles();
});
