import Message from "./Message"


interface adminFormProps {
    textButton: string
    error: boolean
    textWarning: string
    buttonFunction?: () => void
    adminNameValue?: string
    adminPwValue?: string
    setAdminNameValue: (value: string) => void
    setAdminPwValue: (value: string) => void
    disabled: boolean
}

export default function AdminForm (props: adminFormProps) {
    return (
        <form className="admin-form">
            <div className="inputs">
                <div className="camp">
                    <label htmlFor="adminName">Nome do admin</label>
                    <input type="text" name="adminName" id="adminName" value={props.adminNameValue} onChange={(evt)=> props.setAdminNameValue(evt.target.value)} />
                </div>
                <div className="camp">
                    <label htmlFor="adminPw">Senha do admin </label>
                    <input type="password" name="adminPw" id="adminPw"  value={props.adminPwValue} onChange={(evt)=> props.setAdminPwValue(evt.target.value)}/>
                </div>
            </div>
            <button type="button" className='button2' disabled={props.disabled} onClick={props.buttonFunction}>{props.textButton}</button>
            <div id="warning" className="error">
                <Message error={props.error} text={props.textWarning} >{undefined}</Message>
            </div>
        </form>
    )
}