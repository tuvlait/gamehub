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

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', function() {
    // Обновление счетчика корзины
    updateCartCount();
    
    // Загрузка популярных игр
    renderFeaturedGames();
});

// Глобальные функции
window.addToCart = function(gameId) {
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