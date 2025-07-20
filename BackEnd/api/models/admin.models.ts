import pool from "../db.js";
import { returnType, updateCredentialsInterface } from "../controllers/interfaces.controllers.js";
import  jwt  from "jsonwebtoken";
export async function getAdminRealCredencials (admin: string): Promise<returnType> {
    try{
        let [row, trush] = await pool.query('select admin_name, pass_word from admins where admin_name = ?;',[admin])

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
export async function updateAdminCredentialsOnDb(admin: updateCredentialsInterface, ref: string): Promise<returnType> {
  try {
    // Importante: salvar a senha já hasheada
    await pool.query(
      'UPDATE admins SET admin_name = ?, pass_word = ? WHERE admin_name = ?;',
      [admin.newAdminName, admin.newPassWord, ref]
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
    await pool.query('DELETE FROM admins WHERE admin_name = ?;', [adminName]);
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