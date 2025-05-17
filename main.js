// Рендеринг популярных игр на главной
function renderFeaturedGames() {
    const container = document.getElementById('featured-games');
    const featuredGames = window.games.filter(game => game.isTop || game.isNew).slice(0, 3);

    container.innerHTML = featuredGames.map(game => `
        <div class="game-card" data-id="${game.id}" onclick="window.location.href='product.html?id=${game.id}'">
            ${game.isNew ? '<div class="game-badge new">Новинка</div>' : ''}
            ${game.isTop ? '<div class="game-badge top">Топ</div>' : ''}
            <img src="${game.image}" alt="${game.title}" loading="lazy">
            <div class="game-info">
                <h3>${game.title}</h3>
                <div class="game-meta">
                    <span class="game-price">${game.price.toLocaleString()} ₽</span>
                    <button class="btn" onclick="event.stopPropagation(); addToCart(${game.id})">В корзину</button>
                </div>
            </div>
        </div>
    `).join('');
}

function initHeroCarousel() {
    const carousel = document.getElementById('hero-carousel');
    
    // Берем ВСЕ игры из каталога (из storage.js)
    const allGames = window.games;
    
    // Создаем дубликаты для бесконечной прокрутки (удваиваем массив)
    const gamesWithDuplicates = [...allGames, ...allGames];
    
    carousel.innerHTML = gamesWithDuplicates.map(game => `
        <div class="hero-game-card" onclick="window.location.href='product.html?id=${game.id}'">
            ${game.isNew ? '<span class="hero-game-badge new">NEW</span>' : ''}
            ${game.isTop ? '<span class="hero-game-badge top">TOP</span>' : ''}
            <img src="${game.image}" alt="${game.title}" loading="lazy">
            <div class="hero-game-info">
                <h3>${game.title}</h3>
                <p class="hero-game-price">${game.price === 0 ? 'Бесплатно' : game.price.toLocaleString() + ' ₽'}</p>
            </div>
        </div>
    `).join('');
    
    // Настройка автоматической прокрутки
    let scrollSpeed = 1; // Пикселей за кадр
    let animationId;
    
    function autoScroll() {
        carousel.scrollLeft += scrollSpeed;
        
        // Если достигли середины (где начинаются дубликаты), плавно возвращаемся
        if (carousel.scrollLeft >= carousel.scrollWidth / 2) {
            carousel.scrollLeft = 0;
        }
        
        animationId = requestAnimationFrame(autoScroll);
    }
    
    // Запускаем прокрутку
    autoScroll();
    
    // Останавливаем при наведении
    carousel.addEventListener('mouseenter', () => {
        cancelAnimationFrame(animationId);
    });
    
    carousel.addEventListener('mouseleave', () => {
        autoScroll();
    });
}

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', function () {
    initHeroCarousel();
    // Обновление счетчика корзины
    updateCartCount();

    // Загрузка популярных игр
    renderFeaturedGames();
});

// Глобальные функции
window.addToCart = function (gameId) {
    const game = window.games.find(g => g.id === gameId);
    if (!game) return;

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (!cart.some(item => item.id === gameId)) {
        cart.push(game);
        localStorage.setItem('cart', JSON.stringify(cart));
        alert(`${game.title} добавлен в корзину!`);
        updateCartCount();
    } else {
        alert('Эта игра уже в корзине!');
    }
};

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    document.getElementById('cart-count').textContent = cart.length;
}

