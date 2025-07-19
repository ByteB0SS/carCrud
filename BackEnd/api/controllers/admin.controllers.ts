import { Request, Response } from "express"
import { credentialsInterface } from "./interfaces.controllers.js"
import adminSchema from "../validators/admin.validators.js"
import { getAdminRealCredencials } from "../models/admin.models.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export async function loginAdmin (req: Request, res: Response) {
    const credentials: credentialsInterface = {
        adminName: req.body.adminName,
        passWord: req.body.passWord
    }
    
    const returnedAdminSchema = adminSchema.validate(credentials)
    
    if (!returnedAdminSchema.error){
        //tudo certo 
        let realCredencials = await getAdminRealCredencials(credentials.adminName)

        if(!realCredencials.serverError && !realCredencials.body) {
            //admin não encontrado
            res.status(realCredencials.status).json({
                msg: realCredencials.msg,
                body: realCredencials.body
            })
        }
        
        else if (!realCredencials.serverError && realCredencials.body){
            //usuario encontrado
            try{ 
                bcrypt.compare(credentials.passWord, realCredencials.body[0].pass_word, (err, result) => {
                    if (err) {
                        res.status(500).json({
                            msg: "erro ao comparar senha",
                            body: undefined
                        })
                    }
                    else if (result) {
                        //senha correta
                        const token = jwt.sign({ adminName: realCredencials.body[0].admin_name }, process.env.JWT_SECRET as string, { expiresIn: '1h' })
                        res.status(200).json({
                            msg: "login realizado com sucesso",
                            body: { token }
                        })
                    } else {
                        //senha incorreta
                        res.status(401).json({
                            msg: "senha incorreta",
                            body: undefined
                        })
                    }
                }
            }
            catch (error) {
                res.status(500).json({
                    msg: "erro ao processar a requisição",
                    body: undefined
                })
            }
        }



    }
    else {
        //erro de validação
        res.status(400).json({
            msg: returnedAdminSchema.error.message,
            body: undefined
        })
    }


}