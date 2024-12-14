import ReceiptsDao from "../daos/receipts.dao.js";
import UserRepository from "./user.repository.js";
import ProductRepository from "./receipt.repository.js";
import { ERROR_SERVER, NOT_FOUND_ID } from "../constants/messages.constant.js";
import { v4 as uuidv4 } from 'uuid';


export default class ReceiptRepository{
    #rd;
    constructor() {
        this.#rd = new ReceiptsDao();
    };

    async addReceipt(data) {
        const id = uuidv4();
        const formatedData = {...data,id};
        const receipt = await this.#rd.addreceipt(formatedData);
        if(!receipt) throw new Error("Ha habido un error al crear el receipt");
        return receipt
    };

    async getOneById(id){
        return await this.#rd.getReceiptById(id)
    }

    async getManyById(idArr){
        const ids = new Set(idArr)
        const receipts = await this.#rd.getReceipts();
        const filteredReceipts = receipts.filter(r => ids.has(r.id));
        return filteredReceipts;
    };
}