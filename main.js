import fetchProduct from "./api.js"
import { addToCart } from "./cart.js"
import { getFromLocale } from "./helper.js"
import { renderCartItems, renderCartQuantity, renderCartTotal, renderNotFound, renderProduct, uiElement} from "./ui.js"



const CART = "cart"


document.addEventListener('DOMContentLoaded',async()=>{

 

    //local storage a gore sepet guncelle
    let cart = getFromLocale(CART)

    console.log("cart ", cart)

    renderCartQuantity(cart)

    if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/') {
        
        const products = await fetchProduct()
        console.log(products)

        renderProduct(products,(e)=>{
            console.log(e)

            addToCart(e, products)
        })
    } else {
        if (cart.length > 0) {
            renderCartItems(cart)

           renderCartTotal(cart)

        } else {
            renderNotFound()
        }


    }

})


