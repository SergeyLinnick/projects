import Header from "@/components/header";
import "./globals.css";

export const metadata = {
  title: "NextPosts",
  description: "Browse our posts.",
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
