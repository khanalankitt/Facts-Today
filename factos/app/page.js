import Image from "next/image";
import Link from "next/link";
export default function Home() {
  return (
    <>
      <div className="home-container">
        <Image 
          src="/download.jpg"
          height={1920}
          width={1080}
          alt="Landing"
          quality={100}
          className="homeimage"
          />
          <h1>Facts Today</h1>
          <h3>Share a fact that you learned today</h3>
          <Link href="/facts">
            <button>Start sharing </button>
          </Link>
      </div>
    </>
  );
}
