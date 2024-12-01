import { addToCart } from './cart.js';

let products = [];

async function fetchProducts() {
    try {
        const response = await fetch('./api/products.json');
        if (!response.ok) throw new Error(`Failed to load products: ${response.status}`);
        products = await response.json();
        renderProducts();
    } catch {
        alert('Failed to fetch products. Please try again later.');
    }
}

function renderProducts() {
    const container = document.querySelector('.products__list');
    if (!container) return;

    container.innerHTML = products.map(({ id, image, title, description, price }) => `
        <article class="product-card">
            <img src="${image}" alt="${title}">
            <h3>${title}</h3>
            <p>${description}</p>
            <button class="button button-card" data-id="${id}">Buy - $${price}</button>
        </article>
    `).join('');
}

document.addEventListener('click', ({ target }) => {
    if (target.matches('.button-card')) {
        const product = products.find(({ id }) => id === target.dataset.id);
        if (product) addToCart(product);
    }
});

export function initProductList() {
    fetchProducts();
}
