// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { Inter, Source_Serif_4 } from "next/font/google";
import { Providers } from "./provider"; 

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const sourceSerif4 = Source_Serif_4({
  variable: "--font-source-serif-4",
  subsets: ["latin"],
  weight: ["200", "400", "600", "700", "900"],
  display: "swap",
});

  export const metadata: Metadata = {
  title: "SonicScribe AI",
  description: "Intelligence that Listens. Precision that Heals.",
  authors: [{ name: "Aryan Raj", url: "https://github.com/Aryan3572" }],
  creator: "Aryan Raj",
  publisher: "Aryan Raj",
  metadataBase: new URL("https://sonicscribe-aryan.vercel.app"),
  openGraph: {
    title: "SonicScribe AI",
    description: "Intelligence that Listens. Precision that Heals.",
    url: "https://sonicscribe-aryan.vercel.app",
    siteName: "SonicScribe AI",
    type: "website",
  },
  keywords: [
    "SonicScribe",
    "Medical AI",
    "Audio Intelligence",
    "Healthcare AI",
    "Aryan Raj",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${sourceSerif4.variable}`}>
      <body className="antialiased bg-background text-foreground">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
