import BaseRouter from "../baseRouter.js";
import ProductController from "../../controllers/product.controller.js";
import uploader from "../../utils/uploader.js";

export default class ProductRouter extends BaseRouter {
    #pc;
    constructor(){
        super()
        this.#pc = new ProductController();
    }

    initialize(){
        const router = this.getRouter()

        this.addGetRoute("/", [], (req,res) => this.#pc.getProducts(req,res));

        this.addGetRoute("/:id", [], (req,res) => this.#pc.getById(req,res));

        this.addPostRoute("/add", [], uploader.single("file"), (req,res) => this.#pc.addOne(req,res));

        this.addPutRoute("/update/:id",[], uploader.single("file"), (req,res) => this.#pc.updateById(req,res));

        this.addDeleteRoute("/delete/:id", [], (req,res) => this.#pc.deleteOne(req,res));



        router.use((err, req, res, next) => {
            res.sendError(err);
        });
    }
}