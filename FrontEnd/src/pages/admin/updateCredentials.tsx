import AdminForm from '../../components/AdminForm'
import { useState } from "react"
import { useRouter } from "next/router"
import Global from "@/global/Global"

export default function Login() {
    const [adminName, setAdminName] = useState<string>("")
    const [adminPw, setAdminPw] = useState<string>("")
    const [error, setError] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    const [warning, setWarning] = useState<string>("")
    const apiUrl = Global.apiUrl
    const router = useRouter()

    async function updateCred () {
        setLoading(true)
        const urlrote = `${apiUrl}admin/update`

        const res = await fetch(urlrote, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth': `${localStorage.getItem('token')}`
            }, 
            body: JSON.stringify({
                newAdminName: adminName,
                newPassWord: adminPw,
                id: localStorage.getItem('toBeChanged')
            })
        })

        const json = await res.json()

        if(!json){
            setWarning('erro de conexão com o servidor')
            setError(true)
        }
        
        setWarning(json.msg)

        document.getElementById('message-box')?.classList.remove('disappear')
        if(json.status == 200){
            setTimeout(()=> {
                router.push('/admin/AllAdmins')
            }, 1000)
        }
        else{
            setError(true)
        }

        setLoading(false)
        

        setTimeout(()=> {
            setWarning('')
        }, 4000)
    } 

    return (
            <div className="h-screen w-screen flex">
                <div className="w-[700px] screen2">
                <header className="head gradient-red">
                    <h1>Novas Credenciaias</h1>
                </header>
                <main className="flex flex-col">
                    <h2>Login</h2>
                    <AdminForm loading={loading} disabled={false} error={error} textWarning={warning} textButton="Actualizar credenciais" buttonFunction={updateCred} adminNameValue={adminName} adminPwValue={adminPw} setAdminNameValue={setAdminName} setAdminPwValue={setAdminPw}></AdminForm>
                </main>
            </div>
            </div> 
    )
}