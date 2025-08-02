interface HiddenProps {
    qrCodeLink: string
}

export function openHidden (){
    const hidden = document.getElementById('shadow-box')
    if (hidden){
        hidden.style.display = "flex"
    }
}

export default function QrCodeHide (props: HiddenProps) {
    function closeHidden (){
        const hidden = document.getElementById('shadow-box')
        if(hidden){
            hidden.style.display = "none"
        }
    }


    return (
        <div onClick={closeHidden} id="shadow-box" className="flex w-full h-screen bg-black fixed top-0 right-0 items-center justify-center">
            <article id="content-box">
                {/* eslint-disable-next-line */}
                <img src={props.qrCodeLink} alt="qr destacado" width={300} height={300}></img>
            </article>
        </div>
    )
}