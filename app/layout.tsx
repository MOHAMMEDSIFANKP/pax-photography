import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "PAX Photography | Wedding & Cinematic Studio",
  description:
    "PAX Photography is a creative photography & videography studio specializing in weddings, couple shoots, modeling portfolios, and cinematic storytelling based in Kerala, India.",

  keywords: [
    "PAX Photography",
    "pax__photography",
    "wedding photography Kerala",
    "cinematic wedding videography",
    "Malappuram photographer",
    "couple photoshoot Kerala",
    "modeling portfolio photography",
    "best wedding photographer Kerala",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${cormorant.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
      </body>
    </html>
  );
}