import AdminScreen from "@/components/AdminScreen";
import { useEffect, useState } from "react";
import AdminForm from "@/components/AdminForm";
import Global from "@/global/Global";
import { useRouter } from "next/router";

export default function UpdateCredentiols() {
  const [warning, setWarning] = useState<string>("");
  const [adminName, setAdminName] = useState<string>("");
  const [loadingRes, setLoadingRes] = useState<boolean>(false)
  const [adminPw, setAdminPw] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);

  async function addAdmin() {
    if (!token) return;

    const body = { 
      adminName: adminName,
      passWord: adminPw,
    };

    try{
      setLoadingRes(true)
      const res = await fetch(`${Global.apiUrl}admin/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          auth: `${token}`,
        },
        body: JSON.stringify(body),
      });

      const json = await res.json();

      setLoadingRes(false)

      if (json.status === 403) {
        setError(true);
        setWarning(json.msg);
        setTimeout(() => {
          router.push("/admin/Login");
        }, 3000);
      } else if (json.status !== 200) {
          setError(true);
          setWarning(json.msg);
      } else {
          setError(false);
          setWarning(json.msg);
      }

      setTimeout(()=> {
        setWarning('')
      }, 3000)
    }
    catch{
      setError(true)
      setWarning('Algum erro ocorreu, caso o erro continue pode ser devido ao nosso sistema de segurança, então tente novamente daqui a 1 minuto')
      setTimeout(()=>{
        setWarning('')
      }, 3000)
    }
    
  }

  return (
    <AdminScreen
      headerTitle="Adicionar Administrador"
      type="admin"
      warningError={error}
      warningText={warning}
      loading={loadingRes}
    >
      <div className="add-admin">
        <AdminForm loading={false}
          error={false}
          setAdminNameValue={setAdminName}
          setAdminPwValue={setAdminPw}
          textButton="Adcionar A.D.M"
          textWarning=""
          adminNameValue={adminName}
          adminPwValue={adminPw}
          buttonFunction={addAdmin}
          disabled={!token}
        />
      </div>
    </AdminScreen>
  );
}
