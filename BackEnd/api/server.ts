import express from 'express';
import carRoutes from './routes/cars.routes.js';
import adminRoutes from './routes/admin.routes.js';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
import cors from 'cors'

dotenv.config();

const server = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // Limite de 100 requisições
  message: {
    msg: 'Muitas requisições, tente novamente mais tarde.',
    serverError: false,
    status: 429,
    body: undefined
  }
});

server.use(limiter);
server.use(cors())
/*server.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}))*/
server.use(express.json());


server.use('/cars', carRoutes);
server.use('/admin', adminRoutes);

// Proteção de CORS (se necessário)
server.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// Definir porta
const port: number = 8558;

// Iniciar o servidor
server.listen(port, () => console.log(`Servidor rodando em http://localhost:${port}`));
