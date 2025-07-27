#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import { Command } from 'commander';
import { ProjectAnalyzer } from './projectAnalyzer.js';
import { AgentManager } from './agentManager.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Parse CLI arguments using commander
const program = new Command()
  .option('--transport <stdio>', 'transport type', 'stdio')
  .option('--debug', 'enable debug logging')
  .allowUnknownOption() // let MCP Inspector / other wrappers pass through extra flags
  .parse(process.argv);

const cliOptions = program.opts<{
  transport: string;
  debug?: boolean;
}>();

// Debug logging function
const debug = (...args: any[]) => {
  if (cliOptions.debug) {
    console.error('[MCP Sub-Agents DEBUG]', ...args);
  }
};

// Validate transport option
const allowedTransports = ['stdio'];
if (!allowedTransports.includes(cliOptions.transport)) {
  console.error(
    `Invalid --transport value: '${cliOptions.transport}'. Must be: stdio.`
  );
  process.exit(1);
}

// Transport configuration
const TRANSPORT_TYPE = 'stdio';

// Function to create a new server instance with all tools registered
function createServerInstance() {
  const server = new Server(
    {
      name: 'pair-role-mcp-server',
      version: '1.0.0',
    },
    {
      capabilities: {
        tools: {},
      },
    }
  );

  return server;
}

// Initialize managers
// Support both development and production paths
const isDevelopment = process.env.NODE_ENV === 'development';
const agentsPath = isDevelopment 
  ? path.join(__dirname, '../../sub-agents')
  : path.resolve(process.cwd(), 'sub-agents');

debug(`Current working directory: ${process.cwd()}`);
debug(`__dirname: ${__dirname}`);
debug(`Loading agents from: ${agentsPath}`);

// Check if agents directory exists
import { existsSync } from 'fs';
if (cliOptions.debug && existsSync(agentsPath)) {
  debug(`Agents directory exists: ${agentsPath}`);
  const { readdirSync } = await import('fs');
  const files = readdirSync(agentsPath);
  debug(`Found ${files.length} files in agents directory`);
} else if (cliOptions.debug) {
  debug(`ERROR: Agents directory not found: ${agentsPath}`);
}

const projectAnalyzer = new ProjectAnalyzer();
const agentManager = new AgentManager(agentsPath, {
  owner: 'baryonlabs',
  repo: 'claude-sub-agent-contents',
  branch: 'main',
  path: 'sub-agents'
}, cliOptions.debug || false);

// Function to setup tools for a server instance
function setupTools(server: Server, projectAnalyzer: ProjectAnalyzer, agentManager: AgentManager) {

  // Define tools
  server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: 'analyze-project',
        description: 'Analyze a project directory and recommend suitable sub-agents',
        inputSchema: {
          type: 'object',
          properties: {
            projectPath: {
              type: 'string',
              description: 'Path to the project directory to analyze',
            },
          },
          required: ['projectPath'],
        },
      },
      {
        name: 'search-agents',
        description: 'Search for agents by keyword or name',
        inputSchema: {
          type: 'object',
          properties: {
            query: {
              type: 'string',
              description: 'Search query for agents',
            },
            language: {
              type: 'string',
              description: 'Language preference (en, kr)',
              enum: ['en', 'kr'],
              default: 'en',
            },
          },
          required: ['query'],
        },
      },
      {
        name: 'list-agents',
        description: 'List all available agents',
        inputSchema: {
          type: 'object',
          properties: {
            language: {
              type: 'string',
              description: 'Language preference (en, kr)',
              enum: ['en', 'kr'],
              default: 'en',
            },
            category: {
              type: 'string',
              description: 'Filter by category',
              enum: ['development', 'data', 'design', 'management', 'marketing', 'operations', 'hr', 'finance', 'legal', 'research', 'healthcare', 'education', 'media', 'manufacturing', 'other'],
            },
          },
        },
      },
      {
        name: 'get-agent-details',
        description: 'Get detailed information about a specific agent',
        inputSchema: {
          type: 'object',
          properties: {
            agentName: {
              type: 'string',
              description: 'Name of the agent (e.g., frontend-developer)',
            },
            language: {
              type: 'string',
              description: 'Language preference (en, kr)',
              enum: ['en', 'kr'],
              default: 'en',
            },
          },
          required: ['agentName'],
        },
      },
      {
        name: 'install-agents',
        description: 'Install multiple sub-agents to a project directory',
        inputSchema: {
          type: 'object',
          properties: {
            agentNames: {
              type: 'array',
              items: {
                type: 'string',
              },
              description: 'List of agent names to install',
            },
            targetPath: {
              type: 'string',
              description: 'Target project directory path',
            },
            language: {
              type: 'string',
              description: 'Language preference for agents (en, kr)',
              enum: ['en', 'kr'],
              default: 'en',
            },
          },
          required: ['agentNames', 'targetPath'],
        },
      },
      {
        name: 'recommend-by-keywords',
        description: 'Recommend agents based on project keywords',
        inputSchema: {
          type: 'object',
          properties: {
            keywords: {
              type: 'array',
              items: {
                type: 'string',
              },
              description: 'List of project keywords (e.g., api, database, ui)',
            },
          },
          required: ['keywords'],
        },
      },
      {
        name: 'get-download-stats',
        description: 'Get download statistics for agents',
        inputSchema: {
          type: 'object',
          properties: {
            limit: {
              type: 'number',
              description: 'Number of top agents to show',
              default: 10
            }
          }
        }
      },
      {
        name: 'refresh-agents',
        description: 'Refresh agents from GitHub repository',
        inputSchema: {
          type: 'object',
          properties: {}
        }
      },
    ],
  };
});

  // Handle tool calls
  server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  switch (name) {
    case 'analyze-project': {
      const { projectPath } = args as { projectPath: string };
      const analysis = await projectAnalyzer.analyzeProject(projectPath);
      
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify({
              success: true,
              analysis,
              message: `Analyzed project at ${projectPath}. Found ${analysis.projectType.length} project types and recommended ${analysis.recommendedAgents.length} agents.`,
            }, null, 2),
          },
        ],
      };
    }

    case 'search-agents': {
      const { query, language = 'en' } = args as { query: string; language?: string };
      const agents = agentManager.searchAgents(query);
      
      const filteredAgents = agents.filter(
        agent => !language || agent.language === language
      );
      
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify({
              success: true,
              count: filteredAgents.length,
              agents: filteredAgents.map(agent => ({
                name: agent.name,
                description: agent.description,
                tools: agent.tools,
                language: agent.language,
              })),
            }, null, 2),
          },
        ],
      };
    }

    case 'list-agents': {
      const { language = 'en', category } = args as { language?: string; category?: string };
      let agents = agentManager.getAllAgents(language);
      
      // Filter by category if provided
      if (category) {
        agents = agents.filter(agent => {
          // Simple category matching based on agent name or description
          const categoryKeywords: Record<string, string[]> = {
            development: ['developer', 'engineer', 'architect'],
            data: ['data', 'analyst', 'scientist'],
            design: ['designer', 'ux', 'ui'],
            management: ['manager', 'owner', 'master'],
            // Add more category mappings as needed
          };
          
          const keywords = categoryKeywords[category] || [];
          return keywords.some(keyword => 
            agent.name.includes(keyword) || 
            agent.description.toLowerCase().includes(keyword)
          );
        });
      }
      
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify({
              success: true,
              count: agents.length,
              agents: agents.map(agent => ({
                name: agent.name,
                description: agent.description,
                tools: agent.tools,
                language: agent.language,
              })),
            }, null, 2),
          },
        ],
      };
    }

    case 'get-agent-details': {
      const { agentName, language = 'en' } = args as { agentName: string; language?: string };
      const agent = agentManager.getAgent(agentName, language);
      
      if (!agent) {
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify({
                success: false,
                error: `Agent '${agentName}' not found in language '${language}'`,
              }, null, 2),
            },
          ],
        };
      }
      
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify({
              success: true,
              agent: {
                name: agent.name,
                description: agent.description,
                tools: agent.tools,
                language: agent.language,
                content: agent.content,
              },
            }, null, 2),
          },
        ],
      };
    }

    case 'install-agents': {
      const { agentNames, targetPath, language = 'en' } = args as { 
        agentNames: string[]; 
        targetPath: string; 
        language?: string;
      };
      
      try {
        const installedPaths = await agentManager.installMultipleAgents(
          agentNames, 
          targetPath, 
          language
        );
        
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify({
                success: true,
                installedCount: installedPaths.length,
                installedPaths,
                message: `Successfully installed ${installedPaths.length} agents to ${targetPath}/.claude/sub-agents/`,
              }, null, 2),
            },
          ],
        };
      } catch (error) {
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify({
                success: false,
                error: `Failed to install agents: ${error}`,
              }, null, 2),
            },
          ],
        };
      }
    }

    case 'recommend-by-keywords': {
      const { keywords } = args as { keywords: string[] };
      const recommendedAgents = await projectAnalyzer.getAgentsByKeywords(keywords);
      
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify({
              success: true,
              keywords,
              recommendedAgents,
              count: recommendedAgents.length,
            }, null, 2),
          },
        ],
      };
    }

    default:
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify({
              success: false,
              error: `Unknown tool: ${name}`,
            }, null, 2),
          },
        ],
      };
  }
  });
}

async function main() {
  // Load agents on startup
  try {
    await agentManager.loadAgents();
    debug(`Agents loaded successfully`);
  } catch (error) {
    if (cliOptions.debug) {
      console.error(`[MCP Sub-Agents] ERROR loading agents:`, error);
    }
  }

  // Stdio transport - this is already stateless by nature
  const server = createServerInstance();
  setupTools(server, projectAnalyzer, agentManager);
  const transport = new StdioServerTransport();
  await server.connect(transport);
  if (cliOptions.debug) {
    console.error('[MCP Sub-Agents] Server running on stdio');
  }
}

main().catch((error) => {
  console.error('Fatal error in main():', error);
  process.exit(1);
});