# 🚀 Claude Agents Power MCP Server

> Unleash the power of 100+ specialized Claude agents for your development team via MCP

[![npm version](https://img.shields.io/npm/v/claude-agents-power)](https://www.npmjs.com/package/claude-agents-power)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 🌟 Features

- **246 Specialized Agents**: From developers to managers, data scientists to security experts
- **AI-Powered Analysis**: Intelligent project analysis and agent recommendations
- **Multi-language Support**: English (146), Korean (87), Japanese (5), Chinese (8) agents
- **Automatic Integration**: Seamless integration with Claude Desktop
- **Smart Recommendations**: Context-aware agent suggestions based on your project

## 📦 Installation

### Via NPM (Recommended)
```bash
npm install -g claude-agents-power
```

### Via Claude Desktop Configuration
Add to your Claude Desktop config:
```json
{
  "mcpServers": {
    "claude-agents-power": {
      "command": "npx",
      "args": ["claude-agents-power"]
    }
  }
}
```

## 🎯 Quick Start

### 1. Analyze Your Project
```javascript
// AI-powered project analysis
ai-analyze-project --claudeMdPath ./CLAUDE.md
```

### 2. Get Recommended Agents
The system automatically recommends agents based on:
- Project type and complexity
- Technology stack
- Missing capabilities
- Development phase

### 3. Install Agents
```javascript
// Auto-install recommended agents
agent-download --claudeMdPath ./CLAUDE.md --targetDir ./.claude/agents
```

## 🤖 Available Agent Categories

### Development (30+ agents)
- `frontend-developer` - UI/UX specialist
- `backend-developer` - Server-side expert
- `full-stack-developer` - End-to-end developer
- `mobile-developer` - iOS/Android specialist
- And many more...

### Data & Analytics (20+ agents)
- `data-scientist` - ML/AI expert
- `data-engineer` - Pipeline specialist
- `data-analyst` - Insights expert
- `dba` - Database administrator

### Management (15+ agents)
- `tech-lead` - Technical leadership
- `product-manager` - Product strategy
- `project-manager` - Project coordination
- `scrum-master` - Agile facilitator

### Quality & Security (10+ agents)
- `qa-engineer` - Testing specialist
- `security-engineer` - Security expert
- `devops-engineer` - Infrastructure specialist

## 🔥 AI-Powered Features

### Intelligent Project Analysis
```json
{
  "projectType": "web-application",
  "complexity": 9,
  "technologies": ["React", "TypeScript", "Node.js"],
  "recommendedAgents": [
    "frontend-developer",
    "qa-engineer",
    "security-engineer"
  ]
}
```

### Smart Agent Matching
- Analyzes your CLAUDE.md file
- Detects project requirements
- Recommends relevant agents
- Prioritizes based on needs

## 📖 Usage Examples

### Example 1: React E-commerce Platform
```bash
# Automatically recommends:
# - frontend-developer (UI implementation)
# - qa-engineer (testing strategy)
# - security-engineer (payment security)
# - devops-engineer (deployment)
```

### Example 2: Data Pipeline Project
```bash
# Automatically recommends:
# - data-engineer (pipeline design)
# - data-scientist (ML models)
# - dba (database optimization)
```

### Example 3: Mobile App Development
```bash
# Search for mobile specialists
agents --search "mobile" --language en
```

## 🌍 Multi-language Support

| Language | Agents | Code |
|----------|--------|------|
| English | 146 | en |
| Korean | 87 | ko |
| Japanese | 5 | ja |
| Chinese | 8 | zh |

## 📊 Project Statistics

- **Total Agents**: 246
- **Categories**: 15+
- **Languages**: 4
- **Tools Supported**: Read, Write, Edit, Bash, Grep
- **AI Analysis**: Advanced project understanding

## 🛠️ MCP Tools

### Core Tools
- `analyze-project` - Basic project analysis
- `ai-analyze-project` - AI-powered deep analysis
- `agents` - Search, list, and get agent details
- `manage-agents` - Install and manage agents
- `agent-download` - AI-powered agent recommendations and download

## 🔧 Configuration

### CLAUDE.md File
Create a `CLAUDE.md` file in your project root:
```markdown
# Project Name

## Overview
Describe your project here...

## Technologies
- React
- TypeScript
- Node.js

## Requirements
- User authentication
- Real-time updates
- Payment processing
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

MIT License - see [LICENSE](LICENSE) file for details

## 🆘 Support

- **Issues**: [GitHub Issues](https://github.com/hongsw/claude-agents-power-mcp-server/issues)
- **Documentation**: [Full Docs](https://github.com/hongsw/claude-agents-power-mcp-server/wiki)
- **NPM**: [Package Page](https://www.npmjs.com/package/claude-agents-power)

## 🎉 Credits

Created with ❤️ by the Claude Agents Power team

---

**Note**: This MCP server requires Claude Desktop 0.5.0 or higher