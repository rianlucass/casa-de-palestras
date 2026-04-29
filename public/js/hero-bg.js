// hero-bg.js — Dual Canvas: Microfone (esq) + Conteúdo Digital (dir)
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('heroDualCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    let width, height, centerX;
    function resize() {
        width  = canvas.width  = window.innerWidth;
        height = canvas.height = window.innerHeight;
        centerX = width / 2;
    }
    window.addEventListener('resize', resize);
    resize();

    // Material Design 24×24 paths
    // Microfone — Casa de Palestras
    const micPath = new Path2D(
        'M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z' +
        'M17.91 11c-.49 0-.9.36-.98.85C16.52 14.2 14.47 16 12 16s-4.52-1.8-4.93-4.15' +
        'c-.08-.49-.49-.85-.98-.85-.61 0-1.09.54-1 1.14.49 3 2.89 5.35 5.91 5.78V20' +
        'c0 .55.45 1 1 1s1-.45 1-1v-2.08c3.02-.43 5.42-2.78 5.91-5.78.1-.6-.39-1.14-1-1.14z'
    );
    // Play — Casa de Conteúdo (variante 1)
    const playPath = new Path2D('M8 5v14l11-7z');
    // Estrela — Casa de Conteúdo (variante 2)
    const starPath = new Path2D(
        'M12 2l2.09 6.26H21l-5.47 3.97 2.09 6.26L12 14.54l-5.62 3.95 2.09-6.26L3 8.26h6.91z'
    );

    class DualParticle {
        constructor(side) {
            this.side = side; // 'mic' | 'content'
            this.reset(true);
        }

        reset(initial = false) {
            if (this.side === 'mic') {
                this.baseX = 20 + Math.random() * (centerX - 60);
                // Laranja e Rosa para combinar
                this.color = Math.random() > 0.6 ? '#f4842f' : '#ec4899'; 
                this.path  = micPath;
            } else {
                this.baseX = centerX + 40 + Math.random() * (width - centerX - 60);
                // Tons de Rosa, Roxo e Azul
                const r = Math.random();
                if (r > 0.7) {
                    this.color = '#ec4899'; // Rosa (Secondary)
                } else if (r > 0.4) {
                    this.color = '#a855f7'; // Roxo
                } else {
                    this.color = '#38b6ff'; // Azul
                }
                this.path  = Math.random() > 0.5 ? playPath : starPath;
            }
            this.x           = this.baseX;
            this.y           = initial ? Math.random() * height : height + 30;
            this.speedY      = 0.45 + Math.random() * 1.2; // Aumentado um pouco
            this.scale       = 0.6 + Math.random() * 1.0;
            this.opacity     = 0.1 + Math.random() * 0.35; // Mais visível
            this.wobblePhase = Math.random() * Math.PI * 2;
            this.wobbleSpeed = 0.015 + Math.random() * 0.03;
            this.wobbleAmp   = 10 + Math.random() * 20; // Mais movimento horizontal
        }

        update() {
            this.y -= this.speedY;
            this.wobblePhase += this.wobbleSpeed;
            this.x = this.baseX + Math.sin(this.wobblePhase) * this.wobbleAmp;
            if (this.y < -30) this.reset(false);
        }

        draw(ctx) {
            let alpha = this.opacity;
            // fade vertical
            if (this.y > height - 80) alpha *= (height - this.y) / 80;
            else if (this.y < 80)     alpha *= this.y / 80;
            // fade de convergência ao centro
            const distToCenter = Math.abs(this.x - centerX);
            if (distToCenter < 90) alpha *= distToCenter / 90;

            if (alpha <= 0.005) return;

            ctx.save();
            ctx.globalAlpha = Math.min(1, alpha);
            ctx.fillStyle   = this.color;
            ctx.translate(this.x, this.y);
            ctx.scale(this.scale, this.scale);
            ctx.translate(-12, -12); // centraliza ícone 24×24
            ctx.fill(this.path);
            ctx.restore();
        }
    }

    const particles = [
        ...Array.from({ length: 12 }, () => new DualParticle('mic')),
        ...Array.from({ length: 12 }, () => new DualParticle('content')),
    ];

    function animate() {
        ctx.clearRect(0, 0, width, height);
        particles.forEach(p => { p.update(); p.draw(ctx); });
        requestAnimationFrame(animate);
    }

    animate();
});
