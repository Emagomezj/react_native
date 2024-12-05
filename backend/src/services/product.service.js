import ProductRepository from "../repositories/product.repository.js";

export default class ProductService{
    #pr
    constructor(){
        this.#pr = new ProductRepository();
    };

    async getAll(querys){
        const filters = {
            limit: Math.max(1, parseInt(querys?.limit) || 10),
            page: Math.max(1, parseInt(querys?.page) || 1),
            categories: querys?.categories
        }

        return await this.#pr.getAllProducts(filters);
    };

    async newProduct(data, filename){

        return await this.#pr.addProduct({...data, thumbnail: filename ?? null});
    };

    async getOneById(id){
        return await this.#pr.getProductById(id);
    };

    async updateOneById(id,data){
        return await this.#pr.updateProductById(id, data);
    };

    async deleteProduct(id){
        return await this.#pr.deleteOneById(id);
    };
};