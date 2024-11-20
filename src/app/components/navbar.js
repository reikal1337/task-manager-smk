export default function Navbar(){
    return <nav className="navbar">
        <a href="./" className="pagrindinis" >TaskMate</a>
        <ul>
            <li>
                <a href="/prisijungti">Prisijungti</a>
            </li>
            <li>
                <a href="/registracija">Pradėti</a>
            </li>
        </ul>
    </nav>
}