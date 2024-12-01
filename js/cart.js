export let cart = JSON.parse(localStorage.getItem('cart')) || [];

export function renderCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');

    if (!cartItemsContainer || !cartTotalElement) return;

    if (!cart.length) {
        cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
        cartTotalElement.textContent = '$0.00';
        return;
    }

    let total = 0;
    cartItemsContainer.innerHTML = cart.map(({ id, image, title, price, quantity }) => {
        total += price * quantity;
        return `
            <li class="cart-item">
                <img src="${image}" alt="${title}">
                <h4>${title}</h4>
                <div class="cart-item__quantity">
                    <button class="cart-decrease" data-id="${id}">-</button>
                    <input type="text" value="${quantity}" readonly>
                    <button class="cart-increase" data-id="${id}">+</button>
                </div>
                <p>$${(price * quantity).toFixed(2)}</p>
                <button class="cart-remove" data-id="${id}">Remove</button>
            </li>
        `;
    }).join('');
    cartTotalElement.textContent = `$${total.toFixed(2)}`;
}

export function addToCart(product) {
    const existing = cart.find(({ id }) => id === product.id);
    if (existing) {
        existing.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    saveCartAndUpdate();
}

export function saveCartAndUpdate() {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    renderCart();
}

export function updateCartCount() {
    const count = cart.reduce((total, { quantity }) => total + quantity, 0);
    const basketCountElement = document.querySelector('.header__basket-count');
    if (basketCountElement) {
        basketCountElement.textContent = count;
    }
}

export function initCart() {
    renderCart();
    updateCartCount();

    const basketButton = document.querySelector('.header__action-basket');
    const cartPopup = document.getElementById('cart-popup');
    const cartOverlay = document.getElementById('cart-overlay');
    const closeCartButton = document.getElementById('close-cart');

    if (!basketButton || !cartPopup || !cartOverlay || !closeCartButton) return;

    const toggleCartVisibility = (isVisible) => {
        cartPopup.classList.toggle('hidden', !isVisible);
        cartOverlay.classList.toggle('hidden', !isVisible);
    };

    basketButton.addEventListener('click', () => toggleCartVisibility(true));
    closeCartButton.addEventListener('click', () => toggleCartVisibility(false));
    cartOverlay.addEventListener('click', (e) => {
        if (e.target === cartOverlay) toggleCartVisibility(false);
    });

    document.addEventListener('click', ({ target }) => {
        const id = target.dataset.id;
        const item = cart.find(({ id: itemId }) => itemId === id);

        if (!id || !item) return;

        if (target.classList.contains('cart-decrease')) {
            item.quantity > 1 ? item.quantity-- : cart.splice(cart.indexOf(item), 1);
        } else if (target.classList.contains('cart-increase')) {
            item.quantity++;
        } else if (target.classList.contains('cart-remove')) {
            cart = cart.filter(({ id: itemId }) => itemId !== id);
        }
        saveCartAndUpdate();
    });
}
