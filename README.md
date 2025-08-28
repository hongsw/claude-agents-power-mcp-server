# 🤖 Claude Agents Power

[![English](https://img.shields.io/badge/lang-English-blue.svg)](README.md)
[![한국어](https://img.shields.io/badge/lang-한국어-red.svg)](README.kr.md)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![MCP](https://img.shields.io/badge/MCP-Compatible-purple.svg)](https://modelcontextprotocol.org/)

> 🎯 **Smart Role Assignment for Development Teams** - An intelligent MCP server that analyzes your project and recommends the perfect team composition from 100+ professional roles across all company departments.

## 🚀 Quick Start with Claude

### 1️⃣ Install & Configure MCP Server

```bash
# Install via npm
npm install -g claude-agents-power

# Automatically configure Claude Desktop (NEW! 🎉)
# claude-agents-power --install
```

**Or manually configure Claude Desktop:**

Add to your `claude_desktop_config.json`:
```json
{
  "mcpServers": {
    "claude-agents-power": {
      "command": "claude-agents-power"
    }
  }
}
```

### 2️⃣ Usage in Claude

Open Claude and try this example:

```
👤 User: "claude-agents-power를 이용해서 이 프로젝트를 위한 추천 및 agents/*.md 파일을 다운로드 해줘"

🤖 Claude: I'll analyze your project and download the recommended agents for you.

[Uses MCP tools to:]
1. 📊 Analyze your project structure 
2. 🎯 Recommend suitable roles
3. 📁 Download agents to ./claude/agents/
4. ✅ Ready to use sub-agents for your project!
```

### 3️⃣ Verify Installation

Check that agents were downloaded:
```bash
ls ./claude/agents/
# You should see downloaded .md files for recommended roles
```

### 4️⃣ Start Using Sub-Agents

Now you can use specialized roles in Claude:
```
"frontend-developer를 사용해서 React 컴포넌트를 만들어줘"
"data-scientist로 이 데이터를 분석해줘"  
"devops-engineer가 CI/CD 파이프라인을 설정해줘"
```

---

## 📖 Table of Contents

- [🌟 Features](#-features)
- [🚀 Quick Start](#-quick-start)
- [📋 Available Roles](#-available-roles)
- [⚡ Slash Commands (NEW!)](#-slash-commands-new)
- [🎯 Usage Examples](#-usage-examples)
- [📚 Documentation](#-documentation)
- [🛠️ Development](#-development)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

## 🌟 Features

### 🔍 **Intelligent Project Analysis**
- Automatically detects project type, frameworks, and complexity
- Provides smart role recommendations based on your tech stack
- Supports multi-language projects and diverse architectures

### 👥 **100+ Professional Roles**
- **Technology & Engineering** (20 roles): Frontend, Backend, DevOps, Security, AI/ML
- **Data & Analytics** (15 roles): Data Scientists, Analysts, Engineers
- **Product & Design** (10 roles): PM, UX/UI Designers, Researchers  
- **Marketing & Sales** (10 roles): Digital Marketing, Growth, Content
- **Operations & Management** (15 roles): Project Managers, Operations
- **Finance & Accounting** (10 roles): CFO, Controllers, Analysts
- **Human Resources** (10 roles): Talent Acquisition, L&D, Culture
- **Executive & Leadership** (10 roles): C-Level executives and strategy

### 🌐 **Multi-Language Support**
- **English**: Global standards and international projects
- **한국어**: Korean business context and local practices

### ⚡ **Claude Code Integration**
- Seamless integration with Claude Code via MCP protocol
- Real-time role recommendations and team composition
- One-click agent installation to your project

### 🌐 **GitHub Integration**
- Automatic agent downloading from [baryonlabs/claude-sub-agent-contents](https://github.com/baryonlabs/claude-sub-agent-contents)
- Download tracking and usage analytics
- Offline caching for downloaded agents
- Installs to `./claude/agents/` directory structure
- No need to create agent templates from scratch

## 🚀 Development Setup

### Build from Source

```bash
# Clone the repository
git clone https://github.com/hongsw/claude-agents-power-mcp-server.git
cd claude-agents-power

# Install dependencies
npm install

# Build the project
npm run build
```

### MCP Configuration for Development

Add to your `~/.config/claude/mcp_servers.json`:

```json
{
  "mcpServers": {
    "claude-agents-power": {
      "command": "node",
      "args": ["/path/to/claude-agents-power/dist/index.js"],
      "cwd": "/path/to/your/project",
      "env": {
        "GITHUB_TOKEN": "your_github_token_here"
      }
    }
  }
}
```

### Analytics & Telemetry

This tool includes anonymous usage analytics (telemetry) to help improve the user experience and identify common usage patterns. The telemetry system:

- **What is collected**: Tool usage patterns, command frequency, error rates (no personal data)
- **What is NOT collected**: File contents, agent data, GitHub tokens, or any personally identifiable information
- **Purpose**: Understanding which features are most used, identifying common errors, improving performance
- **Technology**: Uses PostHog with a public API key that can only send events, not read data

#### Disabling Telemetry

If you prefer not to send anonymous usage data, you can disable telemetry using either of these methods:

```bash
# Method 1: Environment variable
export DISABLE_TELEMETRY=true

# Method 2: In your .env file
DISABLE_TELEMETRY=true

# Alternative (also works)
DISABLE_ANALYTICS=true
```

#### Telemetry vs OpenTelemetry

This project uses **product analytics telemetry** (PostHog), not OpenTelemetry:

- **Product Analytics Telemetry**: Tracks user interactions, feature usage, and product metrics
- **OpenTelemetry**: Industry standard for distributed tracing, metrics, and logs in microservices

While both involve "telemetry", they serve different purposes. Our telemetry helps understand how the tool is used to improve the user experience, not for system monitoring or performance tracing.

### Environment Variables

Configure these optional environment variables for enhanced functionality:

#### Method 1: Using .env file (Recommended for local development)

1. Copy the example environment file:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` and add your GitHub token:
   ```bash
   # GitHub Personal Access Token (required for auto issue creation)
   GITHUB_TOKEN=ghp_your_actual_token_here
   
   # To disable analytics, uncomment:
   # DISABLE_ANALYTICS=true
   ```

#### Method 2: Using MCP configuration

Add environment variables directly to your MCP server configuration as shown above.

#### Available Variables

- **`GITHUB_TOKEN`**: GitHub personal access token for automatic issue creation when agents are not found
  - Create at: https://github.com/settings/tokens
  - Required permissions: `public_repo` or `repo` (for private repos)
  
- **`DISABLE_TELEMETRY`** or **`DISABLE_ANALYTICS`**: Set to `true` to disable anonymous usage telemetry
  - Telemetry is enabled by default to help improve the tool
  - No personal data is collected, only anonymous usage metrics
  - Example: `DISABLE_TELEMETRY=true`

- **`POSTHOG_API_KEY`**: Custom PostHog API key (optional)
  - The tool includes a default public key for analytics
  - Only set if you want to use your own PostHog project
  
- **`POSTHOG_HOST`**: PostHog instance URL (defaults to https://app.posthog.com)
  - Only needed if using a self-hosted PostHog instance

### MCP Tools Reference

```bash
# Analyze your current project
mcp__claude-agents-power__analyze-project

# Get role recommendations  
mcp__claude-agents-power__recommend-by-keywords ["web", "api", "database"]

# Install recommended agents
mcp__claude-agents-power__install-agents ["frontend-developer", "backend-developer"]
```

## 📋 Available Roles

### 🔧 Technology & Engineering (20 roles)

| Role | English | 한국어 | Tools | Specialization |
|------|---------|--------|-------|----------------|
| [**Software Engineer**](sub-agents/en/software-engineer.md) | [EN](sub-agents/en/software-engineer.md) | [KO](sub-agents/ko/software-engineer.md) | `Bash, Read, Write, Edit` | Full-stack development, system design |
| [**Frontend Developer**](sub-agents/en/frontend-developer.md) | [EN](sub-agents/en/frontend-developer.md) | [KO](sub-agents/ko/frontend-developer.md) | `Read, Write, Edit, Bash` | React, Vue, Angular, UI/UX |
| [**Backend Developer**](sub-agents/en/backend-developer.md) | [EN](sub-agents/en/backend-developer.md) | [KO](sub-agents/ko/backend-developer.md) | `Bash, Read, Write, Edit` | APIs, databases, server architecture |
| [**DevOps Engineer**](sub-agents/en/devops-engineer.md) | [EN](sub-agents/en/devops-engineer.md) | [KO](sub-agents/ko/devops-engineer.md) | `Bash, Read, Write` | CI/CD, infrastructure automation |
| [**Data Engineer**](sub-agents/en/data-engineer.md) | [EN](sub-agents/en/data-engineer.md) | [KO](sub-agents/ko/data-engineer.md) | `Bash, Read, Write` | ETL pipelines, data architecture |

<details>
<summary><strong>📱 View All Technology Roles (15 more)</strong></summary>

| Role | English | 한국어 | Tools | Specialization |
|------|---------|--------|-------|----------------|
| [**ML Engineer**](sub-agents/en/machine-learning-engineer.md) | [EN](sub-agents/en/machine-learning-engineer.md) | [KO](sub-agents/ko/machine-learning-engineer.md) | `Bash, Read, Write` | Model deployment, MLOps |
| [**Security Engineer**](sub-agents/en/security-engineer.md) | [EN](sub-agents/en/security-engineer.md) | [KO](sub-agents/ko/security-engineer.md) | `Bash, Read, Grep` | Cybersecurity, threat analysis |
| [**Cloud Architect**](sub-agents/en/cloud-architect.md) | [EN](sub-agents/en/cloud-architect.md) | [KO](sub-agents/ko/cloud-architect.md) | `Bash, Read, Write` | AWS, Azure, GCP architecture |
| [**Mobile Developer**](sub-agents/en/mobile-developer.md) | [EN](sub-agents/en/mobile-developer.md) | [KO](sub-agents/ko/mobile-developer.md) | `Read, Write, Edit, Bash` | iOS, Android, React Native |
| [**QA Engineer**](sub-agents/en/qa-engineer.md) | [EN](sub-agents/en/qa-engineer.md) | [KO](sub-agents/ko/qa-engineer.md) | `Bash, Read, Write` | Test automation, quality assurance |
| [**Database Administrator**](sub-agents/en/database-administrator.md) | [EN](sub-agents/en/database-administrator.md) | [KO](sub-agents/ko/database-administrator.md) | `Bash, Read, Write` | Database optimization, backup |
| [**Network Engineer**](sub-agents/en/network-engineer.md) | [EN](sub-agents/en/network-engineer.md) | [KO](sub-agents/ko/network-engineer.md) | `Bash, Read, Write` | Network infrastructure, security |
| [**Site Reliability Engineer**](sub-agents/en/site-reliability-engineer.md) | [EN](sub-agents/en/site-reliability-engineer.md) | [KO](sub-agents/ko/site-reliability-engineer.md) | `Bash, Read, Write` | System reliability, monitoring |
| [**Blockchain Developer**](sub-agents/en/blockchain-developer.md) | [EN](sub-agents/en/blockchain-developer.md) | [KO](sub-agents/ko/blockchain-developer.md) | `Read, Write, Edit` | Smart contracts, DeFi |
| [**Game Developer**](sub-agents/en/game-developer.md) | [EN](sub-agents/en/game-developer.md) | [KO](sub-agents/ko/game-developer.md) | `Read, Write, Edit` | Unity, Unreal, game engines |
| [**Embedded Systems Engineer**](sub-agents/en/embedded-systems-engineer.md) | [EN](sub-agents/en/embedded-systems-engineer.md) | [KO](sub-agents/ko/embedded-systems-engineer.md) | `Read, Write, Bash` | IoT, firmware, hardware |
| [**Technical Writer**](sub-agents/en/technical-writer.md) | [EN](sub-agents/en/technical-writer.md) | [KO](sub-agents/ko/technical-writer.md) | `Read, Write, Edit` | Documentation, API docs |
| [**Solution Architect**](sub-agents/en/solution-architect.md) | [EN](sub-agents/en/solution-architect.md) | [KO](sub-agents/ko/solution-architect.md) | `Read, Write, Bash` | System integration, design |
| [**AI Researcher**](sub-agents/en/ai-researcher.md) | [EN](sub-agents/en/ai-researcher.md) | [KO](sub-agents/ko/ai-researcher.md) | `Read, Write, Bash` | Research, algorithm development |
| [**Tech Lead**](sub-agents/en/tech-lead.md) | [EN](sub-agents/en/tech-lead.md) | [KO](sub-agents/ko/tech-lead.md) | `Read, Write, Edit, Bash` | Team leadership, architecture |

</details>

### 📊 Data & Analytics (15 roles)

| Role | English | 한국어 | Tools | Specialization |
|------|---------|--------|-------|----------------|
| [**Data Scientist**](sub-agents/en/data-scientist.md) | [EN](sub-agents/en/data-scientist.md) | [KO](sub-agents/ko/data-scientist.md) | `Bash, Read, Write` | ML modeling, statistical analysis |
| [**Data Analyst**](sub-agents/en/data-analyst.md) | [EN](sub-agents/en/data-analyst.md) | [KO](sub-agents/ko/data-analyst.md) | `Read, Write, Bash` | Business insights, reporting |
| [**Business Intelligence Analyst**](sub-agents/en/business-intelligence-analyst.md) | [EN](sub-agents/en/business-intelligence-analyst.md) | [KO](sub-agents/ko/business-intelligence-analyst.md) | `Read, Write, Bash` | Dashboards, BI tools |
| [**Quantitative Analyst**](sub-agents/en/quantitative-analyst.md) | [EN](sub-agents/en/quantitative-analyst.md) | [KO](sub-agents/ko/quantitative-analyst.md) | `Read, Write, Bash` | Financial modeling, risk analysis |
| [**Research Analyst**](sub-agents/en/research-analyst.md) | [EN](sub-agents/en/research-analyst.md) | [KO](sub-agents/ko/research-analyst.md) | `Read, Write` | Market research, competitive analysis |

<details>
<summary><strong>📈 View All Data & Analytics Roles (10 more)</strong></summary>

| Role | English | 한국어 | Tools | Specialization |
|------|---------|--------|-------|----------------|
| [**Analytics Engineer**](sub-agents/en/analytics-engineer.md) | [EN](sub-agents/en/analytics-engineer.md) | [KO](sub-agents/ko/analytics-engineer.md) | `Bash, Read, Write` | Data infrastructure, modeling |
| [**Marketing Analyst**](sub-agents/en/marketing-analyst.md) | [EN](sub-agents/en/marketing-analyst.md) | [KO](sub-agents/ko/marketing-analyst.md) | `Read, Write` | Campaign optimization, metrics |
| [**Financial Analyst**](sub-agents/en/financial-analyst.md) | [EN](sub-agents/en/financial-analyst.md) | [KO](sub-agents/ko/financial-analyst.md) | `Read, Write` | Financial planning, forecasting |
| [**Operations Analyst**](sub-agents/en/operations-analyst.md) | [EN](sub-agents/en/operations-analyst.md) | [KO](sub-agents/ko/operations-analyst.md) | `Read, Write, Bash` | Process optimization, efficiency |
| [**Product Analyst**](sub-agents/en/product-analyst.md) | [EN](sub-agents/en/product-analyst.md) | [KO](sub-agents/ko/product-analyst.md) | `Read, Write` | User behavior, product metrics |
| [**Risk Analyst**](sub-agents/en/risk-analyst.md) | [EN](sub-agents/en/risk-analyst.md) | [KO](sub-agents/ko/risk-analyst.md) | `Read, Write` | Risk assessment, mitigation |
| [**Growth Analyst**](sub-agents/en/growth-analyst.md) | [EN](sub-agents/en/growth-analyst.md) | [KO](sub-agents/ko/growth-analyst.md) | `Read, Write` | Growth metrics, experimentation |
| [**Customer Insights Analyst**](sub-agents/en/customer-insights-analyst.md) | [EN](sub-agents/en/customer-insights-analyst.md) | [KO](sub-agents/ko/customer-insights-analyst.md) | `Read, Write` | Customer segmentation, behavior |
| [**Pricing Analyst**](sub-agents/en/pricing-analyst.md) | [EN](sub-agents/en/pricing-analyst.md) | [KO](sub-agents/ko/pricing-analyst.md) | `Read, Write` | Pricing strategy, revenue optimization |
| [**Supply Chain Analyst**](sub-agents/en/supply-chain-analyst.md) | [EN](sub-agents/en/supply-chain-analyst.md) | [KO](sub-agents/ko/supply-chain-analyst.md) | `Read, Write, Bash` | Supply chain optimization |

</details>

### 🎨 Product & Design (10 roles)

| Role | English | 한국어 | Tools | Specialization |
|------|---------|--------|-------|----------------|
| [**Product Manager**](sub-agents/en/product-manager.md) | [EN](sub-agents/en/product-manager.md) | [KO](sub-agents/ko/product-manager.md) | `Read, Write` | Product strategy, roadmap |
| [**Product Designer**](sub-agents/en/product-designer.md) | [EN](sub-agents/en/product-designer.md) | [KO](sub-agents/ko/product-designer.md) | `Read, Write` | User experience, product design |
| [**UX Designer**](sub-agents/en/ux-designer.md) | [EN](sub-agents/en/ux-designer.md) | [KO](sub-agents/ko/ux-designer.md) | `Read, Write` | User research, wireframes |
| [**UI Designer**](sub-agents/en/ui-designer.md) | [EN](sub-agents/en/ui-designer.md) | [KO](sub-agents/ko/ui-designer.md) | `Read, Write` | Visual design, prototypes |
| [**Graphic Designer**](sub-agents/en/graphic-designer.md) | [EN](sub-agents/en/graphic-designer.md) | [KO](sub-agents/ko/graphic-designer.md) | `Read, Write` | Brand identity, visual assets |

<details>
<summary><strong>🎯 View All Product & Design Roles (5 more)</strong></summary>

| Role | English | 한국어 | Tools | Specialization |
|------|---------|--------|-------|----------------|
| [**UX Researcher**](sub-agents/en/ux-researcher.md) | [EN](sub-agents/en/ux-researcher.md) | [KO](sub-agents/ko/ux-researcher.md) | `Read, Write` | User research, usability testing |
| [**Product Owner**](sub-agents/en/product-owner.md) | [EN](sub-agents/en/product-owner.md) | [KO](sub-agents/ko/product-owner.md) | `Read, Write` | Backlog management, scrum |
| [**Design Lead**](sub-agents/en/design-lead.md) | [EN](sub-agents/en/design-lead.md) | [KO](sub-agents/ko/design-lead.md) | `Read, Write` | Design system, team leadership |
| [**Creative Director**](sub-agents/en/creative-director.md) | [EN](sub-agents/en/creative-director.md) | [KO](sub-agents/ko/creative-director.md) | `Read, Write` | Creative strategy, brand vision |
| [**Interaction Designer**](sub-agents/en/interaction-designer.md) | [EN](sub-agents/en/interaction-designer.md) | [KO](sub-agents/ko/interaction-designer.md) | `Read, Write` | Interaction design, prototyping |

</details>

### 📈 Marketing & Sales (10 roles)

| Role | English | 한국어 | Tools | Specialization |
|------|---------|--------|-------|----------------|
| [**Marketing Manager**](sub-agents/en/marketing-manager.md) | [EN](sub-agents/en/marketing-manager.md) | [KO](sub-agents/ko/marketing-manager.md) | `Read, Write` | Marketing strategy, campaigns |
| [**Sales Manager**](sub-agents/en/sales-manager.md) | [EN](sub-agents/en/sales-manager.md) | [KO](sub-agents/ko/sales-manager.md) | `Read, Write` | Sales strategy, team management |
| [**Digital Marketing Specialist**](sub-agents/en/digital-marketing-specialist.md) | [EN](sub-agents/en/digital-marketing-specialist.md) | [KO](sub-agents/ko/digital-marketing-specialist.md) | `Read, Write` | Online advertising, SEO/SEM |
| [**Content Marketing Manager**](sub-agents/en/content-marketing-manager.md) | [EN](sub-agents/en/content-marketing-manager.md) | [KO](sub-agents/ko/content-marketing-manager.md) | `Read, Write` | Content strategy, creation |
| [**Social Media Manager**](sub-agents/en/social-media-manager.md) | [EN](sub-agents/en/social-media-manager.md) | [KO](sub-agents/ko/social-media-manager.md) | `Read, Write` | Social media strategy, community |

<details>
<summary><strong>📢 View All Marketing & Sales Roles (5 more)</strong></summary>

| Role | English | 한국어 | Tools | Specialization |
|------|---------|--------|-------|----------------|
| [**SEO Specialist**](sub-agents/en/seo-specialist.md) | [EN](sub-agents/en/seo-specialist.md) | [KO](sub-agents/ko/seo-specialist.md) | `Read, Write, Grep` | Search optimization, analytics |
| [**Brand Manager**](sub-agents/en/brand-manager.md) | [EN](sub-agents/en/brand-manager.md) | [KO](sub-agents/ko/brand-manager.md) | `Read, Write` | Brand strategy, positioning |
| [**Growth Marketing Manager**](sub-agents/en/growth-marketing-manager.md) | [EN](sub-agents/en/growth-marketing-manager.md) | [KO](sub-agents/ko/growth-marketing-manager.md) | `Read, Write` | Growth hacking, experiments |
| [**Account Manager**](sub-agents/en/account-manager.md) | [EN](sub-agents/en/account-manager.md) | [KO](sub-agents/ko/account-manager.md) | `Read, Write` | Client relations, account growth |
| [**Business Development Manager**](sub-agents/en/business-development-manager.md) | [EN](sub-agents/en/business-development-manager.md) | [KO](sub-agents/ko/business-development-manager.md) | `Read, Write` | Partnerships, business growth |

</details>

### ⚙️ Operations & Management (15 roles)

| Role | English | 한국어 | Tools | Specialization |
|------|---------|--------|-------|----------------|
| [**Operations Manager**](sub-agents/en/operations-manager.md) | [EN](sub-agents/en/operations-manager.md) | [KO](sub-agents/ko/operations-manager.md) | `Read, Write, Bash` | Process optimization, efficiency |
| [**Project Manager**](sub-agents/en/project-manager.md) | [EN](sub-agents/en/project-manager.md) | [KO](sub-agents/ko/project-manager.md) | `Read, Write` | Project planning, coordination |
| [**Program Manager**](sub-agents/en/program-manager.md) | [EN](sub-agents/en/program-manager.md) | [KO](sub-agents/ko/program-manager.md) | `Read, Write` | Multi-project coordination |
| [**Supply Chain Manager**](sub-agents/en/supply-chain-manager.md) | [EN](sub-agents/en/supply-chain-manager.md) | [KO](sub-agents/ko/supply-chain-manager.md) | `Read, Write` | Supply chain optimization |
| [**Quality Assurance Manager**](sub-agents/en/quality-assurance-manager.md) | [EN](sub-agents/en/quality-assurance-manager.md) | [KO](sub-agents/ko/quality-assurance-manager.md) | `Read, Write, Bash` | Quality processes, improvement |

<details>
<summary><strong>⚡ View All Operations & Management Roles (10 more)</strong></summary>

| Role | English | 한국어 | Tools | Specialization |
|------|---------|--------|-------|----------------|
| [**Facilities Manager**](sub-agents/en/facilities-manager.md) | [EN](sub-agents/en/facilities-manager.md) | [KO](sub-agents/ko/facilities-manager.md) | `Read, Write` | Facility management, workplace |
| [**Procurement Manager**](sub-agents/en/procurement-manager.md) | [EN](sub-agents/en/procurement-manager.md) | [KO](sub-agents/ko/procurement-manager.md) | `Read, Write` | Vendor relations, purchasing |
| [**Logistics Manager**](sub-agents/en/logistics-manager.md) | [EN](sub-agents/en/logistics-manager.md) | [KO](sub-agents/ko/logistics-manager.md) | `Read, Write` | Logistics, delivery optimization |
| [**Inventory Manager**](sub-agents/en/inventory-manager.md) | [EN](sub-agents/en/inventory-manager.md) | [KO](sub-agents/ko/inventory-manager.md) | `Read, Write` | Inventory control, forecasting |
| [**Production Manager**](sub-agents/en/production-manager.md) | [EN](sub-agents/en/production-manager.md) | [KO](sub-agents/ko/production-manager.md) | `Read, Write, Bash` | Manufacturing, production |
| [**Change Management Specialist**](sub-agents/en/change-management-specialist.md) | [EN](sub-agents/en/change-management-specialist.md) | [KO](sub-agents/ko/change-management-specialist.md) | `Read, Write` | Organizational change |
| [**Business Process Analyst**](sub-agents/en/business-process-analyst.md) | [EN](sub-agents/en/business-process-analyst.md) | [KO](sub-agents/ko/business-process-analyst.md) | `Read, Write` | Process analysis, improvement |
| [**Vendor Manager**](sub-agents/en/vendor-manager.md) | [EN](sub-agents/en/vendor-manager.md) | [KO](sub-agents/ko/vendor-manager.md) | `Read, Write` | Vendor management, contracts |
| [**Compliance Manager**](sub-agents/en/compliance-manager.md) | [EN](sub-agents/en/compliance-manager.md) | [KO](sub-agents/ko/compliance-manager.md) | `Read, Write` | Regulatory compliance |
| [**Agile Coach**](sub-agents/en/agile-coach.md) | [EN](sub-agents/en/agile-coach.md) | [KO](sub-agents/ko/agile-coach.md) | `Read, Write` | Agile methodology, coaching |

</details>

### 💰 Finance & Accounting (10 roles)

| Role | English | 한국어 | Tools | Specialization |
|------|---------|--------|-------|----------------|
| [**Chief Financial Officer**](sub-agents/en/chief-financial-officer.md) | [EN](sub-agents/en/chief-financial-officer.md) | [KO](sub-agents/ko/chief-financial-officer.md) | `Read, Write` | Financial strategy, corporate finance |
| [**Financial Controller**](sub-agents/en/financial-controller.md) | [EN](sub-agents/en/financial-controller.md) | [KO](sub-agents/ko/financial-controller.md) | `Read, Write` | Financial control, reporting |
| [**Accounting Manager**](sub-agents/en/accounting-manager.md) | [EN](sub-agents/en/accounting-manager.md) | [KO](sub-agents/ko/accounting-manager.md) | `Read, Write` | Accounting operations |
| [**Treasury Manager**](sub-agents/en/treasury-manager.md) | [EN](sub-agents/en/treasury-manager.md) | [KO](sub-agents/ko/treasury-manager.md) | `Read, Write` | Cash management, treasury |
| [**Tax Manager**](sub-agents/en/tax-manager.md) | [EN](sub-agents/en/tax-manager.md) | [KO](sub-agents/ko/tax-manager.md) | `Read, Write` | Tax strategy, compliance |

<details>
<summary><strong>💼 View All Finance & Accounting Roles (5 more)</strong></summary>

| Role | English | 한국어 | Tools | Specialization |
|------|---------|--------|-------|----------------|
| [**Internal Auditor**](sub-agents/en/internal-auditor.md) | [EN](sub-agents/en/internal-auditor.md) | [KO](sub-agents/ko/internal-auditor.md) | `Read, Write, Grep` | Internal audit, risk assessment |
| [**Budget Analyst**](sub-agents/en/budget-analyst.md) | [EN](sub-agents/en/budget-analyst.md) | [KO](sub-agents/ko/budget-analyst.md) | `Read, Write` | Budget planning, analysis |
| [**Investment Analyst**](sub-agents/en/investment-analyst.md) | [EN](sub-agents/en/investment-analyst.md) | [KO](sub-agents/ko/investment-analyst.md) | `Read, Write` | Investment analysis, portfolio |
| [**Credit Analyst**](sub-agents/en/credit-analyst.md) | [EN](sub-agents/en/credit-analyst.md) | [KO](sub-agents/ko/credit-analyst.md) | `Read, Write` | Credit risk, assessment |
| [**Payroll Manager**](sub-agents/en/payroll-manager.md) | [EN](sub-agents/en/payroll-manager.md) | [KO](sub-agents/ko/payroll-manager.md) | `Read, Write` | Payroll systems, compensation |

</details>

### 👥 Human Resources (10 roles)

| Role | English | 한국어 | Tools | Specialization |
|------|---------|--------|-------|----------------|
| [**HR Manager**](sub-agents/en/hr-manager.md) | [EN](sub-agents/en/hr-manager.md) | [KO](sub-agents/ko/hr-manager.md) | `Read, Write` | HR strategy, people management |
| [**Talent Acquisition Specialist**](sub-agents/en/talent-acquisition-specialist.md) | [EN](sub-agents/en/talent-acquisition-specialist.md) | [KO](sub-agents/ko/talent-acquisition-specialist.md) | `Read, Write` | Recruitment, talent sourcing |
| [**HR Business Partner**](sub-agents/en/hr-business-partner.md) | [EN](sub-agents/en/hr-business-partner.md) | [KO](sub-agents/ko/hr-business-partner.md) | `Read, Write` | Strategic HR, business alignment |
| [**Compensation & Benefits Manager**](sub-agents/en/compensation-benefits-manager.md) | [EN](sub-agents/en/compensation-benefits-manager.md) | [KO](sub-agents/ko/compensation-benefits-manager.md) | `Read, Write` | Compensation design, benefits |
| [**Learning & Development Manager**](sub-agents/en/learning-development-manager.md) | [EN](sub-agents/en/learning-development-manager.md) | [KO](sub-agents/ko/learning-development-manager.md) | `Read, Write` | Training programs, development |

<details>
<summary><strong>🌟 View All Human Resources Roles (5 more)</strong></summary>

| Role | English | 한국어 | Tools | Specialization |
|------|---------|--------|-------|----------------|
| [**Employee Relations Manager**](sub-agents/en/employee-relations-manager.md) | [EN](sub-agents/en/employee-relations-manager.md) | [KO](sub-agents/ko/employee-relations-manager.md) | `Read, Write` | Employee relations, conflict resolution |
| [**Organizational Development Manager**](sub-agents/en/organizational-development-manager.md) | [EN](sub-agents/en/organizational-development-manager.md) | [KO](sub-agents/ko/organizational-development-manager.md) | `Read, Write` | Organization design, change |
| [**Diversity & Inclusion Manager**](sub-agents/en/diversity-inclusion-manager.md) | [EN](sub-agents/en/diversity-inclusion-manager.md) | [KO](sub-agents/ko/diversity-inclusion-manager.md) | `Read, Write` | D&I strategy, inclusive culture |
| [**HR Analyst**](sub-agents/en/hr-analyst.md) | [EN](sub-agents/en/hr-analyst.md) | [KO](sub-agents/ko/hr-analyst.md) | `Read, Write` | HR metrics, workforce analytics |
| [**Employee Experience Manager**](sub-agents/en/employee-experience-manager.md) | [EN](sub-agents/en/employee-experience-manager.md) | [KO](sub-agents/ko/employee-experience-manager.md) | `Read, Write` | Employee journey, culture |

</details>

### 🏢 Executive & Leadership (10 roles)

| Role | English | 한국어 | Tools | Specialization |
|------|---------|--------|-------|----------------|
| [**Chief Executive Officer**](sub-agents/en/chief-executive-officer.md) | [EN](sub-agents/en/chief-executive-officer.md) | [KO](sub-agents/ko/chief-executive-officer.md) | `Read, Write` | Corporate strategy, leadership |
| [**Chief Operating Officer**](sub-agents/en/chief-operating-officer.md) | [EN](sub-agents/en/chief-operating-officer.md) | [KO](sub-agents/ko/chief-operating-officer.md) | `Read, Write, Bash` | Operations, execution |
| [**Chief Technology Officer**](sub-agents/en/chief-technology-officer.md) | [EN](sub-agents/en/chief-technology-officer.md) | [KO](sub-agents/ko/chief-technology-officer.md) | `Read, Write, Edit, Bash` | Technology strategy, innovation |
| [**Chief Marketing Officer**](sub-agents/en/chief-marketing-officer.md) | [EN](sub-agents/en/chief-marketing-officer.md) | [KO](sub-agents/ko/chief-marketing-officer.md) | `Read, Write` | Marketing strategy, brand |
| [**Chief Product Officer**](sub-agents/en/chief-product-officer.md) | [EN](sub-agents/en/chief-product-officer.md) | [KO](sub-agents/ko/chief-product-officer.md) | `Read, Write` | Product strategy, innovation |

<details>
<summary><strong>💎 View All Executive & Leadership Roles (5 more)</strong></summary>

| Role | English | 한국어 | Tools | Specialization |
|------|---------|--------|-------|----------------|
| [**Chief Data Officer**](sub-agents/en/chief-data-officer.md) | [EN](sub-agents/en/chief-data-officer.md) | [KO](sub-agents/ko/chief-data-officer.md) | `Read, Write, Bash` | Data strategy, governance |
| [**Chief Information Officer**](sub-agents/en/chief-information-officer.md) | [EN](sub-agents/en/chief-information-officer.md) | [KO](sub-agents/ko/chief-information-officer.md) | `Read, Write, Bash` | IT strategy, systems |
| [**Chief Human Resources Officer**](sub-agents/en/chief-human-resources-officer.md) | [EN](sub-agents/en/chief-human-resources-officer.md) | [KO](sub-agents/ko/chief-human-resources-officer.md) | `Read, Write` | HR strategy, culture |
| [**Chief Revenue Officer**](sub-agents/en/chief-revenue-officer.md) | [EN](sub-agents/en/chief-revenue-officer.md) | [KO](sub-agents/ko/chief-revenue-officer.md) | `Read, Write` | Revenue strategy, growth |
| [**Chief Strategy Officer**](sub-agents/en/chief-strategy-officer.md) | [EN](sub-agents/en/chief-strategy-officer.md) | [KO](sub-agents/ko/chief-strategy-officer.md) | `Read, Write` | Corporate strategy, planning |

</details>

## ⚡ Slash Commands (NEW!)

Claude Agents Power now supports convenient slash commands in Claude Code, similar to SuperClaude Framework!

### 🚀 Installation

Install slash commands to Claude Code:
```bash
npx claude-agents-power --install-slash-commands
```

### 📋 Available Commands

Once installed, you can use these commands directly in Claude Code:

#### `/agents:load [language] [role] [--flags]`
Load and display available agents
```
/agents:load                    # Show all agents
/agents:load ko                 # Show Korean agents
/agents:load backend-engineer   # Show specific role
/agents:load --all --detailed   # Show all with descriptions
```

#### `/agents:search <query> [--flags]`
Search for agents by skills or keywords
```
/agents:search "machine learning"
/agents:search "frontend react" --language en
/agents:search "데이터 분석" --language ko --fuzzy
```

#### `/agents:suggest [context] [--flags]`
Get intelligent agent recommendations
```
/agents:suggest                                    # Auto-detect from project
/agents:suggest "building React e-commerce"
/agents:suggest --project-type web --phase development
```

#### `/agents:version [--flags]`
Check system version and status
```
/agents:version                    # Basic version info
/agents:version --detailed         # System details
/agents:version --check-updates    # Check for updates
```

#### `/agent-download [--flags]` ⭐ **NEW!**
Automatically analyze project and download recommended agents
```
/agent-download                                    # Auto-analyze and download
/agent-download --target-dir ./team --limit 5     # Custom directory and limit
/agent-download --dry-run                          # Preview only
/agent-download --language ko --format yaml       # Korean agents in YAML format
```

### 🗑️ Uninstallation

Remove slash commands:
```bash
npx claude-agents-power --uninstall-slash-commands
```

### 💡 Pro Tips

- Start with `/agents:load` to see all available agents
- Use `/agents:suggest` for context-aware recommendations
- Try `/agents:search` when you know what skills you need
- Check `/agents:version` if agents aren't loading properly

---

## 🎯 Usage Examples

### 📊 Download Statistics
```bash
# Get download statistics for popular agents
mcp__claude-agents-power__get-download-stats

# Refresh agents from GitHub repository
mcp__claude-agents-power__refresh-agents
```

### 🚀 Startup MVP Development
```bash
# Analyze project and get recommendations
mcp__claude-agents-power__analyze-project

# Install core startup team
mcp__claude-agents-power__install-agents [
  "product-manager",
  "frontend-developer", 
  "backend-developer",
  "growth-marketing-manager"
]
```

### 🏢 Enterprise Application
```bash
# Get recommendations for enterprise project
mcp__claude-agents-power__recommend-by-keywords [
  "enterprise", "security", "scalability", "compliance"
]

# Install enterprise team
mcp__claude-agents-power__install-agents [
  "solution-architect",
  "security-engineer",
  "devops-engineer",
  "compliance-manager"
]
```

### 📊 Data Platform
```bash
# Search for data-related roles
mcp__claude-agents-power__search-agents "data analytics machine learning"

# Install data team
mcp__claude-agents-power__install-agents [
  "data-scientist",
  "data-engineer", 
  "machine-learning-engineer",
  "analytics-engineer"
]
```

## 📚 Documentation

### 📖 User Guides
- [**User Guide**](USER_GUIDE.md) - Complete usage guide with best practices
- [**Examples**](EXAMPLES.md) - Real-world scenarios and use cases
- [**Troubleshooting**](TROUBLESHOOTING.md) - Common issues and solutions

### 🔧 Technical Documentation  
- [**Installation Guide**](INSTALL.md) - Step-by-step setup instructions

## 🛠️ Development

### Prerequisites
- Node.js 16+ 
- TypeScript 5+
- Claude Code with MCP support

### Build from Source
```bash
git clone https://github.com/hongsw/claude-agents-power-mcp-server.git
cd claude-agents-power
npm install
npm run build
npm test
```

### Project Structure
```
claude-agents-power/
├── src/                    # TypeScript source code
├── claude/agents/         # Agent definitions
│   ├── en/               # English agents (85 roles)
│   ├── kr/               # Korean agents (85 roles)
│   ├── ja/               # Japanese agents (5 roles)
│   └── zh/               # Chinese agents (8 roles)
├── sub-agents/            # Legacy agent definitions (deprecated)
├── dist/                 # Compiled JavaScript
├── docs/                 # Documentation
└── examples/             # Usage examples
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### 🌟 How to Contribute
1. **Add New Roles** - Create agents for specialized positions
2. **Improve Translations** - Enhance Korean/English localization  
3. **Add Project Templates** - Contribute industry-specific templates
4. **Documentation** - Improve guides and examples

## 🔍 Can't Find the Agent You Need?

If you can't find a specific agent role you're looking for, here's how to request or create one:

### 📋 Request a New Agent

1. **Check Existing Agents First**
   ```bash
   # Search for agents using MCP
   claude-agents-power agents --action search --query "your-role"
   ```

2. **Automatic Issue Creation (NEW! 🎉)**
   ```bash
   # Automatically create GitHub Issue when search returns 0 results
   # Requires GITHUB_TOKEN environment variable
   export GITHUB_TOKEN=your_github_token
   
   # Enable auto issue creation when searching
   claude-agents-power agents --action search --query "blockchain-architect" --autoCreateIssue true
   
   # Or directly create an issue
   claude-agents-power agents --action request --name "blockchain-architect" --description "Blockchain system design expert"
   ```

3. **Manual Issue Submission**
   - Go to [GitHub Issues](https://github.com/hongsw/claude-agents-power-mcp-server/issues)
   - Click "New Issue"
   - Use title format: `[Agent Request] Role Name - Brief Description`
   - Include:
     - Role name (e.g., `blockchain-architect`)
     - Description of responsibilities
     - Required tools
     - Use cases

### 🛠️ Create Your Own Agent

#### Agent File Format

Create a new `.md` file in `claude/agents/{language}/` directory:

```markdown
---
name: your-agent-name
description: Brief description of the agent's expertise and responsibilities
tools: Read, Write, Edit, Bash, WebSearch
---

You are a [role title] specializing in [domain/expertise].

## Core Responsibilities
- Primary responsibility 1
- Primary responsibility 2
- Primary responsibility 3

## Key Practices
- Best practice or methodology 1
- Best practice or methodology 2
- Best practice or methodology 3

## Tools and Technologies
- Specific tools or frameworks used
- Technologies you're expert in
- Platforms you work with

## Quality Standards
- Quality metric or standard 1
- Quality metric or standard 2
- Performance expectations
```

#### Available Tools

Choose appropriate tools for your agent:
- **Read, Write, Edit, MultiEdit** - File operations
- **Bash, Grep, Glob** - System operations
- **WebSearch, WebFetch** - Internet access
- **TodoWrite, Task** - Task management
- **NotebookRead, NotebookEdit** - Jupyter notebook support

#### Example: Creating a Blockchain Architect Agent

`claude/agents/en/blockchain-architect.md`:
```markdown
---
name: blockchain-architect
description: Blockchain system architect designing scalable DLT solutions and smart contract architectures
tools: Read, Write, Edit, Bash, WebSearch
---

You are a blockchain architect specializing in distributed ledger technology and decentralized systems.

## Core Responsibilities
- Design blockchain network architectures
- Develop smart contract systems
- Implement consensus mechanisms
- Ensure security and scalability

## Key Practices
- Follow security-first design principles
- Optimize for gas efficiency
- Implement proper access controls
- Design upgradeable contracts
- Ensure cross-chain compatibility

## Tools and Technologies
- Ethereum, Polygon, Solana
- Solidity, Rust, Move
- Web3.js, Ethers.js
- Hardhat, Truffle, Foundry
- IPFS, The Graph

## Quality Standards
- 100% test coverage for smart contracts
- Gas optimization benchmarks
- Security audit compliance
- Formal verification when applicable
```

### 📤 Submit Your Agent

1. **Fork the Repository**
   ```bash
   git clone https://github.com/hongsw/claude-agents-power-mcp-server.git
   cd claude-agents-power-mcp-server
   ```

2. **Create Your Agent File**
   ```bash
   # For English agents
   touch claude/agents/en/your-agent-name.md
   
   # For Korean agents
   touch claude/agents/ko/your-agent-name.md
   ```

3. **Submit a Pull Request**
   - Commit your changes
   - Push to your fork
   - Create a PR with description
   - We'll review and merge!

### 💡 Agent Creation Tips

1. **Be Specific**: Clearly define the role's expertise and boundaries
2. **Choose Tools Wisely**: Only include tools the agent actually needs
3. **Include Examples**: Add specific methodologies or frameworks
4. **Consider Localization**: Provide translations for multiple languages
5. **Test Your Agent**: Ensure it works well with real tasks

### 🚀 Roadmap
- [x] GitHub integration for agent templates
- [x] Download tracking and analytics
- [ ] Visual project analyzer dashboard
- [ ] Role dependency recommendations  
- [ ] Industry-specific role bundles
- [ ] Integration with popular project management tools
- [ ] Advanced team composition algorithms

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">

**⭐ Star this repository if you find it useful!**

[🐛 Report Bug](https://github.com/hongsw/claude-agents-power-mcp-server/issues) • [✨ Request Feature](https://github.com/hongsw/claude-agents-power-mcp-server/issues) • [📖 Documentation](docs/)

Made with ❤️ for the Claude Code community

</div>