"use client"
import Image from "next/image";
import { signIn } from "next-auth/react"
import Link from "next/link";
export default function Login() {
    return (
      <>
        <div className="login-container loginsignup">
          <h2><Link href="/" style={{
            textDecoration:"none",
            color:"white"
          }}>
          {`←`}
              </Link>  &nbsp; Login to get started</h2>
          <hr />
          <button onClick={()=>{
                signIn('google',{callbackUrl:"https://factos.vercel.app/facts"})
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
            signIn("github",{callbackUrl:"https://factos.vercel.app/facts"})
          }}>
          <Image
            src="/github.png"
            height={35}
            width={33}
            alt="Github"
          />Continue with Github
          </button>
        </div>
      </>
    );
  }
  