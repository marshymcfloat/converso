import Image from "next/image";
import Link from "next/link";
import React from "react";
import Navlink from "./Navlink";

const Navbar = () => {
  return (
    <nav className="navbar shadow-2xl rounded-b-2xl bg-gradient-to-t ">
      <div className="">
        <Link href="/" className="">
          <Image
            src={"/images/logo.svg"}
            width={46}
            height={44}
            alt="Converso logo"
          />
        </Link>
      </div>

      <div className="flex gap-4 items-center justify-around">
        <Navlink />
        <p>Sign in</p>
      </div>
    </nav>
  );
};

export default Navbar;
