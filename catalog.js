// Получаем параметры из URL
function getUrlParams() {
    const urlParams = new URLSearchParams(window.location.search);
    return {
        genre: urlParams.get('genre') || 'all',
        platform: urlParams.get('platform') || 'all'
    };
}

// Фильтрация игр
function filterGames() {
    const params = getUrlParams();
    const genreFilter = document.getElementById('genre-filter');
    const platformFilter = document.getElementById('platform-filter');
    
    genreFilter.value = params.genre;
    platformFilter.value = params.platform;
    
    const filtered = window.games.filter(game => {
        const genreMatch = params.genre === 'all' || game.genre === params.genre;
        const platformMatch = params.platform === 'all' || 
                           game.platform.toLowerCase().includes(params.platform);
        return genreMatch && platformMatch;
    });
    
    renderGames(filtered);
}

// Рендер игр с кликабельными карточками
function renderGames(gamesToShow) {
    const container = document.getElementById('games-container');
    container.innerHTML = gamesToShow.map(game => `
        <div class="game-card" onclick="window.location.href='product.html?id=${game.id}'">
            ${game.isNew ? '<div class="game-badge new">Новинка</div>' : ''}
            ${game.isTop ? '<div class="game-badge top">Топ</div>' : ''}
            <img src="${game.image}" alt="${game.title}" loading="lazy">
            <div class="game-info">
                <h3>${game.title}</h3>
                <div class="game-meta">
                    <span class="game-price">${game.price === 0 ? 'Бесплатно' : game.price.toLocaleString() + ' ₽'}</span>
                    <button class="btn" onclick="event.stopPropagation(); addToCart(${game.id})">В корзину</button>
                </div>
            </div>
        </div>
    `).join('');
}

// Обновление URL
function updateUrlParams(genre, platform) {
    const url = new URL(window.location);
    url.searchParams.set('genre', genre);
    url.searchParams.set('platform', platform);
    window.history.pushState({}, '', url);
}

// Инициализация
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('genre-filter').addEventListener('change', function() {
        updateUrlParams(this.value, getUrlParams().platform);
        filterGames();
    });
    
    document.getElementById('platform-filter').addEventListener('change', function() {
        updateUrlParams(getUrlParams().genre, this.value);
        filterGames();
    });
    
    filterGames();
    updateCartCount();
});

// Глобальные функции
window.addToCart = function(gameId, event) {
    if (event) event.stopPropagation();
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