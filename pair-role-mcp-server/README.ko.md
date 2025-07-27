# 🤖 Pair-Role MCP Server

[![English](https://img.shields.io/badge/lang-English-blue.svg)](README.md)
[![한국어](https://img.shields.io/badge/lang-한국어-red.svg)](README.ko.md)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![MCP](https://img.shields.io/badge/MCP-Compatible-purple.svg)](https://modelcontextprotocol.org/)

> 🎯 **개발팀을 위한 스마트 역할 배정** - 프로젝트를 분석하고 모든 회사 부서의 100개 이상의 전문 역할에서 완벽한 팀 구성을 추천하는 지능형 MCP 서버입니다.

## 📖 목차

- [🌟 기능](#-기능)
- [🚀 빠른 시작](#-빠른-시작)
- [📋 사용 가능한 역할](#-사용-가능한-역할)
- [🎯 사용 예시](#-사용-예시)
- [📚 문서](#-문서)
- [🛠️ 개발](#-개발)
- [🤝 기여하기](#-기여하기)
- [📄 라이선스](#-라이선스)

## 🌟 기능

### 🔍 **지능형 프로젝트 분석**
- 프로젝트 타입, 프레임워크, 복잡도를 자동으로 감지
- 기술 스택을 기반으로 스마트한 역할 추천 제공
- 다국어 프로젝트와 다양한 아키텍처 지원

### 👥 **100개 이상의 전문 역할**
- **기술 및 엔지니어링** (20개 역할): 프론트엔드, 백엔드, DevOps, 보안, AI/ML
- **데이터 및 분석** (15개 역할): 데이터 사이언티스트, 분석가, 엔지니어
- **제품 및 디자인** (10개 역할): PM, UX/UI 디자이너, 리서처  
- **마케팅 및 영업** (10개 역할): 디지털 마케팅, 성장, 콘텐츠
- **운영 및 관리** (15개 역할): 프로젝트 매니저, 운영
- **재무 및 회계** (10개 역할): CFO, 관리자, 분석가
- **인사** (10개 역할): 인재 확보, L&D, 문화
- **경영진 및 리더십** (10개 역할): C-레벨 임원 및 전략

### 🌐 **다국어 지원**
- **English**: 글로벌 표준 및 국제 프로젝트
- **한국어**: 한국 비즈니스 컨텍스트 및 현지 관행

### ⚡ **Claude Code 통합**
- MCP 프로토콜을 통한 Claude Code와의 완벽한 통합
- 실시간 역할 추천 및 팀 구성
- 프로젝트에 원클릭 에이전트 설치

## 🚀 빠른 시작

### 설치

```bash
# 저장소 클론
git clone https://github.com/yourusername/pair-role-mcp-server.git
cd pair-role-mcp-server

# 의존성 설치
npm install

# 프로젝트 빌드
npm run build
```

### MCP 설정

`~/.config/claude/mcp_servers.json`에 추가:

```json
{
  "mcpServers": {
    "pair-role": {
      "command": "node",
      "args": ["/path/to/pair-role-mcp-server/dist/index.js"],
      "cwd": "/path/to/your/project",
      "env": {}
    }
  }
}
```

### 기본 사용법

```bash
# 현재 프로젝트 분석
mcp__pair-role__analyze-project

# 역할 추천 받기  
mcp__pair-role__recommend-by-keywords ["web", "api", "database"]

# 추천 에이전트 설치
mcp__pair-role__install-agents ["frontend-developer", "backend-developer"]
```

## 📋 사용 가능한 역할

### 🔧 기술 및 엔지니어링 (20개 역할)

| 역할 | English | 한국어 | 도구 | 전문 분야 |
|------|---------|--------|-------|----------|
| [**소프트웨어 엔지니어**](sub-agents/ko/software-engineer.md) | [EN](sub-agents/en/software-engineer.md) | [KO](sub-agents/ko/software-engineer.md) | `Bash, Read, Write, Edit` | 풀스택 개발, 시스템 설계 |
| [**프론트엔드 개발자**](sub-agents/ko/frontend-developer.md) | [EN](sub-agents/en/frontend-developer.md) | [KO](sub-agents/ko/frontend-developer.md) | `Read, Write, Edit, Bash` | React, Vue, Angular, UI/UX |
| [**백엔드 개발자**](sub-agents/ko/backend-developer.md) | [EN](sub-agents/en/backend-developer.md) | [KO](sub-agents/ko/backend-developer.md) | `Bash, Read, Write, Edit` | API, 데이터베이스, 서버 아키텍처 |
| [**DevOps 엔지니어**](sub-agents/ko/devops-engineer.md) | [EN](sub-agents/en/devops-engineer.md) | [KO](sub-agents/ko/devops-engineer.md) | `Bash, Read, Write` | CI/CD, 인프라 자동화 |
| [**데이터 엔지니어**](sub-agents/ko/data-engineer.md) | [EN](sub-agents/en/data-engineer.md) | [KO](sub-agents/ko/data-engineer.md) | `Bash, Read, Write` | ETL 파이프라인, 데이터 아키텍처 |

<details>
<summary><strong>📱 모든 기술 역할 보기 (15개 더)</strong></summary>

| 역할 | English | 한국어 | 도구 | 전문 분야 |
|------|---------|--------|-------|----------|
| [**ML 엔지니어**](sub-agents/ko/machine-learning-engineer.md) | [EN](sub-agents/en/machine-learning-engineer.md) | [KO](sub-agents/ko/machine-learning-engineer.md) | `Bash, Read, Write` | 모델 배포, MLOps |
| [**보안 엔지니어**](sub-agents/ko/security-engineer.md) | [EN](sub-agents/en/security-engineer.md) | [KO](sub-agents/ko/security-engineer.md) | `Bash, Read, Grep` | 사이버 보안, 위협 분석 |
| [**클라우드 아키텍트**](sub-agents/ko/cloud-architect.md) | [EN](sub-agents/en/cloud-architect.md) | [KO](sub-agents/ko/cloud-architect.md) | `Bash, Read, Write` | AWS, Azure, GCP 아키텍처 |
| [**모바일 개발자**](sub-agents/ko/mobile-developer.md) | [EN](sub-agents/en/mobile-developer.md) | [KO](sub-agents/ko/mobile-developer.md) | `Read, Write, Edit, Bash` | iOS, Android, React Native |
| [**QA 엔지니어**](sub-agents/ko/qa-engineer.md) | [EN](sub-agents/en/qa-engineer.md) | [KO](sub-agents/ko/qa-engineer.md) | `Bash, Read, Write` | 테스트 자동화, 품질 보증 |
| [**데이터베이스 관리자**](sub-agents/ko/database-administrator.md) | [EN](sub-agents/en/database-administrator.md) | [KO](sub-agents/ko/database-administrator.md) | `Bash, Read, Write` | 데이터베이스 최적화, 백업 |
| [**네트워크 엔지니어**](sub-agents/ko/network-engineer.md) | [EN](sub-agents/en/network-engineer.md) | [KO](sub-agents/ko/network-engineer.md) | `Bash, Read, Write` | 네트워크 인프라, 보안 |
| [**사이트 신뢰성 엔지니어**](sub-agents/ko/site-reliability-engineer.md) | [EN](sub-agents/en/site-reliability-engineer.md) | [KO](sub-agents/ko/site-reliability-engineer.md) | `Bash, Read, Write` | 시스템 안정성, 모니터링 |
| [**블록체인 개발자**](sub-agents/ko/blockchain-developer.md) | [EN](sub-agents/en/blockchain-developer.md) | [KO](sub-agents/ko/blockchain-developer.md) | `Read, Write, Edit` | 스마트 컨트랙트, DeFi |
| [**게임 개발자**](sub-agents/ko/game-developer.md) | [EN](sub-agents/en/game-developer.md) | [KO](sub-agents/ko/game-developer.md) | `Read, Write, Edit` | Unity, Unreal, 게임 엔진 |
| [**임베디드 시스템 엔지니어**](sub-agents/ko/embedded-systems-engineer.md) | [EN](sub-agents/en/embedded-systems-engineer.md) | [KO](sub-agents/ko/embedded-systems-engineer.md) | `Read, Write, Bash` | IoT, 펌웨어, 하드웨어 |
| [**기술 문서 작성자**](sub-agents/ko/technical-writer.md) | [EN](sub-agents/en/technical-writer.md) | [KO](sub-agents/ko/technical-writer.md) | `Read, Write, Edit` | 문서화, API 문서 |
| [**솔루션 아키텍트**](sub-agents/ko/solution-architect.md) | [EN](sub-agents/en/solution-architect.md) | [KO](sub-agents/ko/solution-architect.md) | `Read, Write, Bash` | 시스템 통합, 설계 |
| [**AI 연구원**](sub-agents/ko/ai-researcher.md) | [EN](sub-agents/en/ai-researcher.md) | [KO](sub-agents/ko/ai-researcher.md) | `Read, Write, Bash` | 연구, 알고리즘 개발 |
| [**기술 리드**](sub-agents/ko/tech-lead.md) | [EN](sub-agents/en/tech-lead.md) | [KO](sub-agents/ko/tech-lead.md) | `Read, Write, Edit, Bash` | 팀 리더십, 아키텍처 |

</details>

### 📊 데이터 및 분석 (15개 역할)

| 역할 | English | 한국어 | 도구 | 전문 분야 |
|------|---------|--------|-------|----------|
| [**데이터 사이언티스트**](sub-agents/ko/data-scientist.md) | [EN](sub-agents/en/data-scientist.md) | [KO](sub-agents/ko/data-scientist.md) | `Bash, Read, Write` | ML 모델링, 통계 분석 |
| [**데이터 분석가**](sub-agents/ko/data-analyst.md) | [EN](sub-agents/en/data-analyst.md) | [KO](sub-agents/ko/data-analyst.md) | `Read, Write, Bash` | 비즈니스 인사이트, 보고 |
| [**비즈니스 인텔리전스 분석가**](sub-agents/ko/business-intelligence-analyst.md) | [EN](sub-agents/en/business-intelligence-analyst.md) | [KO](sub-agents/ko/business-intelligence-analyst.md) | `Read, Write, Bash` | 대시보드, BI 도구 |
| [**정량 분석가**](sub-agents/ko/quantitative-analyst.md) | [EN](sub-agents/en/quantitative-analyst.md) | [KO](sub-agents/ko/quantitative-analyst.md) | `Read, Write, Bash` | 금융 모델링, 위험 분석 |
| [**연구 분석가**](sub-agents/ko/research-analyst.md) | [EN](sub-agents/en/research-analyst.md) | [KO](sub-agents/ko/research-analyst.md) | `Read, Write` | 시장 조사, 경쟁 분석 |

<details>
<summary><strong>📈 모든 데이터 및 분석 역할 보기 (10개 더)</strong></summary>

| 역할 | English | 한국어 | 도구 | 전문 분야 |
|------|---------|--------|-------|----------|
| [**분석 엔지니어**](sub-agents/ko/analytics-engineer.md) | [EN](sub-agents/en/analytics-engineer.md) | [KO](sub-agents/ko/analytics-engineer.md) | `Bash, Read, Write` | 데이터 인프라, 모델링 |
| [**마케팅 분석가**](sub-agents/ko/marketing-analyst.md) | [EN](sub-agents/en/marketing-analyst.md) | [KO](sub-agents/ko/marketing-analyst.md) | `Read, Write` | 캠페인 최적화, 지표 |
| [**재무 분석가**](sub-agents/ko/financial-analyst.md) | [EN](sub-agents/en/financial-analyst.md) | [KO](sub-agents/ko/financial-analyst.md) | `Read, Write` | 재무 계획, 예측 |
| [**운영 분석가**](sub-agents/ko/operations-analyst.md) | [EN](sub-agents/en/operations-analyst.md) | [KO](sub-agents/ko/operations-analyst.md) | `Read, Write, Bash` | 프로세스 최적화, 효율성 |
| [**제품 분석가**](sub-agents/ko/product-analyst.md) | [EN](sub-agents/en/product-analyst.md) | [KO](sub-agents/ko/product-analyst.md) | `Read, Write` | 사용자 행동, 제품 지표 |
| [**위험 분석가**](sub-agents/ko/risk-analyst.md) | [EN](sub-agents/en/risk-analyst.md) | [KO](sub-agents/ko/risk-analyst.md) | `Read, Write` | 위험 평가, 완화 |
| [**성장 분석가**](sub-agents/ko/growth-analyst.md) | [EN](sub-agents/en/growth-analyst.md) | [KO](sub-agents/ko/growth-analyst.md) | `Read, Write` | 성장 지표, 실험 |
| [**고객 인사이트 분석가**](sub-agents/ko/customer-insights-analyst.md) | [EN](sub-agents/en/customer-insights-analyst.md) | [KO](sub-agents/ko/customer-insights-analyst.md) | `Read, Write` | 고객 세분화, 행동 |
| [**가격 분석가**](sub-agents/ko/pricing-analyst.md) | [EN](sub-agents/en/pricing-analyst.md) | [KO](sub-agents/ko/pricing-analyst.md) | `Read, Write` | 가격 전략, 수익 최적화 |
| [**공급망 분석가**](sub-agents/ko/supply-chain-analyst.md) | [EN](sub-agents/en/supply-chain-analyst.md) | [KO](sub-agents/ko/supply-chain-analyst.md) | `Read, Write, Bash` | 공급망 최적화 |

</details>

## 🎯 사용 예시

### 🚀 스타트업 MVP 개발
```bash
# 프로젝트 분석 및 추천 받기
mcp__pair-role__analyze-project

# 핵심 스타트업 팀 설치
mcp__pair-role__install-agents [
  "product-manager",
  "frontend-developer", 
  "backend-developer",
  "growth-marketing-manager"
]
```

### 🏢 기업용 애플리케이션
```bash
# 기업 프로젝트용 추천 받기
mcp__pair-role__recommend-by-keywords [
  "enterprise", "security", "scalability", "compliance"
]

# 기업 팀 설치
mcp__pair-role__install-agents [
  "solution-architect",
  "security-engineer",
  "devops-engineer",
  "compliance-manager"
]
```

### 📊 데이터 플랫폼
```bash
# 데이터 관련 역할 검색
mcp__pair-role__search-agents "data analytics machine learning"

# 데이터 팀 설치
mcp__pair-role__install-agents [
  "data-scientist",
  "data-engineer", 
  "machine-learning-engineer",
  "analytics-engineer"
]
```

## 📚 문서

### 📖 사용자 가이드
- [**사용자 가이드**](USER_GUIDE.md) - 모범 사례가 포함된 완전한 사용 가이드
- [**예시**](EXAMPLES.md) - 실제 시나리오 및 사용 사례
- [**문제 해결**](TROUBLESHOOTING.md) - 일반적인 문제 및 해결책

### 🔧 기술 문서  
- [**설치 가이드**](INSTALL.md) - 단계별 설정 지침

## 🛠️ 개발

### 필수 조건
- Node.js 16+ 
- TypeScript 5+
- MCP를 지원하는 Claude Code

### 소스에서 빌드
```bash
git clone https://github.com/yourusername/pair-role-mcp-server.git
cd pair-role-mcp-server
npm install
npm run build
npm test
```

### 프로젝트 구조
```
pair-role-mcp-server/
├── src/                    # TypeScript 소스 코드
├── sub-agents/            # 에이전트 정의
│   ├── en/               # 영어 에이전트
│   └── ko/               # 한국어 에이전트  
├── dist/                 # 컴파일된 JavaScript
├── docs/                 # 문서
└── examples/             # 사용 예시
```

## 🤝 기여하기

기여를 환영합니다! 자세한 내용은 [기여 가이드](CONTRIBUTING.md)를 참조하세요.

### 🌟 기여 방법
1. **새로운 역할 추가** - 전문 직책을 위한 에이전트 생성
2. **번역 개선** - 한국어/영어 현지화 향상  
3. **프로젝트 템플릿 추가** - 산업별 템플릿 기여
4. **문서화** - 가이드 및 예시 개선

### 🚀 로드맵
- [ ] 시각적 프로젝트 분석기 대시보드
- [ ] 역할 의존성 추천  
- [ ] 산업별 역할 번들
- [ ] 인기 프로젝트 관리 도구와의 통합
- [ ] 고급 팀 구성 알고리즘

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 라이선스가 부여됩니다. 자세한 내용은 [LICENSE](LICENSE) 파일을 참조하세요.

---

<div align="center">

**⭐ 이 저장소가 유용하다면 스타를 눌러주세요!**

[🐛 버그 신고](https://github.com/yourusername/pair-role-mcp-server/issues) • [✨ 기능 요청](https://github.com/yourusername/pair-role-mcp-server/issues) • [📖 문서](docs/)

Claude Code 커뮤니티를 위해 ❤️로 만들어졌습니다

</div>