import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import '@repo/ui/globals.css';

import { Providers } from '../components/providers';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: {
    default: 'Starter Kit',
    template: '%s | Starter Kit',
  },
  description: 'Next.js starter kit with Turborepo',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
