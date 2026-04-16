let products = [
    { id: 1, name: "Saten Gece Elbisesi", price: 899, img: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=500" },
    { id: 2, name: "Keten Yazlık Takım", price: 750, img: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?q=80&w=500" }
];

let cart = [];
const phoneNum = "905395196448";

// Sayfa Geçişleri
function showSection(section) {
    document.getElementById('home-section').classList.add('hidden-section');
    document.getElementById('admin-section').classList.add('hidden-section');
    document.getElementById(section + '-section').classList.remove('hidden-section');
}

// Şık Bildirim (Toast)
function showToast(text) {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerText = text;
    container.appendChild(toast);
    setTimeout(() => { toast.remove(); }, 2000);
}

// Ürünleri Listele
function renderProducts() {
    const mainList = document.getElementById('main-product-list');
    const adminList = document.getElementById('admin-product-list');
    
    mainList.innerHTML = '';
    adminList.innerHTML = '<h3>Mevcut Ürünler</h3>';

    products.forEach(p => {
        // Ana Sayfa Kartı
        mainList.innerHTML += `
            <div class="product-card">
                <img src="${p.img}">
                <h3>${p.name}</h3>
                <p><b>${p.price} TL</b></p>
                <button class="add-to-cart" onclick="addToCart(${p.id})">SEPETE EKLE</button>
            </div>
        `;
        // Admin Listesi
        adminList.innerHTML += `<p>${p.name} - ${p.price} TL <button onclick="deleteProduct(${p.id})">Sil</button></p>`;
    });
}

// Sepet İşlemleri
function addToCart(id) {
    const product = products.find(p => p.id === id);
    cart.push(product);
    updateCart();
    showToast("✅ " + product.name + " Sepete Eklendi!");
}

function updateCart() {
    document.getElementById('cart-count').innerText = cart.length;
    const itemsCont = document.getElementById('cart-items-container');
    let total = 0;
    itemsCont.innerHTML = '';
    
    cart.forEach((item, index) => {
        total += item.price;
        itemsCont.innerHTML += `<div style="display:flex; justify-content:space-between; margin-bottom:10px;">
            <span>${item.name}</span>
            <span>${item.price} TL</span>
        </div>`;
    });
    document.getElementById('total-price').innerText = total;
}

function toggleCart() {
    document.getElementById('cart-sidebar').classList.toggle('active');
}

// Admin Fonksiyonları
function adminAddProduct() {
    const name = document.getElementById('p-name').value;
    const price = parseInt(document.getElementById('p-price').value);
    const img = document.getElementById('p-img').value;

    if(name && price && img) {
        products.push({ id: Date.now(), name, price, img });
        renderProducts();
        showToast("🚀 Yeni ürün başarıyla eklendi!");
    }
}

function deleteProduct(id) {
    products = products.filter(p => p.id !== id);
    renderProducts();
}

function checkoutWhatsApp() {
    if(cart.length === 0) return showToast("Sepetiniz boş!");
    let msg = "Merhaba SKWear, Sipariş Vermek İstiyorum:%0A";
    let total = 0;
    cart.forEach(item => {
        msg += `- ${item.name} (${item.price} TL)%0A`;
        total += item.price;
    });
    msg += `%0A*Toplam Tutar: ${total} TL*`;
    window.open(`https://wa.me/${phoneNum}?text=${msg}`, '_blank');
}

// İlk Çalıştırma
renderProducts();
