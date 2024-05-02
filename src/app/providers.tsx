"use client";
import { DialogProvider } from "@/context/DialogContext";
import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "@/components/ui/toaster";

const queryClient = new QueryClient();

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        {/* <ReactQueryDevtools /> */}
        <DialogProvider>
          <>
            <Toaster />
            {children}
          </>
        </DialogProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
};

export default Providers;
