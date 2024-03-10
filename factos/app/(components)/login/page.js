"use client"
import Image from "next/image";
import { signIn } from "next-auth/react"
export default function Login() {
    return (
      <>
        <div className="login-container loginsignup">
          <h2>Login to get started</h2>
          <hr />
          <button onClick={()=>{
                signIn('google',{callbackUrl:"http://localhost/3000/"})
          }}>
            <br />
            
            <Image
              src="/google.png"
              height={30}
              width={30}
            />
            Continue with Google
          </button>
          <button onClick={()=>{
            signIn("github",{callbackUrl:"https://localhost:3000/"})
          }}>
          <Image
            src="/github.png"
            height={40}
            width={40}
            alt="Github"
          />Continue with Github
          </button>
        </div>
      </>
    );
  }
  