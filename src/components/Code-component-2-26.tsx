import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../App';
import { Button } from './ui/button';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Progress } from './ui/progress';
import { Brain, Heart, TrendingUp, BookOpen, ArrowRight } from 'lucide-react';

const getLevelColor = (level: string) => {
  switch (level) {
    case 'minimal': return 'text-green-600';
    case 'mild': return 'text-yellow-600';
    case 'moderate': return 'text-orange-600';
    case 'severe': return 'text-red-600';
    default: return 'text-gray-600';
  }
};

const getLevelDescription = (level: string, type: 'anxiety' | 'depression') => {
  const descriptions = {
    anxiety: {
      minimal: "Your anxiety levels appear to be minimal. You're managing well overall.",
      mild: "You're experiencing mild anxiety. Some stress management techniques may be helpful.",
      moderate: "You're experiencing moderate anxiety. Consider speaking with a healthcare professional.",
      severe: "You're experiencing severe anxiety. We strongly recommend seeking professional help."
    },
    depression: {
      minimal: "Your depression levels appear to be minimal. You're doing well overall.",
      mild: "You're experiencing mild depression. Self-care and monitoring may be helpful.",
      moderate: "You're experiencing moderate depression. Consider speaking with a healthcare professional.",
      severe: "You're experiencing severe depression. We strongly recommend seeking professional help."
    }
  };
  
  return descriptions[type][level as keyof typeof descriptions.anxiety] || '';
};

export function Results() {
  const context = useContext(AppContext);
  if (!context) throw new Error('Results must be used within AppContext');

  const { currentAssessment } = context;
  const navigate = useNavigate();

  if (!currentAssessment) {
    navigate('/home');
    return null;
  }

  const maxScore = currentAssessment.type === 'anxiety' ? 21 : 27;
  const scorePercentage = (currentAssessment.score / maxScore) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <h1>Assessment Results</h1>
          <p className="text-muted-foreground">Your {currentAssessment.type} assessment results</p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto p-4 pt-8 space-y-6">
        {/* Score Card */}
        <Card>
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              {currentAssessment.type === 'anxiety' ? (
                <div className="p-4 bg-blue-100 rounded-full">
                  <Brain className="h-8 w-8 text-blue-600" />
                </div>
              ) : (
                <div className="p-4 bg-red-100 rounded-full">
                  <Heart className="h-8 w-8 text-red-500" />
                </div>
              )}
            </div>
            <CardTitle className="capitalize">{currentAssessment.type} Assessment</CardTitle>
            <p className="text-muted-foreground">
              Completed on {new Date(currentAssessment.date).toLocaleDateString()}
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">
                {currentAssessment.score}/{maxScore}
              </div>
              <div className={`text-lg font-medium capitalize ${getLevelColor(currentAssessment.level)}`}>
                {currentAssessment.level} Level
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Score Range</span>
                <span>{scorePercentage.toFixed(0)}%</span>
              </div>
              <Progress value={scorePercentage} className="h-3" />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Minimal</span>
                <span>Severe</span>
              </div>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <p>{getLevelDescription(currentAssessment.level, currentAssessment.type)}</p>
            </div>
          </CardContent>
        </Card>

        {/* Score Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Understanding Your Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Minimal:</span>
                  <span className="text-green-600">0-4</span>
                </div>
                <div className="flex justify-between">
                  <span>Mild:</span>
                  <span className="text-yellow-600">5-9</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Moderate:</span>
                  <span className="text-orange-600">10-14</span>
                </div>
                <div className="flex justify-between">
                  <span>Severe:</span>
                  <span className="text-red-600">15+</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Next Steps */}
        <Card>
          <CardHeader>
            <CardTitle>Recommended Next Steps</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              onClick={() => navigate('/guidance')} 
              className="w-full justify-start h-auto p-4"
              variant="outline"
            >
              <div className="flex items-center space-x-3">
                <BookOpen className="h-5 w-5" />
                <div className="text-left">
                  <div className="font-medium">View Personalized Guidance</div>
                  <div className="text-sm text-muted-foreground">
                    Get coping strategies and exercises tailored to your results
                  </div>
                </div>
              </div>
              <ArrowRight className="h-4 w-4 ml-auto" />
            </Button>

            <Button 
              onClick={() => navigate('/resources')} 
              className="w-full justify-start h-auto p-4"
              variant="outline"
            >
              <div className="flex items-center space-x-3">
                <div className="p-1 bg-orange-100 rounded">
                  <div className="h-3 w-3 bg-orange-600 rounded-full" />
                </div>
                <div className="text-left">
                  <div className="font-medium">Find Professional Resources</div>
                  <div className="text-sm text-muted-foreground">
                    Connect with therapists, hotlines, and support groups
                  </div>
                </div>
              </div>
              <ArrowRight className="h-4 w-4 ml-auto" />
            </Button>

            <Button 
              onClick={() => navigate('/progress')} 
              className="w-full justify-start h-auto p-4"
              variant="outline"
            >
              <div className="flex items-center space-x-3">
                <TrendingUp className="h-5 w-5" />
                <div className="text-left">
                  <div className="font-medium">Track Your Progress</div>
                  <div className="text-sm text-muted-foreground">
                    Monitor your mental health journey over time
                  </div>
                </div>
              </div>
              <ArrowRight className="h-4 w-4 ml-auto" />
            </Button>
          </CardContent>
        </Card>

        {/* Important Notice */}
        {(currentAssessment.level === 'moderate' || currentAssessment.level === 'severe') && (
          <Card className="border-orange-200 bg-orange-50">
            <CardContent className="p-4">
              <h3 className="font-medium text-orange-800 mb-2">Important Notice</h3>
              <p className="text-sm text-orange-700">
                Your assessment indicates {currentAssessment.level} levels of {currentAssessment.type}. 
                We recommend speaking with a healthcare professional who can provide personalized 
                guidance and support. If you're having thoughts of self-harm, please seek immediate help.
              </p>
            </CardContent>
          </Card>
        )}

        <div className="flex justify-center pt-4">
          <Button onClick={() => navigate('/home')}>
            Return to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
}