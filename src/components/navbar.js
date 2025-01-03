import Link from "next/link";
import "./navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <a href="./" className="pagrindinis">
        TaskMate
      </a>
      <ul>
        <li>
          <Link href="/prisijungimas">Prisijungti</Link>
        </li>
        <li>
          <Link href="/registracija">Registruotis</Link>
        </li>
      </ul>
    </nav>
  );
}
