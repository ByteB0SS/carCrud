import pool from "../db.js";
import { returnType, updateCredentialsInterface } from "../controllers/interfaces.controllers.js";
import  jwt  from "jsonwebtoken";
import { get } from "http";

export async function getAdminRealCredencials (value: string | number, ref: string): Promise<returnType> {
    try{
        let [row, trush] = await pool.query(`select id, role, admin_name, pass_word from admins where ${ref} = ?;`,[value])
        console.log(`select id, role, admin_name, pass_word from admins where ${ref} = '${value}';`)
        let rowAux = row as Array<{admin_name: string, pass_word: string, id: number, role: string}>
        if(rowAux.length === 0){
            console.log(rowAux)
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
        console.log("erro na conexão com o banco de dados")
        return {
            body: undefined,
            msg: "erro na cenexão com banco de dados",
            serverError: true,
            status: 500
        }
    }
}
export async function updateAdminCredentialsOnDb(admin: updateCredentialsInterface): Promise<returnType> {
  try {
    // Importante: salvar a senha já hasheada
    await pool.query(
      'UPDATE admins SET admin_name = ?, pass_word = ? WHERE admin_name = ?;',
      [admin.newAdminName, admin.newPassWord, admin.oldAdminName]
    );
    return {
      serverError: false,
      status: 200,
      body: null,
      msg: 'Credenciais atualizadas com sucesso.'
    };
  } catch (error) {
    return { 
      serverError: true,
      status: 500,
      body: null,
      msg: (error as Error).message || 'Erro ao atualizar credenciais.'
    };
  }
}


let data: returnType

export async function  addAdmin(name: string, pass_word: string): Promise<returnType> {
  try{
    await pool.query("INSERT INTO `car_project`.`admins` (`admin_name`, `pass_word`) VALUES (?, ?);", [name, pass_word])

    let token = jwt.sign({adminName: name}, process.env.JWT_SECRET as string, {expiresIn: '1h'})
    return {
      body: {token},
      msg: "Admin criado com sucesso.",
      serverError: false,
      status: 200,
    }
  }
  catch {
    return {
      body: undefined,
      msg: "Não conseguimos cadastrar um novo admin",
      serverError: true,
      status: 3,
    }
  }
}

export async function deleteAdminFromDb (adminName: string): Promise<returnType> {
  try {
    console.log(adminName)
    await pool.query('DELETE FROM admins WHERE id = ?;', [adminName]);
    return {
      body: null,
      msg: 'Admin deletado com sucesso.',
      serverError: false,
      status: 200
    };
  } catch (error) {
    return {
      body: null,
      msg: (error as Error).message || 'Erro ao deletar admin.',
      serverError: true,
      status: 500
    };
  }
}