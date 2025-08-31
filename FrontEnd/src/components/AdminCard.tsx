import Global from "@/global/Global"
import Image from "next/image"
import { useRouter } from "next/router"
import React from "react"

interface adminCardProps {
    adminName: string
    adminType: string
    setWarning:  React.Dispatch<React.SetStateAction<string>>
    adminId: number
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

export default function AdminCard (props: adminCardProps) {
    const apiUrl = Global.apiUrl
    const token = localStorage.getItem('token')
    const router = useRouter()

    async function deleteAdmin () {
        props.setLoading(true)
        try{
            const res = await fetch(`${apiUrl}admin/delete/${props.adminId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'auth': `${token}`
                },
                body: JSON.stringify({
                    n: 'qualquer dados'
                })
            })
            const json = await res.json()
            props.setWarning(json.msg)

            if(json.status === 200){
                document.getElementById(`admin_card_${props.adminId}`)?.classList.add('disappear')
            }
        }
        catch {
            props.setWarning('Algun erro ao se conectar ao servidor')
        }
        props.setLoading(false)
    }

    async function updateCredentials () {
        localStorage.setItem('toBeChanged', `${props.adminId}`)
        router.push("/admin/updateCredentials")
    }

    return (
         <article
            id={`admin_card_${props.adminId}`}
            className="admin-card flex w-[90%] m-auto justify-between border px-5 py-2.5"
            >
            {/* Nome do admin */}
            <div className="relative w-full">
                <div className="tooltip-container">
                <div className="truncate-text">{props.adminName}</div>
                <span className="tooltip-text">{props.adminName}</span>
                </div>
            </div>

            {/* Tipo do admin */}
            <div className="relative w-full flex justify-center">
                <div className="tooltip-container">
                <div className="truncate-text">{props.adminType}</div>
                <span className="tooltip-text">{props.adminType}</span>
                </div>
            </div>

            {/* Ações */}
            <section className="flex w-full  justify-end">
                <button onClick={deleteAdmin} className="text-white">
                <Image alt="DELETE icon" src="/delete.png" width={15} height={15} />
                </button>
                <button onClick={updateCredentials} className="text-white">
                <Image alt="UPDATE icon" src="/update2.png" width={15} height={15} />
                </button>
            </section>
        </article>
    )
}