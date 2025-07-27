import { promises as fs } from 'fs';
import path from 'path';
import { glob } from 'glob';

export interface ProjectAnalysis {
  projectType: string[];
  technologies: string[];
  recommendedAgents: string[];
  confidence: number;
}

export class ProjectAnalyzer {
  private patterns = {
    frontend: {
      files: ['package.json', 'index.html', '*.jsx', '*.tsx', '*.vue'],
      keywords: ['react', 'vue', 'angular', 'svelte', 'next', 'nuxt'],
      agents: ['frontend-developer', 'ux-designer', 'ui-designer']
    },
    backend: {
      files: ['server.js', 'app.py', 'main.go', 'api/*'],
      keywords: ['express', 'fastapi', 'django', 'spring', 'nest'],
      agents: ['backend-engineer', 'devops-engineer', 'security-engineer']
    },
    mobile: {
      files: ['*.swift', '*.kt', '*.java', 'pubspec.yaml', 'Info.plist'],
      keywords: ['react-native', 'flutter', 'ionic', 'xamarin'],
      agents: ['mobile-developer', 'ui-designer', 'qa-engineer']
    },
    data: {
      files: ['*.ipynb', 'requirements.txt', '*.sql', 'dbt_project.yml'],
      keywords: ['pandas', 'numpy', 'tensorflow', 'scikit-learn', 'jupyter'],
      agents: ['data-scientist', 'data-analyst', 'data-engineer']
    },
    infrastructure: {
      files: ['Dockerfile', 'docker-compose.yml', '*.tf', '.github/workflows/*'],
      keywords: ['kubernetes', 'terraform', 'ansible', 'jenkins'],
      agents: ['devops-engineer', 'cloud-architect', 'security-engineer']
    },
    documentation: {
      files: ['README.md', 'docs/*', '*.rst', 'mkdocs.yml'],
      keywords: ['documentation', 'api-docs', 'user-guide'],
      agents: ['technical-writer', 'content-creator', 'scribe']
    }
  };

  async analyzeProject(projectPath: string): Promise<ProjectAnalysis> {
    const detectedTypes: string[] = [];
    const detectedTechnologies: string[] = [];
    const recommendedAgents = new Set<string>();
    let confidence = 0;

    // Analyze file structure
    for (const [type, pattern] of Object.entries(this.patterns)) {
      let typeScore = 0;
      
      // Check for pattern files
      for (const filePattern of pattern.files) {
        const files = await glob(filePattern, { 
          cwd: projectPath,
          ignore: ['node_modules/**', 'dist/**', 'build/**']
        });
        
        if (files.length > 0) {
          typeScore += files.length;
        }
      }

      // Check package.json for keywords
      const packageJsonPath = path.join(projectPath, 'package.json');
      try {
        const packageContent = await fs.readFile(packageJsonPath, 'utf-8');
        const packageJson = JSON.parse(packageContent);
        
        const deps = {
          ...packageJson.dependencies || {},
          ...packageJson.devDependencies || {}
        };

        for (const keyword of pattern.keywords) {
          if (Object.keys(deps).some(dep => dep.includes(keyword))) {
            typeScore += 2;
            detectedTechnologies.push(keyword);
          }
        }
      } catch (e) {
        // Not a Node.js project, check other files
      }

      if (typeScore > 0) {
        detectedTypes.push(type);
        pattern.agents.forEach(agent => recommendedAgents.add(agent));
        confidence += typeScore * 10;
      }
    }

    // Add general agents based on project complexity
    if (detectedTypes.length > 2) {
      recommendedAgents.add('project-manager');
      recommendedAgents.add('architect');
    }

    // Add QA for any development project
    if (detectedTypes.includes('frontend') || detectedTypes.includes('backend')) {
      recommendedAgents.add('qa-engineer');
    }

    // Normalize confidence to 0-100
    confidence = Math.min(confidence, 100);

    return {
      projectType: detectedTypes,
      technologies: detectedTechnologies,
      recommendedAgents: Array.from(recommendedAgents),
      confidence
    };
  }

  async getAgentsByKeywords(keywords: string[]): Promise<string[]> {
    const agents = new Set<string>();
    
    const keywordMap: Record<string, string[]> = {
      'api': ['backend-engineer', 'api-designer'],
      'database': ['data-engineer', 'dba'],
      'security': ['security-engineer', 'compliance-officer'],
      'performance': ['performance-engineer', 'devops-engineer'],
      'ui': ['frontend-developer', 'ui-designer'],
      'ux': ['ux-designer', 'product-designer'],
      'test': ['qa-engineer', 'test-engineer'],
      'deploy': ['devops-engineer', 'cloud-architect'],
      'data': ['data-scientist', 'data-analyst'],
      'ml': ['machine-learning-engineer', 'data-scientist'],
      'mobile': ['mobile-developer', 'ui-designer'],
      'blockchain': ['blockchain-developer', 'security-engineer']
    };

    for (const keyword of keywords) {
      const lowerKeyword = keyword.toLowerCase();
      for (const [key, agentList] of Object.entries(keywordMap)) {
        if (lowerKeyword.includes(key)) {
          agentList.forEach(agent => agents.add(agent));
        }
      }
    }

    return Array.from(agents);
  }
}