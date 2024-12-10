import FileSystemHandler from "../utils/fileSystem.js";
import { paths } from "../utils/paths.js";

export default class ReceiptsDao {
    #fileSystem;
    constructor(){
        this.data = paths.data;
        this.#fileSystem = new FileSystemHandler(this.data, "receipts.json");
    };

    
}