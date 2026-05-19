import type { Metadata } from "next";
import { DM_Sans, Playfair_Display } from "next/font/google";
import "@/app/globals.css";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";

const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans", display: "swap" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair", display: "swap" });

export const metadata: Metadata = {
  title: "Hanchinmani School | Shaping the Architects of Tomorrow",
  description: "Smt. Vidya P Hanchinmani International School, Dharwad - CBSE education with future-ready learning.",
  metadataBase: new URL("https://hanchinmanicbseschool.com")
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${dmSans.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased">
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
