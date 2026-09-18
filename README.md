# IONLAB - URBAN MINING AI (scan.techplay.blog)

폐기판(PCB) 사진 한 장으로 3초 만에 숨겨진 순금·귀금속 가치를 찾아내고 최적 정련 가이드를 제공하는 비전 AI 플랫폼 랜딩 페이지.

## 🚀 기술 스택
- **Framework**: Next.js 15+ (App Router, Static Export)
- **UI & Icons**: React 19, Tailwind CSS, Lucide React
- **Deployment & Edge**: Cloudflare Pages / Workers, Wrangler CLI
- **Package Manager**: pnpm

## 📦 시작하기

### 1. 패키지 설치
```bash
pnpm install
```

### 2. 로컬 개발 서버 실행
```bash
pnpm run dev
```
브라우저에서 `http://localhost:3000`을 엽니다.

### 3. Cloudflare Pages 로컬 프리뷰 (Wrangler)
```bash
pnpm run preview
```
정적 사이트 빌드 후 `wrangler pages dev out`을 통해 Cloudflare 엣지 런타임 환경에서 미리보기를 실행합니다.

### 4. Cloudflare Pages 실제 배포 (Wrangler Deploy)
```bash
# Cloudflare 계정 로그인 (최초 1회)
pnpm exec wrangler login

# Pages에 배포
pnpm run deploy
```

## 📁 주요 디렉토리 구조
- `app/`: Next.js App Router (루트 레이아웃, 메타데이터, 글로벌 CSS)
- `components/`:
  - `UrbanMiningLanding.tsx`: 인터랙티브 비전 스캐너, 바운딩 박스 오버레이, 실시간 KRX/LME 티커, 대량 스크랩 자산 계산기
- `functions/api/`: Cloudflare Pages Functions (실시간 귀금속 시세 API 등 엣지 백엔드)
- `wrangler.toml`: Cloudflare Pages 배포 설정
