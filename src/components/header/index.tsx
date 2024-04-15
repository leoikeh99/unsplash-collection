"use client";
import "./styles.css";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import React, { useContext } from "react";
import DialogContext from "@/context/DialogContext";

const Header = () => {
  const pathName = usePathname();
  const { authDialogStore } = useContext(DialogContext);

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
        <div className="flex gap-7 text-[#6C727F] font-semibold">
          <div className="pr-7 border-r-2 border-slate-300">
            <button onClick={() => authDialogStore?.show()}>Sign in</button>
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
