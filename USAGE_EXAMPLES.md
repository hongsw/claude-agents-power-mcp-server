# Claude Agents Power - Usage Examples

## 🚀 Quick Start Guide

This guide demonstrates how to use the Claude Agents Power MCP Server effectively with your projects.

## Installation

```bash
npm install -g claude-agents-power
```

## Basic Usage

### 1. Analyze Your Project

```javascript
// Use AI-powered project analysis
mcp__claude-agents-power__ai-analyze-project({
  claudeMdPath: "./CLAUDE.md",
  generateRecommendations: true,
  maxRecommendations: 5
})
```

### 2. Search for Specific Agents

```javascript
// Search for frontend specialists
mcp__claude-agents-power__agents({
  action: "search",
  query: "frontend",
  language: "en"
})
```

### 3. Install Recommended Agents

```javascript
// Auto-download AI-recommended agents
mcp__claude-agents-power__agent-download({
  claudeMdPath: "./CLAUDE.md",
  targetDir: "./.claude/agents",
  limit: 5,
  language: "en"
})
```

## Real-World Examples

### Example 1: React E-commerce Platform

For a React-based e-commerce project, the system automatically recommends:

1. **frontend-developer** - For UI implementation
2. **qa-engineer** - For testing strategies
3. **security-engineer** - For payment security
4. **devops-engineer** - For deployment
5. **tech-lead** - For technical coordination

### Example 2: Data Analysis Project

For data-heavy projects:

```javascript
// Install data-focused agents
mcp__claude-agents-power__manage-agents({
  action: "install",
  agentNames: ["data-scientist", "data-engineer", "dba"],
  targetPath: "./.claude/agents"
})
```

### Example 3: Mobile App Development

```javascript
// Get mobile development specialists
mcp__claude-agents-power__agents({
  action: "recommend",
  keywords: ["mobile", "ios", "android", "react-native"],
  language: "en"
})
```

## Agent Integration in Claude

Once agents are installed in `.claude/agents/`, they become available in Claude Desktop:

1. **Auto-activation**: Agents activate based on context
2. **Manual invocation**: Use `@agent-name` to invoke specific agents
3. **Collaboration**: Multiple agents can work together on complex tasks

## Advanced Features

### AI-Powered Project Analysis

The system analyzes your project and provides:
- Project complexity score (1-10)
- Technology stack detection
- Framework identification
- Quality indicators
- Team size estimation

### Smart Agent Recommendations

Based on your project's:
- Current development phase
- Missing capabilities (e.g., no tests detected)
- Technology stack
- Complexity level

### Multi-language Support

```javascript
// Get agents in different languages
mcp__claude-agents-power__agents({
  action: "list",
  language: "ko"  // Korean agents
})
```

Supported languages:
- English (en) - 146 agents
- Korean (ko) - 87 agents
- Japanese (ja) - 5 agents
- Chinese (zh) - 8 agents

## Best Practices

1. **Start with AI Analysis**: Let the system analyze your project first
2. **Install Core Agents**: Begin with essential agents for your project type
3. **Add Specialists**: Add domain-specific agents as needed
4. **Regular Updates**: Keep agents updated with latest versions
5. **Team Alignment**: Ensure all team members have the same agents

## Troubleshooting

### Common Issues

1. **Agent not found**: Check language parameter
2. **Installation failed**: Verify target directory permissions
3. **AI analysis incomplete**: Ensure CLAUDE.md has project details

### Debug Mode

```javascript
// Enable detailed logging
mcp__claude-agents-power__manage-agents({
  action: "version"  // Check server status
})
```

## Support

- GitHub Issues: [Report issues](https://github.com/hongsw/claude-agents-power-mcp-server/issues)
- Documentation: [Full documentation](https://github.com/hongsw/claude-agents-power-mcp-server)
- NPM Package: [claude-agents-power](https://www.npmjs.com/package/claude-agents-power)

## License

MIT License - See LICENSE file for details