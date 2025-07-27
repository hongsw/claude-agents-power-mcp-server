import https from 'https';
export class GitHubIntegration {
    config;
    downloadStats = new Map();
    constructor(config) {
        this.config = {
            owner: config.owner,
            repo: config.repo,
            branch: config.branch || 'main',
            path: config.path || 'sub-agents'
        };
    }
    async fetchAgentFromGitHub(agentName, language = 'en') {
        const filePath = language === 'en'
            ? `${this.config.path}/${agentName}.md`
            : `${this.config.path}/${language}/${agentName}.md`;
        const url = `https://raw.githubusercontent.com/${this.config.owner}/${this.config.repo}/${this.config.branch}/${filePath}`;
        try {
            const content = await this.fetchFromGitHub(url);
            if (!content)
                return undefined;
            // Track download
            this.trackDownload(agentName);
            // Parse the agent file
            const agent = this.parseAgentFile(content, agentName, language);
            return agent;
        }
        catch (error) {
            console.error(`Failed to fetch agent ${agentName} from GitHub:`, error);
            return undefined;
        }
    }
    async fetchAllAgentsFromGitHub() {
        // First, fetch the list of available agents
        const agents = [];
        // Fetch from pre-defined list of common agents
        const commonAgents = [
            'software-engineer', 'frontend-developer', 'backend-developer',
            'devops-engineer', 'data-engineer', 'data-scientist',
            'product-manager', 'ux-designer', 'qa-engineer',
            'security-engineer', 'cloud-architect', 'api-designer'
        ];
        for (const agentName of commonAgents) {
            const agent = await this.fetchAgentFromGitHub(agentName);
            if (agent) {
                agents.push(agent);
            }
        }
        return agents;
    }
    fetchFromGitHub(url) {
        return new Promise((resolve, reject) => {
            https.get(url, (res) => {
                if (res.statusCode !== 200) {
                    resolve(undefined);
                    return;
                }
                let data = '';
                res.on('data', (chunk) => {
                    data += chunk;
                });
                res.on('end', () => {
                    resolve(data);
                });
            }).on('error', (err) => {
                reject(err);
            });
        });
    }
    parseAgentFile(content, name, language) {
        const lines = content.split('\n');
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
            // If no frontmatter, parse from content
            const descMatch = content.match(/description:\s*(.+)/);
            const toolsMatch = content.match(/tools:\s*(.+)/);
            return {
                name,
                description: descMatch ? descMatch[1] : `${name} specialist`,
                tools: toolsMatch ? toolsMatch[1].split(', ') : ['Read', 'Write'],
                content: content,
                language
            };
        }
        // Parse frontmatter
        const frontmatter = {};
        for (const line of frontmatterLines) {
            const [key, ...valueParts] = line.split(':');
            if (key && valueParts.length > 0) {
                frontmatter[key.trim()] = valueParts.join(':').trim();
            }
        }
        return {
            name: frontmatter.name || name,
            description: frontmatter.description || `${name} specialist`,
            tools: frontmatter.tools ? frontmatter.tools.split(', ') : ['Read', 'Write'],
            content: contentLines.join('\n'),
            language
        };
    }
    trackDownload(agentName) {
        const count = this.downloadStats.get(agentName) || 0;
        this.downloadStats.set(agentName, count + 1);
    }
    getDownloadStats() {
        return new Map(this.downloadStats);
    }
    getMostDownloaded(limit = 10) {
        return Array.from(this.downloadStats.entries())
            .sort((a, b) => b[1] - a[1])
            .slice(0, limit)
            .map(([name, downloads]) => ({ name, downloads }));
    }
}
//# sourceMappingURL=githubIntegration.js.map