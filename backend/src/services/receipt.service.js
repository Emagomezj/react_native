import ReceiptRepository from "../repositories/receipt.repository.js";
import UserRepository from "../repositories/user.repository.js";
import ProductRepository from "../repositories/product.repository.js";
import { NOT_FOUND_ID } from "../constants/messages.constant.js";

export default class ReceiptService{
    #rr;
    #pr;
    #ur;
    constructor(){
        this.#rr = new ReceiptRepository();
        this.#pr = new ProductRepository();
        this.#ur = new UserRepository();
    };

    async addOne (data) {
        const productsId = [];
        const productsData = []
        data.cart.forEach(p => {
            productsId.push(p.product.id)
            productsData.push({pid: p.product.id, quantity: p.quantity})
        });
        const products = await this.#pr.getManyById(productsId)
        data.cart.forEach(i => {
            const product = products.find(p => p.id === i.product.id);
            if(!product) throw new Error(NOT_FOUND_ID)
            if(product.stock < i.quantity) throw new Error("No hay suficientes productos para realizar la compra")
        });
        const receipt = await this.#rr.addReceipt(data);
        products.forEach(async (p) =>{
            const receiptProduct = productsData.find(i => i.pid === p.id)
            const quantity = receiptProduct.quantity
            await this.#pr.updateQuantity(p.id, "res", quantity)
        });
        await this.#ur.updateReceipts(data.user, receipt.id);
        return receipt;
    };

    async getUserReceipts(uid) {
        const user = await this.#ur.getUserById(uid);
        
        return await this.#rr.getManyById(user.receipts)
    };

    async getById(id){
        return await this.#rr.getOneById(id)
    }
}