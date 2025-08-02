import AdminScreen from "@/components/AdminScreen";
import CarsCard from "@/components/CarsCards";
import { useState } from "react";

export default function AllAdmins () {  
    const [error, setError] = useState<boolean>(false)
    const [warning, setWarning] = useState<string>('')
    return (
        <AdminScreen warningText={warning} warningError={error} headerTitle="Todos os Carros" type="car">
            <div>
                <CarsCard setWarning={setWarning} setError={setError}>
                    
                </CarsCard>
            </div>
        </AdminScreen>
    )
}