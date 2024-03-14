"use client"
import Image from "next/image";
import Navbar from "../navbar/page";
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react";
import { dbimg,dbtext } from "@/app/Facts-TodayConfig";
import { v4 } from "uuid";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { addDoc, collection, getDocs } from "firebase/firestore";

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
    },[])
    const [facts, setFacts] = useState([]); 
    const [adderHeight,setAdderHeight] = useState("11%");
    const [inputHeight,setInputHeight] = useState("50px");
    const [buttonDisplay,setButtonDisplay] = useState("hidden");
    const [textareaValue,setTextareaValue] = useState("");
    const [buttonWidth,setButtonWidth] = useState("0px");
    const [data,setData] = useState([]);
    const {data: session} = useSession()
    console.log(data);
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
    const share = async () => {
        let imgurl = "";
        if (textareaValue !== "") {
          setFacts([...facts, { fact: textareaValue }]);
          setAdderHeight("11%");
          setInputHeight("50px");
          setButtonDisplay("hidden");
          setTextareaValue("");
          setButtonWidth("0px");
      
          fetch(session.user.image)
            .then(response => response.blob())
            .then(imageBlob => {
              if (!isValidImageType(imageBlob.type)) {
                alert("Invalid image format. Please upload a JPEG or PNG file.");
                return; 
              }
              const imgsRef = ref(dbimg, `imgs/${v4()}.${getExtension(imageBlob.type)}`);
              uploadBytes(imgsRef, imageBlob, {
                contentType: imageBlob.type 
              })
                .then(data => {
                  getDownloadURL(data.ref).then( val => {
                    imgurl = val;
                    const abc = collection(dbtext,"txtData");
                    addDoc(abc,{txtVal:textareaValue,imgUrl:imgurl,timeVal:final,username:session.user.name});
                  });
                })
                .catch(error => {
                  console.error("Error uploading image:", error);
                });
            })
            .catch(error => {
              console.error("Error fetching image:", error);
            });
        } else {
          alert("Cannot be empty!");
        }
      };
      
      function getExtension(mimeType) {
        if (!mimeType || !mimeType.includes('/')) {
          return ''; 
        }
        return mimeType.split('/')[1];
      }
      
      function isValidImageType(mimeType) {
        const supportedTypes = ['image/jpeg', 'image/png'];
        return supportedTypes.includes(mimeType);
      }
      const getData = async ()=>{
        const valRef = collection(dbtext,"txtData");
        const dataDB = await getDocs(valRef);
        const alldata = dataDB.docs.map(val=>({...val.data(),id:val.id}))
        setData(alldata);
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
                <div className="items">
                        <Item imgUrl = {session.user.image} username = {session.user.name} timeVal = {final} fact="A fact a day keeps your stupidity away:)" />
                        {
                          data.map(({id,imgUrl, timeVal ,txtVal,username}) => (
                            <Item key={id} imgUrl = {imgUrl} username = {username} timeVal = {timeVal} fact={txtVal}/>
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
