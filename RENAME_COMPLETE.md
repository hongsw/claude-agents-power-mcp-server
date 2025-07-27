# 프로젝트 이름 변경 완료

## 변경 사항

### ✅ 완료된 작업:
1. **디렉토리 이름 변경**: `mcp-sub-agents-server` → `pair-role-mcp-server`
2. **package.json 업데이트**: 프로젝트 이름과 설명 변경
3. **소스 코드 업데이트**: Server 이름을 `pair-role-mcp-server`로 변경
4. **Claude Desktop 설정 업데이트**: 
   - MCP 서버 이름: `sub-agents` → `pair-role`
   - 경로 업데이트: 새로운 디렉토리 경로 반영
5. **문서 업데이트**: README, INSTALLATION, FIXED 파일의 모든 참조 변경
6. **빌드 완료**: TypeScript 재컴파일 완료

### 📁 변경된 구조:
```
/Users/hongmartin/Claude/sub-agent-context/
├── pair-role-mcp-server/       (이전: mcp-sub-agents-server)
│   ├── src/
│   ├── dist/
│   ├── package.json
│   ├── README.md
│   └── ...
├── sub-agents/                 (에이전트 파일들)
│   ├── *.md                   (영어 에이전트)
│   └── kr/*.md                (한국어 에이전트)
└── claude_desktop_config.json
```

### 🔧 Claude Desktop 설정:
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
1. Claude Desktop 재시작
2. 새 대화에서 MCP 서버 연결 확인
3. `pair-role` MCP 서버 사용 시작

## 사용 예시:
```
# MCP 서버 확인
MCP pair-role 서버가 연결되었는지 확인해줘

# 프로젝트 분석
analyze-project { "projectPath": "/path/to/project" }

# 에이전트 검색
search-agents { "query": "backend", "language": "kr" }
```