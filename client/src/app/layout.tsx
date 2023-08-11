import { Inter } from "next/font/google";
import type { Metadata } from "next";

import "./globals.css";

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
        {children}
      </body>
    </html>
  );
}
