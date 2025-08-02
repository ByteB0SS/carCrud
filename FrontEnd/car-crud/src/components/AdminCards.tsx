import AdminCard from "./AdminCard";
import Link from "next/link";
import React from "react";

interface userInterface {
    id: number,
    admin_name: string
    role: string
}

interface AdminCards {
    users: userInterface[],
    setWarning: React.Dispatch<React.SetStateAction<string>>
}

export default function AdminCards (props: AdminCards) {
    return (
        <div className="flex flex-col gap-7"> 
            <section className="cards-information flex w-[90%] m-auto gradient-red justify-between px-5 py-2.5 mt-2.5">
                <article>Nome</article>
                <article>Função</article>
                <article>Opções</article>
            </section>

            <div className="flex flex-col max-h-[500px] overflow-y-auto gap-2.5">
                {
                    props.users.map((user) => {
                        return (
                            <AdminCard key={user.id} adminId={user.id} adminName={user.admin_name} adminType={user.role} setWarning={props.setWarning}></AdminCard>
                        )
                    })
                }
            </div>
                
            <Link href={"/admin/AddAdmin"} className="button2 text-center w-[90%] m-auto">
                <button>Adcionar A.D.M</button>
            </Link>
        </div>
        
    )
}