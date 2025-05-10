window.games = [
    {
        id: 1,
        title: "Cyberpunk 2077",
        price: 1999,
        platform: "pc",
        genre: "action",
        image: "img/cyberpunk.jpg",
        isNew: true,
        requirements: {
            min: { os: "Windows 10", cpu: "Intel i5", ram: "8GB", gpu: "GTX 780" },
            rec: { os: "Windows 10", cpu: "Intel i7", ram: "16GB", gpu: "RTX 2060" }
        }
    },
    {
        id: 2,
        title: "Elden Ring", 
        price: 2499,
        platform: "ps5",
        genre: "action",
        image: "img/elden-ring.jpg",
        requirements: {
            min: { os: "PS5", cpu: "-", ram: "-", gpu: "-" }
        }
    },
    {
        id: 3,
        title: "The Witcher 3",
        price: 999,
        platform: "pc",
        genre: "rpg",
        image: "img/witcher.jpg",
        requirements: {
            min: { os: "Windows 7", cpu: "Intel i5", ram: "6GB", gpu: "GTX 660" }
        }
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
        image: "img/hollow-knight.jpg",
        requirements: {
            min: { os: "Windows 7", cpu: "Intel Core 2 Duo", ram: "4GB", gpu: "Integrated" }
        }
    },
    {
        id: 6,
        title: "Hogwarts Legacy",
        price: 3799,
        platform: "PC, PS5, Xbox",
        genre: "adventure",
        image: "img/hogwarts-legacy.webp",
        isNew: true,
        requirements: {
            min: { os: "Windows 10", cpu: "Intel i5", ram: "8GB", gpu: "GTX 960" }
        }
    },
    {
        id: 7,
        title: "Starfield",
        price: 4299,
        platform: "PC, Xbox",
        genre: "rpg",
        image: "img/starfield.webp",
        isTop: true,
        requirements: {
            min: { os: "Windows 10", cpu: "AMD Ryzen 5", ram: "8GB", gpu: "GTX 1070" }
        }
    }
];

if (!localStorage.getItem('cart')) {
    localStorage.setItem('cart', JSON.stringify([]));
}
