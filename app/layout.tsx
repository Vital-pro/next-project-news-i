import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Солнечные новости',
  description: 'Actual news Crimea from city Sudak',
};

let date = new Date();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ru'>
      <body className={inter.className}>
        <Header />
        <main className='main container'>
          <div className='geolocation-wrapper'>
            <h1>Крым г.Судак</h1>
            <time dateTime={date.toLocaleString('ru-RU')}>
              Сегодня:{' '}
              {date.toLocaleString('ru-RU', { month: 'long', day: 'numeric' })}{' '}
              {date.getFullYear()} г.
            </time>
            {/* <Link href={'/api'}>Получить свежие вести</Link> */}
          </div>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
