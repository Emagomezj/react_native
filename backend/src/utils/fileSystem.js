import fs from "fs";
import path from "path";
import { BAD_REQUEST, ERROR_SERVER } from "../constants/messages.constant.js"; 

export default class FileSystemHandler {
    constructor(fp, fn){
        this.filename = fn;
        this.filepath = fp;
        this.validateFilePathAndName();
        this.createFileIfNotExists(this.filepath, this.filename);
    }

    validateFilePathAndName = () => {

        if (!this.filepath) throw new Error(BAD_REQUEST);
        if (!this.filename) throw new Error(BAD_REQUEST);
    };

    async createFileIfNotExists(filepath, filename) {
        try {
            await fs.promises.access(path.join(filepath, filename), fs.constants.F_OK);
        } catch (error) {
            if (error.code === "ENOENT") {
                console.log("El archivo no existe. Creando archivo...");
                const defaultContent = JSON.stringify([]);
                await fs.promises.writeFile(path.join(filepath, filename), defaultContent, "utf8");
            } else {
                throw new Error(ERROR_SERVER);
            }
        }
    }
    
    async readFile(){
        this.validateFilePathAndName(this.filepath, this.filename);
    
        try {
            const content = await fs.promises.readFile(path.join(this.filepath, this.filename), "utf8");
            return  JSON.parse(content);
        } catch (error) {
            throw new Error("Error al leer el archivo");
        }
    };
    
    async writeFile(content){
        this.validateFilePathAndName(this.filepath, this.filename);
    
        if (!content) throw new Error(BAD_REQUEST);
    
        try {
            await fs.promises.writeFile(path.join(this.filepath, this.filename), content, "utf8");
            return {status: "succes"}
        } catch (error) {
            throw new Error("Error al escribir el archivo");
        }
    };
    async deleteFile (folder, file) {
        if (!folder) throw new Error(BAD_REQUEST);
        if (!file) throw new Error(BAD_REQUEST);
    
        try {
            await fs.promises.unlink(path.join(folder, file));
            return {status: "succes"}
        } catch (error) {
            if (error.code === "ENOENT") {
                console.warn("El archivo no existe.");
            } else {
                throw new Error("Error al eliminar el archivo");
            }
        }
    };
}