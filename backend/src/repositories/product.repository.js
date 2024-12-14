import ProductDao from "../daos/product.dao.js";
import ProductDto from "../dtos/products.dto.js";
import ColdStartDao from "../daos/coldStart.dao.js";
import { ERROR_SERVER, NOT_FOUND_ID } from "../constants/messages.constant.js";
import { v4 as uuidv4 } from 'uuid';

export default class ProductRepository{
    #productDao
    #productDto
    #coldStartDao
    constructor(){
        this.#productDao = new ProductDao();
        this.#productDto = new ProductDto();
        this.#coldStartDao = new ColdStartDao();
    };

    #paginate (array, limit, page) {
        const start = (page - 1) * limit;
        const end = page * limit;
    
        const hasPrev = page > 1;
        const hasNext = end < array.length;
    
        const products = array.slice(start, end);
        return {
            products,
            hasPrev,
            hasNext,
            page,
            totalPages: Math.ceil(array.length / limit),
        };
    }
    async getAllProducts(filters) {
        const {page, limit} = filters
        const products = await this.#productDao.getProducts();
        if(filters?.categories && filters?.categories != 'undefined'){
            const filteredProducts = products.filter(p =>
                p.categories.some(category => filters.categories.includes(category))
              );
            return this.#paginate(filteredProducts, limit, page )
        }
        return this.#paginate( products, limit, page )
    };

    async addProduct(data) {
        const id = uuidv4();
        const formatedData = this.#productDto.newProduct(data,id);
        return await this.#productDao.addProducts(formatedData);
    };

    async getProductById(id){
        return await this.#productDao.getProductById(id)
    };

    async updateProductById(id, data){
        const product = await this.#productDao.getProductById(id);
        if(!product) throw new Error(NOT_FOUND_ID)
        const updatedProduct = {...product, ...data};
        const formatedData = this.#productDto.data(updatedProduct);
        const op = await this.#productDao.updateProducts(formatedData);
        if(op.status != "succes") throw new Error(ERROR_SERVER);
         
        return formatedData
    };

    async updateQuantity(id, op ,quantity){
        const product = await this.#productDao.getProductById(id);
        if(!product) throw new Error(NOT_FOUND_ID)
        const stock = op === "sum" ? product.stock + quantity : product.stock - quantity;
        const updatedProduct = {...product, stock};
        const formatedData = this.#productDto.data(updatedProduct);
        const operation = await this.#productDao.updateProducts(formatedData);
        if(operation.status != "succes") throw new Error(ERROR_SERVER);

        return formatedData
    }

    async getManyById(idArr){
        const ids = new Set(idArr)
        const products = await this.#productDao.getProducts();
        const filteredProducts = products.filter(p => ids.has(p.id));
        return filteredProducts;
    };

    async deleteOneById(id){
        const product = await this.#productDao.getProductById(id);
        if(!product) throw new Error(NOT_FOUND_ID)
        return await this.#productDao.deleteProductById(id)
    };

    async getColdStart () {
        return await this.#coldStartDao.getProducts()
    }

};