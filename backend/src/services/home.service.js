import UserRepository from "../repositories/user.repository.js";
import ProductRepository from "../repositories/product.repository.js";
import CategoryRepository from "../repositories/category.repository.js";

export default class HomeService{
    #ur;
    #pr;
    #cr
    constructor(){
        this.#pr = new ProductRepository();
        this.#ur = new UserRepository();
        this.#cr = new CategoryRepository();
    };


    async getHome (id) {
        const categories = await this.#cr.getAllCategories()
        if(id){
            const user = await this.#ur.getUserById(id)
            const products = await this.#pr.getManyById(user.recomendation)
            return {products, categories}
        }
        const products = await this.#pr.getColdStart();
        return {products, categories}
    }
}