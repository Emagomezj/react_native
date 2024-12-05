import HomeService from "../services/home.service.js";
export default class HomeController {
    #hs;
    constructor (){
        this.#hs = new HomeService();
    };

    async getRecomendations (req,res) {
        try {
            const id = req.query?.id
            const homeData = await this.#hs.getHome(id)
            res.sendSuccess200(homeData)
        } catch (error) {
            res.sendError(error)
        }
    }
}