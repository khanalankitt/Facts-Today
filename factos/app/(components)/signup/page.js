"use client"
import Link from "next/link";
import Image from "next/image";
import { signIn } from "next-auth/react";
export default function Signup() {
    return (
      <>
        <div className="signup-container loginsignup">
          <h1>Signup</h1>
          <form>
            <input type="email" placeholder="Email"/>
            <input type="password" placeholder="Password" />
            <input type="submit" className="submit" value="Signup" />
            <p>Already have an account? <Link href="/login">Login</Link></p>
            <hr />
            <p className="por">or</p>
          </form>
          <button onClick={()=>{
                signIn('google',{callbackUrl:"http://localhost/3000/"})
          }}>
            <Image
              src="/google.png"
              height={30}
              width={30}
              alt="Google"
            />
            Continue with Google
          </button>
        </div>
      </>
    );
  }
  