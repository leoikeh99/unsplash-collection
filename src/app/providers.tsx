"use client";

import { DialogProvider } from "@/context/DialogContext";
import { SessionProvider } from "next-auth/react";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      <DialogProvider>{children}</DialogProvider>
    </SessionProvider>
  );
};

export default Providers;
