import { renderCart, updateCartCount, cart } from './cart.js';

export function initCheckoutForm() {
    const elements = {
        checkoutButton: document.getElementById('checkout-button'),
        formOverlay: document.getElementById('checkout-form-overlay'),
        formContainer: document.getElementById('checkout-form'),
        cancelButton: document.getElementById('cancel-order'),
        orderForm: document.getElementById('order-form'),
        cartTotalElement: document.getElementById('cart-total'),
    };

    if (Object.values(elements).some(el => !el)) return;

    const { checkoutButton, formOverlay, formContainer, cancelButton, orderForm, cartTotalElement } = elements;

    const toggleFormVisibility = (isVisible) => {
        formOverlay.classList.toggle('hidden', !isVisible);
        formContainer.classList.toggle('hidden', !isVisible);
        if (!isVisible) orderForm.reset();
    };

    checkoutButton.addEventListener('click', () => {
        if (cart.length === 0) {
            alert('Your cart is empty. Add items before checking out.');
            return;
        }
        toggleFormVisibility(true);
    });

    cancelButton.addEventListener('click', () => toggleFormVisibility(false));
    formOverlay.addEventListener('click', (e) => {
        if (e.target === formOverlay) toggleFormVisibility(false);
    });

    orderForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        if (cart.length === 0) {
            alert('Your cart is empty. Add items before submitting an order.');
            return;
        }

        const formData = new FormData(orderForm);
        const orderDetails = {
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            comment: formData.get('comment'),
            cart: cart.map(({ quantity, title, price }) => `${quantity} x ${title} ($${price})`).join(', '),
            total: cartTotalElement?.textContent || '$0.00',
        };

        try {
            const response = await fetch('https://formspree.io/f/myzyblyg', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(orderDetails),
            });

            if (!response.ok) throw new Error();

            alert(`Thanks for your order, ${orderDetails.name}! We will contact you.`);
            clearCart();
            toggleFormVisibility(false);
        } catch {
            alert('Error in order submission. Please try again.');
        }
    });

    function clearCart() {
        cart.length = 0;
        localStorage.removeItem('cart');
        renderCart();
        updateCartCount();
    }
}
