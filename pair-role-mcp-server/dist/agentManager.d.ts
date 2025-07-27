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
    constructor(agentsPath: string);
    loadAgents(): Promise<void>;
    private loadAgent;
    getAgent(name: string, language?: string): Agent | undefined;
    getAllAgents(language?: string): Agent[];
    searchAgents(query: string): Agent[];
    installAgent(agent: Agent, targetPath: string): Promise<string>;
    installMultipleAgents(agentNames: string[], targetPath: string, language?: string): Promise<string[]>;
}
//# sourceMappingURL=agentManager.d.ts.map