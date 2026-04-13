import type { Metadata } from "next";
import { Titillium_Web } from "next/font/google";
import { Navbar } from "@/components/layout";
import { Footer } from "@/components/layout";
import "./globals.css";

const titillium = Titillium_Web({
  variable: "--font-titillium",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
});

export const metadata: Metadata = {
  title: "Online Dangerous Goods Training & Certification | DG-online",
  description:
    "Online dangerous goods training and certification for professionals involved in air cargo, logistics, and regulated shipments, fully aligned with IATA Dangerous Goods Regulations (DGR) and ICAO Technical Instructions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${titillium.variable} antialiased`}>
      <body className="min-h-screen flex flex-col font-sans">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
