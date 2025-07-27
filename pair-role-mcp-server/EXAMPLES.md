# Pair-Role MCP Server 실전 예시

## 🎯 상황별 활용 예시

### 1. 새로운 웹 애플리케이션 프로젝트

**시나리오**: React + TypeScript + Node.js 풀스택 웹 앱 개발

```
사용자: "새 React 프로젝트를 시작하는데 어떤 에이전트들이 필요할까?"

1단계 - 프로젝트 분석:
mcp__pair-role__analyze-project를 사용해서 현재 프로젝트 구조를 분석해줘

2단계 - 추천 받은 에이전트들 설치:
분석 결과에서 추천된 에이전트들을 mcp__pair-role__install-agents로 설치해줘

3단계 - 추가 에이전트 고려:
"product-manager"와 "qa-engineer"의 상세 정보를 비교해서 프로젝트에 필요한지 알려줘
```

**예상 결과**:
- `frontend-developer`: React/TypeScript 개발
- `backend-developer`: Node.js API 개발  
- `ui-designer`: 사용자 인터페이스 디자인
- `qa-engineer`: 테스트 및 품질 관리

---

### 2. 데이터 분석 플랫폼 구축

**시나리오**: Python + BigQuery + ML 모델을 활용한 데이터 플랫폼

```
사용자: "데이터 분석 플랫폼을 만들고 있어. 어떤 전문가들이 필요할까?"

1단계 - 키워드 기반 추천:
["data", "analytics", "machine-learning", "visualization"] 키워드로 mcp__pair-role__recommend-by-keywords를 사용해서 에이전트를 추천해줘

2단계 - 데이터 카테고리 탐색:
data 카테고리의 모든 에이전트를 mcp__pair-role__list-agents로 보여줘

3단계 - 상세 비교:
"data-scientist", "data-engineer", "machine-learning-engineer"의 역할 차이를 설명해줘

4단계 - 맞춤 설치:
데이터 플랫폼 구축에 최적화된 에이전트 조합을 설치해줘
```

**추천 조합**:
- `data-scientist`: 데이터 분석 및 인사이트 도출
- `data-engineer`: 데이터 파이프라인 구축
- `machine-learning-engineer`: ML 모델 개발 및 배포
- `analytics-engineer`: 분석 인프라 구축

---

### 3. 스타트업 MVP 개발

**시나리오**: 빠른 프로토타입 개발이 필요한 스타트업

```
사용자: "스타트업에서 MVP를 빠르게 만들어야 해. 핵심 팀원들을 추천해줘"

1단계 - 스타트업 맞춤 검색:
"startup", "mvp", "rapid development" 키워드로 에이전트를 검색해줘

2단계 - 다기능 에이전트 우선:
풀스택 개발이 가능한 에이전트들을 우선적으로 추천해줘

3단계 - 비즈니스 관점 포함:
기술뿐만 아니라 비즈니스 검증도 도와줄 수 있는 에이전트를 추가해줘
```

**스타트업 핵심 조합**:
- `product-manager`: 제품 전략 및 로드맵
- `frontend-developer`: 사용자 인터페이스 개발
- `backend-developer`: 서버 및 API 개발
- `growth-marketing-manager`: 초기 마케팅 및 성장
- `business-development-manager`: 비즈니스 모델 검증

---

### 4. 기업 레거시 시스템 현대화

**시나리오**: 기존 시스템을 클라우드 네이티브로 마이그레이션

```
사용자: "레거시 시스템을 마이그레이션하는 프로젝트야. 어떤 전문가가 필요할까?"

1단계 - 아키텍처 전문가 찾기:
"architecture", "legacy", "migration", "cloud" 키워드로 관련 에이전트를 찾아줘

2단계 - 리스크 관리:
시스템 마이그레이션의 보안과 안정성을 담당할 에이전트를 추천해줘

3단계 - 운영 관점:
마이그레이션 후 운영과 모니터링을 담당할 에이전트도 포함해줘
```

**마이그레이션 전문팀**:
- `solution-architect`: 전체 시스템 설계
- `cloud-architect`: 클라우드 인프라 설계
- `security-engineer`: 보안 강화
- `devops-engineer`: CI/CD 및 배포 자동화
- `site-reliability-engineer`: 시스템 안정성 관리

---

### 5. AI 챗봇 서비스 개발

**시나리오**: 고객 서비스용 AI 챗봇 개발

```
사용자: "AI 챗봇 서비스를 만들고 있어. NLP와 웹 개발 모두 필요해"

1단계 - AI 관련 에이전트 탐색:
"ai", "nlp", "chatbot", "machine-learning" 키워드로 에이전트를 검색해줘

2단계 - 통합 개발 팀 구성:
AI 기술과 웹 서비스 개발을 모두 커버할 수 있는 팀을 만들어줘

3단계 - 사용자 경험 고려:
챗봇의 UX/UI와 대화 흐름 설계를 담당할 전문가도 추가해줘
```

**AI 챗봇 개발팀**:
- `ai-researcher`: AI 모델 연구 및 개발
- `machine-learning-engineer`: ML 모델 구현
- `backend-developer`: API 및 서버 개발
- `frontend-developer`: 챗봇 인터페이스
- `ux-designer`: 대화 흐름 및 사용자 경험

---

## 🔧 고급 활용 패턴

### 패턴 1: 단계별 팀 확장

```
1단계 (MVP): 
["product-manager", "frontend-developer", "backend-developer"]

2단계 (성장): 
+ ["ui-designer", "qa-engineer", "marketing-analyst"]

3단계 (확장):
+ ["devops-engineer", "data-analyst", "customer-support-specialist"]
```

### 패턴 2: 도메인 특화 조합

**핀테크 서비스**:
```
["backend-developer", "security-engineer", "compliance-manager", "risk-analyst", "frontend-developer"]
```

**헬스케어 플랫폼**:
```
["software-engineer", "data-scientist", "security-engineer", "compliance-manager", "ux-researcher"]
```

**이커머스 플랫폼**:
```
["frontend-developer", "backend-developer", "marketing-analyst", "supply-chain-manager", "customer-insights-analyst"]
```

### 패턴 3: 프로젝트 단계별 활용

**기획 단계**:
```
["product-manager", "business-analyst", "ux-researcher", "market-research-analyst"]
```

**개발 단계**:
```
["solution-architect", "frontend-developer", "backend-developer", "qa-engineer"]
```

**런칭 단계**:
```
["devops-engineer", "marketing-manager", "customer-support-specialist", "data-analyst"]
```

---

## 💡 실용적인 명령어 템플릿

### 빠른 시작 템플릿
```
"[프로젝트 타입]에 적합한 핵심 에이전트 5개를 분석해서 바로 설치해줘"

예시:
"React 웹앱 프로젝트에 적합한 핵심 에이전트 5개를 분석해서 바로 설치해줘"
```

### 비교 분석 템플릿
```
"[에이전트1]와 [에이전트2]의 역할과 전문성을 비교해서 우리 프로젝트에 더 적합한 것을 추천해줘"

예시:
"data-scientist와 data-analyst의 역할과 전문성을 비교해서 우리 프로젝트에 더 적합한 것을 추천해줘"
```

### 확장 계획 템플릿
```
"현재 [기존 에이전트들] 팀에서 [목표]를 달성하기 위해 추가로 필요한 에이전트를 추천해줘"

예시:
"현재 frontend-developer, backend-developer 팀에서 글로벌 서비스 런칭을 위해 추가로 필요한 에이전트를 추천해줘"
```

이러한 예시들을 참고하여 여러분의 프로젝트에 맞는 최적의 에이전트 조합을 구성해보세요! 🚀