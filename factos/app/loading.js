import Image from "next/image";
export default function Loading(){
    return(
        <>
            <Image 
                style={{
                    position:"absolute",
                    top:"50%",
                    left:"50%",
                    transform:"translate(-50%,-50%)"
                }} 
                src="/loading.svg" 
                alt="Your SVG" 
                height={200}
                width={200}
            />
        </>
    );
}