import { GitHubConfig } from './githubIntegration.js';
export interface Agent {
    name: string;
    description: string;
    tools: string[];
    content: string;
    language?: string;
}
export declare class AgentManager {
    private agentsPath;
    private agentsCache;
    private githubIntegration;
    private debug;
    constructor(agentsPath: string, githubConfig?: GitHubConfig, debug?: boolean);
    loadAgents(): Promise<void>;
    private loadAgent;
    getAgent(name: string, language?: string): Agent | undefined;
    getAllAgents(language?: string): Agent[];
    searchAgents(query: string): Agent[];
    installAgent(agent: Agent, targetPath: string): Promise<string>;
    installMultipleAgents(agentNames: string[], targetPath: string, language?: string): Promise<string[]>;
    getDownloadStats(): Map<string, number>;
    getMostDownloadedAgents(limit?: number): Array<{
        name: string;
        downloads: number;
    }>;
    refreshAgentsFromGitHub(): Promise<void>;
}
//# sourceMappingURL=agentManager.d.ts.map