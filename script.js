// Script para controlar o slider de depoimentos
document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.testimonials-slider');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const testimonials = document.querySelectorAll('.testimonial');
    
    let currentIndex = 0;
    const testimonialWidth = slider.clientWidth;
    
    // Configurar o slider para mostrar o primeiro depoimento
    updateSlider();
    
    // Botão próximo
    nextBtn.addEventListener('click', function() {
        if (currentIndex < testimonials.length - 1) {
            currentIndex++;
            updateSlider();
        } else {
            // Voltar para o primeiro depoimento quando chegar ao final
            currentIndex = 0;
            updateSlider();
        }
    });
    
    // Botão anterior
    prevBtn.addEventListener('click', function() {
        if (currentIndex > 0) {
            currentIndex--;
            updateSlider();
        } else {
            // Ir para o último depoimento quando estiver no primeiro
            currentIndex = testimonials.length - 1;
            updateSlider();
        }
    });
    
    // Função para atualizar a posição do slider
    function updateSlider() {
        const scrollPosition = currentIndex * (testimonialWidth + 32); // 32px é o gap entre os depoimentos
        slider.scrollTo({
            left: scrollPosition,
            behavior: 'smooth'
        });
    }
    
    // Ajustar o slider quando a janela for redimensionada
    window.addEventListener('resize', function() {
        const newTestimonialWidth = slider.clientWidth;
        if (newTestimonialWidth !== testimonialWidth) {
            updateSlider();
        }
    });
    
    // Auto-rotação dos depoimentos a cada 5 segundos
    setInterval(function() {
        if (currentIndex < testimonials.length - 1) {
            currentIndex++;
        } else {
            currentIndex = 0;
        }
        updateSlider();
    }, 5000);
});

// Efeito de rolagem suave para links de âncora
document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    for (const link of links) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // 80px de offset para o cabeçalho fixo
                    behavior: 'smooth'
                });
            }
        });
    }
});

// Efeito de revelação ao rolar
document.addEventListener('DOMContentLoaded', function() {
    const revealElements = document.querySelectorAll('.benefit-card, .content-item, .for-who-item, .faq-item, .testimonial');
    
    function checkReveal() {
        const windowHeight = window.innerHeight;
        const revealPoint = 150;
        
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < windowHeight - revealPoint) {
                element.classList.add('revealed');
            }
        });
    }
    
    // Adicionar classe CSS para animação
    const style = document.createElement('style');
    style.textContent = `
        .benefit-card, .content-item, .for-who-item, .faq-item, .testimonial {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .revealed {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
    
    // Verificar elementos ao carregar a página
    window.addEventListener('load', checkReveal);
    
    // Verificar elementos ao rolar a página
    window.addEventListener('scroll', checkReveal);
});

// Contador de tempo limitado (efeito de urgência)
document.addEventListener('DOMContentLoaded', function() {
    // Adicionar elemento de contagem regressiva após o título da seção de preços
    const pricingTitle = document.querySelector('.pricing .section-title');
    
    if (pricingTitle) {
        const countdownContainer = document.createElement('div');
        countdownContainer.className = 'countdown-container';
        countdownContainer.innerHTML = `
            <p class="countdown-text">Oferta por tempo limitado! Termina em:</p>
            <div class="countdown">
                <div class="countdown-item">
                    <span id="countdown-hours">24</span>
                    <span class="countdown-label">Horas</span>
                </div>
                <div class="countdown-item">
                    <span id="countdown-minutes">00</span>
                    <span class="countdown-label">Minutos</span>
                </div>
                <div class="countdown-item">
                    <span id="countdown-seconds">00</span>
                    <span class="countdown-label">Segundos</span>
                </div>
            </div>
        `;
        
        pricingTitle.insertAdjacentElement('afterend', countdownContainer);
        
        // Adicionar estilos para o contador
        const style = document.createElement('style');
        style.textContent = `
            .countdown-container {
                text-align: center;
                margin-bottom: 2rem;
            }
            
            .countdown-text {
                font-size: 1.2rem;
                font-weight: 600;
                color: var(--primary-color);
                margin-bottom: 1rem;
            }
            
            .countdown {
                display: flex;
                justify-content: center;
                gap: 1rem;
            }
            
            .countdown-item {
                background: var(--primary-gradient);
                color: white;
                padding: 1rem;
                border-radius: var(--border-radius);
                min-width: 80px;
                text-align: center;
            }
            
            .countdown-item span {
                display: block;
            }
            
            .countdown-item span:first-child {
                font-size: 2rem;
                font-weight: 700;
            }
            
            .countdown-label {
                font-size: 0.9rem;
                margin-top: 0.5rem;
            }
            
            @media (max-width: 576px) {
                .countdown {
                    gap: 0.5rem;
                }
                
                .countdown-item {
                    min-width: 60px;
                    padding: 0.8rem;
                }
                
                .countdown-item span:first-child {
                    font-size: 1.5rem;
                }
            }
        `;
        document.head.appendChild(style);
        
        // Iniciar contagem regressiva
        let hours = 24;
        let minutes = 0;
        let seconds = 0;
        
        const hoursElement = document.getElementById('countdown-hours');
        const minutesElement = document.getElementById('countdown-minutes');
        const secondsElement = document.getElementById('countdown-seconds');
        
        function updateCountdown() {
            if (seconds > 0) {
                seconds--;
            } else {
                if (minutes > 0) {
                    minutes--;
                    seconds = 59;
                } else {
                    if (hours > 0) {
                        hours--;
                        minutes = 59;
                        seconds = 59;
                    } else {
                        // Reiniciar contagem quando chegar a zero
                        hours = 24;
                        minutes = 0;
                        seconds = 0;
                    }
                }
            }
            
            hoursElement.textContent = hours.toString().padStart(2, '0');
            minutesElement.textContent = minutes.toString().padStart(2, '0');
            secondsElement.textContent = seconds.toString().padStart(2, '0');
        }
        
        // Atualizar a cada segundo
        setInterval(updateCountdown, 1000);
    }
});

// Efeito de cabeçalho fixo com mudança de estilo ao rolar
document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('.header');
    
    function updateHeader() {
        if (window.scrollY > 100) {
            header.classList.add('header-scrolled');
        } else {
            header.classList.remove('header-scrolled');
        }
    }
    
    // Adicionar estilos para o cabeçalho ao rolar
    const style = document.createElement('style');
    style.textContent = `
        .header {
            transition: all 0.3s ease;
        }
        
        .header-scrolled {
            padding: 0.7rem 0;
            box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
            background-color: rgba(255, 255, 255, 0.95);
        }
    `;
    document.head.appendChild(style);
    
    // Verificar posição ao carregar a página
    window.addEventListener('load', updateHeader);
    
    // Verificar posição ao rolar a página
    window.addEventListener('scroll', updateHeader);
});

// Botão de voltar ao topo
document.addEventListener('DOMContentLoaded', function() {
    // Criar botão de voltar ao topo
    const backToTopBtn = document.createElement('button');
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    document.body.appendChild(backToTopBtn);
    
    // Adicionar estilos para o botão
    const style = document.createElement('style');
    style.textContent = `
        .back-to-top {
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: var(--primary-gradient);
            color: white;
            border: none;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.2rem;
            box-shadow: 0 3px 10px rgba(230, 92, 0, 0.3);
            z-index: 999;
            opacity: 0;
            visibility: hidden;
            transform: translateY(20px);
            transition: all 0.3s ease;
        }
        
        .back-to-top.visible {
            opacity: 1;
            visibility: visible;
            transform: translateY(0);
        }
        
        .back-to-top:hover {
            transform: translateY(-5px);
            box-shadow: 0 5px 15px rgba(230, 92, 0, 0.4);
        }
        
        @media (max-width: 576px) {
            .back-to-top {
                bottom: 20px;
                right: 20px;
                width: 40px;
                height: 40px;
                font-size: 1rem;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Mostrar/ocultar botão com base na posição de rolagem
    function toggleBackToTopBtn() {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    }
    
    // Função para rolar para o topo
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Verificar posição ao carregar a página
    window.addEventListener('load', toggleBackToTopBtn);
    
    // Verificar posição ao rolar a página
    window.addEventListener('scroll', toggleBackToTopBtn);
});

// Expandir/recolher itens de FAQ
document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    // Modificar estrutura dos itens de FAQ
    faqItems.forEach(item => {
        const question = item.querySelector('h3');
        const answer = item.querySelector('p');
        
        // Adicionar ícone de seta
        question.innerHTML += '<i class="fas fa-chevron-down"></i>';
        
        // Esconder respostas inicialmente
        answer.style.display = 'none';
        
        // Adicionar classe para estilização
        item.classList.add('faq-collapsed');
        
        // Adicionar evento de clique
        question.addEventListener('click', function() {
            item.classList.toggle('faq-collapsed');
            item.classList.toggle('faq-expanded');
            
            if (answer.style.display === 'none') {
                answer.style.display = 'block';
            } else {
                answer.style.display = 'none';
            }
        });
    });
    
    // Adicionar estilos para os itens de FAQ
    const style = document.createElement('style');
    style.textContent = `
        .faq-item {
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .faq-item h3 {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .faq-item h3 i {
            transition: transform 0.3s ease;
        }
        
        .faq-expanded h3 i {
            transform: rotate(180deg);
        }
        
        .faq-item p {
            margin-top: 1rem;
            padding-top: 1rem;
            border-top: 1px solid #eee;
        }
        
        .faq-expanded {
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
            transform: translateY(-5px);
        }
    `;
    document.head.appendChild(style);
});
