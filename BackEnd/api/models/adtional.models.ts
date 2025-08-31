import pool from "../db.js";
import type { returnType } from "../controllers/interfaces.controllers.js";

// Função que retorna os valores possíveis de uma coluna ENUM da tabela 'cars'
export async function getEnumValues(columnName: string): Promise<returnType> {
    try {
        const query = `
            SELECT e.enumlabel AS value
            FROM pg_type t
            JOIN pg_enum e ON t.oid = e.enumtypid
            JOIN information_schema.columns c 
                ON c.udt_name = t.typname
            WHERE c.table_name = 'cars' 
              AND c.column_name = $1
        `;

        const { rows } = await pool.query(query, [columnName]);

        if (!rows || rows.length === 0) {
            return {
                serverError: false,
                status: 404,
                body: [],
                msg: `Coluna '${columnName}' não encontrada.`,
            };
        }

        // Extrai apenas os valores ENUM
        const values = rows.map(r => r.value);

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
