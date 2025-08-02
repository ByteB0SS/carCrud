import Link from "next/link"
import Image from "next/image"
import QrCodeHide, { openHidden } from "./QrCodeHide"
import Global from "@/global/Global"
import { useRouter } from "next/router"
import ArticleForConfirm from "./ArticleForConfirm"
import { openArticleConfirm } from "./ArticleForConfirm"
import React from "react"

interface carCardProps {
    brand: string
    model: string
    license_plate: string
    id: number
    setError: React.Dispatch<React.SetStateAction<boolean>>
    setWarning: React.Dispatch<React.SetStateAction<string>>    
}

export default function CarCard(props: carCardProps) {
    const router = useRouter()

    async function handleDownload() {
        const res = await fetch("https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=https://youtube.com")
        const blob = await res.blob()
        
        const linkTodownload = document.createElement("a")
        linkTodownload.href = URL.createObjectURL(blob)
        linkTodownload.download = "qrcode.png"
        linkTodownload.click()
    }

    async function deleteCar() {
        const res = await fetch(`${Global.apiUrl}cars/deleteCar/${props.id}`, {
            method: 'DELETE',
            headers: {
                'auth': `${localStorage.getItem('token')}`
            }
        })

        const json = await res.json()
        if (json.status !== 200) {
            props.setError(true)
        } else {
            document.getElementById(`car-card-${props.id}`)?.classList.add('disappear')
            props.setError(false)
        }

        props.setWarning(json.msg)
    }

    async function updateCar() {
        localStorage.setItem('carToBeChangedId', `${props.id}`)
        router.push('/admin/UpdateCar')
    }

    return (
        <section id={`car-card-${props.id}`} className="border my-2.5 px-1 py-1 flex items-center justify-between">
            {/* Marca */}
            <div className="relative text-center w-full">
                <div className="tooltip-container">
                    <div className="truncate-text">{props.brand}</div>
                    <span className="tooltip-text">{props.brand}</span>
                </div>
            </div>

            {/* Modelo */}
            <div className="relative text-center w-full">
                <div className="tooltip-container">
                    <div className="truncate-text">{props.model}</div>
                    <span className="tooltip-text">{props.model}</span>
                </div>
            </div>

            {/* Matrícula */}
            <div className="relative text-center w-full">
                <div className="tooltip-container">
                    <div className="truncate-text">{props.license_plate}</div>
                    <span className="tooltip-text">{props.license_plate}</span>
                </div>
            </div>

            {/* Ações */}
            <article className="w-full flex justify-center h-auto  ">
                <div className="qr-code flex    w-[50%] h-[50px]">
                    <button onClick={openHidden}>
                        <img 
                            src={`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=http://localhost:3000/admin/Car/${props.id}`} 
                            width={50} 
                            height={50} 
                            alt="qrcode img" 
                        />
                    </button>
                    <div className="h-[50px] m-auto flex flex-col justify-around">
                        <button className="button" onClick={handleDownload}>
                            <Image src={'/download.png'} width={15} height={15} alt="download button img" />
                        </button>
                        <Link href={`/admin/Car/${props.id}`} className="button">
                            <Image src={'/eye.png'} width={15} height={15} alt="see more details" />
                        </Link>
                    </div>
                </div>
                <div className="flex noIndex w-auto gap-2">
                    
                    <div className="flex flex-col justify-around">
                        <button onClick={openArticleConfirm} className="text-white">
                            <Image alt="DELETE icon" src={'/delete.png'} width={15} height={15} />
                        </button>
                        <button onClick={updateCar} className="text-white">
                            <Image alt="UPDATE icon" src={'/update2.png'} width={15} height={15} />
                        </button>
                    </div>
                </div>
            </article>

            <QrCodeHide qrCodeLink={`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=http://localhost:3000/admin/Car/${props.id}`} />
            <ArticleForConfirm confirmFunction={deleteCar} msg="Tens certeza que quer apagar este carro?" />
        </section>
    )
}
