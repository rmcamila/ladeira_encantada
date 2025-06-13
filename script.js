document.addEventListener('DOMContentLoaded', function() {
    const bondinhoInterativo = document.getElementById('bondinhoInterativo');
    const messageContainer = document.getElementById('messageContainer');
    const btnYes = document.getElementById('btnYes');
    const btnNo = document.getElementById('btnNo');
    const body = document.body;
    const positiveResponse = document.getElementById('positiveResponse');
    const negativeResponse = document.getElementById('negativeResponse');
    const closePositive = document.getElementById('closePositive');
    const closeNegative = document.getElementById('closeNegative');
    const fireworksCanvas = document.getElementById('fireworks');
    const brokenHearts = document.getElementById('brokenHearts');
    
    // Mostrar mensagem quando clicar no bondinho
    bondinhoInterativo.addEventListener('click', function() {
        this.style.display = 'none';
        messageContainer.style.display = 'block';
    });
    
    // Resposta positiva (fogos de artifício)
    btnYes.addEventListener('click', function(e) {
        e.stopPropagation();
        positiveResponse.classList.add('show');
        startFireworks();
    });
    
    // Resposta negativa (céu nublado + corações partidos)
    btnNo.addEventListener('click', function(e) {
        e.stopPropagation();
        body.classList.add('sad-mode');
        negativeResponse.classList.add('show');
        createBrokenHearts();
    });
    
    // Fechar modais
    closePositive.addEventListener('click', function(e) {
        e.stopPropagation();
        positiveResponse.classList.remove('show');
        stopFireworks();
    });
    
    closeNegative.addEventListener('click', function(e) {
        e.stopPropagation();
        negativeResponse.classList.remove('show');
        body.classList.remove('sad-mode');
    });
    
    // Fechar ao clicar fora
    window.addEventListener('click', function(e) {
        if (e.target === positiveResponse) {
            positiveResponse.classList.remove('show');
            stopFireworks();
        }
        if (e.target === negativeResponse) {
            negativeResponse.classList.remove('show');
            body.classList.remove('sad-mode');
        }
    });
    
    // Fogos de artifício
    function startFireworks() {
        fireworksCanvas.style.display = 'block';
        const ctx = fireworksCanvas.getContext('2d');
        fireworksCanvas.width = window.innerWidth;
        fireworksCanvas.height = window.innerHeight;
        
        // Configuração dos fogos
        const fireworks = [];
        const particles = [];
        
        class Firework {
            constructor() {
                this.x = Math.random() * fireworksCanvas.width;
                this.y = fireworksCanvas.height;
                this.targetY = Math.random() * fireworksCanvas.height * 0.6;
                this.speed = 2 + Math.random() * 3;
                this.radius = 2;
                this.color = `hsl(${Math.random() * 60 + 20}, 100%, 50%)`;
                this.alive = true;
            }
            
            update() {
                this.y -= this.speed;
                
                if (this.y <= this.targetY) {
                    this.explode();
                    this.alive = false;
                }
            }
            
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.fill();
            }
            
            explode() {
                for (let i = 0; i < 100; i++) {
                    particles.push(new Particle(this.x, this.y, this.color));
                }
            }
        }
        
        class Particle {
            constructor(x, y, color) {
                this.x = x;
                this.y = y;
                this.color = color;
                this.radius = 1 + Math.random() * 2;
                this.velocity = {
                    x: (Math.random() - 0.5) * 8,
                    y: (Math.random() - 0.5) * 8
                };
                this.alpha = 1;
                this.decay = 0.015 + Math.random() * 0.02;
            }
            
            update() {
                this.velocity.y += 0.05;
                this.x += this.velocity.x;
                this.y += this.velocity.y;
                this.alpha -= this.decay;
            }
            
            draw() {
                ctx.globalAlpha = this.alpha;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.fill();
                ctx.globalAlpha = 1;
            }
        }
        
        function loop() {
            requestAnimationFrame(loop);
            ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
            ctx.fillRect(0, 0, fireworksCanvas.width, fireworksCanvas.height);
            
            if (Math.random() < 0.05) {
                fireworks.push(new Firework());
            }
            
            for (let i = fireworks.length - 1; i >= 0; i--) {
                fireworks[i].update();
                fireworks[i].draw();
                
                if (!fireworks[i].alive) {
                    fireworks.splice(i, 1);
                }
            }
            
            for (let i = particles.length - 1; i >= 0; i--) {
                particles[i].update();
                particles[i].draw();
                
                if (particles[i].alpha <= 0) {
                    particles.splice(i, 1);
                }
            }
        }
        
        loop();
    }
    
    function stopFireworks() {
        fireworksCanvas.style.display = 'none';
    }
    
    // Corações partidos
    function createBrokenHearts() {
        brokenHearts.style.display = 'block';
        brokenHearts.innerHTML = '';
        
        const heartSymbols = ['💔', '😢', '💔', '😞', '💔'];
        
        for (let i = 0; i < 20; i++) {
            const heart = document.createElement('div');
            heart.className = 'broken-heart';
            heart.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
            heart.style.left = Math.random() * 100 + 'vw';
            heart.style.animationDuration = 3 + Math.random() * 3 + 's';
            brokenHearts.appendChild(heart);
        }
        
        setTimeout(() => {
            brokenHearts.style.display = 'none';
        }, 4000);
    }
});
