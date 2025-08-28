import { useRouter } from "next/router"
import Image from "next/image"
import { useEffect, useState } from "react"
import Global, { CarPropetiesInterface } from "@/global/Global"
import { v4 } from "uuid"
import Loader from "@/components/Loader"
interface TextProps {
    text: string
}


interface campPropsInter {
    text: string
    title: string
}

interface lineProps {
    color: string
}

interface LineCampProps {
    text1: string
    text2: string
    title1: string
    title2: string
}


export default function CarById() {
    const router = useRouter()
    const { id } = router.query
    const [loading, setLoading] = useState(true)
    const auxId = id
    const [carPropeties, setCarPropeties] = useState<CarPropetiesInterface>()

    useEffect(() => {
        setLoading(true)
        async function fetchCar() {
            try{
                if (auxId) {
                const res = await fetch(`${Global.apiUrl}cars/${auxId}`);
                const json = await res.json();
                if (json.status == 404 || json.status === 400) {
                    router.push('/404')
                }
                setCarPropeties(json.body as CarPropetiesInterface);
            }

            }

            catch{
                router.push('/500')
            }

            setLoading(false)
        }
        fetchCar();
        
        {/*eslint-disable-next-line */ }
    }, [id])





    function Text(textProps: TextProps) {
        return (
            <p>{textProps.text}</p>
        )
    }

    function Camp(campProps: campPropsInter) {
        return (
            <div className="w-full dad justify-around p-1 border-r border-r-black">
                <p className="font-extralight text-zinc-600">{String(campProps.title).toUpperCase() ?? ''}</p>
                <p className="child font-bold text-2xl">{String(campProps.text).toUpperCase() ?? ''}</p>
            </div>
        )
    }

    function Camp1(campProps: campPropsInter) {
        return (
            <div className="w-full dad p-1">
                <p className="text-zinc-600">{String(campProps.title).toUpperCase() ?? ''}</p>
                <p className="child font-bold text-2xl ">{String(campProps.text).toUpperCase() ?? ''}</p>
            </div>
        )
    }

    function LineCamp(lineCampProps: LineCampProps) {
        return (
            <div className="flex">
                <Camp text={lineCampProps.text1} title={lineCampProps.title1}></Camp>
                <Camp1 text={lineCampProps.text2} title={lineCampProps.title2}></Camp1>
            </div>
        )
    }

    function Devider() {
        return (
            <div className="h-[1px] m-1 w-full bg-black">

            </div>
        )
    }

    function Line(lineProps: lineProps) {
        return (
            <div className={`w-0.5 h-full ${lineProps.color}`}>

            </div>
        )
    }

    function GroupLine(groupLineProps: lineProps) {
        const repeatLine = 50
        const repeatList: number[] = []
        for (let i = 0; i < repeatLine; i++) {
            repeatList.push(i)
        }

        return (
            <div className="flex w-[30%] max-w-[30%] h-full gap-0.5">
                {
                    repeatList.map(() => {
                        return (
                            <Line key={v4()} color={groupLineProps.color}></Line>
                        )
                    })
                }
            </div>
        )
    }

    return (
        <div>
            {
                loading ? <Loader /> : (
                    <div className="w-screen h-screen flex justify-center items-center">
                        <section className="document-A4 relative  document-gradient">
                            <header className="childrens-document-settings gradient-red flex relative">
                                <div className="absolute">
                                    <Image alt="Emblem-of-angola" src={'/Emblem_of_Angola.svg.png'} width={100} height={100} />
                                </div>
                                <div className="flex text-2xl flex-col text-center text-white w-full">
                                    <h1 className="font-bold">REPÚBLICA DE ANGOLA</h1>
                                    <p className="text-3xl">MINISTÉRIO DO INTERIOR</p>
                                    <p className="text-3xl">SERVIÇO DE PROTEÇÃO CIVIL E BOMBEIROS</p>
                                </div>
                            </header>
                            <main className="childrens-document-settings flex flex-col gap-5">
                                <div>
                                    <section className="vehicle-credential h-[50px] font-bold text-center flex flex-col w-[45%]  z-50 rounded-4xl relative">
                                        CREDENCIAL DE VEÍCULO
                                        <Text text={carPropeties?.vehicle_credential as string} />
                                    </section>
                                </div>
                                <div className="flex gap-10  h-[400px]">
                                    <section className="infos  w-[45%]">
                                        <section className="infos-main  h-[75%] border-amber-400">
                                            <LineCamp text1={carPropeties?.brand as string} text2={carPropeties?.model as string} title1='MARCA' title2="MODELO"></LineCamp>
                                            <Devider></Devider>
                                            <LineCamp text1={carPropeties?.color as string} text2={carPropeties?.vehicle_type as string} title1='Cor' title2="Tipo"></LineCamp>
                                            <Devider></Devider>
                                            <LineCamp text1={String(carPropeties?.seating_capacity ?? '')} text2={carPropeties?.fuel_type === "Outro" ? `${carPropeties?.custom_fuel_type}` : `${carPropeties?.fuel_type}`} title1="LOTAÇÃO" title2="combustível" />
                                            <Devider></Devider>
                                            <LineCamp text1={`${carPropeties?.wheelbase_cm ?? ''} CM`} text2={`${carPropeties?.transmission_type === "Outro" ? carPropeties?.custom_transmission_type ?? '' : carPropeties?.transmission_type ?? ''}`} title1="ENTRE-EIXOS" title2="Tipo de caixa" />
                                        </section>
                                        <section className="security-stripe flex overflow-hidden h-[25%] border-b-fuchsia-600">
                                            <GroupLine color="bg-red-600"></GroupLine>
                                            <GroupLine color="bg-yellow-600"></GroupLine>
                                            <GroupLine color="bg-black"></GroupLine>
                                        </section>
                                    </section>
                                    <section className="advanced-infos flex w-[55%]">
                                        <section className="advanced-infos-main h-[100%] w-[70%] border-pink-600">
                                            <LineCamp text1={String(carPropeties?.license_plate ?? '')} text2={String(carPropeties?.acquisition_year)} title1="Matrícula" title2="Ano de Aquisição" />

                                            <Devider></Devider>
                                            <LineCamp text1={String(carPropeties?.seating_capacity ?? '')} text2={`${String(carPropeties?.displacement_cc)} CM³`} title1="número do motor" title2="cilindrada" />

                                            <Camp1 title="Número Do Quadro" text={carPropeties?.chassis_number ?? ''}></Camp1>
                                            <Devider></Devider>
                                            <LineCamp text1={String(carPropeties?.tire_measurements ?? '')} text2={String(carPropeties?.number_of_cylinders)} title1="Medidas pneumáticas" title2="Número De Cilindro" />

                                            <Devider></Devider>
                                            <LineCamp text1={`${carPropeties?.gross_weight_kg ?? ''} kg`} text2={`${carPropeties?.curb_weight_kg ?? ''} kg`} title1="Peso bruto" title2="Tara" />
                                        </section>
                                        <section className="emblems flex flex-col relative  justify-center items-center w-[30%] h-[100%]">
                                            <div className="flex flex-col justify-center top-[-35px] items-center absolute">
                                                <Image alt="emblem" src={'/emblem1.png'} width={175} height={140} />
                                                <Image alt="emblem" src={'/emblem2.png'} width={143} height={140} />
                                                <Image alt="emblem" src={'/emblem3.png'} width={143} height={140} />
                                            </div>
                                        </section>
                                    </section>
                                </div>
                                <div className="transparent-black w-full h-full  absolute  top-[20.5%] left-0">
                                </div>
                            </main>
                            <footer className="childrens-document-settings">
                                <div className="w-full h-full border-2 justify-between flex rounded py-1 px-8 line-hi">
                                    <div>
                                        <p>Emitida em/Issued on: {new Date(carPropeties?.issued_at ?? '').toLocaleDateString('pt-PT')} </p>
                                        <p>Emitida por/ Issued by: Direçção de Manutenção Técnica/SPCB/MININT</p>
                                        <p>Válido até/ Valid until: {new Date(carPropeties?.valid_until ?? '').toLocaleDateString('pt-PT')}</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="font-bold">Uso Exclusivo</p>
                                        <p className="font-bold">SPCB</p>
                                        <p>Proibida reprodução</p>
                                    </div>
                                    <div>
                                        <p>Avenida Pedro Castro Can-Dunen Loy</p>
                                        <p>Rua da ENPOP/CAPOLO1</p>
                                        <p>Municipio do Kilamba - kiaxi</p>
                                    </div>
                                </div>
                            </footer>
                        </section>
                    </div>
                )
            }

        </div>
    )
}