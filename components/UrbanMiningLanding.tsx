"use client";

import React, { useState, useRef } from "react";
import { 
  Camera, Upload, Cpu, Sparkles, TrendingUp, ShieldCheck, 
  ArrowRight, FileText, CheckCircle2, FlaskConical, Scale, RefreshCw
} from "lucide-react";

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

      {/* 1. TOP LIVE TICKER */}
      <div className="bg-slate-900/90 border-b border-slate-800 text-xs py-2 px-4 sticky top-0 z-50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between overflow-x-auto gap-6">
          <div className="flex items-center gap-2 shrink-0">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span className="font-semibold text-slate-300">KRX 금시장 & LME 실시간 가치 산정망 가동 중</span>
          </div>
          <div className="flex items-center gap-6 shrink-0 font-mono">
            <span className="text-amber-400">Au(금) 1g : ₩195,310 <span className="text-emerald-400 text-[10px]">▲1.7%</span></span>
            <span className="text-slate-300">Ag(은) 1g : ₩2,945 <span className="text-emerald-400 text-[10px]">▲1.8%</span></span>
            <span className="text-sky-300">Pd(팔라듐) 1g : ₩58,050 <span className="text-rose-400 text-[10px]">▼0.8%</span></span>
            <span className="text-orange-400">Cu(동) 1kg : ₩14,055 <span className="text-emerald-400 text-[10px]">▲2.0%</span></span>
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
            <span className="text-lg font-black tracking-tight text-white block leading-none">
              IONLAB <span className="text-amber-400 font-light">URBAN MINING</span>
            </span>
            <span className="text-[10px] tracking-widest text-slate-400 font-mono uppercase">scan.techplay.blog</span>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          <a href="#demo" className="hover:text-amber-400 transition">AI 스캐너</a>
          <a href="#calculator" className="hover:text-amber-400 transition">가치 계산기</a>
          <a href="#solution" className="hover:text-amber-400 transition">습식 정련 솔루션</a>
        </nav>

        <button 
          onClick={triggerUploadDialog}
          className="px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 text-sm font-bold shadow-lg shadow-amber-500/25 hover:brightness-110 active:scale-95 transition flex items-center gap-1.5 cursor-pointer"
        >
          <Camera className="w-4 h-4" />
          사진 업로드 감정
        </button>
      </header>

      {/* 3. HERO SECTION */}
      <section className="relative pt-12 pb-24 overflow-hidden">
        {/* Glow Effect */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-amber-500/10 blur-[140px] pointer-events-none -z-10" />

        <div className="max-w-5xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-amber-500/30 text-amber-400 text-xs font-semibold mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>폐기판 헐값 매각 방지 AI 비전 가치평가 솔루션</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-[1.15] mb-6">
            고철값 3,000원에 버리던 폐기판,<br />
            <span className="bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 bg-clip-text text-transparent">
              그 속에 ₩{estimatedTotalPerKg.toLocaleString()}원의 순금
            </span>이 숨어있습니다.
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed">
            더 이상 깜깜이 고철값에 속지 마세요. 스마트폰으로 사진을 찍으면<br className="hidden sm:inline" />
            Vision AI가 3초 만에 칩셋을 식별하고, 실시간 한국거래소 시세로 정밀 가치를 산출합니다.
          </p>

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

        {/* 4. INTERACTIVE SCANNER MOCKUP (THE "WOW" COMPONENT) */}
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
                  {isScanning ? "AI 부품 분할 감식 중..." : "GEMINI VISION 3.1 판별 완료"}
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

                {/* Action Button */}
                <button 
                  onClick={triggerUploadDialog}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 hover:brightness-110 active:scale-[0.99] transition shadow-lg shadow-amber-500/20 cursor-pointer"
                >
                  <Camera className="w-4 h-4" />
                  내 부품 사진 찍고 정밀 감정서 받기
                </button>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 5. INTERACTIVE VALUE CALCULATOR (BULK) */}
      <section id="calculator" className="py-20 bg-slate-900/40 border-y border-slate-800/80">
        <div className="max-w-4xl mx-auto px-4">
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
        </div>
      </section>

      {/* 6. WHY IONLAB (THE PATENTED REFINING DIFFERENCE) */}
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

      {/* 7. FINAL BOTTOM CTA */}
      <section className="py-20 border-t border-slate-800 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            책상 서랍 속 잠자는 부품, 지금 바로 확인해보세요.
          </h2>
          <p className="text-slate-400 mb-8 max-w-xl mx-auto text-sm">
            사진 업로드 한 번으로 시작되는 도시광산 자원순환. 주식회사 이온랩이 당신의 소중한 전자 스크랩의 진짜 가치를 찾아드립니다.
          </p>
          <button 
            onClick={triggerUploadDialog}
            className="px-8 py-4 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-300 text-slate-950 font-extrabold text-base shadow-xl shadow-amber-500/20 hover:brightness-110 active:scale-95 transition inline-flex items-center gap-2 cursor-pointer"
          >
            <Upload className="w-5 h-5" />
            무료로 내 기판 사진 감정하기
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 border-t border-slate-900 text-center text-xs text-slate-400 font-mono">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>© 2026 주식회사 이온랩 (IONLAB Co., Ltd.). All rights reserved.</div>
          <div>실시간 시세 제공: 한국거래소(KRX) 금시장 & London Metal Exchange</div>
        </div>
      </footer>

    </div>
  );
}
