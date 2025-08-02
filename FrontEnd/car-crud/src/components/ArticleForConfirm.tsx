interface HiddenProps {
    msg: string
    confirmFunction: () => void
}

export function openArticleConfirm (){
    const hidden = document.getElementById('shadow-box-delete')
    if (hidden){
        hidden.style.display = "flex"
    }
}

export default function ArticleForConfirm (props: HiddenProps) {
    function closeHidden (){
        const hidden = document.getElementById('shadow-box-delete')
        if(hidden){
            hidden.style.display = "none"
        }
    }


    return (
        <div onClick={closeHidden} id="shadow-box-delete" className="disappear flex w-full h-screen bg-black  fixed top-0 right-0 items-center justify-center">
            <article id="content-box" className="flex flex-col bg-white border p-10 gap-5">
                <p>{props.msg}</p>
                <div className="w-full flex justify-around">
                    <button onClick={closeHidden} className="button2">Cancelar</button>
                    <button onClick={props.confirmFunction} className="button4">Confirmar</button>
                </div>
            </article>
        </div>
    )
}
