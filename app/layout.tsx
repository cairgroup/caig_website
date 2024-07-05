import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/hero_page/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cambridge AI Reading Group",
  description: "Weekly dinners to discuss the newest AI research and open source projects!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="flex min-h-screen w-screen flex-col items-start justify-center overflow-hidden bg-background text-black">
          <div className="w-[300px] sm:w-[600px] md:w-[700px] lg:w-[900px] xl:w-[1200px] self-center">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
