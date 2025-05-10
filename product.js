document.addEventListener('DOMContentLoaded', function() {
    // Получаем ID товара из URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));
    
    // Загружаем корзину
    updateCartCount();
  
    // Находим игру в базе
    const game = window.games.find(g => g.id === productId);
    
    if (!game) {
      document.querySelector('main').innerHTML = `
        <div class="error-message">
          <h2>Игра не найдена</h2>
          <a href="catalog.html" class="btn">Вернуться в каталог</a>
        </div>
      `;
      return;
    }
  
    // Заполняем данные о товаре
    document.getElementById('product-title').textContent = game.title;
    document.getElementById('product-price').textContent = game.price.toLocaleString() + ' ₽';
    
    // Описание
    const descriptionEl = document.getElementById('product-description');
    descriptionEl.textContent = game.description || 'Описание отсутствует';
  
    // Основное изображение
    const mainImg = document.getElementById('main-image');
    mainImg.src = game.image || 'img/no-image.jpg';
    mainImg.alt = game.title;
  
    // Платформы
    const platformsList = document.getElementById('platforms-list');
    platformsList.innerHTML = game.platform.split(',').map(p => 
      `<span class="platform-tag">${p.trim()}</span>`
    ).join('');
  
    // Системные требования (заглушка с проверкой)
    const requirementsGrid = document.getElementById('requirements-grid');
    if (requirementsGrid) {
      requirementsGrid.innerHTML = `
        <div class="req-row">
          <span class="req-name">ОС:</span>
          <span class="req-value">${game.platform.includes('PC') ? 'Windows 10/11' : 'Не требуется'}</span>
        </div>
        <div class="req-row">
          <span class="req-name">Процессор:</span>
          <span class="req-value">Intel Core i5 / AMD Ryzen 5</span>
        </div>
        <div class="req-row">
          <span class="req-name">Память:</span>
          <span class="req-value">8 GB RAM</span>
        </div>
      `;
    }
  
    // Кнопки
    document.querySelector('.buy-btn').addEventListener('click', () => {
      addToCart(game.id);
      window.location.href = 'cart.html';
    });
  
    document.querySelector('.add-to-cart-btn').addEventListener('click', () => {
      addToCart(game.id);
      updateCartCount();
    });
  
    // Загрузка отзывов
    loadReviews();
  
    // Обработчик отправки отзыва
    document.querySelector('.review-form').addEventListener('submit', function(e) {
      e.preventDefault();
      submitReview(game.id);
    });
  });
  
  // Функция добавления в корзину
  function addToCart(gameId) {
    const game = window.games.find(g => g.id === gameId);
    if (!game) return;
  
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    if (!cart.some(item => item.id === gameId)) {
      cart.push(game);
      localStorage.setItem('cart', JSON.stringify(cart));
      alert(`${game.title} добавлен в корзину!`);
    } else {
      alert('Эта игра уже в корзине!');
    }
  }
  
  // Обновление счетчика корзины
  function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    document.getElementById('cart-count').textContent = cart.length;
  }
  
  // Загрузка отзывов
  function loadReviews() {
    const reviewsList = document.getElementById('reviews-list');
    const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
    const gameId = parseInt(new URLSearchParams(window.location.search).get('id'));
  
    const gameReviews = reviews.filter(r => r.gameId === gameId);
    
    if (gameReviews.length === 0) {
      reviewsList.innerHTML = '<p>Пока нет отзывов. Будьте первым!</p>';
      return;
    }
  
    reviewsList.innerHTML = gameReviews.map(review => `
      <div class="review">
        <div class="review-header">
          <span class="review-author">${review.author || 'Аноним'}</span>
          <span class="review-rating">${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}</span>
        </div>
        <p class="review-text">${review.text}</p>
        <div class="review-date">${review.date}</div>
      </div>
    `).join('');
  }
  
  // Отправка отзыва
  function submitReview(gameId) {
    const textarea = document.querySelector('.review-form textarea');
    const text = textarea.value.trim();
    const rating = document.querySelector('.star.active')?.dataset.rating || 0;
  
    if (!text || rating === 0) {
      alert('Пожалуйста, поставьте оценку и напишите отзыв');
      return;
    }
  
    const review = {
      gameId,
      author: 'Пользователь', // Можно добавить систему авторизации
      rating: parseInt(rating),
      text,
      date: new Date().toLocaleDateString()
    };
  
    const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
    reviews.push(review);
    localStorage.setItem('reviews', JSON.stringify(reviews));
  
    textarea.value = '';
    loadReviews();
  }
  
  // Обработка звезд рейтинга
  document.addEventListener('click', function(e) {
    if (e.target.classList.contains('star')) {
      const stars = document.querySelectorAll('.star');
      const rating = parseInt(e.target.dataset.rating);
      
      stars.forEach((star, index) => {
        star.textContent = index < rating ? '★' : '☆';
        star.classList.toggle('active', index < rating);
      });
    }
  });
