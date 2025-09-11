import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Brain, Heart, ArrowLeft } from 'lucide-react';

export function AssessmentSelect() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center space-x-4">
          <Button variant="ghost" onClick={() => navigate('/home')}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1>Choose Assessment Type</h1>
            <p className="text-muted-foreground">Select the area you'd like to evaluate</p>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto p-4 pt-8">
        <div className="grid gap-6">
          <Card className="cursor-pointer hover:shadow-lg transition-all duration-200 border-2 hover:border-blue-300" 
                onClick={() => navigate('/assessment/anxiety')}>
            <CardContent className="p-8">
              <div className="flex items-center space-x-6">
                <div className="p-4 bg-blue-100 rounded-full">
                  <Brain className="h-8 w-8 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h2>Anxiety Assessment</h2>
                  <p className="text-muted-foreground mt-2">
                    Evaluate your anxiety levels using the GAD-7 scale. This assessment helps identify 
                    symptoms of generalized anxiety disorder and their severity.
                  </p>
                  <div className="mt-4 flex items-center text-sm text-muted-foreground">
                    <span>• 7 questions</span>
                    <span className="mx-2">•</span>
                    <span>2-3 minutes</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-all duration-200 border-2 hover:border-red-300" 
                onClick={() => navigate('/assessment/depression')}>
            <CardContent className="p-8">
              <div className="flex items-center space-x-6">
                <div className="p-4 bg-red-100 rounded-full">
                  <Heart className="h-8 w-8 text-red-500" />
                </div>
                <div className="flex-1">
                  <h2>Depression Assessment</h2>
                  <p className="text-muted-foreground mt-2">
                    Evaluate your depression levels using the PHQ-9 scale. This assessment helps identify 
                    symptoms of depression and their impact on your daily life.
                  </p>
                  <div className="mt-4 flex items-center text-sm text-muted-foreground">
                    <span>• 9 questions</span>
                    <span className="mx-2">•</span>
                    <span>3-4 minutes</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 p-6 bg-white rounded-lg border">
          <h3>Before You Begin</h3>
          <ul className="mt-3 space-y-2 text-muted-foreground">
            <li>• Answer honestly based on how you've felt over the past two weeks</li>
            <li>• This is not a diagnostic tool - consult a healthcare professional for diagnosis</li>
            <li>• Your responses are private and stored locally on your device</li>
            <li>• Take your time and consider each question carefully</li>
          </ul>
        </div>
      </div>
    </div>
  );
}