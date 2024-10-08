import { Inter } from "next/font/google";
import type { Metadata } from "next";

import "./globals.css";

import { Toaster } from "@/components/ui/toaster";

import LayoutProvider from "@/providers/LayoutProvider";
import QueryProvider from "@/providers/QueryProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Blood Donors",
  description: "Record management system for blood donors and their donations",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} w-screen h-screen overflow-hidden`}
        suppressHydrationWarning={true}
      >
        <QueryProvider>
          <LayoutProvider>{children}</LayoutProvider>

          <Toaster />
        </QueryProvider>
      </body>
    </html>
  );
}
