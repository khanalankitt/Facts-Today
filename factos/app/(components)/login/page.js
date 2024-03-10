"use client"
import Image from "next/image";
import Link from "next/link";
import { signIn } from "next-auth/react"
export default function Login() {
    return (
      <>
        <div className="login-container loginsignup">
          <h1>Login</h1>
          <form>
            <input type="email" placeholder="Email"/>
            <input type="password" placeholder="Password" />
            <input type="submit" className="submit" value="Login" />
            <p>Don't have an account? <Link href="/signup">Signup</Link></p>
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
            />
            Continue with Google
          </button>
        </div>
      </>
    );
  }
  