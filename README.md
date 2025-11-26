# Payment Dashboard

결제 데이터 관리를 위한 대시보드 애플리케이션

## 기술 스택

- **프레임워크**: React 19.2.0 + TypeScript
- **빌드 도구**: Vite 7.2.4
- **라우팅**: React Router DOM 7.9.6
- **스타일링**: Tailwind CSS 4.1.17

## 사용한 CSS 프레임워크 및 라이브러리

### Tailwind CSS

- **출처**: https://tailwindcss.com
- **버전**: 4.1.17
- **사용 목적**: 유틸리티 기반 CSS 프레임워크로 빠른 UI 개발
- **적용 범위**: 전체 컴포넌트 스타일링

### lucide-react

- **출처**: https://lucide.dev
- **사용 목적**: 아이콘 라이브러리
- **적용 범위**: 대시보드 전체 아이콘 (CreditCard, ChevronRight 등)

## 디자인 및 구현 특징

### 디자인 의도 및 UI/UX 포인트

1. **직관적인 정보 전달**: 카드 기반 레이아웃으로 정보를 명확하게 그룹화하고, 색상 코딩(성공=초록, 실패=빨강)을 통해 거래 상태를 즉시 파악할 수 있도록 설계

2. **계층적 정보 구조**: 대시보드 메인 화면에서 전체 현황(메트릭, 통계)을 한눈에 보고, 상세 정보는 각 섹션별로 구분하여 인지 부담 최소화

3. **일관된 인터랙션**: hover 효과와 transition을 통일하여 클릭 가능한 요소를 명확히 표시하고, 사용자 경험의 일관성 유지

## 실행 방법

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build

# 빌드 결과 미리보기
npm run preview
```

## 프로젝트 구조

```
src/
├── components/
│   ├── dashboard/      # 대시보드 관련 컴포넌트
│   ├── merchants/      # 가맹점 관련 컴포넌트
│   └── payments/       # 결제 관련 컴포넌트
├── services/           # API 서비스
├── types/              # TypeScript 타입 정의
└── utils/              # 유틸리티 함수 (포맷터 등)
```
