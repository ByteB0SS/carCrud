import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import Global from "@/global/Global"
import AdminScreen from "@/components/AdminScreen"
import AdminCards from "@/components/AdminCards"
import Link from "next/link"
const apiUrl = Global.apiUrl

interface userType{
      id: number,
      admin_name: string,
      role: string
}

export default function AllAdmins () {
    const router = useRouter()
    const [warning, setWarning] = useState<string>("")
    const [error, setError] = useState<boolean>(false)
    const [users, setUsers] = useState<userType[]>([])
    const [loadingRes, setLoadingRes] = useState<boolean>(false)
    const [loadingAdmins, setLoadingAdmins] = useState<boolean>(true)


    useEffect(()=>{
        const token = localStorage.getItem('token')

        setTimeout(()=> {}, 2000)
        async function main (){
            const res = await fetch(`${apiUrl}admin`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json', 
                    'auth': `${token}`
                }
            })

            const json = await res.json()
            setUsers(json.body)

            // verifications
            if(json.status === 403){
                setWarning(json.msg + " tens de fazer login novamente.")
                setError(false)

                setTimeout(()=> {
                    router.push('/admin/Login')
                }, 2000)
            }

            if(json.status !== 200){
                setWarning(json.msg)
                setError(true)
            }
            
            setLoadingAdmins(false)
        } 

        main()
        {/*eslint-disable-next-line */}
    }, [])

    return (
        <AdminScreen loading={loadingRes} warningText={warning} warningError={error} headerTitle="Todos os administradores" type="admin">
            <section>
                {
                    users ? <AdminCards setDeleting={setLoadingRes} loaging={loadingAdmins} setWarning={setWarning} users={users}></AdminCards> : <p className="">Sem users</p>
                }
            </section>
            <Link href={"/admin/AddAdmin"} className="button2 mt-[20px] flex justify-center text-center w-[90%] m-auto">
                <button className="w-[90%]">Adcionar A.D.M</button>
            </Link>
        </AdminScreen>
    )
}