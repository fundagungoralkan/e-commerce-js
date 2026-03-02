//local den verileri al
const getFromLocale = (key) =>{
    return JSON.parse(localStorage.getItem(key)) || []
}

//locale kaydet
const saveToLocal = (key, data) =>{
    localStorage.setItem(key, JSON.stringify(data))
}


//toplam urun miktarini hesapla
const calculateTotalQuantity = (cart) => {
    console.log("totalQuantity cart ", cart)

    const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0)
    console.log("totalQuantity ", totalQuantity)
    return totalQuantity
}

//sepetteki urun miktarini hesapla
const calculateTotalPrice = (cart) => {
    
    const cartItemsAmount = cart.reduce(
        (total, product) => total + product.quantity * product.price, 0
    )

    let totalAmount

    if(cartItemsAmount < 500){
        totalAmount = cartItemsAmount + 100
    } else {
        totalAmount = cartItemsAmount
    }

    return totalAmount

}

export {getFromLocale, saveToLocal, calculateTotalQuantity, calculateTotalPrice}