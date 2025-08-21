// Carrossel de Produtos - Página Produtos
document.addEventListener('DOMContentLoaded', function() {
    const carousels = document.querySelectorAll('.products-carousel');
    
    carousels.forEach((carousel, carouselIndex) => {
        const carouselTrack = carousel.querySelector('.carousel-track');
        const prevBtn = carousel.querySelector('.prev-btn');
        const nextBtn = carousel.querySelector('.next-btn');
        const productCards = carousel.querySelectorAll('.product-card');
        
        if (carouselTrack && productCards.length > 0) {
            let currentIndex = 0;
            const cardWidth = 330; // 300px + 30px margin
            const totalCards = productCards.length;
            const originalCards = Math.floor(totalCards / 2); // Metade são duplicatas
            
            // Função para mover o carrossel
            function moveCarousel(direction) {
                if (direction === 'next') {
                    currentIndex++;
                    if (currentIndex >= originalCards) {
                        currentIndex = 0;
                    }
                } else {
                    currentIndex--;
                    if (currentIndex < 0) {
                        currentIndex = originalCards - 1;
                    }
                }
                
                const translateX = -currentIndex * cardWidth;
                carouselTrack.style.transform = `translateX(${translateX}px)`;
            }
            
            // Event listeners para os botões
            if (prevBtn) {
                prevBtn.addEventListener('click', () => {
                    carouselTrack.style.animationPlayState = 'paused';
                    moveCarousel('prev');
                    addExpandingAnimation();
                    setTimeout(() => {
                        carouselTrack.style.animationPlayState = 'running';
                    }, 1000);
                });
            }
            
            if (nextBtn) {
                nextBtn.addEventListener('click', () => {
                    carouselTrack.style.animationPlayState = 'paused';
                    moveCarousel('next');
                    addExpandingAnimation();
                    setTimeout(() => {
                        carouselTrack.style.animationPlayState = 'running';
                    }, 1000);
                });
            }

            // Função para adicionar animação de expansão nos produtos visíveis
            function addExpandingAnimation() {
                const visibleCards = Math.floor(carousel.offsetWidth / cardWidth);
                const startIndex = currentIndex;
                const endIndex = Math.min(startIndex + visibleCards, totalCards);
                
                productCards.forEach((card, index) => {
                    if (index >= startIndex && index < endIndex) {
                        card.classList.add('expanding');
                        setTimeout(() => {
                            card.classList.remove('expanding');
                        }, 600);
                    }
                });
            }
            
            // Event listeners para cliques nos produtos
            productCards.forEach(card => {
                card.addEventListener('click', function() {
                    const productType = this.getAttribute('data-product');
                    
                    // Animação de clique
                    this.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        this.style.transform = '';
                    }, 150);
                    
                    console.log('Produto clicado:', productType);
                    alert('Produto clicado: ' + productType + '\nRedirecionamento para a loja será implementado aqui.');
                });
            });
            
            // Pausar animação quando o mouse está sobre o carrossel
            carouselTrack.addEventListener('mouseenter', () => {
                carouselTrack.style.animationPlayState = 'paused';
            });
            
            carouselTrack.addEventListener('mouseleave', () => {
                carouselTrack.style.animationPlayState = 'running';
            });
        }
    });
}); 