import ReceiptService from "../services/receipt.service.js"

export default class ReceiptController{
    #rs
    constructor(){
        this.#rs = new ReceiptService();
    }
    
    async addNewReceipt(req, res){
        try {
            const newReceipt = await this.#rs.addOne(req.body);
            res.sendSuccess200(newReceipt);
        } catch (error) {
            res.sendError(error);
        }
    };

    async getReceiptById(req,res){
        try {
            const{id} = req.params.id;
            const receipt = await this.#rs.getById(id);
            res.sendSuccess200(receipt);
        } catch (error) {
            res.sendError(error)
        }
    };

    async getReceiptsbyUserId(req,res) {
        try {
            const{uid} = req.params;
            const receipts = await this.#rs.getUserReceipts(uid)
            res.sendSuccess200(receipts);
        } catch (error) {
            res.sendError(error)
        }
    }

}