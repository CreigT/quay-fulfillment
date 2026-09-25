import "./globals.css";
import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { config } from "@/lib/config";

export const metadata: Metadata = {
  title: `${config.company} — delivery locker`,
  description: config.tagline,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main className="wrap">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
