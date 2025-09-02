import express from 'express';
import carRoutes from './routes/cars.routes.js';
import adminRoutes from './routes/admin.routes.js';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
import cors from 'cors'
import startDataBase from './models/startingServer.models.js';

dotenv.config();

const server = express();

const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minuto
  max: 40,             // Limite: 40 requisições por IP por minuto
  message: {
    msg: 'Muitas requisições, tente novamente mais tarde.',
    serverError: false,
    status: 429,
    body: undefined
  }
});

server.use(limiter);
server.use(cors())

server.use(express.json());


server.use('/cars', carRoutes);
server.use('/admin', adminRoutes);

server.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

const port: number = 8558;

server.listen(port, () => {
  startDataBase()
  console.log(`Servidor rodando em http://localhost:${port}`)
});
