# Repository Decision Helper Web App

A web application that guides developers through the decision-making process of whether to add new projects to an existing monorepo or create entirely new repositories. The app also automates setup with best practices.

## Features

### 🤔 Decision Helper
- Interactive questionnaire (< 5 minutes)
- Intelligent recommendation engine with scoring
- Clear pros/cons analysis for each option
- Justification for recommendations

### 🚀 Setup Automation
- **Monorepo additions**: Folder structure, documentation, CI/CD configuration
- **New repositories**: Complete repository setup with best practices
- GitHub Actions workflows
- AWS Secrets Manager integration
- Documentation templates

### 🔧 Technical Stack
- **Frontend**: React with responsive design
- **Backend**: Node.js/Express API
- **Integrations**: GitHub API, AWS SDK
- **Templates**: Pre-configured CI/CD, documentation, and project structures

## Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm

### Installation
```bash
# Install dependencies for both server and client
npm run install-all

# Or install separately:
npm install                    # Backend dependencies
cd client && npm install     # Frontend dependencies
```

### Development
```bash
# Start both frontend and backend in development mode
npm run dev

# Or start separately:
npm run server    # Backend only (port 3001)
npm run client    # Frontend only (port 3000)
```

### Production
```bash
# Build the frontend
npm run build

# Start the production server
npm start
```

The application will be available at `http://localhost:3001`

## Usage

1. **Take the Questionnaire**: Answer 6 questions about your project (scope, dependencies, team structure, etc.)

2. **Review Recommendation**: Get a data-driven recommendation with confidence score and reasoning

3. **Setup Automation**: Configure your project details and let the app generate:
   - Folder structure and boilerplate code
   - README and documentation templates
   - CI/CD workflows (GitHub Actions)
   - Configuration files with best practices

## Configuration

Copy `.env.example` to `.env` and configure:

```bash
# GitHub API (for repository operations)
GITHUB_TOKEN=your_github_personal_access_token
GITHUB_ORG=your-organization

# AWS (for Secrets Manager integration)
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
```

## API Endpoints

- `GET /api/health` - Health check
- `POST /api/setup` - Create project structure based on recommendation
- `GET /api/templates` - Get available templates
- `GET /api/templates/:type/:template` - Get specific template content

## Architecture

```
repository-decision-helper/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   │   ├── DecisionQuestionnaire.js
│   │   │   ├── RecommendationResult.js
│   │   │   └── SetupWizard.js
│   │   ├── App.js          # Main application
│   │   └── index.js        # Entry point
│   └── public/
├── server/                 # Node.js backend
│   ├── routes/             # API routes
│   ├── utils/              # Utility functions
│   └── index.js            # Server entry point
├── templates/              # Project templates
└── docs/                   # Documentation
```

## Decision Algorithm

The recommendation engine uses a scoring system based on:

- **Project Scope**: Small projects favor monorepo, large projects favor new repos
- **Dependencies**: Heavy shared dependencies favor monorepo
- **Team Structure**: Same team favors monorepo, different teams favor new repos
- **Deployment Needs**: Shared deployment favors monorepo, independent deployment favors new repos
- **Access Control**: Same permissions favor monorepo, different permissions favor new repos
- **Project Lifetime**: Short-term projects favor monorepo, long-term projects favor new repos

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Run tests: `npm test`
5. Commit changes: `git commit -m 'Add amazing feature'`
6. Push to branch: `git push origin feature/amazing-feature`
7. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, please open an issue or contact the development team.