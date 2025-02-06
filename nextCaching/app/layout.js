import Header from "@/components/header";
import "./globals.css";

export const metadata = {
  title: "Next.js Caching",
  description: "Next.js Caching ",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
