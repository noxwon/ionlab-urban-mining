import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "IONLAB URBAN MINING AI | 폐기판 순금·귀금속 비전 AI 감정 플랫폼",
  description:
    "고철값 3,000원에 버리던 폐기판, AI 비전 스캐너로 3초 만에 숨겨진 순금·은·팔라듐 가치를 확인하고 특허 습식 정련 레시피를 받아보세요.",
  keywords: ["도시광산", "폐기판", "PCB", "금추출", "귀금속", "이온랩", "비전AI", "KRX금시세"],
  openGraph: {
    title: "IONLAB URBAN MINING AI - 폐기판 귀금속 가치 산정",
    description: "사진 1장으로 3초 만에 확인하는 폐기판 순금 가치 및 정련 솔루션",
    url: "https://scan.techplay.blog",
    siteName: "IONLAB Urban Mining",
    locale: "ko_KR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="dark scroll-smooth">
      <body className="antialiased min-h-screen bg-slate-950 text-slate-100">
        {children}
      </body>
    </html>
  );
}
