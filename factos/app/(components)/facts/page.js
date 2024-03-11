"use client"
import Link from "next/link";
import Image from "next/image";
import Navbar from "../navbar/page";
import { useSession } from "next-auth/react"
export default function Facts(){
    const { data: session, status } = useSession()
    return(
        <>
            <div className="facts-container">
                <Navbar/>
                {
                    status == "authenticated" ? <Factos/> : <RequestSignin/>
                }
            </div>
        </>
    );
}
export function RequestSignin(){
    return(
        <>
            <h1 className="request">Please sign in to share/learn a fact</h1>
        </>
    );
}
export function Factos(){
    const { data: session, status } = useSession()
    return(
        <>
            <div className="factos-container">
                <div className="adder">
                    <Image 
                        src={session.user.image} 
                        height={45}
                        width={45}
                        alt="User"
                    />
                    <input type="text" placeholder="Share a fact!"/>
                    <button>Share</button>
                </div>
                <hr style={{width:"100%"}} />
                <div className="items">
                    <div className="item"></div>
                    <div className="item"></div>
                    <div className="item"></div>
                    <div className="item"></div>
                    <div className="item"></div>
                    <div className="item"></div>
                    <div className="item"></div>
                    <div className="item"></div>
                    <div className="item"></div>
                    <div className="item"></div>
                </div>
            </div>
        </>
    );
}