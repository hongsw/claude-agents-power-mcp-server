# MCP Sub-Agents Server 테스트 가이드

## 설치 완료 상태

✅ npm 패키지 설치 완료
✅ TypeScript 빌드 완료  
✅ start.sh 스크립트 생성 및 실행 권한 설정
✅ Claude Desktop 설정 파일 복사 완료

## Claude Desktop 재시작 필요

1. Claude Desktop 앱을 완전히 종료하세요
2. 다시 Claude Desktop을 실행하세요
3. 새로운 대화를 시작하세요

## 테스트 명령어

### 1. MCP 서버 연결 확인
새 대화에서:
```
MCP sub-agents 서버가 연결되었는지 확인해줘
```

### 2. 현재 프로젝트 분석
```
이 프로젝트를 분석해줘:
analyze-project { "projectPath": "/Users/hongmartin/Claude/sub-agent-context" }
```

### 3. 에이전트 목록 확인
```
한국어 에이전트 목록을 보여줘:
list-agents { "language": "kr" }
```

### 4. 특정 에이전트 검색
```
데이터 관련 에이전트를 찾아줘:
search-agents { "query": "data", "language": "kr" }
```

### 5. 에이전트 설치 테스트
```
테스트 프로젝트에 에이전트를 설치해줘:
install-agents {
  "agentNames": ["data-scientist", "backend-engineer"],
  "targetPath": "/tmp/test-project",
  "language": "kr"
}
```

## 경로 정보

- MCP 서버 위치: `/Users/hongmartin/Claude/sub-agent-context/mcp-sub-agents-server/`
- 에이전트 파일들: `/Users/hongmartin/Claude/sub-agent-context/sub-agents/`
- 한국어 에이전트: `/Users/hongmartin/Claude/sub-agent-context/sub-agents/kr/`
- Claude 설정: `~/Library/Application Support/Claude/claude_desktop_config.json`