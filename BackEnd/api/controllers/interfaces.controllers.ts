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
    oldPassWord: string,
    newAdminName: string,
    oldAdminName: string,
    newPassWord: string,
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
  fuel_type: 'Gasolina' | 'Diesel' | 'Flex' | 'Elétrico' | 'Híbrido';
  wheelbase_cm: number;
  transmission_type: 'Manual' | 'Automático' | 'CVT' | 'Semi-automático';
  acquisition_year: number;
  displacement_cc: number;
  number_of_cylinders: number;
  gross_weight_kg: number;
  curb_weight_kg: number;
}

