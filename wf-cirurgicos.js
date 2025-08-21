// Menu mobile
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Fechar menu ao clicar em um link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Funcionalidade de swipe para fechar o menu no mobile
let startX = 0;
let currentX = 0;
let isDragging = false;

// Detectar início do toque
navMenu.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    isDragging = true;
});

// Detectar movimento do toque
navMenu.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    
    currentX = e.touches[0].clientX;
    const diffX = startX - currentX;
    
    // Se arrastou para a direita (fechar menu)
    if (diffX < -50) {
        // Aplicar transformação visual
        navMenu.style.transform = `translateX(${diffX}px)`;
    }
});

// Detectar fim do toque
navMenu.addEventListener('touchend', (e) => {
    if (!isDragging) return;
    
    const diffX = startX - currentX;
    
    // Se arrastou para a direita mais de 100px, fechar o menu
    if (diffX < -100) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        navMenu.style.transform = '';
    } else {
        // Voltar ao estado normal
        navMenu.style.transform = '';
    }
    
    isDragging = false;
});

// Adicionar indicador visual de swipe
const swipeIndicator = document.createElement('div');
swipeIndicator.style.cssText = `
    position: absolute;
    top: 50%;
    left: 10px;
    transform: translateY(-50%);
    width: 4px;
    height: 40px;
    background: linear-gradient(45deg, #1e40af, #3b82f6);
    border-radius: 2px;
    opacity: 0.7;
    pointer-events: none;
    z-index: 1000;
`;
swipeIndicator.innerHTML = '<div style="width: 100%; height: 100%; background: linear-gradient(45deg, #1e40af, #3b82f6); border-radius: 2px;"></div>';

// Mostrar indicador apenas no mobile
if (window.innerWidth <= 768) {
    navMenu.appendChild(swipeIndicator);
}

// Smooth scroll para links internos - DESABILITADO
// document.querySelectorAll('a[href^="#"]').forEach(anchor => {
//     anchor.addEventListener('click', function (e) {
//         e.preventDefault();
//         const target = document.querySelector(this.getAttribute('href'));
//         if (target) {
//             target.scrollIntoView({
//                 behavior: 'smooth',
//                 block: 'start'
//             });
//         }
//     });
// });



// Header transparente no scroll - DESABILITADO
// window.addEventListener('scroll', () => {
//     const header = document.querySelector('.header');
//     if (window.scrollY > 100) {
//         header.style.background = 'rgba(255, 255, 255, 0.98)';
//     } else {
//         header.style.background = 'rgba(255, 255, 255, 0.95)';
//     }
// });

// Animação de entrada dos elementos - DESABILITADO
// const observerOptions = {
//     threshold: 0.1,
//     rootMargin: '0px 0px -50px 0px'
// };

// const observer = new IntersectionObserver((entries) => {
//     entries.forEach(entry => {
//         if (entry.isIntersecting) {
//             entry.target.style.opacity = '1';
//             entry.target.style.transform = 'translateY(0)';
//         }
//     });
// }, observerOptions);

// Observar elementos para animação - DESABILITADO
// document.addEventListener('DOMContentLoaded', () => {
//     const animatedElements = document.querySelectorAll('.service-card, .feature-card, .testimonial-card, .product-category, .about-content, .ecommerce-content');
//     
//     animatedElements.forEach(el => {
//         // Garantir que os elementos sejam visíveis por padrão
//         el.style.opacity = '1';
//         el.style.transform = 'translateY(0)';
//         el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
//         // observer.observe(el); // Desabilitado temporariamente
//     });
// });



// Formulário de contato
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Simular envio do formulário
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Enviando...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
            contactForm.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// Contador animado para estatísticas
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

// Animar contadores quando visíveis
const statNumbers = document.querySelectorAll('.stat-number');
const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = parseInt(entry.target.textContent.replace(/\D/g, ''));
            animateCounter(entry.target, target);
            statObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

statNumbers.forEach(stat => {
    statObserver.observe(stat);
});

// Adicionar efeito de hover nos cards - DESABILITADO
// document.querySelectorAll('.service-card, .feature-card, .testimonial-card').forEach(card => {
//     card.addEventListener('mouseenter', () => {
//         card.style.transform = 'translateY(-10px)';
//     });
//     
//     card.addEventListener('mouseleave', () => {
//         card.style.transform = 'translateY(0)';
//     });
// });

// Loading suave da página - DESABILITADO
// window.addEventListener('load', () => {
//     document.body.style.opacity = '0';
//     document.body.style.transition = 'opacity 0.5s ease';
//     
//     setTimeout(() => {
//         document.body.style.opacity = '1';
//     }, 100);
// });

// Botão "Voltar ao topo"
const backToTopBtn = document.createElement('button');
backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
backToTopBtn.className = 'back-to-top';
backToTopBtn.style.cssText = `
    position: fixed;
    bottom: 80px;
    right: 20px;
    width: 50px;
    height: 50px;
    background: #1e40af;
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    display: none;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    z-index: 1000;
    transition: all 0.3s ease;
    box-shadow: 0 5px 15px rgba(30, 64, 175, 0.3);
`;

document.body.appendChild(backToTopBtn);

// Mostrar/ocultar botão "Voltar ao topo"
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopBtn.style.display = 'flex';
    } else {
        backToTopBtn.style.display = 'none';
    }
});

// Funcionalidade do botão "Voltar ao topo"
backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Efeito de hover no botão "Voltar ao topo"
backToTopBtn.addEventListener('mouseenter', () => {
    backToTopBtn.style.transform = 'translateY(-3px)';
    backToTopBtn.style.boxShadow = '0 8px 25px rgba(30, 64, 175, 0.4)';
});

backToTopBtn.addEventListener('mouseleave', () => {
    backToTopBtn.style.transform = 'translateY(0)';
    backToTopBtn.style.boxShadow = '0 5px 15px rgba(30, 64, 175, 0.3)';
});

// Validação de formulário em tempo real
const formInputs = document.querySelectorAll('.contact-form input, .contact-form textarea, .contact-form select');

formInputs.forEach(input => {
    input.addEventListener('blur', () => {
        if (input.value.trim() === '') {
            input.style.borderColor = '#ef4444';
        } else {
            input.style.borderColor = '#10b981';
        }
    });
    
    input.addEventListener('input', () => {
        if (input.value.trim() !== '') {
            input.style.borderColor = '#1e40af';
        }
    });
});

// Adicionar classe ativa no menu de navegação baseado na seção atual
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Adicionar estilo para link ativo
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: #1e40af !important;
    }
    .nav-link.active::after {
        width: 100% !important;
    }
`;
document.head.appendChild(style);

// Efeito de parallax suave no hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Animar elementos quando entram na viewport
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.service-card, .feature-card, .testimonial-card');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('animate');
        }
    });
};

window.addEventListener('scroll', animateOnScroll);

// Adicionar classe CSS para animação
const animationStyle = document.createElement('style');
animationStyle.textContent = `
    .service-card,
    .feature-card,
    .testimonial-card {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease;
    }
    
    .service-card.animate,
    .feature-card.animate,
    .testimonial-card.animate {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(animationStyle);

// Efeito de hover nos botões
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mouseenter', () => {
        btn.style.transform = 'translateY(-2px)';
    });
    
    btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translateY(0)';
    });
});

// Lazy loading para imagens (se houver)
const images = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
        }
    });
});

images.forEach(img => imageObserver.observe(img));

// Preloader (opcional)
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }
});

// Timeline animations
const timeline = document.querySelector('.timeline');
if (timeline) {
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                
                // Animar cada item da timeline sequencialmente
                const timelineItems = entry.target.querySelectorAll('.timeline-item');
                timelineItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.classList.add('animate');
                        
                        // Animar o ano
                        const yearElement = item.querySelector('.timeline-year');
                        if (yearElement) {
                            setTimeout(() => {
                                yearElement.classList.add('animate');
                            }, 500);
                        }
                        
                        // Animar o conteúdo
                        const contentElement = item.querySelector('.timeline-content');
                        if (contentElement) {
                            setTimeout(() => {
                                contentElement.classList.add('animate');
                            }, 1200);
                        }
                    }, index * 1000);
                });
                
                timelineObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    timelineObserver.observe(timeline);
}

// Console log para debug
console.log('WF Cirúrgicos - Site carregado com sucesso!');

// Floating Animation Controller
const floatingAnimation = () => {
    const floatingItems = document.querySelectorAll('.floating-item');
    let currentIndex = 0;
    let isAnimating = false;
    
    const showItem = (index) => {
        if (isAnimating) return;
        isAnimating = true;
        
        // Esconder todos os itens
        floatingItems.forEach(item => {
            item.classList.remove('active');
            item.style.animation = 'float 3s ease-in-out infinite';
        });
        
        // Mostrar o item atual
        const currentItem = floatingItems[index];
        currentItem.classList.add('active');
        
        setTimeout(() => {
            isAnimating = false;
        }, 500);
    };
    
    const hideItem = (index) => {
        const currentItem = floatingItems[index];
        currentItem.style.animation = 'fallAndRise 1.5s ease-out forwards';
        
        setTimeout(() => {
            currentItem.classList.remove('active');
            currentItem.style.animation = 'float 3s ease-in-out infinite';
        }, 1500);
    };
    
    const nextItem = () => {
        if (isAnimating) return;
        
        // Esconder item atual
        hideItem(currentIndex);
        
        // Avançar para o próximo item
        setTimeout(() => {
            currentIndex = (currentIndex + 1) % floatingItems.length;
            showItem(currentIndex);
        }, 1500);
    };
    
    // Iniciar animação após 3 segundos
    setTimeout(() => {
        showItem(0);
        
        // Trocar itens a cada 6 segundos
        setInterval(() => {
            nextItem();
        }, 6000);
    }, 3000);
};

// Inicializar animação flutuante
if (document.querySelector('.floating-animation')) {
    floatingAnimation();
}

// Forçar posição da logo flutuante baseada no tamanho da tela
const forceFloatingLogoPosition = () => {
    const floatingAnimation = document.querySelector('.floating-animation');
    const floatingAnimationSimple = document.querySelector('.floating-animation-simple');
    
    if (!floatingAnimation && !floatingAnimationSimple) return;
    
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    console.log(`Tela detectada: ${width}x${height}`);
    
    // Regras específicas para diferentes tamanhos de tela
    if (width <= 400 && height <= 628) {
        // Tela 400x628px
        if (floatingAnimation) {
            floatingAnimation.style.top = '200px';
            floatingAnimation.style.position = 'absolute';
            floatingAnimation.style.zIndex = '999';
            console.log('Aplicada regra para 400x628px');
        }
        if (floatingAnimationSimple) {
            floatingAnimationSimple.style.top = '200px';
            floatingAnimationSimple.style.position = 'absolute';
            floatingAnimationSimple.style.zIndex = '999';
        }
    } else if (width <= 412 && height <= 915) {
        // Tela 412x915px
        if (floatingAnimation) {
            floatingAnimation.style.top = '200px';
            floatingAnimation.style.position = 'absolute';
            floatingAnimation.style.zIndex = '999';
            console.log('Aplicada regra para 412x915px');
        }
        if (floatingAnimationSimple) {
            floatingAnimationSimple.style.top = '200px';
            floatingAnimationSimple.style.position = 'absolute';
            floatingAnimationSimple.style.zIndex = '999';
        }
    }
};

// Executar quando a página carregar
document.addEventListener('DOMContentLoaded', forceFloatingLogoPosition);

// Executar quando a tela for redimensionada
window.addEventListener('resize', forceFloatingLogoPosition); 