"use client";
import "./styles.css";
import Image from "next/image";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import DialogContext from "@/context/DialogContext";
import { useSession } from "next-auth/react";
import UserPanel from "./UserPanel";
import MobileMenu from "./MobileMenu";
import NavLinks from "./NavLinks";
import { useTheme } from "next-themes";

const Header = () => {
  const { authDialogStore } = useContext(DialogContext);
  const { status } = useSession();
  const { resolvedTheme } = useTheme();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, [setLoaded]);

  return (
    <header>
      <div className="header-container">
        <Link href="/">
          {loaded && (
            <>
              {resolvedTheme === "dark" ? (
                <Image
                  src="/assets/logo-dark.svg"
                  alt="logo"
                  width={118}
                  height={24}
                  priority
                />
              ) : (
                <Image
                  src="/assets/Logo.svg"
                  alt="logo"
                  width={118}
                  height={24}
                  priority
                />
              )}
            </>
          )}
        </Link>
        <div className="hidden sm:flex items-center gap-7 font-semibold">
          <div className="pr-7 border-r-2 border-border flex items-center">
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
