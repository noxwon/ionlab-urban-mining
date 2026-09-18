import React from "react";

export interface FaqItem {
  id: string;
  partKey: "part1" | "part2" | "part3";
  partBadge: string;
  partTitle: string;
  question: string;
  answer: React.ReactNode;
}

export const FAQ_DATA: FaqItem[] = [
  // [Part 1] 산업적 가치 & 사회적 지속가능성
  {
    id: "q1",
    partKey: "part1",
    partBadge: "Part 1. 산업 가치 & 일자리",
    partTitle: "산업적 가치 & 사회적 지속가능성",
    question: "Q1. 고령화 사회에서 실제 일자리 창출이 가능한 모델인가요?",
    answer: (
      <div className="space-y-3 text-slate-300 leading-relaxed text-xs sm:text-sm font-sans">
        <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800">
          <strong className="text-cyan-400 block mb-1 font-semibold flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            초보자도 가능한 디지털 선별 작업
          </strong>
          <p className="text-slate-400 text-xs sm:text-[13px] break-keep">
            기존 폐기판 감정은 20년 경력자의 &lsquo;직관&rsquo;에 의존했으나, AI 스캐너가 도입되면 스마트폰 화면의 가이드(초록/빨강 박스)를 보고 단순 분류, 나사 해체, 부품 탈거만 진행하면 됩니다.
          </p>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800">
          <strong className="text-amber-400 block mb-1 font-semibold flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            시니어 분산 수거 거점 (마이크로 허브)
          </strong>
          <p className="text-slate-400 text-xs sm:text-[13px] break-keep">
            노인 복지관, 지자체 재활용 센터와 연계하여 폐가전 분해 및 1차 AI 스캐닝 작업을 시니어 일자리로 표준화할 수 있습니다. 노동 강도는 낮고, AI가 가치 측정을 대신하므로 숙련도 격차가 사라집니다.
          </p>
        </div>
      </div>
    )
  },
  {
    id: "q2",
    partKey: "part1",
    partBadge: "Part 1. 산업 가치 & 일자리",
    partTitle: "산업적 가치 & 사회적 지속가능성",
    question: "Q2. 왜 지금까지 이런 플랫폼이나 사업이 없었습니까?",
    answer: (
      <div className="space-y-3 text-slate-300 leading-relaxed text-xs sm:text-sm font-sans">
        <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800">
          <strong className="text-rose-400 block mb-1 font-semibold flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
            1. 정보 비대칭이 곧 기존 업계의 마진이었기 때문
          </strong>
          <p className="text-slate-400 text-xs sm:text-[13px] break-keep">
            중간 수거상과 폐기물 브로커는 부품의 진짜 가치를 모르는 배출자로부터 헐값에 매입해 제련소에 넘기는 마진 구조를 취해왔습니다. 투명한 공개는 이들의 기득권을 위협하므로 내부 혁신이 불가능했습니다.
          </p>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800">
          <strong className="text-rose-400 block mb-1 font-semibold flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
            2. 이종 산업 간의 극단적 단절
          </strong>
          <p className="text-slate-400 text-xs sm:text-[13px] break-keep">
            IT/AI 개발자는 화학 침출 공정과 유독가스 중화 현장을 모르고, 반대로 현장 정련 기술자는 컴퓨터 비전과 클라우드 아키텍처를 모릅니다. 양쪽 도메인을 결합한 팀이 시장에 전무했습니다.
          </p>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800">
          <strong className="text-rose-400 block mb-1 font-semibold flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
            3. &lsquo;정답 데이터(Ground Truth)&rsquo;의 부재
          </strong>
          <p className="text-slate-400 text-xs sm:text-[13px] break-keep">
            사진을 찍는 것만으로는 부족하며, &ldquo;이 기판을 실제로 왕수에 녹였을 때 순금이 몇 그램 나왔는가&rdquo;에 대한 물리적 정련 결과 데이터셋이 축적되어 있지 않았습니다.
          </p>
        </div>
      </div>
    )
  },
  {
    id: "q3",
    partKey: "part1",
    partBadge: "Part 1. 산업 가치 & 일자리",
    partTitle: "산업적 가치 & 사회적 지속가능성",
    question: "Q3. 이 사업은 왜 중요하며, 정말 지속가능한 가치가 있습니까?",
    answer: (
      <div className="space-y-3 text-slate-300 leading-relaxed text-xs sm:text-sm font-sans">
        <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800">
          <strong className="text-amber-400 block mb-1 font-semibold flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            천연 광산의 고갈과 품위 저하 (최대 수십 배 고품위)
          </strong>
          <p className="text-slate-400 text-xs sm:text-[13px] break-keep">
            금광석 1톤을 채굴하면 순금 약 5g을 얻지만, <strong className="text-white">스마트폰/서버 폐기판 1톤에서는 순금 150~400g, 은 1~3kg, 팔라듐 수십 그램</strong>이 나옵니다. 도시광산의 광물 품위는 천연 광산의 수십 배에 달합니다.
          </p>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800">
          <strong className="text-emerald-400 block mb-1 font-semibold flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            자원 안보 및 탄소 80% 이상 절감
          </strong>
          <p className="text-slate-400 text-xs sm:text-[13px] break-keep">
            희소금속 채굴 시 발생하는 탄소와 환경 파괴를 80% 이상 줄이며, 전량 수입에 의존하는 핵심 광물(Au, Ag, Pd, Cu)을 국내 폐자원에서 회수하는 국판 자원순환 인프라가 됩니다.
          </p>
        </div>
      </div>
    )
  },

  // [Part 2] 기술 실현 가능성 & 비전 AI의 한계 돌파
  {
    id: "q4",
    partKey: "part2",
    partBadge: "Part 2. 기술 실현성 & 한계돌파",
    partTitle: "기술 실현 가능성 & 비전 AI의 한계 돌파",
    question: "Q4. 테슬라가 비전만으로 자율주행을 하듯, PCB/칩 분석도 비전만으로 가능한가요?",
    answer: (
      <div className="space-y-3 text-slate-300 leading-relaxed text-xs sm:text-sm font-sans">
        <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800">
          <strong className="text-cyan-400 block mb-1 font-semibold">
            [가능한 영역] 표면 식별과 규격 역산
          </strong>
          <p className="text-slate-400 text-xs sm:text-[13px] mb-2 break-keep">
            카메라로 칩셋의 마킹(Part Number), 폼팩터 규격(BGA, QFP 등), 골드핑거 도금 면적, MLCC 적층 캐패시터 수를 식별하는 것은 비전 AI의 최적 영역입니다.
          </p>
          <p className="text-slate-400 text-xs sm:text-[13px] break-keep">
            표준 규격 데이터베이스(JEDEC 등) 및 제조사 데이터시트와 연동하면 부품당 평균 금선(Bonding Wire) 수량과 도금 두께를 정밀하게 역산할 수 있습니다.
          </p>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800">
          <strong className="text-amber-400 block mb-1 font-semibold">
            [비전 단독의 한계] 보이지 않는 내부
          </strong>
          <p className="text-slate-400 text-xs sm:text-[13px] break-keep">
            다층 기판(Multi-layer PCB) 내부의 구리 배선 층수나 단종 부품의 내부 합금비는 외부 카메라로 투시할 수 없습니다.
          </p>
        </div>

        <div className="p-3.5 rounded-xl bg-cyan-950/40 border border-cyan-500/40">
          <strong className="text-cyan-300 block mb-1 font-bold flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            [이온랩의 해결책] Vision + Statistical DB 하이브리드 파이프라인
          </strong>
          <p className="text-slate-300 text-xs sm:text-[13px] break-keep">
            테슬라가 카메라 영상에 차량 동역학 물리 모델을 결합하듯, 당사는 <strong className="text-white">&lsquo;비전 인식 ➔ 기판 모델별 통계 수율 라이브러리(D1 DB) ➔ 화학 레시피 도출&rsquo;</strong>의 하이브리드 파이프라인으로 내부 비가시 영역의 오차를 <span className="text-cyan-400 font-mono font-bold">&plusmn;3~5% 이내</span>로 보정합니다.
          </p>
        </div>
      </div>
    )
  },
  {
    id: "q5",
    partKey: "part2",
    partBadge: "Part 2. 기술 실현성 & 한계돌파",
    partTitle: "기술 실현 가능성 & 비전 AI의 한계 돌파",
    question: "Q5. 이 사업의 가장 큰 단점과 기술적·운영적 난제는 무엇입니까?",
    answer: (
      <div className="space-y-3 text-slate-300 leading-relaxed text-xs sm:text-sm font-sans">
        <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800">
          <strong className="text-slate-200 block mb-1 font-semibold text-xs sm:text-sm">
            ① 표면 오염 및 파손 스크랩 (탄 기판, 부식 등)
          </strong>
          <p className="text-slate-400 text-xs sm:text-[13px] break-keep">
            <span className="text-cyan-400 font-semibold">[대응]</span> AI가 인식 불가 영역에 대해 <strong className="text-white">&lsquo;불확실성 지수(Confidence Score)&rsquo;</strong>를 산출하고, 보수적 안전 마진(Safety Margin)을 적용하여 감정가를 방어합니다.
          </p>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800">
          <strong className="text-slate-200 block mb-1 font-semibold text-xs sm:text-sm">
            ② 스크랩 수급 물량(Sourcing)의 불규칙성
          </strong>
          <p className="text-slate-400 text-xs sm:text-[13px] break-keep">
            <span className="text-cyan-400 font-semibold">[대응]</span> 직접 수거에만 매달리지 않고, 전국 폐기물 집하장 및 ITAD(IT자산처분) 기업에 <strong className="text-white">&lsquo;AI 감정 진단 SaaS&rsquo;</strong>를 먼저 공급하여 데이터를 락인(Lock-in)하는 자산 경량화(Asset-Light) 전략을 취합니다.
          </p>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800">
          <strong className="text-slate-200 block mb-1 font-semibold text-xs sm:text-sm">
            ③ 화학 공정 환경 규제 (화관법, 폐기물관리법 등)
          </strong>
          <p className="text-slate-400 text-xs sm:text-[13px] break-keep">
            <span className="text-cyan-400 font-semibold">[대응]</span> 초기에는 검증된 인허가 인프라 파트너와의 협업(MOU) 및 기존 정련 공장에 최적화 레시피 알고리즘을 공급하는 방식으로 규제 리스크를 우회합니다.
          </p>
        </div>
      </div>
    )
  },

  // [Part 3] VC/투자 심사역 관점의 날카로운 질문 (Tough Questions)
  {
    id: "q6",
    partKey: "part3",
    partBadge: "Part 3. VC & IR 질의응답",
    partTitle: "VC/투자 심사역 관점의 날카로운 질문",
    question: "Q6. [Moat/해자] 구글이나 빅테크가 비전 모델을 고도화하면 이온랩의 기술은 무력화되는 것 아닌가요?",
    answer: (
      <div className="p-4 rounded-xl bg-slate-900/90 border border-cyan-500/30 text-slate-300 leading-relaxed text-xs sm:text-sm font-sans space-y-2 break-keep">
        <p>
          &ldquo;비전 모델 자체는 오픈소스화될 수 있지만, <strong className="text-cyan-300">&lsquo;어떤 칩셋에서 실제 몇 그램의 금속이 침출되는가&rsquo;를 검증한 화학 반응 실측 데이터셋은 빅테크가 가지고 있지 않습니다.</strong>&rdquo;
        </p>
        <p className="text-slate-400 text-xs sm:text-[13px]">
          빅테크는 기판의 칩을 &lsquo;물체&rsquo;로 인식할 뿐, 그 안의 귀금속 품위와 질산/왕수 반응 수율을 알 수 없습니다. 현장 습식 공정 데이터와 결합된 <strong className="text-white">도메인 특화 데이터 파이프라인</strong>이 당사의 대체 불가능한 핵심 해자입니다.
        </p>
      </div>
    )
  },
  {
    id: "q7",
    partKey: "part3",
    partBadge: "Part 3. VC & IR 질의응답",
    partTitle: "VC/투자 심사역 관점의 날카로운 질문",
    question: "Q7. [Scalability/확장성] 결국 오프라인 화학 공장이 돌아가야 하는데, 일반 IT 스타트업처럼 빠른 스케일업이 가능한가요?",
    answer: (
      <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-300 leading-relaxed text-xs sm:text-sm font-sans space-y-3 break-keep">
        <p className="text-white font-semibold">
          &ldquo;이온랩은 모든 지역에 공장을 직접 짓는 전통 제조업 모델을 지향하지 않습니다.&rdquo;
        </p>
        <div className="space-y-2 text-xs sm:text-[13px]">
          <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
            <strong className="text-cyan-400">· 글로벌 ITAD 기업 및 대형 수거업체:</strong> 감정 건당 과금 및 월 구독형 B2B SaaS 제공
          </div>
          <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
            <strong className="text-amber-400">· 기존 폐기물 정련 공장:</strong> 화학 약품비를 42% 절감해 주는 공정 최적화 알고리즘 라이선싱
          </div>
        </div>
        <p className="text-slate-400 text-xs sm:text-[13px]">
          이처럼 <strong className="text-slate-200">소프트웨어와 핵심 데이터 라이선싱을 중심으로 확장</strong>하므로 막대한 설비 투자(Capex) 없이 글로벌 확장이 가능합니다.
        </p>
      </div>
    )
  },
  {
    id: "q8",
    partKey: "part3",
    partBadge: "Part 3. VC & IR 질의응답",
    partTitle: "VC/투자 심사역 관점의 날카로운 질문",
    question: "Q8. [Revenue Model] 정확한 수익 모델과 객단가는 어떻게 구성됩니까?",
    answer: (
      <div className="space-y-2 text-slate-300 leading-relaxed text-xs sm:text-sm font-sans">
        <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800">
          <strong className="text-cyan-400 block mb-0.5 font-semibold">
            1. SaaS 구독료 / API 호출 과금
          </strong>
          <p className="text-slate-400 text-xs sm:text-[13px] break-keep">
            ITAD 기업의 자산 평가 시 대량 스캔 건당 API 수수료 및 월 구독료 (Tier별 차등 요금제).
          </p>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800">
          <strong className="text-amber-400 block mb-0.5 font-semibold">
            2. 공인 전자 감정서 발급 수수료
          </strong>
          <p className="text-slate-400 text-xs sm:text-[13px] break-keep">
            중고 매각 및 대기업 폐기 자산 회계 증빙, ESG 스코프 3 감사를 위한 공인 감정서 발급비.
          </p>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800">
          <strong className="text-emerald-400 block mb-0.5 font-semibold">
            3. 정련 최적화 파트너십 마진 쉐어
          </strong>
          <p className="text-slate-400 text-xs sm:text-[13px] break-keep">
            제련소와 공동 정련 시 공정 수율 개선에 따른 잉여 귀금속(Au/Ag/Pd) 분배 수익.
          </p>
        </div>
      </div>
    )
  },
  {
    id: "q9",
    partKey: "part3",
    partBadge: "Part 3. VC & IR 질의응답",
    partTitle: "VC/투자 심사역 관점의 날카로운 질문",
    question: "Q9. [Exit Strategy] 투자금 회수(Exit) 시나리오는 무엇인가요?",
    answer: (
      <div className="space-y-2.5 text-slate-300 leading-relaxed text-xs sm:text-sm font-sans">
        <div className="p-3.5 rounded-xl bg-slate-900/90 border border-amber-500/30">
          <strong className="text-amber-300 block mb-1 font-semibold flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            전략적 M&A (1차 타깃)
          </strong>
          <p className="text-slate-400 text-xs sm:text-[13px] break-keep">
            폐배터리/전자폐기물 리사이클링에 사운을 걸고 있는 대기업(<strong className="text-white">고려아연, 포스코홀딩스, SK에코플랜트, 에코프로 등</strong>)에 공급망 가치평가 및 원료 소싱 플랫폼으로 인수합병되는 시나리오.
          </p>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-900/90 border border-cyan-500/30">
          <strong className="text-cyan-300 block mb-1 font-semibold flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            IPO (2차 타깃)
          </strong>
          <p className="text-slate-400 text-xs sm:text-[13px] break-keep">
            자원순환 의무화 및 공급망 실사법(EU 규제) 도입에 맞춰 글로벌 E-Waste 표준 데이터 플랫폼으로 <strong className="text-white">코스닥 기술특례 상장</strong>.
          </p>
        </div>
      </div>
    )
  }
];
