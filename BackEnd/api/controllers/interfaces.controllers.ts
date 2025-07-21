export interface returnType {
    serverError: boolean,
    status: number,
    body: any,
    msg: string
}

export interface credentialsInterface {
    adminName: string, 
    passWord: string,
}

export interface updateCredentialsInterface {
    newPassWord: string,
    newAdminName: string,
    oldAdminName: string,
    id: number,
}

export interface adminInterface { 
    adminName: string,
    passWord: string
}

export interface VehicleInterface {
  brand: string;
  model: string;
  color: string;
  license_plate: string;
  engine_number: string;
  chassis_number: string;
  tire_measurements: string;
  seating_capacity: number;
  fuel_type: string;
  custom_fuel_type: string | null | undefined | '';
  wheelbase_cm: number;
  transmission_type: string;
  custom_transmission_type: string | null | undefined | '';
  acquisition_year: number;
  displacement_cc: number;
  number_of_cylinders: number;
  gross_weight_kg: number;
  curb_weight_kg: number;
}

