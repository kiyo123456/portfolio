import type { Metadata } from "next";
import { Klee_One, Patrick_Hand, Zen_Maru_Gothic } from "next/font/google";
import "./globals.css";

// Craft Desk の3書体：display = Patrick Hand、body = Zen Maru Gothic、jphand = Klee One
const patrickHand = Patrick_Hand({
  variable: "--font-patrick-hand",
  weight: "400",
  subsets: ["latin"],
});

const zenMaru = Zen_Maru_Gothic({
  variable: "--font-zen-maru",
  weight: ["400", "700"],
  subsets: ["latin"],
  preload: false,
});

const kleeOne = Klee_One({
  variable: "--font-klee-one",
  weight: ["400", "600"],
  subsets: ["latin"],
  preload: false,
});

export const metadata: Metadata = {
  title: {
    default: "Projects | 清水康聖",
    template: "%s | 清水康聖",
  },
  description: "清水康聖のポートフォリオ。作ったものと、作りながら考えたこと。",
  openGraph: {
    title: "Projects | 清水康聖",
    description: "清水康聖のポートフォリオ。作ったものと、作りながら考えたこと。",
    type: "website",
    locale: "ja_JP",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ja" className={`${patrickHand.variable} ${zenMaru.variable} ${kleeOne.variable} antialiased`}>
      <body className="cd-mat min-h-dvh">{children}</body>
    </html>
  );
}
