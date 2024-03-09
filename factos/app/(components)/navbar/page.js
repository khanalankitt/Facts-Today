import Image from "next/image";
import Link from "next/link";
export default function Navbar(){
    return (
        <>
            <nav>
                <div className="container">
                    <div className="heading">
                        <h2>Facts Today</h2>
                    </div>
                    <div className="links">
                        <ul>
                            <Link className="link" href="/">
                                <li>Home</li>
                            </Link>
                            <Link className="link" href="/login">
                                <li>Login</li>
                            </Link>
                            <Link className="link" href="/signup">
                                <li>Signup</li>
                            </Link>
                        </ul>
                        <div className="user">
                            <Image 
                                src="/person.png" 
                                alt="User Image"
                                height={40}
                                width={40}
                            />
                            <p>Hello Name</p>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
}
