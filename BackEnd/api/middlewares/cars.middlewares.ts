import {Request, Response, NextFunction} from 'express';
import dotenv from 'dotenv';
import { returnType,  } from '../controllers/interfaces.controllers.js';
import { ObjectSchema } from 'joi';
import { getEnumValues } from "../models/adtional.models.js";



dotenv.config(); 

export async function verifyValidEnumValues(req: Request, res: Response, next: NextFunction) {
  const fuel_type = req.body.fuel_type;
  const transmission_type = req.body.transmission_type;

  let validFuelTypes = await getEnumValues('fuel_type');
  let validFuelTypesAux = validFuelTypes.body as string[];

  let validTransmissionTypes = await getEnumValues('transmission_type')
  let validTransmissionTypesAux = validTransmissionTypes.body as string[];

    if (!validFuelTypesAux.includes(fuel_type)) {
    return {
      msg: "Tipo de combustível inválido!", 
      status: 400, // Bad Request
      serverError: false,
    };
  }
  
  if (!validTransmissionTypesAux.includes(transmission_type)) {
    return {   
      msg: "Tipo de transmissão inválido!",
      status: 400, // Bad Request
      serverError: false,
    };
  }
  next();
}