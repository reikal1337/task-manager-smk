import Link from "next/link";
import "./navbar.css";
import { auth } from "../../auth";

export default async function Navbar() {
  const session = await auth();

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
          <button>Logout</button>
        )}
      </ul>
    </nav>
  );
}
