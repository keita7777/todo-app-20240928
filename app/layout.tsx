import type { Metadata } from "next";
import "./globals.css";
import { Noto_Sans_JP } from "next/font/google";
import Header from "@/components/header/Header";

export const metadata: Metadata = {
  title: "TODO APP",
  description: "TODOを作成できます",
};

const noto = Noto_Sans_JP({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-noto-sans-jp",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${noto.className}`}>
        <Header />
        <main className="max-w-2xl mx-auto my-4">{children}</main>
      </body>
    </html>
  );
}
