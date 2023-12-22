import type { Metadata } from "next";
import "./globals.css";
import Providers from "../lib/Providers";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Taskify - Your Task Management Solution",
  description: "Task Management App by Pewds",
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
