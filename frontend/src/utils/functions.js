export const calculate_total_price = (items) =>{
    return parseFloat((items.reduce((acc, item)=>(acc+=item.product.price*item.quantity),0)).toFixed(2))
}