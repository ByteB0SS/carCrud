import AdminScreen from "@/components/AdminScreen";
import { useEffect, useState } from "react";
import AdminForm from "@/components/AdminForm";
import Global from "@/global/Global";
import { useRouter } from "next/router";

export default function UpdateCredentiols() {
  const [warning, setWarning] = useState<string>("");
  const [adminName, setAdminName] = useState<string>("");
  const [adminPw, setAdminPw] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);

  async function addAdmin() {
    if (!token) return; // não chama se o token ainda não estiver carregado

    const body = { 
      adminName: adminName,
      passWord: adminPw,
    };

    const res = await fetch(`${Global.apiUrl}admin/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        auth: `${token}`,
      },
      body: JSON.stringify(body),
    });

    const json = await res.json();

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
  }

  return (
    <AdminScreen
      headerTitle="Adicionar Administrador"
      type="admin"
      warningError={error}
      warningText={warning}
    >
      <div className="add-admin">
        <AdminForm
          error={false}
          setAdminNameValue={setAdminName}
          setAdminPwValue={setAdminPw}
          textButton="Adcionar A.D.M"
          textWarning="any"
          adminNameValue={adminName}
          adminPwValue={adminPw}
          buttonFunction={addAdmin}
          disabled={!token}
        />
      </div>
    </AdminScreen>
  );
}
