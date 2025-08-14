import { Geist, Geist_Mono } from "next/font/google";

import "@workspace/ui/globals.css";
import { Providers } from "@/components/providers";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { SyncIndicator } from "@/components/sync-indicator";
import { SyncDebugger } from "@/components/sync-debugger";
import { SyncStatus } from "@/components/sync-status";

const fontSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

// Note: For server-side cart data, you can use:
// import { getServerCartItemCount } from '@/lib/server-cookies';
// const cartItemCount = getServerCartItemCount();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${fontSans.variable} ${fontMono.variable} font-sans antialiased `}
      >
        <Providers>
          <Header />
          <main className="min-h-screen bg-gray-50">{children}</main>
          <Footer />
          <SyncIndicator />
          <SyncDebugger />
          <SyncStatus />
        </Providers>
      </body>
    </html>
  );
}
