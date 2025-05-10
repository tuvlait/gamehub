// 📂 База данных игр
const games = [
    { id: 1, title: "Cyberpunk 2077", price: 1999, platform: "pc", genre: "rpg", image: "img/cyberpunk.jpg" },
    { id: 2, title: "Elden Ring", price: 2499, platform: "ps5", genre: "action", image: "img/elden-ring.jpg" },
    { id: 3, title: "The Witcher 3", price: 999, platform: "pc", genre: "rpg", image: "img/witcher.jpg" },
    { id: 4, title: "Call of Duty: Warzone", price: 0, platform: "xbox", genre: "shooter", image: "img/warzone.jpg" },
    { id: 5, title: "Hollow Knight", price: 499, platform: "pc", genre: "indie", image: "img/hollow-knight.jpg" },
    { id: 6, title: "Hogwarts Legacy", price: 3799, platform: "PC, PS5, Xbox", genre: "adventure", image: "img/hogwarts-legacy.webp", isNew: true },
    { id: 7, title: "Starfield", price: 4299, platform: "PC, Xbox", genre: "rpg", image: "img/starfield.webp",  isTop: true }
  ];
  
  // 🛒 Корзина
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  
  // 🔄 Обновление счетчика корзины
  function updateCartCount() {
    document.querySelectorAll('#cart-count').forEach(el => {
      el.textContent = cart.length;
    });
  }
  
  // ➕ Добавление в корзину
  function addToCart(gameId) {
    const game = games.find(g => g.id === gameId);
    if (!game) return;
  
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Проверяем, нет ли уже этой игры в корзине
    if (!cart.some(item => item.id === gameId)) {
      cart.push(game);
      localStorage.setItem('cart', JSON.stringify(cart));
      alert(`${game.title} добавлен в корзину!`);
      updateCartCount();
    } else {
      alert('Эта игра уже в корзине!');
    }
  }
  
  // Функция обновления счётчика корзины
  function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    document.querySelectorAll('#cart-count').forEach(el => {
      el.textContent = cart.length;
    });
  }
  
  // 🎮 Рендер игр с фильтрами
  function renderGames(gamesToShow = games) {
    const container = document.getElementById('games-container');
    if (!container) return;
  
    const filteredGames = games.filter(game => {
      const genreMatch = filterGenre === 'all' || game.genre === filterGenre;
      const platformMatch = filterPlatform === 'all' || game.platform === filterPlatform;
      return genreMatch && platformMatch;
    });
  
    container.innerHTML = gamesToShow.map(game => `
        <div class="game-card" data-id="${game.id}">
          ${game.isNew ? '<div class="game-badge new">Новинка</div>' : ''}
          ${game.isTop ? '<div class="game-badge top">Топ продаж</div>' : ''}
          <img src="${game.image}" 
               alt="${game.title}" 
               loading="lazy"
               width="300"
               height="170">
          <div class="game-info">
            <h3>${game.title}</h3>
            <div class="game-meta">
              <span class="game-platform">${game.platform}</span>
              <span class="game-price">${game.price.toLocaleString()} ₽</span>
            </div>
            <button class="btn add-to-cart">В корзину</button>
          </div>
        </div>
      `).join('');
    }
  
  // 🛒 Рендер корзины
  function renderCart() {
    const container = document.getElementById('cart-items');
    if (!container) return;
  
    if (cart.length === 0) {
      container.innerHTML = '<p>Корзина пуста</p>';
      document.getElementById('total-price').textContent = '0';
      return;
    }
  
    container.innerHTML = cart.map(game => `
      <div class="cart-item">
        <img src="${game.image}" alt="${game.title}">
        <div>
          <h3>${game.title}</h3>
          <p>${game.price === 0 ? 'Бесплатно' : game.price + ' ₽'}</p>
        </div>
      </div>
    `).join('');
  
    const total = cart.reduce((sum, game) => sum + game.price, 0);
    document.getElementById('total-price').textContent = total;
  }
  
  // 🚀 Инициализация
  document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
  
    // Фильтры в каталоге
    const genreFilter = document.getElementById('genre-filter');
    const platformFilter = document.getElementById('platform-filter');
  
    if (genreFilter && platformFilter) {
      genreFilter.addEventListener('change', () => {
        renderGames(genreFilter.value, platformFilter.value);
      });
      platformFilter.addEventListener('change', () => {
        renderGames(genreFilter.value, platformFilter.value);
      });
    }
  
    // Рендер корзины
    if (document.getElementById('cart-items')) {
      renderCart();
    }
  
    // Рендер игр (главная или каталог)
    renderGames();
  });
  // Переключение темы
const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('click', () => {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
});

// Проверка сохраненной темы при загрузке
const savedTheme = localStorage.getItem('theme') || 'dark';
document.documentElement.setAttribute('data-theme', savedTheme);


  // Функция для отображения звезд рейтинга
function renderRating(starsContainer, rating) {
    starsContainer.innerHTML = '';
    for (let i = 1; i <= 5; i++) {
      const star = document.createElement('span');
      star.className = i <= rating ? 'star filled' : 'star';
      star.innerHTML = i <= rating ? '★' : '☆';
      starsContainer.appendChild(star);
    }
  }
  
  // Обработка отправки отзыва
  document.querySelector('.review-form')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const rating = document.querySelector('.stars-input .filled')?.length || 0;
    const text = this.querySelector('textarea').value;
    
    if (rating === 0) {
      alert('Пожалуйста, поставьте оценку');
      return;
    }
    
    // Здесь можно добавить отправку на сервер
    addReview(rating, text);
    this.reset();
  });
  
  function addReview(rating, text) {
    // Добавление отзыва в список
    const review = {
      id: Date.now(),
      user: 'Аноним',
      rating,
      text,
      date: new Date().toLocaleDateString()
    };
    
    // Сохранение в LocalStorage
    const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
    reviews.push(review);
    localStorage.setItem('reviews', JSON.stringify(reviews));
    
    // Обновление отображения
    displayReviews();
  }

  // Функция фильтрации игр
function filterGames() {
    const genre = document.getElementById('genre-filter').value;
    const platform = document.getElementById('platform-filter').value;
    
    const filteredGames = games.filter(game => {
      const genreMatch = genre === 'all' || game.genre === genre;
      const platformMatch = platform === 'all' || game.platform === platform;
      return genreMatch && platformMatch;
    });
  
    renderGames(filteredGames);
  }
  
  // Обновлённая функция рендеринга игр
  function renderGames(gamesToShow = games) {
    const container = document.getElementById('games-container');
    if (!container) return;
  
    container.innerHTML = gamesToShow.map(game => `
      <div class="game-card">
        <img src="${game.image}" loading="lazy" width="250" height="150" alt="${game.title}">
        <div class="game-info">
          <h3>${game.title}</h3>
          <p>${game.platform.toUpperCase()}</p>
          <p class="price">${game.price} ₽</p>
          <button onclick="addToCart(${game.id})">В корзину</button>
        </div>
      </div>
    `).join('');
  }
  
  // Инициализация при загрузке
  document.addEventListener('DOMContentLoaded', function() {
    // Проверяем, есть ли параметры в URL (например: catalog.html?genre=action)
    const urlParams = new URLSearchParams(window.location.search);
    const genreParam = urlParams.get('genre');
    
    if (genreParam) {
      document.getElementById('genre-filter').value = genreParam;
    }
    
    filterGames(); // Применяем фильтры
  });

  // Оформление заказа
document.getElementById('checkout-btn')?.addEventListener('click', function() {
    document.getElementById('checkout-modal').classList.add('show');
  });
  
  document.querySelector('.close')?.addEventListener('click', function() {
    document.getElementById('checkout-modal').classList.remove('show');
  });
  
  // Генерация номера заказа
  function generateOrderNumber() {
    return 'ORD-' + Math.floor(Math.random() * 1000000);
  }
  
  // Отправка формы
  document.getElementById('order-form')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Здесь должна быть реальная логика отправки
    const orderNumber = generateOrderNumber();
    document.getElementById('order-number').textContent = orderNumber;
    
    // Показываем успешное окно
    document.getElementById('checkout-modal').classList.remove('show');
    document.getElementById('success-modal').classList.add('show');
    
    // Очищаем корзину
    localStorage.removeItem('cart');
    updateCartCount();
  });
  
  // Возврат в магазин
  document.querySelector('.back-to-shop')?.addEventListener('click', function() {
    document.getElementById('success-modal').classList.remove('show');
    window.location.href = 'index.html';
  });

  // Валидация email
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }
  
  // Валидация телефона
  function validatePhone(phone) {
    return phone.length >= 10;
  }
  
  // Фильтрация игр
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;
      let filteredGames = games;
      
      if (filter === 'new') {
        filteredGames = games.filter(game => game.isNew);
      } else if (filter === 'top') {
        filteredGames = games.filter(game => game.isTop);
      }
      
      renderGames(filteredGames);
    });
  });
