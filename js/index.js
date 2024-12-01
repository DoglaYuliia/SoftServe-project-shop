async function init() {
    try {
        const cartModule = await import("./cart.js");
        const productListModule = await import("./product-list.js");
        const checkoutModule = await import("./checkout.js");
        const countdownModule = await import("./countdown-date-time.js");
        const feedbackModule = await import("./feedback-form.js");

        if (cartModule?.initCart) cartModule.initCart();
        if (productListModule?.initProductList) productListModule.initProductList();
        if (checkoutModule?.initCheckoutForm) checkoutModule.initCheckoutForm();
        if (countdownModule?.initCountdown) countdownModule.initCountdown();
        if (feedbackModule?.initFeedbackForm) feedbackModule.initFeedbackForm();
    } catch (error) {
        alert("Error during initialization. Please try again.");
    }
}

const totalPartials = document.querySelectorAll(
    '[hx-trigger="load"], [data-hx-trigger="load"]'
).length;
let loadedPartialsCount = 0;

document.body.addEventListener("htmx:afterOnLoad", () => {
    loadedPartialsCount++;
    if (loadedPartialsCount === totalPartials) {
        init();
    }
});
