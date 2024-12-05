import UserService from "../services/user.service.js";

export default class UserController{
    #us
    constructor(){
        this.#us = new UserService();
    }

    async getUsers(req,res){
        try {
            const users = await this.#us.getAll()
            res.sendSuccess200(users);
        } catch (error) {
            res.sendError(error);
        };
    };

    async addOne(req,res){
        try {
            const newUser = await this.#us.newUser(req.body);
            res.sendSuccess201(newUser);
        } catch (error) {
            res.sendError(error);
        };
    };

    async getById(req,res){
        try {
            const {id} = req.params;
            const user = await this.#us.findOneById(id);
            res.sendSuccess200(user);
        } catch (error) {
            res.sendError(error)
        };
    };

    async updateById(req,res){
        try {
            const {id} = req.params;
            const updatedUser = await this.#us.updateOneById(id,req.body);

            res.sendSuccess200(updatedUser)
        } catch (error) {
            res.sendError(error)
        };
    };

    async deleteOne(req,res){
        try {
            const {id} = req.params;
            const response = await this.#us.deleteUser(id);
            res.sendSuccess200(response)
        } catch (error) {
            res.sendError(error)
        };
    };
}