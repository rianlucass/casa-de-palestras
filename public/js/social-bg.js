function initSocialCanvas() {
    const canvas = document.getElementById("socialCanvas");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    let width, height;
    function resize() {
        width  = canvas.width  = canvas.offsetWidth;
        height = canvas.height = canvas.offsetHeight;
    }
    window.addEventListener("resize", resize);
    resize();

    // Coracao (Like)
    const heartPath = new Path2D("M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z");
    // Joinha / Thumbs Up (Material Design)
    const thumbPath = new Path2D("M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z");

    const types = [
        { path: heartPath, color: "#ED1C24" }, // Vermelho Instagram
        { path: heartPath, color: "#ff4757" }, // Vermelho claro
        { path: heartPath, color: "#c0392b" }, // Vermelho escuro
        { path: thumbPath, color: "#1877F2" }, // Azul Facebook
        { path: thumbPath, color: "#4a90d9" }, // Azul claro
        { path: thumbPath, color: "#0d5fbe" }, // Azul escuro
    ];

    class SocialParticle {
        constructor() {
            this.reset(true);
        }

        reset(initial) {
            const type   = types[Math.floor(Math.random() * types.length)];
            this.path    = type.path;
            this.color   = type.color;
            this.baseX   = 40 + Math.random() * (width - 80);
            this.y       = initial ? Math.random() * height : height + 40;
            this.speedY  = 0.4 + Math.random() * 1.0;
            this.scale   = 0.5 + Math.random() * 0.9;
            this.opacity = 0.12 + Math.random() * 0.18; // leve — fundo claro
            this.wobblePhase = Math.random() * Math.PI * 2;
            this.wobbleSpeed = 0.008 + Math.random() * 0.016;
            this.wobbleAmp   = 12 + Math.random() * 28;
        }

        update() {
            this.y -= this.speedY;
            this.wobblePhase += this.wobbleSpeed;
            this.x = this.baseX + Math.sin(this.wobblePhase) * this.wobbleAmp;
            if (this.y < -50) this.reset(false);
        }

        draw(c) {
            let alpha = this.opacity;
            if (this.y > height - 80) alpha *= (height - this.y) / 80;
            else if (this.y < 80)     alpha *= this.y / 80;
            if (alpha <= 0.005) return;

            c.save();
            c.globalAlpha = alpha;
            c.fillStyle   = this.color;
            c.shadowBlur  = 0; // sem glow no claro
            c.translate(this.x, this.y);
            c.scale(this.scale, this.scale);
            c.translate(-12, -12);
            c.fill(this.path);
            c.restore();
        }
    }

    const particles = Array.from({ length: 45 }, () => new SocialParticle());

    function animate() {
        ctx.clearRect(0, 0, width, height);
        particles.forEach(p => { p.update(); p.draw(ctx); });
        requestAnimationFrame(animate);
    }

    animate();
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initSocialCanvas);
} else {
    initSocialCanvas();
}