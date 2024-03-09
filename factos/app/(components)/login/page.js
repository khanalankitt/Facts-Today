import Image from "next/image";
import Link from "next/link";

export default function Login() {
    return (
      <>
        <div className="login-container">
          <h1>Login</h1>
          <form>
            <input type="email" placeholder="Email"/>
            <input type="password" placeholder="Password" />
            <input type="submit" className="submit" value="Login" />
            <p>Don't have an account? <Link href="/signup">Signup</Link></p>
            <hr />
            <p className="por">or</p>
          </form>
          <button>
            <Image
              src="/google.png"
              height={30}
              width={30}
            />
            Login with Google
          </button>
        </div>
      </>
    );
  }
  