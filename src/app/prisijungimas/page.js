"use client";
import React, { useState } from "react";
import "./prisijungimas.css";
import { loginWithCredentials } from "@/actions/auth";
import { useRouter } from "next/navigation";

const PrisijungimasPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await loginWithCredentials({ email, password });
    if (response?.message) {
      if (response.message === "Prisijungiai!") {
        router.push("/");
        return;
      }
      alert(response.message);
    }
  };

  return (
    <div className="container">
      <form className="registration-form" onSubmit={handleSubmit}>
        <h1>Prisijungimas</h1>

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

        <button type="submit" className="btn">
          Prisjungti
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
};

export default PrisijungimasPage;
