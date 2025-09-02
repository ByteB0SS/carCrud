import pool from "../db.js"; // Pool configurado para PostgreSQL
import type { VehicleInterface } from "../controllers/interfaces.controllers.js";
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
    const existingCar = await pool.query("SELECT * FROM cars WHERE license_plate = $1", [license_plate]);
    if (existingCar.rows.length > 0) {
      return { msg: "Já existe um veículo com essa placa!", status: 400, serverError: false };
    }

    // Verifica se já existe um veículo com a credencial informada
    const existingCar2 = await pool.query("SELECT * FROM cars WHERE vehicle_credential = $1", [vehicle_credential]);
    if (existingCar2.rows.length > 0) {
      return { msg: "Já existe um veículo com essa credencial!", status: 400, serverError: false };
    }

    const issued_at = new Date();
    const valid_until = dayjs(issued_at).add(1, "year").add(6, "month").add(18, "day").toDate();

    const values = [
      brand, model, color, license_plate, engine_number, chassis_number,
      tire_measurements, seating_capacity, fuel_type, wheelbase_cm,
      transmission_type, acquisition_year, displacement_cc,
      number_of_cylinders, gross_weight_kg, curb_weight_kg,
      custom_fuel_type || null, custom_transmission_type || null,
      vehicle_credential, vehicle_type, issued_at, valid_until
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
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22)
    `;
    console.log('tentou')
    await pool.query(sql, values);

    return { msg: "Veículo adicionado com sucesso!", status: 201 };
  } catch (error: any) {
    console.log('deu erro')
    console.error("Erro ao adicionar veículo:", error.message || error);
    return { serverError: true, status: 500, msg: "Erro ao adicionar veículo", detail: error?.message || "Erro desconhecido" };
  }
}

export async function updateCarOnDb(data: VehicleInterface, carId: number) {
  if (!carId) return { msg: "ID do veículo não fornecido", status: 400, serverError: false };

  try {
    const { rows } = await pool.query("SELECT * FROM cars WHERE id = $1", [carId]);
    if (rows.length === 0) return { msg: `Veículo com ID ${carId} não encontrado`, status: 404, serverError: false };

    const existingCar = await pool.query("SELECT * FROM cars WHERE license_plate = $1 AND id != $2", [data.license_plate, carId]);
    if (existingCar.rows.length > 0) return { msg: "Já existe um veículo com essa placa!", status: 400, serverError: false };

    const values = [
      data.brand, data.model, data.color, data.license_plate, data.engine_number, data.chassis_number,
      data.tire_measurements, data.seating_capacity, data.fuel_type, data.wheelbase_cm,
      data.transmission_type, data.acquisition_year, data.displacement_cc,
      data.number_of_cylinders, data.gross_weight_kg, data.curb_weight_kg,
      data.custom_fuel_type || null, data.custom_transmission_type || null,
      data.vehicle_credential, data.vehicle_type, carId
    ];

    const sql = `
      UPDATE cars SET
        brand=$1, model=$2, color=$3, license_plate=$4, engine_number=$5,
        chassis_number=$6, tire_measurements=$7, seating_capacity=$8,
        fuel_type=$9, wheelbase_cm=$10, transmission_type=$11,
        acquisition_year=$12, displacement_cc=$13, number_of_cylinders=$14,
        gross_weight_kg=$15, curb_weight_kg=$16, custom_fuel_type=$17,
        custom_transmission_type=$18, vehicle_credential=$19, vehicle_type=$20
      WHERE id=$21
    `;

    await pool.query(sql, values);
    return { msg: "Veículo atualizado com sucesso!", status: 200 };
  } catch (error: any) {
    console.error("Erro ao atualizar veículo:", error.message || error);
    return { serverError: true, status: 500, msg: "Erro ao atualizar veículo", detail: error?.message || "Erro desconhecido" };
  }
}

export async function deleteCarOnDb(carId: number) {
  if (!carId) return { msg: "ID do veículo não fornecido", status: 400, serverError: false };

  try {
    const { rows } = await pool.query("SELECT * FROM cars WHERE id = $1", [carId]);
    if (rows.length === 0) return { msg: `Veículo com ID ${carId} não encontrado`, status: 404, serverError: false };

    await pool.query("DELETE FROM cars WHERE id = $1", [carId]);
    return { msg: `Veículo com ID ${carId} deletado com sucesso!`, status: 200 };
  } catch (error: any) {
    console.error("Erro ao deletar veículo:", error.message || error);
    return { serverError: true, status: 500, msg: "Erro ao deletar veículo", detail: error?.message || "Erro desconhecido" };
  }
}

export async function getAllCarsFromDb() {
  try {
    const { rows } = await pool.query("SELECT * FROM cars");
    if (rows.length === 0) return { msg: "Nenhum veículo encontrado", status: 404, serverError: false };

    return { body: rows, msg: "Veículos encontrados com sucesso", status: 200, serverError: false };
  } catch (error: any) {
    console.error("Erro ao buscar veículos:", error.message || error);
    return { serverError: true, status: 500, msg: "Erro ao buscar veículos", detail: error?.message || "Erro desconhecido" };
  }
}

export async function getAdminById(carId: number) {
  if (!carId) return { msg: "ID do veículo não fornecido", status: 400, serverError: false };

  try {
    const { rows } = await pool.query("SELECT * FROM cars WHERE id = $1", [carId]);
    if (rows.length === 0) return { msg: `Veículo com ID ${carId} não encontrado`, status: 404, serverError: false };

    return { body: rows[0], msg: "Veículo encontrado com sucesso", status: 200, serverError: false };
  } catch (error: any) {
    console.error("Erro ao buscar veículo:", error.message || error);
    return { serverError: true, status: 500, msg: "Erro ao buscar veículo", detail: error?.message || "Erro desconhecido" };
  }
}
