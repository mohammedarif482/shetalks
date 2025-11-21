import { useState } from 'react'
import './Survey.css'

// Sample survey questions - customize as needed
const surveyQuestions = [
  {
    id: 1,
    type: 'radio',
    category: 'GETTING STARTED',
    question: 'How did you hear about us?',
    options: [
      'Social media',
      'Friend or family',
      'Search engine',
      'Advertisement',
      'Other'
    ]
  },
  {
    id: 2,
    type: 'scale-5',
    category: 'EXPERIENCE',
    question: 'How would you rate your overall experience with our community?',
    scaleLabels: ['Poor', 'Excellent']
  },
  {
    id: 3,
    type: 'checkbox',
    question: 'Which topics interest you the most? (Select all that apply)',
    options: [
      'Women\'s health',
      'Mental wellness',
      'Career development',
      'Financial literacy',
      'Relationships',
      'Fitness & nutrition'
    ]
  },
  {
    id: 4,
    type: 'likert',
    question: 'Our content is valuable and informative',
    scaleLabels: ['Strongly Disagree', 'Strongly Agree']
  },
  {
    id: 5,
    type: 'nps',
    question: 'How likely are you to recommend us to a friend?',
    scaleLabels: ['Not likely', 'Very likely']
  },
  {
    id: 6,
    type: 'emoji',
    question: 'How do you feel about our recent events?',
    emojis: ['😞', '😕', '😐', '🙂', '😄']
  },
  {
    id: 7,
    type: 'text',
    question: 'What is one thing we could improve?',
    placeholder: 'Share your thoughts...'
  },
  {
    id: 8,
    type: 'textarea',
    question: 'If you could teach men one thing about women\'s health, what would it be?',
    placeholder: 'Share your thoughts here...',
    maxLength: 500
  }
]

const Survey = ({ onClose }) => {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const currentQuestion = surveyQuestions[currentStep]
  const progress = ((currentStep + 1) / surveyQuestions.length) * 100
  const isLastQuestion = currentStep === surveyQuestions.length - 1
  const isFirstQuestion = currentStep === 0

  const handleAnswer = (questionId, value) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }))
  }

  const handleNext = () => {
    if (currentStep < surveyQuestions.length - 1) {
      setCurrentStep(prev => prev + 1)
    } else {
      handleSubmit()
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1)
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    console.log('Survey Answers:', answers)
    setIsSubmitting(false)
    setShowSuccess(true)
    
    // Auto close after 3 seconds
    setTimeout(() => {
      if (onClose) onClose()
    }, 3000)
  }

  const isAnswered = () => {
    return answers[currentQuestion.id] !== undefined && answers[currentQuestion.id] !== ''
  }

  const renderQuestion = () => {
    switch (currentQuestion.type) {
      case 'radio':
        return <RadioQuestion question={currentQuestion} value={answers[currentQuestion.id]} onChange={handleAnswer} />
      case 'checkbox':
        return <CheckboxQuestion question={currentQuestion} value={answers[currentQuestion.id] || []} onChange={handleAnswer} />
      case 'scale-5':
        return <ScaleQuestion question={currentQuestion} value={answers[currentQuestion.id]} onChange={handleAnswer} max={5} />
      case 'nps':
        return <NPSQuestion question={currentQuestion} value={answers[currentQuestion.id]} onChange={handleAnswer} />
      case 'likert':
        return <LikertQuestion question={currentQuestion} value={answers[currentQuestion.id]} onChange={handleAnswer} />
      case 'emoji':
        return <EmojiQuestion question={currentQuestion} value={answers[currentQuestion.id]} onChange={handleAnswer} />
      case 'text':
        return <TextQuestion question={currentQuestion} value={answers[currentQuestion.id] || ''} onChange={handleAnswer} />
      case 'textarea':
        return <TextareaQuestion question={currentQuestion} value={answers[currentQuestion.id] || ''} onChange={handleAnswer} />
      default:
        return null
    }
  }

  if (showSuccess) {
    return (
      <div className="survey-page">
        <div className="survey-card">
          <div className="success-container">
            <div className="success-icon">✓</div>
            <h2 className="success-title">Thank You!</h2>
            <p className="success-message">Your responses have been submitted successfully.</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="survey-page">
      <div className="survey-card">
        <button className="close-button" onClick={onClose} aria-label="Close survey">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <div className="progress-container">
          <div className="progress-text">
            {currentStep + 1}/{surveyQuestions.length}
          </div>
          <div className="progress-bar-track">
            <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
          </div>
        </div>

        {currentQuestion.category && (
          <div className="section-label">{currentQuestion.category}</div>
        )}

        <h2 className="question-title">{currentQuestion.question}</h2>

        <div className="question-content">
          {renderQuestion()}
        </div>

        <div className="button-container">
          {!isFirstQuestion && (
            <button className="btn-previous" onClick={handlePrevious}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Previous
            </button>
          )}
          <button 
            className="btn-next" 
            onClick={handleNext}
            disabled={!isAnswered() || isSubmitting}
            style={isFirstQuestion ? { marginLeft: 'auto' } : {}}
          >
            {isSubmitting ? 'Submitting...' : isLastQuestion ? 'Submit' : 'Next'}
            {!isLastQuestion && !isSubmitting && (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

// Radio Question Component
const RadioQuestion = ({ question, value, onChange }) => (
  <div className="options-container">
    {question.options.map((option, index) => (
      <div
        key={index}
        className={`option-item ${value === option ? 'selected' : ''}`}
        onClick={() => onChange(question.id, option)}
      >
        <div className="radio-circle" />
        <span className="option-label">{option}</span>
      </div>
    ))}
  </div>
)

// Checkbox Question Component
const CheckboxQuestion = ({ question, value, onChange }) => {
  const handleToggle = (option) => {
    const newValue = value.includes(option)
      ? value.filter(v => v !== option)
      : [...value, option]
    onChange(question.id, newValue)
  }

  return (
    <div className="checkbox-container">
      {question.options.map((option, index) => (
        <div
          key={index}
          className={`checkbox-item ${value.includes(option) ? 'selected' : ''}`}
          onClick={() => handleToggle(option)}
        >
          <div className="checkbox-box">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <span className="checkbox-label">{option}</span>
        </div>
      ))}
    </div>
  )
}

// Scale Question Component (1-5)
const ScaleQuestion = ({ question, value, onChange, max }) => (
  <div className="scale-container">
    <div className="scale-buttons">
      {[...Array(max)].map((_, index) => (
        <button
          key={index}
          className={`scale-button ${value === index + 1 ? 'selected' : ''}`}
          onClick={() => onChange(question.id, index + 1)}
        >
          {index + 1}
        </button>
      ))}
    </div>
    {question.scaleLabels && (
      <div className="scale-labels">
        <span className="scale-label">{question.scaleLabels[0]}</span>
        <span className="scale-label">{question.scaleLabels[1]}</span>
      </div>
    )}
  </div>
)

// NPS Question Component (1-10)
const NPSQuestion = ({ question, value, onChange }) => (
  <div className="nps-container">
    <div className="nps-buttons">
      {[...Array(10)].map((_, index) => (
        <button
          key={index}
          className={`nps-button ${value === index + 1 ? 'selected' : ''}`}
          onClick={() => onChange(question.id, index + 1)}
        >
          {index + 1}
        </button>
      ))}
    </div>
    {question.scaleLabels && (
      <div className="nps-labels scale-labels">
        <span className="scale-label">{question.scaleLabels[0]}</span>
        <span className="scale-label">{question.scaleLabels[1]}</span>
      </div>
    )}
  </div>
)

// Likert Question Component
const LikertQuestion = ({ question, value, onChange }) => {
  const numDots = 7; // Standard likert scale
  return (
    <div className="likert-container">
      <div className="likert-track">
        {[...Array(numDots)].map((_, index) => (
          <button
            key={index}
            className={`likert-dot ${value === index + 1 ? 'selected' : ''}`}
            onClick={() => onChange(question.id, index + 1)}
            aria-label={`Option ${index + 1}`}
          />
        ))}
      </div>
      <div className="likert-labels">
        <span className="likert-label">{question.scaleLabels?.[0] || 'Strongly Disagree'}</span>
        <span className="likert-label">{question.scaleLabels?.[1] || 'Strongly Agree'}</span>
      </div>
    </div>
  );
}

// Emoji Question Component
const EmojiQuestion = ({ question, value, onChange }) => (
  <div className="emoji-container">
    {question.emojis.map((emoji, index) => (
      <button
        key={index}
        className={`emoji-button ${value === index ? 'selected' : ''}`}
        onClick={() => onChange(question.id, index)}
      >
        {emoji}
      </button>
    ))}
  </div>
)

// Text Question Component
const TextQuestion = ({ question, value, onChange }) => (
  <div className="text-input-container">
    <input
      type="text"
      className="text-input"
      placeholder={question.placeholder}
      value={value}
      onChange={(e) => onChange(question.id, e.target.value)}
    />
  </div>
)

// Textarea Question Component
const TextareaQuestion = ({ question, value, onChange }) => {
  const charCount = value.length
  const maxLength = question.maxLength || 500

  return (
    <div className="textarea-container">
      <textarea
        className="textarea"
        placeholder={question.placeholder}
        value={value}
        onChange={(e) => onChange(question.id, e.target.value)}
        maxLength={maxLength}
      />
      {question.maxLength && (
        <div className="input-helper">
          <span className="helper-text">Maximum {maxLength} characters</span>
          <span className={`char-count ${charCount > maxLength * 0.9 ? 'warning' : ''}`}>
            {charCount}/{maxLength}
          </span>
        </div>
      )}
    </div>
  )
}

export default Survey

