
export default class ReceiptController{
    #rs
    constructor(){

    }

    async addNewReceipt(req, res){
        console.log(req.body)
        res.sendSuccess200('Operacion exitosa')
    }
}