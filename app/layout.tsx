import type { Metadata } from "next";
import { Fraunces, Noto_Serif_JP } from "next/font/google";
import "./globals.css";

const notoSerifJP = Noto_Serif_JP({
  variable: "--font-noto-serif-jp",
  weight: ["400", "600"],
  subsets: ["latin"],
  preload: false,
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
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
    <html lang="ja" className={`${notoSerifJP.variable} ${fraunces.variable} antialiased`}>
      <body className="min-h-dvh">
        <div className="mx-auto w-full max-w-3xl px-4 py-12 sm:px-6 sm:py-20">{children}</div>
      </body>
    </html>
  );
}
