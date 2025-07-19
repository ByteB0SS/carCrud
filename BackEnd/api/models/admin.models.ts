import pool from "../db.js";
import { sqlReturnInterface } from "../controllers/interfaces.controllers.js";
import { array } from "joi";

export async function getAdminRealCredencials (admin: string): Promise<sqlReturnInterface> {
    try{
        let [row, trush] = await pool.query('select admin_name, pass_word from admins where admin_name like ?;',[admin])

        let rowAux = row as Array<{admin_name: string, pass_word: string}>
        if(rowAux.length === 0){
            return {
                body: undefined,
                msg: "admin não encontrado",
                serverError: false,
                status: 404
            }
        }        
        

        return {
            body: row,
            msg: "sucesso",
            serverError: false,
            status: 200
        }
    }

    catch {
        return {
            body: undefined,
            msg: "erro na cenexão com banco de dados",
            serverError: true,
            status: 500
        }
    }
}