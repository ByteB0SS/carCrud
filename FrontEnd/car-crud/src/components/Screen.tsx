import { ReactNode } from "react"


interface screenProps {
    children: ReactNode
}

export default function Screen (props: screenProps) {
    return (
        <div className="screen">    
            {props.children}
        </div>
    )
}