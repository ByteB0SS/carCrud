import { readFileSync } from 'fs';
import pool from '../db.js';

export default async function startDataBase() {
  try {
    const sql = readFileSync('init.sql', 'utf8');
    await pool.query(sql); 
    console.log('Banco inicializado com sucesso');
  } catch (err) {
    console.error('Erro ao iniciar o banco:', err);
    throw err;
  }
}
