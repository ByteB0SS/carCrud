import type { Request, Response } from "express";
import type { credentialsInterface, updateCredentialsInterface } from "./interfaces.controllers.js";
import { getAdminRealCredencials, updateAdminCredentialsOnDb, addAdmin, deleteAdminFromDb } from "../models/admin.models.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
import pool from "../db.js";

dotenv.config();

// GET all admins
export async function getAllAdmins(req: Request, res: Response): Promise<Response> {
  try {
    const result = await pool.query('SELECT id, admin_name, role FROM admins');
    const admins = result.rows as Array<{ id: number; admin_name: string; role: string }>;

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

// LOGIN admin
export async function loginAdmin(req: Request, res: Response): Promise<Response> {
  const credentials: credentialsInterface = {
    adminName: req.body.adminName,
    passWord: req.body.passWord
  };

  const realCredencials = await getAdminRealCredencials(credentials.adminName, 'admin_name');
  if (realCredencials.status !== 200) return res.status(realCredencials.status).json(realCredencials);

  const adminData = realCredencials.body?.[0];
  if (!adminData || adminData.admin_name !== credentials.adminName) {
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

    const token = jwt.sign(
      { adminName: adminData.admin_name, role: adminData.role, id: adminData.id },
      process.env.JWT_SECRET as string,
      { expiresIn: '30d' }
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

// UPDATE credentials
export async function updateCredentials(req: Request, res: Response): Promise<Response> {
  const tokenPayload = res.locals.user;
  const updateCredentialsValues: updateCredentialsInterface = {
    newAdminName: req.body.newAdminName,
    newPassWord: req.body.newPassWord,
    oldAdminName: "",
    id: req.body.id,
  };

  const realCredencials = await getAdminRealCredencials(updateCredentialsValues.id, 'id');
  if (realCredencials.status !== 200) return res.status(realCredencials.status).json(realCredencials);

  updateCredentialsValues.oldAdminName = realCredencials.body?.[0].admin_name;

  if (req.body.oldAdminName !== tokenPayload.adminName && tokenPayload.role !== 'root') {
    return res.status(403).json({
      body: undefined,
      msg: 'Você não tem permissão para atualizar as credenciais deste admin.',
      serverError: false,
      status: 403
    });
  }

  updateCredentialsValues.newPassWord = await bcrypt.hash(updateCredentialsValues.newPassWord, 15);

  const result = await updateAdminCredentialsOnDb(updateCredentialsValues);
  if (result.status !== 200) return res.status(result.status).json(result);

  const newAdminData = await getAdminRealCredencials(updateCredentialsValues.id, 'id');
  if (newAdminData.status !== 200) return res.status(newAdminData.status).json(newAdminData);

  const newToken = jwt.sign(
    {
      adminName: newAdminData.body[0].admin_name,
      role: newAdminData.body[0].role,
      id: newAdminData.body[0].id
    },
    process.env.JWT_SECRET as string,
    { expiresIn: '30d' }
  );

  const bodyContent = updateCredentialsValues.oldAdminName === tokenPayload.adminName ? { token: newToken } : undefined;

  return res.status(200).json({
    body: bodyContent,
    msg: 'Credenciais atualizadas com sucesso.',
    serverError: false,
    status: 200
  });
}

// CREATE admin
export async function createAdmin(req: Request, res: Response) {
  const tokenPayload = res.locals.user;
  if (tokenPayload.role !== 'root') {
    return res.status(403).json({
      body: undefined,
      msg: 'Você não tem permissão para criar um novo admin.',
      serverError: false,
      status: 403
    });
  }

  const adminData: credentialsInterface = {
    adminName: req.body.adminName,
    passWord: req.body.passWord
  };

  const existingAdmin = await getAdminRealCredencials(adminData.adminName, 'admin_name');
  if (existingAdmin.body?.length) {
    return res.status(409).json({
      body: undefined,
      msg: 'Admin já existe.',
      serverError: false,
      status: 409
    });
  }

  adminData.passWord = await bcrypt.hash(adminData.passWord, 15);

  const result = await addAdmin(adminData.adminName, adminData.passWord);
  return res.status(result.status).json(result);
}

// DELETE admin
export async function deleteAdmin(req: Request, res: Response) {
  const tokenPayload = res.locals.user;
  const adminToBeDeletedId = req.params.id;

  const existingAdmin = await getAdminRealCredencials(String(adminToBeDeletedId), 'id');
  if (!existingAdmin.body?.length) {
    return res.status(404).json({
      body: undefined,
      msg: 'Admin não encontrado.',
      serverError: false,
      status: 404
    });
  }

  const adminData = existingAdmin.body[0];

  if (adminData.admin_name !== tokenPayload.adminName && tokenPayload.role !== 'root') {
    return res.status(403).json({
      body: undefined,
      msg: 'Você não tem permissão para deletar este admin.',
      serverError: false,
      status: 403
    });
  }

  if (adminData.role === 'root') {
    return res.status(403).json({
      body: undefined,
      msg: 'Você não pode deletar um admin com a função root.',
      serverError: false,
      status: 403
    });
  }

  const result = await deleteAdminFromDb(Number(adminToBeDeletedId));
  return res.status(result.status).json(result);
}
