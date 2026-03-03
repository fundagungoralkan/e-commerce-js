import fetchProduct from "./api.js";
import { addToCart, onQuantityChange, removeFromCart } from "./cart.js";
import { getFromLocale } from "./helper.js";
import { renderCartItems, renderCartQuantity, renderCartTotal, renderNotFound, renderProduct } from "./ui.js";

const CART = "cart";

document.addEventListener("DOMContentLoaded", async () => {
    const cart = getFromLocale(CART) || [];
    renderCartQuantity(cart);

    // Ana sayfa
    if (window.location.pathname.endsWith("index.html") || window.location.pathname === "/") {
        const products = await fetchProduct();
        renderProduct(products, (e) => addToCart(e, products));
    } else if (window.location.pathname.endsWith("cart.html")) {
        // Cart sayfası
        if (cart.length > 0) {
            renderCartItems(cart);
            renderCartTotal(cart);
        } else {
            renderNotFound();
        }

        // Event listenerlar cart sayfasında da ekleniyor
        const quantityInputs = document.querySelectorAll(".cart-item-quantity");
        quantityInputs.forEach((input) => {
            input.addEventListener("change", (e) => onQuantityChange(e));
        });

        const removeButtons = document.querySelectorAll(".remove-button");
        removeButtons.forEach((btn) => {
            btn.addEventListener("click", (e) => removeFromCart(e));
        });
    }
});