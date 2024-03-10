"use client"
import Navbar from "./(components)/navbar/page";
import "../styles/style.css";
import { SessionProvider } from "next-auth/react";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true"/>
        <link href="https://fonts.googleapis.com/css2?family=Oxygen:wght@300;400;700&display=swap" rel="stylesheet"/>
        <link rel="icon" type="image/x-icon" href="./favicon.ico"/>
      </head>
      <body className="oxygen-light">
        <div className="bodyContainer">
          <SessionProvider>
            <Navbar/>
            {children}
          </SessionProvider>
        </div>
      </body>
    </html>
  );
}