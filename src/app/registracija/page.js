"use client";
import { useState } from "react";
import "./registration.css";
import { registerWithCredentials } from "@/actions/auth";
import { useRouter } from "next/navigation";

export default function RegistrationPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Slaptazodziai turi sutapti!");
      return;
    }
    const response = await registerWithCredentials({ email, password });
    if (response?.message) {
      if (response.message === "Prisiregistarvai!") {
        router.push("/prisijungimas");
        return;
      }
      alert(response.message);
    }
  };

  return (
    <div className="container">
      <form className="registration-form" onSubmit={handleSubmit}>
        <h1>Registracija</h1>

        <label htmlFor="email">El. Paštas</label>
        <input
          type="text"
          id="email"
          placeholder="Įveskite el. paštą"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="password">Slaptažodis</label>
        <input
          type="password"
          id="password"
          placeholder="Įveskite slaptažodį"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <label htmlFor="confirm-password">Pakartokite Slaptažodį</label>
        <input
          type="password"
          id="confirm-password"
          placeholder="Pakartokite slaptažodį"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <button type="submit" className="btn">
          Registruotis
        </button>

        <h2>Arba</h2>

        <button type="button" className="socialbtn google">
          Prisijunkite su Google
        </button>
        <button type="button" className="socialbtn facebook">
          Prisijunkite su Facebook
        </button>
      </form>
    </div>
  );
}
