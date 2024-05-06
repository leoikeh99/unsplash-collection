"use client";
import { useTheme } from "next-themes";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const Logo = () => {
  const { resolvedTheme } = useTheme();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, [setLoaded]);

  return (
    <span>
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
    </span>
  );
};

export default Logo;
