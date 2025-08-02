import Image from "next/image"
import CarCard from "./CarCard"
import { useRouter } from "next/router"
import { useState, useEffect, SetStateAction } from "react"
import Message from "./Message"
import GoToLoginBtn from "./GoToLoginBtn"
import Global, {CarPropetiesInterface} from "@/global/Global"
import React from "react"

interface carsCardsProps {
    setWarning: React.Dispatch<SetStateAction<string>>
    setError: React.Dispatch<SetStateAction<boolean>>
}

export default function CarsCard(props: carsCardsProps) {
    const [warning, setWarning] = useState('')
    const [cars, setCars] = useState<CarPropetiesInterface[]>([])  // Estado para guardar os carros
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const router = useRouter()

    function goToAddCarPage () {
    const storageToken = localStorage.getItem('token')
    
    if (storageToken) {
        router.push('/admin/AddCar') // ou a rota correta para adicionar carro
    } else {
        document.getElementById('message-box')?.classList.remove('disappear')
        props.setWarning('Precisa logar como administrador pra poder adicionar carros')
        setWarning('Precisa logar como administrador pra poder adicionar carros')
    }
}



    async function getCars () {
        const apiUrl = Global.apiUrl
        const res = await fetch(`${apiUrl}cars`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'auth': `${localStorage.getItem('token')}`
            }
        })

        const json = await res.json()

        if (json.status === 403){
            router.push('/admin/Login')
        } else {
            setCars(json.body || [])
        }

        setIsLoading(false)
    }   

    useEffect(()=>{
        getCars()
        {/* eslint-disable-next-line */}
    },[])

    return (
        <div>
            <section className="cars-information flex w-[90%] m-auto gradient-red justify-between px-5 py-2.5 mt-2.5">
                <article className="w-full text-center">Marca</article>
                <article className="w-full text-center">Modelo</article>
                <article className="w-full text-center">Placa</article>
                <article className="w-full text-center">Qr-Code</article>
            </section>

            <div className="w-[90%] my-2.5 m-auto overflow-y-auto max-h-[500px] py-2.5">
                {
                    isLoading ? (
                        <p>Carregando...</p>
                    ) : cars.length === 0 ? (
                        <p>Sem carros</p>
                    ) : (
                            cars.map((car) => (
                                <CarCard
                                    key={car.id}
                                    id={car.id}
                                    brand={car.brand}
                                    model={car.model}
                                    license_plate={car.license_plate}
                                    setWarning = {props.setWarning}
                                    setError = {props.setError}
                                />
                            ))
                    )
                }
            </div>

            <div className="flex w-[90%] m-auto buttons justify-between">
                <button onClick={goToAddCarPage} className="button2 w-full">Adcionar Carro</button>
            </div>

            <div className="flex text-center justify-center gap-1 mt-10">
                <p>para ver mais detalhes de um carro escaneie o qr code, ou clique em </p>
                <Image src={'/eye.png'} width={20} height={10} alt="see more details" />
            </div>

            <Message text={warning || ''} error={true}>
                <GoToLoginBtn />
            </Message>
        </div>
    )
}
