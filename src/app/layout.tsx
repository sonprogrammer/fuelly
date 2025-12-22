import type { Metadata } from "next";
import "./globals.css";
import QueryProviderWrapper from './components/QueryProviderWrapper'
import LogoutComponent from './components/LogoutComponent'
import NavbarComponent from './components/NavbarComponent'
import HomeComponent from './components/HomeComponent'
import { Toaster } from 'react-hot-toast'



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
        className="h-screen flex flex-col w-full"
      >
        <header className="p-5 flex gap-3 justify-center bg-amber-50 fixed w-full top-0 z-10">
              <HomeComponent />
            <div className='absolute right-5 top-5'>
              <LogoutComponent />
            </div>
        </header>
        <QueryProviderWrapper>
        <Toaster position="top-center" reverseOrder={false} />

          {children}
        </QueryProviderWrapper>
        <nav className="fixed bottom-0 w-full bg-orange-50 z-50">
          <NavbarComponent />
        </nav>
      </body>
    </html>
  );
}
