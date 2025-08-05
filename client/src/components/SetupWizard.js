import React, { useState } from 'react';
import axios from 'axios';

function SetupWizard({ recommendation, onStartOver }) {
  const [projectDetails, setProjectDetails] = useState({
    projectName: '',
    description: '',
    technologies: '',
    awsRegion: 'us-east-1',
    enableSecrets: true,
    enableCICD: true
  });
  const [setupStatus, setSetupStatus] = useState('configuring'); // configuring, processing, completed, error
  const [setupResults, setSetupResults] = useState(null);

  const handleInputChange = (field, value) => {
    setProjectDetails(prev => ({ ...prev, [field]: value }));
  };

  const handleSetup = async () => {
    setSetupStatus('processing');
    
    try {
      const response = await axios.post('/api/setup', {
        recommendation: recommendation.decision,
        projectDetails
      });
      
      setSetupResults(response.data);
      setSetupStatus('completed');
    } catch (error) {
      console.error('Setup failed:', error);
      setSetupStatus('error');
    }
  };

  if (setupStatus === 'processing') {
    return (
      <div className="setup-options">
        <h2>Setting up your project...</h2>
        <p>Please wait while we configure your {recommendation.decision === 'monorepo' ? 'monorepo folder' : 'new repository'} with best practices.</p>
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <div style={{ fontSize: '24px' }}>⏳</div>
          <p>This may take a few moments...</p>
        </div>
      </div>
    );
  }

  if (setupStatus === 'completed') {
    return (
      <div className="setup-options">
        <h2>✅ Setup Complete!</h2>
        <p>Your {recommendation.decision === 'monorepo' ? 'monorepo folder' : 'new repository'} has been configured with best practices.</p>
        
        <div style={{ background: '#f8f9fa', padding: '20px', borderRadius: '6px', margin: '20px 0' }}>
          <h3>What was created:</h3>
          <ul>
            {setupResults?.createdFiles?.map((file, index) => (
              <li key={index}>{file}</li>
            )) || []}
          </ul>
        </div>

        {setupResults?.repositoryUrl && (
          <div style={{ background: '#e7f3ff', padding: '20px', borderRadius: '6px', margin: '20px 0' }}>
            <h3>Repository Details:</h3>
            <p><strong>URL:</strong> <a href={setupResults.repositoryUrl} target="_blank" rel="noopener noreferrer">{setupResults.repositoryUrl}</a></p>
            <p><strong>Clone command:</strong> <code>git clone {setupResults.cloneUrl}</code></p>
          </div>
        )}

        <div style={{ background: '#d4edda', padding: '20px', borderRadius: '6px', margin: '20px 0' }}>
          <h3>Next Steps:</h3>
          <ol>
            <li>Review the generated documentation</li>
            <li>Customize the CI/CD workflows as needed</li>
            <li>Set up your development environment</li>
            <li>Start coding!</li>
          </ol>
        </div>

        <button className="btn btn-primary" onClick={onStartOver}>
          Help with Another Project
        </button>
      </div>
    );
  }

  if (setupStatus === 'error') {
    return (
      <div className="setup-options">
        <h2>❌ Setup Failed</h2>
        <p>There was an error setting up your project. Please check your configuration and try again.</p>
        <button className="btn btn-secondary" onClick={() => setSetupStatus('configuring')}>
          Try Again
        </button>
        <button className="btn btn-primary" onClick={onStartOver}>
          Start Over
        </button>
      </div>
    );
  }

  return (
    <div className="setup-options">
      <h2>Configure Your {recommendation.decision === 'monorepo' ? 'Monorepo Addition' : 'New Repository'}</h2>
      
      <div className="form-group">
        <label htmlFor="projectName">Project Name *</label>
        <input
          type="text"
          id="projectName"
          value={projectDetails.projectName}
          onChange={(e) => handleInputChange('projectName', e.target.value)}
          placeholder="my-awesome-project"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Project Description</label>
        <textarea
          id="description"
          value={projectDetails.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          placeholder="Brief description of what this project does..."
        />
      </div>

      <div className="form-group">
        <label htmlFor="technologies">Technologies/Frameworks</label>
        <input
          type="text"
          id="technologies"
          value={projectDetails.technologies}
          onChange={(e) => handleInputChange('technologies', e.target.value)}
          placeholder="React, Node.js, Python, etc."
        />
      </div>

      <div className="form-group">
        <label htmlFor="awsRegion">AWS Region</label>
        <select
          id="awsRegion"
          value={projectDetails.awsRegion}
          onChange={(e) => handleInputChange('awsRegion', e.target.value)}
        >
          <option value="us-east-1">US East (N. Virginia)</option>
          <option value="us-west-2">US West (Oregon)</option>
          <option value="eu-west-1">Europe (Ireland)</option>
          <option value="ap-southeast-1">Asia Pacific (Singapore)</option>
        </select>
      </div>

      <div className="form-group">
        <label>
          <input
            type="checkbox"
            checked={projectDetails.enableSecrets}
            onChange={(e) => handleInputChange('enableSecrets', e.target.checked)}
          />
          &nbsp;Enable AWS Secrets Manager integration
        </label>
      </div>

      <div className="form-group">
        <label>
          <input
            type="checkbox"
            checked={projectDetails.enableCICD}
            onChange={(e) => handleInputChange('enableCICD', e.target.checked)}
          />
          &nbsp;Set up CI/CD workflows
        </label>
      </div>

      <div className="navigation">
        <button className="btn btn-secondary" onClick={onStartOver}>
          Start Over
        </button>
        <button 
          className="btn btn-primary" 
          onClick={handleSetup}
          disabled={!projectDetails.projectName}
        >
          Create Project
        </button>
      </div>
    </div>
  );
}

export default SetupWizard;