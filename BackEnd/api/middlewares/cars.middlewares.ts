import {Request, Response, NextFunction} from 'express';
import  Jwt  from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import { returnType,  } from '../controllers/interfaces.controllers.js';
import { ObjectSchema } from 'joi';


dotenv.config(); 

export function verifyToken(req: Request, res: Response, next: NextFunction): Response | void {
    const token = req.headers['auth'] as string;

    if (!token) {
        return res.status(401).json({
            body: undefined,
            msg: "Token não fornecido",
            serverError: false,
            status: 401
        });
    }

    try {
        const decoded = Jwt.verify(token, process.env.JWT_SECRET as string);
        next();
    } catch (error) {
        return res.status(403).json({
            body: undefined,
            msg: "Token inválido",
            serverError: false,
            status: 403
        });
    }
}


export function verifyWithJoi(joiSchema: ObjectSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = joiSchema.validate(req.body, { abortEarly: false });

    if (error) {
      return res.status(400).json({
        body: undefined,
        msg: error.details.map(detail => detail.message).join('; '),
        serverError: false,
        status: 400
      });
    }

    next();
  };
}

