import FileSystemHandler from "../utils/fileSystem.js";
import { paths } from "../utils/paths.js";

export default class ReceiptsDao {
    #fileSystem;
    constructor(){
        this.data = paths.data;
        this.#fileSystem = new FileSystemHandler(this.data, "receipts.json");
    };
    async getReceipts(){
        const receipts = await this.#fileSystem.readFile()
        return receipts
    };

    async addreceipt(data){
        const receipts = await this.getReceipts()
        receipts.push(data)
        await this.#fileSystem.writeFile(JSON.stringify(receipts, null, 2))
        return data
    };
    
    async getReceiptById(id){
        const receipts = await this.getReceipts()
        const filteredReceipts = receipts.filter(p => p.id === id)
        const receipt = filteredReceipts[0]
        return receipt
    }
}