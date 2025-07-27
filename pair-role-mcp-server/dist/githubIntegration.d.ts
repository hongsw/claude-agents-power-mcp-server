import { Agent } from './agentManager.js';
export interface GitHubConfig {
    owner: string;
    repo: string;
    branch?: string;
    path?: string;
}
export declare class GitHubIntegration {
    private config;
    private downloadStats;
    constructor(config: GitHubConfig);
    fetchAgentFromGitHub(agentName: string, language?: string): Promise<Agent | undefined>;
    fetchAllAgentsFromGitHub(): Promise<Agent[]>;
    private fetchFromGitHub;
    private parseAgentFile;
    private trackDownload;
    getDownloadStats(): Map<string, number>;
    getMostDownloaded(limit?: number): Array<{
        name: string;
        downloads: number;
    }>;
}
//# sourceMappingURL=githubIntegration.d.ts.map