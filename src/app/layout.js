import Navbar from "./components/navbar";
import "./globals.css";

export const metadata = {
  title: "TaskMate",
  description: "Better task managment for you!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
