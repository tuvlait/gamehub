// Поиск игр по названию
function searchGames(query) {
  return window.games.filter(game => 
    game.title.toLowerCase().includes(query.toLowerCase())
  );
}

// Показ результатов поиска
function showSearchResults(results) {
  const resultsContainer = document.getElementById('search-results');
  const modal = document.getElementById('search-modal');
  
  if (results.length === 0) {
    resultsContainer.innerHTML = `
      <div class="search-error">
        <p>Игра не найдена</p>
        <p>Попробуйте изменить запрос</p>
      </div>
    `;
  } else {
    resultsContainer.innerHTML = results.map(game => `
      <div class="game-card" onclick="window.location.href='product.html?id=${game.id}'">
        <img src="${game.image}" alt="${game.title}">
        <div class="game-info">
          <h3>${game.title}</h3>
          <p>${game.price.toLocaleString()} ₽</p>
        </div>
      </div>
    `).join('');
  }
  
  modal.classList.add('show');
}

// Показ подсказок
function showSuggestions(query) {
  const suggestionsContainer = document.getElementById('search-suggestions');
  if (!query) {
    suggestionsContainer.style.display = 'none';
    return;
  }
  
  const suggestions = window.games
    .filter(game => game.title.toLowerCase().includes(query.toLowerCase()))
    .slice(0, 5);
  
  if (suggestions.length > 0) {
    suggestionsContainer.innerHTML = suggestions.map(game => `
      <div class="suggestion-item" data-id="${game.id}">
        ${game.title}
      </div>
    `).join('');
    suggestionsContainer.style.display = 'block';
  } else {
    suggestionsContainer.style.display = 'none';
  }
}

// Инициализация поиска
function initSearch() {
  const searchInput = document.getElementById('search-input');
  const suggestionsContainer = document.getElementById('search-suggestions');
  
  // Обработчик ввода
  searchInput.addEventListener('input', (e) => {
    showSuggestions(e.target.value);
  });
  
  // Обработчик отправки (Enter)
  searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      const results = searchGames(searchInput.value);
      showSearchResults(results);
      suggestionsContainer.style.display = 'none';
    }
  });
  
  // Клик по подсказке
  suggestionsContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('suggestion-item')) {
      const gameId = e.target.dataset.id;
      window.location.href = `product.html?id=${gameId}`;
    }
  });
  
  // Закрытие модального окна
  document.querySelector('.close-search')?.addEventListener('click', () => {
    document.getElementById('search-modal').classList.remove('show');
  });
}

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', initSearch);