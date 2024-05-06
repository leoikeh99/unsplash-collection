"use client";
import "./styles.css";
import Link from "next/link";
import React, { useContext } from "react";
import DialogContext from "@/context/DialogContext";
import { useSession } from "next-auth/react";
import UserPanel from "./UserPanel";
import MobileMenu from "./MobileMenu";
import NavLinks from "./NavLinks";
import { useTheme } from "next-themes";
import Logo from "../Logo";
import ThemePanel from "./ThemePanel";

const Header = () => {
  const { authDialogStore } = useContext(DialogContext);
  const { status } = useSession();

  return (
    <header>
      <div className="header-container">
        <Link href="/">
          <Logo />
        </Link>
        <div className="hidden sm:flex items-center font-semibold">
          <div className="pr-5 flex items-center">
            {status === "unauthenticated" ? (
              <button
                className="pr-3 border-r-2 border-border"
                onClick={() => authDialogStore?.show()}
              >
                Sign in
              </button>
            ) : status === "authenticated" ? (
              <div className="flex items-center pr-3 border-r-2 border-border">
                <UserPanel />
              </div>
            ) : null}
            <div>
              <ThemePanel />
            </div>
          </div>
          <NavLinks />
        </div>
        <MobileMenu />
      </div>
    </header>
  );
};

export default Header;
