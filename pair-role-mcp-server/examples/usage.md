# Pair Role MCP Server 사용 예시

## 시나리오 1: React 프로젝트 개발

### 1. 프로젝트 분석
```
mcp: analyze-project
{
  "projectPath": "/Users/developer/my-ecommerce-app"
}
```

결과:
```json
{
  "projectType": ["frontend", "backend"],
  "technologies": ["react", "typescript", "tailwind", "express"],
  "recommendedAgents": [
    "frontend-developer",
    "ui-designer", 
    "backend-engineer",
    "qa-engineer",
    "project-manager"
  ],
  "confidence": 92
}
```

### 2. 에이전트 설치
```
mcp: install-agents
{
  "agentNames": [
    "frontend-developer",
    "ui-designer",
    "qa-engineer"
  ],
  "targetPath": "/Users/developer/my-ecommerce-app",
  "language": "kr"
}
```

## 시나리오 2: 데이터 분석 프로젝트

### 1. 키워드로 에이전트 추천
```
mcp: recommend-by-keywords
{
  "keywords": ["data", "analysis", "visualization", "ml"]
}
```

결과:
```json
{
  "keywords": ["data", "analysis", "visualization", "ml"],
  "recommendedAgents": [
    "data-scientist",
    "data-analyst",
    "data-engineer",
    "machine-learning-engineer"
  ],
  "count": 4
}
```

### 2. 특정 에이전트 상세 정보 확인
```
mcp: get-agent-details
{
  "agentName": "data-scientist",
  "language": "kr"
}
```

## 시나리오 3: 모바일 앱 개발

### 1. 모바일 관련 에이전트 검색
```
mcp: search-agents
{
  "query": "mobile",
  "language": "en"
}
```

### 2. 프로젝트에 맞는 에이전트 설치
```
mcp: install-agents
{
  "agentNames": [
    "mobile-developer",
    "ui-designer",
    "qa-engineer",
    "backend-engineer"
  ],
  "targetPath": "/Users/developer/my-mobile-app"
}
```

## 시나리오 4: 스타트업 풀스택 프로젝트

### 1. 카테고리별 에이전트 목록 확인
```
mcp: list-agents
{
  "category": "management",
  "language": "kr"
}
```

### 2. 포괄적인 팀 구성
```
mcp: install-agents
{
  "agentNames": [
    "product-manager",
    "frontend-developer",
    "backend-engineer",
    "devops-engineer",
    "ui-designer",
    "qa-engineer",
    "marketing-analyst"
  ],
  "targetPath": "/Users/startup/main-project",
  "language": "en"
}
```

## 고급 사용법

### 다국어 에이전트 혼합 설치
1. 영어 에이전트 설치:
```
mcp: install-agents
{
  "agentNames": ["frontend-developer", "backend-engineer"],
  "targetPath": "/project",
  "language": "en"
}
```

2. 한국어 에이전트 추가 설치:
```
mcp: install-agents
{
  "agentNames": ["project-manager", "qa-engineer"],
  "targetPath": "/project", 
  "language": "kr"
}
```

### 프로젝트 타입별 추천 조합

**웹 애플리케이션**:
- frontend-developer
- backend-engineer
- ui-designer
- qa-engineer
- devops-engineer

**모바일 앱**:
- mobile-developer
- backend-engineer
- ui-designer
- qa-engineer

**데이터 프로젝트**:
- data-scientist
- data-engineer
- data-analyst
- machine-learning-engineer

**엔터프라이즈 프로젝트**:
- architect
- project-manager
- security-engineer
- devops-engineer
- qa-engineer