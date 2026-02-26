import type {Metadata} from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
});

export const metadata: Metadata = {
  title: 'The Private Estate | Susanne Horner',
  description: 'An exclusive, editorial landing page for a private estate listing by Susanne Horner of Engel & Völkers.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body suppressHydrationWarning className="bg-[#F5F5F5] text-[#1A1A1A] antialiased">
        {children}
      </body>
    </html>
  );
}
