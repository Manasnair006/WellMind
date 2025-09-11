import React, { useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppContext } from '../App';
import { Button } from './ui/button';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Progress } from './ui/progress';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const anxietyQuestions = [
  "Feeling nervous, anxious, or on edge",
  "Not being able to stop or control worrying",
  "Worrying too much about different things",
  "Trouble relaxing",
  "Being so restless that it's hard to sit still",
  "Becoming easily annoyed or irritable",
  "Feeling afraid as if something awful might happen"
];

const depressionQuestions = [
  "Little interest or pleasure in doing things",
  "Feeling down, depressed, or hopeless",
  "Trouble falling or staying asleep, or sleeping too much",
  "Feeling tired or having little energy",
  "Poor appetite or overeating",
  "Feeling bad about yourself or that you are a failure or have let yourself or your family down",
  "Trouble concentrating on things, such as reading the newspaper or watching television",
  "Moving or speaking so slowly that other people could have noticed, or the opposite - being so fidgety or restless that you have been moving around a lot more than usual",
  "Thoughts that you would be better off dead, or of hurting yourself"
];

const responseOptions = [
  { value: 0, label: "Not at all" },
  { value: 1, label: "Several days" },
  { value: 2, label: "More than half the days" },
  { value: 3, label: "Nearly every day" }
];

export function Assessment() {
  const { type } = useParams<{ type: 'anxiety' | 'depression' }>();
  const navigate = useNavigate();
  const context = useContext(AppContext);
  
  if (!context) throw new Error('Assessment must be used within AppContext');
  if (!type || (type !== 'anxiety' && type !== 'depression')) {
    navigate('/assessment-select');
    return null;
  }

  const { addAssessmentResult, setCurrentAssessment } = context;
  
  const questions = type === 'anxiety' ? anxietyQuestions : depressionQuestions;
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>(new Array(questions.length).fill(-1));
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAnswerChange = (value: string) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = parseInt(value);
    setAnswers(newAnswers);
  };

  const goToNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const goToPrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateScore = () => {
    return answers.reduce((sum, answer) => sum + (answer === -1 ? 0 : answer), 0);
  };

  const getScoreLevel = (score: number, assessmentType: 'anxiety' | 'depression') => {
    if (assessmentType === 'anxiety') {
      if (score <= 4) return 'minimal';
      if (score <= 9) return 'mild';
      if (score <= 14) return 'moderate';
      return 'severe';
    } else {
      if (score <= 4) return 'minimal';
      if (score <= 9) return 'mild';
      if (score <= 14) return 'moderate';
      return 'severe';
    }
  };

  const handleSubmit = async () => {
    if (answers.some(answer => answer === -1)) {
      alert('Please answer all questions before submitting.');
      return;
    }

    setIsSubmitting(true);

    const score = calculateScore();
    const level = getScoreLevel(score, type);
    
    const result = {
      id: Date.now().toString(),
      type,
      score,
      level: level as 'minimal' | 'mild' | 'moderate' | 'severe',
      date: new Date().toISOString(),
      answers
    };

    // Simulate API call
    setTimeout(() => {
      addAssessmentResult(result);
      setCurrentAssessment(result);
      setIsSubmitting(false);
      navigate('/results');
    }, 1000);
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const canGoNext = answers[currentQuestion] !== -1;
  const isLastQuestion = currentQuestion === questions.length - 1;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center space-x-4">
          <Button variant="ghost" onClick={() => navigate('/assessment-select')}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex-1">
            <h1 className="capitalize">{type} Assessment</h1>
            <p className="text-muted-foreground">Question {currentQuestion + 1} of {questions.length}</p>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto p-4 pt-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <Progress value={progress} className="h-2" />
          <p className="text-sm text-muted-foreground mt-2 text-center">
            {Math.round(progress)}% Complete
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>
              Over the last 2 weeks, how often have you been bothered by:
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <p className="text-lg mb-6">{questions[currentQuestion]}</p>
              
              <RadioGroup 
                value={answers[currentQuestion] === -1 ? "" : answers[currentQuestion].toString()}
                onValueChange={handleAnswerChange}
                className="space-y-4"
              >
                {responseOptions.map((option) => (
                  <div key={option.value} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted transition-colors">
                    <RadioGroupItem value={option.value.toString()} id={`option-${option.value}`} />
                    <label htmlFor={`option-${option.value}`} className="flex-1 cursor-pointer">
                      {option.label}
                    </label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            {/* Navigation */}
            <div className="flex justify-between pt-6">
              <Button 
                variant="outline" 
                onClick={goToPrevious}
                disabled={currentQuestion === 0}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Previous
              </Button>

              {isLastQuestion ? (
                <Button 
                  onClick={handleSubmit}
                  disabled={!canGoNext || isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Assessment'}
                </Button>
              ) : (
                <Button 
                  onClick={goToNext}
                  disabled={!canGoNext}
                >
                  Next
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Disclaimer */}
        <div className="mt-6 p-4 bg-white rounded-lg border">
          <p className="text-sm text-muted-foreground">
            <strong>Disclaimer:</strong> This assessment is for educational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment. If you're experiencing severe symptoms or thoughts of self-harm, please seek immediate professional help.
          </p>
        </div>
      </div>
    </div>
  );
}