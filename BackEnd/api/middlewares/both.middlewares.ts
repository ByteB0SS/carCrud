import type { Request, Response, NextFunction } from "express";
import Jwt  from "jsonwebtoken";
import type { ObjectSchema } from "joi";

export function verifyToken(req: Request, res: Response, next: NextFunction): Response | void {
    let decoded: Jwt.JwtPayload
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
        decoded = Jwt.verify(token, process.env.JWT_SECRET as string) as Jwt.JwtPayload
        res.locals.user = decoded
        res.locals.token = token;
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