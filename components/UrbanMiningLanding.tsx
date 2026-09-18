"use client";

import React, { useState } from "react";
import { 
  Camera, Cpu, Sparkles, TrendingUp, ShieldCheck, 
  ArrowRight, FileText, CheckCircle2, FlaskConical, Scale, RefreshCw,
  ExternalLink, AlertTriangle, Phone, HelpCircle, Flame, DollarSign,
  ChevronRight, Truck, Check, Play, Info
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
  const [showRedirectModal, setShowRedirectModal] = useState(false);

  // 스캔 트리거 시뮬레이션
  const handleSelectPreset = (preset: typeof PRESETS[0]) => {
    setSelectedPreset(preset);
    setIsScanning(true);
    setTimeout(() => setIsScanning(false), 800);
  };

  // 실제 기능 안내 모달 열기
  const handleScanAction = () => {
    setShowRedirectModal(true);
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
      
      {/* 0. SLIM NOTICE BAR */}
      <div className="bg-gradient-to-r from-amber-500/15 via-orange-500/20 to-amber-500/15 border-b border-amber-500/20 text-xs py-1.5 px-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap">
            <span className="bg-amber-400 text-slate-950 text-[10px] font-black px-1.5 py-0.5 rounded tracking-wide shrink-0">
              안내
            </span>
            <span className="text-amber-300/90 text-xs break-keep truncate">
              본 페이지는 <strong>가상 시뮬레이터</strong>입니다. 실제 카메라 AI 판별은 프로토타입에서 지원됩니다.
            </span>
          </div>
          <a 
            href="https://scan.techplay.blog" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-amber-400 hover:text-amber-300 font-bold text-[11px] shrink-0 inline-flex items-center gap-1 underline underline-offset-2 ml-2"
          >
            <span>scan.techplay.blog ↗</span>
          </a>
        </div>
      </div>

      {/* 1. TOP LIVE TICKER & RAPID LINKS BAR */}
      <div className="bg-slate-900/95 border-b border-slate-800 text-xs py-2 px-3 sm:px-4 sticky top-0 z-50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-4 sm:gap-6 overflow-x-auto no-scrollbar font-mono text-[11px]">
            <div className="flex items-center gap-1.5 shrink-0">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span className="font-semibold text-slate-300">KRX 실시간</span>
            </div>
            <span className="text-amber-400 shrink-0">Au 1g : ₩195,310 <span className="text-emerald-400 text-[10px]">▲1.7%</span></span>
            <span className="text-slate-300 shrink-0">Ag 1g : ₩2,945 <span className="text-emerald-400 text-[10px]">▲1.8%</span></span>
            <span className="text-sky-300 shrink-0">Pd 1g : ₩58,050 <span className="text-rose-400 text-[10px]">▼0.8%</span></span>
            <span className="text-orange-400 shrink-0 hidden sm:inline">Cu 1kg : ₩14,055</span>
          </div>

          <div className="flex items-center gap-2.5 text-xs shrink-0 font-medium">
            <a 
              href="https://scrap.techplay.blog" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1 transition text-[11px] sm:text-xs"
            >
              <span>폐PCB 매입</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <span className="text-slate-700 hidden sm:inline">|</span>
            <a 
              href="https://price.techplay.blog/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-amber-400 hover:text-amber-300 hidden sm:flex items-center gap-1 transition text-[11px]"
            >
              <span>단가표</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>

      {/* 2. GNB NAVBAR */}
      <header className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
        <div className="flex items-center gap-2.5 sm:gap-3">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-amber-600 via-amber-400 to-yellow-200 flex items-center justify-center text-slate-950 shadow-md shadow-amber-500/20 shrink-0">
            <Cpu className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <a href="https://landing.techplay.blog" className="text-base sm:text-lg font-black tracking-tight text-white leading-none hover:opacity-90 transition">
                IONLAB <span className="text-amber-400 font-light">URBAN MINING</span>
              </a>
              <span className="bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[9px] font-bold px-1.5 py-0.5 rounded leading-none">
                DEMO
              </span>
            </div>
            <a href="https://landing.techplay.blog" className="text-[9px] sm:text-[10px] tracking-widest text-slate-400 font-mono uppercase hover:text-amber-300 transition block mt-0.5">landing.techplay.blog</a>
          </div>
        </div>

        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-300">
          <a href="#demo" className="hover:text-amber-400 transition">가상 스캐너 데모</a>
          <a href="#scrap-buy" className="hover:text-cyan-400 transition flex items-center gap-1">
            <Truck className="w-3.5 h-3.5 text-cyan-400" />
            <span>폐PCB 최고가 매입</span>
          </a>
          <a href="#calculator" className="hover:text-amber-400 transition">대량 가치 계산기</a>
          <a href="#solution" className="hover:text-amber-400 transition">습식 정련 공정</a>
        </nav>

        <div className="flex items-center gap-2">
          <a 
            href="https://scan.techplay.blog" 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-3.5 sm:px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 text-xs sm:text-sm font-bold shadow-md shadow-amber-500/20 hover:brightness-110 active:scale-95 transition flex items-center gap-1.5"
          >
            <Camera className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>AI 스캐너 열기 ↗</span>
          </a>
        </div>
      </header>

      {/* 3. HERO SECTION */}
      <section className="relative pt-6 pb-14 sm:pt-12 sm:pb-20 overflow-hidden">
        {/* Glow Effect */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[250px] sm:w-[650px] sm:h-[320px] bg-amber-500/10 blur-[120px] sm:blur-[150px] pointer-events-none -z-10" />

        <div className="max-w-4xl mx-auto px-4 text-center">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/90 border border-amber-500/30 text-amber-400 text-xs font-semibold mb-4 sm:mb-6 shadow-inner">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI 비전 폐기판 가치 감정 시뮬레이터</span>
          </div>

          {/* Optimized Concise Headline (No awkward line wraps) */}
          <h1 className="text-2xl sm:text-5xl font-extrabold tracking-tight text-white leading-snug sm:leading-[1.2] mb-3 sm:mb-5 break-keep">
            고철값 3,000원에 버리던 폐기판,<br />
            <span className="bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 bg-clip-text text-transparent">
              사실 48,200원의 순금
            </span>이 숨어있습니다.
          </h1>

          {/* Crisp Subcopy */}
          <p className="text-xs sm:text-base text-slate-300 max-w-xl mx-auto mb-6 sm:mb-8 leading-relaxed break-keep">
            사진 1장으로 3초 만에 칩셋 식별. 한국거래소(KRX) 실시간 공식 시세로 금·은·팔라듐 환산 가치를 밝혀냅니다.
          </p>

          {/* Quick Prototype Notice Chip */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-800 text-[11px] text-slate-300 mb-8 max-w-md mx-auto">
            <Info className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span className="break-keep text-left">
              본 데모는 <strong>가상 체험용</strong>입니다. 실제 촬영 감정은{" "}
              <a href="https://scan.techplay.blog" target="_blank" rel="noopener noreferrer" className="text-amber-400 font-bold underline">
                scan.techplay.blog
              </a>
              에서 지원됩니다.
            </span>
          </div>

          {/* Quick Preset Selector */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
            <span className="text-xs text-slate-400 mr-1 hidden sm:inline">가상 샘플 선택:</span>
            {PRESETS.map((preset) => (
              <button
                key={preset.id}
                onClick={() => handleSelectPreset(preset)}
                className={`px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs font-semibold transition flex items-center gap-1.5 cursor-pointer ${
                  selectedPreset.id === preset.id
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

        {/* 4. INTERACTIVE SCANNER MOCKUP (VIRTUAL EXPERIENCE ONLY) */}
        <div id="demo" className="max-w-5xl mx-auto px-4">
          <div className="relative rounded-2xl sm:rounded-3xl bg-slate-900/90 border border-slate-800/80 p-3 sm:p-7 shadow-2xl backdrop-blur-xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
              
              {/* Left: Viewfinder & Laser Scan */}
              <div className="lg:col-span-7 relative rounded-xl sm:rounded-2xl overflow-hidden bg-slate-950 aspect-[4/3] border border-slate-800 group">
                <img 
                  src={selectedPreset.img} 
                  alt={selectedPreset.name}
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
                    <span className="text-[9px] sm:text-[10px] font-mono font-bold bg-cyan-950/90 text-cyan-300 px-1 py-0.5 rounded border border-cyan-500/30 w-fit">
                      {tag.label}
                    </span>
                  </div>
                ))}

                {/* Status Overlay */}
                <div className="absolute bottom-2.5 left-2.5 bg-slate-950/85 border border-slate-800 rounded-lg px-2.5 py-1 text-[11px] font-mono text-cyan-400 flex items-center gap-1.5 backdrop-blur-sm">
                  <RefreshCw className={`w-3 h-3 ${isScanning ? "animate-spin" : ""}`} />
                  {isScanning ? "가상 분할 감식 진행 중..." : "AI 가상 식별 시뮬레이션"}
                </div>
              </div>

              {/* Right: Value Appraisal Card */}
              <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-4 sm:space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] sm:text-xs uppercase font-mono tracking-widest text-slate-400">ESTIMATED RECOVERY</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      수율 98.2% 기준
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-1 break-keep">{selectedPreset.name} (1kg)</h3>
                  <div className="text-3xl sm:text-5xl font-extrabold text-amber-400 font-mono tracking-tight my-2 sm:my-3">
                    ₩ {estimatedTotalPerKg.toLocaleString()}
                  </div>
                  <p className="text-[11px] sm:text-xs text-slate-400 leading-relaxed break-keep">
                    당일 KRX 실시간 귀금속 단가와 부품별 추출 수율 라이브러리를 가상 환산한 금액입니다.
                  </p>
                </div>

                {/* 3대 귀금속 성분표 */}
                <div className="space-y-2.5 bg-slate-950/60 p-3 sm:p-4 rounded-xl border border-slate-800/80 font-mono text-[11px] sm:text-xs">
                  <div className="flex justify-between items-center text-slate-300">
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-amber-400 inline-block" />
                      순금 (Au 99.9%)
                    </span>
                    <span className="text-white font-bold">{currentAu} g <span className="text-slate-400 font-normal">({Math.round(currentAu * METAL_PRICES.gold).toLocaleString()}원)</span></span>
                  </div>
                  <div className="flex justify-between items-center text-slate-300">
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-slate-300 inline-block" />
                      순은 (Ag 99.9%)
                    </span>
                    <span className="text-white font-bold">{currentAg} g <span className="text-slate-400 font-normal">({Math.round(currentAg * METAL_PRICES.silver).toLocaleString()}원)</span></span>
                  </div>
                  <div className="flex justify-between items-center text-slate-300">
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-sky-400 inline-block" />
                      팔라듐 (Pd)
                    </span>
                    <span className="text-white font-bold">{currentPd} g <span className="text-slate-400 font-normal">({Math.round(currentPd * METAL_PRICES.palladium).toLocaleString()}원)</span></span>
                  </div>
                </div>

                {/* Actions (All Redirect to scan.techplay.blog) */}
                <div className="space-y-2 pt-1">
                  <button 
                    onClick={handleScanAction}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 hover:brightness-110 active:scale-[0.99] transition shadow-md shadow-amber-500/20 cursor-pointer"
                  >
                    <Camera className="w-4 h-4" />
                    <span>실제 내 기판 사진 감정하기</span>
                  </button>
                  <a 
                    href="https://scan.techplay.blog" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-700 text-slate-300 text-xs font-semibold flex items-center justify-center gap-1.5 transition"
                  >
                    <span>카메라 AI 스캐너 프로토타입 바로가기</span>
                    <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
                  </a>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 5. AETHER MINING - 폐기판 당일 최고가 매입 섹션 (scrap.techplay.blog 연동) */}
      <section id="scrap-buy" className="py-14 sm:py-20 bg-slate-900/60 border-y border-slate-800">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 sm:gap-8 mb-10 sm:mb-12">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold mb-3">
                <Truck className="w-3.5 h-3.5" />
                <span>도시광산 자원회수 전문 파트너십</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white break-keep leading-snug">
                감정된 폐PCB 스크랩, <span className="text-cyan-400">당일 최고 시세로 전량 매입</span>합니다.
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-2 max-w-2xl leading-relaxed break-keep">
                폐PCB, 골드스크랩, 통신장비, 서버 메인보드 등 희유금속 자원을 현장에서 디지털 계량 후 100% 당일 현금 또는 계좌로 즉시 정산해 드립니다.
              </p>
            </div>

            {/* Direct Call & Purchase Action */}
            <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 w-full lg:w-auto shrink-0">
              <a 
                href="https://scrap.techplay.blog" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-5 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition shadow-lg shadow-cyan-500/25 text-center"
              >
                <span>매입 신청 (scrap.techplay.blog)</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <a 
                href="https://price.techplay.blog/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-4 py-3 rounded-xl bg-slate-900 border border-amber-500/40 text-amber-400 hover:bg-slate-850 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition text-center"
              >
                <DollarSign className="w-3.5 h-3.5" />
                <span>실시간 단가표</span>
              </a>
            </div>
          </div>

          {/* 3대 신뢰 지표 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-10">
            <div className="p-5 sm:p-6 rounded-2xl bg-slate-950/80 border border-cyan-500/30">
              <div className="text-xs text-slate-400 mb-1">대금 정산 조건</div>
              <div className="text-xl sm:text-2xl font-black text-cyan-400">100% 당일 정산</div>
              <p className="text-xs text-slate-400 mt-1.5 break-keep">현장 계량 즉시 계좌이체 또는 현금 즉시 지급</p>
            </div>
            <div className="p-5 sm:p-6 rounded-2xl bg-slate-950/80 border border-amber-500/30">
              <div className="text-xs text-slate-400 mb-1">방문 수거 서비스</div>
              <div className="text-xl sm:text-2xl font-black text-amber-400">수도권 및 전국 대응</div>
              <p className="text-xs text-slate-400 mt-1.5 break-keep">일정 수량 이상 전용 차량 전국 무료 출장 방문</p>
            </div>
            <div className="p-5 sm:p-6 rounded-2xl bg-slate-950/80 border border-emerald-500/30">
              <div className="text-xs text-slate-400 mb-1">시세 반영 방식</div>
              <div className="text-xl sm:text-2xl font-black text-emerald-400">당일 최고 시세</div>
              <p className="text-xs text-slate-400 mt-1.5 break-keep">KRX 및 LME 실시간 금속 시세 기준 감정 정산</p>
            </div>
          </div>

          {/* 전국 직통 전화 상담 배너 */}
          <div className="bg-slate-950 rounded-2xl border border-slate-800 p-4 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-center sm:text-left">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5 sm:w-6 sm:h-6 animate-pulse" />
              </div>
              <div>
                <h4 className="text-sm sm:text-base font-bold text-white">신속 전화 매입 상담 (직통)</h4>
                <p className="text-xs text-slate-400 break-keep">보유 기판 사진과 예상 무게를 말씀해 주시면 당일 즉시 견적을 드립니다.</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2.5 w-full sm:w-auto">
              <a 
                href="tel:010-8216-9314" 
                className="flex-1 sm:flex-initial px-3.5 py-2.5 rounded-lg bg-cyan-950/70 border border-cyan-500/40 text-cyan-300 font-bold text-xs flex items-center justify-center gap-1.5 hover:bg-cyan-900 transition"
              >
                <Phone className="w-3.5 h-3.5 text-cyan-400" />
                <span>[서울·경기] 010-8216-9314</span>
              </a>
              <a 
                href="tel:010-5798-0188" 
                className="flex-1 sm:flex-initial px-3.5 py-2.5 rounded-lg bg-sky-950/70 border border-sky-500/40 text-sky-300 font-bold text-xs flex items-center justify-center gap-1.5 hover:bg-sky-900 transition"
              >
                <Phone className="w-3.5 h-3.5 text-sky-400" />
                <span>[경기 외 전국] 010-5798-0188</span>
              </a>
            </div>
          </div>

          {/* 유튜브 @골드스크랩 배너 */}
          <div className="mt-6 sm:mt-8 bg-gradient-to-r from-red-950/40 via-slate-900 to-slate-950 rounded-2xl border border-red-500/30 p-4 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-red-500/20 text-red-500 flex items-center justify-center shrink-0">
                <YoutubeIcon className="w-6 h-6 sm:w-7 sm:h-7" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white text-sm sm:text-base">공식 유튜브 '골드스크랩'</span>
                  <span className="text-[10px] bg-red-500/20 text-red-300 px-2 py-0.5 rounded-full font-mono">구독자 1.9천명</span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5 break-keep">도시광산 폐PCB 및 IC칩 금 추출, 현장 작업 영상 공개 중</p>
              </div>
            </div>
            <a 
              href="https://www.youtube.com/@%EA%B3%A8%EB%93%9C%EC%8A%A4%ED%81%AC%EB%9E%A9" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition shrink-0 w-full sm:w-auto"
            >
              <span>채널 바로가기</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </section>

      {/* 6. INTERACTIVE VALUE CALCULATOR (BULK) */}
      <section id="calculator" className="py-14 sm:py-20 max-w-4xl mx-auto px-4">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-3xl font-extrabold text-white mb-2 break-keep">
            대량 보유 중이신가요? 예상 수익을 계산해 보세요
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 break-keep">
            불투명한 정산 관행 대신, 무게만 입력하면 실시간 가치를 즉시 계산합니다.
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 sm:p-8 rounded-2xl shadow-xl">
          <div className="mb-6 sm:mb-8">
            <div className="flex justify-between items-center mb-3">
              <span className="text-xs sm:text-sm font-semibold text-slate-300 flex items-center gap-2">
                <Scale className="w-4 h-4 text-amber-400" /> 보유 스크랩 중량
              </span>
              <span className="text-xl sm:text-2xl font-bold font-mono text-amber-400">{calcWeight} kg</span>
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

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 pt-5 border-t border-slate-800 text-center font-mono">
            <div className="p-3.5 sm:p-4 rounded-xl bg-slate-950/60 border border-slate-800">
              <div className="text-xs text-slate-400 mb-1">예상 순금(Au) 추출량</div>
              <div className="text-lg sm:text-xl font-bold text-amber-400">
                {(selectedPreset.goldRate * calcWeight).toFixed(2)} g
              </div>
            </div>
            <div className="p-3.5 sm:p-4 rounded-xl bg-slate-950/60 border border-slate-800">
              <div className="text-xs text-slate-400 mb-1">예상 순은(Ag) 추출량</div>
              <div className="text-lg sm:text-xl font-bold text-slate-200">
                {(selectedPreset.silverRate * calcWeight).toFixed(2)} g
              </div>
            </div>
            <div className="p-3.5 sm:p-4 rounded-xl bg-slate-950/60 border border-slate-800">
              <div className="text-xs text-slate-400 mb-1">총 예상 자산 가치</div>
              <div className="text-lg sm:text-xl font-bold text-emerald-400">
                ₩ {(estimatedTotalPerKg * calcWeight).toLocaleString()}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. WHY IONLAB */}
      <section id="solution" className="py-14 sm:py-20 max-w-6xl mx-auto px-4">
        <div className="text-center mb-10 sm:mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-amber-400 block mb-2">
            WHY IONLAB URBAN MINING
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white break-keep leading-snug">
            단순 측정이 끝이 아닙니다.<br />
            실제 순금을 뽑아내는 <span className="text-amber-400">정밀 습식 정련 공정 처방</span>까지.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          <div className="p-5 sm:p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center mb-4">
              <Camera className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <h3 className="text-base sm:text-lg font-bold text-white mb-2 break-keep">0.1초 비파괴 AI 스캔</h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed break-keep">
              비싼 분석 수수료와 샘플 파손이 필요 없습니다. 멀티모달 비전 모델이 부품 규격과 도금 두께를 즉시 추정합니다.
            </p>
          </div>

          <div className="p-5 sm:p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-4">
              <FlaskConical className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <h3 className="text-base sm:text-lg font-bold text-white mb-2 break-keep">약품 낭비 없는 화학 레시피</h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed break-keep">
              기판 내 구리·철·주석 비중을 사전 감식하여 질산과 왕수, 환원제의 최적 비율을 도출, 화학 정련 원가를 40% 이상 절감합니다.
            </p>
          </div>

          <div className="p-5 sm:p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-4">
              <FileText className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <h3 className="text-base sm:text-lg font-bold text-white mb-2 break-keep">투명한 클라우드 공정 정산</h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed break-keep">
              입고 스캔부터 최종 종로 감정소 정산까지, 전 과정을 구글 클라우드 기반 투명 로그로 위탁 고객사에게 100% 공개합니다.
            </p>
          </div>
        </div>
      </section>

      {/* 8. FINAL BOTTOM CTA */}
      <section className="py-14 sm:py-20 border-t border-slate-800 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white mb-3 break-keep">
            책상 서랍 속 잠자는 부품, 지금 바로 확인해보세요.
          </h2>
          <p className="text-slate-400 mb-6 sm:mb-8 max-w-xl mx-auto text-xs sm:text-sm break-keep">
            사진 촬영 한 번으로 시작되는 도시광산 자원순환. 주식회사 이온랩과 AETHER MINING이 소중한 전자 스크랩의 진짜 가치를 찾아드립니다.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a 
              href="https://scan.techplay.blog" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-7 py-3.5 sm:py-4 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-300 text-slate-950 font-extrabold text-sm sm:text-base shadow-lg shadow-amber-500/20 hover:brightness-110 active:scale-95 transition inline-flex items-center justify-center gap-2 text-center"
            >
              <Camera className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>AI 부품 감정하러 가기 (scan) ↗</span>
            </a>
            <a 
              href="https://scrap.techplay.blog" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-7 py-3.5 sm:py-4 rounded-xl bg-slate-900 hover:bg-slate-850 border border-cyan-500/50 text-cyan-300 font-extrabold text-sm sm:text-base shadow-lg transition inline-flex items-center justify-center gap-2 text-center"
            >
              <Truck className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>폐PCB 스크랩 매입 신청 ↗</span>
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 sm:py-10 border-t border-slate-900 text-xs text-slate-400 font-mono bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-slate-900 text-center sm:text-left">
            <div>
              <span className="text-white font-bold text-sm block">IONLAB URBAN MINING x AETHER MINING</span>
              <span className="text-slate-500 text-[11px]">도시광산 AI 비전 평가 엔진 & 전자스크랩 자원순환 네트워크</span>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xs">
              <a href="https://landing.techplay.blog" className="text-amber-400 font-bold hover:underline transition">홈(landing)</a>
              <a href="https://scan.techplay.blog" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition">AI 스캐너(scan)</a>
              <a href="https://scrap.techplay.blog" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition">스크랩 매입(scrap)</a>
              <a href="https://price.techplay.blog/" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition">단가표(price)</a>
              <a href="https://www.youtube.com/@%EA%B3%A8%EB%93%9C%EC%8A%A4%ED%81%AC%EB%9E%A9" target="_blank" rel="noopener noreferrer" className="hover:text-red-400 transition">유튜브 채널</a>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-slate-500 text-[11px] text-center sm:text-left">
            <div>© 2026 주식회사 이온랩 (IONLAB Co., Ltd.) & AETHER MINING. All rights reserved.</div>
            <div>실시간 시세: 한국거래소(KRX) 금시장 & London Metal Exchange 연동</div>
          </div>
        </div>
      </footer>

      {/* REDIRECT & VIRTUAL EXPERIENCE MODAL */}
      {showRedirectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl relative text-center">
            <button 
              onClick={() => setShowRedirectModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white text-lg font-bold cursor-pointer"
            >
              ✕
            </button>
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center mx-auto mb-4">
              <Camera className="w-6 h-6" />
            </div>
            
            <h3 className="text-lg font-bold text-white mb-2 break-keep">
              실제 카메라 분석 안내
            </h3>
            
            <p className="text-xs text-slate-300 leading-relaxed mb-6 break-keep">
              본 랜딩 페이지는 <strong>가상 시뮬레이터 데모</strong>입니다.<br />
              실제 스마트폰 카메라로 부품을 촬영하고 Gemini Vision AI로 판별하시려면 <strong>scan.techplay.blog</strong>로 이동해 주세요.
            </p>

            <div className="space-y-2.5">
              <a 
                href="https://scan.techplay.blog" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 hover:brightness-110 transition shadow-md shadow-amber-500/20"
              >
                <span>실제 AI 스캐너(scan.techplay.blog)로 이동</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <button 
                onClick={() => setShowRedirectModal(false)}
                className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-300 font-semibold text-xs transition cursor-pointer"
              >
                가상 샘플 계속 체험하기
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
