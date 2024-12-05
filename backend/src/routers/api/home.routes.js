import BaseRouter from "../baseRouter.js";
import HomeController from "../../controllers/home.controller.js";

export default class HomeRouter extends BaseRouter{
    #hc;
    constructor () {
        super();
        this.#hc = new HomeController();
    }

    initialize () {
        const router = this.getRouter();

        this.addGetRoute("/", [], (req,res) => this.#hc.getRecomendations(req,res));

        router.use((err, req, res,next) => {
            res.sendError(err)
        })
    }
}