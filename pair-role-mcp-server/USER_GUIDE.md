# Pair-Role MCP Server 사용 가이드

## 📋 목차
1. [기본 사용법](#기본-사용법)
2. [프로젝트 분석](#프로젝트-분석)
3. [에이전트 검색 및 추천](#에이전트-검색-및-추천)
4. [에이전트 설치](#에이전트-설치)
5. [실전 사용 예시](#실전-사용-예시)
6. [고급 활용법](#고급-활용법)
7. [문제 해결](#문제-해결)

---

## 🚀 기본 사용법

### MCP 서버 상태 확인
```bash
# Claude Code에서 MCP 도구들이 보이는지 확인
# 다음과 같은 도구들이 나타나야 합니다:
- mcp__pair-role__analyze-project
- mcp__pair-role__search-agents  
- mcp__pair-role__list-agents
- mcp__pair-role__get-agent-details
- mcp__pair-role__install-agents
- mcp__pair-role__recommend-by-keywords
```

### 모든 에이전트 목록 보기
```
mcp__pair-role__list-agents를 사용해서 모든 에이전트를 보여줘
```

---

## 🔍 프로젝트 분석

### 1. 프로젝트 자동 분석
프로젝트를 분석하여 적합한 에이전트를 자동으로 추천받습니다.

**사용법:**
```
mcp__pair-role__analyze-project를 사용해서 현재 프로젝트를 분석해줘
```

**분석 항목:**
- 프로젝트 타입 (React, Node.js, Python 등)
- 사용 중인 프레임워크와 라이브러리
- 프로젝트 규모와 복잡도
- 추천 에이전트 목록

**예시 응답:**
```json
{
  "success": true,
  "analysis": {
    "projectType": ["web", "typescript", "react"],
    "frameworks": ["react", "typescript", "vite"],
    "recommendedAgents": [
      "frontend-developer",
      "ui-designer", 
      "qa-engineer"
    ]
  }
}
```

---

## 🔎 에이전트 검색 및 추천

### 1. 키워드로 에이전트 검색
특정 키워드로 관련 에이전트를 찾습니다.

**사용법:**
```
"React 개발"에 관련된 에이전트를 mcp__pair-role__search-agents로 검색해줘
```

### 2. 카테고리별 에이전트 목록
특정 분야의 에이전트만 필터링해서 볼 수 있습니다.

**사용법:**
```
development 카테고리의 에이전트들을 mcp__pair-role__list-agents로 보여줘
```

**지원 카테고리:**
- `development` - 개발 관련
- `data` - 데이터 분석
- `design` - 디자인 관련
- `management` - 관리/운영
- `marketing` - 마케팅
- `operations` - 운영
- `hr` - 인사
- `finance` - 재무
- `legal` - 법무
- `research` - 연구

### 3. 키워드 기반 추천
프로젝트 키워드를 바탕으로 에이전트를 추천받습니다.

**사용법:**
```
["api", "database", "security"] 키워드로 mcp__pair-role__recommend-by-keywords를 사용해서 에이전트를 추천해줘
```

---

## 🎯 에이전트 설치

### 1. 단일 에이전트 설치
```
["frontend-developer"] 에이전트를 현재 프로젝트에 mcp__pair-role__install-agents로 설치해줘
```

### 2. 다중 에이전트 설치
```
["frontend-developer", "backend-developer", "qa-engineer"] 에이전트들을 mcp__pair-role__install-agents로 설치해줘
```

### 3. 언어별 설치
```
한국어 버전의 ["product-manager", "data-analyst"] 에이전트를 mcp__pair-role__install-agents로 설치해줘
```

**설치 위치:**
- 기본 경로: `{프로젝트}/.claude/sub-agents/`
- 각 에이전트는 개별 `.md` 파일로 저장

---

## 💡 실전 사용 예시

### 예시 1: 새 React 프로젝트 시작
```
1. 프로젝트 분석하기
   "mcp__pair-role__analyze-project로 현재 React 프로젝트를 분석해줘"

2. 추천 에이전트 확인
   응답에서 추천된 에이전트들 확인

3. 에이전트 설치
   "추천받은 ['frontend-developer', 'ui-designer', 'qa-engineer'] 에이전트들을 설치해줘"
```

### 예시 2: 백엔드 API 개발
```
1. 키워드 기반 추천
   "['api', 'database', 'authentication'] 키워드로 에이전트를 추천해줘"

2. 상세 정보 확인
   "backend-developer 에이전트의 상세 정보를 mcp__pair-role__get-agent-details로 보여줘"

3. 설치 및 활용
   "backend-developer와 security-engineer 에이전트를 설치해줘"
```

### 예시 3: 데이터 분석 프로젝트
```
1. 데이터 카테고리 탐색
   "data 카테고리의 모든 에이전트를 보여줘"

2. 적합한 에이전트 선택
   "data-scientist와 data-analyst의 차이점을 상세 정보로 비교해줘"

3. 설치
   "선택한 에이전트들을 프로젝트에 설치해줘"
```

---

## 🏗️ 고급 활용법

### 1. 프로젝트별 맞춤 에이전트 조합

**스타트업 초기 단계:**
```
["product-manager", "frontend-developer", "backend-developer", "growth-marketing-manager"]
```

**기업 프로젝트:**
```
["solution-architect", "tech-lead", "security-engineer", "devops-engineer", "qa-engineer"]
```

**데이터 중심 프로젝트:**
```
["data-scientist", "data-engineer", "machine-learning-engineer", "data-analyst"]
```

### 2. 언어별 활용
- **한국어**: 국내 프로젝트, 한국 비즈니스 컨텍스트
- **영어**: 글로벌 프로젝트, 국제 표준 준수

### 3. 에이전트 조합 전략

**풀스택 웹 개발:**
```
기본: frontend-developer + backend-developer
확장: + ui-designer + qa-engineer + devops-engineer
```

**모바일 앱 개발:**
```
기본: mobile-developer + ui-designer  
확장: + backend-developer + product-manager + marketing-analyst
```

**AI/ML 프로젝트:**
```
기본: machine-learning-engineer + data-scientist
확장: + data-engineer + ai-researcher + product-manager
```

---

## 🛠️ 문제 해결

### 1. MCP 도구가 보이지 않는 경우
```bash
# 1. MCP 서버 설정 확인
cat ~/.config/claude/mcp_servers.json

# 2. 빌드 상태 확인
ls -la /path/to/pair-role-mcp-server/dist/index.js

# 3. Claude Code 재시작
```

### 2. 에이전트 설치 실패
```bash
# 대상 디렉토리 권한 확인
ls -la .claude/
mkdir -p .claude/sub-agents/
```

### 3. 검색 결과가 없는 경우
- 키워드를 다르게 시도해보세요
- 영어/한국어를 바꿔서 검색해보세요
- 카테고리별 목록을 먼저 확인해보세요

### 4. 언어 설정 문제
```
# 명시적으로 언어 지정
"한국어로 설정해서 에이전트를 검색해줘"
"영어 버전의 에이전트를 보여줘"
```

---

## 📚 유용한 명령어 모음

### 빠른 시작
```
"현재 프로젝트를 분석하고 적합한 에이전트 3개를 추천해서 바로 설치해줘"
```

### 탐색적 검색  
```
"'마케팅'과 관련된 모든 에이전트를 보여주고, 그 중 가장 적합한 것을 추천해줘"
```

### 비교 분석
```
"frontend-developer와 ui-designer의 차이점을 비교해서 설명해줘"
```

### 프로젝트 맞춤 설정
```
"스타트업에 적합한 핵심 에이전트 5개를 추천하고 설치해줘"
```

---

## 🎓 베스트 프랙티스

1. **프로젝트 초기**: 먼저 `analyze-project`로 자동 분석
2. **탐색 단계**: `list-agents`와 `search-agents`로 옵션 확인  
3. **선택 단계**: `get-agent-details`로 상세 정보 검토
4. **실행 단계**: `install-agents`로 선택된 에이전트들 설치
5. **반복 개선**: 프로젝트 진행에 따라 필요한 에이전트 추가

이 가이드를 따라하시면 Pair-Role MCP Server를 효과적으로 활용하실 수 있습니다! 🚀