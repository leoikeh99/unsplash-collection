"use client";
import "./styles.css";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import React, { useContext } from "react";
import DialogContext from "@/context/DialogContext";
import { useSession } from "next-auth/react";
import UserPanel from "./UserPanel";

const Header = () => {
  const pathName = usePathname();
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
        <div className="flex items-center gap-7 text-[#6C727F] font-semibold">
          <div className="pr-7 border-r-2 border-slate-300">
            {status === "unauthenticated" ? (
              <button onClick={() => authDialogStore?.show()}>Sign in</button>
            ) : status === "authenticated" ? (
              <UserPanel />
            ) : null}
          </div>
          <nav>
            <ul className="flex">
              <li>
                <Link
                  href="/"
                  className="link"
                  data-active={pathName === "/" || pathName === "/search"}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/collections"
                  className="link"
                  data-active={pathName === "/collections"}
                >
                  Collections
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
