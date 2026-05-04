let actionCounter = 0; 
let currentTheme = 'light';
let currentTab = 'all';
let currentFilter = 'all';
function formatProductStatus(name, inStock) {
    const status = inStock ? "В наявності" : "Немає на складі";
    return `СТАТУС ТОВАРУ "${name.toUpperCase()}": ${status}`;
}
function calculateTotalInStock(items) {
    let totalSum = 0;
    for (let i = 0; i < items.length; i++) {
        if (items[i].inStock) {
            totalSum += items[i].price;
        }
    }
    return totalSum;
}
function toggleThemeLogic() {
    const body = document.body;
    const themeBtn = document.getElementById('theme-btn');
    
    if (currentTheme === 'light') {
        body.classList.add('dark-theme');
        themeBtn.textContent = '☀️ Світла тема';
        currentTheme = 'dark';
    } else {
        body.classList.remove('dark-theme');
        themeBtn.textContent = '🌙 Темна тема';
        currentTheme = 'light';
    }
}
// Каталог товарів - МИШІ локальні, КЛАВІАТУРИ з Unsplash
const products = [
    // МИШІ (10 шт) - ЛОКАЛЬНІ ФОТО
    { 
        name: "Logitech G Pro X Superlight", 
        price: 3999, 
        inStock: true, 
        discount: true,
        category: "mouse",
        image: "images/mice/logitech-superlight.jpg",
        details: {
            sensor: "HERO 25K",
            dpi: "100-25,600",
            weight: "63 г",
            connection: "LIGHTSPEED бездротова",
            battery: "70 годин",
            description: "Ультралегка бездротова миша для кіберспорту"
        }
    },
    { 
        name: "Razer DeathAdder V3", 
        price: 2499, 
        inStock: true, 
        discount: false,
        category: "mouse",
        image: "images/mice/razer-deathadder.jpg",
        details: {
            sensor: "Focus Pro 30K",
            dpi: "100-30,000",
            weight: "59 г",
            connection: "Дротова USB",
            cable: "SpeedFlex 2м",
            description: "Легендарна ергономічна миша для геймерів"
        }
    },
    { 
        name: "SteelSeries Rival 3", 
        price: 899, 
        inStock: false, 
        discount: false,
        category: "mouse",
        image: "images/mice/steelseries-rival3.jpg",
        details: {
            sensor: "TrueMove Core",
            dpi: "100-8,500",
            weight: "77 г",
            connection: "Дротова USB",
            rgb: "3 зони підсвічування",
            description: "Бюджетна миша з відмінною якістю"
        }
    },
    { 
        name: "Logitech MX Master 3S", 
        price: 3299, 
        inStock: true, 
        discount: true,
        category: "mouse",
        image: "images/mice/logitech-mx-master.jpg",
        details: {
            sensor: "Darkfield 8K DPI",
            dpi: "200-8,000",
            weight: "141 г",
            connection: "Bluetooth + USB",
            battery: "70 днів",
            description: "Професійна миша для продуктивності"
        }
    },
    { 
        name: "Razer Viper Ultimate", 
        price: 4199, 
        inStock: true, 
        discount: false,
        category: "mouse",
        image: "images/mice/razer-viper.jpg",
        details: {
            sensor: "Focus+ 20K",
            dpi: "100-20,000",
            weight: "74 г",
            connection: "HyperSpeed бездротова",
            battery: "70 годин",
            description: "Амбідекстральна миша преміум класу"
        }
    },
    { 
        name: "HyperX Pulsefire Haste", 
        price: 1299, 
        inStock: false, 
        discount: false,
        category: "mouse",
        image: "images/mice/hyperx-haste.jpg",
        details: {
            sensor: "PixArt PAW3335",
            dpi: "100-16,000",
            weight: "59 г",
            connection: "Дротова USB",
            cable: "HyperFlex 1.8м",
            description: "Ультралегка миша для швидкої гри"
        }
    },
    { 
        name: "Corsair Dark Core RGB Pro", 
        price: 2799, 
        inStock: true, 
        discount: false,
        category: "mouse",
        image: "images/mice/corsair-darkcore.jpg",
        details: {
            sensor: "PMW3392",
            dpi: "100-18,000",
            weight: "133 г",
            connection: "Bluetooth + 2.4GHz",
            battery: "50 годин",
            description: "Бездротова миша з RGB підсвічуванням"
        }
    },
    { 
        name: "Glorious Model O", 
        price: 1599, 
        inStock: true, 
        discount: true,
        category: "mouse",
        image: "images/mice/glorious-model-o.jpg",
        details: {
            sensor: "Pixart PMW3360",
            dpi: "400-12,000",
            weight: "67 г",
            connection: "Дротова USB",
            cable: "Ascended 2м",
            description: "Honeycomb дизайн для мінімальної ваги"
        }
    },
    { 
        name: "Finalmouse Starlight-12", 
        price: 8999, 
        inStock: false, 
        discount: false,
        category: "mouse",
        image: "images/mice/finalmouse-starlight.jpg",
        details: {
            sensor: "PAW3370",
            dpi: "400-3,200",
            weight: "42 г",
            connection: "Бездротова 2.4GHz",
            battery: "100 годин",
            description: "Найлегша бездротова миша у світі"
        }
    },
    { 
        name: "Zowie EC2", 
        price: 2199, 
        inStock: true, 
        discount: false,
        category: "mouse",
        image: "images/mice/zowie-ec2.jpg",
        details: {
            sensor: "PMW3360",
            dpi: "400-3,200",
            weight: "82 г",
            connection: "Дротова USB",
            cable: "2 метри",
            description: "Кіберспортивна миша без програмного забезпечення"
        }
    },
    
    // КЛАВІАТУРИ (10 шт) - ФОТО З UNSPLASH (працюють гарантовано)
    { 
        name: "AJAZZ AK820 Pro", 
        price: 6767, 
        inStock: true, 
        discount: true,
        category: "keyboard",
        image: "https://images.unsplash.com/photo-1595225476474-87563907a212?w=500&h=500&fit=crop&q=80",
        details: {
            layout: "75% (82 клавіші)",
            switches: "Hot-swap механічні",
            connection: "Tri-mode (USB-C/BT/2.4GHz)",
            battery: "4000 mAh",
            features: "Gasket mount, RGB, TFT екран",
            description: "Преміум 75% клавіатура з екраном"
        }
    },
    { 
        name: "Mchose Mix 87", 
        price: 4900, 
        inStock: false, 
        discount: false,
        category: "keyboard",
        image: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=500&h=500&fit=crop&q=80",
        details: {
            layout: "TKL (87 клавіш)",
            switches: "Mechanical Hot-swap",
            connection: "USB-C дротова",
            keycaps: "PBT Double-shot",
            features: "RGB Per-key, Gasket",
            description: "Компактна TKL для продуктивності"
        }
    },
    { 
        name: "Yunzii B75 Pro MAX", 
        price: 3600, 
        inStock: true, 
        discount: false,
        category: "keyboard",
        image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&h=500&fit=crop&q=80",
        details: {
            layout: "75% (81 клавіша)",
            switches: "Hot-swappable",
            connection: "Tri-mode wireless",
            battery: "3750 mAh",
            features: "Knob, RGB, South-facing",
            description: "Доступна 75% з чудовим звуком"
        }
    },
    { 
        name: "Wooting HE87", 
        price: 9000, 
        inStock: true, 
        discount: true,
        category: "keyboard",
        image: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=500&h=500&fit=crop&q=80",
        details: {
            layout: "TKL (87 клавіш)",
            switches: "Lekker Hall Effect",
            connection: "USB-C дротова",
            polling: "1000 Hz",
            features: "Analog input, Rapid Trigger",
            description: "Аналогова клавіатура для кіберспорту"
        }
    },
    { 
        name: "ASUS ROG ACE75 HE", 
        price: 10000, 
        inStock: false, 
        discount: false,
        category: "keyboard",
        image: "https://images.unsplash.com/photo-1601445638532-3c6f6c3aa1d6?w=500&h=500&fit=crop&q=80",
        details: {
            layout: "75% (83 клавіші)",
            switches: "ROG NX Hall Effect",
            connection: "Tri-mode (USB/BT/2.4GHz)",
            battery: "4000 mAh",
            features: "OLED дисплей, RGB, Knob",
            description: "Топова gaming клавіатура від ASUS"
        }
    },
    { 
        name: "Keychron K8 Pro", 
        price: 3499, 
        inStock: true, 
        discount: true,
        category: "keyboard",
        image: "https://images.unsplash.com/photo-1560762484-813fc97650a0?w=500&h=500&fit=crop&q=80",
        details: {
            layout: "TKL (87 клавіш)",
            switches: "Hot-swap Gateron/Cherry",
            connection: "USB-C + Bluetooth",
            battery: "4000 mAh",
            features: "QMK/VIA, RGB, Mac/Win",
            description: "Універсальна TKL для всіх платформ"
        }
    },
    { 
        name: "Ducky One 3", 
        price: 4299, 
        inStock: true, 
        discount: false,
        category: "keyboard",
        image: "https://images.unsplash.com/photo-1629131726692-1accd0c53ce0?w=500&h=500&fit=crop&q=80",
        details: {
            layout: "Full-size (104 клавіші)",
            switches: "Cherry MX",
            connection: "USB-C дротова",
            keycaps: "PBT Doubleshot",
            features: "RGB, Hot-swap PCB",
            description: "Преміум класика від Ducky"
        }
    },
    { 
        name: "Corsair K70 RGB", 
        price: 5199, 
        inStock: true, 
        discount: false,
        category: "keyboard",
        image: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=500&h=500&fit=crop&q=80",
        details: {
            layout: "Full-size (104 клавіші)",
            switches: "Cherry MX RGB",
            connection: "USB дротова",
            polling: "1000 Hz",
            features: "RGB per-key, Media keys",
            description: "Ігрова клавіатура з алюмінієвим корпусом"
        }
    },
    { 
        name: "NuPhy Air75", 
        price: 3899, 
        inStock: false, 
        discount: false,
        category: "keyboard",
        image: "https://images.unsplash.com/photo-1541140134513-85a161dc4a00?w=500&h=500&fit=crop&q=80",
        details: {
            layout: "75% Ultra-slim",
            switches: "Low-profile Gateron",
            connection: "Tri-mode wireless",
            battery: "4000 mAh",
            features: "Mac-style, RGB, 12mm товщина",
            description: "Найтонша механічна клавіатура"
        }
    },
    { 
        name: "Royal Kludge RK84", 
        price: 2499, 
        inStock: true, 
        discount: true,
        category: "keyboard",
        image: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=500&h=500&fit=crop&q=80",
        details: {
            layout: "75% (84 клавіші)",
            switches: "Hot-swap механічні",
            connection: "Tri-mode (USB/BT/2.4GHz)",
            battery: "3750 mAh",
            features: "RGB, Compact design",
            description: "Бюджетна 75% з чудовим функціоналом"
        }
    }
];
// Оновлення лічильників
function updateTabCounts() {
    document.getElementById('count-all').textContent = products.length;
    document.getElementById('count-mice').textContent = products.filter(p => p.category === 'mouse').length;
    document.getElementById('count-keyboards').textContent = products.filter(p => p.category === 'keyboard').length;
}
// Відображення деталей товару в модальному вікні
function showProductDetails(product) {
    const modal = document.getElementById('product-modal');
    const content = document.getElementById('product-details-content');
    
    const categoryIcon = product.category === 'mouse' ? '🖱️' : '⌨️';
    const categoryName = product.category === 'mouse' ? 'Миша' : 'Клавіатура';
    
    let detailsHTML = '<div class="product-full-details">';
    detailsHTML += `<h2>${categoryIcon} ${product.name}</h2>`;
    detailsHTML += `<div class="detail-image-wrapper">`;
    detailsHTML += `<img src="${product.image}" alt="${product.name}" class="detail-image" onerror="this.src='https://via.placeholder.com/500x500/7209B7/FFFFFF?text=No+Image'">`;
    detailsHTML += `</div>`;
    detailsHTML += `<div class="detail-price ${product.discount ? 'discount-price' : ''}">${product.price} грн</div>`;
    detailsHTML += `<div class="detail-status ${product.inStock ? 'in-stock' : 'out-of-stock'}">${product.inStock ? '✅ В наявності' : '❌ Немає на складі'}</div>`;
    
    if (product.discount) {
        detailsHTML += '<div class="detail-badge">🔥 Знижка!</div>';
    }
    
    detailsHTML += '<div class="detail-specs">';
    detailsHTML += `<h3>📋 Характеристики</h3>`;
    
    for (let [key, value] of Object.entries(product.details)) {
        if (key !== 'description') {
            const label = {
                sensor: 'Сенсор',
                dpi: 'DPI',
                weight: 'Вага',
                connection: 'Підключення',
                battery: 'Батарея',
                cable: 'Кабель',
                rgb: 'Підсвічування',
                layout: 'Розкладка',
                switches: 'Свічі',
                keycaps: 'Кейкапи',
                polling: 'Polling Rate',
                features: 'Особливості'
            }[key] || key;
            
            detailsHTML += `<div class="spec-row">`;
            detailsHTML += `<span class="spec-label">${label}:</span>`;
            detailsHTML += `<span class="spec-value">${value}</span>`;
            detailsHTML += `</div>`;
        }
    }
    
    detailsHTML += '</div>';
    detailsHTML += `<p class="detail-description">${product.details.description}</p>`;
    detailsHTML += `<button class="detail-order-btn" onclick="openOrderModal(); closeProductModal();">Оформити замовлення</button>`;
    detailsHTML += '</div>';
    
    // Додаємо стилі для деталей
    const style = `
        <style>
            .product-full-details { text-align: center; }
            .detail-image-wrapper { margin: 20px 0; }
            .detail-image { max-width: 100%; height: auto; border-radius: 12px; }
            .detail-price { font-size: 2em; font-weight: bold; color: #C77DFF; margin: 15px 0; }
            .detail-price.discount-price { color: #7FFF00; }
            .detail-status { font-size: 1.2em; margin: 10px 0; font-weight: 600; }
            .detail-status.in-stock { color: #7FFF00; }
            .detail-status.out-of-stock { color: #FF6B9D; }
            .detail-badge { display: inline-block; background: linear-gradient(135deg, #7FFF00, #39FF14); color: #0F0A1F; padding: 8px 20px; border-radius: 20px; font-weight: bold; margin: 10px 0; }
            .detail-specs { background: rgba(114, 9, 183, 0.1); padding: 20px; border-radius: 10px; margin: 20px 0; text-align: left; }
            .detail-specs h3 { color: #C77DFF; margin-bottom: 15px; text-align: center; }
            .spec-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid rgba(199, 125, 255, 0.2); }
            .spec-label { color: #B0B0B0; font-weight: 500; }
            .spec-value { color: #E8E8E8; font-weight: 600; }
            .detail-description { color: #B0B0B0; font-style: italic; margin: 20px 0; }
            .detail-order-btn { width: 100%; padding: 15px; background: linear-gradient(135deg, #7209B7, #B24BF3); color: white; border: none; border-radius: 8px; font-size: 1.1em; font-weight: bold; cursor: pointer; transition: all 0.3s ease; }
            .detail-order-btn:hover { transform: translateY(-2px); box-shadow: 0 6px 30px rgba(178, 75, 243, 0.6); }
        </style>
    `;
    
    content.innerHTML = style + detailsHTML;
    modal.classList.add('active');
}
function closeProductModal() {
    document.getElementById('product-modal').classList.remove('active');
}
function renderProducts() {
    const container = document.getElementById('product-list');
    const productSelect = document.getElementById('product');
    container.innerHTML = ''; 
    productSelect.innerHTML = '<option value="">-- Оберіть товар зі списку --</option>';
    let filteredProducts = products;
    
    if (currentTab === 'mice') {
        filteredProducts = filteredProducts.filter(p => p.category === 'mouse');
    } else if (currentTab === 'keyboards') {
        filteredProducts = filteredProducts.filter(p => p.category === 'keyboard');
    }
    
    if (currentFilter === 'inStock') {
        filteredProducts = filteredProducts.filter(p => p.inStock);
    } else if (currentFilter === 'discount') {
        filteredProducts = filteredProducts.filter(p => p.discount);
    }
    filteredProducts.forEach((item, index) => {
        const div = document.createElement('div');
        div.className = 'product-item';
        div.dataset.index = index;
        div.dataset.name = item.name.toLowerCase();
        div.dataset.category = item.category;
        
        let badgeHTML = '';
        if (item.discount) {
            badgeHTML = '<span class="product-badge discount">Знижка</span>';
        } else if (!item.inStock) {
            badgeHTML = '<span class="product-badge">Немає</span>';
        }
        
        let priceClass = item.discount ? "discount-price" : "";
        let statusClass = item.inStock ? "in-stock" : "out-of-stock";
        let statusText = item.inStock ? "✅ В наявності" : "❌ Немає на складі";
        div.innerHTML = `
            <div class="product-front">
                ${badgeHTML}
                <div class="product-image-wrapper">
                    <img src="${item.image}" alt="${item.name}" class="product-image" loading="lazy" onerror="this.src='https://via.placeholder.com/500x500/7209B7/FFFFFF?text=${item.category === 'mouse' ? 'Mouse' : 'Keyboard'}'">
                </div>
                <h3>${item.name}</h3>
                <p class="product-price ${priceClass}">${item.price} грн</p>
                <p class="product-status ${statusClass}">${statusText}</p>
                <small style="color: #B0B0B0; font-size: 0.8em;">Клікніть для деталей</small>
            </div>
        `;
        
        div.addEventListener('click', function() {
            showProductDetails(item);
        });
        
        container.appendChild(div);
        
        if (item.inStock) {
            const option = document.createElement('option');
            option.value = item.name;
            const categoryIcon = item.category === 'mouse' ? '🖱️' : '⌨️';
            option.textContent = `${categoryIcon} ${item.name} - ${item.price} грн`;
            productSelect.appendChild(option);
        }
    });
    
    if (filteredProducts.length === 0) {
        container.innerHTML = '<p style="text-align: center; padding: 40px; color: #999;">Товарів не знайдено</p>';
    }
}
// Модальне вікно замовлення
function openOrderModal() {
    document.getElementById('order-modal').classList.add('active');
    document.body.style.overflow = 'hidden';
}
function closeOrderModal() {
    document.getElementById('order-modal').classList.remove('active');
    document.body.style.overflow = '';
}
// Мобільне меню
document.getElementById('mobile-menu-btn').addEventListener('click', () => {
    document.getElementById('mobile-menu').classList.add('active');
});
document.getElementById('mobile-menu-close').addEventListener('click', () => {
    document.getElementById('mobile-menu').classList.remove('active');
});
document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', () => {
        document.getElementById('mobile-menu').classList.remove('active');
    });
});
// Відкриття форми замовлення
document.getElementById('order-nav-btn').addEventListener('click', (e) => {
    e.preventDefault();
    openOrderModal();
});
document.getElementById('order-mobile-btn').addEventListener('click', (e) => {
    e.preventDefault();
    openOrderModal();
});
document.getElementById('modal-close').addEventListener('click', closeOrderModal);
document.getElementById('modal-overlay').addEventListener('click', closeOrderModal);
document.getElementById('product-modal-close').addEventListener('click', closeProductModal);
document.getElementById('product-modal-overlay').addEventListener('click', closeProductModal);
// Кнопка зміни теми
document.getElementById('theme-btn').addEventListener('click', () => {
    actionCounter++; 
    console.group(`🎨 Дія #${actionCounter}: Зміна теми`);
    toggleThemeLogic();
    console.groupEnd();
});
// Кнопка розрахунку
document.getElementById('calc-btn').addEventListener('click', () => {
    actionCounter++; 
    console.group(`💰 Дія #${actionCounter}: Підрахунок`);
    const total = calculateTotalInStock(products);
    const inStockProducts = products.filter(p => p.inStock);
    console.table(inStockProducts);
    document.getElementById('status-message').innerText = `💰 Загальна вартість: ${total} грн (${inStockProducts.length} шт.)`;
    console.groupEnd();
});
// Адмін
const systemAccess = (() => {
    return {
        checkAccess: (password) => password === "67" ? "Доступ дозволено" : "Доступ заборонено"
    };
})();
document.getElementById('admin-btn').addEventListener('click', () => {
    const response = systemAccess.checkAccess(prompt("Пароль (підказка: 67):"));
    alert(response);
});
// Рендеринг
updateTabCounts();
renderProducts();
// Вкладки
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        currentTab = this.dataset.tab;
        renderProducts();
    });
});
// Фільтри
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        currentFilter = this.dataset.filter;
        renderProducts();
    });
});
// Пошук
const searchForm = document.getElementById('searchForm');
const searchInput = document.getElementById('searchInput');
searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const query = searchInput.value.trim().toLowerCase();
    
    if (!query) {
        document.getElementById('search-error').textContent = "❌ Введіть назву!";
        return;
    }
    
    const found = products.find(p => p.name.toLowerCase().includes(query));
    
    if (found) {
        document.getElementById('search-error').textContent = "";
        document.getElementById('search-result').textContent = `✅ Знайдено: ${found.name}`;
        
        if (found.category === 'mouse') {
            document.querySelector('[data-tab="mice"]').click();
        } else {
            document.querySelector('[data-tab="keyboards"]').click();
        }
        
        setTimeout(() => showProductDetails(found), 300);
    } else {
        document.getElementById('search-error').textContent = "❌ Не знайдено";
        document.getElementById('search-result').textContent = "";
    }
    
    searchInput.value = "";
});
searchInput.addEventListener('input', () => {
    document.getElementById('search-error').textContent = "";
});
// Практична 3.3
const titleEl = document.getElementById("main-title");
const promoImg = document.querySelector("#promo-banner");
const extraInfoContainer = document.querySelector("#extra-info");
titleEl.textContent = `Вітаємо, Геймер! ${titleEl.textContent}`;
extraInfoContainer.innerHTML = `
    <div style="background: linear-gradient(135deg, #7209B7 0%, #B24BF3 100%); color: #fff; padding: 20px; border-radius: 12px; margin: 20px 0; text-align: center; box-shadow: 0 0 30px rgba(178, 75, 243, 0.5);">
        <h2>🔥 Гаряча пропозиція!</h2>
        <p>Отримайте знижку на всі товари з наявності до кінця дня!</p>
    </div>
`;
// Валідація форми (Практична 3.5)
const validators = {
    fullName: /^[a-zA-Zа-яА-ЯіІїЇєЄґҐ']+\s+[a-zA-Zа-яА-ЯіІїЇєЄґҐ']+.*$/,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    phone: /^\+380\d{9}$/,
    address: /.{10,}/,
    password: /.{8,}/
};
const formFields = {
    fullName: document.getElementById('fullName'),
    email: document.getElementById('email'),
    phone: document.getElementById('phone'),
    address: document.getElementById('address'),
    product: document.getElementById('product'),
    password: document.getElementById('password'),
    comment: document.getElementById('comment'),
    terms: document.getElementById('terms')
};
function showError(field, msg) {
    formFields[field].classList.add('invalid');
    document.getElementById(`${field}-error`).textContent = msg;
}
function clearError(field) {
    formFields[field].classList.remove('invalid');
    formFields[field].classList.add('valid');
    document.getElementById(`${field}-error`).textContent = '';
}
function validateField(field, value) {
    if (field !== 'comment' && !value.trim()) {
        showError(field, 'Обов\'язкове поле');
        return false;
    }
    
    if (field === 'fullName' && !validators.fullName.test(value)) {
        showError(field, 'Введіть ім\'я та прізвище');
        return false;
    }
    if (field === 'email' && !validators.email.test(value)) {
        showError(field, 'Некоректний email');
        return false;
    }
    if (field === 'phone' && !validators.phone.test(value)) {
        showError(field, 'Формат: +380XXXXXXXXX');
        return false;
    }
    if (field === 'address' && value.length < 10) {
        showError(field, 'Мінімум 10 символів');
        return false;
    }
    if (field === 'password' && value.length < 8) {
        showError(field, 'Мінімум 8 символів');
        return false;
    }
    if (field === 'terms' && !formFields.terms.checked) {
        showError(field, 'Потрібна згода');
        return false;
    }
    
    clearError(field);
    return true;
}
document.getElementById('orderForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    let isValid = true;
    const data = {};
    
    for (let field in formFields) {
        const value = field === 'terms' ? formFields[field].checked : formFields[field].value;
        if (!validateField(field, value)) isValid = false;
        data[field] = value;
    }
    
    if (isValid) {
        const msg = document.getElementById('success-message');
        msg.innerHTML = `
            <h3>✅ Замовлення оформлено!</h3>
            <p>Дякуємо, <strong>${data.fullName}</strong>!</p>
            <p>Товар: <strong>${data.product}</strong></p>
            <p>Email: <strong>${data.email}</strong></p>
        `;
        msg.classList.add('show');
        document.getElementById('orderForm').reset();
        
        setTimeout(() => {
            msg.classList.remove('show');
            closeOrderModal();
        }, 5000);
    }
});
