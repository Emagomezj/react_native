import BaseRouter from "../baseRouter.js";
import UserController from "../../controllers/user.controller.js";

export default class UserRouter extends BaseRouter {
    #uc;
    constructor(){
        super()
        this.#uc = new UserController();
    }

    initialize(){
        const router = this.getRouter()

        this.addGetRoute("/", [], (req,res) => this.#uc.getUsers(req,res));

        this.addGetRoute("/:id", [], (req,res) => this.#uc.getById(req,res));

        this.addPostRoute("/create", [], (req,res) => this.#uc.addOne(req,res));

        this.addPutRoute("/update/:id",[], (req,res) => this.#uc.updateById(req,res));

        this.addDeleteRoute("/delete/:id", [], (req,res) => this.#uc.deleteOne(req,res));



        router.use((err, req, res, next) => {
            res.sendError(err);
        });
    }
}