import BaseRouter from "../baseRouter.js";
import ReceiptController from "../../controllers/receipt.controller.js";

export default class ReceiptRouter extends BaseRouter {
    #rc;
    constructor(){
        super()
        this.#rc = new ReceiptController();
    }

    initialize(){
        const router = this.getRouter()

        this.addGetRoute('/user/:uid', [], (req,res) => this.#rc.getReceiptsbyUserId(req,res));
        this.addPostRoute('/add', [], (req, res) => this.#rc.addNewReceipt(req, res));



        router.use((err, req, res, next) => {
            res.sendError(err);
        });
    }
}