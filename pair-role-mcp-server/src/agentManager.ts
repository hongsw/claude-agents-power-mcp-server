import { promises as fs } from 'fs';
import path from 'path';
import yaml from 'js-yaml';

export interface Agent {
  name: string;
  description: string;
  tools: string[];
  content: string;
  language?: string;
}

export class AgentManager {
  private agentsPath: string;
  private agentsCache: Map<string, Agent> = new Map();

  constructor(agentsPath: string) {
    this.agentsPath = agentsPath;
  }

  async loadAgents(): Promise<void> {
    // Load English agents
    const enAgentsPath = this.agentsPath;
    const enFiles = await fs.readdir(enAgentsPath);
    
    for (const file of enFiles) {
      if (file.endsWith('.md')) {
        const agent = await this.loadAgent(path.join(enAgentsPath, file), 'en');
        if (agent) {
          this.agentsCache.set(agent.name, agent);
        }
      }
    }

    // Load Korean agents
    const krAgentsPath = path.join(this.agentsPath, 'kr');
    try {
      const krFiles = await fs.readdir(krAgentsPath);
      for (const file of krFiles) {
        if (file.endsWith('.md')) {
          const agent = await this.loadAgent(path.join(krAgentsPath, file), 'kr');
          if (agent) {
            this.agentsCache.set(`${agent.name}-kr`, agent);
          }
        }
      }
    } catch (e) {
      // Korean agents directory doesn't exist
    }
  }

  private async loadAgent(filePath: string, language: string = 'en'): Promise<Agent | null> {
    try {
      const content = await fs.readFile(filePath, 'utf-8');
      const lines = content.split('\\n');
      
      // Find YAML frontmatter
      let inFrontmatter = false;
      let frontmatterLines: string[] = [];
      let contentLines: string[] = [];
      
      for (let i = 0; i < lines.length; i++) {
        if (lines[i] === '---') {
          if (!inFrontmatter) {
            inFrontmatter = true;
          } else {
            // End of frontmatter
            contentLines = lines.slice(i + 1);
            break;
          }
        } else if (inFrontmatter) {
          frontmatterLines.push(lines[i]);
        }
      }

      if (frontmatterLines.length === 0) {
        return null;
      }

      const frontmatter = yaml.load(frontmatterLines.join('\\n')) as any;
      
      return {
        name: frontmatter.name,
        description: frontmatter.description,
        tools: frontmatter.tools.split(', '),
        content: contentLines.join('\\n'),
        language
      };
    } catch (e) {
      console.error(`Error loading agent from ${filePath}:`, e);
      return null;
    }
  }

  getAgent(name: string, language: string = 'en'): Agent | undefined {
    const key = language === 'en' ? name : `${name}-${language}`;
    return this.agentsCache.get(key) || this.agentsCache.get(name);
  }

  getAllAgents(language?: string): Agent[] {
    const agents: Agent[] = [];
    
    for (const [key, agent] of this.agentsCache.entries()) {
      if (!language || agent.language === language) {
        agents.push(agent);
      }
    }
    
    return agents;
  }

  searchAgents(query: string): Agent[] {
    const results: Agent[] = [];
    const lowerQuery = query.toLowerCase();
    
    for (const agent of this.agentsCache.values()) {
      if (
        agent.name.toLowerCase().includes(lowerQuery) ||
        agent.description.toLowerCase().includes(lowerQuery)
      ) {
        results.push(agent);
      }
    }
    
    return results;
  }

  async installAgent(agent: Agent, targetPath: string): Promise<string> {
    const subAgentsDir = path.join(targetPath, '.claude', 'sub-agents');
    await fs.mkdir(subAgentsDir, { recursive: true });
    
    const agentPath = path.join(subAgentsDir, `${agent.name}.md`);
    
    const content = `---
name: ${agent.name}
description: ${agent.description}
tools: ${agent.tools.join(', ')}
---

${agent.content}`;
    
    await fs.writeFile(agentPath, content, 'utf-8');
    
    return agentPath;
  }

  async installMultipleAgents(agentNames: string[], targetPath: string, language: string = 'en'): Promise<string[]> {
    const installedPaths: string[] = [];
    
    for (const agentName of agentNames) {
      const agent = this.getAgent(agentName, language);
      if (agent) {
        const path = await this.installAgent(agent, targetPath);
        installedPaths.push(path);
      }
    }
    
    return installedPaths;
  }
}