import { ReactNode } from "react"
import { useState, useEffect } from "react"

interface screenProps {
    children: ReactNode
}

export default function Screen (props: screenProps) {
    const [loading, setLoading] = useState(true);

    if (loading){
        
    }

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 1000); 
    }, []);
    
    return (
        <div className="screen">    
            {props.children}
        </div>
    )
}