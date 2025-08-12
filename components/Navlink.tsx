"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
const navLinks = [
  { label: "Home", href: "/" },
  { label: "Companions", href: "/companions" },
  { label: "My journey", href: "/my-journey" },
];

const Navlink = () => {
  const pathname = usePathname();

  console.log(pathname);

  return (
    <nav className="flex gap-4 items-center">
      {navLinks.map((link) => (
        <Link
          className={cn([
            pathname === link.href && "text-purple-400 font-semibold",
          ])}
          key={link.label}
          href={link.href}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
};

export default Navlink;
