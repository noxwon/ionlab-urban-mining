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
    default: "IONLAB AI | E-Waste 비파괴 비전 감정 & 습식 정련 최적화 딥테크 SaaS",
    template: "%s | IONLAB AI",
  },
  description:
    "연간 6,200만 톤 전자폐기물 속 숨겨진 100조 원 유가금속을 디지털 자산화하는 인더스트리얼 AI. 3초 비파괴 비전 감정부터 동적 화학 침출 레시피 자율 제어까지, E-Waste 가치사슬을 혁신합니다.",
  keywords: [
    "기후테크",
    "Climate Tech",
    "도시광산 AI",
    "Urban Mining",
    "E-Waste",
    "전자폐기물",
    "폐기판 비전 감정",
    "습식정련 AI",
    "ITAD",
    "B2B SaaS",
    "골드스크랩",
    "순환경제",
    "ESG",
    "이온랩",
    "IONLAB",
    "TIPS",
  ],
  authors: [{ name: "주식회사 이온랩 (IONLAB Inc.)" }],
  creator: "주식회사 이온랩 (IONLAB Inc.)",
  publisher: "주식회사 이온랩 (IONLAB Inc.)",
  alternates: {
    canonical: "https://landing.techplay.blog",
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://landing.techplay.blog",
    title: "IONLAB AI | E-Waste 비파괴 비전 감정 & 습식 정련 최적화 딥테크 SaaS",
    description:
      "전자폐기물 속 100조 원 유가금속을 디지털 자산화하는 인더스트리얼 AI. 비파괴 비전 스캐너와 동적 화학 침출 레시피로 순환경제 넷제로를 가속합니다.",
    siteName: "IONLAB Industrial Intelligence",
    images: [
      {
        url: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&h=630&q=85",
        width: 1200,
        height: 630,
        alt: "IONLAB AI E-Waste Industrial Intelligence Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "IONLAB AI | Urban Mining Intelligence & B2B E-Waste Deeptech",
    description:
      "3초 비파괴 비전 감정부터 동적 화학 침출 레시피 자율 제어까지. E-Waste 순환경제 딥테크 솔루션.",
    images: ["https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&h=630&q=85"],
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
      name: "IONLAB Urban Mining Intelligence Suite",
      operatingSystem: "Cloud / Edge Linux & Web",
      applicationCategory: "BusinessApplication",
      url: "https://landing.techplay.blog",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      description:
        "AI 비전 기반 비파괴 폐기판 칩셋 성분 식별 및 동적 습식정련 화학 레시피 제어 인더스트리얼 딥테크 SaaS",
    },
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "주식회사 이온랩 (IONLAB Inc.)",
      url: "https://landing.techplay.blog",
      logo: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=200&h=200&q=80",
      description: "E-Waste 유가금속 비전 감정 및 친환경 순환경제 습식정련 AI 딥테크 솔루션 기업",
      address: {
        "@type": "PostalAddress",
        addressLocality: "평택시",
        addressRegion: "경기도",
        streetAddress: "포승읍 포승향남로 119-20 (정련/선별 파일럿 테스트베드)",
        addressCountry: "KR",
      },
      sameAs: [
        "https://scan.techplay.blog",
        "https://scrap.techplay.blog",
        "https://price.techplay.blog",
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
