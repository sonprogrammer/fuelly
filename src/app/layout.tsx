import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import QueryProviderWrapper from './components/QueryProviderWrapper'
import LogoutComponent from './components/LogoutComponent'
import NavbarComponent from './components/NavbarComponent'
import HomeComponent from './components/HomeComponent'

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
        {/* TODO 위치 변경해야함 */}
        <header className="text-center p-5 flex gap-3 justify-center bg-amber-50 fixed w-full top-0 z-10">
          <Link href='/'>FUELLY</Link>
            <LogoutComponent></LogoutComponent>
            <HomeComponent />
        </header>
        <QueryProviderWrapper>
          <section className="flex-1 mt-16 mb-16 overflow-auto p-5 bg-linear-to-br from-green-50 to-blue-50">
            {children}
          </section>
        </QueryProviderWrapper>
        <nav className="fixed bottom-0 w-full bg-orange-50 ">
          <NavbarComponent />
        </nav>
      </body>
    </html>
  );
}
