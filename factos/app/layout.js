import Navbar from "@/components/navbar/navbar";
import "../styles/style.css";

export const metadata = {
  title: "Today Facts",
  description: "Share a fact that you learned today",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar/>
        {children}
      </body>
    </html>
  );
}