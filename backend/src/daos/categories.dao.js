import FileSystemHandler from "../utils/fileSystem.js";
import { paths } from "../utils/paths.js";


export default class CategoryDao{
    #fileSystem;
    constructor(){
        this.data = paths.data;
        this.#fileSystem = new FileSystemHandler(this.data, "categories.json");
    };

    async getCategories(){
        const categories = await this.#fileSystem.readFile()
        return categories
    }

    async addCategories(data){
        
        const categories = await this.getCategories()
        categories.push(data)
        await this.#fileSystem.writeFile(JSON.stringify(categories, null, 2))
        return data
    }

    async getCategoryById(id){
        const categories = await this.getCategories()
        const filteredCategories = categories.filter(p => p.id === id)
        const user = filteredCategories[0]
        return user
    }

    async getFilteredCategories(filters){

    }

    async updateCategories(data){
        const categories = await this.getCategories()
        const filteredCategories = categories.filter(p => p.id != data.id)
        const updatedCategories = [...filteredCategories, data]
        await this.#fileSystem.writeFile(JSON.stringify(updatedCategories, null, 2))
        return {status: "succes"}
    };

    async deleteCategoryById(id){
        const categories = await this.getCategories()
        const updatedCategories = categories.filter(p => p.id != id)
        await this.#fileSystem.writeFile(JSON.stringify(updatedCategories, null, 2))
        return {status: "succes"}
    };
};