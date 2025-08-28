import fs from 'fs';
import path from 'path';
import { glob } from 'glob';

export interface AIProjectAnalysis {
  projectType: string;
  technologies: string[];
  frameworks: string[];
  complexity: number;
  phase: string;
  teamSize: number;
  description?: string;
  goals?: string[];
  requirements?: string[];
  architecturalPatterns?: string[];
  developmentPractices?: string[];
  qualityIndicators?: {
    hasTests: boolean;
    hasDocumentation: boolean;
    hasCI: boolean;
    hasLinting: boolean;
    codeComplexity: 'low' | 'medium' | 'high';
  };
}

export interface AIAgentRecommendation {
  name: string;
  description: string;
  relevanceScore: number;
  reasoning: string;
  tools: string[];
  category: string;
  priority: 'essential' | 'recommended' | 'optional';
  color?: string; // HEX color code for agent visualization
  specificTasks?: string[];
  integrationPoints?: string[];
}

/**
 * AI-Powered Project Analysis Service
 * Uses intelligent analysis instead of static rules to understand projects
 */
export class AIAnalysisService {
  
  /**
   * Perform comprehensive AI analysis of a project
   */
  async analyzeProject(claudeMdPath: string, projectRoot?: string): Promise<AIProjectAnalysis> {
    const projectPath = projectRoot || path.dirname(claudeMdPath);
    
    // Gather comprehensive project context
    const context = await this.gatherProjectContext(claudeMdPath, projectPath);
    
    // Perform AI analysis
    const analysis = await this.performAIAnalysis(context);
    
    return analysis;
  }

  /**
   * Generate agent recommendations based on AI analysis
   */
  async generateRecommendations(analysis: AIProjectAnalysis): Promise<AIAgentRecommendation[]> {
    // Use AI to generate intelligent recommendations
    return this.performAIRecommendation(analysis);
  }

  /**
   * Gather comprehensive project context for AI analysis
   */
  private async gatherProjectContext(claudeMdPath: string, projectPath: string): Promise<{
    claudeMdContent?: string;
    fileStructure: string[];
    packageInfo?: any;
    configFiles: string[];
    codeMetrics: {
      totalFiles: number;
      codeFiles: number;
      testFiles: number;
      docFiles: number;
      languages: string[];
    };
    dependencies?: any;
    gitInfo?: {
      hasGit: boolean;
      recentCommits?: string[];
      branches?: string[];
    };
  }> {
    const context: any = {
      fileStructure: [],
      configFiles: [],
      codeMetrics: {
        totalFiles: 0,
        codeFiles: 0,
        testFiles: 0,
        docFiles: 0,
        languages: []
      }
    };

    // Read CLAUDE.md if exists
    try {
      if (fs.existsSync(claudeMdPath)) {
        context.claudeMdContent = fs.readFileSync(claudeMdPath, 'utf8');
      }
    } catch (error) {
      // Continue without CLAUDE.md
    }

    try {
      // Get file structure (limited depth to avoid performance issues)
      const files = await glob('**/*', { 
        cwd: projectPath,
        ignore: ['node_modules/**', 'dist/**', 'build/**', '.git/**', 'venv/**', '__pycache__/**'],
        nodir: true,
        maxDepth: 4
      });

      context.fileStructure = files.slice(0, 100); // Limit for performance
      context.codeMetrics.totalFiles = files.length;

      // Analyze file types
      const codeExtensions = ['.js', '.ts', '.jsx', '.tsx', '.py', '.java', '.go', '.rs', '.php', '.rb', '.cs', '.cpp', '.c', '.h'];
      const testExtensions = ['.test.', '.spec.', '_test.', '_spec.'];
      const docExtensions = ['.md', '.rst', '.txt', '.doc'];

      files.forEach(file => {
        const ext = path.extname(file);
        const basename = path.basename(file);
        
        if (codeExtensions.includes(ext)) {
          context.codeMetrics.codeFiles++;
          const lang = this.getLanguageFromExtension(ext);
          if (lang && !context.codeMetrics.languages.includes(lang)) {
            context.codeMetrics.languages.push(lang);
          }
        }
        
        if (testExtensions.some(testExt => basename.includes(testExt))) {
          context.codeMetrics.testFiles++;
        }
        
        if (docExtensions.includes(ext)) {
          context.codeMetrics.docFiles++;
        }
      });

      // Identify config files
      const configPatterns = [
        'package.json', 'package-lock.json', 'yarn.lock',
        'requirements.txt', 'pyproject.toml', 'setup.py',
        'Cargo.toml', 'go.mod', 'pom.xml', 'build.gradle',
        'Dockerfile', 'docker-compose.yml',
        '.gitignore', '.eslintrc*', '.prettierrc*',
        'tsconfig.json', 'webpack.config.js', 'vite.config.*',
        'tailwind.config.js', 'next.config.js', 'nuxt.config.js'
      ];

      context.configFiles = files.filter(file => 
        configPatterns.some(pattern => 
          pattern.includes('*') ? 
            file.includes(pattern.replace('*', '')) : 
            path.basename(file) === pattern
        )
      );

      // Read package.json for detailed dependency analysis
      const packageJsonPath = path.join(projectPath, 'package.json');
      if (fs.existsSync(packageJsonPath)) {
        try {
          context.packageInfo = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
          context.dependencies = {
            ...context.packageInfo.dependencies,
            ...context.packageInfo.devDependencies
          };
        } catch (e) {
          // Continue without package.json parsing
        }
      }

      // Check for git repository
      const gitPath = path.join(projectPath, '.git');
      context.gitInfo = {
        hasGit: fs.existsSync(gitPath)
      };

    } catch (error) {
      console.warn('Error gathering project context:', error);
    }

    return context;
  }

  /**
   * Perform AI-powered analysis of the project context
   */
  private async performAIAnalysis(context: any): Promise<AIProjectAnalysis> {
    // This is where we would integrate with Claude API or use AI reasoning
    // For now, implementing intelligent rule-based analysis that mimics AI decision making
    
    const analysis: AIProjectAnalysis = {
      projectType: 'unknown',
      technologies: [],
      frameworks: [],
      complexity: 5,
      phase: 'development',
      teamSize: 5,
      description: '',
      goals: [],
      requirements: [],
      architecturalPatterns: [],
      developmentPractices: [],
      qualityIndicators: {
        hasTests: context.codeMetrics.testFiles > 0,
        hasDocumentation: context.codeMetrics.docFiles > 5,
        hasCI: context.configFiles.some((file: string) => file.includes('.github/workflows') || file.includes('.gitlab-ci')),
        hasLinting: context.configFiles.some((file: string) => file.includes('eslint') || file.includes('prettier')),
        codeComplexity: context.codeMetrics.totalFiles > 100 ? 'high' : context.codeMetrics.totalFiles > 30 ? 'medium' : 'low'
      }
    };

    // Extract information from CLAUDE.md with intelligent parsing
    if (context.claudeMdContent) {
      analysis.description = this.extractProjectDescription(context.claudeMdContent);
      analysis.goals = this.extractProjectGoals(context.claudeMdContent);
      analysis.requirements = this.extractProjectRequirements(context.claudeMdContent);
    }

    // Intelligent project type detection
    analysis.projectType = this.determineProjectType(context);
    
    // Technology and framework detection with context awareness
    analysis.technologies = this.detectTechnologies(context);
    analysis.frameworks = this.detectFrameworks(context);
    
    // Complexity assessment using multiple factors
    analysis.complexity = this.calculateComplexity(context, analysis);
    
    // Development phase detection
    analysis.phase = this.determineDevelopmentPhase(context, analysis);
    
    // Optimal team size recommendation
    analysis.teamSize = this.recommendTeamSize(analysis);
    
    // Architectural patterns detection
    analysis.architecturalPatterns = this.detectArchitecturalPatterns(context);
    
    // Development practices assessment
    analysis.developmentPractices = this.assessDevelopmentPractices(context);

    return analysis;
  }

  /**
   * Generate intelligent agent recommendations based on analysis
   */
  private async performAIRecommendation(analysis: AIProjectAnalysis): Promise<AIAgentRecommendation[]> {
    const recommendations: AIAgentRecommendation[] = [];

    // Intelligent recommendation rules based on comprehensive analysis
    const recommendationRules = this.createIntelligentRecommendationRules();

    for (const rule of recommendationRules) {
      const relevance = rule.evaluate(analysis);
      if (relevance.isRelevant) {
        recommendations.push({
          name: rule.agentName,
          description: rule.description,
          relevanceScore: relevance.score,
          reasoning: relevance.reasoning,
          tools: rule.tools,
          category: rule.category,
          priority: relevance.priority,
          color: this.getAgentColor(rule.agentName, rule.category),
          specificTasks: relevance.specificTasks,
          integrationPoints: relevance.integrationPoints
        });
      }
    }

    // Sort by relevance score and apply intelligent filtering
    return recommendations
      .sort((a, b) => b.relevanceScore - a.relevanceScore)
      .slice(0, analysis.teamSize + 2); // Recommend slightly more than team size
  }

  /**
   * Create intelligent recommendation rules
   */
  private createIntelligentRecommendationRules() {
    return [
      // Frontend Development Rules
      {
        agentName: 'frontend-developer',
        description: 'UI/UX implementation specialist with modern web technologies expertise',
        category: 'development',
        tools: ['Read', 'Write', 'Edit', 'MultiEdit', 'Bash'],
        evaluate: (analysis: AIProjectAnalysis) => {
          const hasFrontend = analysis.frameworks.some(f => ['React', 'Vue', 'Angular', 'Svelte'].includes(f)) ||
                             analysis.technologies.includes('JavaScript') ||
                             analysis.projectType.includes('web');
          
          if (!hasFrontend) return { isRelevant: false, score: 0, reasoning: '', priority: 'optional' as const };

          let score = 90;
          let reasoning = 'Essential for frontend development with ';
          const tasks = ['Implement user interfaces', 'Optimize performance', 'Ensure accessibility'];
          const integrationPoints = ['Backend APIs', 'Design system', 'Testing framework'];

          if (analysis.frameworks.length > 0) {
            score += 5;
            reasoning += analysis.frameworks.join(', ');
          } else {
            reasoning += 'modern web technologies';
          }

          if (analysis.qualityIndicators?.hasTests) {
            tasks.push('Write frontend tests');
            score += 3;
          }

          return {
            isRelevant: true,
            score,
            reasoning,
            priority: 'essential' as const,
            specificTasks: tasks,
            integrationPoints
          };
        }
      },

      // Backend Development Rules  
      {
        agentName: 'backend-engineer',
        description: 'Server-side development and API specialist',
        category: 'development',
        tools: ['Read', 'Write', 'Edit', 'MultiEdit', 'Bash'],
        evaluate: (analysis: AIProjectAnalysis) => {
          const hasBackend = analysis.technologies.includes('Node.js') ||
                            analysis.technologies.includes('Python') ||
                            analysis.technologies.includes('Java') ||
                            analysis.projectType.includes('api') ||
                            analysis.projectType.includes('server');

          if (!hasBackend) return { isRelevant: false, score: 0, reasoning: '', priority: 'optional' as const };

          let score = 95;
          let reasoning = 'Critical for backend development and API design';
          const tasks = ['Design APIs', 'Implement business logic', 'Database integration'];
          const integrationPoints = ['Frontend applications', 'Database systems', 'External services'];

          if (analysis.complexity > 7) {
            score += 3;
            tasks.push('Optimize performance');
            reasoning += ' with complex system requirements';
          }

          if (analysis.qualityIndicators?.hasTests) {
            tasks.push('API testing and validation');
          }

          return {
            isRelevant: true,
            score,
            reasoning,
            priority: 'essential' as const,
            specificTasks: tasks,
            integrationPoints
          };
        }
      },

      // Full-Stack Development Rules
      {
        agentName: 'full-stack-developer',
        description: 'End-to-end development specialist',
        category: 'development',
        tools: ['Read', 'Write', 'Edit', 'MultiEdit', 'Bash', 'WebSearch'],
        evaluate: (analysis: AIProjectAnalysis) => {
          const hasBothEnds = analysis.frameworks.length > 0 && 
                             (analysis.technologies.includes('Node.js') || analysis.technologies.includes('Python'));

          if (!hasBothEnds) return { isRelevant: false, score: 0, reasoning: '', priority: 'optional' as const };

          let score = 88;
          const reasoning = 'Perfect for full-stack applications requiring end-to-end integration';
          const tasks = ['Coordinate frontend-backend integration', 'Implement full features', 'System architecture'];
          const integrationPoints = ['Frontend frameworks', 'Backend services', 'Database layer'];

          if (analysis.teamSize <= 3) {
            score += 7; // More valuable for smaller teams
          }

          return {
            isRelevant: true,
            score,
            reasoning,
            priority: 'essential' as const,
            specificTasks: tasks,
            integrationPoints
          };
        }
      },

      // DevOps and Infrastructure Rules
      {
        agentName: 'devops-engineer',
        description: 'Infrastructure and deployment specialist',
        category: 'infrastructure',
        tools: ['Read', 'Write', 'Bash', 'Edit'],
        evaluate: (analysis: AIProjectAnalysis) => {
          const needsDevOps = analysis.complexity > 6 ||
                             analysis.technologies.includes('Docker') ||
                             analysis.qualityIndicators?.hasCI ||
                             analysis.phase === 'deployment';

          if (!needsDevOps) return { isRelevant: false, score: 0, reasoning: '', priority: 'optional' as const };

          let score = 82;
          let reasoning = 'Required for deployment and infrastructure management';
          const tasks = ['Setup CI/CD pipelines', 'Configure deployment', 'Monitor systems'];
          const integrationPoints = ['Development workflow', 'Production environment', 'Monitoring tools'];

          if (analysis.technologies.includes('Docker')) {
            score += 8;
            reasoning += ' with containerization expertise';
          }

          if (analysis.complexity > 8) {
            score += 5;
            tasks.push('Scale infrastructure');
          }

          return {
            isRelevant: true,
            score,
            reasoning,
            priority: analysis.phase === 'deployment' ? 'essential' as const : 'recommended' as const,
            specificTasks: tasks,
            integrationPoints
          };
        }
      },

      // Quality Assurance Rules
      {
        agentName: 'qa-engineer',
        description: 'Quality assurance and testing specialist',
        category: 'quality',
        tools: ['Read', 'Write', 'Bash'],
        evaluate: (analysis: AIProjectAnalysis) => {
          const needsQA = analysis.complexity > 5 || 
                         analysis.projectType.includes('web') ||
                         !analysis.qualityIndicators?.hasTests;

          if (!needsQA) return { isRelevant: false, score: 0, reasoning: '', priority: 'optional' as const };

          let score = 75;
          let reasoning = 'Important for quality assurance and testing strategy';
          const tasks = ['Design test strategies', 'Implement automated testing', 'Quality validation'];
          const integrationPoints = ['Development workflow', 'CI/CD pipeline', 'User acceptance'];

          if (!analysis.qualityIndicators?.hasTests) {
            score += 10;
            reasoning += ' - no existing tests detected';
            tasks.unshift('Establish testing framework');
          }

          if (analysis.complexity > 8) {
            score += 5;
            tasks.push('Performance testing');
          }

          return {
            isRelevant: true,
            score,
            reasoning,
            priority: 'recommended' as const,
            specificTasks: tasks,
            integrationPoints
          };
        }
      },

      // Security Engineering Rules
      {
        agentName: 'security-engineer',
        description: 'Security and compliance specialist',
        category: 'security',
        tools: ['Read', 'Bash', 'Edit'],
        evaluate: (analysis: AIProjectAnalysis) => {
          const needsSecurity = analysis.projectType.includes('web') ||
                               analysis.complexity > 7 ||
                               analysis.technologies.some(t => ['authentication', 'payment', 'data'].some(s => t.toLowerCase().includes(s)));

          if (!needsSecurity) return { isRelevant: false, score: 0, reasoning: '', priority: 'optional' as const };

          let score = 78;
          let reasoning = 'Critical for security and compliance requirements';
          const tasks = ['Security audits', 'Implement security measures', 'Compliance validation'];
          const integrationPoints = ['Authentication systems', 'Data protection', 'API security'];

          if (analysis.projectType.includes('web')) {
            score += 7;
            tasks.push('Web application security');
          }

          if (analysis.complexity > 8) {
            score += 5;
            reasoning += ' for complex systems';
          }

          return {
            isRelevant: true,
            score,
            reasoning,
            priority: 'recommended' as const,
            specificTasks: tasks,
            integrationPoints
          };
        }
      },

      // Technical Leadership Rules
      {
        agentName: 'tech-lead',
        description: 'Technical leadership and architecture specialist',
        category: 'management',
        tools: ['Read', 'Write'],
        evaluate: (analysis: AIProjectAnalysis) => {
          const needsLeadership = analysis.complexity > 7 ||
                                 analysis.technologies.length > 4 ||
                                 analysis.teamSize > 5;

          if (!needsLeadership) return { isRelevant: false, score: 0, reasoning: '', priority: 'optional' as const };

          let score = 83;
          const reasoning = 'Essential for technical leadership and coordination in complex projects';
          const tasks = ['Technical decision making', 'Team coordination', 'Architecture oversight'];
          const integrationPoints = ['Development team', 'Project stakeholders', 'Architecture decisions'];

          if (analysis.teamSize > 7) {
            score += 5;
          }

          return {
            isRelevant: true,
            score,
            reasoning,
            priority: 'recommended' as const,
            specificTasks: tasks,
            integrationPoints
          };
        }
      },

      // Documentation Specialist Rules
      {
        agentName: 'technical-writer',
        description: 'Documentation and content specialist',
        category: 'documentation',
        tools: ['Read', 'Write', 'Edit'],
        evaluate: (analysis: AIProjectAnalysis) => {
          const needsDocs = analysis.complexity > 6 ||
                           !analysis.qualityIndicators?.hasDocumentation ||
                           analysis.projectType.includes('api');

          if (!needsDocs) return { isRelevant: false, score: 0, reasoning: '', priority: 'optional' as const };

          let score = 65;
          let reasoning = 'Important for documentation and user guides';
          const tasks = ['Create technical documentation', 'API documentation', 'User guides'];
          const integrationPoints = ['Development workflow', 'User experience', 'Knowledge management'];

          if (!analysis.qualityIndicators?.hasDocumentation) {
            score += 8;
            reasoning += ' - insufficient documentation detected';
          }

          if (analysis.projectType.includes('api')) {
            score += 7;
            tasks.push('API documentation');
          }

          return {
            isRelevant: true,
            score,
            reasoning,
            priority: 'optional' as const,
            specificTasks: tasks,
            integrationPoints
          };
        }
      }
    ];
  }

  // Helper methods for analysis

  private getLanguageFromExtension(ext: string): string | null {
    const langMap: Record<string, string> = {
      '.js': 'JavaScript',
      '.ts': 'TypeScript', 
      '.jsx': 'React',
      '.tsx': 'React TypeScript',
      '.py': 'Python',
      '.java': 'Java',
      '.go': 'Go',
      '.rs': 'Rust',
      '.php': 'PHP',
      '.rb': 'Ruby',
      '.cs': 'C#',
      '.cpp': 'C++',
      '.c': 'C'
    };
    return langMap[ext] || null;
  }

  private extractProjectDescription(content: string): string {
    // Extract description from CLAUDE.md
    const lines = content.split('\n');
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (line.startsWith('# ') && line.length > 2) {
        return line.substring(2).trim();
      }
    }
    return 'Project description not available';
  }

  private extractProjectGoals(content: string): string[] {
    const goals: string[] = [];
    const lines = content.split('\n');
    let inGoalsSection = false;

    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed.toLowerCase().includes('goal') || trimmed.toLowerCase().includes('objective')) {
        inGoalsSection = true;
        continue;
      }
      if (inGoalsSection && trimmed.startsWith('- ')) {
        goals.push(trimmed.substring(2));
      } else if (inGoalsSection && trimmed.startsWith('#')) {
        break;
      }
    }

    return goals;
  }

  private extractProjectRequirements(content: string): string[] {
    const requirements: string[] = [];
    const lines = content.split('\n');
    let inReqSection = false;

    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed.toLowerCase().includes('requirement') || trimmed.toLowerCase().includes('need')) {
        inReqSection = true;
        continue;
      }
      if (inReqSection && trimmed.startsWith('- ')) {
        requirements.push(trimmed.substring(2));
      } else if (inReqSection && trimmed.startsWith('#')) {
        break;
      }
    }

    return requirements;
  }

  private determineProjectType(context: any): string {
    const files = context.fileStructure;
    const deps = context.dependencies || {};

    // Web application detection
    if (files.some((f: string) => f.includes('index.html')) || 
        Object.keys(deps).some(dep => ['react', 'vue', 'angular'].includes(dep))) {
      return 'web-application';
    }

    // API detection
    if (files.some((f: string) => f.includes('api/') || f.includes('server.')) || 
        Object.keys(deps).some(dep => ['express', 'fastapi', 'nest'].includes(dep))) {
      return 'api-service';
    }

    // Mobile app detection
    if (files.some((f: string) => f.includes('pubspec.yaml') || f.includes('Info.plist')) ||
        Object.keys(deps).some(dep => ['react-native', 'ionic', 'flutter'].includes(dep))) {
      return 'mobile-application';
    }

    // CLI tool detection
    if (files.some((f: string) => f.includes('bin/') || f.includes('cli.')) ||
        context.packageInfo?.bin) {
      return 'cli-tool';
    }

    // Library detection
    if (context.packageInfo?.main && !context.packageInfo?.private) {
      return 'library';
    }

    return 'application';
  }

  private detectTechnologies(context: any): string[] {
    const technologies = new Set<string>();
    const deps = context.dependencies || {};
    const languages = context.codeMetrics.languages || [];

    // Add detected languages
    languages.forEach((lang: string) => technologies.add(lang));

    // Database technologies
    if (Object.keys(deps).some(dep => dep.includes('postgres'))) technologies.add('PostgreSQL');
    if (Object.keys(deps).some(dep => dep.includes('mongo'))) technologies.add('MongoDB');
    if (Object.keys(deps).some(dep => dep.includes('redis'))) technologies.add('Redis');
    if (Object.keys(deps).some(dep => dep.includes('mysql'))) technologies.add('MySQL');

    // Cloud and infrastructure
    if (Object.keys(deps).some(dep => dep.includes('aws'))) technologies.add('AWS');
    if (context.fileStructure.some((f: string) => f.includes('Dockerfile'))) technologies.add('Docker');
    if (context.fileStructure.some((f: string) => f.includes('kubernetes'))) technologies.add('Kubernetes');

    // Build tools and bundlers
    if (Object.keys(deps).some(dep => ['webpack', 'vite', 'rollup', 'parcel'].includes(dep))) {
      technologies.add('Build Tools');
    }

    return Array.from(technologies);
  }

  private detectFrameworks(context: any): string[] {
    const frameworks = new Set<string>();
    const deps = context.dependencies || {};

    // Frontend frameworks
    if (Object.keys(deps).some(dep => dep.includes('react'))) frameworks.add('React');
    if (Object.keys(deps).some(dep => dep.includes('vue'))) frameworks.add('Vue');
    if (Object.keys(deps).some(dep => dep.includes('angular'))) frameworks.add('Angular');
    if (Object.keys(deps).some(dep => dep.includes('svelte'))) frameworks.add('Svelte');
    if (Object.keys(deps).some(dep => dep.includes('next'))) frameworks.add('Next.js');
    if (Object.keys(deps).some(dep => dep.includes('nuxt'))) frameworks.add('Nuxt.js');

    // Backend frameworks
    if (Object.keys(deps).some(dep => dep.includes('express'))) frameworks.add('Express');
    if (Object.keys(deps).some(dep => dep.includes('nest'))) frameworks.add('NestJS');
    if (Object.keys(deps).some(dep => dep.includes('koa'))) frameworks.add('Koa');

    // Testing frameworks
    if (Object.keys(deps).some(dep => ['jest', 'mocha', 'chai', 'cypress'].includes(dep))) {
      frameworks.add('Testing Framework');
    }

    return Array.from(frameworks);
  }

  private calculateComplexity(context: any, analysis: AIProjectAnalysis): number {
    let complexity = 5; // Base complexity

    // File count impact
    if (context.codeMetrics.totalFiles > 100) complexity += 2;
    if (context.codeMetrics.totalFiles > 50) complexity += 1;

    // Technology diversity
    complexity += Math.min(analysis.technologies.length * 0.5, 2);
    
    // Framework complexity
    if (analysis.frameworks.length > 2) complexity += 1;

    // Language diversity
    if (context.codeMetrics.languages.length > 2) complexity += 1;

    // Architecture indicators
    if (context.fileStructure.some((f: string) => f.includes('microservice'))) complexity += 2;
    if (context.fileStructure.some((f: string) => f.includes('api/') && f.includes('v1/'))) complexity += 1;

    // Quality indicators (well-structured projects are more complex to maintain)
    if (analysis.qualityIndicators?.hasTests) complexity += 0.5;
    if (analysis.qualityIndicators?.hasCI) complexity += 0.5;
    if (analysis.qualityIndicators?.hasLinting) complexity += 0.5;

    return Math.min(Math.round(complexity * 10) / 10, 10);
  }

  private determineDevelopmentPhase(context: any, analysis: AIProjectAnalysis): string {
    // Phase detection based on project indicators
    if (context.codeMetrics.totalFiles < 10) return 'planning';
    if (!analysis.qualityIndicators?.hasTests && context.codeMetrics.codeFiles > 0) return 'development';
    if (analysis.qualityIndicators?.hasTests && analysis.qualityIndicators?.hasCI) return 'testing';
    if (context.fileStructure.some((f: string) => f.includes('docker') || f.includes('deploy'))) return 'deployment';
    if (analysis.qualityIndicators?.hasDocumentation && analysis.qualityIndicators?.hasCI) return 'maintenance';
    
    return 'development';
  }

  private recommendTeamSize(analysis: AIProjectAnalysis): number {
    let teamSize = 3; // Base team size

    // Complexity impact
    if (analysis.complexity > 8) teamSize += 3;
    else if (analysis.complexity > 6) teamSize += 2;
    else if (analysis.complexity > 4) teamSize += 1;

    // Technology diversity impact
    if (analysis.technologies.length > 5) teamSize += 2;
    else if (analysis.technologies.length > 3) teamSize += 1;

    // Project type impact
    if (analysis.projectType.includes('enterprise')) teamSize += 2;
    if (analysis.projectType.includes('microservice')) teamSize += 1;

    return Math.min(teamSize, 12); // Cap at 12 for practical reasons
  }

  private detectArchitecturalPatterns(context: any): string[] {
    const patterns: string[] = [];
    const files = context.fileStructure;

    if (files.some((f: string) => f.includes('component') && f.includes('service'))) {
      patterns.push('Component-Service Architecture');
    }
    if (files.some((f: string) => f.includes('api/v'))) {
      patterns.push('Versioned API');
    }
    if (files.some((f: string) => f.includes('middleware'))) {
      patterns.push('Middleware Pattern');
    }
    if (files.some((f: string) => f.includes('repository') || f.includes('dao'))) {
      patterns.push('Repository Pattern');
    }
    if (files.some((f: string) => f.includes('model') && f.includes('view') && f.includes('controller'))) {
      patterns.push('MVC Architecture');
    }

    return patterns;
  }

  private assessDevelopmentPractices(context: any): string[] {
    const practices: string[] = [];

    if (context.qualityIndicators?.hasTests) practices.push('Automated Testing');
    if (context.qualityIndicators?.hasCI) practices.push('Continuous Integration');
    if (context.qualityIndicators?.hasLinting) practices.push('Code Quality Tools');
    if (context.qualityIndicators?.hasDocumentation) practices.push('Documentation');
    if (context.gitInfo?.hasGit) practices.push('Version Control');
    if (context.fileStructure.some((f: string) => f.includes('docker'))) practices.push('Containerization');

    return practices;
  }

  /**
   * Get color code for agent based on name and category
   */
  private getAgentColor(agentName: string, category: string): string {
    // Color palette based on agent types and categories
    const colorMap: Record<string, string> = {
      // Core Development (Blue shades)
      'frontend-developer': '#3B82F6',
      'backend-engineer': '#1E40AF',
      'full-stack-developer': '#2563EB',
      'mobile-developer': '#60A5FA',
      
      // Architecture & Design (Purple shades)
      'system-architect': '#8B5CF6',
      'solution-architect': '#7C3AED',
      'technical-architect': '#9333EA',
      'api-designer': '#A78BFA',
      
      // Data & AI (Green shades)
      'data-scientist': '#10B981',
      'ml-engineer': '#059669',
      'data-engineer': '#34D399',
      'ai-specialist': '#6EE7B7',
      
      // Security (Red shades)
      'security-engineer': '#EF4444',
      'security-architect': '#DC2626',
      'compliance-auditor': '#F87171',
      'vulnerability-scanner': '#FCA5A5',
      
      // DevOps & Infrastructure (Orange shades)
      'devops-engineer': '#F97316',
      'sre-engineer': '#EA580C',
      'cloud-architect': '#FB923C',
      'cicd-engineer': '#FDBA74',
      
      // Testing & QA (Yellow shades)
      'qa-engineer': '#F59E0B',
      'test-automation': '#D97706',
      'performance-tester': '#FCD34D',
      'security-tester': '#FDE68A',
      
      // Product & Business (Pink shades)
      'product-manager': '#EC4899',
      'business-analyst': '#DB2777',
      'scrum-master': '#F472B6',
      'project-manager': '#FBCFE8',
      
      // Documentation & Support (Teal shades)
      'technical-writer': '#14B8A6',
      'documentation-specialist': '#0D9488',
      'api-documenter': '#5EEAD4',
      'support-engineer': '#99F6E4',
    };

    // Return specific color if mapped, otherwise generate based on category
    if (colorMap[agentName]) {
      return colorMap[agentName];
    }

    // Default colors by category
    const categoryColors: Record<string, string> = {
      'development': '#3B82F6',
      'architecture': '#8B5CF6',
      'data': '#10B981',
      'security': '#EF4444',
      'infrastructure': '#F97316',
      'testing': '#F59E0B',
      'management': '#EC4899',
      'documentation': '#14B8A6',
      'design': '#A78BFA',
      'operations': '#F97316',
    };

    // Return category color or default
    return categoryColors[category.toLowerCase()] || '#6B7280';
  }
}