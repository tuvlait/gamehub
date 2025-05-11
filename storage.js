// База данных игр
window.games = [
    {
        id: 1,
        title: "Cyberpunk 2077",
        price: 1999,
        platform: "PC",
        genre: "action",
        image: "img/cyberpunk.webp",
        trailer: "https://www.youtube.com/embed/LembwKDo1Dk",
        description: "Cyberpunk 2077 — приключенческая ролевая игра, действие которой происходит в Найт-Сити, темном будущем мегаполиса, где технологии служат не только для улучшения жизни, но и как средство контроля и подавления.",
        requirements: {
            min: { 
                os: "Windows 10", 
                cpu: "Intel Core i5-3570K/AMD FX-8310", 
                ram: "8GB", 
                gpu: "NVIDIA GTX 780/AMD Radeon RX 470",
                storage: "70GB HDD"
            },
            rec: { 
                os: "Windows 10", 
                cpu: "Intel Core i7-4790/AMD Ryzen 3 3200G", 
                ram: "12GB", 
                gpu: "NVIDIA GTX 1060/AMD Radeon R9 Fury",
                storage: "70GB SSD"
            }
        },
        isNew: true
    },
    {
        id: 2,
        title: "Elden Ring", 
        price: 2499,
        platform: "PS5, Xbox, PC",
        genre: "action",
        image: "img/elden-ring.webp",
        trailer: "https://www.youtube.com/embed/E3Huy2cdih0",
        description: "Elden Ring — новая игра от создателей Dark Souls и Sekiro. Открытый мир, созданный в сотрудничестве с Джорджем Р. Р. Мартином. Исследуйте мир, сражайтесь с могущественными противниками и раскройте тайны Кольца Элден.",
        requirements: {
            min: { 
                os: "Windows 10", 
                cpu: "Intel Core i5-8400/AMD Ryzen 3 3300X", 
                ram: "12GB", 
                gpu: "NVIDIA GTX 1060/AMD RX 580",
                storage: "60GB HDD"
            },
            rec: { 
                os: "Windows 10/11", 
                cpu: "Intel Core i7-8700K/AMD Ryzen 5 3600X", 
                ram: "16GB", 
                gpu: "NVIDIA GTX 1070/AMD RX Vega 56",
                storage: "60GB SSD"
            }
        }
    },
    {
        id: 3,
        title: "The Witcher 3: Wild Hunt",
        price: 999,
        platform: "PC, PS4, Xbox One",
        genre: "rpg",
        image: "img/witcher.webp",
        trailer: "https://www.youtube.com/embed/XHrskkHf958",
        description: "Геральт из Ривии, наёмный охотник на чудовищ, отправляется в эпическое путешествие по Континенту, чтобы найти Цири — Дитя Предназначения.",
        requirements: {
            min: { 
                os: "Windows 7", 
                cpu: "Intel Core i5-2500K/AMD Phenom II X4 940", 
                ram: "6GB", 
                gpu: "NVIDIA GTX 660/AMD Radeon HD 7870",
                storage: "50GB HDD"
            }
        }
    },
    {
        id: 4,
        title: "Call of Duty: Warzone",
        price: 0,
        platform: "PC, PS4, Xbox One",
        genre: "shooter",
        image: "img/warzone.webp",
        trailer: "https://www.youtube.com/embed/0E44DClsX5Q",
        description: "Бесплатный королевский бой на 150 игроков во вселенной Call of Duty: Modern Warfare.",
        requirements: {
            min: { 
                os: "Windows 10", 
                cpu: "Intel Core i3-4340/AMD FX-6300", 
                ram: "8GB", 
                gpu: "NVIDIA GTX 670/NVIDIA GTX 1650/AMD Radeon HD 7950",
                storage: "175GB HDD"
            }
        }
    },
    {
        id: 5,
        title: "Hollow Knight",
        price: 499,
        platform: "PC, Switch, PS4",
        genre: "indie",
        image: "img/hollow-knight.webp",
        trailer: "https://www.youtube.com/embed/UAO2urG23S4",
        description: "Исследуйте извилистые пещеры, сражайтесь с жуткими существами и раскрывайте древние тайны в этом атмосферном метроидвании.",
        requirements: {
            min: { 
                os: "Windows 7", 
                cpu: "Intel Core 2 Duo E5200", 
                ram: "4GB", 
                gpu: "GeForce 9800GTX+/Intel HD Graphics 4000",
                storage: "9GB HDD"
            }
        }
    },
    {
        id: 6,
        title: "Hogwarts Legacy",
        price: 3799,
        platform: "PC, PS5, Xbox Series X",
        genre: "adventure",
        image: "img/hogwarts-legacy.webp",
        trailer: "https://www.youtube.com/embed/1O6Qstncpnc",
        description: "Отправляйтесь в Хогвартс XIX века, где вы сможете учиться магии, исследовать замок и раскрывать древние тайны.",
        requirements: {
            min: { 
                os: "Windows 10", 
                cpu: "Intel Core i5-6600/AMD Ryzen 5 1400", 
                ram: "16GB", 
                gpu: "NVIDIA GTX 960/AMD Radeon RX 470",
                storage: "85GB HDD"
            },
            rec: { 
                os: "Windows 10", 
                cpu: "Intel Core i7-8700/AMD Ryzen 5 3600", 
                ram: "32GB", 
                gpu: "NVIDIA RTX 2080 Ti/AMD RX 6800 XT",
                storage: "85GB SSD"
            }
        },
        isNew: true
    },
    {
        id: 7,
        title: "Starfield",
        price: 4299,
        platform: "PC, Xbox Series X",
        genre: "rpg",
        image: "img/starfield.webp",
        trailer: "https://www.youtube.com/embed/pYqyVpCV-3c",
        description: "Новая космическая RPG от создателей Skyrim и Fallout. Исследуйте сотни планет и раскройте величайшую тайну человечества.",
        requirements: {
            min: { 
                os: "Windows 10/11", 
                cpu: "AMD Ryzen 5 2600X/Intel Core i7-6800K", 
                ram: "16GB", 
                gpu: "AMD Radeon RX 5700/NVIDIA GTX 1070 Ti",
                storage: "125GB SSD"
            },
            rec: { 
                os: "Windows 10/11", 
                cpu: "AMD Ryzen 5 3600X/Intel Core i5-10600K", 
                ram: "32GB", 
                gpu: "AMD Radeon RX 6800 XT/NVIDIA RTX 2080",
                storage: "125GB NVMe SSD"
            }
        },
        isTop: true
    }
];

// Инициализация корзины
if (!localStorage.getItem('cart')) {
    localStorage.setItem('cart', JSON.stringify([]));
};

// Инициализация хранилища отзывов
if (!localStorage.getItem('reviews')) {
    localStorage.setItem('reviews', JSON.stringify([]));
}