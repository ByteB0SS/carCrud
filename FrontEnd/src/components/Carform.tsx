import Global from "@/global/Global"
import { useEffect, useState } from "react"

interface inputInterface {
    htmlFor: string
    textLabel: string
    placeholder: string
    inputType: string
    value: string | number
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export interface CarFormProps {
    toDoOnClick: () => void

    vehicleCredential: string
    setVehicleCredential: (value: string) => void

    brand: string
    setBrand: (value: string) => void

    model: string
    setModel: (value: string) => void

    color: string
    setColor: (value: string) => void

    vehicleType: string
    setVehicleType: (value: string) => void

    seatingCapacity: number | string
    setSeatingCapacity: (value: number | string) => void

    fuelType: string
    setFuelType: (value: string) => void

    customFuelType: string
    setCustomFuelType: (value: string) => void

    transmissionType: string
    setTransmissionType: (value: string) => void

    customTransmissionType: string
    setCustomTransmissionType: (value: string) => void

    wheelbaseCm: number | string
    setWheelbaseCm: (value: number | string) => void

    licensePlate: string
    setLicensePlate: (value: string) => void

    acquisitionYear: number | string
    setAcquisitionYear: (value: number | string) => void

    engineNumber: string
    setEngineNumber: (value: string) => void

    displacementCc: number | string
    setDisplacementCc: (value: number | string) => void

    chassisNumber: string
    setChassisNumber: (value: string) => void

    tireMeasurements: string
    setTireMeasurements: (value: string) => void

    numberOfCylinders: number | string
    setNumberOfCylinders: (value: number | string) => void

    grossWeightKg: number | string
    setGrossWeightKg: (value: number | string) => void

    curbWeightKg: number | string
    setCurbWeightKg: (value: number | string) => void
}


function Input(inputProps: inputInterface) {
    return (
        <div className="flex flex-col gap-1">
            <label htmlFor={inputProps.htmlFor}>{inputProps.textLabel}</label>
            <input
                id={inputProps.htmlFor}
                type={inputProps.inputType}
                placeholder={inputProps.placeholder}
                value={inputProps.value}
                onChange={inputProps.onChange}
                className="border p-1.5 rounded"
            />
        </div>
    )
}

export default function CarForm(props: CarFormProps) {
    const apiUrl = Global.apiUrl 
    {/*eslint-disable-next-line */}
    let json: any

    const [fuelTypeOptionsList, setFuelTypeOptionsList] = useState<string[]>([])
    const [transmissonTypeOptionsList, setTransmissonTypeOptionsList] = useState<string[]>([])

    useEffect(() => {
        async function main() {
            const optionsList = await fetch(apiUrl + 'cars/selectOptions')
            {/*eslint-disable-next-line */}
            json = await optionsList.json()
            if (json.status === 200) {
                setFuelTypeOptionsList(json.body.fuel_type)
                setTransmissonTypeOptionsList(json.body.transmisson_type)
            }
        }

        main()
    }, [])

    return (
        <form
  className="p-2.5 h-full overflow-auto flex flex-col gap-6"
  onSubmit={e => {
    e.preventDefault()
    // aqui você pode fazer o que quiser no submit
  }}
>
  <Input
    htmlFor="vehicle_credential"
    textLabel="Credencial de veículo"
    placeholder="Credencial de veículo"
    inputType="text"
    value={props.vehicleCredential}
    onChange={e => props.setVehicleCredential(e.target.value)}
  />
  <Input
    htmlFor="brand"
    textLabel="Marca"
    placeholder="Marca"
    inputType="text"
    value={props.brand}
    onChange={e => props.setBrand(e.target.value)}
  />
  <Input
    htmlFor="model"
    textLabel="Modelo"
    placeholder="Modelo"
    inputType="text"
    value={props.model}
    onChange={e => props.setModel(e.target.value)}
  />
  <Input
    htmlFor="color"
    textLabel="Cor"
    placeholder="Cor"
    inputType="text"
    value={props.color}
    onChange={e => props.setColor(e.target.value)}
  />
  <Input
    htmlFor="vehicle_type"
    textLabel="Tipo"
    placeholder="Tipo de serviço"
    inputType="text"
    value={props.vehicleType}
    onChange={e => props.setVehicleType(e.target.value)}
  />
  <Input
    htmlFor="seating_capacity"
    textLabel="Lotação"
    placeholder="Número de lugares"
    inputType="number"
    value={props.seatingCapacity}
    onChange={e =>
      props.setSeatingCapacity(e.target.value === '' ? '' : Number(e.target.value))
    }
  />

  <select
    name="fuel_type"
    id="fuel_type"
    value={props.fuelType}
    onChange={e => props.setFuelType(e.target.value)}
    className="border p-1.5 rounded"
  >
    <option value={''} disabled hidden>
      Combustível
    </option>
    {fuelTypeOptionsList.map(type => (
      <option key={type} value={type}>
        {type}
      </option>
    ))}
  </select>

  {props.fuelType === 'Outro' && (
    <Input
      htmlFor="custom_fuel_type"
      textLabel="Combustível personalizado"
      placeholder="Digite o outro tipo de combustível"
      inputType="text"
      value={props.customFuelType}
      onChange={e => props.setCustomFuelType(e.target.value)}
    />
  )}

  <select
    name="transmission_type"
    id="transmission_type"
    value={props.transmissionType}
    onChange={e => props.setTransmissionType(e.target.value)}
    className="border p-1.5 rounded"
  >
    <option value={''} disabled hidden>
      Tipo de caixa
    </option>
    {transmissonTypeOptionsList.map(type => (
      <option key={type} value={type}>
        {type}
      </option>
    ))}
  </select>

  {props.transmissionType === 'Outro' && (
    <Input
      htmlFor="custom_transmission_type"
      textLabel="Tipo de caixa personalizado"
      placeholder="Digite o outro tipo de caixa"
      inputType="text"
      value={props.customTransmissionType}
      onChange={e => props.setCustomTransmissionType(e.target.value)}
    />
  )}

  <Input
    htmlFor="wheelbase_cm"
    textLabel="Distância entre eixos"
    placeholder="Distância entre eixos em cm"
    inputType="number"
    value={props.wheelbaseCm}
    onChange={e =>
      props.setWheelbaseCm(e.target.value === '' ? '' : Number(e.target.value))
    }
  />
  <Input
    htmlFor="license_plate"
    textLabel="Matrícula"
    placeholder="Matrícula/placa"
    inputType="text"
    value={props.licensePlate}
    onChange={e => props.setLicensePlate(e.target.value)}
  />
  <Input
    htmlFor="acquisition_year"
    textLabel="Ano da aquisição"
    placeholder="Exemplo: 2022"
    inputType="number"
    value={props.acquisitionYear}
    onChange={e =>
      props.setAcquisitionYear(e.target.value === '' ? '' : Number(e.target.value))
    }
  />
  <Input
    htmlFor="engine_number"
    textLabel="Número do motor"
    placeholder="Número do Motor"
    inputType="text"
    value={props.engineNumber}
    onChange={e => props.setEngineNumber(e.target.value)}
  />
  <Input
    htmlFor="displacement_cc"
    textLabel="Cilindrada"
    placeholder="Cilindrada em cm³"
    inputType="number"
    value={props.displacementCc}
    onChange={e =>
      props.setDisplacementCc(e.target.value === '' ? '' : Number(e.target.value))
    }
  />
  <Input
    htmlFor="chassis_number"
    textLabel="Número do Quadro"
    placeholder="Número do Quadro"
    inputType="text"
    value={props.chassisNumber}
    onChange={e => props.setChassisNumber(e.target.value)}
  />
  <Input
    htmlFor="tire_measurements"
    textLabel="Medidas pneumáticas"
    placeholder="Medidas pneumáticas"
    inputType="text"
    value={props.tireMeasurements}
    onChange={e => props.setTireMeasurements(e.target.value)}
  />
  <Input
    htmlFor="number_of_cylinders"
    textLabel="Número de cilindros"
    placeholder="Número de cilindros"
    inputType="number"
    value={props.numberOfCylinders}
    onChange={e =>
      props.setNumberOfCylinders(e.target.value === '' ? '' : Number(e.target.value))
    }
  />
  <Input
    htmlFor="gross_weight_kg"
    textLabel="Peso bruto"
    placeholder="Peso bruto em KG"
    inputType="number"
    value={props.grossWeightKg}
    onChange={e =>
      props.setGrossWeightKg(e.target.value === '' ? '' : Number(e.target.value))
    }
  />
  <Input
    htmlFor="curb_weight_kg"
    textLabel="Tara"
    placeholder="Tara em KG"
    inputType="number"
    value={props.curbWeightKg}
    onChange={e =>
      props.setCurbWeightKg(e.target.value === '' ? '' : Number(e.target.value))
    }
  />

  <button type="submit" className="button2" onClick={props.toDoOnClick}>
    Adicionar
  </button>
</form>

    )

}
