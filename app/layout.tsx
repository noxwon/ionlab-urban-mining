import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#020617",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://landing.techplay.blog"),
  title: {
    default: "IONLAB URBAN MINING AI | 폐기판 순금·귀금속 비전 AI 감정 & 최고가 매입",
    template: "%s | IONLAB URBAN MINING AI",
  },
  description:
    "고철값 3,000원에 버리던 폐기판, AI 비전 스캐너로 3초 만에 숨겨진 순금·은·팔라듐 가치를 확인하세요. KRX 실시간 귀금속 시세 기준 정밀 감정 및 당일 100% 최고가 폐PCB 전량 매입.",
  keywords: [
    "도시광산",
    "폐PCB 매입",
    "골드스크랩",
    "폐기판",
    "금추출",
    "이온랩",
    "IONLAB",
    "AETHER MINING",
    "에더마이닝",
    "KRX금시세",
    "팔라듐",
    "MLCC",
    "RAM골드핑거",
    "서버CPU매입",
    "비전AI",
    "전자스크랩",
  ],
  authors: [{ name: "주식회사 이온랩 (IONLAB)" }, { name: "AETHER MINING" }],
  creator: "주식회사 이온랩 (IONLAB)",
  publisher: "주식회사 이온랩 (IONLAB)",
  alternates: {
    canonical: "https://landing.techplay.blog",
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://landing.techplay.blog",
    title: "IONLAB URBAN MINING AI | 폐기판 순금·귀금속 비전 AI 감정 & 최고가 매입",
    description:
      "스마트폰 사진 한 장으로 3초 만에 폐기판 속 순금·은·팔라듐 가치 확인! 당일 100% 현장 즉시 정산 및 전국 수거 대응.",
    siteName: "IONLAB Urban Mining",
    images: [
      {
        url: "https://images.unsplash.com/photo-1562976540-1502c2145186?w=1200&h=630&q=85",
        width: 1200,
        height: 630,
        alt: "IONLAB 도시광산 AI 폐기판 비전 감정 플랫폼",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "IONLAB URBAN MINING AI | 폐기판 순금·귀금속 비전 AI 감정",
    description:
      "사진 1장으로 3초 만에 확인하는 폐기판 순금 가치 및 특허 습식 정련 솔루션. 당일 최고 시세 매입.",
    images: ["https://images.unsplash.com/photo-1562976540-1502c2145186?w=1200&h=630&q=85"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Schema.org Structured Data
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "IONLAB Urban Mining Vision AI",
      operatingSystem: "Web Browser",
      applicationCategory: "BusinessApplication",
      url: "https://landing.techplay.blog",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "KRW",
      },
      description: "AI 비전 기반 폐기판(PCB) 칩셋 식별 및 실시간 KRX 시세 귀금속 가치 평가 솔루션",
    },
    {
      "@context": "https://schema.org",
      "@type": "RecyclingCenter",
      name: "AETHER MINING x IONLAB 도시광산",
      telephone: ["+82-10-8216-9314", "+82-10-5798-0188"],
      url: "https://scrap.techplay.blog",
      description: "폐PCB, 골드스크랩, 통신장비 스크랩 당일 최고가 현금 매입 및 친환경 자원순환",
      areaServed: "KR",
      priceRange: "$$$",
    },
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "주식회사 이온랩 (IONLAB Co., Ltd.)",
      url: "https://landing.techplay.blog",
      logo: "https://images.unsplash.com/photo-1562976540-1502c2145186?w=200&h=200&q=80",
      sameAs: [
        "https://scan.techplay.blog",
        "https://scrap.techplay.blog",
        "https://price.techplay.blog",
        "https://www.youtube.com/@골드스크랩",
      ],
    },
  ];

  return (
    <html lang="ko" className="dark scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased min-h-screen bg-slate-950 text-slate-100 font-sans">
        {children}
      </body>
    </html>
  );
}
