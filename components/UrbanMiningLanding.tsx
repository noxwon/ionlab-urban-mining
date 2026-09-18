"use client";

import React, { useState, useRef } from "react";
import { 
  Camera, Upload, Cpu, Sparkles, TrendingUp, ShieldCheck, 
  ArrowRight, FileText, CheckCircle2, FlaskConical, Scale, RefreshCw,
  ExternalLink, AlertTriangle, Phone, HelpCircle, Flame, DollarSign,
  ChevronRight, Truck, Check
} from "lucide-react";

function YoutubeIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  );
}

// 샘플 스크랩 데이터 정의
const PRESETS = [
  {
    id: "server-ram",
    name: "서버용 DDR4 ECC RAM",
    weightDefault: 1, // kg
    goldRate: 1.45, // g/kg
    silverRate: 4.80,
    palladiumRate: 0.12,
    img: "https://images.unsplash.com/photo-1562976540-1502c2145186?w=800&q=80",
    tags: [
      { label: "Gold Fingers (99.9% Au)", top: "78%", left: "15%", width: "70%", height: "15%" },
      { label: "DRAM Chip (Au Wire)", top: "35%", left: "20%", width: "25%", height: "30%" },
      { label: "PMIC Controller", top: "35%", left: "60%", width: "20%", height: "25%" },
    ]
  },
  {
    id: "smartphone-pcb",
    name: "스마트폰 메인보드",
    weightDefault: 1,
    goldRate: 3.20,
    silverRate: 8.50,
    palladiumRate: 0.35,
    img: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=800&q=80",
    tags: [
      { label: "AP/NAND Multi-Chip (Au)", top: "25%", left: "30%", width: "35%", height: "35%" },
      { label: "MLCC Capacitor (Pd/Ag)", top: "68%", left: "25%", width: "18%", height: "18%" },
      { label: "RF Module (Au Plated)", top: "30%", left: "70%", width: "20%", height: "25%" },
    ]
  },
  {
    id: "pc-motherboard",
    name: "PC 데스크탑 메인보드",
    weightDefault: 1,
    goldRate: 0.55,
    silverRate: 2.10,
    palladiumRate: 0.05,
    img: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
    tags: [
      { label: "CPU Socket Pins (Au)", top: "25%", left: "35%", width: "30%", height: "30%" },
      { label: "PCIe Gold Slots", top: "70%", left: "15%", width: "65%", height: "15%" },
      { label: "Southbridge Chip", top: "55%", left: "65%", width: "20%", height: "20%" },
    ]
  }
];

// KRX 및 시장 실시간 단가 기준 (g당 원화)
const METAL_PRICES = {
  gold: 195310,     // Au 1g = ₩195,310
  silver: 2945,     // Ag 1g = ₩2,945
  palladium: 58050, // Pd 1g = ₩58,050
  copper: 14        // Cu 1g = ₩14
};

export default function UrbanMiningLanding() {
  const [selectedPreset, setSelectedPreset] = useState(PRESETS[0]);
  const [isScanning, setIsScanning] = useState(false);
  const [calcWeight, setCalcWeight] = useState(10); // 계산기 슬라이더 (kg)
  const [userUploadedImg, setUserUploadedImg] = useState<string | null>(null);
  const [showApiGuideModal, setShowApiGuideModal] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 스캔 트리거 시뮬레이션
  const handleSelectPreset = (preset: typeof PRESETS[0]) => {
    setUserUploadedImg(null);
    setSelectedPreset(preset);
    setIsScanning(true);
    setTimeout(() => setIsScanning(false), 900);
  };

  // 이미지 업로드 핸들러
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const objectUrl = URL.createObjectURL(file);
    setUserUploadedImg(objectUrl);
    setIsScanning(true);
    setTimeout(() => setIsScanning(false), 1200);
  };

  const triggerUploadDialog = () => {
    fileInputRef.current?.click();
  };

  // 금액 계산
  const currentAu = selectedPreset.goldRate;
  const currentAg = selectedPreset.silverRate;
  const currentPd = selectedPreset.palladiumRate;
  const estimatedTotalPerKg = Math.round(
    currentAu * METAL_PRICES.gold + 
    currentAg * METAL_PRICES.silver + 
    currentPd * METAL_PRICES.palladium
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-amber-500 selection:text-slate-950 font-sans">
      
      {/* Hidden File Input */}
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleImageUpload} 
        accept="image/*" 
        className="hidden" 
      />

      {/* 0. DEVELOPMENT NOTICE & PROTOTYPE BANNER (필수 안내) */}
      <div className="bg-gradient-to-r from-amber-600/90 via-orange-600/90 to-amber-600/90 text-slate-950 text-xs py-2.5 px-4 font-medium shadow-md">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <span className="bg-slate-950 text-amber-300 text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider shrink-0">
              개발 진행 중 안내
            </span>
            <span className="text-slate-950 font-bold">
              AI 비전 실시간 부품 판별 기능은 현재 Gemini Vision API 연동 파이프라인 개발 단계입니다.
            </span>
            <span className="hidden md:inline text-slate-900 text-xs">
              (프로토타입 실시간 기능은 개별 API 키 등록 및 서버 통신이 필요합니다)
            </span>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button 
              onClick={() => setShowApiGuideModal(true)}
              className="underline font-bold hover:text-white transition text-xs cursor-pointer"
            >
              API 연동 안내 보기
            </button>
            <a 
              href="https://scan.techplay.blog" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-slate-950 text-amber-300 hover:bg-slate-900 px-3 py-1 rounded-md font-bold text-[11px] inline-flex items-center gap-1 transition shadow-sm"
            >
              <span>실시간 프로토타입 체험</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>

      {/* 1. TOP LIVE TICKER & RAPID LINKS BAR */}
      <div className="bg-slate-900/90 border-b border-slate-800 text-xs py-2 px-4 sticky top-0 z-50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-6 overflow-x-auto font-mono text-[11px]">
            <div className="flex items-center gap-2 shrink-0">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span className="font-semibold text-slate-300">KRX 금시장 & LME 실시간</span>
            </div>
            <span className="text-amber-400 shrink-0">Au(금) 1g : ₩195,310 <span className="text-emerald-400 text-[10px]">▲1.7%</span></span>
            <span className="text-slate-300 shrink-0">Ag(은) 1g : ₩2,945 <span className="text-emerald-400 text-[10px]">▲1.8%</span></span>
            <span className="text-sky-300 shrink-0">Pd(팔라듐) 1g : ₩58,050 <span className="text-rose-400 text-[10px]">▼0.8%</span></span>
            <span className="text-orange-400 shrink-0">Cu(동) 1kg : ₩14,055 <span className="text-emerald-400 text-[10px]">▲2.0%</span></span>
          </div>

          <div className="flex items-center gap-3 text-xs shrink-0">
            <a 
              href="https://scrap.techplay.blog" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1 transition"
            >
              <span>폐PCB 당일 매입</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <span className="text-slate-700">|</span>
            <a 
              href="https://price.techplay.blog/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1 transition"
            >
              <span>실시간 단가표</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <span className="text-slate-700">|</span>
            <a 
              href="https://www.youtube.com/@%EA%B3%A8%EB%93%9C%EC%8A%A4%ED%81%AC%EB%9E%A9" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-red-400 hover:text-red-300 font-semibold flex items-center gap-1 transition"
            >
              <YoutubeIcon className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">골드스크랩</span>
            </a>
          </div>
        </div>
      </div>

      {/* 2. GNB NAVBAR */}
      <header className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-600 via-amber-400 to-yellow-200 flex items-center justify-center text-slate-950 shadow-lg shadow-amber-500/20">
            <Cpu className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-black tracking-tight text-white block leading-none">
                IONLAB <span className="text-amber-400 font-light">URBAN MINING</span>
              </span>
              <span className="bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[9px] font-bold px-1.5 py-0.5 rounded">
                BETA
              </span>
            </div>
            <span className="text-[10px] tracking-widest text-slate-400 font-mono uppercase">AI 도시광산 자원가치평가</span>
          </div>
        </div>

        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-300">
          <a href="#demo" className="hover:text-amber-400 transition">AI 스캐너 데모</a>
          <a href="#scrap-buy" className="hover:text-cyan-400 transition flex items-center gap-1">
            <Truck className="w-3.5 h-3.5 text-cyan-400" />
            <span>폐PCB 최고가 매입</span>
          </a>
          <a href="#calculator" className="hover:text-amber-400 transition">대량 가치 계산기</a>
          <a href="#solution" className="hover:text-amber-400 transition">습식 정련 솔루션</a>
        </nav>

        <div className="flex items-center gap-2.5">
          <a 
            href="https://scrap.techplay.blog" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-cyan-500/40 bg-cyan-950/40 text-cyan-300 hover:bg-cyan-900/60 text-xs font-bold transition shadow-sm"
          >
            <span>매입 신청</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <button 
            onClick={triggerUploadDialog}
            className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 text-xs sm:text-sm font-bold shadow-lg shadow-amber-500/25 hover:brightness-110 active:scale-95 transition flex items-center gap-1.5 cursor-pointer"
          >
            <Camera className="w-4 h-4" />
            <span>사진 감정하기</span>
          </button>
        </div>
      </header>

      {/* 3. HERO SECTION */}
      <section className="relative pt-10 pb-20 overflow-hidden">
        {/* Glow Effect */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[320px] bg-amber-500/10 blur-[150px] pointer-events-none -z-10" />

        <div className="max-w-5xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-amber-500/40 text-amber-400 text-xs font-semibold mb-6 shadow-inner">
            <Sparkles className="w-3.5 h-3.5" />
            <span>폐기판 헐값 매각 방지 AI 비전 가치평가 솔루션</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-[1.15] mb-6">
            고철값 3,000원에 버리던 폐기판,<br />
            <span className="bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 bg-clip-text text-transparent">
              그 속에 ₩{estimatedTotalPerKg.toLocaleString()}원의 순금
            </span>이 숨어있습니다.
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto mb-8 leading-relaxed">
            더 이상 깜깜이 고철값에 속지 마세요. 스마트폰으로 사진을 찍으면<br className="hidden sm:inline" />
            Vision AI가 3초 만에 칩셋을 식별하고, 실시간 한국거래소 시세로 정밀 가치를 산출합니다.
          </p>

          {/* Prototype Direct Callout Alert */}
          <div className="max-w-2xl mx-auto mb-10 bg-slate-900/80 border border-amber-500/30 rounded-2xl p-4 text-left flex items-start gap-3 text-xs leading-relaxed text-slate-300 shadow-xl backdrop-blur-sm">
            <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <strong className="text-amber-300 font-bold">프로토타입 기능 안내 (현재 개발 중)</strong>
                <span className="text-[10px] bg-amber-400/20 text-amber-300 px-1.5 py-0.5 rounded font-mono">scan.techplay.blog</span>
              </div>
              <p className="text-slate-300">
                실제 카메라 라이브 피드 식별 및 맞춤 부품 감식은 <strong>Gemini Vision API 연동</strong>이 완료되어야 100% 동작합니다. 
                아직 엔터프라이즈 통합 개발 단계이므로, 아래 인터랙티브 데모로 시뮬레이션하거나 프로토타입 사이트에서 직접 API 키를 입력해 테스트하실 수 있습니다.
              </p>
              <div className="pt-1">
                <a 
                  href="https://scan.techplay.blog" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-amber-400 hover:text-amber-300 font-bold inline-flex items-center gap-1 underline"
                >
                  프로토타입 시스템 (scan.techplay.blog) 바로가기 ↗
                </a>
              </div>
            </div>
          </div>

          {/* Quick Preset Selector */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
            <span className="text-xs text-slate-300 mr-2">샘플 즉시 체험:</span>
            {PRESETS.map((preset) => (
              <button
                key={preset.id}
                onClick={() => handleSelectPreset(preset)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition flex items-center gap-2 cursor-pointer ${
                  selectedPreset.id === preset.id && !userUploadedImg
                    ? "bg-amber-400 text-slate-950 shadow-md shadow-amber-400/20 font-bold"
                    : "bg-slate-900/80 text-slate-300 border border-slate-800 hover:border-slate-700"
                }`}
              >
                <Cpu className="w-3.5 h-3.5" />
                {preset.name}
              </button>
            ))}
          </div>
        </div>

        {/* 4. INTERACTIVE SCANNER MOCKUP */}
        <div id="demo" className="max-w-5xl mx-auto px-4">
          <div className="relative rounded-3xl bg-slate-900/90 border border-slate-800/80 p-4 sm:p-8 shadow-2xl backdrop-blur-xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left: Viewfinder & Laser Scan */}
              <div className="lg:col-span-7 relative rounded-2xl overflow-hidden bg-slate-950 aspect-[4/3] border border-slate-800 group">
                <img 
                  src={userUploadedImg || selectedPreset.img} 
                  alt="Scrap Preview"
                  className="w-full h-full object-cover object-center filter brightness-95"
                />

                {/* Laser Sweeper */}
                <div className={`absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_#22d3ee] pointer-events-none transition-all duration-700 ${
                  isScanning ? "top-full opacity-100" : "top-0 opacity-0"
                }`} />

                {/* AI Detected Bounding Boxes */}
                {!isScanning && selectedPreset.tags.map((tag, idx) => (
                  <div
                    key={idx}
                    className="absolute border border-cyan-400/90 bg-cyan-500/10 rounded backdrop-blur-[1px] transition-all duration-500 flex flex-col justify-start p-1"
                    style={{
                      top: tag.top,
                      left: tag.left,
                      width: tag.width,
                      height: tag.height,
                    }}
                  >
                    <span className="text-[10px] font-mono font-bold bg-cyan-950/90 text-cyan-300 px-1 py-0.5 rounded border border-cyan-500/30 w-fit">
                      {tag.label}
                    </span>
                  </div>
                ))}

                {/* Status Overlay */}
                <div className="absolute bottom-3 left-3 bg-slate-950/80 border border-slate-800 rounded-lg px-3 py-1.5 text-xs font-mono text-cyan-400 flex items-center gap-2">
                  <RefreshCw className={`w-3.5 h-3.5 ${isScanning ? "animate-spin" : ""}`} />
                  {isScanning ? "AI 부품 분할 감식 중..." : "GEMINI VISION 3.6 시뮬레이션 완료"}
                </div>
              </div>

              {/* Right: Real-time Value Appraisal Card */}
              <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs uppercase font-mono tracking-widest text-slate-400">AI ESTIMATED VALUE</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      수율 98.2% 기준
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-1">
                    {userUploadedImg ? "사용자 직접 업로드 기판 (1kg 환산)" : `${selectedPreset.name} (1kg)`}
                  </h3>
                  <div className="text-4xl sm:text-5xl font-extrabold text-amber-400 font-mono tracking-tight my-4">
                    ₩ {estimatedTotalPerKg.toLocaleString()}
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    본 가치는 당일 KRX 실시간 귀금속 체결가 및 부품 패키지별 추출 수율 라이브러리를 통해 오차 범위 ±3% 내로 정밀 산출되었습니다.
                  </p>
                </div>

                {/* 3대 귀금속 성분표 */}
                <div className="space-y-3 bg-slate-950/60 p-4 rounded-xl border border-slate-800/80 font-mono text-xs">
                  <div className="flex justify-between items-center text-slate-300">
                    <span className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block" />
                      순금 (Au 99.9%)
                    </span>
                    <span className="text-white font-bold">{currentAu} g <span className="text-slate-400 font-normal">({Math.round(currentAu * METAL_PRICES.gold).toLocaleString()}원)</span></span>
                  </div>
                  <div className="flex justify-between items-center text-slate-300">
                    <span className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-slate-300 inline-block" />
                      순은 (Ag 99.9%)
                    </span>
                    <span className="text-white font-bold">{currentAg} g <span className="text-slate-400 font-normal">({Math.round(currentAg * METAL_PRICES.silver).toLocaleString()}원)</span></span>
                  </div>
                  <div className="flex justify-between items-center text-slate-300">
                    <span className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-sky-400 inline-block" />
                      팔라듐 (Pd)
                    </span>
                    <span className="text-white font-bold">{currentPd} g <span className="text-slate-400 font-normal">({Math.round(currentPd * METAL_PRICES.palladium).toLocaleString()}원)</span></span>
                  </div>
                </div>

                {/* Actions */}
                <div className="space-y-2">
                  <button 
                    onClick={triggerUploadDialog}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 hover:brightness-110 active:scale-[0.99] transition shadow-lg shadow-amber-500/20 cursor-pointer"
                  >
                    <Camera className="w-4 h-4" />
                    내 기판 사진 직접 올려서 테스트
                  </button>
                  <a 
                    href="https://scan.techplay.blog" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-700 text-slate-300 text-xs font-semibold flex items-center justify-center gap-1.5 transition"
                  >
                    <span>실제 카메라 라이브 스캐너(프로토타입) 열기</span>
                    <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
                  </a>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 5. AETHER MINING - 폐기판 당일 최고가 매입 섹션 (scrap.techplay.blog 연동) */}
      <section id="scrap-buy" className="py-20 bg-slate-900/60 border-y border-slate-800">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 mb-12">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold mb-3">
                <Truck className="w-3.5 h-3.5" />
                <span>도시광산 자원회수 전문 파트너십 (AETHER MINING)</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
                감정된 폐PCB 스크랩, <span className="text-cyan-400">당일 최고 시세로 전량 매입</span>합니다.
              </h2>
              <p className="text-sm text-slate-400 mt-2 max-w-2xl leading-relaxed">
                폐PCB, 골드스크랩, 통신장비, 서버 메인보드 등 희유금속 자원을 현장에서 디지털 계량 후 100% 당일 현금 또는 계좌로 즉시 정산해 드립니다.
              </p>
            </div>

            {/* Direct Call & Purchase Action */}
            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto shrink-0">
              <a 
                href="https://scrap.techplay.blog" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 transition shadow-lg shadow-cyan-500/25"
              >
                <span>매입 사이트(scrap) 바로가기</span>
                <ExternalLink className="w-4 h-4" />
              </a>
              <a 
                href="https://price.techplay.blog/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-5 py-3.5 rounded-xl bg-slate-900 border border-amber-500/40 text-amber-400 hover:bg-slate-850 font-bold text-sm flex items-center justify-center gap-2 transition"
              >
                <DollarSign className="w-4 h-4" />
                <span>실시간 매입 단가표</span>
              </a>
            </div>
          </div>

          {/* 3대 신뢰 지표 & 3단계 매입 절차 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="p-6 rounded-2xl bg-slate-950/80 border border-cyan-500/30">
              <div className="text-xs text-slate-400 mb-1">대금 정산 조건</div>
              <div className="text-2xl font-black text-cyan-400">100% 당일 정산</div>
              <p className="text-xs text-slate-400 mt-2">현장 계량 즉시 계좌이체 또는 현금 즉시 지급</p>
            </div>
            <div className="p-6 rounded-2xl bg-slate-950/80 border border-amber-500/30">
              <div className="text-xs text-slate-400 mb-1">방문 수거 서비스</div>
              <div className="text-2xl font-black text-amber-400">수도권 및 전국 대응</div>
              <p className="text-xs text-slate-400 mt-2">일정 수량 이상 전용 차량 전국 무료 출장 방문</p>
            </div>
            <div className="p-6 rounded-2xl bg-slate-950/80 border border-emerald-500/30">
              <div className="text-xs text-slate-400 mb-1">시세 반영 방식</div>
              <div className="text-2xl font-black text-emerald-400">당일 최고 시세</div>
              <p className="text-xs text-slate-400 mt-2">KRX 및 LME 실시간 금속 시세 기준 감정 정산</p>
            </div>
          </div>

          {/* 전국 직통 전화 상담 배너 */}
          <div className="bg-slate-950 rounded-2xl border border-slate-800 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-center sm:text-left">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center shrink-0">
                <Phone className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <h4 className="text-base font-bold text-white">신속 전화 매입 상담 (직통 전화)</h4>
                <p className="text-xs text-slate-400">보유 기판 사진과 예상 무게를 말씀해 주시면 당일 즉시 견적을 드립니다.</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a 
                href="tel:010-8216-9314" 
                className="px-4 py-2.5 rounded-lg bg-cyan-950/70 border border-cyan-500/40 text-cyan-300 font-bold text-xs flex items-center gap-1.5 hover:bg-cyan-900 transition"
              >
                <Phone className="w-3.5 h-3.5 text-cyan-400" />
                <span>[서울·경기] 010-8216-9314</span>
              </a>
              <a 
                href="tel:010-5798-0188" 
                className="px-4 py-2.5 rounded-lg bg-sky-950/70 border border-sky-500/40 text-sky-300 font-bold text-xs flex items-center gap-1.5 hover:bg-sky-900 transition"
              >
                <Phone className="w-3.5 h-3.5 text-sky-400" />
                <span>[경기도 외 전지역] 010-5798-0188</span>
              </a>
            </div>
          </div>

          {/* 유튜브 @골드스크랩 현장 영상 배너 */}
          <div className="mt-8 bg-gradient-to-r from-red-950/40 via-slate-900 to-slate-950 rounded-2xl border border-red-500/30 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-red-500/20 text-red-500 flex items-center justify-center shrink-0">
                <YoutubeIcon className="w-7 h-7" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white text-base">공식 유튜브 채널 '골드스크랩'</span>
                  <span className="text-[10px] bg-red-500/20 text-red-300 px-2 py-0.5 rounded-full font-mono">구독자 1.91천명 · 영상 350+개</span>
                </div>
                <p className="text-xs text-slate-400 mt-1">도시광산 폐PCB 및 IC칩 금 추출, 현장 해체 작업 영상을 실시간으로 확인하세요.</p>
              </div>
            </div>
            <a 
              href="https://www.youtube.com/@%EA%B3%A8%EB%93%9C%EC%8A%A4%ED%81%AC%EB%9E%A9" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs flex items-center gap-2 transition shrink-0"
            >
              <span>유튜브 채널 바로가기</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </section>

      {/* 6. INTERACTIVE VALUE CALCULATOR (BULK) */}
      <section id="calculator" className="py-20 max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
            대량 보유 중이신가요? 예상 수익을 계산해 보세요
          </h2>
          <p className="text-sm text-slate-400">
            불투명한 정산 관행 대신, 무게만 입력하면 실시간 추출 가치와 약품 투입 절감액을 즉시 계산합니다.
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-6 sm:p-8 rounded-2xl shadow-xl">
          <div className="mb-8">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-semibold text-slate-300 flex items-center gap-2">
                <Scale className="w-4 h-4 text-amber-400" /> 보유 스크랩 중량
              </span>
              <span className="text-2xl font-bold font-mono text-amber-400">{calcWeight} kg</span>
            </div>
            <input 
              type="range" 
              min="1" 
              max="100" 
              value={calcWeight}
              onChange={(e) => setCalcWeight(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
            />
            <div className="flex justify-between text-[11px] font-mono text-slate-400 mt-2">
              <span>1 kg</span>
              <span>50 kg</span>
              <span>100 kg</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-slate-800 text-center font-mono">
            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
              <div className="text-xs text-slate-400 mb-1">예상 총 순금(Au) 추출량</div>
              <div className="text-xl font-bold text-amber-400">
                {(selectedPreset.goldRate * calcWeight).toFixed(2)} g
              </div>
            </div>
            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
              <div className="text-xs text-slate-400 mb-1">예상 총 순은(Ag) 추출량</div>
              <div className="text-xl font-bold text-slate-200">
                {(selectedPreset.silverRate * calcWeight).toFixed(2)} g
              </div>
            </div>
            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
              <div className="text-xs text-slate-400 mb-1">총 예상 자산 가치</div>
              <div className="text-xl font-bold text-emerald-400">
                ₩ {(estimatedTotalPerKg * calcWeight).toLocaleString()}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. WHY IONLAB (THE PATENTED REFINING DIFFERENCE) */}
      <section id="solution" className="py-20 max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-amber-400 block mb-2">
            WHY IONLAB URBAN MINING
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            단순 측정이 끝이 아닙니다.<br />
            실제 순금을 뽑아내는 <span className="text-amber-400">정밀 습식 정련 공정 처방</span>까지.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center mb-5">
              <Camera className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">0.1초 비파괴 AI 스캔</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              비싼 분석 수수료와 샘플 파손이 필요 없습니다. 멀티모달 비전 모델이 부품 규격과 도금 두께를 즉시 추정합니다.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-5">
              <FlaskConical className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">약품 낭비 없는 화학 레시피</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              기판 내 구리·철·주석 비중을 사전 감식하여 질산과 왕수, 환원제의 최적 비율을 도출, 화학 정련 원가를 40% 이상 절감합니다.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-5">
              <FileText className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">투명한 클라우드 공정 정산</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              입고 스캔부터 최종 종로 감정소 정산까지, 전 과정을 구글 클라우드 기반 투명 로그로 위탁 고객사에게 100% 공개합니다.
            </p>
          </div>
        </div>
      </section>

      {/* 8. FINAL BOTTOM CTA */}
      <section className="py-20 border-t border-slate-800 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            책상 서랍 속 잠자는 부품, 지금 바로 확인해보세요.
          </h2>
          <p className="text-slate-400 mb-8 max-w-xl mx-auto text-sm">
            사진 업로드 한 번으로 시작되는 도시광산 자원순환. 주식회사 이온랩과 AETHER MINING이 소중한 전자 스크랩의 진짜 가치를 찾아드립니다.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button 
              onClick={triggerUploadDialog}
              className="px-7 py-4 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-300 text-slate-950 font-extrabold text-sm sm:text-base shadow-xl shadow-amber-500/20 hover:brightness-110 active:scale-95 transition inline-flex items-center gap-2 cursor-pointer"
            >
              <Upload className="w-5 h-5" />
              무료로 내 기판 사진 감정하기
            </button>
            <a 
              href="https://scrap.techplay.blog" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-7 py-4 rounded-xl bg-slate-900 hover:bg-slate-850 border border-cyan-500/50 text-cyan-300 font-extrabold text-sm sm:text-base shadow-lg transition inline-flex items-center gap-2"
            >
              <Truck className="w-5 h-5" />
              폐PCB 스크랩 매입 신청 ↗
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-10 border-t border-slate-900 text-xs text-slate-400 font-mono bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-slate-900">
            <div>
              <span className="text-white font-bold text-sm block">IONLAB URBAN MINING x AETHER MINING</span>
              <span className="text-slate-500 text-[11px]">도시광산 AI 비전 평가 엔진 & 전자스크랩 자원순환 네트워크</span>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <a href="https://scan.techplay.blog" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition">AI 프로토타입(scan)</a>
              <a href="https://scrap.techplay.blog" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition">스크랩 매입(scrap)</a>
              <a href="https://price.techplay.blog/" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition">단가표(price)</a>
              <a href="https://www.youtube.com/@%EA%B3%A8%EB%93%9C%EC%8A%A4%ED%81%AC%EB%9E%A9" target="_blank" rel="noopener noreferrer" className="hover:text-red-400 transition">유튜브 채널</a>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-slate-500 text-[11px]">
            <div>© 2026 주식회사 이온랩 (IONLAB Co., Ltd.) & AETHER MINING. All rights reserved.</div>
            <div>실시간 시세: 한국거래소(KRX) 금시장 & London Metal Exchange 연동</div>
          </div>
        </div>
      </footer>

      {/* API GUIDE MODAL */}
      {showApiGuideModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative">
            <button 
              onClick={() => setShowApiGuideModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white text-lg font-bold cursor-pointer"
            >
              ✕
            </button>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">AI Vision 엔진 API 연동 가이드</h3>
                <span className="text-xs text-amber-400 font-mono">현재 엔터프라이즈 통합 개발 중</span>
              </div>
            </div>
            
            <div className="space-y-3 text-xs text-slate-300 leading-relaxed">
              <p>
                본 랜딩페이지에 탑재된 부품 스캐너는 <strong>실시간 시뮬레이션 모드</strong>로 작동하며, 
                실제 업로드된 사진 속 부품을 0.1초 단위로 정밀 분할 인식하기 위해서는 
                <strong>Google Gemini 3.6 Multimodal Vision API 키</strong>가 서버에 바인딩되어야 합니다.
              </p>
              
              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1.5 font-mono text-[11px]">
                <div className="text-amber-400 font-bold">🛠️ 연동 아키텍처 현황:</div>
                <div className="text-slate-400">• 실시간 프로토타입 서버: <span className="text-white">scan.techplay.blog</span></div>
                <div className="text-slate-400">• 비전 모델: <span className="text-cyan-400">Gemini 3.1 Flash-Lite / 3.6 Flash</span></div>
                <div className="text-slate-400">• 데이터 저장소: <span className="text-white">Cloudflare D1 & KV Cache</span></div>
              </div>

              <p>
                개인 API 키를 등록하여 직접 실시간 카메라 및 7구도 멀티 앵글 검사를 테스트해보시려면 
                아래 프로토타입 사이트로 이동해 주세요.
              </p>
            </div>

            <div className="mt-6 flex gap-3">
              <a 
                href="https://scan.techplay.blog" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex-1 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 transition"
              >
                <span>scan.techplay.blog 열기</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <button 
                onClick={() => setShowApiGuideModal(false)}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs transition cursor-pointer"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
