"use client"
import Image from "next/image";
import Navbar from "../navbar/page";
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react";
import { dbtext } from "@/app/Facts-TodayConfig";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { v4 } from "uuid";
import { onSnapshot } from "firebase/firestore";
let date = new Date();
let day = date.getDate();
day =  day < 10 ? "0" + day : day;
let month = date.getMonth() + 1;
let year = date.getFullYear();
year =  year < 10 ? "0" +year : year;
let final = `${month}/${day}/${year}`

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
    useEffect(()=>{
        getData()
        const unsubscribe = subscribeToData();
        return () => unsubscribe();
      },[])

    const [facts, setFacts] = useState([]); 
    const [adderHeight,setAdderHeight] = useState("11%");
    const [inputHeight,setInputHeight] = useState("50px");
    const [buttonDisplay,setButtonDisplay] = useState("hidden");
    const [textareaValue,setTextareaValue] = useState("");
    const [buttonWidth,setButtonWidth] = useState("0px");
    const [id,setId] = useState('');
    const [data,setData] = useState([]);
    const {data: session} = useSession()
    console.log(data);
    const expand = ()=>{
        setAdderHeight("40%");
        setInputHeight("180px");
        setButtonDisplay("visible");
        setButtonWidth("100px");
        setId('jharo');
    }
    const contract = ()=>{
        if(textareaValue == ""){
            setAdderHeight("11%");
            setInputHeight("50px");
            setTextareaValue("");
            setButtonDisplay("hidden");
            setButtonWidth("0px");
            setId('');
        }else{
            if(confirm("Are you sure you want to cancel?")){
                setAdderHeight("11%");
                setInputHeight("50px");
                setButtonDisplay("hidden");
                setTextareaValue("");
                setButtonWidth("0px");
                setId('');
            }
        }
    }
    const share = async () => {
        if (textareaValue !== "") {
          setFacts([...facts, { fact: textareaValue }]);
          setAdderHeight("11%");
          setInputHeight("50px");
          setButtonDisplay("hidden");
          setTextareaValue("");
          setButtonWidth("0px");
          setId('');
          const abc = collection(dbtext,"txtData");
          addDoc(abc,{txtVal:textareaValue,timeVal:final,username:session.user.name,userEmail:session.user.email,postId:`${v4()}`});

        } else {
          alert("Cannot be empty!");
        }
      };
      const getData = async ()=>{
        const valRef = collection(dbtext,"txtData");
        const dataDB = await getDocs(valRef);
        const alldata = dataDB.docs.map(val=>({...val.data(),id:val.id}))
        setData(alldata);
      }
      const subscribeToData = () => {
        const valRef = collection(dbtext, "txtData");
        return onSnapshot(valRef, (snapshot) => {
            const updatedData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setData(updatedData);
        });
    }
    return(
        <>
            <div className="factos-container">
                <div className="adder" id={id} style={{height:`${adderHeight}`}}>
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
                <div className="items">
                        <Item imgUrl = {session.user.image} username = {session.user.name} timeVal = {final} fact="A fact a day keeps your stupidity away:) Share a fact that you know and learn from others as well!" />
                        {
                          data.map(({id, timeVal ,txtVal,username,userEmail,postId}) => (
                            <Item 
                                key={id} 
                                id={id} 
                                imgUrl = "/donkey.png" 
                                username = {username} 
                                timeVal = {timeVal} 
                                fact={txtVal} 
                                userEmail={userEmail}
                                postId={postId}
                            />
                          ))
                        }
                </div>
            </div>
        </>
    );
}
export function Item(props){
    return(
        <>
            <div className="item">
                <div className="info">
                    <div className="userDetail">
                        <Image 
                            src={props.imgUrl}
                            height={35}
                            width={35}
                            alt="User"
                            />
                        <p>
                            <b>
                                {props.username}
                            </b>
                        </p>
                    </div>
                    <p title={Date()}>
                        {
                            props.timeVal
                        }
                    </p>
                </div>
                <div className="content">
                    <p>{props.fact}</p>
                </div>
            </div>
        </>
    );
}
