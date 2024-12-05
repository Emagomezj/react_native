import FileSystemHandler from "../utils/fileSystem.js";
import { paths } from "../utils/paths.js";


export default class UserDao{
    #fileSystem;
    constructor(){
        this.data = paths.data;
        this.#fileSystem = new FileSystemHandler(this.data, "users.json");
    };

    async getUsers(){
        const users = await this.#fileSystem.readFile()
        return users
    }

    async addUsers(data){
        
        const users = await this.getUsers()
        users.push(data)
        await this.#fileSystem.writeFile(JSON.stringify(users, null, 2))
        return data
    }

    async getUserById(id){
        const users = await this.getUsers()
        const filteredUsers = users.filter(p => p.id === id)
        const user = filteredUsers[0]
        return user
    }

    async getFilteredUsers(filters){

    }

    async updateUsers(data){
        const users = await this.getUsers()
        const filteredUsers = users.filter(p => p.id != data.id)
        const updatedUsers = [...filteredUsers, data]
        await this.#fileSystem.writeFile(JSON.stringify(updatedUsers, null, 2))
        return {status: "succes"}
    };

    async deleteUserById(id){
        const users = await this.getUsers()
        const updatedUsers = users.filter(p => p.id != id)
        await this.#fileSystem.writeFile(JSON.stringify(updatedUsers, null, 2))
        return {status: "succes"}
    };
};