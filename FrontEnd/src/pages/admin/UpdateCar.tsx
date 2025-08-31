import AdminScreen from "@/components/AdminScreen"
import { useState } from "react"
import { useEffect } from "react"
import CarForm from '@/components/Carform'
import Global from "@/global/Global"

export default function UpdateCar(){
    const [loading, setLoading] = useState(false)
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

    useEffect(()=> {
        const carToBeChangedId = localStorage.getItem('carToBeChangedId')

        async function main () {
            try{
                const response = await fetch(`${Global.apiUrl}cars/${carToBeChangedId}`)
                const json  = await response.json()
                
                const body = json.body

                if(json.status !== 200){
                    setError(true)
                    setWarning('erro: ' + json.status)
                }

                setFuelType(body.fuel_type)
                setTransmissionType(body.transmission_type)
                setVehicleCredential(body.vehicle_credential)
                setBrand(body.brand)
                setModel(body.model)
                setColor(body.color)
                setVehicleType(body.vehicle_type)
                setSeatingCapacity(body.seating_capacity)
                setCustomFuelType(body.custom_fuel_type || '') // caso seja null
                setCustomTransmissionType(body.custom_transmission_type || '')
                setWheelbaseCm(body.wheelbase_cm)
                setLicensePlate(body.license_plate)
                setAcquisitionYear(body.acquisition_year)
                setEngineNumber(body.engine_number)
                setDisplacementCc(body.displacement_cc)
                setChassisNumber(body.chassis_number)
                setTireMeasurements(body.tire_measurements)
                setNumberOfCylinders(body.number_of_cylinders)
                setGrossWeightKg(body.gross_weight_kg)
                setCurbWeightKg(body.curb_weight_kg)

            }
            catch{
                setError(true)
                setWarning('Erro ao se conectar ao servidor')
            }

        }

        main()
    }, [])

    async function updateCar(){  
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

        setLoading(true)

        try{
             const res = await fetch(`${Global.apiUrl}cars/updateCar/${localStorage.getItem('carToBeChangedId')}`,{
            method: 'PUT', 
            headers: {
                'Content-type': 'application/json',
                'auth': `${localStorage.getItem('token')}`
            },
            body: JSON.stringify(body)
            })

            const json = await res.json()

            setWarning('clicou')

            console.log(json)

            if(json.status !== 200){
                setError(true)
            }
            else{
                setError(false)
            }
            
            setWarning(json.msg)
        } catch {
            setWarning('Algum erro tente mais tarde.')
            setError(true)
        }

        setLoading(false)

        setTimeout(()=> {
            setWarning('')
        }, 4000)
       
    }


    return(
        <AdminScreen loading={loading} headerTitle="Actualizar carro" type="car" warningError={error} warningText={warning}>
            <CarForm
            toDoOnClick={updateCar}

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