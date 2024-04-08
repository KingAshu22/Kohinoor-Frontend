import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";

import "../globals.css";
import Navbar from "@/components/Navbar";
import ToasterProvider from "@/lib/providers/ToasterProvider";
import BottomNav from "@/components/BottomNav";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kohinoor Flags & Batches",
  description: "Kohinoor Flags & Batches",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClerkProvider>
          <ToasterProvider />
          <div className="desktop-header">
            <Navbar />
          </div>
          <div className="mobile-bottom-nav">
            <BottomNav />
          </div>
          {children}
          <Footer />
        </ClerkProvider>
      </body>
    </html>
  );
}
