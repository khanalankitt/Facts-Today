import Navbar from "./(components)/navbar/page";
import "../styles/style.css";

export const metadata = {
  title: "Today Facts",
  description: "Share a fact that you learned today",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true"/>
        <link href="https://fonts.googleapis.com/css2?family=Oxygen:wght@300;400;700&display=swap" rel="stylesheet"/>
      </head>
      <body className="oxygen-light">
        <div className="bodyContainer">
          <Navbar/>
          {children}
        </div>
      </body>
    </html>
  );
}