# Pair Role MCP Server 설치 가이드

## 빠른 설치

현재 프로젝트 디렉토리에서 다음 명령을 실행하세요:

```bash
# 1. 프로젝트 디렉토리로 이동
cd /Users/hongmartin/Claude/sub-agent-context

# 2. MCP 서버 디렉토리로 이동
cd pair-role-mcp-server

# 3. 의존성 설치 (이미 완료됨)
npm install

# 4. 빌드 (이미 완료됨)
npm run build

# 5. Claude Desktop 설정 파일 복사
cp ../claude_desktop_config.json ~/Library/Application\ Support/Claude/

# 6. Claude Desktop 재시작
# Claude Desktop 앱을 완전히 종료했다가 다시 시작하세요
```

## 설치 확인

Claude Desktop을 재시작한 후, 새로운 대화에서 다음과 같이 테스트해보세요:

```
MCP 서버가 연결되었는지 확인해줘
```

## 사용 예시

### 현재 프로젝트 분석
```
현재 sub-agent-context 프로젝트를 분석해줘:
mcp: analyze-project { "projectPath": "/Users/hongmartin/Claude/sub-agent-context" }
```

### 에이전트 목록 확인
```
사용 가능한 모든 에이전트를 보여줘:
mcp: list-agents { "language": "kr" }
```

### 에이전트 설치
```
이 프로젝트에 필요한 에이전트들을 설치해줘:
mcp: install-agents {
  "agentNames": ["backend-engineer", "devops-engineer"],
  "targetPath": "/Users/hongmartin/Claude/sub-agent-context",
  "language": "kr"
}
```

## 문제 해결

### MCP 서버가 연결되지 않는 경우

1. Claude Desktop이 완전히 종료되었는지 확인 (Activity Monitor에서 확인)
2. 설정 파일 경로 확인:
   ```bash
   ls -la ~/Library/Application\ Support/Claude/claude_desktop_config.json
   ```
3. 설정 파일 내용 확인:
   ```bash
   cat ~/Library/Application\ Support/Claude/claude_desktop_config.json
   ```

### 에이전트를 찾을 수 없는 경우

1. 에이전트 파일들이 올바른 위치에 있는지 확인:
   ```bash
   ls -la /Users/hongmartin/Claude/sub-agent-context/sub-agents/
   ```

2. 한국어 에이전트 확인:
   ```bash
   ls -la /Users/hongmartin/Claude/sub-agent-context/sub-agents/kr/
   ```

### 권한 문제가 발생하는 경우

start.sh 파일에 실행 권한이 있는지 확인:
```bash
chmod +x /Users/hongmartin/Claude/sub-agent-context/pair-role-mcp-server/start.sh
```