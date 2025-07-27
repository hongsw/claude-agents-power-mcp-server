export interface ProjectAnalysis {
    projectType: string[];
    technologies: string[];
    recommendedAgents: string[];
    confidence: number;
}
export declare class ProjectAnalyzer {
    private patterns;
    analyzeProject(projectPath: string): Promise<ProjectAnalysis>;
    getAgentsByKeywords(keywords: string[]): Promise<string[]>;
}
//# sourceMappingURL=projectAnalyzer.d.ts.map