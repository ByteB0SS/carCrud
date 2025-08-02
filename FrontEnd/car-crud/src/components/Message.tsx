import React from "react"

interface messageProps {
    text: string,
    error: boolean,
    children: React.ReactNode,
}

export default function Message (props: messageProps) {
    return (
        <div id="message-box" className={"disappear w-[90%] m-auto mt-6 h-[100px] text-1xl bg-white font-bold flex flex-col items-center justify-center" + ` ${props.error ? 'text-red': ''} `}>
            <p>{props.text}</p>
            <div className="optional-content ">
                {props.children}
            </div>
        </div>
    )
}