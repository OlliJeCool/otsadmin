"use client";

import Image from "next/image";
import Menu from "./components/Menu";
import { useAuth0 } from "@auth0/auth0-react";

export default function Home() {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  return (
    <div className="w-full bg-red-100">
      {!isAuthenticated ? (
        <button onClick={() => loginWithRedirect()}>login</button>
      ) : (
        <button onClick={() => logout()}>logout</button>
      )}
    </div>
  );
}
