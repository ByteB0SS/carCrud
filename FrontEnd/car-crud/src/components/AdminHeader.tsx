import Link from "next/link"
import { useRouter } from "next/router"
import { v4  } from 'uuid';

export interface nameAndLinkListInterface {
    nameLink: string
    link: string
}

interface adminHeaderProps {
    title: string,
    type: 'car' | 'admin'
}



export default function AdminHeader (props: adminHeaderProps) {
    const router = useRouter()

    const adminRoutesList: nameAndLinkListInterface[] = [{nameLink: 'ver todos A.D.M', link:'/admin/AllAdmins'}, {nameLink: 'Adicionar A.D.M', link: '/admin/AddAdmin'}, {nameLink: 'Ir pra login', link: '/admin/Login'}]
    const carsRoutesList: nameAndLinkListInterface[] = [{nameLink: 'ver todos carros', link:'/admin/AllCars'}, {nameLink: 'Adcionar Carro', link: '/admin/AddCar'},{nameLink: 'Ir pra Login', link: '/admin/Login'}]
    const currentRoutes: nameAndLinkListInterface[] = props.type === 'car' ? carsRoutesList : adminRoutesList

    function NavOption(navOptionProps: nameAndLinkListInterface) {
        return (
            <li key={v4()}>
                <Link href={navOptionProps.link}>{navOptionProps.nameLink}</Link>
            </li>
        )
    }

    
    
    return (
        <header  className="adminHeader h-[10%]">
            <section className="gradient-red text-white border-b-1 px-2.5 py-0.5">
                <h1>@Admin</h1>
            </section>

            <nav id="main-navegation" className="fore2">
                <ul className="flex">
                    <li className="">
                        <Link className={` ${router.asPath === '/admin/AllCars' ? 'red': 'fore'} `} href={`/admin/AllCars`}>Carros</Link>
                    </li>
                    <li className="">
                        <Link className={` ${router.asPath === '/admin/AllAdmins' ? 'red': 'fore'} `} href={'/admin/AllAdmins'}>Administradores</Link>
                    </li>
                </ul>
            </nav>

            <section className="title p-2.5 flex  justify-between font-bold">
                <h1>{props.title}</h1>

                <section className="menu">
                    <div className="block cursor-pointer text-3xl font-bold">
                        ≡
                    </div>

                    <nav>
                        <ul className="border nav-options z-20 bg-[var(--foreground)]">
                            {
                                currentRoutes.map((element)=> {
                                    return(
                                        <NavOption key={v4()} link={element.link} nameLink={element.nameLink}/>
                                    )
                                })
                            }
                        </ul>
                    </nav>
                </section>
            </section>
        </header>
    )
}