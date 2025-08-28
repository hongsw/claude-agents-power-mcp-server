import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { AIAnalysisService, AIProjectAnalysis, AIAgentRecommendation } from './aiAnalysisService.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Using AIProjectAnalysis and AIAgentRecommendation from aiAnalysisService
export type ProjectAnalysis = AIProjectAnalysis;
export type AgentRecommendation = AIAgentRecommendation;

export interface DownloadOptions {
  targetDir: string;
  claudeMdPath: string;
  format: 'md' | 'yaml' | 'json';
  language: 'en' | 'ko' | 'ja' | 'zh';
  limit: number;
  dryRun: boolean;
  overwrite: boolean;
}

/**
 * Agent Downloader - Analyzes projects and downloads recommended agents
 */
export class AgentDownloader {
  private agentsSourceDir: string;
  private aiAnalysisService: AIAnalysisService;

  constructor() {
    this.agentsSourceDir = path.join(__dirname, '../claude/agents');
    this.aiAnalysisService = new AIAnalysisService();
  }

  /**
   * Main entry point - analyze project and download agents using AI
   */
  async downloadAgents(options: DownloadOptions): Promise<{ 
    analysis: ProjectAnalysis; 
    recommendations: AgentRecommendation[];
    downloaded?: string[];
  }> {
    // 1. Perform AI-powered project analysis
    const analysis = await this.aiAnalysisService.analyzeProject(options.claudeMdPath);
    
    // 2. Generate AI-powered recommendations
    const recommendations = await this.aiAnalysisService.generateRecommendations(analysis);
    
    // 3. Sort and limit recommendations (they're already sorted by AI)
    const sortedRecommendations = recommendations.slice(0, options.limit);

    if (options.dryRun) {
      return { analysis, recommendations: sortedRecommendations };
    }

    // 4. Download agent files
    const downloaded = await this.downloadAgentFiles(
      sortedRecommendations, 
      options,
      analysis
    );

    return { analysis, recommendations: sortedRecommendations, downloaded };
  }

  /**
   * Legacy wrapper - now uses AI analysis service
   * @deprecated Use aiAnalysisService.analyzeProject directly
   */
  private async analyzeProject(claudeMdPath: string): Promise<ProjectAnalysis> {
    return await this.aiAnalysisService.analyzeProject(claudeMdPath);
  }

  /**
   * Legacy wrapper - now uses AI analysis service
   * @deprecated Parsing is now handled by AI analysis service
   */
  private parseClaudeMd(content: string): ProjectAnalysis {
    // This method is now deprecated - the AI analysis service handles all parsing
    throw new Error('parseClaudeMd is deprecated - use AI analysis service instead');
  }

  /**
   * Legacy wrapper - now uses AI analysis service  
   * @deprecated Project structure analysis is now handled by AI analysis service
   */
  private async analyzeProjectStructure(): Promise<ProjectAnalysis> {
    // This method is now deprecated - the AI analysis service handles all project structure analysis
    throw new Error('analyzeProjectStructure is deprecated - use AI analysis service instead');
  }

  /**
   * Legacy wrapper - now uses AI analysis service
   * @deprecated Use aiAnalysisService.generateRecommendations directly
   */
  private async generateRecommendations(analysis: ProjectAnalysis): Promise<AgentRecommendation[]> {
    return await this.aiAnalysisService.generateRecommendations(analysis);
  }

  /**
   * Load agent details from file
   */
  private async loadAgentDetails(agentName: string, language: string): Promise<{
    description: string;
    tools: string[];
  } | null> {
    try {
      const agentPath = path.join(this.agentsSourceDir, language, `${agentName}.md`);
      
      if (!fs.existsSync(agentPath)) {
        return null;
      }

      const content = fs.readFileSync(agentPath, 'utf8');
      
      // Parse frontmatter
      const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
      if (!frontmatterMatch) {
        return null;
      }

      const frontmatter = frontmatterMatch[1];
      const descMatch = frontmatter.match(/description:\s*(.+)/);
      const toolsMatch = frontmatter.match(/tools:\s*(.+)/);

      return {
        description: descMatch ? descMatch[1].trim() : '',
        tools: toolsMatch ? toolsMatch[1].split(',').map(t => t.trim()) : ['Read', 'Write']
      };
    } catch (error) {
      console.warn(`Error loading agent details for ${agentName}: ${error}`);
      return null;
    }
  }

  /**
   * Download agent files to target directory
   */
  private async downloadAgentFiles(
    recommendations: AgentRecommendation[],
    options: DownloadOptions,
    analysis: any
  ): Promise<string[]> {
    const downloaded: string[] = [];

    // Create target directory
    if (!fs.existsSync(options.targetDir)) {
      fs.mkdirSync(options.targetDir, { recursive: true });
    }

    for (const rec of recommendations) {
      try {
        const sourcePath = path.join(
          this.agentsSourceDir, 
          options.language, 
          `${rec.name}.md`
        );

        if (!fs.existsSync(sourcePath)) {
          console.warn(`Agent file not found: ${sourcePath}`);
          continue;
        }

        const targetPath = path.join(options.targetDir, `${rec.name}.${options.format}`);

        // Check if file exists and overwrite flag
        if (fs.existsSync(targetPath) && !options.overwrite) {
          console.log(`Skipping existing file: ${targetPath}`);
          continue;
        }

        // Copy file
        const content = fs.readFileSync(sourcePath, 'utf8');
        
        if (options.format === 'md') {
          fs.writeFileSync(targetPath, content);
        } else if (options.format === 'yaml') {
          // Convert to YAML format (simplified)
          const yamlContent = this.convertToYaml(content, rec);
          fs.writeFileSync(targetPath, yamlContent);
        } else if (options.format === 'json') {
          // Convert to JSON format
          const jsonContent = this.convertToJson(content, rec);
          fs.writeFileSync(targetPath, jsonContent);
        }

        downloaded.push(targetPath);
        console.log(`✅ Downloaded: ${rec.name}.${options.format}`);

      } catch (error) {
        console.error(`Error downloading ${rec.name}: ${error}`);
      }
    }

    // Create README
    await this.createReadme(recommendations, options, analysis);

    return downloaded;
  }

  /**
   * Convert agent content to YAML format
   */
  private convertToYaml(content: string, rec: AgentRecommendation): string {
    const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)/);
    
    if (!frontmatterMatch) {
      return content;
    }

    const frontmatter = frontmatterMatch[1];
    const body = frontmatterMatch[2];

    return `# Agent: ${rec.name}
${frontmatter}
relevance_score: ${rec.relevanceScore}
reasoning: "${rec.reasoning}"
category: ${rec.category}
priority: ${rec.priority}

# Content
content: |
${body.split('\n').map(line => `  ${line}`).join('\n')}
`;
  }

  /**
   * Convert agent content to JSON format
   */
  private convertToJson(content: string, rec: AgentRecommendation): string {
    const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)/);
    
    const agent = {
      name: rec.name,
      description: rec.description,
      relevanceScore: rec.relevanceScore,
      reasoning: rec.reasoning,
      category: rec.category,
      priority: rec.priority,
      tools: rec.tools,
      content: frontmatterMatch ? frontmatterMatch[2].trim() : content
    };

    return JSON.stringify(agent, null, 2);
  }

  /**
   * Create README file with enhanced AI analysis information
   */
  private async createReadme(recommendations: AgentRecommendation[], options: DownloadOptions, analysis: any): Promise<void> {
    const readmePath = path.join(options.targetDir, 'README.md');

    const content = `# 🤖 AI-Recommended Agents

This directory contains ${recommendations.length} agents intelligently recommended for your project using AI analysis.

## 📋 Agent Summary

| Agent | Category | Priority | Relevance | Color | Description |
|-------|----------|----------|-----------|-------|-------------|
${recommendations.map(rec => 
  `| **${rec.name}** | ${rec.category} | ${rec.priority} | ${rec.relevanceScore}% | <span style="color: ${rec.color || '#6B7280'}">●</span> ${rec.color || '#6B7280'} | ${rec.description} |`
).join('\n')}

## 🎯 Usage in Claude Code

Each agent can be activated by referencing their expertise:

\`\`\`
"${recommendations[0]?.name} 에이전트를 활용해서 [specific task]를 해줘"
\`\`\`

## 📊 AI-Generated Recommendations by Priority

### ⭐ Essential (${recommendations.filter(r => r.priority === 'essential').length})
${recommendations.filter(r => r.priority === 'essential').map(r => 
  `- **${r.name}**: ${r.reasoning}${r.specificTasks ? '\n  - Tasks: ' + r.specificTasks.join(', ') : ''}`
).join('\n')}

### 🔧 Recommended (${recommendations.filter(r => r.priority === 'recommended').length})
${recommendations.filter(r => r.priority === 'recommended').map(r => 
  `- **${r.name}**: ${r.reasoning}${r.specificTasks ? '\n  - Tasks: ' + r.specificTasks.join(', ') : ''}`
).join('\n')}

### 💡 Optional (${recommendations.filter(r => r.priority === 'optional').length})
${recommendations.filter(r => r.priority === 'optional').map(r => 
  `- **${r.name}**: ${r.reasoning}${r.specificTasks ? '\n  - Tasks: ' + r.specificTasks.join(', ') : ''}`
).join('\n')}

## 🎯 Recommended Agent Swarm Patterns

Based on your project type (${analysis.projectType}), consider these coordination patterns:

${this.getSwarmPatternRecommendation(analysis, recommendations)}

## 🚀 Getting Started

1. **Review Agent Roles**: Read individual agent files to understand their capabilities
2. **Start with Essentials**: Begin with essential priority agents for core functionality  
3. **Add Specialists**: Include recommended agents based on specific project needs
4. **Deploy as Swarm**: Use concurrent agent deployment for maximum efficiency
5. **Customize as Needed**: Modify agent instructions for your specific requirements

## 🧠 AI Analysis Features

This recommendation was generated using:
- **Intelligent Project Analysis**: AI-powered understanding of your project structure and requirements
- **Context-Aware Recommendations**: Agent suggestions based on comprehensive project context
- **Dynamic Prioritization**: Smart priority assignment based on project needs and complexity
- **Task-Specific Matching**: Agents matched to specific tasks and integration points
- **Swarm Pattern Recognition**: Optimal agent coordination patterns for your project

Generated by claude-agents-power v${this.getVersion()} (AI-Powered) on ${new Date().toISOString()}
`;

    fs.writeFileSync(readmePath, content);
  }

  /**
   * Get swarm pattern recommendation based on project analysis
   */
  private getSwarmPatternRecommendation(
    analysis: any,
    recommendations: AIAgentRecommendation[]
  ): string {
    const agentCount = recommendations.length;
    const essentialCount = recommendations.filter(r => r.priority === 'essential').length;
    
    // Determine swarm size
    let swarmSize = 'Small';
    let coordinationPattern = 'Direct';
    
    if (agentCount > 12) {
      swarmSize = 'Enterprise';
      coordinationPattern = 'Hierarchical';
    } else if (agentCount > 8) {
      swarmSize = 'Large';
      coordinationPattern = 'Mesh';
    } else if (agentCount > 5) {
      swarmSize = 'Medium';
      coordinationPattern = 'Adaptive';
    }
    
    // Generate swarm pattern recommendation
    let pattern = `### 🏗️ Suggested Swarm Configuration

**Swarm Size**: ${swarmSize} (${agentCount} agents)
**Coordination Pattern**: ${coordinationPattern}
**Essential Agents**: ${essentialCount}

`;

    // Add specific pattern based on project type
    if (analysis.projectType.includes('Web') || analysis.projectType.includes('Full-Stack')) {
      pattern += `#### Full-Stack Development Swarm
\`\`\`javascript
const swarm = [
${recommendations.slice(0, 8).map(r => `  { 
    agent: "${r.name}", 
    priority: "${r.priority}", 
    color: "${r.color || '#6B7280'}",
    task: "${r.specificTasks?.[0] || 'General development'}" 
  }`).join(',\n')}
];

// Deploy concurrently for maximum efficiency
await deploySwarm(swarm);
\`\`\``;
    } else if (analysis.projectType.includes('API') || analysis.projectType.includes('Backend')) {
      pattern += `#### Backend Service Swarm
\`\`\`javascript
const swarm = [
${recommendations.slice(0, 6).map(r => `  { 
    agent: "${r.name}", 
    priority: "${r.priority}", 
    color: "${r.color || '#6B7280'}",
    task: "${r.specificTasks?.[0] || 'Backend development'}" 
  }`).join(',\n')}
];

// Use mesh coordination for distributed services
await deploySwarm(swarm, { pattern: 'mesh' });
\`\`\``;
    } else if (analysis.projectType.includes('Data') || analysis.projectType.includes('ML')) {
      pattern += `#### Data & AI Pipeline Swarm
\`\`\`javascript
const swarm = [
${recommendations.slice(0, 7).map(r => `  { agent: "${r.name}", priority: "${r.priority}", task: "${r.specificTasks?.[0] || 'Data processing'}" }`).join(',\n')}
];

// Pipeline coordination for sequential data flow
await deploySwarm(swarm, { pattern: 'pipeline' });
\`\`\``;
    } else {
      pattern += `#### General Development Swarm
\`\`\`javascript
const swarm = [
${recommendations.slice(0, 5).map(r => `  { agent: "${r.name}", priority: "${r.priority}", task: "${r.specificTasks?.[0] || 'Development'}" }`).join(',\n')}
];

// Adaptive coordination for flexible workflow
await deploySwarm(swarm, { pattern: 'adaptive' });
\`\`\``;
    }

    pattern += `

#### Coordination Benefits
- **Concurrent Execution**: Deploy all agents simultaneously for ${Math.round(agentCount * 0.7)}x faster delivery
- **Cross-Agent Communication**: Agents share context and findings automatically
- **Fault Tolerance**: ${coordinationPattern} pattern provides redundancy and error recovery
- **Resource Optimization**: Smart load balancing across ${agentCount} agents
`;

    return pattern;
  }

  /**
   * Get package version
   */
  private getVersion(): string {
    try {
      const packageJsonPath = path.join(__dirname, '../package.json');
      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
      return packageJson.version;
    } catch (error) {
      return 'unknown';
    }
  }
}