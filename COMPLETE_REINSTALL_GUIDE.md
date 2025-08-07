# Claude Desktop MCP 서버 완전 재설치 가이드

Claude Desktop이 이전 캐시를 사용하여 새로운 MCP 도구가 보이지 않는 문제를 해결하기 위한 완전 초기화 및 재설치 가이드입니다.

## 1단계: Claude Desktop 완전 종료

```bash
# Claude Desktop 프로세스 완전 종료
pkill -f "Claude"
killall "Claude"

# 백그라운드 프로세스도 확인
ps aux | grep -i claude | grep -v grep
```

## 2단계: Claude Desktop 설정 및 캐시 완전 삭제

```bash
# Claude Desktop 설정 디렉토리 백업 (필요시)
cp -r "$HOME/Library/Application Support/Claude" "$HOME/Library/Application Support/Claude_backup_$(date +%Y%m%d_%H%M%S)"

# Claude Desktop 모든 데이터 삭제
rm -rf "$HOME/Library/Application Support/Claude"
rm -rf "$HOME/Library/Caches/com.anthropic.claude"
rm -rf "$HOME/Library/Preferences/com.anthropic.claude.plist"
rm -rf "$HOME/Library/WebKit/com.anthropic.claude"
rm -rf "$HOME/Library/Logs/Claude"

# Saved Application State 삭제
rm -rf "$HOME/Library/Saved Application State/com.anthropic.claude.savedState"
```

## 3단계: NPM 패키지 완전 삭제

```bash
# 글로벌 claude-agents-power 패키지 삭제
npm uninstall -g claude-agents-power

# NPM 캐시 완전 정리
npm cache clean --force

# node_modules 캐시도 정리
rm -rf ~/.npm
rm -rf ~/.node-gyp

# 패키지 완전 삭제 확인
npm list -g --depth=0 | grep claude-agents-power
```

## 4단계: NPM 최신 패키지 설치

```bash
# 최신 버전 설치
npm install -g claude-agents-power@latest

# 설치 확인
npm list -g claude-agents-power
npx claude-agents-power --version

# 도구 목록 확인 (새로운 도구들이 보여야 함)
echo '{"jsonrpc": "2.0", "id": 1, "method": "tools/list", "params": {}}' | npx claude-agents-power
```

## 5단계: Claude Desktop 설정 재생성

```bash
# 설정 디렉토리 생성
mkdir -p "$HOME/Library/Application Support/Claude"

# 새로운 설정 파일 생성
cat > "$HOME/Library/Application Support/Claude/claude_desktop_config.json" << 'EOF'
{
  "mcpServers": {
    "claude-agents-power": {
      "command": "npx",
      "args": [
        "claude-agents-power@latest"
      ]
    }
  }
}
EOF
```

## 6단계: Claude Desktop 재시작 및 확인

```bash
# Claude Desktop 실행
open -a "Claude"
```

Claude Desktop이 시작되면:

1. **설정으로 이동**: Claude Desktop > Settings > Developer
2. **MCP 서버 상태 확인**: claude-agents-power가 "Connected" 상태인지 확인
3. **도구 사용 테스트**: 채팅에서 다음 명령 시도:
   ```
   /agents search frontend
   /agent-download --dryRun
   ```

## 7단계: 문제 해결

### MCP 서버가 연결되지 않는 경우:

```bash
# 설정 파일 확인
cat "$HOME/Library/Application Support/Claude/claude_desktop_config.json"

# 패키지 직접 실행 테스트
npx claude-agents-power

# 로그 확인 (Claude Desktop을 터미널에서 실행)
/Applications/Claude.app/Contents/MacOS/Claude
```

### 이전 도구들이 여전히 보이는 경우:

```bash
# 더 강력한 캐시 정리
sudo dscacheutil -flushcache
sudo killall -HUP mDNSResponder

# 시스템 재시작 권장
sudo reboot
```

## 8단계: 성공 확인

성공적으로 설치되었다면 Claude Desktop에서 다음 도구들이 보여야 합니다:

- ✅ `agents` (에이전트 검색)
- ✅ `agent-download` (AI 기반 에이전트 다운로드)
- ❌ `install-agents` (이전 도구, 보이면 안됨)
- ❌ `list-agents` (이전 도구, 보이면 안됨)

## 추가 팁

### 설정 파일 대안 (특정 버전 고정):

```json
{
  "mcpServers": {
    "claude-agents-power": {
      "command": "node",
      "args": [
        "/Users/hongmartin/.nvm/versions/node/v20.11.0/lib/node_modules/claude-agents-power/dist/index.js"
      ]
    }
  }
}
```

### 디버깅을 위한 로그 활성화:

```json
{
  "mcpServers": {
    "claude-agents-power": {
      "command": "npx",
      "args": [
        "claude-agents-power@latest"
      ],
      "env": {
        "DEBUG": "claude-agents-power:*"
      }
    }
  }
}
```

이 가이드를 따라하면 Claude Desktop이 완전히 초기화되어 최신 MCP 서버와 도구들을 인식하게 됩니다.