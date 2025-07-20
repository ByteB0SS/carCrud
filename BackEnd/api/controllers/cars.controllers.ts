import { VehicleInterface } from "./interfaces.controllers.js";
import { Request, Response } from 'express';
import { postVehicleOnDb, updateCarOnDb, deleteCarOnDb, getAllCarsFromDb, getAdminById } from '../models/cars.models.js';
import { getEnumValues } from '../models/adtional.models.js';
import { returnType } from "./interfaces.controllers.js";


// Function to add a car
export async function addCar(req: Request, res: Response) {
    const vehicle: VehicleInterface = req.body;
    try {
        const result = await postVehicleOnDb(vehicle);

        return res.status(Number(result.status)).json(result);
    } catch (error) {
        console.error("Erro ao adicionar veículo:", error);
        return res.status(500).json({
            serverError: true,
            status: 500,
            msg: "Erro interno ao adicionar veículo"
        }); 
    } 
}

// Function to update a car
export async function updateCar(req: Request, res: Response) {
    const vehicleId = req.params.id;

    const vehicleData: VehicleInterface = req.body;

    const result = await updateCarOnDb(vehicleData, Number(vehicleId))

    return res.status(Number(result.status)).json(result);
}

// Function to delete a car
export async function deleteCar(req: Request, res: Response) {
    const carId = req.params.id;
    
    const result = await deleteCarOnDb(Number(carId));

    return res.status(Number(result.status)).json(result);
}


// Function to get all cars
export async function getAllCars(req: Request, res: Response) {
    const result = await getAllCarsFromDb();

    return res.status(Number(result.status)).json(result);
}

//Function to get a car by ID
export async function getById(req: Request, res: Response) {
    const carId = Number(req.params.id)
    const result = await getAdminById(carId);
    return res.status(Number(result.status)).json(result);
}

// Function to get select options for ENUM values
export async function getSelectOptions(req: Request, res: Response){

    let fuel_type: returnType = await getEnumValues('fuel_type');
    let transmission_type: returnType = await getEnumValues('transmission_type');

    if(fuel_type.serverError || transmission_type.serverError){
        return res.status(500).json({
            serverError: true,
            status: 500,
            msg: "Erro ao acessar os valores ENUM"
        });
    }

    if(fuel_type.status !== 200 || transmission_type.status !== 200){
        return res.status(404).json({
            serverError: false,
            status: 404,
            msg: "Valores ENUM não encontrados"
        });
    }



    return res.status(200).json({
        body: {
            fuel_type: fuel_type.body,
            transmisson_type: transmission_type.body
        },
        msg: "Valores ENUM obtidos com sucesso.",
        serverError: false,
        status: 200
    });

}
