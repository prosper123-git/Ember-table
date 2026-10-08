import type { Metadata } from "next";
import { Bricolage_Grotesque, Source_Serif_4 } from "next/font/google";
import "./globals.css";

const display = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-display" });
const body = Source_Serif_4({ subsets: ["latin"], variable: "--font-body" });

export const metadata: Metadata = {
  title: "Ember Table | West African wood-fire kitchen",
  description: "Suya, jollof and slow pots cooked over open fire. Book a table or browse the menu.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>{children}</body>
    </html>
  );
}
