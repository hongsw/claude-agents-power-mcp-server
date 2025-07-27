import { promises as fs } from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import { GitHubIntegration, GitHubConfig } from './githubIntegration.js';

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
  private githubIntegration: GitHubIntegration;
  private debug: boolean;

  constructor(agentsPath: string, githubConfig?: GitHubConfig, debug: boolean = false) {
    this.debug = debug;
    this.agentsPath = agentsPath;
    
    // Initialize GitHub integration with default repository
    this.githubIntegration = new GitHubIntegration(
      githubConfig || {
        owner: 'baryonlabs',
        repo: 'claude-sub-agent-contents',
        branch: 'main',
        path: 'sub-agents'
      }
    );
  }

  async loadAgents(): Promise<void> {
    try {
      // Check if the agents directory exists
      await fs.access(this.agentsPath);
      
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
    } catch (error) {
      if (this.debug) {
        console.error('[MCP Sub-Agents] Local agents directory not found. Agents will be fetched from GitHub as needed.');
      }
      // Try to fetch some common agents from GitHub
      await this.refreshAgentsFromGitHub();
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
      // First try to get from cache
      let agent = this.getAgent(agentName, language);
      
      // If not in cache, try to fetch from GitHub
      if (!agent) {
        if (this.debug) {
          console.error(`[MCP Sub-Agents] Agent ${agentName} not found locally, fetching from GitHub...`);
        }
        agent = await this.githubIntegration.fetchAgentFromGitHub(agentName, language);
        
        if (agent) {
          // Add to cache
          const key = language === 'en' ? agent.name : `${agent.name}-${language}`;
          this.agentsCache.set(key, agent);
        }
      }
      
      if (agent) {
        const path = await this.installAgent(agent, targetPath);
        installedPaths.push(path);
      } else {
        if (this.debug) {
          console.error(`[MCP Sub-Agents] Failed to find or fetch agent: ${agentName}`);
        }
      }
    }
    
    return installedPaths;
  }

  // Get download statistics
  getDownloadStats(): Map<string, number> {
    return this.githubIntegration.getDownloadStats();
  }

  // Get most downloaded agents
  getMostDownloadedAgents(limit: number = 10): Array<{name: string, downloads: number}> {
    return this.githubIntegration.getMostDownloaded(limit);
  }

  // Fetch and cache agents from GitHub
  async refreshAgentsFromGitHub(): Promise<void> {
    const agents = await this.githubIntegration.fetchAllAgentsFromGitHub();
    
    for (const agent of agents) {
      const key = agent.language === 'en' ? agent.name : `${agent.name}-${agent.language}`;
      this.agentsCache.set(key, agent);
    }
    
    if (this.debug) {
      console.error(`[MCP Sub-Agents] Refreshed ${agents.length} agents from GitHub`);
    }
  }
}