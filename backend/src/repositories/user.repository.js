import UserDao from "../daos/user.dao.js";
import {UserDto} from "../dtos/user.dto.js";
import { passwordValidator } from "../utils/passHandler.js";
import { ERROR_SERVER, NOT_FOUND_ID, NOT_FOUND_CREDENTIALS } from "../constants/messages.constant.js";
import { v4 as uuidv4 } from 'uuid';

export default class UserRepository{
    #userDao
    #userDto
    constructor(){
        this.#userDao = new UserDao();
        this.#userDto = new UserDto();
    };

    async getAllUsers() {
       const users = await this.#userDao.getUsers();
       const formatedUsers = users.map(u => this.#userDto.model(u))
       return formatedUsers
    };

    async addUser(data) {
        const pattern = /^[a-zA-z0-9._+-]+@[a-zA-Z]+\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?$/
        if(!pattern.test(data.email)) throw new Error("Por favor ingrese un email válido")
        const users = await this.#userDao.getUsers();
        if(users.length === 0){
            const id = uuidv4();
            const formatedData = this.#userDto.data({...data,id});
            await this.#userDao.addUsers(formatedData);
            return this.#userDto.model(formatedData)
        }
        const duplicatedEmail = users.filter(u => u.email === data.email);
        if(duplicatedEmail.length != 0) throw new Error("El email ingresado ya se encuentra en uso")
        const id = uuidv4();
        const formatedData = this.#userDto.data({...data,id});
        await this.#userDao.addUsers(formatedData);
        return this.#userDto.model(formatedData)
    };

    async getUserById(id){
        const user = await this.#userDao.getUserById(id)
        return this.#userDto.model(user)
    };

    async findOneByEmailAndPassword(email, password){
        const users = this.#userDao();
        const filteredUsers = users.map(u => u.email === email);
        if(filteredUsers[0]) throw new Error(NOT_FOUND_CREDENTIALS)
        const user = filteredUsers[0]
        const hash = user.password
        if(passwordValidator(password, hash)) throw new Error(NOT_FOUND_CREDENTIALS);
        return this.#userDto.model(user)
    };

    async updateUserById(id, data){
        const user = await this.#userDao.getUserById(id);
        if(!user) throw new Error(NOT_FOUND_ID)
        const updatedUser = {...user, ...data};
        const formatedData = this.#userDto.data(updatedUser);
        const op = await this.#userDao.updateUsers(formatedData);
        if(op.status != "succes") throw new Error("Error al actualizar la información del usuario");
         
        return this.#userDto.model(formatedData)
    };

    async deleteOneById(id){
        const user = await this.#userDao.getUserById(id);
        if(!user) throw new Error(NOT_FOUND_ID)
        return await this.#userDao.deleteUserById(id)
    };

    async getRecomendation (id) {
        const user = await this.#userDao.getUserById(id);
        return user.recomendation
    }

};