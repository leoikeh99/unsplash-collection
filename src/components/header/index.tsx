"use client";
import "./styles.css";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Header = () => {
  const pathName = usePathname();

  return (
    <header>
      <div className="header-container">
        <Link href="/">
          <Image src="/assets/Logo.svg" alt="logo" width={118} height={24} />
        </Link>
        <nav>
          <ul className="flex gap-3">
            <li>
              <Link href="/" className="link" data-active={pathName === "/"}>
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
    </header>
  );
};

export default Header;
