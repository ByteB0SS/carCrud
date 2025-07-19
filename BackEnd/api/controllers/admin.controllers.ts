import { Request, Response } from "express";
import { credentialsInterface } from "./interfaces.controllers.js";
import adminSchema from "../validators/admin.validators.js";
import { getAdminRealCredencials } from "../models/admin.models.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { returnType } from "./interfaces.controllers.js";

export async function loginAdmin(req: Request, res: Response): Promise<Response> {
    let dataTobeReturned: returnType
    const credentials: credentialsInterface = {
        adminName: req.body.adminName,
        passWord: req.body.passWord
    };

    // Validação com Joi
    const { error } = adminSchema.validate(credentials);
    if (error) {
        dataTobeReturned = {
            body: undefined,
            msg: error.message,
            serverError: false,
            status: 400
        }

        return res.status(400).json(dataTobeReturned);
    }

    // Busca credenciais no banco
    const realCredencials = await getAdminRealCredencials(credentials.adminName);

    if (realCredencials.serverError) {
        dataTobeReturned = {
            body: undefined,
            msg: realCredencials.msg || "Erro ao buscar credenciais",
            serverError: true,
            status: 500
        }
        return res.status(500).json(dataTobeReturned);
    }

    const adminData = realCredencials.body?.[0];
    if (!adminData) {
        dataTobeReturned = {
            body: undefined,
            msg: realCredencials.msg || "Admin não encontrado",
            serverError: false,
            status: 404
        }
        return res.status(404).json(dataTobeReturned);
    }

    // Verifica senha
    try {
        const senhaCorreta = await bcrypt.compare(credentials.passWord, adminData.pass_word);

        if (!senhaCorreta) {
            dataTobeReturned = {
                body: undefined,
                msg: "Senha incorreta",
                serverError: false,
                status: 401
            }
            return res.status(401).json(dataTobeReturned);
        }

        // Gera token JWT
        const token = jwt.sign(
            { adminName: adminData.admin_name },
            process.env.JWT_SECRET as string,
            { expiresIn: '1h' }
        );
        
        dataTobeReturned = {
            body: { token },
            msg: "Login realizado com sucesso",
            serverError: false,
            status: 200
        };

        return res.status(200).json(dataTobeReturned);

    } catch (err) {
        dataTobeReturned = {
            body: undefined,
            msg: "Erro ao verificar senha",
            serverError: true,
            status: 500
        };
        return res.status(500).json(dataTobeReturned);
    }
}


export async function updateCredentials(req: Request, res: Response){
    
}