# Pair-Role MCP Server 문제 해결 가이드

## 🚨 일반적인 문제들

### 1. MCP 도구가 Claude Code에서 보이지 않음

**증상**: `mcp__pair-role__*` 도구들이 나타나지 않음

**해결 방법**:

```bash
# 1. MCP 서버 설정 파일 확인
cat ~/.config/claude/mcp_servers.json

# 올바른 형식인지 확인:
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

```bash
# 2. Node.js 경로 확인
which node
# 결과를 mcp_servers.json의 command 필드에 정확히 입력했는지 확인

# 3. 빌드 파일 존재 및 권한 확인
ls -la /Users/hongmartin/Claude/sub-agent-context/pair-role-mcp-server/dist/index.js
# 파일이 존재하고 실행 권한(x)이 있는지 확인

# 4. 수동 실행 테스트
cd /Users/hongmartin/Claude/sub-agent-context/pair-role-mcp-server
node dist/index.js --help
```

**최종 해결책**: Claude Code 완전 재시작

---

### 2. "Module not found" 에러

**증상**: 
```
Error: Cannot find module '@modelcontextprotocol/sdk/server/index.js'
```

**해결 방법**:
```bash
# 1. 의존성 재설치
npm install

# 2. 다시 빌드
npm run build

# 3. Node.js 버전 확인 (16 이상 필요)
node --version

# 4. package.json의 type: "module" 확인
cat package.json | grep '"type"'
```

---

### 3. 에이전트 설치 실패

**증상**: 
```json
{
  "success": false,
  "error": "Failed to install agents: ENOENT: no such file or directory"
}
```

**해결 방법**:
```bash
# 1. 대상 디렉토리 생성
mkdir -p .claude/sub-agents/

# 2. 권한 확인
ls -la .claude/
chmod 755 .claude/
chmod 755 .claude/sub-agents/

# 3. 절대 경로로 시도
# 상대 경로 대신 절대 경로 사용
```

---

### 4. JSON 파싱 에러

**증상**: MCP 서버 응답이 깨져 보임

**해결 방법**:
```bash
# 1. 빌드 다시 실행
npm run build

# 2. TypeScript 컴파일 에러 확인
npx tsc --noEmit

# 3. 서버 로그 확인 (stderr 출력 보기)
```

---

### 5. 검색 결과가 없음

**증상**: `search-agents`나 `recommend-by-keywords`가 빈 결과 반환

**해결 방법**:
```bash
# 1. sub-agents 디렉토리 확인
ls -la sub-agents/

# 2. 에이전트 파일들이 있는지 확인
find sub-agents/ -name "*.md" | head -5

# 3. 다른 키워드로 시도
# "frontend" 대신 "developer", "web" 등 시도
```

---

## 🔧 고급 디버깅

### MCP 서버 수동 테스트

```bash
# 1. 직접 실행해서 오류 메시지 확인
cd /Users/hongmartin/Claude/sub-agent-context/pair-role-mcp-server
node dist/index.js

# 2. JSON-RPC 메시지 직접 전송 (고급)
echo '{"jsonrpc": "2.0", "id": 1, "method": "tools/list"}' | node dist/index.js
```

### 로그 파일 생성

`src/index.ts`에 디버그 로그 추가:
```typescript
// 임시 디버깅용 (개발 중에만)
console.error(`[DEBUG] Tool called: ${name}`);
console.error(`[DEBUG] Arguments:`, JSON.stringify(args, null, 2));
```

### 설정 파일 검증

```bash
# JSON 문법 검증
cat ~/.config/claude/mcp_servers.json | jq .
# 에러가 나면 JSON 문법 오류
```

---

## 🛠️ 환경별 해결책

### macOS (ASDF 사용)
```bash
# ASDF Node.js 경로 확인
asdf which node

# 경로 업데이트
# ~/.config/claude/mcp_servers.json에서 command 필드 수정
```

### macOS (Homebrew 사용)  
```bash
# Homebrew Node.js 경로
which node
# 보통 /opt/homebrew/bin/node 또는 /usr/local/bin/node
```

### Linux
```bash
# NVM 사용 시
which node
# ~/.nvm/versions/node/vX.X.X/bin/node 형태
```

---

## 📋 체크리스트

설치 후 다음 항목들을 순서대로 확인하세요:

### ✅ 기본 설정
- [ ] Node.js 16+ 설치됨
- [ ] 프로젝트가 빌드됨 (`npm run build`)  
- [ ] `dist/index.js` 파일 존재
- [ ] `dist/index.js`에 실행 권한 있음

### ✅ MCP 설정
- [ ] `~/.config/claude/mcp_servers.json` 파일 존재
- [ ] JSON 문법 올바름
- [ ] Node.js 경로 정확함
- [ ] 프로젝트 경로 정확함

### ✅ Claude Code 연동
- [ ] Claude Code 재시작함
- [ ] `mcp__pair-role__*` 도구들 보임
- [ ] 도구 실행 시 에러 없음

### ✅ 기능 테스트
- [ ] `list-agents` 작동
- [ ] `search-agents` 작동  
- [ ] `analyze-project` 작동
- [ ] `install-agents` 작동

---

## 🆘 긴급 복구 방법

### 완전 재설치
```bash
# 1. 기존 설정 백업
cp ~/.config/claude/mcp_servers.json ~/.config/claude/mcp_servers.json.backup

# 2. 프로젝트 완전 재빌드
cd /Users/hongmartin/Claude/sub-agent-context/pair-role-mcp-server
rm -rf dist/
rm -rf node_modules/
npm install
npm run build

# 3. 설정 파일 재생성  
cat > ~/.config/claude/mcp_servers.json << EOF
{
  "mcpServers": {
    "pair-role": {
      "command": "$(which node)",
      "args": ["$(pwd)/dist/index.js"],
      "cwd": "$(dirname $(pwd))",
      "env": {}
    }
  }
}
EOF

# 4. Claude Code 재시작
```

### 최소 설정으로 테스트
```json
{
  "mcpServers": {
    "pair-role": {
      "command": "node",
      "args": ["/Users/hongmartin/Claude/sub-agent-context/pair-role-mcp-server/dist/index.js"]
    }
  }
}
```

---

## 📞 추가 도움

여전히 문제가 해결되지 않으면:

1. **에러 메시지 전문 복사**
2. **환경 정보 수집**:
   ```bash
   node --version
   npm --version
   ls -la ~/.config/claude/
   ls -la dist/
   ```
3. **단계별 재현 과정 기록**

이 정보들을 바탕으로 더 구체적인 해결책을 제시받을 수 있습니다.