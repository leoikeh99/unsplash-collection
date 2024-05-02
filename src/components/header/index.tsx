"use client";
import "./styles.css";
import Image from "next/image";
import Link from "next/link";
import React, { useContext } from "react";
import DialogContext from "@/context/DialogContext";
import { useSession } from "next-auth/react";
import UserPanel from "./UserPanel";
import MobileMenu from "./MobileMenu";
import NavLinks from "./NavLinks";

const Header = () => {
  const { authDialogStore } = useContext(DialogContext);
  const { status } = useSession();

  return (
    <header>
      <div className="header-container">
        <Link href="/">
          <Image
            src="/assets/Logo.svg"
            alt="logo"
            width={118}
            height={24}
            priority
          />
        </Link>
        <div className="hidden sm:flex items-center gap-7 text-[#6C727F] font-semibold">
          <div className="pr-7 border-r-2 border-slate-300 flex items-center">
            {status === "unauthenticated" ? (
              <button onClick={() => authDialogStore?.show()}>Sign in</button>
            ) : status === "authenticated" ? (
              <UserPanel />
            ) : null}
          </div>
          <NavLinks />
        </div>
        <MobileMenu />
      </div>
    </header>
  );
};

export default Header;
