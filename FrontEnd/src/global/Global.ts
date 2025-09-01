export default class Global {
    static apiUrl = 'https://nublapaymentsrecovery.onrender.com/';
}


export interface CarPropetiesInterface {
    id: number,
    brand: string,
    model: string,
    color: string,
    seating_capacity: number,
    fuel_type: string,
    wheelbase_cm: number,
    transmission_type: string,
    license_plate: string,
    acquisition_year: number,
    engine_number: string,
    displacement_cc: number,
    chassis_number: string,
    tire_measurements: string,
    number_of_cylinders: number,
    gross_weight_kg: number,
    curb_weight_kg: number,
    custom_fuel_type: string,
    custom_transmission_type: string,
    vehicle_credential: string,
    vehicle_type: string,
    issued_at: string,
    valid_until: string
  }

