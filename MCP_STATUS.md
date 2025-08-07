# MCP Sub-Agents Server 상태

## 현재 상태 (2025-07-26 15:58)

### ✅ 작동하는 기능들:
1. **MCP 서버 연결**: 성공적으로 연결됨
2. **프로젝트 분석**: `analyze-project` 도구 작동
3. **키워드 추천**: `recommend-by-keywords` 도구 작동
4. **에이전트 설치**: `install-agents` 도구 사용 가능

### ❌ 문제:
1. **에이전트 로드**: 서버가 에이전트 파일을 찾지 못함
   - `list-agents` 결과: 0개
   - `search-agents` 결과: 0개
   - `get-agent-details` 결과: 에이전트를 찾을 수 없음

### 🔍 원인:
- 작업 디렉토리(cwd) 문제로 에이전트 파일 경로를 찾지 못하는 것으로 추정
- 디버그 로그가 추가되었으므로 Claude Desktop 재시작 시 정확한 경로 확인 가능

### 🛠️ 해결 방법:
1. Claude Desktop 재시작
2. 새로운 디버그 로그 확인
3. 경로 문제 수정

## 사용 가능한 기능 예시:

### 프로젝트 분석
```
analyze-project { "projectPath": "/path/to/project" }
```

### 키워드로 에이전트 추천
```
recommend-by-keywords { "keywords": ["api", "database"] }
```

### 에이전트 설치 (추천된 에이전트 이름 사용)
```
install-agents {
  "agentNames": ["backend-engineer", "data-engineer"],
  "targetPath": "/path/to/project",
  "language": "kr"
}
```

## 참고:
- 에이전트 파일 위치: `/Users/hongmartin/Claude/claude-agents-power/sub-agents/`
- 한국어 에이전트: `/Users/hongmartin/Claude/claude-agents-power/sub-agents/kr/`
- MCP 서버는 정상 작동 중이나 파일 로드 부분만 수정 필요