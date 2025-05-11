document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));
    const game = window.games.find(g => g.id === productId);
    
    if (!game) {
        document.querySelector('main').innerHTML = `
            <div class="error-message">
                <h2>Игра не найдена</h2>
                <a href="catalog.html" class="btn">Вернуться в каталог</a>
            </div>`;
        return;
    }

    // Заполнение данных игры
    document.title = `GAMEHUB | ${game.title}`;
    document.getElementById('product-title').textContent = game.title;
    document.getElementById('product-price').textContent = game.price.toLocaleString() + ' ₽';
    document.getElementById('product-description').textContent = game.description || 'Описание отсутствует';
    document.getElementById('main-image').src = game.image;
    document.getElementById('main-image').alt = game.title;

    // Платформы
    document.getElementById('platforms-list').innerHTML = game.platform.split(',').map(p => 
        `<span class="platform-tag">${p.trim()}</span>`
    ).join('');

    // Трейлер
    if (game.trailer) {
        document.getElementById('trailer-container').innerHTML = `
            <iframe src="${game.trailer}" frameborder="0" allowfullscreen></iframe>`;
    }

    // Системные требования
    if (game.requirements) {
        const requirementsGrid = document.getElementById('requirements-grid');
        requirementsGrid.innerHTML = `
            <div class="req-col">
                <h3>Минимальные</h3>
                ${renderRequirements(game.requirements.min)}
            </div>
            ${game.requirements.rec ? `
            <div class="req-col">
                <h3>Рекомендуемые</h3>
                ${renderRequirements(game.requirements.rec)}
            </div>` : ''}
        `;
    }

    // Обработчики кнопок
    document.querySelector('.buy-btn').addEventListener('click', function(e) {
        e.preventDefault();
        const game = window.games.find(g => g.id === productId);
        
        if (!game) return;

        // Очищаем корзину и добавляем только эту игру
        const cart = [game];
        localStorage.setItem('cart', JSON.stringify(cart));
        
        // Переходим в корзину с параметром directCheckout
        window.location.href = 'cart.html?directCheckout=true';
    });

    document.querySelector('.add-to-cart-btn').addEventListener('click', function() {
        addToCart(productId);
    });

    // Загрузка отзывов
    loadReviews();
});

function renderRequirements(req) {
    return `
        <p><strong>ОС:</strong> ${req.os}</p>
        <p><strong>Процессор:</strong> ${req.cpu}</p>
        <p><strong>Оперативная память:</strong> ${req.ram}</p>
        <p><strong>Видеокарта:</strong> ${req.gpu}</p>
        ${req.storage ? `<p><strong>Место на диске:</strong> ${req.storage}</p>` : ''}
    `;
}

function loadReviews() {
    const reviewsList = document.getElementById('reviews-list');
    const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
    const gameId = parseInt(new URLSearchParams(window.location.search).get('id'));

    reviewsList.innerHTML = reviews
        .filter(r => r.gameId === gameId)
        .map(review => `
            <div class="review" data-review-id="${review.id}">
                <div class="review-header">
                    <span class="review-author">${review.author || 'Аноним'}</span>
                    <div>
                        <span class="review-rating">${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}</span>
                        <button class="delete-review-btn" onclick="deleteReview(${review.id})">×</button>
                    </div>
                </div>
                <p class="review-text">${review.text}</p>
                <div class="review-date">${review.date}</div>
            </div>
        `).join('') || '<p>Пока нет отзывов. Будьте первым!</p>';
}

window.deleteReview = function(reviewId) {
    if (!confirm('Удалить этот отзыв?')) return;
    
    const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
    const updatedReviews = reviews.filter(review => review.id !== reviewId);
    
    localStorage.setItem('reviews', JSON.stringify(updatedReviews));
    loadReviews();
};

function addToCart(gameId) {
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
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    document.getElementById('cart-count').textContent = cart.length;
}

// В конец product.js добавляем:

// Инициализация звезд рейтинга
function initRatingStars() {
    const stars = document.querySelectorAll('.star');
    stars.forEach(star => {
        star.addEventListener('click', function() {
            const rating = parseInt(this.dataset.rating);
            highlightStars(rating);
        });
    });
}

// Подсветка звезд рейтинга
function highlightStars(rating) {
    const stars = document.querySelectorAll('.star');
    stars.forEach((star, index) => {
        star.textContent = index < rating ? '★' : '☆';
        star.classList.toggle('active', index < rating);
    });
}

// Обработчик отправки отзыва
document.querySelector('.review-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const textarea = this.querySelector('textarea');
    const text = textarea.value.trim();
    const activeStar = document.querySelector('.star.active');
    const rating = activeStar ? parseInt(activeStar.dataset.rating) : 0;
    const gameId = parseInt(new URLSearchParams(window.location.search).get('id'));

    if (!text || rating === 0) {
        alert('Пожалуйста, поставьте оценку и напишите отзыв');
        return;
    }

    const newReview = {
        id: Date.now(),
        gameId: gameId,
        author: 'Пользователь',
        rating: rating,
        text: text,
        date: new Date().toLocaleDateString('ru-RU')
    };

    // Получаем текущие отзывы или создаем пустой массив
    const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
    
    // Добавляем новый отзыв
    reviews.push(newReview);
    
    // Сохраняем обратно в localStorage
    localStorage.setItem('reviews', JSON.stringify(reviews));
    
    // Очищаем форму
    textarea.value = '';
    highlightStars(0); // Сбрасываем звезды
    
    // Обновляем список отзывов
    loadReviews();
});

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    // ... остальной код инициализации ...
    
    // Инициализируем систему отзывов
    initRatingStars();
    loadReviews();
});