"use client"
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
export default function Dashboard(){
    const handleClick = ()=>{
        if(confirm("Are you sure you want to logout?"))
        signOut({callbackUrl:"http://localhost:3000/facts"})
    }
    const {data: session} = useSession()
    return(
        <>
            <div className="dashboard-container">
                <div className="go-back">
                    <Link href="/facts">
                        <h3 title="Facts">{"< "}Go Back</h3>
                    </Link>
                </div>
                <h1>Dashboard</h1>
                <Image
                    src={session?.user?.image}
                    height = {100}
                    width  = {100}
                    alt = "photo"
                />
                <h2>{session?.user?.name}</h2>
                <button onClick={handleClick}
                >Logout</button>
            </div>
        </>
    );
}