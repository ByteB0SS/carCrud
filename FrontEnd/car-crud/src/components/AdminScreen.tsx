import AdminHeader from "./AdminHeader";
import { ReactNode } from "react";

interface adminScreenProps {
    headerTitle: string
    children: ReactNode
    type: 'car' | 'admin'
    warningText: string
    warningError: boolean

}


export default function AdminScreen(props: adminScreenProps){
    return (
        <div className="w-[700px] h-screen m-auto admin-screen border">
            <AdminHeader type={props.type}  title={props.headerTitle}/>
            <main className="p-2.5  h-[80%]">
                <div className="h-full">
                    {props.children}
                </div>
            </main>
            <section className="warnings border overflow-auto mx-2.5 h-[10%]">
                <div className={`main-warning flex  p-1 gap-2 flex-col items-center`}>
                    <p>Mensagens do sitema: </p>
                    <p className={`font-bold text-center ${ props.warningError ? 'text-red-600': 'text-green-600'}`}>{props.warningText}</p>
                </div>
            </section>

        </div>
    )
}