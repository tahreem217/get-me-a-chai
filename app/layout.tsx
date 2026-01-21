import type { Metadata } from "next";
import { Inter } from "next/font/google";
import  "./globals.css";
import Navbar from"@/components/Navbar";
import Footer from "@/components/Footer";
import SessionWrapper from "@/components/sessionWrapper";
 

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Get me a chai",
  description: "A website for funding projects",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-950 text-white`}>
        <SessionWrapper>
          <Navbar />
           
          <div className="relative min-h-screen w-full">
            
            <div className="absolute pb-64 md:p-[30px]  inset-0 -z-10 h-full w-full bg-slate-950 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]"></div>
            
            
            <div className=" ">
              {children}
            </div>
          </div>
          <Footer />
        </SessionWrapper>
      </body>
    </html>
  );
}