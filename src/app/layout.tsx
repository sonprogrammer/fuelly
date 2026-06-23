import type { Metadata, Viewport } from "next";
import "./globals.css";
import QueryProviderWrapper from './components/QueryProviderWrapper'
import LogoutComponent from './components/LogoutComponent'
import NavbarComponent from './components/NavbarComponent'
import HomeComponent from './components/HomeComponent'
import { Toaster } from 'react-hot-toast'



export const metadata: Metadata = {
  title: "Fuelly - 스마트한 식단 관리",
  description: "나에게 딱 맞는 영양 목표와 식단을 추천받으세요.",
  icons: {
    icon: '/favicon_fuelly.png',
    apple: '/fuelly_192.png'
  },
  openGraph: {
    title: 'Fuelly - 스마트한 식단 관리',
    description: '당신의 건강한 식습관, Fuelly가 함께합니다',
    url: 'https://fuelly.onrender.com',
    siteName: 'Fuelly',
    images: [
      {
        url: 'https://res.cloudinary.com/dqrsksfho/image/upload/v1766412013/ax2jb6d2zkn6ybvz3fnd.png',
        width: 1200,
        height: 630,
        alt: 'Fuelly - AI 식단 관리 서비스 소개'
      }
    ],
    locale: 'ko_KR',
    type: 'website',
  },
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Fuelly'
  }
}
export const viewport: Viewport = {
  themeColor: "#10b981",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body className="h-screen flex flex-col w-full bg-gray-950">
        <header className="flex-none px-5 py-4 flex items-center justify-center bg-gray-900 border-b border-gray-800 relative">
          <HomeComponent />
          <div className='absolute right-5'>
            <LogoutComponent />
          </div>
        </header>

        <main className='flex-1 overflow-y-auto'>
          <QueryProviderWrapper>
            {children}
          </QueryProviderWrapper>
        </main>

        <Toaster position="top-center" reverseOrder={false} />


        <NavbarComponent />

      </body>
    </html>
  );
}
