const express = require('express');
const router = express.Router();

// Get available templates
router.get('/', (req, res) => {
  const templates = {
    monorepo: [
      'Standard folder structure',
      'README template',
      'Package.json configuration',
      'CI/CD workflows',
      'Documentation templates'
    ],
    'new-repo': [
      'Repository initialization',
      'README with badges',
      'GitHub Actions workflows',
      'Issue and PR templates',
      'Security best practices',
      'License file'
    ]
  };
  
  res.json(templates);
});

// Get specific template content
router.get('/:type/:template', (req, res) => {
  const { type, template } = req.params;
  
  const templateContent = getTemplateContent(type, template);
  
  if (!templateContent) {
    return res.status(404).json({ error: 'Template not found' });
  }
  
  res.json({ content: templateContent });
});

function getTemplateContent(type, template) {
  // Return template content based on type and template name
  // This is a placeholder - in a real implementation, these would be loaded from files
  const templates = {
    'monorepo': {
      'readme': `# Project Name

## Description
Brief description of your project.

## Getting Started
Instructions for setting up the development environment.

## Structure
\`\`\`
project-name/
├── src/           # Source code
├── tests/         # Test files
├── docs/          # Documentation
└── config/        # Configuration files
\`\`\`

## Contributing
Guidelines for contributing to this project.
`,
      'package-json': `{
  "name": "@company/project-name",
  "version": "1.0.0",
  "description": "Project description",
  "main": "src/index.js",
  "scripts": {
    "start": "node src/index.js",
    "test": "jest",
    "lint": "eslint src/"
  },
  "dependencies": {},
  "devDependencies": {}
}`
    },
    'new-repo': {
      'readme': `# Project Name

[![CI](https://github.com/username/project-name/workflows/CI/badge.svg)](https://github.com/username/project-name/actions)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

## Description
Brief description of your project.

## Installation
\`\`\`bash
npm install
\`\`\`

## Usage
\`\`\`bash
npm start
\`\`\`

## Contributing
Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
`
    }
  };
  
  return templates[type]?.[template] || null;
}

module.exports = router;