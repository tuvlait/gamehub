// База данных игр
const games = [
    {
        id: 1,
        title: "Cyberpunk 2077",
        price: 1999,
        platform: "pc",
        genre: "rpg",
        image: "img/cyberpunk.jpg",
        description: "Открытый мир будущего"
    },

    { 
        id: 2,
        title: "Elden Ring",
        price: 2499, 
        platform: "ps5",
        genre: "action",
        image: "img/elden-ring.jpg"
    },

    { 
        id: 3, 
        title: "The Witcher 3", 
        price: 999, 
        platform: "pc", 
        genre: "rpg", 
        image: "img/witcher.jpg" 
    },

    { 
        id: 4, 
        title: "Call of Duty: Warzone", 
        price: 0, 
        platform: "xbox", 
        genre: "shooter", 
        image: "img/warzone.jpg" 
    },

    { 
        id: 5, 
        title: "Hollow Knight", 
        price: 499, 
        platform: "pc", 
        genre: "indie", 
        image: "img/hollow-knight.jpg" }
];

// Корзина
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Промокоды
const promoCodes = {
    "GAMER": 10, // 10% скидка
    "EPIC": 20
};

// Сохранение корзины
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}