"use client"
import Image from "next/image";
import Navbar from "../navbar/page";
import { useSession } from "next-auth/react"
import { useState } from "react";
import DateProvider from "../dateprovider";
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
    const [adderHeight,setAdderHeight] = useState("11%");
    const [inputHeight,setInputHeight] = useState("50px");
    const [buttonDisplay,setButtonDisplay] = useState("hidden");
    const [textareaValue,setTextareaValue] = useState("");
    const [buttonWidth,setButtonWidth] = useState("0px");


    const { data: session } = useSession()
    const expand = ()=>{
        setAdderHeight("40%");
        setInputHeight("180px");
        setButtonDisplay("visible");
        setButtonWidth("100px");
    }
    const contract = ()=>{
        if(textareaValue == ""){
            setAdderHeight("11%");
            setInputHeight("50px");
            setTextareaValue("");
            setButtonDisplay("hidden");
            setButtonWidth("0px");
        }else{
            if(confirm("Are you sure you want to cancel?")){
                setAdderHeight("11%");
                setInputHeight("50px");
                setButtonDisplay("hidden");
                setTextareaValue("");
                setButtonWidth("0px");
            }
        }
    }
    const share = ()=>{
        if(textareaValue != ""){
            setAdderHeight("11%");
            setInputHeight("50px");
            setButtonDisplay("hidden");
            setTextareaValue("");
            setButtonWidth("0px");        
        }else{
            alert("Cannot be empty!")
        }
    }
    return(
        <>
            <div className="factos-container">
                <div className="adder" style={{height:`${adderHeight}`}}>
                    <Image 
                        src={session.user.image} 
                        height={45}
                        width={45}
                        alt="User"
                    />
                    <textarea
                        value={textareaValue}
                        onChange={(e)=>{
                            setTextareaValue(e.target.value);
                        }}
                        maxLength="180"
                        type="text" 
                        placeholder="Share a fact!" 
                        onClick={expand} 
                        style={{height:`${inputHeight}`}}
                    />
                    <button style={{visibility:`${buttonDisplay}`,width:`${buttonWidth}`}} onClick={share}>Share</button>
                    <button 
                        style={{visibility:`${buttonDisplay}`,width:`${buttonWidth}`,background:"red"}}
                        onClick={contract}
                    >Cancel</button>
                </div>
                <hr style={{width:"100%"}} />
                <div className="items">
                        <Item/>
                </div>
            </div>
        </>
    );
}
export function Item(){
    const { data: session, status } = useSession()
    return(
        <>
            <div className="item">
                <div className="info">
                    <div className="userDetail">
                        <Image 
                            src={session.user.image}
                            height={35}
                            width={35}
                            alt="User"
                            />
                        <p>
                            <b>
                                {session.user.name}
                            </b>
                        </p>
                    </div>
                    <p title={Date()}>
                        {
                            <DateProvider/>
                        }
                    </p>
                </div>
                <div className="content">
                    <p>A fact a day keeps your stupidity away{`:)`}
                       <br />Share a fact that you learned today.
                       <br />Also learn facts from others.
                    
                     </p>
                </div>
            </div>
        </>
    );
}