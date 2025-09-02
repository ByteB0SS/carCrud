import AdminHeader from "./AdminHeader";
import { ReactNode } from "react";
import Loader from "./Loader";
import { useState, useEffect } from "react";


interface adminScreenProps {
    headerTitle: string
    children: ReactNode
    type: 'car' | 'admin'
    warningText: string
    warningError: boolean
    loading: boolean
}


export default function AdminScreen(props: adminScreenProps){
    const [loader, setLoader] = useState<boolean>(true)

    useEffect(()=> {
        setTimeout(()=> {
            setLoader(false)
        }, )
    }, [])

    return (
        <div className="page w-[700px] h-screen m-auto admin-screen border relative">
            <AdminHeader type={props.type}  title={props.headerTitle}/>
            <main className="p-2.5  h-[80%]">
                <div className="h-full">
                    {props.children}
                </div>
            </main>
            <section className="warnings border overflow-auto mx-2.5 h-[10%] relative">
                <div className={`main-warning flex  p-1 gap-2 flex-col items-center justify-center+`}>
                    <p>Mensagens do sitema: </p>
                    {
                        props.loading ? <Loader/> : <p className={`font-bold text-center ${ props.warningError ? 'text-red-600': 'text-green-600'}`}>{props.warningText}</p>
                    }
                    
                </div>
            </section>
            {
                loader && <Loader/>
            }
        </div>
    )
}