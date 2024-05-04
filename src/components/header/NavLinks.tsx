import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const NavLinks = () => {
  const { status } = useSession();
  const pathName = usePathname();

  return (
    <nav>
      <ul className="grid sm:flex">
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
  );
};

export default NavLinks;
