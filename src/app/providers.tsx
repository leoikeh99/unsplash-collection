"use client";
import { DialogProvider } from "@/context/DialogContext";
import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <DialogProvider>{children}</DialogProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
};

export default Providers;
