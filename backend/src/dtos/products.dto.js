import { BAD_REQUEST } from "../constants/messages.constant.js"

export default class ProductDto{

    newProduct (data, id){
        if( !data.title || !data.price || !data.stock) throw new Error(BAD_REQUEST)
        return {
            id,
            title: data?.title,
            description: data?.description,
            categories: data.categories,
            price: data.price,
            stock: data.stock,
            thumbnail: data?.thumbnail || "/public/images/default_product.jpg"
        }
    };

    data(data){
        return {
            id: data.id,
            title: data?.title,
            description: data?.description,
            categories: data.categories || [],
            price: data.price,
            stock: data.stock,
            thumbnail: data?.thumbnail || "/public/images/default_product.jpg"
        }
    }
}