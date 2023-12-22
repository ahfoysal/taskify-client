import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import Providers from "../lib/Providers";
import { Toaster } from "react-hot-toast";
import MainLayout from "@/components/layout/RootLayout";
import Script from "next/script";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <html lang="en">
        <body
          suppressHydrationWarning={true}
          className="text-black min-h-screen overflow-x-hidden  "
        >
          <Toaster position="bottom-left" />

          {/* <NextNProgress
            color="#D34936"
            startPosition={0.3}
            stopDelayMs={200}
            height={3}
            showOnShallow={true}
          /> */}

          {children}
        </body>
      </html>
    </Providers>
  );
}
