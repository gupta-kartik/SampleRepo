const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const { Octokit } = require('@octokit/rest');
const router = express.Router();

const {
  generateMonorepoStructure,
  generateNewRepoStructure,
  createDocumentationTemplates,
  createCICDTemplates
} = require('../utils/generators');

const {
  createGitHubRepository,
  setupBranchProtection,
  setupSecrets
} = require('../utils/github');

// Setup project based on recommendation
router.post('/', async (req, res) => {
  try {
    const { recommendation, projectDetails } = req.body;
    
    if (!projectDetails.projectName) {
      return res.status(400).json({ error: 'Project name is required' });
    }

    let setupResults = {
      createdFiles: [],
      repositoryUrl: null,
      cloneUrl: null,
      message: 'Project setup completed successfully'
    };

    if (recommendation === 'monorepo') {
      setupResults = await setupMonorepoProject(projectDetails);
    } else {
      setupResults = await setupNewRepository(projectDetails);
    }

    res.json(setupResults);
  } catch (error) {
    console.error('Setup error:', error);
    res.status(500).json({ 
      error: 'Setup failed', 
      details: error.message 
    });
  }
});

async function setupMonorepoProject(projectDetails) {
  const projectPath = path.join(process.cwd(), 'generated', projectDetails.projectName);
  
  // Create project directory structure
  await fs.mkdir(projectPath, { recursive: true });
  
  const createdFiles = [];
  
  // Generate folder structure
  const structure = generateMonorepoStructure(projectDetails);
  for (const [filePath, content] of Object.entries(structure)) {
    const fullPath = path.join(projectPath, filePath);
    await fs.mkdir(path.dirname(fullPath), { recursive: true });
    await fs.writeFile(fullPath, content);
    createdFiles.push(filePath);
  }
  
  // Generate documentation
  const docs = createDocumentationTemplates(projectDetails, 'monorepo');
  for (const [filePath, content] of Object.entries(docs)) {
    const fullPath = path.join(projectPath, filePath);
    await fs.mkdir(path.dirname(fullPath), { recursive: true });
    await fs.writeFile(fullPath, content);
    createdFiles.push(filePath);
  }
  
  // Generate CI/CD templates if enabled
  if (projectDetails.enableCICD) {
    const cicd = createCICDTemplates(projectDetails, 'monorepo');
    for (const [filePath, content] of Object.entries(cicd)) {
      const fullPath = path.join(projectPath, filePath);
      await fs.mkdir(path.dirname(fullPath), { recursive: true });
      await fs.writeFile(fullPath, content);
      createdFiles.push(filePath);
    }
  }
  
  return {
    createdFiles,
    message: `Monorepo folder structure created at: ${projectPath}`,
    projectPath
  };
}

async function setupNewRepository(projectDetails) {
  // Note: This is a simulation for demo purposes
  // In a real implementation, you would use GitHub API with proper authentication
  
  const createdFiles = [];
  const projectPath = path.join(process.cwd(), 'generated', projectDetails.projectName);
  
  // Create project directory
  await fs.mkdir(projectPath, { recursive: true });
  
  // Generate repository structure
  const structure = generateNewRepoStructure(projectDetails);
  for (const [filePath, content] of Object.entries(structure)) {
    const fullPath = path.join(projectPath, filePath);
    await fs.mkdir(path.dirname(fullPath), { recursive: true });
    await fs.writeFile(fullPath, content);
    createdFiles.push(filePath);
  }
  
  // Generate documentation
  const docs = createDocumentationTemplates(projectDetails, 'new-repo');
  for (const [filePath, content] of Object.entries(docs)) {
    const fullPath = path.join(projectPath, filePath);
    await fs.mkdir(path.dirname(fullPath), { recursive: true });
    await fs.writeFile(fullPath, content);
    createdFiles.push(filePath);
  }
  
  // Generate CI/CD templates if enabled
  if (projectDetails.enableCICD) {
    const cicd = createCICDTemplates(projectDetails, 'new-repo');
    for (const [filePath, content] of Object.entries(cicd)) {
      const fullPath = path.join(projectPath, filePath);
      await fs.mkdir(path.dirname(fullPath), { recursive: true });
      await fs.writeFile(fullPath, content);
      createdFiles.push(filePath);
    }
  }
  
  return {
    createdFiles,
    repositoryUrl: `https://github.com/your-org/${projectDetails.projectName}`,
    cloneUrl: `https://github.com/your-org/${projectDetails.projectName}.git`,
    message: 'New repository structure generated (GitHub integration would create actual repo)',
    projectPath
  };
}

module.exports = router;