import { getFromLocale, saveToLocal } from "./helper.js";
import { renderCartItems, renderCartQuantity, renderCartTotal, renderNotFound } from "./ui.js";

const CART = "cart";

let cart = getFromLocale(CART) || [];

// Sepete ürün ekleme
const addToCart = (e, products) => {
    const productId = +e.target.dataset.id;
    const foundProduct = products.find((pro) => pro.id === productId);
    const existingProduct = cart.find((item) => item.id === productId);

    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        const cartItem = {
            ...foundProduct,
            quantity: 1
        };
        cart.push(cartItem);
    }

    // LocalStorage kaydet
    saveToLocal(CART, cart);

    // Buton yazısı değiştir
    e.target.textContent = "Eklendi";
    setTimeout(() => {
        e.target.textContent = "Add To Cart";
    }, 1000);

    // Sepet ikonunu güncelle
    renderCartQuantity(cart);
};

// Sepetteki miktarı değiştir
const onQuantityChange = (e) => {
    const productId = +e.target.dataset.id;
    const newQuantity = +e.target.value;

    if (newQuantity > 0) {
        const updateItem = cart.find((item) => item.id === productId);
        updateItem.quantity = newQuantity;

        saveToLocal(CART, cart);

        renderCartTotal(cart);
        renderCartQuantity(cart);
    } else {
        alert("Miktar 0'dan büyük olmalı");
        e.target.value = 1;
    }
};

// Ürünü sepetten kaldır
const removeFromCart = (e) => {
    const response = confirm("Silmek istediğine emin misin?");
    if (response) {
        const productId = +e.target.dataset.id;
        cart = cart.filter((item) => item.id !== productId);

        saveToLocal(CART, cart);

        renderCartTotal(cart);
        if (cart.length > 0) {
            renderCartItems(cart);
        } else {
            renderNotFound();
        }
    }

    renderCartQuantity(cart);
};

export { addToCart, onQuantityChange, removeFromCart };