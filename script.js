let cart = [];
let total = 0;

function toggleCart() {
    document.getElementById('cart-sidebar').classList.toggle('active');
}

function toggleAuth() {
    let modal = document.getElementById('auth-modal');
    modal.style.display = (modal.style.display === 'block') ? 'none' : 'block';
}

function addToCart(name, price) {
    cart.push({name, price});
    total += price;
    updateCartUI();
    alert(name + " sepete eklendi!");
}

function updateCartUI() {
    document.getElementById('cart-count').innerText = cart.length;
    document.getElementById('total-price').innerText = total;
    
    let cartItemsDiv = document.getElementById('cart-items');
    cartItemsDiv.innerHTML = "";
    cart.forEach((item, index) => {
        cartItemsDiv.innerHTML += `<p>${item.name} - ${item.price} TL</p>`;
    });
}

function checkoutWhatsApp() {
    let message = "Merhaba SKWear! Sepetimdekileri almak istiyorum:%0A";
    cart.forEach(item => {
        message += `- ${item.name} (${item.price} TL)%0A`;
    });
    message += `%0A Toplam: ${total} TL. IBAN gönderir misiniz?`;
    
    window.open(`https://wa.me/905XXXXXXXXX?text=${message}`, '_blank');
}
