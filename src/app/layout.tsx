import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Fuelly",
  description: "Make your body",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        // className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        className="h-screen flex flex-col w-full"
      >
        <header className="text-center p-5 bg-amber-50"><Link href='/'>FUELLY</Link></header>
        <section className="flex-1 bg-blue-50">

        {children}
        </section>
        <nav className="p-5 bg-orange-50 text-center">go here</nav>
      </body>
    </html>
  );
}
