import pool from "../db.js";
import { returnType } from "../controllers/interfaces.controllers.js";

// Função que retorna os valores possíveis de uma coluna ENUM da tabela 'cars'
export async function getEnumValues(columnName: string): Promise<returnType> {
    try {
        const [rows]: any = await pool.query(`SHOW COLUMNS FROM cars LIKE ?`, [columnName]);

        if (!rows || rows.length === 0) {
            return {
                serverError: false,
                status: 404,
                body: [],
                msg: `Coluna '${columnName}' não encontrada.`,
            };
        }

        const typeDef: string = rows[0].Type; // e.g., "enum('A','B','C')"

        // Extrai os valores entre aspas simples
        const values = typeDef
            .split("'")
            .filter((_, i) => i % 2 !== 0);

        return {
            serverError: false,
            status: 200,
            body: values,
            msg: "Valores ENUM obtidos com sucesso.",
        };
    } catch (error) {
        console.error("Erro ao acessar o banco de dados:", error);
        return {
            serverError: true,
            status: 500,
            body: [],
            msg: "Erro interno ao acessar o banco de dados.",
        };
    }
}
