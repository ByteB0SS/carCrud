import AdminScreen from "@/components/AdminScreen";
import CarsCard from "@/components/CarsCards";
import { useState } from "react";

export default function AllAdmins () {  
    const [error, setError] = useState<boolean>(false)
    const [warning, setWarning] = useState<string>('')
    const [loadingRes, setLoadingRes] = useState<boolean>(false)
    return (
        <AdminScreen loading={loadingRes} warningText={warning} warningError={error} headerTitle="Todos os Carros" type="car">
            <div>
                <CarsCard setLoading={setLoadingRes}  setWarning={setWarning} setError={setError}>
                    
                </CarsCard>
            </div>
        </AdminScreen>
    )
}