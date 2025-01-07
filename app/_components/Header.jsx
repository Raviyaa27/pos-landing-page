"use client";

import { Button } from "../../components/ui/button";
//import { LoginLink, RegisterLink } from '@kinde-oss/kinde-auth-nextjs'
import Image from "next/image";
import React from "react";
import Link from "next/link";

function Header() {
  return (
    <div>
      <div
        className="flex items-center justify-between
        p-1 shadow-sm 
        "
      >
        <Image
          src="/logo.svg"
          width={100}
          height={100}
          alt="logo"
          className="w-[150px] md:w-[200px]"
        />
        <ul className="hidden md:flex gap-14 font-medium text-lg">
          <li className="hover:text-primary transition-all duration-300 cursor-pointer">
            Product
          </li>
          <li className="hover:text-primary transition-all duration-300 cursor-pointer">
            Pricing
          </li>
          <li className="hover:text-primary transition-all duration-300 cursor-pointer">
            Contact us
          </li>
          <li className="hover:text-primary transition-all duration-300 cursor-pointer">
            About Us
          </li>
        </ul>
        <div className="flex gap-5 pr-5">
          <Link href="/auth/login" passHref>
            <Button variant="ghost">Login</Button>
          </Link>
          <Link href="/auth/signup" passHref>
            <Button>Get Started</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Header;


