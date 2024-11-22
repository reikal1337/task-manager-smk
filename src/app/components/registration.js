import "../registration.css";

export default function Registration() {
    return (
        <div className="container">
            <form className="registration-form">
                <h1>Registracija</h1>
                
                <label htmlFor="email">El. Paštas</label>
                <input type="text" id="email" placeholder="Įveskite el. paštą" />
                
                <label htmlFor="password">Slaptažodis</label>
                <input type="password" id="password" placeholder="Įveskite slaptažodį" />
                
                <label htmlFor="confirm-password">Pakartokite Slaptažodį</label>
                <input type="password" id="confirm-password" placeholder="Pakartokite slaptažodį" />
                
                <button type="submit" className="btn">Registruotis</button>
                
                <h2>Arba</h2>
                
                <button type="button" className="socialbtn google">Prisijunkite su Google</button>
                <button type="button" className="socialbtn facebook">Prisijunkite su Facebook</button>
            </form>
        </div>
    );
}
