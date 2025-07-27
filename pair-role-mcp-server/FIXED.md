# Pair Role MCP Server 수정 완료

## 문제 해결

`node: command not found` 오류를 해결했습니다.

### 수정 내용:
1. Claude Desktop이 node 실행 파일을 찾을 수 없었던 문제
2. asdf로 설치된 node의 전체 경로를 직접 지정
3. 작업 디렉토리(cwd)를 명시적으로 설정

### 현재 설정:
```json
{
  "mcpServers": {
    "pair-role": {
      "command": "/Users/hongmartin/.asdf/installs/nodejs/24.4.0/bin/node",
      "args": ["/Users/hongmartin/Claude/sub-agent-context/pair-role-mcp-server/dist/index.js"],
      "cwd": "/Users/hongmartin/Claude/sub-agent-context",
      "env": {}
    }
  }
}
```

## 다음 단계:

1. **Claude Desktop 재시작**
   - 앱을 완전히 종료 후 다시 실행

2. **새 대화에서 테스트**
   ```
   MCP sub-agents 서버가 연결되었는지 확인해줘
   ```

3. **서버 기능 테스트**
   ```
   사용 가능한 에이전트 목록을 보여줘:
   list-agents { "language": "kr" }
   ```

## 디버깅 팁:

로그 확인:
```bash
tail -f ~/Library/Logs/Claude/mcp-server-sub-agents.log
```

서버가 정상적으로 실행되면 다음과 같은 로그가 나타납니다:
- "Server started and connected successfully"
- "Loading agents from: /Users/hongmartin/Claude/sub-agent-context/sub-agents"