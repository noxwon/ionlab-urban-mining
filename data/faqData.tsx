import React from "react";

export interface FaqItem {
  id: string;
  partKey: "strategy" | "technology" | "partnership" | "vision";
  partBadge: string;
  question: string;
  answer: React.ReactNode;
}

export const FAQ_DATA: FaqItem[] = [
  {
    id: "q1",
    partKey: "strategy",
    partBadge: "01 · 채산성 & 인건비 극복",
    question: "Q1. 고임금 국가인 한국에서 수작업 분해로 실제 채산성이 나오나요?",
    answer: (
      <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-300 leading-relaxed text-xs sm:text-sm font-sans space-y-3 break-keep">
        <p className="text-white font-semibold">
          &ldquo;기판 전체를 분해하지 않고 AI가 지목한 고품위 부품만 10초 만에 탈거하는 &lsquo;선별적 국소 추출(Selective Harvesting)&rsquo;과, 기판 내 구리·철 등 방해 금속을 사전 계산해 화학 약품비를 42% 절감함으로써 고임금 환경에서도 높은 공정 마진율을 확보합니다.&rdquo;
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 text-xs">
          <div className="p-3 rounded-lg bg-slate-950 border border-cyan-500/20">
            <span className="text-cyan-400 font-bold block mb-1">선별적 국소 추출 (10초)</span>
            <span className="text-slate-400">골드핑거, BGA, MLCC 등 상위 5% 면적에 집중하여 15분의 수작업 공수를 90% 이상 감축</span>
          </div>
          <div className="p-3 rounded-lg bg-slate-950 border border-emerald-500/20">
            <span className="text-emerald-400 font-bold block mb-1">화학 약품비 -42%</span>
            <span className="text-slate-400">방해 금속(Cu, Fe, Ni) 비율 역산을 통해 질산/왕수 낭비를 원천 차단하고 순환 공정 마진 극대화</span>
          </div>
        </div>
      </div>
    )
  },
  {
    id: "q2",
    partKey: "technology",
    partBadge: "02 · 비전 한계 극복 파이프라인",
    question: "Q2. 테슬라처럼 비전(Vision) 카메라만으로 기판 내부의 금속까지 감정이 가능한가요?",
    answer: (
      <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-300 leading-relaxed text-xs sm:text-sm font-sans space-y-3 break-keep">
        <p className="text-white font-semibold">
          &ldquo;외관 마킹과 칩셋 규격 인식에 실제 정련 현장에서 축적된 모델별 통계 수율 라이브러리(D1 DB)를 결합하여 비가시 영역의 오차를 ±3~5% 이내로 보정하는 하이브리드 추론 파이프라인을 사용합니다.&rdquo;
        </p>
        <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-400 space-y-1.5">
          <div className="flex items-center gap-2 text-cyan-300 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <span>표면 비전 식별 (Part Number, 폼팩터 규격, 골드핑거 도금 면적 식별)</span>
          </div>
          <div className="flex items-center gap-2 text-amber-300 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            <span>화학 반응 실측 통계 DB 매핑 (실제 습식 정련 침출 수율 기반 비가시 영역 오차 보정)</span>
          </div>
        </div>
      </div>
    )
  },
  {
    id: "q3",
    partKey: "partnership",
    partBadge: "03 · 제련소 파트너십 & 모트",
    question: "Q3. 고려아연 같은 대기업 제련소와 직접 경쟁하는 구조인가요?",
    answer: (
      <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-300 leading-relaxed text-xs sm:text-sm font-sans space-y-3 break-keep">
        <p className="text-white font-semibold">
          &ldquo;경쟁이 아닌 상호보완적 파트너십 관계입니다. 대형 용광로는 소량 다품종 폐기판의 정밀 선별 감정이 불가능합니다. 이온랩은 분산된 E-Waste의 가치를 디지털로 표준화하여 고품위 원료를 선별 공급하는 데이터 게이트키퍼 역할을 수행합니다.&rdquo;
        </p>
        <p className="text-xs text-slate-400">
          대형 제련소는 대규모 일괄 용융에 특화되어 있어 수거 단계의 품위 보증과 샘플링에 막대한 비용과 시간이 소요됩니다. 이온랩은 파쇄 전 사전 진단된 고품위 원료와 공정 레시피를 제휴 공급함으로써 제련소의 회수 수율을 극대화합니다.
        </p>
      </div>
    )
  },
  {
    id: "q4",
    partKey: "vision",
    partBadge: "04 · 중장기 로드맵 & 표준화",
    question: "Q4. 주식회사 이온랩의 중장기 플랫폼 확장 로드맵은 어떻게 되나요?",
    answer: (
      <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-300 leading-relaxed text-xs sm:text-sm font-sans space-y-3 break-keep">
        <p className="text-white font-semibold">
          &ldquo;1단계로 국내 ITAD 및 서버/통신 PCB 시장에서 비전 검증 레퍼런스를 확립하고, 2단계로 전국 단위 폐자원 유통 데이터를 집계하는 클라우드 인프라로 확장합니다. 궁극적으로는 글로벌 순환경제 규제(EU 디지털 제품 여권, DPP) 기준을 충족하는 글로벌 E-Waste 표준 가치평가 및 원료 추적 데이터 플랫폼으로 도약하여 국가 핵심 광물 자립 생태계를 완성하는 것을 목표로 합니다.&rdquo;
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 text-xs">
          <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
            <span className="text-cyan-400 font-bold block mb-1">Phase 1: 레퍼런스 확립</span>
            <span className="text-slate-400">국내 ITAD 및 서버/통신 PCB 시장 비전 검증</span>
          </div>
          <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
            <span className="text-amber-400 font-bold block mb-1">Phase 2: 클라우드 인프라</span>
            <span className="text-slate-400">전국 폐자원 유통 데이터 집계 및 SaaS 공급</span>
          </div>
          <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
            <span className="text-emerald-400 font-bold block mb-1">Phase 3: 글로벌 표준화</span>
            <span className="text-slate-400">EU 디지털 제품 여권(DPP) 충족 및 자원안보 생태계</span>
          </div>
        </div>
      </div>
    )
  }
];
