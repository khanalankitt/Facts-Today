"use client"
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react"

export default function Navbar(){
    const { data: session, status } = useSession()
    return(
        <>
            {status == "authenticated" ? <NavbarComp src={session.user.image} name={session.user.name.split(" ")[0].toUpperCase()} goto="/dashboard"/> : <NavbarComp src="/person.png" name="Sign in" goto="/login"/>}
        </>
    );
}

export function NavbarComp(props){
    return (
        <>
            <nav>
                <div className="container">
                    <div className="heading">
                        <Link href="/">
                            <h2>Home</h2>
                        </Link>
                    </div>
                    <div className="links" title="Dashboard">
                        <Link href={props.goto}>
                            <div className="user">
                                <Image 
                                    src={props.src} 
                                    alt="User Image"
                                    height={40}
                                    width={40}
                                />
                                <p>{props.name}</p>
                            </div>
                        </Link>
                    </div>
                </div>
            </nav>
        </>
    );
}