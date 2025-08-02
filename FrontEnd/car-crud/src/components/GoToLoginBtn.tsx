import { useRouter } from "next/router";

export default function GoToLoginBtn() {
    const router = useRouter();
    function goToLoginPage() {
        router.push("/admin/Login");
    }
    return (
        <div className="flex button3 justify-center">
            <button className="btn btn-primary" onClick={goToLoginPage}>
                Fazer login como administrador
            </button>
        </div>
    );
}