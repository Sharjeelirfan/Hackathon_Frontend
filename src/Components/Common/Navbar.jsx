import React from "react";
import Link from "next/link";
import Image from "next/image";
// import logo from "@/assets/logo"

export default function Navbar() {
  return (
    <nav className="bg-green-600 text-white p-4 shadow-md flex justify-center ">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">Saylani Welfare</h1>
        {/* <Image src="@/assets/logo" /> */}
      </div>
      <div>

        <Link href="/Login">Login</Link>
      </div>
    </nav>
  );
}
