import { exec } from 'child_process';
import { promisify } from 'util';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const execAsync = promisify(exec);

interface SplashResult {
    success: boolean;
    message: string;
    analysis?: any;
    recommendations?: any[];
    error?: string;
}

export class SplashCommand {
    private projectPath: string;
    private claudeMdPath: string;

    constructor(projectPath: string = process.cwd()) {
        this.projectPath = projectPath;
        this.claudeMdPath = path.join(projectPath, 'CLAUDE.md');
    }

    async execute(): Promise<SplashResult> {
        try {
            console.log('🚀 CLAUDE AGENTS POWER - SPLASH INITIALIZATION');
            console.log('='.repeat(50));

            // Step 1: Check if already installed
            const installResult = await this.ensureInstallation();
            if (!installResult.success) {
                return installResult;
            }

            // Step 2: Analyze project
            console.log('\n📊 Analyzing your project...');
            const analysisResult = await this.analyzeProject();
            
            // Step 3: Generate splash display
            const splashDisplay = this.generateSplashDisplay(analysisResult);
            
            console.log(splashDisplay);

            return {
                success: true,
                message: 'Claude Agents Power activated successfully!',
                analysis: analysisResult.analysis,
                recommendations: analysisResult.recommendations
            };

        } catch (error) {
            console.error('❌ Splash initialization failed:', error);
            return {
                success: false,
                message: 'Failed to initialize Claude Agents Power',
                error: error instanceof Error ? error.message : String(error)
            };
        }
    }

    private async ensureInstallation(): Promise<{ success: boolean; message: string }> {
        try {
            // Check if already available locally
            try {
                const { stdout } = await execAsync('npx claude-agents-power --version');
                console.log(`✅ Claude Agents Power v${stdout.trim()} ready`);
                return { success: true, message: 'Already installed' };
            } catch {
                // Not installed, will use npx to fetch latest
                console.log('📦 Fetching latest Claude Agents Power...');
                return { success: true, message: 'Will use latest version via npx' };
            }
        } catch (error) {
            return { 
                success: false, 
                message: `Installation check failed: ${error instanceof Error ? error.message : String(error)}` 
            };
        }
    }

    private async analyzeProject(): Promise<any> {
        try {
            // Check for CLAUDE.md
            const claudeMdExists = fs.existsSync(this.claudeMdPath);
            
            let analysisCommand: string;
            if (claudeMdExists) {
                analysisCommand = `npx claude-agents-power@latest ai-analyze-project --claudeMdPath "${this.claudeMdPath}" --generateRecommendations true --limit 5`;
            } else {
                analysisCommand = `npx claude-agents-power@latest analyze-project --projectPath "${this.projectPath}"`;
            }

            console.log(`Running: ${analysisCommand}`);
            const { stdout } = await execAsync(analysisCommand);
            
            try {
                return JSON.parse(stdout);
            } catch {
                // If not JSON, create a basic structure
                return {
                    analysis: {
                        projectType: 'Unknown',
                        complexity: 5,
                        technologies: [],
                        description: 'Project analysis completed'
                    },
                    recommendations: []
                };
            }
        } catch (error) {
            console.warn('⚠️ Analysis failed, using basic setup');
            return {
                analysis: {
                    projectType: 'General Development',
                    complexity: 5,
                    technologies: ['General'],
                    description: 'Basic project setup detected'
                },
                recommendations: [
                    {
                        agent: 'frontend-developer',
                        priority: 'high',
                        reason: 'Essential for UI development'
                    },
                    {
                        agent: 'backend-developer', 
                        priority: 'high',
                        reason: 'Essential for server-side logic'
                    },
                    {
                        agent: 'qa-engineer',
                        priority: 'medium',
                        reason: 'Quality assurance and testing'
                    }
                ]
            };
        }
    }

    private generateSplashDisplay(analysisResult: any): string {
        const { analysis, recommendations = [] } = analysisResult;
        
        const banner = `
🚀 CLAUDE AGENTS POWER ACTIVATED!
${'='.repeat(50)}

📊 Project Analysis:
   • Type: ${analysis?.projectType || 'General Development'}
   • Complexity: ${analysis?.complexity || 5}/10
   • Technologies: ${Array.isArray(analysis?.technologies) ? analysis.technologies.join(', ') : 'Various'}
   ${analysis?.description ? `\n   • Description: ${analysis.description}` : ''}

🤖 Recommended AI Team:`;

        const agentList = recommendations.length > 0 
            ? recommendations.map((rec: any, index: number) => {
                const icons: { [key: string]: string } = {
                    'frontend-developer': '👨‍💻',
                    'backend-developer': '⚙️',
                    'security-engineer': '🛡️',
                    'data-scientist': '📊',
                    'qa-engineer': '🧪',
                    'devops-engineer': '🚀',
                    'product-manager': '🎯',
                    'mobile-developer': '📱'
                };
                
                const icon = icons[rec.agent] || '🤖';
                const name = rec.agent.split('-').map((word: string) => 
                    word.charAt(0).toUpperCase() + word.slice(1)
                ).join(' ');
                
                return `   ${index + 1}. ${icon} ${name} - ${rec.reason || 'Essential team member'}`;
            }).join('\n')
            : '   • No specific recommendations available\n   • All 246 agents are ready for use!';

        const footer = `

✅ Ready to enhance your workflow!

📚 Next Steps:
   • Install agents: agent-download --claudeMdPath ./CLAUDE.md
   • Browse catalog: agents --action list
   • View details: agents --action details --query frontend-developer
   • Get help: agents --action help

🌐 Explore all 246 agents: https://claude-agents-power.dev

${'='.repeat(50)}`;

        return banner + '\n' + agentList + footer;
    }
}

// CLI execution
export async function executeSplashCommand(projectPath?: string): Promise<SplashResult> {
    const splash = new SplashCommand(projectPath);
    return await splash.execute();
}