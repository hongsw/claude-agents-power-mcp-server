# /splash - Claude Agents Power Splash Command

Quick setup command that installs, analyzes your project, and recommends the perfect AI agents for your team.

## Usage

```bash
/splash
```

## What it does

1. **Auto-installs** Claude Agents Power via NPX
2. **Analyzes** your current project structure and CLAUDE.md
3. **Recommends** the top 5 most relevant agents for your project
4. **Shows** a beautiful welcome message with next steps

## Example Output

```
🚀 CLAUDE AGENTS POWER ACTIVATED!

📊 Project Analysis:
   • Type: React E-commerce Platform
   • Complexity: 8/10
   • Technologies: React, TypeScript, Node.js
   
🤖 Recommended AI Team:
   1. 👨‍💻 Frontend Developer - React/TypeScript expert
   2. 🔒 Security Engineer - Payment security specialist  
   3. 📊 Data Scientist - Analytics and insights
   4. 🧪 QA Engineer - Testing strategy expert
   5. 🚀 DevOps Engineer - CI/CD and deployment

✅ Ready to enhance your workflow!

Next steps:
• Try: agent-download --claudeMdPath ./CLAUDE.md
• Browse all 246 agents at: https://claude-agents-power.dev
```

## Requirements

- Node.js 16+ 
- NPM or Yarn
- CLAUDE.md file in project root (recommended)

## Behind the scenes

This command runs:
```bash
npx claude-agents-power@latest ai-analyze-project --claudeMdPath ./CLAUDE.md --generateRecommendations true --limit 5
```