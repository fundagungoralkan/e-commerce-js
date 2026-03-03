import { onQuantityChange, removeFromCart } from "./cart.js";
import { calculateTotalPrice, calculateTotalQuantity } from "./helper.js";

const uiElement = {
    menuBtn: document.querySelector("#menu-btn"),
    nav: document.querySelector("nav"),
    productsList: document.querySelector("#products-list"),
    cartItems: document.querySelector(".cart-items"),
    cartQuantity: document.querySelector("#basket-btn"),
    totalAmount: document.querySelector(".cart-total")
}


//apiden alinan verileri erkana basma
const renderProduct = (products, callBackFunction) => {
    const productsHtml = products.map(product => `
    <div class="product-hover-card">
      <div class="hover-img">
        <img src="${product.image}" alt="${product.title}" />
      </div>
      <div class="hover-content">
        <h2>${product.title}</h2>
        <p>$${product.price.toFixed(2)}</p>
        <button class="add-to-cart" data-id="${product.id}">Add to cart</button>
      </div>
    </div>
    `).join("");

    uiElement.productsList.innerHTML = productsHtml;

    const addToCartButtons = document.querySelectorAll(".add-to-cart");
    addToCartButtons.forEach(button => {
        button.addEventListener('click', callBackFunction);
    });
};


//urun yoksa
const renderNotFound = () => {
    uiElement.cartItems.innerHTML = ` 
<div class="cookieCard">
  <h1 class="cookieHeading">No items found in cart</h1>
  <p class="cookieDescription">Go to home page to add items to your cart</p>
  <div>
  <a href='../index.html' class="acceptButton">Go to home page</a>
  </div>
</div>
`   
}


//sepektteki sayiya gore iconu guncelle
const renderCartQuantity = (cart) =>{
    //toplam sayiyi bul
    const totalQuantity = calculateTotalQuantity(cart)
    console.log("totalQuantity ", totalQuantity)
    uiElement.cartQuantity.setAttribute('data-quantity', totalQuantity)
}

//sepetteki urunleri render et
const renderCartItems = (cart) =>{

    const cartItemsHtml = cart
         .map(
      (item) => `  <div class="cart-item">
          
            <img
              src="${item.image}"
              alt="cart-item-image"
            />

        
            <div class="cart-item-info">
              <h2 class="cart-item-title">${item.title}</h2>

              <input
                type="number"
                min="1"
                value="${item.quantity}"
                class="cart-item-quantity"
                data-id='${item.id}'
              />
            </div>

           
            <h3 class="cart-item-price">$${item.price}</h3>

     
            <button class="remove-button" data-id='${item.id}'>Remove</button>
          </div>`
    )
    .join("");

    uiElement.cartItems.innerHTML = cartItemsHtml

    //remove tiklanilirsa
    const removeButtons = document.querySelectorAll(".remove-button")

    removeButtons.forEach((button) => {
        button.addEventListener('click',(e) =>{
            //karttan cikar
            removeFromCart(e)
        })
    })

    //urun azaltma
    const quantityInputs = document.querySelectorAll(".cart-item-quantity")

    quantityInputs.forEach((input) =>{
        input.addEventListener("change",(e) =>{
            //degistir
            onQuantityChange(e)
        })
    })

}


//toplami guncelle
const renderCartTotal = (cart) => {
    const totalCartAmount = calculateTotalPrice(cart)
    uiElement.totalAmount.innerText = `$ ${totalCartAmount.toFixed(2)}`
}


export {uiElement, renderProduct, renderCartQuantity, renderNotFound, renderCartItems, renderCartTotal}