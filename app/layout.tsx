import type { Metadata } from "next";
import { DM_Sans, Playfair_Display } from "next/font/google";
import "@/app/globals.css";
import { VidyaAssistant } from "@/components/assistant/VidyaAssistant";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { SCHOOL_INFO } from "@/lib/schoolInfo";

const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans", display: "swap" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair", display: "swap" });

export const metadata: Metadata = {
  title: `${SCHOOL_INFO.name} | Shaping the Architects of Tomorrow`,
  description: `${SCHOOL_INFO.name} - ${SCHOOL_INFO.tagline}. Located at ${SCHOOL_INFO.address.display}.`,
  metadataBase: new URL(SCHOOL_INFO.website),
  icons: {
    icon: [{ url: "/favicon.ico" }],
    apple: "/apple-touch-icon.png"
  },
  openGraph: {
    title: SCHOOL_INFO.name,
    description: `${SCHOOL_INFO.tagline}. Located at ${SCHOOL_INFO.address.display}.`,
    images: [{ url: "/og-image.png", width: 1200, height: 630 }]
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${dmSans.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased">
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
        <VidyaAssistant />
      </body>
    </html>
  );
}
