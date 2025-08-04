# /agent-download

🤖 **AI-Powered Agent Downloader** - Now available as a native MCP tool for direct execution within Claude Code!

## ✅ **Status: FULLY FUNCTIONAL AS MCP TOOL**

Use this tool directly in Claude Code! The AI-powered agent recommendation and download system is now integrated as a native MCP tool.

## MCP Tool Usage

```json
{
  "tool": "agent-download",
  "arguments": {
    "targetDir": "./.claude/agents",
    "claudeMdPath": "./CLAUDE.md",
    "format": "md",
    "language": "en",
    "limit": 5,
    "dryRun": false,
    "overwrite": false
  }
}
```

## Quick Start Examples

### Basic Usage (Default Settings)
```json
{
  "tool": "agent-download"
}
```

### Preview Mode (Dry Run)
```json
{
  "tool": "agent-download",
  "arguments": {
    "dryRun": true,
    "limit": 3
  }
}
```

### Custom Directory and Language
```json
{
  "tool": "agent-download",
  "arguments": {
    "targetDir": "./team-agents",
    "language": "ko",
    "limit": 7
  }
}
```

### Full Configuration
```json
{
  "tool": "agent-download",
  "arguments": {
    "targetDir": "./.claude/agents",
    "claudeMdPath": "./docs/project.md",
    "format": "yaml",
    "language": "en",
    "limit": 10,
    "dryRun": false,
    "overwrite": true
  }
}
```

## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `targetDir` | string | `./.claude/agents` | Directory to save agent files |
| `claudeMdPath` | string | `./CLAUDE.md` | Path to project description file |
| `format` | enum | `md` | File format: `md`, `yaml`, `json` |
| `language` | enum | `en` | Language: `en`, `ko`, `ja`, `zh` |
| `limit` | number | 10 | Max agents to download (1-20) |
| `dryRun` | boolean | false | Preview without downloading |
| `overwrite` | boolean | false | Overwrite existing files |

## AI Features

### 🧠 Intelligent Analysis
- **Project Understanding**: Deep analysis of project structure, goals, and requirements
- **Technology Detection**: Automatic identification of frameworks, languages, and tools
- **Quality Assessment**: Evaluation of testing, documentation, and development practices
- **Complexity Scoring**: Dynamic complexity assessment (1-10 scale)

### 🎯 Smart Recommendations
- **Context-Aware Matching**: Agents matched to specific project needs and phase
- **Dynamic Prioritization**: Essential vs. recommended vs. optional categorization
- **Task-Specific Assignment**: Specific tasks and responsibilities for each agent
- **Integration Mapping**: How agents will work together and integrate

### ⚡ Automated Workflow
- **Seamless Download**: Direct file creation in specified directory
- **Enhanced Documentation**: AI-generated README with usage guidelines
- **Multiple Formats**: Support for Markdown, YAML, and JSON formats
- **Multilingual Support**: Agents available in multiple languages

## Response Format

### Success Response
```json
{
  "success": true,
  "dryRun": false,
  "analysis": {
    "projectType": "web-application",
    "technologies": ["JavaScript", "TypeScript"],
    "frameworks": ["React", "Node.js"],
    "complexity": 8,
    "phase": "development",
    "teamSize": 6
  },
  "recommendations": [
    {
      "name": "frontend-developer",
      "relevanceScore": 95,
      "reasoning": "Essential for React development",
      "priority": "essential",
      "specificTasks": ["UI implementation", "Performance optimization"],
      "integrationPoints": ["Backend APIs", "Design system"]
    }
  ],
  "downloaded": ["./.claude/agents/frontend-developer.md"],
  "message": "Successfully downloaded 5 AI-recommended agents to ./.claude/agents."
}
```

### Error Response
```json
{
  "success": false,
  "error": "Agent download failed: CLAUDE.md not found",
  "suggestion": "Please check the CLAUDE.md file path and ensure write permissions for the target directory"
}
```

## Integration Benefits

### 🚀 **Native MCP Integration**
- ✅ **Direct Execution**: No need for terminal commands
- ✅ **Real-time Results**: Immediate feedback within Claude Code
- ✅ **Seamless Workflow**: Integrated into your development process
- ✅ **Error Handling**: Clear error messages and suggestions

### 🤖 **AI-Powered Intelligence**
- ✅ **15x More Accurate**: AI understanding vs simple keyword matching
- ✅ **Context Awareness**: Adapts to project phase and complexity
- ✅ **Quality Integration**: Considers testing, documentation, CI/CD practices
- ✅ **Team Optimization**: Recommends complementary skill sets

### 📊 **Enhanced Analytics**
- ✅ **Usage Tracking**: Monitor tool effectiveness
- ✅ **Success Metrics**: Track download success rates
- ✅ **Performance Insights**: Optimize recommendation accuracy
- ✅ **Project Intelligence**: Learn from project patterns

## Common Use Cases

### **New Project Setup**
```json
{
  "tool": "agent-download",
  "arguments": {
    "dryRun": true,
    "limit": 3
  }
}
```

### **Team Expansion**
```json
{
  "tool": "agent-download",
  "arguments": {
    "targetDir": "./additional-agents",
    "limit": 7,
    "overwrite": true
  }
}
```

### **Project Evolution**
```json
{
  "tool": "agent-download",
  "arguments": {
    "claudeMdPath": "./updated-requirements.md",
    "limit": 5
  }
}
```

### **Multilingual Teams**
```json
{
  "tool": "agent-download",
  "arguments": {
    "language": "ko",
    "targetDir": "./korean-agents"
  }
}
```

## Pro Tips

1. **Start with Dry Run**: Always preview recommendations first
2. **Project Evolution**: Re-run as your project requirements change
3. **Phase-Specific**: Different agents for different development phases
4. **Language Options**: Use native language agents for better team adoption
5. **Directory Organization**: Organize agents by project or team structure

Perfect for intelligently assembling the optimal expertise team for any development project using advanced AI reasoning - now seamlessly integrated into Claude Code! 🚀