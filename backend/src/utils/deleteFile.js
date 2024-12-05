import fs from "fs";
import path from "path";
import { BAD_REQUEST, ERROR_SERVER } from "../constants/messages.constant.js"; 


export const deleteFile = async (folder, file) => {
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