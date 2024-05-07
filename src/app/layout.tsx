import type { Metadata } from "next";
import { Be_Vietnam_Pro } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import AuthModal from "@/components/AuthModal";
import Providers from "./providers";

const vietnam_pro = Be_Vietnam_Pro({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Home",
  description:
    "Search and discover photos on Unsplash, the internet's largest collection of photos.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={vietnam_pro.className}>
        <Providers>
          <>
            <Header />
            <main>
              <AuthModal />
              {children}
            </main>
          </>
        </Providers>
      </body>
    </html>
  );
}
