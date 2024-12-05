import FileSystemHandler from "../utils/fileSystem.js";
import { paths } from "../utils/paths.js";


export default class ProductDao{
    #fileSystem;
    constructor(){
        this.data = paths.data;
        this.#fileSystem = new FileSystemHandler(this.data, "products.json");
    };

    async getProducts(){
        const products = await this.#fileSystem.readFile()
        return products
    }

    async addProducts(data){
        const products = await this.getProducts()
        products.push(data)
        await this.#fileSystem.writeFile(JSON.stringify(products, null, 2))
        return data
    }

    async getProductById(id){
        const products = await this.getProducts()
        const filteredProducts = products.filter(p => p.id === id)
        const product = filteredProducts[0]
        return product
    }

    async getFilteredProducts(filters){

    }

    async updateProducts(data){
        const products = await this.getProducts()
        const filteredProducts = products.filter(p => p.id != data.id)
        const updatedProducts = [...filteredProducts, data]
        await this.#fileSystem.writeFile(JSON.stringify(updatedProducts, null, 2))
        return {status: "succes"}
    }

    async deleteProductById(id){
        const products = await this.getProducts()
        const updatedProducts = products.filter(p => p.id != id)
        await this.#fileSystem.writeFile(JSON.stringify(updatedProducts, null, 2))
        return {status: "succes"}
    }
};