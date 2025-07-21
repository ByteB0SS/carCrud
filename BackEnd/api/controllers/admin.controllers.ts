import { Request, Response } from "express";
import { credentialsInterface, updateCredentialsInterface } from "./interfaces.controllers.js";
import { adminSchema, updateCredentialsSchema } from "../validators/admin.validators.js";
import { getAdminRealCredencials, updateAdminCredentialsOnDb, addAdmin, deleteAdminFromDb} from "../models/admin.models.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv'
import pool from "../db.js";
import { send } from "process";
dotenv.config()

export async function getAllAdmins(req: Request, res: Response): Promise<Response> {
  try {
    const [rows] = await pool.query('SELECT id, admin_name, role FROM admins');
    const admins = rows as Array<{ admin_name: string }>;
    if (admins.length === 0) {
      return res.status(404).json({
        body: undefined,
        msg: 'Nenhum admin encontrado.',
        serverError: false,
        status: 404
      });
    }
    return res.status(200).json({
      body: admins,
      msg: 'Admins encontrados com sucesso.',
      serverError: false,
      status: 200
    });
  } catch (error) {
    return res.status(500).json({
      body: undefined,
      msg: 'Erro ao buscar admins.',
      serverError: true,
      status: 500
    });
  }
}

export async function loginAdmin(req: Request, res: Response): Promise<Response> {
    const credentials: credentialsInterface = {
        adminName: req.body.adminName,
        passWord: req.body.passWord
    };

    // Busca credenciais no banco
    const realCredencials = await getAdminRealCredencials(credentials.adminName, 'admin_name');
    if (realCredencials.status !== 200) {
        return res.status(realCredencials.status).json(realCredencials) 
    }

    const adminData = realCredencials.body?.[0];

    if(adminData.admin_name !== credentials.adminName) {
        return res.status(404).json({
            body: undefined,
            msg: "Admin não encontrado",    
            serverError: false,
            status: 404
        });
    }


    try {
        const senhaCorreta = await bcrypt.compare(credentials.passWord, adminData.pass_word);

        if (!senhaCorreta) {
            return res.status(401).json({
                body: undefined,
                msg: "Senha incorreta",
                serverError: false,
                status: 401
            });
        }

        // Gera token JWT
        const token = jwt.sign(
            { adminName: adminData.admin_name, role: adminData.role, id: adminData.id },
            process.env.JWT_SECRET as string,
            { expiresIn: '1h',  }
        );

        return res.status(200).json({
            body: { token },
            msg: "Login realizado com sucesso",
            serverError: false,
            status: 200
        });

    } catch (err) {
        return res.status(500).json({
            body: undefined,
            msg: "Erro ao verificar senha",
            serverError: true,
            status: 500
        });
    }
}


export async function updateCredentials(req: Request, res: Response): Promise<Response> {
  const tokenPayload = res.locals.user;
   const updateCredentialsValues: updateCredentialsInterface = {
    newAdminName: req.body.newAdminName,
    newPassWord: req.body.newPassWord,
    oldAdminName: "",
    id: req.body.id,
  };
  const realCredencials = await getAdminRealCredencials(updateCredentialsValues.id, 'id');
  let oldAdminName = realCredencials.body?.[0].admin_name;
  updateCredentialsValues.oldAdminName = oldAdminName;

  if (req.body.oldAdminName !== tokenPayload.adminName && tokenPayload.role !== 'root') {
    return res.status(403).json({
      body: undefined,
      msg: 'Você não tem permissão para atualizar as credenciais deste admin.',
      serverError: false,
      status: 403
    });
  }

  
  if(realCredencials.status !== 200) {
    return res.status(realCredencials.status).json(realCredencials);
  }

  const hashSenhaNova = await bcrypt.hash(updateCredentialsValues.newPassWord, 15);
  updateCredentialsValues.newPassWord = hashSenhaNova;

  const result = await updateAdminCredentialsOnDb(updateCredentialsValues);

  if (result.status !== 200) {
    return res.status(result.status).json(result);
  }
  
  const newAdminData = await getAdminRealCredencials(updateCredentialsValues.id, 'id');
  if (newAdminData.status !== 200) {
    return res.status(newAdminData.status).json(newAdminData);
  }

  let newToken = jwt.sign(
    {
      adminName: newAdminData.body[0].admin_name,
      role: newAdminData.body[0].role,
      id: newAdminData.body[0].id
    },
    process.env.JWT_SECRET as string,
    { expiresIn: '1h' }
  );

  let bodyContent = undefined

  if (updateCredentialsValues.oldAdminName === tokenPayload.adminName){
    bodyContent = {
      token: newToken
    }
  }

  return res.status(200).json({
      body: bodyContent,
      msg: 'Credenciais atualizadas com sucesso.',
      serverError: false,
      status: 200
  });
}


export async function createAdmin (req: Request, res: Response) {
  const adminData: credentialsInterface = {
    adminName: req.body.adminName,
    passWord: req.body.passWord
  };

  const existingAdmin = await getAdminRealCredencials(adminData.adminName, 'admin_name');
  if (existingAdmin.body && existingAdmin.body.length > 0) {
    return res.status(409).json({
      body: undefined,
      msg: 'Admin já existe.',
      serverError: false,
      status: 409     
    });
  }

  adminData.passWord = await bcrypt.hash(adminData.passWord, 15);

  let result = await addAdmin(adminData.adminName, adminData.passWord)

  return res.status(result.status).json(result)
}

/*

export async function deleteAdmin(req: Request, res: Response) {  
  const token = req.headers["auth"];

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
}

  const existingAdmin = await getAdminRealCredencials(adminData.adminName);
  if (!existingAdmin.body || existingAdmin.body.length === 0) { 
    return res.status(404).json({
      body: undefined,
      msg: 'Admin não encontrado.',
      serverError: false,
      status: 404
    });
  }

  //verifcar quantos admins existem no banco, se não for o último admin, permitir a exclusão
  const [rows] = await pool.query('SELECT COUNT(*) as count FROM admins');
  const count = (rows as Array<{ count: number }>)[0].count;
  if (count <= 1) {
    return res.status(400).json({
      body: undefined,
      msg: 'Não é possível excluir o último admin.',
      serverError: false,
      status: 400
    });
  }

  const adminDataFromDb = existingAdmin.body[0];
  const correctPassWord = await bcrypt.compare(adminData.passWord, adminDataFromDb.pass_word);
  if (!correctPassWord) {
    return res.status(401).json({
      body: undefined,
      msg: 'Senha incorreta.',
      serverError: false,
      status: 401
    });
  }

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


  let result = await deleteAdminFromDb(req.body.adminName);

  return res.status(result.status).json(result);
}

*/