function generateMonorepoStructure(projectDetails) {
  const { projectName, description, technologies } = projectDetails;
  
  return {
    [`${projectName}/README.md`]: generateMonorepoReadme(projectDetails),
    [`${projectName}/package.json`]: generatePackageJson(projectDetails, 'monorepo'),
    [`${projectName}/src/index.js`]: generateMainFile(projectDetails),
    [`${projectName}/tests/index.test.js`]: generateTestFile(projectDetails),
    [`${projectName}/config/development.js`]: generateConfigFile('development'),
    [`${projectName}/config/production.js`]: generateConfigFile('production'),
    [`${projectName}/.gitignore`]: generateGitignore(),
    [`${projectName}/.env.example`]: generateEnvExample(projectDetails)
  };
}

function generateNewRepoStructure(projectDetails) {
  return {
    'README.md': generateNewRepoReadme(projectDetails),
    'package.json': generatePackageJson(projectDetails, 'new-repo'),
    'src/index.js': generateMainFile(projectDetails),
    'tests/index.test.js': generateTestFile(projectDetails),
    '.gitignore': generateGitignore(),
    '.env.example': generateEnvExample(projectDetails),
    'LICENSE': generateLicense(),
    'CONTRIBUTING.md': generateContributing(),
    'CODE_OF_CONDUCT.md': generateCodeOfConduct()
  };
}

function generateDocumentationTemplates(projectDetails, type) {
  return {
    'docs/SETUP.md': generateSetupDoc(projectDetails, type),
    'docs/API.md': generateApiDoc(projectDetails),
    'docs/DEPLOYMENT.md': generateDeploymentDoc(projectDetails)
  };
}

function generateCICDTemplates(projectDetails, type) {
  return {
    '.github/workflows/ci.yml': generateCIWorkflow(projectDetails),
    '.github/workflows/deploy.yml': generateDeployWorkflow(projectDetails),
    '.github/ISSUE_TEMPLATE/bug_report.md': generateBugReportTemplate(),
    '.github/ISSUE_TEMPLATE/feature_request.md': generateFeatureRequestTemplate(),
    '.github/pull_request_template.md': generatePullRequestTemplate()
  };
}

function generateMonorepoReadme(projectDetails) {
  const { projectName, description, technologies } = projectDetails;
  
  return `# ${projectName}

## Description
${description || 'Brief description of this component within the monorepo.'}

## Technologies
${technologies || 'List of technologies used in this project'}

## Getting Started

### Prerequisites
- Node.js (version specified in root package.json)
- Dependencies installed from monorepo root

### Installation
From the monorepo root:
\`\`\`bash
npm install
\`\`\`

### Running the Project
\`\`\`bash
npm run dev:${projectName}
\`\`\`

## Project Structure
\`\`\`
${projectName}/
├── src/           # Source code
├── tests/         # Test files
├── config/        # Configuration files
└── README.md      # This file
\`\`\`

## Testing
\`\`\`bash
npm run test:${projectName}
\`\`\`

## Contributing
This project follows the monorepo contribution guidelines. See the root README for details.

## Related Projects
- [Main Application](../main-app)
- [Shared Utilities](../shared-utils)
`;
}

function generateNewRepoReadme(projectDetails) {
  const { projectName, description, technologies } = projectDetails;
  
  return `# ${projectName}

[![CI](https://github.com/your-org/${projectName}/workflows/CI/badge.svg)](https://github.com/your-org/${projectName}/actions)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Node.js Version](https://img.shields.io/node/v/${projectName})](package.json)

## Description
${description || 'Brief description of your project.'}

## Technologies
${technologies || 'List of technologies used'}

## Installation
\`\`\`bash
git clone https://github.com/your-org/${projectName}.git
cd ${projectName}
npm install
\`\`\`

## Usage
\`\`\`bash
npm start
\`\`\`

## Development
\`\`\`bash
npm run dev
\`\`\`

## Testing
\`\`\`bash
npm test
\`\`\`

## Project Structure
\`\`\`
${projectName}/
├── src/           # Source code
├── tests/         # Test files
├── docs/          # Documentation
├── .github/       # GitHub workflows and templates
└── README.md      # This file
\`\`\`

## Contributing
Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support
For support, please open an issue or contact the development team.
`;
}

function generatePackageJson(projectDetails, type) {
  const { projectName, description } = projectDetails;
  const isMonorepo = type === 'monorepo';
  
  const basePackage = {
    name: isMonorepo ? `@company/${projectName}` : projectName,
    version: '1.0.0',
    description: description || 'Project description',
    main: 'src/index.js',
    scripts: {
      start: 'node src/index.js',
      dev: 'nodemon src/index.js',
      test: 'jest',
      'test:watch': 'jest --watch',
      lint: 'eslint src/',
      'lint:fix': 'eslint src/ --fix'
    },
    keywords: projectDetails.technologies ? projectDetails.technologies.split(',').map(t => t.trim()) : [],
    author: 'Your Organization',
    license: 'MIT',
    dependencies: {},
    devDependencies: {
      'jest': '^29.0.0',
      'eslint': '^8.0.0',
      'nodemon': '^2.0.0'
    }
  };

  if (!isMonorepo) {
    basePackage.repository = {
      type: 'git',
      url: `https://github.com/your-org/${projectName}.git`
    };
    basePackage.bugs = {
      url: `https://github.com/your-org/${projectName}/issues`
    };
    basePackage.homepage = `https://github.com/your-org/${projectName}#readme`;
  }

  return JSON.stringify(basePackage, null, 2);
}

function generateMainFile(projectDetails) {
  return `/**
 * ${projectDetails.projectName}
 * ${projectDetails.description || 'Main application entry point'}
 */

console.log('Hello from ${projectDetails.projectName}!');

// TODO: Implement your application logic here

module.exports = {
  // Export your main functions here
};
`;
}

function generateTestFile(projectDetails) {
  return `/**
 * Tests for ${projectDetails.projectName}
 */

describe('${projectDetails.projectName}', () => {
  test('should be properly configured', () => {
    expect(true).toBe(true);
  });

  // TODO: Add your actual tests here
});
`;
}

function generateConfigFile(environment) {
  return `/**
 * ${environment.charAt(0).toUpperCase() + environment.slice(1)} configuration
 */

module.exports = {
  environment: '${environment}',
  port: process.env.PORT || ${environment === 'development' ? '3000' : '8080'},
  database: {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    name: process.env.DB_NAME || 'myapp_${environment}'
  },
  aws: {
    region: process.env.AWS_REGION || 'us-east-1',
    secretsManager: {
      enabled: ${environment === 'production' ? 'true' : 'false'}
    }
  }
};
`;
}

function generateGitignore() {
  return `# Dependencies
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Runtime data
pids
*.pid
*.seed
*.pid.lock

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Logs
logs
*.log

# Build outputs
dist/
build/
*.tgz

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db

# Coverage directory used by tools like istanbul
coverage/

# AWS
.aws/
`;
}

function generateEnvExample(projectDetails) {
  return `# Environment Configuration
# Copy this file to .env and update the values

# Application
NODE_ENV=development
PORT=3000

# Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=myapp_development
DB_USER=username
DB_PASSWORD=password

# AWS Configuration
AWS_REGION=${projectDetails.awsRegion || 'us-east-1'}
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key

# GitHub API (for repository operations)
GITHUB_TOKEN=your_github_token

# Other API Keys
API_KEY=your_api_key
`;
}

function generateLicense() {
  return `MIT License

Copyright (c) ${new Date().getFullYear()} Your Organization

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
`;
}

function generateContributing() {
  return `# Contributing to this Project

Thank you for your interest in contributing! Please follow these guidelines.

## Code of Conduct
This project adheres to our [Code of Conduct](CODE_OF_CONDUCT.md).

## How to Contribute

### Reporting Bugs
1. Use the GitHub issue tracker
2. Include a clear description and steps to reproduce
3. Provide environment details

### Suggesting Features
1. Open a GitHub issue with the "enhancement" label
2. Describe the feature and its benefits
3. Discuss implementation approach

### Pull Requests
1. Fork the repository
2. Create a feature branch (\`git checkout -b feature/AmazingFeature\`)
3. Commit your changes (\`git commit -m 'Add some AmazingFeature'\`)
4. Push to the branch (\`git push origin feature/AmazingFeature\`)
5. Open a Pull Request

## Development Setup
1. Clone the repository
2. Install dependencies: \`npm install\`
3. Run tests: \`npm test\`
4. Start development server: \`npm run dev\`

## Coding Standards
- Use ESLint configuration provided
- Write tests for new features
- Follow existing code style
- Update documentation as needed

## Questions?
Open an issue or contact the maintainers.
`;
}

function generateCodeOfConduct() {
  return `# Code of Conduct

## Our Pledge
We pledge to make participation in our project a harassment-free experience for everyone.

## Our Standards
Examples of behavior that contributes to creating a positive environment include:
* Using welcoming and inclusive language
* Being respectful of differing viewpoints and experiences
* Gracefully accepting constructive criticism
* Focusing on what is best for the community

Examples of unacceptable behavior include:
* Harassment of any kind
* Trolling, insulting/derogatory comments
* Publishing others' private information without permission

## Our Responsibilities
Project maintainers are responsible for clarifying the standards of acceptable behavior and are expected to take appropriate and fair corrective action.

## Enforcement
Instances of abusive behavior may be reported to the project team. All complaints will be reviewed and investigated.

## Attribution
This Code of Conduct is adapted from the [Contributor Covenant](https://www.contributor-covenant.org/).
`;
}

module.exports = {
  generateMonorepoStructure,
  generateNewRepoStructure,
  generateMonorepoReadme,
  generateNewRepoReadme,
  generatePackageJson,
  generateMainFile,
  generateTestFile,
  generateConfigFile,
  generateGitignore,
  generateEnvExample,
  generateLicense,
  generateContributing,
  generateCodeOfConduct
};

function generateSetupDoc(projectDetails, type) {
  return `# Setup Guide

## Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Git

## Installation
${type === 'monorepo' ? 
  `From monorepo root:\n\`\`\`bash\nnpm install\n\`\`\`` : 
  `\`\`\`bash\ngit clone <repository-url>\ncd ${projectDetails.projectName}\nnpm install\n\`\`\``
}

## Environment Configuration
1. Copy \`.env.example\` to \`.env\`
2. Update environment variables as needed

## Development
\`\`\`bash
npm run dev
\`\`\`

## Testing
\`\`\`bash
npm test
\`\`\`
`;
}

function generateApiDoc(projectDetails) {
  return `# API Documentation

## Overview
API documentation for ${projectDetails.projectName}

## Endpoints

### Health Check
\`GET /health\`

Returns the health status of the application.

**Response:**
\`\`\`json
{
  "status": "OK",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
\`\`\`

## Authentication
Describe authentication methods here.

## Error Handling
Standard HTTP status codes are used.
`;
}

function generateDeploymentDoc(projectDetails) {
  return `# Deployment Guide

## Environment Setup
Ensure the following environment variables are configured:
- \`NODE_ENV\`
- \`PORT\`
- \`AWS_REGION\`

## AWS Secrets Manager
${projectDetails.enableSecrets ? 
  'This project uses AWS Secrets Manager for sensitive configuration.' : 
  'Secrets Manager integration is disabled.'
}

## CI/CD Pipeline
The project uses GitHub Actions for automated deployment.

## Manual Deployment
\`\`\`bash
npm run build
npm start
\`\`\`

## Health Checks
Monitor the \`/health\` endpoint for application status.
`;
}

function generateCIWorkflow(projectDetails) {
  return `name: CI

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    
    strategy:
      matrix:
        node-version: [16.x, 18.x]
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Use Node.js \${{ matrix.node-version }}
      uses: actions/setup-node@v3
      with:
        node-version: \${{ matrix.node-version }}
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run linting
      run: npm run lint
    
    - name: Run tests
      run: npm test
      
    - name: Upload coverage to Codecov
      uses: codecov/codecov-action@v3
      if: matrix.node-version == '18.x'
`;
}

function generateDeployWorkflow(projectDetails) {
  return `name: Deploy

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Configure AWS credentials
      uses: aws-actions/configure-aws-credentials@v2
      with:
        aws-access-key-id: \${{ secrets.AWS_ACCESS_KEY_ID }}
        aws-secret-access-key: \${{ secrets.AWS_SECRET_ACCESS_KEY }}
        aws-region: ${projectDetails.awsRegion}
    
    - name: Deploy to AWS
      run: |
        echo "Deployment steps would go here"
        # Add your deployment commands
`;
}

function generateBugReportTemplate() {
  return `---
name: Bug report
about: Create a report to help us improve
title: ''
labels: bug
assignees: ''
---

**Describe the bug**
A clear and concise description of what the bug is.

**To Reproduce**
Steps to reproduce the behavior:
1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

**Expected behavior**
A clear and concise description of what you expected to happen.

**Screenshots**
If applicable, add screenshots to help explain your problem.

**Environment:**
- OS: [e.g. iOS]
- Browser [e.g. chrome, safari]
- Version [e.g. 22]

**Additional context**
Add any other context about the problem here.
`;
}

function generateFeatureRequestTemplate() {
  return `---
name: Feature request
about: Suggest an idea for this project
title: ''
labels: enhancement
assignees: ''
---

**Is your feature request related to a problem? Please describe.**
A clear and concise description of what the problem is. Ex. I'm always frustrated when [...]

**Describe the solution you'd like**
A clear and concise description of what you want to happen.

**Describe alternatives you've considered**
A clear and concise description of any alternative solutions or features you've considered.

**Additional context**
Add any other context or screenshots about the feature request here.
`;
}

function generatePullRequestTemplate() {
  return `## Description
Brief description of the changes made.

## Type of change
- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update

## Testing
- [ ] Tests pass locally
- [ ] Added tests for new functionality
- [ ] Manual testing completed

## Checklist
- [ ] My code follows the style guidelines of this project
- [ ] I have performed a self-review of my own code
- [ ] I have commented my code, particularly in hard-to-understand areas
- [ ] I have made corresponding changes to the documentation
- [ ] My changes generate no new warnings
`;
}

module.exports = {
  generateMonorepoStructure,
  generateNewRepoStructure,
  generateDocumentationTemplates,
  generateCICDTemplates
};