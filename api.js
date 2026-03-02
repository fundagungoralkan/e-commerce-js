// api.js → ürünleri db.json'dan çek
const fetchProduct = async () => {
    try{
        const response = await fetch('./db.json')
        const data = await response.json()

        return data.products
    } catch(error) {
        console.log(error)
        return []
    }
}


export default fetchProduct