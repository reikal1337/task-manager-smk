"use client";
import { logout } from "@/actions/auth";
import { useRouter } from "next/navigation";
import React from "react";

function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  return <button onClick={handleLogout}>Atsijungti</button>;
}

export default LogoutButton;
