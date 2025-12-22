import type { Metadata } from "next";
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
    icon: '/favicon_fuelly.png'
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
    type:'website',
  }
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
