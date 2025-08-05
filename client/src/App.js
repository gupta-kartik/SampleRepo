import React, { useState } from 'react';
import DecisionQuestionnaire from './components/DecisionQuestionnaire';
import RecommendationResult from './components/RecommendationResult';
import SetupWizard from './components/SetupWizard';

function App() {
  const [currentStep, setCurrentStep] = useState('questionnaire');
  const [answers, setAnswers] = useState({});
  const [recommendation, setRecommendation] = useState(null);

  const handleQuestionnaireComplete = (questionnaireAnswers) => {
    setAnswers(questionnaireAnswers);
    const rec = calculateRecommendation(questionnaireAnswers);
    setRecommendation(rec);
    setCurrentStep('recommendation');
  };

  const handleProceedToSetup = () => {
    setCurrentStep('setup');
  };

  const handleStartOver = () => {
    setCurrentStep('questionnaire');
    setAnswers({});
    setRecommendation(null);
  };

  const calculateRecommendation = (answers) => {
    // Simple scoring algorithm
    let monorepoScore = 0;
    let newRepoScore = 0;

    // Score based on project scope
    if (answers.projectScope === 'small') monorepoScore += 2;
    if (answers.projectScope === 'large') newRepoScore += 3;
    if (answers.projectScope === 'medium') {
      monorepoScore += 1;
      newRepoScore += 1;
    }

    // Score based on dependencies
    if (answers.dependencies === 'heavy') monorepoScore += 3;
    if (answers.dependencies === 'none') newRepoScore += 2;
    if (answers.dependencies === 'minimal') monorepoScore += 1;

    // Score based on lifetime
    if (answers.lifetime === 'short') monorepoScore += 2;
    if (answers.lifetime === 'long') newRepoScore += 2;

    // Score based on team structure
    if (answers.teamStructure === 'same') monorepoScore += 2;
    if (answers.teamStructure === 'different') newRepoScore += 2;

    // Score based on deployment needs
    if (answers.deployment === 'shared') monorepoScore += 2;
    if (answers.deployment === 'independent') newRepoScore += 2;

    // Score based on access control
    if (answers.accessControl === 'same') monorepoScore += 1;
    if (answers.accessControl === 'different') newRepoScore += 2;

    const decision = monorepoScore > newRepoScore ? 'monorepo' : 'new-repo';
    const confidence = Math.abs(monorepoScore - newRepoScore) / Math.max(monorepoScore, newRepoScore);

    return {
      decision,
      confidence: Math.round(confidence * 100),
      monorepoScore,
      newRepoScore,
      reasoning: generateReasoning(answers, decision)
    };
  };

  const generateReasoning = (answers, decision) => {
    const reasons = [];
    
    if (decision === 'monorepo') {
      if (answers.dependencies === 'heavy') {
        reasons.push('Heavy dependencies on existing code favor monorepo structure');
      }
      if (answers.teamStructure === 'same') {
        reasons.push('Same team working on related components benefits from shared repository');
      }
      if (answers.projectScope === 'small') {
        reasons.push('Small project scope fits well within existing monorepo structure');
      }
    } else {
      if (answers.projectScope === 'large') {
        reasons.push('Large project scope warrants its own repository for better organization');
      }
      if (answers.teamStructure === 'different') {
        reasons.push('Different team structure benefits from separate repository access control');
      }
      if (answers.deployment === 'independent') {
        reasons.push('Independent deployment needs are better served by separate repository');
      }
    }

    return reasons;
  };

  return (
    <div className="container">
      <div className="header">
        <h1>Repository Decision Helper</h1>
        <p>Guide for determining whether to add to monorepo or create a new repository</p>
      </div>

      {currentStep === 'questionnaire' && (
        <DecisionQuestionnaire onComplete={handleQuestionnaireComplete} />
      )}

      {currentStep === 'recommendation' && (
        <RecommendationResult 
          recommendation={recommendation}
          answers={answers}
          onProceedToSetup={handleProceedToSetup}
          onStartOver={handleStartOver}
        />
      )}

      {currentStep === 'setup' && (
        <SetupWizard 
          recommendation={recommendation}
          onStartOver={handleStartOver}
        />
      )}
    </div>
  );
}

export default App;