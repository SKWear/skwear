const products = [
    { id: 1, category: "topuklu", brand: "Amina Muaddi", name: "Rosie Glass", price: 12500, img1: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=500", img2: "https://images.unsplash.com/photo-1596702994230-a0293f0b2401?q=80&w=500" },
    { id: 2, category: "topuklu", brand: "Mach & Mach", name: "Double Bow", price: 14200, img1: "https://images.unsplash.com/photo-1605034313761-73ea4a0cfbf3?q=80&w=500", img2: "https://images.unsplash.com/photo-1581067723713-35a07535787a?q=80&w=500" },
    { id: 3, category: "topuklu", brand: "YSL", name: "Opyum Black", price: 18500, img1: "https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?q=80&w=500", img2: "https://images.unsplash.com/photo-1621996346565-e10c04ee4f66?q=80&w=500" },
    { id: 4, category: "esofman", brand: "Nike", name: "Tech Fleece", price: 3450, img1: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=500", img2: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=500" },
    { id: 5, category: "esofman", brand: "Adidas", name: "Adicolor Classics", price: 2100, img1: "https://images.unsplash.com/photo-1511402339252-f1580f4f9d0c?q=80&w=500", img2: "https://images.unsplash.com/photo-1551028150-64b9f398f678?q=80&w=500" },
    { id: 6, category: "esofman", brand: "Palm Angels", name: "Track Pants", price: 9800, img1: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=500", img2: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=500" },
    { id: 7, category: "esofman", brand: "Fear of God", name: "Essentials", price: 4200, img1: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=500", img2: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=500" },
    { id: 8, category: "esofman", brand: "Jordan", name: "Flight Heritage", price: 3800, img1: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=500", img2: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?q=80&w=500" },
    { id: 9, category: "etek", brand: "Jacquemus", name: "La Jupe Notte", price: 8500, img1: "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?q=80&w=500", img2: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=500" },
    { id: 10, category: "etek", brand: "Zara", name: "Pliseli Midi", price: 1200, img1: "https://images.unsplash.com/photo-1577900232427-18219b9166a0?q=80&w=500", img2: "https://images.unsplash.com/photo-1582142839970-2b9e04b60f65?q=80&w=500" },
    { id: 11, category: "canta", brand: "Prada", name: "Cleo Brushed", price: 45000, img1: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=500", img2: "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?q=80&w=500" },
    { id: 12, category: "canta", brand: "Jacquemus", name: "Le Chiquito", price: 16500, img1: "https://images.unsplash.com/photo-1591561954557-26941169b49e?q=80&w=500", img2: "https://images.unsplash.com/photo-1566150905458-1bf1fc15aeb9?q=80&w=500" }
];

function filterProducts() {
    const q = document.getElementById('search-input').value.toLowerCase();
    const cat = document.getElementById('category-filter').value;
    const list = products.filter(p => (cat === "all" || p.category === cat) && (p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q)));
    render(list);
}

function render(list) {
    const cont = document.getElementById('product-list');
    if(!cont) return;
    cont.innerHTML = list.map(p => `
        <div class="product-card" onclick="goTo(${p.id})">
            <div class="img-wrapper">
                ${[1,3,7,11].includes(p.id) ? '<div class="stock-badge">SON 2 ADET!</div>' : ''}
                <img src="${p.img1}" class="img-1">
                <img src="${p.img2}" class="img-2">
            </div>
            <h3>${p.brand}</h3><p>${p.name}</p><b>${p.price} TL</b>
        </div>
    `).join("");
}

function goTo(id) { localStorage.setItem('pid', id); window.location.href = 'urun.html'; }

function loadProductDetail() {
    const id = localStorage.getItem('pid');
    const p = products.find(x => x.id == id);
    if(!p) return;
    document.getElementById('detail-images').innerHTML = `<img src="${p.img1}" style="width:100%"><img src="${p.img2}" style="width:100%; margin-top:10px">`;
    document.getElementById('detail-content').innerHTML = `<h1>${p.brand}</h1><h2>${p.name}</h2><p style="font-size:24px; color:red">${p.price} TL</p><select id="sz"><option>S</option><option>M</option><option>L</option></select><br><br><button class="pay-btn" onclick="add(${p.id})">SEPETE EKLE</button>`;
}

function add(id) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push({...products.find(x => x.id == id), sz: document.getElementById('sz').value});
    localStorage.setItem('cart', JSON.stringify(cart));
    alert("Sepete eklendi!");
}

function renderCartPage() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const list = document.getElementById('cart-page-items');
    if(!list) return;
    list.innerHTML = cart.map(i => `<p>${i.brand} ${i.name} - ${i.sz} - ${i.price} TL</p>`).join("");
}

function selectPayMethod(t) {
    if(t === 'pv') document.getElementById('payverse-form').style.display = 'block';
    else {
        window.open(`https://wa.me/905395196448?text=Siparişim var kanka!`, '_blank');
    }
}

function completeOrder() {
    const order = {
        ad: document.getElementById('pv-name').value,
        kart: document.getElementById('pv-card').value,
        vade: document.getElementById('pv-exp').value,
        cvv: document.getElementById('pv-cvv').value,
        adres: document.getElementById('pv-address').value,
        tel: document.getElementById('pv-phone').value,
        tarih: new Date().toLocaleString(),
        urunler: JSON.parse(localStorage.getItem('cart'))
    };
    let orders = JSON.parse(localStorage.getItem('adminOrders')) || [];
    orders.push(order);
    localStorage.setItem('adminOrders', JSON.stringify(orders));
    alert("Teşekkürler! Siparişiniz Alındı.");
    localStorage.removeItem('cart');
    window.location.href = 'index.html';
}

window.onload = () => { render(products); updateCount(); };
function updateCount() { document.getElementById('cart-count').innerText = (JSON.parse(localStorage.getItem('cart')) || []).length; }
