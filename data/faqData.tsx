import React from "react";

export interface FaqItem {
  id: string;
  partBadge: string;
  question: string;
  answer: React.ReactNode;
}

export const FAQ_DATA: FaqItem[] = [
  {
    id: "q1",
    partBadge: "01 · 채산성 & 인건비 극복",
    question: "Q. 고임금 국가인 한국에서 수작업 분해로 실제 채산성이 나오나요?",
    answer: (
      <div className="p-4 sm:p-5 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-300 leading-relaxed text-xs sm:text-sm font-sans space-y-3.5 break-keep">
        <p className="text-white font-medium sm:text-base leading-relaxed">
          &ldquo;기판 전체를 분해하지 않고, 귀금속의 90%가 집중된 상위 5% 면적(골드핑거, 고밀도 BGA)만 10초 만에 핀포인트로 탈거하는 <strong className="text-cyan-400 font-semibold">선별적 국소 추출(Selective Harvesting)</strong> 기술을 적용합니다. 여기에 기판 내 구리·철 등 방해 금속을 사전 역산하여 화학 약품비를 42% 절감함으로써, 고임금 구조에서도 높은 공정 마진율을 달성합니다.&rdquo;
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1 text-xs">
          <div className="p-3 rounded-lg bg-slate-950 border border-cyan-500/25">
            <span className="text-cyan-400 font-bold block mb-1">상위 5% 핀포인트 탈거 (10초)</span>
            <span className="text-slate-400">골드핑거 및 고밀도 BGA에 집중하여 수작업 공수 90% 감축</span>
          </div>
          <div className="p-3 rounded-lg bg-slate-950 border border-emerald-500/25">
            <span className="text-emerald-400 font-bold block mb-1">화학 약품비 -42% 절감</span>
            <span className="text-slate-400">구리·철 등 방해 금속 역산으로 질산/왕수 낭비 원천 차단</span>
          </div>
        </div>
      </div>
    )
  },
  {
    id: "q2",
    partBadge: "02 · 비전 한계 극복 & 빅테크 대비 독점 해자(Moat)",
    question: "Q. 테슬라처럼 비전 카메라만으로 기판 내부 금속까지 감정이 가능한가요? 빅테크가 모방할 위험은 없나요?",
    answer: (
      <div className="p-4 sm:p-5 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-300 leading-relaxed text-xs sm:text-sm font-sans space-y-3.5 break-keep">
        <p className="text-white font-medium sm:text-base leading-relaxed">
          &ldquo;외관 마킹과 칩셋 규격 인식에 실제 정련 현장에서 축적된 모델별 통계 수율 라이브러리(D1 DB)를 결합하여 비가시 영역의 오차를 ±3~5% 이내로 보정하는 <strong className="text-cyan-400 font-semibold">하이브리드 파이프라인</strong>을 사용합니다.&rdquo;
        </p>
        <div className="p-3.5 rounded-lg bg-slate-950 border border-amber-500/25 text-xs sm:text-[13px] text-slate-300 leading-relaxed">
          &ldquo;빅테크는 부품을 &lsquo;단순 물체&rsquo;로 인식할 뿐, 실제로 왕수에 녹였을 때의 침출 수율 데이터를 가지고 있지 않습니다. <strong className="text-amber-300 font-semibold">현장 화학 공정 데이터와 결합된 도메인 특화 데이터셋</strong>이 당사의 대체 불가능한 기술 장벽입니다.&rdquo;
        </div>
      </div>
    )
  },
  {
    id: "q3",
    partBadge: "03 · 산업의 비밀 & 왜 지금까지 없었는가 (Why Now)",
    question: "Q. 이렇게 가치 있는 도시광산 플랫폼이 왜 지금까지 시장에 없었습니까?",
    answer: (
      <div className="p-4 sm:p-5 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-300 leading-relaxed text-xs sm:text-sm font-sans space-y-3 break-keep">
        <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800">
          <strong className="text-rose-400 block mb-1 font-semibold flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
            첫째, 정보 비대칭이 기존 업계의 주 마진원
          </strong>
          <p className="text-slate-400 text-xs sm:text-[13px]">
            부품의 가치를 모르는 배출자로부터 헐값에 매입하던 &lsquo;정보 비대칭&rsquo;이 기존 스크랩 유통업계의 주 마진원이었기 때문에 자발적인 투명화와 디지털 혁신이 불가능했습니다.
          </p>
        </div>
        <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800">
          <strong className="text-rose-400 block mb-1 font-semibold flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
            둘째, 이종 산업 간의 극단적 단절
          </strong>
          <p className="text-slate-400 text-xs sm:text-[13px]">
            IT/AI 개발자는 화학 침출 현장을 모르고, 현장 정련 기술자는 컴퓨터 비전과 클라우드를 모르는 이종 산업 간의 극단적 단절로 인해 양쪽 도메인을 융합한 팀이 시장에 전무했습니다.
          </p>
        </div>
      </div>
    )
  },
  {
    id: "q4",
    partBadge: "04 · 제련소 파트너십 & 상생 모델",
    question: "Q. 고려아연 같은 대규모 전통 제련소와 직접 경쟁하는 구조인가요?",
    answer: (
      <div className="p-4 sm:p-5 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-300 leading-relaxed text-xs sm:text-sm font-sans space-y-3 break-keep">
        <p className="text-white font-medium sm:text-base leading-relaxed">
          &ldquo;경쟁이 아닌 상호보완적 파트너십 관계입니다. 대형 용광로는 수천 톤 단위 일괄 처리에 특화되어 있어, 소량 다품종 폐기판의 정밀 선별과 품위 감정이 불가능합니다.&rdquo;
        </p>
        <p className="text-xs sm:text-[13px] text-slate-400 leading-relaxed">
          &ldquo;이온랩은 분산된 고품위 E-Waste를 파쇄 전 비파괴 진단하여 고순도 원료로 공급하는 <strong className="text-cyan-300 font-semibold">상위 밸류체인의 데이터 게이트키퍼</strong> 역할을 수행합니다.&rdquo;
        </p>
      </div>
    )
  },
  {
    id: "q5",
    partBadge: "05 · 중장기 로드맵 & 글로벌 표준화",
    question: "Q. 주식회사 이온랩의 중장기 플랫폼 확장 로드맵은 어떻게 되나요?",
    answer: (
      <div className="p-4 sm:p-5 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-300 leading-relaxed text-xs sm:text-sm font-sans space-y-3.5 break-keep">
        <p className="text-white font-medium sm:text-base leading-relaxed">
          &ldquo;1단계로 국내 ITAD 및 고품위 통신/서버 PCB 시장에서 비전 검증 레퍼런스를 확립하고, 2단계로 전국 단위 폐자원 유통 데이터를 집계하는 클라우드 SaaS로 확장합니다. 궁극적으로는 글로벌 순환경제 규제(EU 디지털 제품 여권, DPP) 기준을 충족하는 글로벌 E-Waste 표준 가치평가 및 원료 추적 데이터 인프라로 도약할 것입니다.&rdquo;
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 text-xs">
          <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
            <span className="text-cyan-400 font-bold block mb-1">Phase 1: 레퍼런스 확립</span>
            <span className="text-slate-400">국내 ITAD 및 통신/서버 PCB 시장 비전 검증</span>
          </div>
          <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
            <span className="text-amber-400 font-bold block mb-1">Phase 2: 클라우드 인프라</span>
            <span className="text-slate-400">전국 폐자원 유통 데이터 집계 및 클라우드 SaaS</span>
          </div>
          <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
            <span className="text-emerald-400 font-bold block mb-1">Phase 3: 글로벌 표준화</span>
            <span className="text-slate-400">EU 디지털 제품 여권(DPP) 충족 및 원료 추적 인프라</span>
          </div>
        </div>
      </div>
    )
  }
];
