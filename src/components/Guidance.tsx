import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../App';
import { Button } from './ui/button';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ArrowLeft, Heart, Brain, Lightbulb, Activity, Clock } from 'lucide-react';

const anxietyStrategies = [
  {
    title: "Deep Breathing Exercise",
    icon: Activity,
    description: "Practice the 4-7-8 breathing technique to calm your nervous system.",
    steps: [
      "Inhale through your nose for 4 counts",
      "Hold your breath for 7 counts", 
      "Exhale through your mouth for 8 counts",
      "Repeat 3-4 times"
    ]
  },
  {
    title: "Progressive Muscle Relaxation",
    icon: Clock,
    description: "Systematically tense and relax muscle groups to reduce physical tension.",
    steps: [
      "Start with your toes, tense for 5 seconds then relax",
      "Move up through calves, thighs, abdomen, arms",
      "Finish with face and scalp muscles",
      "Notice the contrast between tension and relaxation"
    ]
  },
  {
    title: "Grounding Technique (5-4-3-2-1)",
    icon: Lightbulb,
    description: "Use your senses to anchor yourself in the present moment.",
    steps: [
      "5 things you can see",
      "4 things you can touch",
      "3 things you can hear",
      "2 things you can smell",
      "1 thing you can taste"
    ]
  }
];

const depressionStrategies = [
  {
    title: "Behavioral Activation",
    icon: Activity,
    description: "Engage in meaningful activities even when you don't feel motivated.",
    steps: [
      "Make a list of activities you used to enjoy",
      "Start with small, achievable tasks",
      "Schedule one pleasant activity daily",
      "Track your mood before and after activities"
    ]
  },
  {
    title: "Thought Challenging",
    icon: Brain,
    description: "Question negative thought patterns and develop balanced thinking.",
    steps: [
      "Notice when you have negative thoughts",
      "Ask: 'Is this thought helpful or accurate?'",
      "Look for evidence for and against the thought",
      "Develop a more balanced perspective"
    ]
  },
  {
    title: "Self-Care Routine",
    icon: Heart,
    description: "Establish daily habits that support your mental health.",
    steps: [
      "Maintain regular sleep schedule",
      "Eat nutritious meals at regular times",
      "Include physical activity, even just walking",
      "Practice mindfulness or meditation"
    ]
  }
];

const generalStrategies = [
  {
    title: "Mindfulness Meditation",
    icon: Clock,
    description: "Develop awareness of the present moment without judgment.",
    steps: [
      "Find a quiet space and comfortable position",
      "Focus on your breath or a chosen anchor",
      "When thoughts arise, gently return to your anchor",
      "Start with 5-10 minutes daily"
    ]
  },
  {
    title: "Social Support",
    icon: Heart,
    description: "Connect with others for emotional support and understanding.",
    steps: [
      "Identify trusted friends or family members",
      "Share your feelings without expecting solutions",
      "Join support groups or online communities",
      "Practice active listening when others share"
    ]
  },
  {
    title: "Healthy Lifestyle",
    icon: Activity,
    description: "Make physical health choices that support mental wellbeing.",
    steps: [
      "Get 7-9 hours of sleep each night",
      "Exercise regularly, even light activity helps",
      "Limit alcohol and caffeine",
      "Spend time in nature when possible"
    ]
  }
];

export function Guidance() {
  const context = useContext(AppContext);
  if (!context) throw new Error('Guidance must be used within AppContext');

  const { currentAssessment } = context;
  const navigate = useNavigate();

  const getPersonalizedStrategies = () => {
    if (!currentAssessment) return generalStrategies;
    return currentAssessment.type === 'anxiety' ? anxietyStrategies : depressionStrategies;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center space-x-4">
          <Button variant="ghost" onClick={() => navigate('/home')}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1>Coping Strategies & Guidance</h1>
            <p className="text-muted-foreground">
              {currentAssessment 
                ? `Personalized strategies for ${currentAssessment.type}`
                : 'General mental health strategies'
              }
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4 pt-8">
        <Tabs defaultValue="personalized" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="personalized">
              {currentAssessment ? 'Personalized' : 'General'}
            </TabsTrigger>
            <TabsTrigger value="anxiety">Anxiety</TabsTrigger>
            <TabsTrigger value="depression">Depression</TabsTrigger>
          </TabsList>

          <TabsContent value="personalized" className="space-y-6">
            <div className="grid gap-6">
              {getPersonalizedStrategies().map((strategy, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-3">
                      <div className="p-2 bg-primary/10 rounded-full">
                        <strategy.icon className="h-5 w-5 text-primary" />
                      </div>
                      <span>{strategy.title}</span>
                    </CardTitle>
                    <p className="text-muted-foreground">{strategy.description}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {strategy.steps.map((step, stepIndex) => (
                        <div key={stepIndex} className="flex items-start space-x-3">
                          <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium mt-0.5">
                            {stepIndex + 1}
                          </div>
                          <p className="flex-1">{step}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="anxiety" className="space-y-6">
            <div className="grid gap-6">
              {anxietyStrategies.map((strategy, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-3">
                      <div className="p-2 bg-blue-100 rounded-full">
                        <strategy.icon className="h-5 w-5 text-blue-600" />
                      </div>
                      <span>{strategy.title}</span>
                    </CardTitle>
                    <p className="text-muted-foreground">{strategy.description}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {strategy.steps.map((step, stepIndex) => (
                        <div key={stepIndex} className="flex items-start space-x-3">
                          <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium mt-0.5">
                            {stepIndex + 1}
                          </div>
                          <p className="flex-1">{step}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="depression" className="space-y-6">
            <div className="grid gap-6">
              {depressionStrategies.map((strategy, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-3">
                      <div className="p-2 bg-red-100 rounded-full">
                        <strategy.icon className="h-5 w-5 text-red-500" />
                      </div>
                      <span>{strategy.title}</span>
                    </CardTitle>
                    <p className="text-muted-foreground">{strategy.description}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {strategy.steps.map((step, stepIndex) => (
                        <div key={stepIndex} className="flex items-start space-x-3">
                          <div className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-medium mt-0.5">
                            {stepIndex + 1}
                          </div>
                          <p className="flex-1">{step}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* General Tips */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Remember</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p>• These strategies take practice - be patient with yourself</p>
            <p>• Start small and gradually build these habits into your routine</p>
            <p>• Different strategies work for different people - try various approaches</p>
            <p>• If symptoms persist or worsen, please consult a mental health professional</p>
          </CardContent>
        </Card>

        <div className="flex justify-center mt-8">
          <Button onClick={() => navigate('/resources')}>
            Find Professional Resources
          </Button>
        </div>
      </div>
    </div>
  );
}