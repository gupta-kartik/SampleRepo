import React from 'react';

function RecommendationResult({ recommendation, answers, onProceedToSetup, onStartOver }) {
  const { decision, confidence, reasoning } = recommendation;

  const monorepoProsCons = {
    pros: [
      'Shared code and utilities reduce duplication',
      'Consistent tooling and build processes',
      'Easier cross-project refactoring',
      'Centralized dependency management',
      'Single CI/CD pipeline for related projects'
    ],
    cons: [
      'Potential for increased build times',
      'Risk of tight coupling between projects',
      'Larger repository size and complexity',
      'Potential for merge conflicts',
      'All developers need access to entire codebase'
    ]
  };

  const newRepoProsCons = {
    pros: [
      'Complete autonomy over project structure',
      'Independent release and deployment cycles',
      'Focused access control and permissions',
      'Smaller, more manageable codebase',
      'Clear ownership and responsibility'
    ],
    cons: [
      'Potential code duplication across repositories',
      'Need to set up new CI/CD pipelines',
      'Coordination required for shared dependencies',
      'More repositories to maintain',
      'Potential for divergent practices'
    ]
  };

  const currentProsCons = decision === 'monorepo' ? monorepoProsCons : newRepoProsCons;

  return (
    <div>
      <div className={`recommendation ${decision}`}>
        <h2>Recommendation: {decision === 'monorepo' ? 'Add to Monorepo' : 'Create New Repository'}</h2>
        <p><strong>Confidence Level:</strong> {confidence}%</p>
        
        <div className="reasoning">
          <h3>Why this recommendation?</h3>
          <ul>
            {reasoning.map((reason, index) => (
              <li key={index}>{reason}</li>
            ))}
          </ul>
        </div>

        <div className="pros-cons">
          <div className="pros">
            <h4>✅ Advantages</h4>
            <ul>
              {currentProsCons.pros.map((pro, index) => (
                <li key={index}>{pro}</li>
              ))}
            </ul>
          </div>
          
          <div className="cons">
            <h4>⚠️ Considerations</h4>
            <ul>
              {currentProsCons.cons.map((con, index) => (
                <li key={index}>{con}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="navigation">
          <button className="btn btn-secondary" onClick={onStartOver}>
            Start Over
          </button>
          <button className="btn btn-primary" onClick={onProceedToSetup}>
            Proceed with Setup
          </button>
        </div>
      </div>

      <div className="recommendation">
        <h3>Your Answers Summary</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          <div><strong>Project Scope:</strong> {answers.projectScope}</div>
          <div><strong>Dependencies:</strong> {answers.dependencies}</div>
          <div><strong>Lifetime:</strong> {answers.lifetime}</div>
          <div><strong>Team Structure:</strong> {answers.teamStructure}</div>
          <div><strong>Deployment:</strong> {answers.deployment}</div>
          <div><strong>Access Control:</strong> {answers.accessControl}</div>
        </div>
      </div>
    </div>
  );
}

export default RecommendationResult;