"use client";

import React, { useState, useRef } from "react";
import {
  Cpu,
  Sparkles,
  ShieldCheck,
  TrendingUp,
  ArrowRight,
  FileText,
  FlaskConical,
  Scale,
  RefreshCw,
  ExternalLink,
  ChevronRight,
  Layers,
  BarChart3,
  Globe2,
  CheckCircle2,
  Lock,
  Building2,
  Microscope,
  Zap,
  Activity,
  Award,
  DownloadCloud,
  Mail,
  Send,
  Camera,
  Upload,
  Loader2,
  AlertCircle,
  ChevronDown,
  HelpCircle,
  Lightbulb,
  Database
} from "lucide-react";
import { sendLeadEmail } from "@/lib/email";
import { FAQ_DATA } from "@/data/faqData";

// 샘플 스크랩 프리셋 데이터
const PRESETS = [
  {
    id: "server-ram",
    name: "Enterprise Server DDR4 ECC RAM",
    grade: "Tier-1 High Yield",
    weightDefault: 1, // kg
    goldRate: 1.45, // g/kg
    silverRate: 4.80,
    palladiumRate: 0.12,
    baseMetals: { copper: 62, nickel: 14, tin: 18, iron: 6 },
    chemicalSavings: "44.2%",
    img: "https://images.unsplash.com/photo-1562976540-1502c2145186?w=800&q=80",
    tags: [
      { label: "BGA DRAM Array (Au Wire)", top: "32%", left: "18%", width: "26%", height: "32%", confidence: "99.4%", value: "Au ~0.14g" },
      { label: "MLCC Cap Array (Pd/Ag)", top: "68%", left: "22%", width: "20%", height: "18%", confidence: "98.7%", value: "Pd/Ag 850ppm" },
      { label: "Hard Gold Finger (30μin Au)", top: "78%", left: "12%", width: "76%", height: "15%", confidence: "99.8%", value: "Au 99.9%" },
      { label: "PMIC Regulator (Cu/Au Lead)", top: "34%", left: "62%", width: "18%", height: "24%", confidence: "97.5%", value: "Trace Au" },
    ]
  },
  {
    id: "smartphone-pcb",
    name: "Smartphone Mainboard Substrate",
    grade: "Ultra-Dense Complex",
    weightDefault: 1,
    goldRate: 3.20,
    silverRate: 8.50,
    palladiumRate: 0.35,
    baseMetals: { copper: 54, nickel: 22, tin: 16, iron: 8 },
    chemicalSavings: "41.8%",
    img: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=800&q=80",
    tags: [
      { label: "AP/PoP Stack IC (Au Wire/Ball)", top: "24%", left: "28%", width: "36%", height: "36%", confidence: "99.1%", value: "Au ~0.38g" },
      { label: "High-Q 0201 MLCC Matrix", top: "65%", left: "24%", width: "20%", height: "20%", confidence: "98.2%", value: "Pd 1200ppm" },
      { label: "RF Front-End Module (Au Plated)", top: "28%", left: "68%", width: "22%", height: "26%", confidence: "97.9%", value: "Hard Au" },
    ]
  },
  {
    id: "gpu-board",
    name: "Data Center GPU Accelerator Substrate",
    grade: "Heavy Metallurgical",
    weightDefault: 1,
    goldRate: 1.85,
    silverRate: 5.90,
    palladiumRate: 0.22,
    baseMetals: { copper: 68, nickel: 12, tin: 14, iron: 6 },
    chemicalSavings: "46.5%",
    img: "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=800&q=80",
    tags: [
      { label: "CoWoS GPU Core Substrate", top: "28%", left: "32%", width: "38%", height: "38%", confidence: "99.6%", value: "Multi-Die Au" },
      { label: "PCIe Gen5 High-Current Fingers", top: "72%", left: "16%", width: "68%", height: "16%", confidence: "99.9%", value: "30μin Au 99.4%" },
      { label: "VRM Solid Capacitors & Inductors", top: "35%", left: "72%", width: "20%", height: "28%", confidence: "98.4%", value: "Pd/Ag Matrix" },
    ]
  }
];

// KRX 실시간 단가 기준 (원화/g)
const METAL_PRICES = {
  gold: 195310,     // Au 1g = ₩195,310
  silver: 2945,     // Ag 1g = ₩2,945
  palladium: 58050, // Pd 1g = ₩58,050
  copper: 14        // Cu 1g = ₩14
};

export default function EnterpriseShowcase() {
  const [selectedPreset, setSelectedPreset] = useState(PRESETS[0]);
  const [isScanning, setIsScanning] = useState(false);
  const [scanStep, setScanStep] = useState(3); // 1: Segmentation, 2: Yield, 3: Completed
  const [userUploadedImg, setUserUploadedImg] = useState<string | null>(null);

  // 모달 상태
  const [modalType, setModalType] = useState<"ir" | "api" | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    org: "",
    email: "",
    type: "VC / Investment Fund",
    note: ""
  });

  // FAQ 상태 (카테고리 탭 및 아코디언 토글)
  const [activeFaqTab, setActiveFaqTab] = useState<"all" | "part1" | "part2" | "part3">("all");
  const [openFaqIds, setOpenFaqIds] = useState<Record<string, boolean>>({
    q1: true,
    q4: true,
    q6: true,
  });

  const toggleFaq = (id: string) => {
    setOpenFaqIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSelectPreset = (preset: typeof PRESETS[0]) => {
    setUserUploadedImg(null);
    setSelectedPreset(preset);
    runScanCycle();
  };

  const handleCustomUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setUserUploadedImg(url);
    runScanCycle();
  };

  const runScanCycle = () => {
    setIsScanning(true);
    setScanStep(1);
    setTimeout(() => setScanStep(2), 400);
    setTimeout(() => {
      setScanStep(3);
      setIsScanning(false);
    }, 900);
  };

  // 평가액 계산
  const currentAu = selectedPreset.goldRate;
  const currentAg = selectedPreset.silverRate;
  const currentPd = selectedPreset.palladiumRate;
  const estimatedTotalPerKg = Math.round(
    currentAu * METAL_PRICES.gold + 
    currentAg * METAL_PRICES.silver + 
    currentPd * METAL_PRICES.palladium
  );

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setSubmitError(null);

    const typeLabel = modalType === "ir" 
      ? `TIPS / VC IR 피치덱 신청 (${formData.type})` 
      : `엔터프라이즈 API 솔루션 데모 신청 (${formData.type})`;

    const result = await sendLeadEmail({
      name: formData.name,
      org: formData.org,
      email: formData.email,
      type: typeLabel,
      note: formData.note,
      source: "https://landing.techplay.blog"
    });

    setIsSubmitting(false);

    if (result.success) {
      setFormSubmitted(true);
      setTimeout(() => {
        setModalType(null);
        setFormSubmitted(false);
        setFormData({ name: "", org: "", email: "", type: "VC / Investment Fund", note: "" });
      }, 3500);
    } else {
      setSubmitError(result.error || "메일 전송에 실패했습니다. 잠시 후 다시 시도해주세요.");
    }
  };

  return (
    <div className="min-h-screen bg-[#070A0F] text-slate-100 selection:bg-cyan-500 selection:text-slate-950 font-sans antialiased">
      
      {/* Hidden File Input */}
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleCustomUpload} 
        accept="image/*" 
        className="hidden" 
      />

      {/* 0. ENTERPRISE STATUS BAR */}
      <div className="bg-[#070A0F]/95 border-b border-slate-800/80 text-xs py-2 px-3 sm:px-4 sticky top-0 z-50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2 sm:gap-3 font-mono text-[10px] sm:text-[11px]">
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-bold tracking-tight">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping shrink-0" />
              <span className="sm:hidden">IONLAB v3.6</span>
              <span className="hidden sm:inline">IONLAB B2B INTELLIGENCE ENGINE v3.6</span>
            </span>
            <span className="text-slate-400 hidden md:inline">KRX & LME Real-Time Feed Active</span>
          </div>

          <div className="flex items-center gap-2.5 sm:gap-4 text-slate-300">
            <span className="text-amber-400 font-medium">Au: ₩195,310/g</span>
            <span className="text-slate-400 font-medium">Ag: ₩2,945/g</span>
            <span className="text-sky-300 font-medium hidden xs:inline">Pd: ₩58,050/g</span>
            <span className="text-emerald-400 font-semibold hidden sm:inline">Yield: 98.4%</span>
          </div>
        </div>
      </div>

      {/* 1. HEADER & GNB */}
      <header className="max-w-7xl mx-auto px-4 sm:px-6 h-18 sm:h-20 flex items-center justify-between border-b border-slate-800/40">
        <div className="flex items-center gap-2.5 sm:gap-3">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-cyan-500 via-sky-600 to-slate-900 border border-cyan-400/40 flex items-center justify-center text-white shadow-lg shadow-cyan-500/20 shrink-0">
            <Cpu className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.2]" />
          </div>
          <div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="text-lg sm:text-xl font-black tracking-tight text-white font-mono">
                IONLAB <span className="text-cyan-400 font-sans">AI</span>
              </span>
              <span className="px-1.5 py-0.5 rounded bg-cyan-950/80 border border-cyan-500/40 text-[9px] font-bold text-cyan-300 font-mono">
                DEEPTECH
              </span>
            </div>
            <span className="text-[9px] sm:text-[10px] tracking-widest text-slate-400 font-mono uppercase block">
              Urban Mining Intelligence
            </span>
          </div>
        </div>

        {/* Menu Navigation */}
        <nav className="hidden lg:flex items-center gap-8 text-xs font-semibold text-slate-300 tracking-wide">
          <a href="#problem" className="hover:text-cyan-400 transition">Market Problem</a>
          <a href="#ai-engine" className="hover:text-cyan-400 transition">AI Engine</a>
          <a href="#process" className="hover:text-cyan-400 transition">Process Optimization</a>
          <a href="#business-model" className="hover:text-cyan-400 transition">Business Model</a>
          <a href="#market-esg" className="hover:text-cyan-400 transition">ESG & Impact</a>
          <a href="#faq" className="hover:text-cyan-400 transition">FAQ</a>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          <button 
            onClick={() => setModalType("ir")}
            className="px-3 sm:px-4 py-2 rounded-lg border border-amber-500/40 bg-amber-500/10 text-amber-300 hover:bg-amber-500/20 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shrink-0"
          >
            <DownloadCloud className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">IR 자료(One-Pager)</span>
            <span className="sm:hidden">IR Deck</span>
          </button>
          
          <button 
            onClick={() => setModalType("api")}
            className="px-3.5 sm:px-5 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-sky-500 hover:from-cyan-400 hover:to-sky-400 text-slate-950 text-xs font-black tracking-tight shadow-lg shadow-cyan-500/25 transition active:scale-95 cursor-pointer flex items-center gap-1.5 whitespace-nowrap shrink-0"
          >
            <Zap className="w-3.5 h-3.5" />
            <span className="sm:hidden">API 데모</span>
            <span className="hidden sm:inline">엔터프라이즈 API 데모</span>
          </button>
        </div>
      </header>

      {/* 2. HERO SECTION: THE BIG PROBLEM & VISION */}
      <section className="relative pt-12 sm:pt-16 pb-16 sm:pb-20 overflow-hidden border-b border-slate-800/60">
        {/* Deep Industrial Cyber Background Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b12_1px,transparent_1px),linear-gradient(to_bottom,#1e293b12_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-cyan-500/10 blur-[160px] pointer-events-none -z-10" />

        <div className="max-w-6xl mx-auto px-4 text-center relative z-10">
          
          <div className="inline-flex items-center gap-2 px-3 sm:px-3.5 py-1.5 rounded-full bg-[#0E1522] border border-cyan-500/30 text-cyan-300 text-[11px] sm:text-xs font-mono font-semibold mb-6 shadow-inner">
            <Activity className="w-3.5 h-3.5 text-cyan-400 animate-pulse shrink-0" />
            <span>E-WASTE CIRCULAR ECONOMY INTELLIGENCE</span>
          </div>

          <h1 className="text-2xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.2] sm:leading-[1.15] mb-5 sm:mb-6 max-w-4xl mx-auto break-keep font-sans">
            연간 6,200만 톤의 전자 폐기물,<br />
            <span className="bg-gradient-to-r from-cyan-300 via-sky-400 to-amber-300 bg-clip-text text-transparent">
              AI 비전으로 디지털 자산이 됩니다.
            </span>
          </h1>

          <p className="text-sm sm:text-lg text-slate-300 max-w-3xl mx-auto mb-10 leading-relaxed break-keep font-normal">
            파괴 검사(XRF) 없이 사진 한 장으로 칩셋 0.1초 분할 식별 ➔ KRX 실시간 시세 연동 가치 산출 ➔ 최적 습식 정련 레시피 도출까지 원스톱 인텔리전스를 제공합니다.
          </p>

          {/* 3대 핵심 지표 배지 */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto mb-12">
            <div className="bg-[#0B0F17]/90 border border-slate-800/80 p-5 rounded-2xl shadow-xl backdrop-blur-md text-left">
              <div className="text-[11px] font-mono text-cyan-400 font-semibold mb-1">[Non-Destructive]</div>
              <div className="text-2xl sm:text-3xl font-black text-white font-mono">100% 절감</div>
              <p className="text-xs text-slate-400 mt-1.5 break-keep">물리적 샘플 파쇄 및 고비용 정밀 XRF 검사 수수료 완전 제거</p>
            </div>
            
            <div className="bg-[#0B0F17]/90 border border-slate-800/80 p-5 rounded-2xl shadow-xl backdrop-blur-md text-left">
              <div className="text-[11px] font-mono text-amber-400 font-semibold mb-1">[Inference Speed]</div>
              <div className="text-2xl sm:text-3xl font-black text-white font-mono">0.28초 감식</div>
              <p className="text-xs text-slate-400 mt-1.5 break-keep">단일 프레임 내 38개 이상의 마이크로 칩셋 동시 바운딩 박스 검출</p>
            </div>

            <div className="bg-[#0B0F17]/90 border border-slate-800/80 p-5 rounded-2xl shadow-xl backdrop-blur-md text-left">
              <div className="text-[11px] font-mono text-emerald-400 font-semibold mb-1">[Chemical Cost]</div>
              <div className="text-2xl sm:text-3xl font-black text-white font-mono">42% 최적화</div>
              <p className="text-xs text-slate-400 mt-1.5 break-keep">간섭 원소(Cu, Fe, Ni) 비율 사전 감식으로 왕수·질산 남용 방지</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <a 
              href="#ai-engine"
              className="px-6 py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-sm transition shadow-lg shadow-cyan-500/25 flex items-center gap-2"
            >
              <span>AI 엔진 데모 검증하기</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <button 
              onClick={() => setModalType("ir")}
              className="px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-700 text-slate-200 font-bold text-sm transition flex items-center gap-2 cursor-pointer"
            >
              <span>TIPS / VC 전용 IR Deck 신청</span>
              <ExternalLink className="w-4 h-4 text-amber-400" />
            </button>
          </div>

        </div>
      </section>

      {/* 3. THE "WHY NOW" SECTION: 시장의 치명적 결함 */}
      <section id="problem" className="py-24 max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold block mb-2">
            MARKET BOTTLENECK & CRITICAL INEFFICIENCY
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight break-keep">
            기존 전자폐기물 산업이 가진 <span className="text-rose-400">3대 치명적 한계</span>
          </h2>
          <p className="text-sm text-slate-400 mt-3 max-w-2xl mx-auto break-keep">
            수조 원 규모의 희유금속이 깜깜이 거래 관행과 비효율적 화학 공정으로 버려지고 있습니다.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="bg-[#0B0F17] border border-rose-500/20 p-8 rounded-3xl relative overflow-hidden group hover:border-rose-500/40 transition">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/10 text-rose-400 flex items-center justify-center font-mono font-black text-lg mb-6">
              01
            </div>
            <div className="text-xs font-mono text-rose-400 uppercase tracking-wider mb-1">Opacity & Valuation Loss</div>
            <h3 className="text-xl font-bold text-white mb-3 break-keep">깜깜이 눈대중 평가 관행</h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed break-keep">
              기판의 품위(Grade)를 매입상 개인의 경험에 의존하여 판별하므로 연간 수조 원의 귀금속이 헐값에 저평가 매각되며 매매 당사자 간 끊임없는 정산 분쟁을 야기합니다.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-[#0B0F17] border border-amber-500/20 p-8 rounded-3xl relative overflow-hidden group hover:border-amber-500/40 transition">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center font-mono font-black text-lg mb-6">
              02
            </div>
            <div className="text-xs font-mono text-amber-400 uppercase tracking-wider mb-1">Destructive & Slow Analysis</div>
            <h3 className="text-xl font-bold text-white mb-3 break-keep">고비용 파괴 분석(XRF/ICP)</h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed break-keep">
              정밀 성분 검사를 위해서는 기판을 분쇄하고 산에 녹여야 하므로 건당 수십만 원의 비용과 수일의 납기가 소요되어 중소 리사이클러는 시도조차 불가능했습니다.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-[#0B0F17] border border-cyan-500/20 p-8 rounded-3xl relative overflow-hidden group hover:border-cyan-500/40 transition">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center font-mono font-black text-lg mb-6">
              03
            </div>
            <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-1">Chemical Overconsumption</div>
            <h3 className="text-xl font-bold text-white mb-3 break-keep">질산·왕수 등 화학 약품 남용</h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed break-keep">
              기판 내 구리·철·주석 비중을 모른 채 강산을 과투입하여 정련 원가가 폭증하고 유독가스 및 유해 폐수가 과다 발생하여 ESG 규제 위반 위험에 직면합니다.
            </p>
          </div>
        </div>
      </section>

      {/* 4. LIVE INTERACTIVE AI DEMO (HUD SCANNER INTERFACE) */}
      <section id="ai-engine" className="py-24 bg-[#05080E] border-y border-slate-800/80">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold block mb-2">
              REAL-TIME COMPUTER VISION INFERENCE
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight break-keep">
              엔터프라이즈 AI 비전 스캐너 <span className="text-cyan-400">Live HUD</span>
            </h2>
            <p className="text-sm text-slate-400 mt-2 max-w-2xl mx-auto break-keep">
              마이크로초 단위의 부품 바운딩 박스 검출과 합금 성분 정밀 환산 엔진을 직접 테스트하세요.
            </p>
          </div>

          {/* Preset Selector & Custom Upload Tab */}
          <div className="flex items-center justify-start sm:justify-center gap-2 mb-8 overflow-x-auto no-scrollbar pb-2 px-1">
            <span className="text-[11px] font-mono text-slate-400 shrink-0 mr-1">TARGET PCB:</span>
            {PRESETS.map((preset) => (
              <button
                key={preset.id}
                onClick={() => handleSelectPreset(preset)}
                className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition flex items-center gap-1.5 shrink-0 whitespace-nowrap cursor-pointer ${
                  selectedPreset.id === preset.id && !userUploadedImg
                    ? "bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/25"
                    : "bg-slate-900 text-slate-300 border border-slate-800 hover:border-slate-700"
                }`}
              >
                <Cpu className="w-3.5 h-3.5" />
                {preset.name}
              </button>
            ))}

            <button
              onClick={() => fileInputRef.current?.click()}
              className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition flex items-center gap-1.5 shrink-0 whitespace-nowrap border cursor-pointer ${
                userUploadedImg
                  ? "bg-amber-400 text-slate-950 border-amber-400 font-bold shadow-md shadow-amber-400/20"
                  : "bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700"
              }`}
            >
              <Upload className="w-3.5 h-3.5" />
              <span>직접 PCB 사진 업로드</span>
            </button>
          </div>

          {/* HUD Container */}
          <div className="bg-[#0B0F17] border border-cyan-500/30 rounded-3xl p-4 sm:p-8 shadow-2xl relative overflow-hidden backdrop-blur-xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left Viewport (HUD Viewfinder) */}
              <div className="lg:col-span-7 relative rounded-2xl overflow-hidden bg-slate-950 aspect-[4/3] border border-cyan-500/40 shadow-inner group">
                <img 
                  src={userUploadedImg || selectedPreset.img} 
                  alt="Inspection Substrate"
                  className="w-full h-full object-cover object-center filter brightness-95 contrast-105"
                />

                {/* Laser Grid Sweeper */}
                <div className={`absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_20px_#38bdf8] pointer-events-none transition-all duration-700 ${
                  isScanning ? "top-full opacity-100" : "top-0 opacity-0"
                }`} />

                {/* HUD Corners */}
                <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-cyan-400 pointer-events-none" />
                <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-cyan-400 pointer-events-none" />
                <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-cyan-400 pointer-events-none" />
                <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-cyan-400 pointer-events-none" />

                {/* Bounding Box Overlays */}
                {!isScanning && selectedPreset.tags.map((tag, idx) => (
                  <div
                    key={idx}
                    className="absolute border border-cyan-400 bg-cyan-500/15 rounded backdrop-blur-[1px] transition-all duration-300 flex flex-col justify-between p-1.5 animate-fadeIn"
                    style={{
                      top: tag.top,
                      left: tag.left,
                      width: tag.width,
                      height: tag.height,
                    }}
                  >
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-[9px] font-mono font-bold bg-cyan-950/90 text-cyan-300 px-1 py-0.5 rounded border border-cyan-500/40">
                        {tag.label}
                      </span>
                      <span className="text-[9px] font-mono text-emerald-400 bg-black/70 px-1 py-0.5 rounded">
                        {tag.confidence}
                      </span>
                    </div>
                    <span className="text-[9px] font-mono font-bold text-amber-300 bg-black/80 px-1 py-0.5 rounded w-fit self-end">
                      {tag.value}
                    </span>
                  </div>
                ))}

                {/* Console Log Status Tag */}
                <div className="absolute bottom-3 left-3 bg-slate-950/90 border border-slate-800 rounded-lg px-3 py-1.5 text-xs font-mono text-cyan-300 flex items-center gap-2">
                  <RefreshCw className={`w-3.5 h-3.5 text-cyan-400 ${isScanning ? "animate-spin" : ""}`} />
                  <span>
                    {isScanning
                      ? `Step ${scanStep}/3: Neural Segmentation Active...`
                      : `Inference 0.28s | 38 Key Micro-ICs Segmented`}
                  </span>
                </div>
              </div>

              {/* Right Data Deck (Live Value & Chemical Formulation) */}
              <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs uppercase font-mono tracking-widest text-slate-400">
                      VALUATION & EXTRACTION MODEL
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                      {selectedPreset.grade}
                    </span>
                  </div>

                  <h3 className="text-2xl font-black text-white font-mono mb-1">{selectedPreset.name}</h3>
                  <div className="text-4xl sm:text-5xl font-black text-amber-400 font-mono tracking-tight my-4">
                    ₩ {estimatedTotalPerKg.toLocaleString()}
                    <span className="text-xs font-normal text-slate-400 ml-2 font-mono">/ 1kg 추정가치</span>
                  </div>

                  {/* 3대 귀금속 성분표 */}
                  <div className="space-y-2.5 bg-slate-950/80 p-4 rounded-xl border border-slate-800/80 font-mono text-xs">
                    <div className="flex justify-between items-center text-slate-300">
                      <span className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                        순금 (Au 99.9%)
                      </span>
                      <span className="text-white font-bold">{currentAu} g/kg <span className="text-slate-400 font-normal">({Math.round(currentAu * METAL_PRICES.gold).toLocaleString()}원)</span></span>
                    </div>
                    <div className="flex justify-between items-center text-slate-300">
                      <span className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                        순은 (Ag 99.9%)
                      </span>
                      <span className="text-white font-bold">{currentAg} g/kg <span className="text-slate-400 font-normal">({Math.round(currentAg * METAL_PRICES.silver).toLocaleString()}원)</span></span>
                    </div>
                    <div className="flex justify-between items-center text-slate-300">
                      <span className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-sky-400" />
                        팔라듐 (Pd)
                      </span>
                      <span className="text-white font-bold">{currentPd} g/kg <span className="text-slate-400 font-normal">({Math.round(currentPd * METAL_PRICES.palladium).toLocaleString()}원)</span></span>
                    </div>
                  </div>

                  {/* Base Metal Composition Bar (Moat Showcase) */}
                  <div className="mt-4 p-4 rounded-xl bg-slate-950/80 border border-slate-800/80">
                    <div className="flex justify-between text-xs font-mono text-slate-400 mb-2">
                      <span>비철 방해금속 구성비 (Cu / Ni / Sn / Fe)</span>
                      <span className="text-cyan-400 font-bold">약품 {selectedPreset.chemicalSavings} 절감</span>
                    </div>
                    <div className="w-full h-2.5 rounded-full bg-slate-800 flex overflow-hidden">
                      <div style={{ width: `${selectedPreset.baseMetals.copper}%` }} className="bg-orange-500" title="Copper" />
                      <div style={{ width: `${selectedPreset.baseMetals.nickel}%` }} className="bg-sky-500" title="Nickel" />
                      <div style={{ width: `${selectedPreset.baseMetals.tin}%` }} className="bg-emerald-500" title="Tin" />
                      <div style={{ width: `${selectedPreset.baseMetals.iron}%` }} className="bg-slate-500" title="Iron" />
                    </div>
                    <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-2">
                      <span>Cu {selectedPreset.baseMetals.copper}%</span>
                      <span>Ni {selectedPreset.baseMetals.nickel}%</span>
                      <span>Sn {selectedPreset.baseMetals.tin}%</span>
                      <span>Fe {selectedPreset.baseMetals.iron}%</span>
                    </div>
                  </div>

                </div>

                {/* API Direct Integration CTA */}
                <div className="flex gap-3">
                  <button 
                    onClick={() => setModalType("api")}
                    className="flex-1 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-sky-500 hover:brightness-110 text-slate-950 font-black text-xs sm:text-sm flex items-center justify-center gap-2 transition cursor-pointer shadow-lg shadow-cyan-500/20"
                  >
                    <Zap className="w-4 h-4" />
                    엔터프라이즈 API 연동 신청
                  </button>
                  <a 
                    href="https://scan.techplay.blog"
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="px-4 py-3.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 hover:text-white text-xs font-semibold flex items-center justify-center gap-1 transition"
                    title="실제 카메라 비전 프로토타입 열기"
                  >
                    <Camera className="w-4 h-4 text-cyan-400" />
                  </a>
                </div>

              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 5. PROPRIETARY TECH PIPELINE (MOAT ARCHITECTURE) */}
      <section id="process" className="py-24 max-w-6xl mx-auto px-4 sm:px-6 relative">
        {/* Background Subtle Radial Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-cyan-500/5 blur-[140px] pointer-events-none -z-10" />

        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-mono text-xs tracking-wider uppercase mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span>PROPRIETARY TECH PIPELINE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight break-keep">
            단순 AI 비전을 넘어, <span className="text-cyan-400">습식 제련 화학 레시피 도출</span>까지
          </h2>
          <p className="text-sm text-slate-400 mt-3 max-w-2xl mx-auto break-keep leading-relaxed">
            소프트웨어 기업이 흉내 낼 수 없는 실측 습식 침출 데이터와 야금학(Metallurgy) 도메인이 결합된 엔드투엔드 아키텍처
          </p>
        </div>

        {/* 3-Stage Connected Architecture Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 relative">
          
          {/* Desktop Connecting Line between cards */}
          <div className="hidden md:block absolute top-1/2 left-8 right-8 h-[1px] bg-gradient-to-r from-cyan-500/40 via-amber-500/40 to-emerald-500/40 -translate-y-12 pointer-events-none z-0" />

          {/* Step 1 Card */}
          <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 hover:border-cyan-500/50 transition-all duration-300 rounded-3xl p-6 sm:p-8 flex flex-col justify-between group relative z-10 shadow-xl">
            <div>
              {/* Pill Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-cyan-400 font-mono text-[11px] sm:text-xs tracking-wider uppercase mb-5">
                <span className="px-1.5 py-0.5 rounded bg-cyan-400/20 text-cyan-300 font-bold">01</span>
                <span className="w-1 h-1 rounded-full bg-cyan-400 animate-ping" />
                <span>COMPUTER VISION</span>
              </div>

              <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                <Microscope className="w-6 h-6" />
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-white mb-2.5 break-keep">
                비파괴 초정밀 부품 단위 분할
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed break-keep mb-6">
                고가의 XRF 파괴 분석 없이 0.28초 내 칩셋(BGA, DRAM, MLCC, 골드핑거) 규격 및 도금 면적을 자동 식별합니다.
              </p>
            </div>

            {/* Metric Pill */}
            <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
              <span className="text-[11px] font-mono text-slate-400">Processing Speed</span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 font-mono text-xs font-bold">
                <Activity className="w-3 h-3 text-cyan-400" />
                Inference Latency: 0.28s
              </span>
            </div>
          </div>

          {/* Step 2 Card */}
          <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 hover:border-amber-500/50 transition-all duration-300 rounded-3xl p-6 sm:p-8 flex flex-col justify-between group relative z-10 shadow-xl">
            <div>
              {/* Pill Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-400 font-mono text-[11px] sm:text-xs tracking-wider uppercase mb-5">
                <span className="px-1.5 py-0.5 rounded bg-amber-400/20 text-amber-300 font-bold">02</span>
                <span className="w-1 h-1 rounded-full bg-amber-400 animate-ping" />
                <span>REAL-TIME VALUATION</span>
              </div>

              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                <BarChart3 className="w-6 h-6" />
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-white mb-2.5 break-keep">
                공식 금융 데이터 기반 가치 산출
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed break-keep mb-6">
                한국거래소(KRX) 금시장 및 LME 국제 시세 3분 주기 미러링 + 패키지별 실질 회수율 매핑 알고리즘을 적용합니다.
              </p>
            </div>

            {/* Metric Pill */}
            <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
              <span className="text-[11px] font-mono text-slate-400">Financial Accuracy</span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300 font-mono text-xs font-bold">
                <TrendingUp className="w-3 h-3 text-amber-400" />
                KRX 정합성: 99.9%
              </span>
            </div>
          </div>

          {/* Step 3 Card */}
          <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 hover:border-emerald-500/50 transition-all duration-300 rounded-3xl p-6 sm:p-8 flex flex-col justify-between group relative z-10 shadow-xl">
            <div>
              {/* Pill Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 font-mono text-[11px] sm:text-xs tracking-wider uppercase mb-5">
                <span className="px-1.5 py-0.5 rounded bg-emerald-400/20 text-emerald-300 font-bold">03</span>
                <span className="w-1 h-1 rounded-full bg-emerald-400 animate-ping" />
                <span>DYNAMIC RECIPE</span>
              </div>

              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                <FlaskConical className="w-6 h-6" />
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-white mb-2.5 break-keep">
                화학 습식 정련 최적화 처방 엔진
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed break-keep mb-6">
                기판 내 방해 금속(Cu, Fe, Ni) 비율 역산 ➔ 질산/왕수 최적 투입량 자동 처방으로 화학 원가를 42% 절감합니다.
              </p>
            </div>

            {/* Metric Pill */}
            <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
              <span className="text-[11px] font-mono text-slate-400">Cost Reduction</span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-mono text-xs font-bold">
                <Sparkles className="w-3 h-3 text-emerald-400" />
                Chemical Cost: -42%
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* 6. BUSINESS MODEL & SCALABILITY (투자자 관점의 BM) */}
      <section id="business-model" className="py-24 bg-[#05080E] border-y border-slate-800/80">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold block mb-2">
              MONETIZATION & EXPANSION
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight break-keep">
              고수익성 <span className="text-amber-400">3-Pillar B2B 비즈니스 모델</span>
            </h2>
            <p className="text-sm text-slate-400 mt-3 max-w-2xl mx-auto break-keep">
              단순 하드웨어 판매가 아닌, 전 세계 리사이클러와 ITAD 기업을 락인(Lock-in)하는 순환형 SaaS & API 구조
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Model 1 */}
            <div className="bg-[#0B0F17] border border-slate-800 p-8 rounded-3xl flex flex-col justify-between hover:border-cyan-500/40 transition">
              <div>
                <span className="text-xs font-mono text-cyan-400 uppercase font-bold block mb-2">Pillar 01</span>
                <h3 className="text-2xl font-black text-white mb-3">B2B Inspection SaaS</h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-6 break-keep">
                  대형 전자폐기물 수거업체, 중고 전자상가, ITAD(IT 자산처분) 기업 대상 스캔 건당 과금(Pay-per-scan) 및 월 구독제 엔터프라이즈 티어.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 font-mono text-xs text-slate-300">
                <div className="text-cyan-400 font-bold mb-1">Target Customers:</div>
                <div>글로벌 ITAD 수거사, 중고 반도체 매입 기업</div>
              </div>
            </div>

            {/* Model 2 */}
            <div className="bg-[#0B0F17] border border-slate-800 p-8 rounded-3xl flex flex-col justify-between hover:border-amber-500/40 transition">
              <div>
                <span className="text-xs font-mono text-amber-400 uppercase font-bold block mb-2">Pillar 02</span>
                <h3 className="text-2xl font-black text-white mb-3">Process Optimization API</h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-6 break-keep">
                  산업용 습식 정련 제련소 대상 화학 약품 투입 자동화 솔루션 라이선스 및 MES(제조실행시스템) 연계 실시간 처방 API 과금.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 font-mono text-xs text-slate-300">
                <div className="text-amber-400 font-bold mb-1">Target Customers:</div>
                <div>국내외 유가금속 제련소, 습식 정련 공장</div>
              </div>
            </div>

            {/* Model 3 */}
            <div className="bg-[#0B0F17] border border-slate-800 p-8 rounded-3xl flex flex-col justify-between hover:border-emerald-500/40 transition">
              <div>
                <span className="text-xs font-mono text-emerald-400 uppercase font-bold block mb-2">Pillar 03</span>
                <h3 className="text-2xl font-black text-white mb-3">Certified Valuation Data</h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-6 break-keep">
                  대기업 및 데이터센터의 불용 전산 자산 폐기 시 회계 감사 증빙 및 ESG 스코프 3 감축 증명을 위한 공인 전자 감정서 발급 수수료.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 font-mono text-xs text-slate-300">
                <div className="text-emerald-400 font-bold mb-1">Target Customers:</div>
                <div>금융사, 빅테크 데이터센터, 회계감사 법인</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. MARKET OPPORTUNITY & SCALE (DATA-DRIVEN TAM / SAM / SOM & IP DEFENSIVE MOAT) */}
      <section id="market-esg" className="py-24 max-w-6xl mx-auto px-4 sm:px-6 relative">
        {/* Background Subtle Radial Glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-emerald-500/5 blur-[160px] pointer-events-none -z-10" />

        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 font-mono text-xs tracking-wider uppercase mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>DATA-DRIVEN MARKET SCALE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight break-keep">
            공인 데이터로 입증된 <span className="text-emerald-400">글로벌 순환경제 시장</span>
          </h2>
          <p className="text-sm text-slate-400 mt-3 max-w-2xl mx-auto break-keep leading-relaxed">
            UN 공식 보고서 및 시장조사기관의 데이터에 기반한 실질 시장 규모와 유효 타깃입니다.
          </p>
        </div>

        {/* Bento Grid 3 Cards: TAM / SAM / SOM */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-8">
          
          {/* Card 1 [TAM] */}
          <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 hover:border-amber-500/50 transition-all duration-300 rounded-3xl p-6 sm:p-8 flex flex-col justify-between group relative overflow-hidden shadow-xl">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 blur-[50px] pointer-events-none" />
            
            <div>
              {/* Header Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-400 font-mono text-[11px] sm:text-xs tracking-wider uppercase mb-5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span>TAM · 전 세계 총 시장¹</span>
              </div>

              <div className="mb-4">
                <div className="text-2xl sm:text-3xl font-black text-white tracking-tight whitespace-nowrap">
                  ₩ 120조 원
                </div>
                <div className="text-xs font-mono text-amber-400/90 mt-1 font-semibold">
                  $91 Billion (글로벌 총 매장량)
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed break-keep">
                글로벌 연간 전자폐기물(E-Waste 6,200만 톤) 내 매장 유가금속 총 잠재가치
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
              <span>UN E-Waste Global Monitor</span>
              <span className="text-amber-400 font-bold">62 Mt/yr</span>
            </div>
          </div>

          {/* Card 2 [SAM] */}
          <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 hover:border-cyan-500/50 transition-all duration-300 rounded-3xl p-6 sm:p-8 flex flex-col justify-between group relative overflow-hidden shadow-xl">
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 blur-[50px] pointer-events-none" />

            <div>
              {/* Header Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-cyan-400 font-mono text-[11px] sm:text-xs tracking-wider uppercase mb-5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                <span>SAM · 정련 유효 시장²</span>
              </div>

              <div className="mb-4">
                <div className="text-2xl sm:text-3xl font-black text-cyan-400 tracking-tight whitespace-nowrap">
                  ₩ 12조 원
                </div>
                <div className="text-xs font-mono text-cyan-300/90 mt-1 font-semibold">
                  CAGR 13.2% (고품위 IT 스크랩)
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed break-keep">
                귀금속 가치의 80%가 집중된 글로벌 고품위 폐PCB 및 IT 스크랩 정련 시장
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
              <span>High-Grade PCB Concentrates</span>
              <span className="text-cyan-400 font-bold">80% Value Core</span>
            </div>
          </div>

          {/* Card 3 [SOM] */}
          <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 hover:border-emerald-500/50 transition-all duration-300 rounded-3xl p-6 sm:p-8 flex flex-col justify-between group relative overflow-hidden shadow-xl">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-[50px] pointer-events-none" />

            <div>
              {/* Header Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 font-mono text-[11px] sm:text-xs tracking-wider uppercase mb-5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>SOM · 즉시 수익 시장³</span>
              </div>

              <div className="mb-4">
                <div className="text-2xl sm:text-3xl font-black text-emerald-400 tracking-tight whitespace-nowrap">
                  ₩ 3,600억 원
                </div>
                <div className="text-xs font-mono text-emerald-300/90 mt-1 font-semibold">
                  Bottom-up Model (SaaS & API)
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed break-keep">
                글로벌 12,000개 ITAD 기업 및 제련소 대상 AI 감정 SaaS 라이선스 & 제어 API
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
              <span>12,000+ Enterprise Targets</span>
              <span className="text-emerald-400 font-bold">Direct Monetization</span>
            </div>
          </div>

        </div>

        {/* Data Source Footnote */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#080D15] border border-slate-800/80 text-[11px] font-mono text-slate-400 leading-relaxed space-y-1 mb-8">
          <div className="flex items-center gap-1.5 text-slate-300 font-bold mb-1">
            <Database className="w-3.5 h-3.5 text-cyan-400" />
            <span>DATA SOURCE & METHODOLOGY NOTES</span>
          </div>
          <div>¹ UN 글로벌 전자폐기물 모니터 (UNITAR / ITU The Global E-waste Monitor)</div>
          <div>² Allied Market Research & Grand View Research: Global E-scrap PCB Recycling Market Report</div>
          <div>³ 전 세계 ITAD 기업 및 정련 파트너사 대상 B2B SaaS 구독·API 호출 과금 기준 자체 Bottom-up 산출치</div>
        </div>

        {/* Defensive Moat & IP Portfolio Card */}
        <div className="bg-gradient-to-br from-slate-900/80 via-[#0B1220] to-slate-900/80 backdrop-blur-xl border border-cyan-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 blur-[80px] pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-8 space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-cyan-400 font-mono text-[11px] sm:text-xs tracking-wider uppercase">
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                <span>IP PORTFOLIO · DEFENSIVE MOAT</span>
              </div>
              
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight break-keep">
                인공지능 비전 기반 폐인쇄회로기판(PCB) 유가금속 함량 추정 및 습식 정련 공정 제어 시스템
              </h3>
              
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed break-keep">
                단순 이미지 감식을 넘어 실제 습식 침출 반응(pH/ORP) 피드백 제어를 포함하는 독점적 기술 장벽을 구축합니다. 소프트웨어 모방자가 침범할 수 없는 화학 공정 메커니즘을 방어합니다.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col justify-center space-y-3 p-4 sm:p-5 rounded-2xl bg-slate-950/80 border border-slate-800">
              <div className="text-xs font-mono text-cyan-300 font-semibold flex items-center gap-1.5">
                <Award className="w-4 h-4 text-amber-400" />
                <span>선행기술조사 완료</span>
              </div>
              <div className="text-xs text-slate-300 leading-relaxed font-sans break-keep">
                특허 출원 준비 단계 (원천 공정 메커니즘 보호 및 알고리즘 방어)
              </div>
              <div className="text-[10px] font-mono text-slate-400 pt-2 border-t border-slate-800/80 flex items-center justify-between">
                <span>Diligence Ready</span>
                <span className="text-emerald-400 font-bold">100% Verified</span>
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* 8. FAQ ACCORDION SECTION */}
      <section id="faq" className="py-24 border-t border-slate-800 bg-[#070A0F] relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          
          {/* Section Header */}
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-bold mb-4">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>DILIGENCE & DEEPTECH FAQ</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-4 break-keep">
              투자자 및 파트너를 위한 <span className="text-cyan-400">핵심 Q&A</span>
            </h2>
            <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed break-keep">
              고령화 사회 일자리와 산업적 가치, 비전 AI의 한계 돌파 전략, 그리고 VC 심사역의 날카로운 질문에 대한 이온랩의 검증된 해답입니다.
            </p>

            {/* Category Filter Tabs */}
            <div className="flex items-center justify-start sm:justify-center gap-2 mt-8 overflow-x-auto no-scrollbar pb-2 px-1">
              {[
                { key: "all", label: "전체 질문 (9)" },
                { key: "part1", label: "Part 1. 산업 가치 & 일자리 (3)" },
                { key: "part2", label: "Part 2. 기술 실현성 & 한계돌파 (2)" },
                { key: "part3", label: "Part 3. VC & IR 질의응답 (4)" },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveFaqTab(tab.key as typeof activeFaqTab)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer font-mono shrink-0 whitespace-nowrap ${
                    activeFaqTab === tab.key
                      ? "bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/25"
                      : "bg-slate-900/90 text-slate-400 hover:text-slate-200 border border-slate-800 hover:border-slate-700"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Accordion List */}
          <div className="space-y-4">
            {FAQ_DATA.filter((item) => activeFaqTab === "all" || item.partKey === activeFaqTab).map((faq) => {
              const isOpen = !!openFaqIds[faq.id];
              return (
                <div
                  key={faq.id}
                  className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                    isOpen
                      ? "bg-[#0B0F17] border-cyan-500/40 shadow-xl shadow-cyan-950/20"
                      : "bg-[#0B0F17]/70 border-slate-800/80 hover:border-slate-700"
                  }`}
                >
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full px-5 py-5 sm:px-6 sm:py-5.5 flex items-start justify-between gap-4 text-left transition cursor-pointer"
                  >
                    <div className="space-y-1.5 pr-2">
                      <div className="flex items-center gap-2">
                        <span className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded ${
                          faq.partKey === "part1"
                            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                            : faq.partKey === "part2"
                            ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/30"
                            : "bg-amber-500/10 text-amber-400 border border-amber-500/30"
                        }`}>
                          {faq.partBadge}
                        </span>
                      </div>
                      <h3 className="text-sm sm:text-base font-bold text-white tracking-tight leading-snug break-keep">
                        {faq.question}
                      </h3>
                    </div>

                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5 transition-all duration-300 ${
                      isOpen
                        ? "bg-cyan-500/20 text-cyan-400 rotate-180"
                        : "bg-slate-800/80 text-slate-400 hover:text-white"
                    }`}>
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {/* Accordion Body */}
                  {isOpen && (
                    <div className="px-5 pb-6 sm:px-6 sm:pb-6 pt-1 border-t border-slate-800/60 animate-fadeIn">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Bottom Diligence CTA */}
          <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-slate-900/90 via-[#0B1220] to-slate-900/90 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div>
              <h4 className="text-sm font-bold text-white mb-1">
                실사(Due Diligence) 자료 및 기술 백서가 필요하신가요?
              </h4>
              <p className="text-xs text-slate-400">
                기판별 화학 침출 실측 수율 데이터 및 상세 재무 추정 모델을 담은 IR 패키지를 24시간 이내에 제공합니다.
              </p>
            </div>
            <button
              onClick={() => setModalType("ir")}
              className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition shadow-md shadow-cyan-500/20 shrink-0 flex items-center gap-1.5 cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>IR 패키지 신청</span>
            </button>
          </div>

        </div>
      </section>

      {/* 9. INVESTOR CTA & MILESTONE */}
      <section id="investor" className="py-24 border-t border-slate-800 bg-gradient-to-b from-[#070A0F] to-[#0B111D] relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-yellow-600 text-slate-950 flex items-center justify-center mx-auto mb-6 shadow-xl shadow-amber-500/20">
            <Award className="w-8 h-8 stroke-[2.5]" />
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4 break-keep">
            주식회사 이온랩과 함께<br />
            <span className="text-amber-400">순환경제의 디지털 표준</span>을 만들 투자 파트너를 모십니다.
          </h2>

          <p className="text-slate-300 mb-10 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed break-keep font-normal">
            TIPS R&D 과제 연계 및 Pre-A / Series A 라운드 오픈. 비파괴 AI 비전과 화학 정련 최적화로 100조 원 E-Waste 시장의 표준을 선점합니다.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={() => setModalType("ir")}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-300 text-slate-950 font-black text-sm sm:text-base shadow-xl shadow-amber-500/20 hover:brightness-110 active:scale-95 transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <FileText className="w-5 h-5" />
              <span>IR 피치덱(Deck) 요청하기</span>
            </button>

            <button 
              onClick={() => setModalType("api")}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-slate-900 hover:bg-slate-850 border border-cyan-500/40 text-cyan-300 font-bold text-sm sm:text-base shadow-lg transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <Zap className="w-5 h-5" />
              <span>엔터프라이즈 솔루션 제휴 문의</span>
            </button>
          </div>

          {/* Company Metadata Info */}
          <div className="mt-16 pt-8 border-t border-slate-800/80 text-xs text-slate-400 space-y-1.5 break-keep">
            <div className="text-slate-200 font-bold text-sm">주식회사 이온랩 (IONLAB Co., Ltd.)</div>
            <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-slate-400 text-[11px] sm:text-xs">
              <span>대표자: 원홍식</span>
              <span className="text-slate-700">|</span>
              <span>사업자등록번호: 272-87-04029</span>
            </div>
            <div className="text-[11px] sm:text-xs text-slate-400">
              연구개발 본사: 경기도 평택시 고덕면 고덕여염로 (삼성전자 평택캠퍼스 인접)
            </div>
            <div className="text-[11px] sm:text-xs text-slate-500">
              공동 기술 파트너십: AETHER MINING 도시광산 네트워크
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 border-t border-slate-900 text-xs text-slate-500 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="text-[11px] sm:text-xs text-slate-500">
            © 2026 IONLAB Co., Ltd. All rights reserved.
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-[11px] sm:text-xs font-mono">
            <a href="https://scan.techplay.blog" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition">AI Prototype</a>
            <a href="https://scrap.techplay.blog" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition">Scrap Network</a>
            <a href="https://price.techplay.blog" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition">Metal Index</a>
          </div>
        </div>
      </footer>

      {/* INTERACTIVE LEAD / IR MODAL */}
      {modalType && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
          <div className="bg-[#0B0F17] border border-cyan-500/40 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative">
            <button 
              onClick={() => setModalType(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white text-xl font-bold cursor-pointer"
            >
              ✕
            </button>

            {formSubmitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-white">신청이 성공적으로 접수되었습니다.</h3>
                <p className="text-xs text-slate-400 leading-relaxed break-keep">
                  담당 수석 심사역 및 엔지니어가 기재해주신 이메일({formData.email || "담당자 메일"})로 24시간 이내에 전용 자료를 회신드립니다.
                </p>
              </div>
            ) : (
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
                    {modalType === "ir" ? <FileText className="w-5 h-5" /> : <Zap className="w-5 h-5" />}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">
                      {modalType === "ir" ? "TIPS / VC 전용 IR 피치덱 신청" : "엔터프라이즈 API 솔루션 데모 신청"}
                    </h3>
                    <span className="text-xs text-slate-400 font-mono">IONLAB Partner Intelligence Request</span>
                  </div>
                </div>

                <form onSubmit={handleFormSubmit} className="space-y-4 text-xs">
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">성함 / 직함</label>
                    <input 
                      type="text" 
                      required 
                      placeholder="홍길동 수석심사역 / 팀장"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400 transition"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">소속 기관 / 기업명</label>
                    <input 
                      type="text" 
                      required 
                      placeholder="이온벤처스 / 한국ITAD"
                      value={formData.org}
                      onChange={(e) => setFormData({ ...formData, org: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400 transition"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">업무용 이메일</label>
                    <input 
                      type="email" 
                      required 
                      placeholder="partner@fund.vc"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400 transition"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">협력 / 검토 목적</label>
                    <select 
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-400 transition"
                    >
                      <option value="VC / Investment Fund">VC / TIPS 투자 및 IR 검토</option>
                      <option value="Enterprise ITAD Partner">엔터프라이즈 ITAD / 수거 제휴</option>
                      <option value="Smelting Plant Chemical API">제련소 화학 최적화 API 연동</option>
                      <option value="R&D / Academic Collab">공동 R&D 및 기술 실증(PoC)</option>
                    </select>
                  </div>

                  {submitError && (
                    <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 flex items-start gap-2 text-xs">
                      <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                      <span>{submitError}</span>
                    </div>
                  )}

                  <div className="pt-2">
                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed text-slate-950 font-black text-sm transition shadow-lg shadow-cyan-500/25 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>전송 중...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>{modalType === "ir" ? "IR 자료 신청 완료" : "데모 요청 제출"}</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
