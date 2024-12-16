import ProductService from "../services/product.service.js";
import { deleteFile } from "../utils/deleteFile.js";

export default class ProductController{
    #ps
    constructor(){
        this.#ps = new ProductService();
    }

    async getProducts(req,res){
        try {
            const products = await this.#ps.getAll(req.query)
            res.sendSuccess200(products);
        } catch (error) {
            res.sendError(error);
        };
    };

    async addOne(req,res){
        try {
            const newProduct = await this.#ps.newProduct(req.body, req.file?.filename);
            res.sendSuccess201(newProduct);
        } catch (error) {
            if (req.file?.filename) await deleteFile(paths.images, req.file.filename);
            res.sendError(error);
        };
    };

    async getById(req,res){
        try {
            const {id} = req.params;
            const product = await this.#ps.getOneById(id);
            res.sendSuccess200(product);
        } catch (error) {
            res.sendError(error)
        };
    };

    async updateById(req,res){
        try {
            const {id} = req.params;
            const updatedProduct = await this.#ps.updateOneById(id,req.body);

            res.sendSuccess200(updatedProduct)
        } catch (error) {
            if (req.file?.filename) await deleteFile(paths.images, req.file.filename);
            res.sendError(error)
        };
    };

    async getByUID(req,res){
        try {
            const {uid} = req.params;
            const products = await this.#ps.getByUser(uid);
            res.sendSuccess200(products)
        } catch (error) {
            res.sendError(error)
        };
    };

    async deleteOne(req,res){
        try {
            const {id} = req.params;
            const response = await this.#ps.deleteProduct(id);
            res.sendSuccess200(response)
        } catch (error) {
            res.sendError(error)
        };
    };
}