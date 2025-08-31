import pool from "../db.js";
import type { returnType, updateCredentialsInterface } from "../controllers/interfaces.controllers.js";
import jwt from "jsonwebtoken";

// Buscar admin
export async function getAdminRealCredencials(value: string | number, ref: string): Promise<returnType> {
  try {
    const query = `SELECT id, role, admin_name, pass_word FROM admins WHERE ${ref} = $1;`;
    const { rows } = await pool.query(query, [value]);

    if (rows.length === 0) {
      return {
        body: undefined,
        msg: "admin não encontrado",
        serverError: false,
        status: 404
      };
    }

    return {
      body: rows,
      msg: "sucesso",
      serverError: false,
      status: 200
    };
  } catch (err) {
    console.log("erro na conexão com o banco de dados", err);
    return {
      body: undefined,
      msg: "erro na conexão com banco de dados",
      serverError: true,
      status: 500
    };
  }
}

// Atualizar credenciais
export async function updateAdminCredentialsOnDb(admin: updateCredentialsInterface): Promise<returnType> {
  try {
    await pool.query(
      "UPDATE admins SET admin_name = $1, pass_word = $2 WHERE admin_name = $3;",
      [admin.newAdminName, admin.newPassWord, admin.oldAdminName]
    );
    return {
      serverError: false,
      status: 200,
      body: null,
      msg: "Credenciais atualizadas com sucesso."
    };
  } catch (error) {
    return {
      serverError: true,
      status: 500,
      body: null,
      msg: (error as Error).message || "Erro ao atualizar credenciais."
    };
  }
}

// Criar admin
export async function addAdmin(name: string, pass_word: string): Promise<returnType> {
  try {
    await pool.query(
      "INSERT INTO admins (admin_name, pass_word) VALUES ($1, $2);",
      [name, pass_word]
    );

    const token = jwt.sign({ adminName: name }, process.env.JWT_SECRET as string, { expiresIn: "1h" });
    return {
      body: { token },
      msg: "Admin criado com sucesso.",
      serverError: false,
      status: 200
    };
  } catch (error) {
    return {
      body: undefined,
      msg: (error as Error).message || "Não conseguimos cadastrar um novo admin",
      serverError: true,
      status: 500
    };
  }
}

// Deletar admin
export async function deleteAdminFromDb(adminId: number): Promise<returnType> {
  try {
    await pool.query("DELETE FROM admins WHERE id = $1;", [adminId]);
    return {
      body: null,
      msg: "Admin deletado com sucesso.",
      serverError: false,
      status: 200
    };
  } catch (error) {
    return {
      body: null,
      msg: (error as Error).message || "Erro ao deletar admin.",
      serverError: true,
      status: 500
    };
  }
}
