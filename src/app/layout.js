import { auth } from "../../auth";
import Navbar from "../components/navbar";
import "./globals.css";
import { SessionProvider } from "next-auth/react";

export const metadata = {
  title: "TaskMate",
  description: "Better task managment for you!",
};

export default async function RootLayout({ children }) {
  const session = await auth();
  return (
    <html lang="en">
      <SessionProvider session={session}>
        <body>
          <Navbar />
          {children}
        </body>
      </SessionProvider>
    </html>
  );
}
