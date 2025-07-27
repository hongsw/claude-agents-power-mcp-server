# 🤖 Pair-Role MCP Server

[![English](https://img.shields.io/badge/lang-English-blue.svg)](README.md)
[![한국어](https://img.shields.io/badge/lang-한국어-red.svg)](README.ko.md)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![MCP](https://img.shields.io/badge/MCP-Compatible-purple.svg)](https://modelcontextprotocol.org/)

> 🎯 **Smart Role Assignment for Development Teams** - An intelligent MCP server that analyzes your project and recommends the perfect team composition from 100+ professional roles across all company departments.

## 📖 Table of Contents

- [🌟 Features](#-features)
- [🚀 Quick Start](#-quick-start)
- [📋 Available Roles](#-available-roles)
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
- No need to create agent templates from scratch

## 🚀 Quick Start

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/pair-role-mcp-server.git
cd pair-role-mcp-server

# Install dependencies
npm install

# Build the project
npm run build
```

### MCP Configuration

Add to your `~/.config/claude/mcp_servers.json`:

```json
{
  "mcpServers": {
    "pair-role": {
      "command": "node",
      "args": ["/path/to/pair-role-mcp-server/dist/index.js"],
      "cwd": "/path/to/your/project",
      "env": {}
    }
  }
}
```

### Basic Usage

```bash
# Analyze your current project
mcp__pair-role__analyze-project

# Get role recommendations  
mcp__pair-role__recommend-by-keywords ["web", "api", "database"]

# Install recommended agents
mcp__pair-role__install-agents ["frontend-developer", "backend-developer"]
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

## 🎯 Usage Examples

### 📊 Download Statistics
```bash
# Get download statistics for popular agents
mcp__pair-role__get-download-stats

# Refresh agents from GitHub repository
mcp__pair-role__refresh-agents
```

### 🚀 Startup MVP Development
```bash
# Analyze project and get recommendations
mcp__pair-role__analyze-project

# Install core startup team
mcp__pair-role__install-agents [
  "product-manager",
  "frontend-developer", 
  "backend-developer",
  "growth-marketing-manager"
]
```

### 🏢 Enterprise Application
```bash
# Get recommendations for enterprise project
mcp__pair-role__recommend-by-keywords [
  "enterprise", "security", "scalability", "compliance"
]

# Install enterprise team
mcp__pair-role__install-agents [
  "solution-architect",
  "security-engineer",
  "devops-engineer",
  "compliance-manager"
]
```

### 📊 Data Platform
```bash
# Search for data-related roles
mcp__pair-role__search-agents "data analytics machine learning"

# Install data team
mcp__pair-role__install-agents [
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
git clone https://github.com/yourusername/pair-role-mcp-server.git
cd pair-role-mcp-server
npm install
npm run build
npm test
```

### Project Structure
```
pair-role-mcp-server/
├── src/                    # TypeScript source code
├── sub-agents/            # Agent definitions
│   ├── en/               # English agents
│   └── ko/               # Korean agents  
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

[🐛 Report Bug](https://github.com/yourusername/pair-role-mcp-server/issues) • [✨ Request Feature](https://github.com/yourusername/pair-role-mcp-server/issues) • [📖 Documentation](docs/)

Made with ❤️ for the Claude Code community

</div>