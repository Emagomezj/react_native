import UserRepository from "../repositories/user.repository.js";

export default class UserService{
    #ur
    constructor(){
        this.#ur = new UserRepository();
    };

    async getAll(){
        return await this.#ur.getAllUsers();
    };

    async newUser(data){

        return await this.#ur.addUser(data);
    };

    async findOneById(id){
        return await this.#ur.getUserById(id);
    };

    async findOneByEmailAndPassword(email,password){
        const user = await this.#ur.findOneByEmailAndPassword(email, password);

        return user;
    };

    async updateOneById(id,data){
        return await this.#ur.updateUserById(id, data);
    };

    async deleteUser(id){
        return await this.#ur.deleteOneById(id);
    };
};