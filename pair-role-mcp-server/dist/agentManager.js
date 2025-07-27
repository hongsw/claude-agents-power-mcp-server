import { promises as fs } from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import { GitHubIntegration } from './githubIntegration.js';
export class AgentManager {
    agentsPath;
    agentsCache = new Map();
    githubIntegration;
    constructor(agentsPath, githubConfig) {
        this.agentsPath = agentsPath;
        // Initialize GitHub integration with default repository
        this.githubIntegration = new GitHubIntegration(githubConfig || {
            owner: 'baryonlabs',
            repo: 'claude-sub-agent-contents',
            branch: 'main',
            path: 'sub-agents'
        });
    }
    async loadAgents() {
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
        }
        catch (e) {
            // Korean agents directory doesn't exist
        }
    }
    async loadAgent(filePath, language = 'en') {
        try {
            const content = await fs.readFile(filePath, 'utf-8');
            const lines = content.split('\\n');
            // Find YAML frontmatter
            let inFrontmatter = false;
            let frontmatterLines = [];
            let contentLines = [];
            for (let i = 0; i < lines.length; i++) {
                if (lines[i] === '---') {
                    if (!inFrontmatter) {
                        inFrontmatter = true;
                    }
                    else {
                        // End of frontmatter
                        contentLines = lines.slice(i + 1);
                        break;
                    }
                }
                else if (inFrontmatter) {
                    frontmatterLines.push(lines[i]);
                }
            }
            if (frontmatterLines.length === 0) {
                return null;
            }
            const frontmatter = yaml.load(frontmatterLines.join('\\n'));
            return {
                name: frontmatter.name,
                description: frontmatter.description,
                tools: frontmatter.tools.split(', '),
                content: contentLines.join('\\n'),
                language
            };
        }
        catch (e) {
            console.error(`Error loading agent from ${filePath}:`, e);
            return null;
        }
    }
    getAgent(name, language = 'en') {
        const key = language === 'en' ? name : `${name}-${language}`;
        return this.agentsCache.get(key) || this.agentsCache.get(name);
    }
    getAllAgents(language) {
        const agents = [];
        for (const [key, agent] of this.agentsCache.entries()) {
            if (!language || agent.language === language) {
                agents.push(agent);
            }
        }
        return agents;
    }
    searchAgents(query) {
        const results = [];
        const lowerQuery = query.toLowerCase();
        for (const agent of this.agentsCache.values()) {
            if (agent.name.toLowerCase().includes(lowerQuery) ||
                agent.description.toLowerCase().includes(lowerQuery)) {
                results.push(agent);
            }
        }
        return results;
    }
    async installAgent(agent, targetPath) {
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
    async installMultipleAgents(agentNames, targetPath, language = 'en') {
        const installedPaths = [];
        for (const agentName of agentNames) {
            // First try to get from cache
            let agent = this.getAgent(agentName, language);
            // If not in cache, try to fetch from GitHub
            if (!agent) {
                console.log(`Agent ${agentName} not found locally, fetching from GitHub...`);
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
            }
            else {
                console.warn(`Failed to find or fetch agent: ${agentName}`);
            }
        }
        return installedPaths;
    }
    // Get download statistics
    getDownloadStats() {
        return this.githubIntegration.getDownloadStats();
    }
    // Get most downloaded agents
    getMostDownloadedAgents(limit = 10) {
        return this.githubIntegration.getMostDownloaded(limit);
    }
    // Fetch and cache agents from GitHub
    async refreshAgentsFromGitHub() {
        const agents = await this.githubIntegration.fetchAllAgentsFromGitHub();
        for (const agent of agents) {
            const key = agent.language === 'en' ? agent.name : `${agent.name}-${agent.language}`;
            this.agentsCache.set(key, agent);
        }
        console.log(`Refreshed ${agents.length} agents from GitHub`);
    }
}
//# sourceMappingURL=agentManager.js.map