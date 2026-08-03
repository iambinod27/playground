import type { Metadata } from "next";
import { Geist, DM_Sans, Titillium_Web, Roboto } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  weight: ["400", "500", "600"],
  subsets: ["latin"],
});

const titillium = Titillium_Web({
  variable: "--font-titillium",
  weight: ["400", "600", "700"],
  subsets: ["latin"],
});

const roboto = Roboto({
  variable: "--font-roboto",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Playground — Clevermike",
  description:
    "A console of small tools, each running on a different API: Pokédex, Space, Movies, Weather.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${dmSans.variable} ${titillium.variable} ${roboto.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-ink text-paper">
        <div className="console-texture" />
        <div className="relative z-10">
          <Header />
          {children}
        </div>
      </body>
    </html>
  );
}