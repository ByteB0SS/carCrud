import pool from "../db.js"; // Assumindo que o pool é configurado com mysql2/promise
import { VehicleInterface } from "../controllers/interfaces.controllers.js";
import dayjs from "dayjs";

export async function postVehicleOnDb(data: VehicleInterface) {
  const {
    brand,
    model,
    color,
    license_plate,
    engine_number,
    chassis_number,
    tire_measurements,
    seating_capacity,
    fuel_type,
    wheelbase_cm,
    transmission_type,
    acquisition_year,
    displacement_cc,
    number_of_cylinders,
    gross_weight_kg,
    curb_weight_kg,
    custom_fuel_type,
    custom_transmission_type,
    vehicle_credential,   
    vehicle_type          
  } = data;


  try {
    // Verifica se já existe um veículo com a placa informada
    const [existingCar] = await pool.query("SELECT * FROM cars WHERE license_plate = ?", [license_plate]);
    if (Array.isArray(existingCar) && existingCar.length > 0) {
      return {
        msg: "Já existe um veículo com essa placa!",
        status: 400,
        serverError: false,
      };
    }

    // Verifica se já existe um veículo com a placa informada
    const [existingCar2] = await pool.query("SELECT * FROM cars WHERE vehicle_credential = ?", [vehicle_credential]);
    if (Array.isArray(existingCar2) && existingCar2.length > 0) {
      return {
        msg: "Já existe um veículo com essa credencial!",
        status: 400,    
        serverError: false,
      };
    }

    const issued_at = new Date();
    const valid_until = dayjs(issued_at)
      .add(1, "year")
      .add(6, "month")
      .add(18, "day")
      .toDate();

    const values = [
      brand,
      model,
      color,
      license_plate,
      engine_number,
      chassis_number,
      tire_measurements,
      seating_capacity,
      fuel_type,
      wheelbase_cm,
      transmission_type,
      acquisition_year,
      displacement_cc,
      number_of_cylinders,
      gross_weight_kg,
      curb_weight_kg,
      custom_fuel_type || null,
      custom_transmission_type || null,
      vehicle_credential,
      vehicle_type,     
      issued_at,
      valid_until
    ];


    const sql = `
    INSERT INTO cars (
      brand, model, color, license_plate, engine_number, chassis_number,
      tire_measurements, seating_capacity, fuel_type, wheelbase_cm,
      transmission_type, acquisition_year, displacement_cc,
      number_of_cylinders, gross_weight_kg, curb_weight_kg,
      custom_fuel_type, custom_transmission_type,
      vehicle_credential, vehicle_type,
      issued_at, valid_until
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;


    await pool.query(sql, values);

    return {
      msg: "Veículo adicionado com sucesso!",
      status: 201,
    };
  } catch (error: any) {
    console.error("Erro ao adicionar veículo:", error.message || error);
    return {
      serverError: true,
      status: 500,
      msg: "Erro ao adicionar veículo",
      detail: error?.message || "Erro desconhecido",
    };
  }
}


export async function updateCarOnDb(data: VehicleInterface, carId: number) {
  if (!carId) {
    return {
      msg: "ID do veículo não fornecido",
      status: 400,
      serverError: false,
    };
  }

  try {
    const [rows] = await pool.query("SELECT * FROM cars WHERE id = ?", [carId]);
    const resultRows = Array.isArray(rows) ? rows : [];

    if (resultRows.length === 0) {
      return {
        msg: `Veículo com ID ${carId} não encontrado`,
        status: 404,
        serverError: false,
      };
    }

    const { license_plate } = data;

    const [existingCar] = await pool.query(
      "SELECT * FROM cars WHERE license_plate = ? AND id != ?",
      [license_plate, carId]
    );

    if (Array.isArray(existingCar) && existingCar.length > 0) {
      return {
        msg: "Já existe um veículo com essa placa!",
        status: 400,
        serverError: false,
      };
    }

    const values = [
      data.brand,
      data.model,
      data.color,
      data.license_plate,
      data.engine_number,
      data.chassis_number,
      data.tire_measurements,
      data.seating_capacity,
      data.fuel_type,
      data.wheelbase_cm,
      data.transmission_type,
      data.acquisition_year,
      data.displacement_cc,
      data.number_of_cylinders,
      data.gross_weight_kg,
      data.curb_weight_kg,
      data.custom_fuel_type || null,
      data.custom_transmission_type || null,
      data.vehicle_credential,
      data.vehicle_type,
      carId,
    ];

    const sql = `
      UPDATE cars SET
        brand = ?, model = ?, color = ?, license_plate = ?, engine_number = ?,
        chassis_number = ?, tire_measurements = ?, seating_capacity = ?,
        fuel_type = ?, wheelbase_cm = ?, transmission_type = ?,
        acquisition_year = ?, displacement_cc = ?, number_of_cylinders = ?,
        gross_weight_kg = ?, curb_weight_kg = ?, custom_fuel_type = ?,
        custom_transmission_type = ?, vehicle_credential = ?, vehicle_type = ?
      WHERE id = ?
    `;

    await pool.query(sql, values);

    return {
      msg: "Veículo atualizado com sucesso!",
      status: 200,
    };
  } catch (error: any) {
    console.error("Erro ao atualizar veículo:", error.message || error);
    return {
      serverError: true,
      status: 500,
      msg: "Erro ao atualizar veículo",
      detail: error?.message || "Erro desconhecido",
    };
  }
}

export async function deleteCarOnDb (carId: number) {
  if (!carId) {
    return {
      msg: "ID do veículo não fornecido",
      status: 400, 
      serverError: false,
    };
  }

  try {
    const [rows] = await pool.query("SELECT * FROM cars WHERE id = ?", [carId]);
    const resultRows = Array.isArray(rows) ? rows : [];

    if (resultRows.length === 0) {
      return {
        msg: `Veículo com ID ${carId} não encontrado`,
        status: 404, 
        serverError: false,
      };
    }

    await pool.query("DELETE FROM cars WHERE id = ?", [carId]);

    return {
      msg: `Veículo com ID ${carId} deletado com sucesso!`,
      status: 200, 
    };
  } catch (error: any) {
    console.error("Erro ao deletar veículo:", error.message || error);
    return {
      serverError: true,
      status: 500, 
      msg: "Erro ao deletar veículo",
      detail: error?.message || "Erro desconhecido",
    };
  }

}

export async function getAllCarsFromDb() {
  try {
    const [rows] = await pool.query("SELECT * FROM cars");
    const resultRows = Array.isArray(rows) ? rows : [];

    if (resultRows.length === 0) {
      return {
        msg: "Nenhum veículo encontrado",
        status: 404, // Not Found
        serverError: false,
      };
    }

    return {
      body: resultRows,
      msg: "Veículos encontrados com sucesso",
      status: 200, // OK
      serverError: false,
    };
  } catch (error: any) {
    console.error("Erro ao buscar veículos:", error.message || error);
    return {
      serverError: true,
      status: 500, // Internal Server Error
      msg: "Erro ao buscar veículos",
      detail: error?.message || "Erro desconhecido",
    };
  }
}

export async function getAdminById(carId: number){
  if (!carId) {
    return {
      msg: "ID do veículo não fornecido",
      status: 400, // Bad Request (ID ausente)
      serverError: false,
    };
  }

  try {
    const [rows] = await pool.query("SELECT * FROM cars WHERE id = ?", [carId]);
    const resultRows = Array.isArray(rows) ? rows : [];

    if (resultRows.length === 0) {
      return {
        msg: `Veículo com ID ${carId} não encontrado`,
        status: 404, // Not Found (Veículo não encontrado)
        serverError: false,
      };
    }

    return {
      body: resultRows[0],
      msg: "Veículo encontrado com sucesso",
      status: 200, // OK
      serverError: false,
    };
  } catch (error: any) {
    console.error("Erro ao buscar veículo:", error.message || error);
    return {
      serverError: true,
      status: 500, // Internal Server Error
      msg: "Erro ao buscar veículo",
      detail: error?.message || "Erro desconhecido",
    };
  }
}