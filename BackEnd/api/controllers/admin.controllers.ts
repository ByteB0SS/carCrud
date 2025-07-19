import { Request, Response } from "express";
import { credentialsInterface, returnType, updateCredentialsInterface } from "./interfaces.controllers.js";
import adminSchema, { updateCredentialsSchema } from "../validators/admin.validators.js";
import { getAdminRealCredencials, updateAdminCredentialsOnDb, addAdmin} from "../models/admin.models.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv'
import { send } from "process";

dotenv.config()

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


export async function updateCredentials(req: Request, res: Response): Promise<Response> {
  const token = String(req.headers['auth']);

  const updateCredentialsValues: updateCredentialsInterface = {
    newAdminName: req.body.newAdminName,
    newPassWord: req.body.newPassWord,
    oldPassWord: req.body.oldPassWord,
    oldAdminName: req.body.oldAdminName
  };

  const { error } = updateCredentialsSchema.validate(updateCredentialsValues);
  if (error) {
    return res.status(400).json({
      body: undefined,
      msg: error.message,
      serverError: false,
      status: 400
    });
  }

  if (updateCredentialsValues.oldPassWord === updateCredentialsValues.newPassWord) {
    return res.status(400).json({
      body: undefined,
      msg: 'A nova senha não pode ser igual à anterior.',
      serverError: false,
      status: 400
    });
  }

  try {
    const payload = jwt.verify(token, String(process.env.JWT_SECRET)) as { adminName: string };
    const adminName = payload.adminName;

    const realCredencials = await getAdminRealCredencials(adminName);
    const adminData = realCredencials.body?.[0];

    if (!adminData) {
      return res.status(404).json({
        body: undefined,
        msg: 'Admin não encontrado.',
        serverError: false,
        status: 404
      });
    }

    const senhaCorreta = await bcrypt.compare(updateCredentialsValues.oldPassWord, adminData.pass_word);
    if (!senhaCorreta) {
      return res.status(401).json({
        body: undefined,
        msg: 'Senha atual incorreta.',
        serverError: false,
        status: 401
      });
    }

    // Hash da nova senha antes de atualizar no banco
    const hashSenhaNova = await bcrypt.hash(updateCredentialsValues.newPassWord, 10);

    // Atualiza credenciais com a senha já hasheada
    const result = await updateAdminCredentialsOnDb(
      { 
        ...updateCredentialsValues, 
        newPassWord: hashSenhaNova  
      }, 
      updateCredentialsValues.oldAdminName
    );

    if (result.serverError) {
      return res.status(result.status).json(result);
    }

    return res.status(200).json({
      body: null,
      msg: 'Credenciais atualizadas com sucesso.',
      serverError: false,
      status: 200
    });

  } catch (err) {
    return res.status(403).json({
      body: undefined,
      msg: 'Token inválido ou expirado.',
      serverError: false,
      status: 403
    });
  }
}

export async function createAdmin (req: Request, res: Response) {
  const token = req.headers["auth"]

  const adminData: credentialsInterface = {
    adminName: req.body.adminName,
    passWord: req.body.passWord
  };

  const { error } = adminSchema.validate(adminData);
  if (error) {
    return res.status(400).json({
      body: undefined,
      msg: error.message,
      serverError: false,
      status: 400
    });
  }
  //validar token com jwt.verify
  try {
    jwt.verify(String(token), String(process.env.JWT_SECRET));
  } catch (err) {                      
    return res.status(403).json({
      body: undefined,
      msg: 'Token inválido ou expirado.',
      serverError: false,
      status: 403
    });
  }

  const existingAdmin = await getAdminRealCredencials(adminData.adminName);
  if (existingAdmin.body && existingAdmin.body.length > 0) {
    return res.status(409).json({
      body: undefined,
      msg: 'Admin já existe.',
      serverError: false,
      status: 409     
    });
  }

  let result = await addAdmin(adminData.adminName, adminData.passWord)

  return res.status(result.status).json(result)
}