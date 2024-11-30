import { Link } from 'react-router-dom';
import "../styles.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <a href="./" className="pagrindinis">
        TaskMate
      </a>
      <ul>
        <li>
          <Link to="/login">Prisijungti</Link>
        </li>
        <li>
          <Link to="/registration">Registruotis</Link>
        </li>
      </ul>
    </nav>
  );
}
