import type { ReactNode } from 'react';

import type { Metadata } from 'next';
import localFont from 'next/font/local';

import { ThemeProvider } from 'next-themes';

import '@/app/globals.css';

const geistSans = localFont({
    src: './fonts/GeistVF.woff',
    variable: '--font-geist-sans',
    weight: '100 900'
});
const geistMono = localFont({
    src: './fonts/GeistMonoVF.woff',
    variable: '--font-geist-mono',
    weight: '100 900'
});

export const metadata: Metadata = {
    title: 'Next.js Tailwind Template',
    description: 'A modern Next.js template with Tailwind CSS'
};

const Layout = ({ children }: Readonly<{ children: ReactNode }>) => {
    return (
       
        <html suppressHydrationWarning lang='en'>
            <body className={`${geistSans.variable} ${geistMono.variable} bg-background text-foreground antialiased`}>
                <ThemeProvider attribute='class'>{children}</ThemeProvider>
            </body>
        </html>
    );
};

export default Layout;
