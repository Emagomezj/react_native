import CategoryDao from "../daos/categories.dao.js";

export default class CategoryRepository{
    #cd
    constructor(){
        this.#cd = new CategoryDao();
    }

    async getAllCategories () {
        return await this.#cd.getCategories()
    }
}