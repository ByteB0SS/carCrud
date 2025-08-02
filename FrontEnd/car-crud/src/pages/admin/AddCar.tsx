import AdminScreen from "@/components/AdminScreen"
import { useState } from "react"
import CarForm from '@/components/Carform'
import Global from "@/global/Global"

export default function AddCar(){
    const [fuelType, setFuelType] = useState<string>('')
    const [transmissionType, setTransmissionType] = useState<string>('')
    // States para inputs
    const [vehicleCredential, setVehicleCredential] = useState('')
    const [brand, setBrand] = useState('')
    const [model, setModel] = useState('')
    const [color, setColor] = useState('')
    const [vehicleType, setVehicleType] = useState('')
    const [seatingCapacity, setSeatingCapacity] = useState<number | string>('')
    const [customFuelType, setCustomFuelType] = useState('')
    const [customTransmissionType, setCustomTransmissionType] = useState('')
    const [wheelbaseCm, setWheelbaseCm] = useState<number | string>('')
    const [licensePlate, setLicensePlate] = useState('')
    const [acquisitionYear, setAcquisitionYear] = useState<number | string>('')
    const [engineNumber, setEngineNumber] = useState('')
    const [displacementCc, setDisplacementCc] = useState<number | string>('')
    const [chassisNumber, setChassisNumber] = useState('')
    const [tireMeasurements, setTireMeasurements] = useState('')
    const [numberOfCylinders, setNumberOfCylinders] = useState<number | string>('')
    const [grossWeightKg, setGrossWeightKg] = useState<number | string>('')
    const [curbWeightKg, setCurbWeightKg] = useState<number | string>('')
    const [error, setError] = useState<boolean>(false)
    const [warning, setWarning] = useState<string>('')

    async function addCarFunction(){  
        const body = {
            vehicle_credential: vehicleCredential,
            brand: brand,
            model: model,
            vehicle_type: vehicleType,
            color: color,
            license_plate: licensePlate,
            engine_number: engineNumber,
            chassis_number: chassisNumber,
            tire_measurements: tireMeasurements,
            seating_capacity: Number(seatingCapacity),
            fuel_type: fuelType,
            custom_fuel_type: customFuelType,
            wheelbase_cm: Number(wheelbaseCm),
            transmission_type: transmissionType,
            custom_transmission_type: customTransmissionType,
            acquisition_year: Number(acquisitionYear),
            displacement_cc: Number(displacementCc),
            number_of_cylinders: Number(numberOfCylinders),
            gross_weight_kg: Number(grossWeightKg),
            curb_weight_kg: Number(curbWeightKg),
        }       
        try{
             const res = await fetch(`${Global.apiUrl}cars`,{
            method: 'POST', 
            headers: {
                'Content-type': 'application/json',
                'auth': `${localStorage.getItem('token')}`
            },
            body: JSON.stringify(body)
            })

            const json = await res.json()

            setWarning('clicou')


            if(json.status !== 201){
                setError(true)
            }
            else{
                setError(false)
            }
            
            setWarning(json.msg)
        } catch {
            setWarning('Erro ao conectar com o servidor')
            setError(true)
        }
       
    }


    return(
        <AdminScreen headerTitle="Adicionar Carro" type="car" warningError={error} warningText={warning}>
            <CarForm
            toDoOnClick={addCarFunction}

            vehicleCredential={vehicleCredential}
            setVehicleCredential={setVehicleCredential}

            brand={brand}
            setBrand={setBrand}

            model={model}
            setModel={setModel}

            color={color}
            setColor={setColor}

            vehicleType={vehicleType}
            setVehicleType={setVehicleType}

            seatingCapacity={seatingCapacity}
            setSeatingCapacity={setSeatingCapacity}

            fuelType={fuelType}
            setFuelType={setFuelType}

            customFuelType={customFuelType}
            setCustomFuelType={setCustomFuelType}

            transmissionType={transmissionType}
            setTransmissionType={setTransmissionType}

            customTransmissionType={customTransmissionType}
            setCustomTransmissionType={setCustomTransmissionType}

            wheelbaseCm={wheelbaseCm}
            setWheelbaseCm={setWheelbaseCm}

            licensePlate={licensePlate}
            setLicensePlate={setLicensePlate}

            acquisitionYear={acquisitionYear}
            setAcquisitionYear={setAcquisitionYear}

            engineNumber={engineNumber}
            setEngineNumber={setEngineNumber}

            displacementCc={displacementCc}
            setDisplacementCc={setDisplacementCc}

            chassisNumber={chassisNumber}
            setChassisNumber={setChassisNumber}

            tireMeasurements={tireMeasurements}
            setTireMeasurements={setTireMeasurements}

            numberOfCylinders={numberOfCylinders}
            setNumberOfCylinders={setNumberOfCylinders}

            grossWeightKg={grossWeightKg}
            setGrossWeightKg={setGrossWeightKg}

            curbWeightKg={curbWeightKg}
            setCurbWeightKg={setCurbWeightKg}
      />
        </AdminScreen>
    )
}