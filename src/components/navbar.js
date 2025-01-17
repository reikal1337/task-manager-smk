import Link from "next/link";
import "./navbar.css";
import { auth } from "../../auth";
import LogoutButton from "./LogoutButton";

export default async function Navbar() {
  const session = await auth();
  console.log("Sesija: ", session);
  return (
    <nav className="navbar">
      <a href="./" className="pagrindinis">
        TaskMate
      </a>
      <ul>
        {!session?.user ? (
          <>
            <li>
              <Link href="/prisijungimas">Prisijungti</Link>
            </li>
            <li>
              <Link href="/registracija">Registruotis</Link>
            </li>
          </>
        ) : (
          <LogoutButton />
        )}
      </ul>
    </nav>
  );
}
