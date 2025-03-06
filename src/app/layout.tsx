import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import CustomCursor from "@/components/custom-cursor";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Western font
const western = localFont({
  src: "../fonts/Texaz.ttf",
  variable: "--font-western",
  display: "swap",
});

// Uncomment when you have the pixel font file
// const pixel = localFont({
//   src: "../fonts/pixel.ttf",
//   variable: "--font-pixel",
// });

export const metadata: Metadata = {
  title: "Thanakrit Pongtanawannagon | Portfolio",
  description: "Data Science student and Back-end Developer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${western.variable} antialiased`}
      >
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
