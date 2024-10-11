import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

import {Montserrat} from "next/font/google"
import NavBar from "./components/nav/NavBar";
import Footer from "./components/footer/Footer";

const montserrat = Montserrat({
  subsets: ['latin', 'cyrillic-ext'],
  weight: ['400', '700']

})

// const montserrat

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Comic Lair",
  description: "Internet Comic Book Store",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        // className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        className={`${montserrat.className} 700`}
      >
        <div className="flex flex-col min-h-screen">
          <NavBar></NavBar>
          <main className="flex-grow">{children}</main>
          <Footer></Footer>
        </div>
      </body>
    </html>
  );
}
