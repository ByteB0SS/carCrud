import AdminForm from '../../components/AdminForm'
import { useState } from "react"
import { useRouter } from "next/router"
import Global from "@/global/Global"

export default function Login() {
    const [adminName, setAdminName] = useState<string>("")
    const [adminPw, setAdminPw] = useState<string>("")
    const [error, setError] = useState<boolean>(false)
    const [warning, setWarning] = useState<string>("")
    const apiUrl = Global.apiUrl
    const router = useRouter()

    async function doLogin () {
        const urlrote = `${apiUrl}admin/login`
        console.log(urlrote)
        const res = await fetch(urlrote, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify({
                adminName: adminName,
                passWord: adminPw
            })
        })

        const json = await res.json()
        console.log(json)

        if(!json){
            setWarning('erro de conexão com o servidor')
        }
        
        setError(json.status !== 200)
        setWarning(json.msg)

        document.getElementById('message-box')?.classList.remove('disappear')
        if(json.status == 200){
            localStorage.setItem('token', json.body.token)
            setTimeout(()=> {
                router.push('/admin/AllCars')
            }, 1000)
        }
        
    } 

    return (
            <div className="h-screen w-screen flex">
                <div className="w-[700px] screen2">
                <header className="head gradient-red">
                    <h1>Fazer Login de administrador</h1>
                </header>
                <main className="flex flex-col">
                    <h2>Login</h2>
                    <AdminForm disabled={false} error={error} textWarning={warning} textButton="Fazer login" buttonFunction={doLogin} adminNameValue={adminName} adminPwValue={adminPw} setAdminNameValue={setAdminName} setAdminPwValue={setAdminPw}></AdminForm>
                </main>
            </div>
            </div> 
    )
}