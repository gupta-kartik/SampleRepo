import React, { useState } from 'react';

const questions = [
  {
    id: 'projectScope',
    question: 'What is the scope and complexity of your project?',
    options: [
      { value: 'small', label: 'Small utility or feature (< 1000 lines of code)' },
      { value: 'medium', label: 'Medium-sized component or service (1000-10000 lines)' },
      { value: 'large', label: 'Large application or complex system (> 10000 lines)' }
    ]
  },
  {
    id: 'dependencies',
    question: 'How heavily does your project depend on existing code in the current repository?',
    options: [
      { value: 'heavy', label: 'Heavy - Shares significant code, utilities, or configurations' },
      { value: 'minimal', label: 'Minimal - Some shared utilities or configurations' },
      { value: 'none', label: 'None - Completely independent functionality' }
    ]
  },
  {
    id: 'lifetime',
    question: 'What is the expected lifetime of this project?',
    options: [
      { value: 'short', label: 'Short-term (< 6 months) - Prototype or temporary solution' },
      { value: 'medium', label: 'Medium-term (6 months - 2 years) - Feature or component' },
      { value: 'long', label: 'Long-term (> 2 years) - Core application or service' }
    ]
  },
  {
    id: 'teamStructure',
    question: 'Who will be working on this project?',
    options: [
      { value: 'same', label: 'Same team that works on the existing repository' },
      { value: 'mixed', label: 'Mix of current team and new developers' },
      { value: 'different', label: 'Completely different team or external contributors' }
    ]
  },
  {
    id: 'deployment',
    question: 'How will this project be deployed and released?',
    options: [
      { value: 'shared', label: 'Same deployment pipeline and release cycle' },
      { value: 'coordinated', label: 'Coordinated releases but separate deployment' },
      { value: 'independent', label: 'Completely independent deployment and releases' }
    ]
  },
  {
    id: 'accessControl',
    question: 'What access control requirements does this project have?',
    options: [
      { value: 'same', label: 'Same access requirements as existing repository' },
      { value: 'subset', label: 'More restrictive access than existing repository' },
      { value: 'different', label: 'Different access requirements or external visibility' }
    ]
  }
];

function DecisionQuestionnaire({ onComplete }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});

  const handleAnswer = (questionId, value) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      onComplete(answers);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const currentQ = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const isAnswered = answers[currentQ.id];

  return (
    <div className="questionnaire">
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${progress}%` }}></div>
      </div>
      
      <div className="question">
        <h3>Question {currentQuestion + 1} of {questions.length}</h3>
        <h2>{currentQ.question}</h2>
        
        <div className="options">
          {currentQ.options.map(option => (
            <div
              key={option.value}
              className={`option ${answers[currentQ.id] === option.value ? 'selected' : ''}`}
              onClick={() => handleAnswer(currentQ.id, option.value)}
            >
              <strong>{option.label}</strong>
            </div>
          ))}
        </div>
      </div>

      <div className="navigation">
        <button 
          className="btn btn-secondary"
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
        >
          Previous
        </button>
        
        <button 
          className="btn btn-primary"
          onClick={handleNext}
          disabled={!isAnswered}
        >
          {currentQuestion === questions.length - 1 ? 'Get Recommendation' : 'Next'}
        </button>
      </div>
    </div>
  );
}

export default DecisionQuestionnaire;