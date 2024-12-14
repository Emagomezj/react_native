export const calculate_total_price = (items) =>{
    return parseFloat((items.reduce((acc, item)=>(acc+=item.product.price*item.quantity),0)).toFixed(2))
}


export const formatDate = (input) => {
    const date = new Date(input);

    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString().slice(-2);

    return `${day}/${month}/${year}`;
}