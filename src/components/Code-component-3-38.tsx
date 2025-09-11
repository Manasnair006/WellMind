import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../App';
import { Button } from './ui/button';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { ArrowLeft, TrendingUp, TrendingDown, Calendar, Brain, Heart } from 'lucide-react';

export function ProgressTracker() {
  const context = useContext(AppContext);
  if (!context) throw new Error('ProgressTracker must be used within AppContext');

  const { assessmentResults } = context;
  const navigate = useNavigate();

  // Process data for charts
  const anxietyData = assessmentResults
    .filter(r => r.type === 'anxiety')
    .map(r => ({
      date: new Date(r.date).toLocaleDateString(),
      score: r.score,
      level: r.level
    }));

  const depressionData = assessmentResults
    .filter(r => r.type === 'depression')
    .map(r => ({
      date: new Date(r.date).toLocaleDateString(),
      score: r.score,
      level: r.level
    }));

  const getLatestScore = (type: 'anxiety' | 'depression') => {
    const typeResults = assessmentResults.filter(r => r.type === type);
    return typeResults.length > 0 ? typeResults[typeResults.length - 1] : null;
  };

  const getPreviousScore = (type: 'anxiety' | 'depression') => {
    const typeResults = assessmentResults.filter(r => r.type === type);
    return typeResults.length > 1 ? typeResults[typeResults.length - 2] : null;
  };

  const getTrend = (type: 'anxiety' | 'depression') => {
    const latest = getLatestScore(type);
    const previous = getPreviousScore(type);
    
    if (!latest || !previous) return null;
    
    const change = latest.score - previous.score;
    return {
      change,
      direction: change > 0 ? 'up' : change < 0 ? 'down' : 'same',
      percentage: previous.score === 0 ? 0 : Math.abs((change / previous.score) * 100)
    };
  };

  const anxietyTrend = getTrend('anxiety');
  const depressionTrend = getTrend('depression');

  const levelColors = {
    minimal: '#10b981',
    mild: '#f59e0b', 
    moderate: '#f97316',
    severe: '#ef4444'
  };

  if (assessmentResults.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="bg-white shadow-sm">
          <div className="max-w-4xl mx-auto px-4 py-4 flex items-center space-x-4">
            <Button variant="ghost" onClick={() => navigate('/home')}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1>Progress Tracker</h1>
              <p className="text-muted-foreground">Monitor your mental health journey</p>
            </div>
          </div>
        </div>

        <div className="max-w-2xl mx-auto p-4 pt-16 text-center">
          <Card>
            <CardContent className="p-12">
              <div className="p-4 bg-muted rounded-full w-fit mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-muted-foreground" />
              </div>
              <h2>No Assessment Data Yet</h2>
              <p className="text-muted-foreground mt-2 mb-6">
                Complete your first assessment to start tracking your progress over time.
              </p>
              <Button onClick={() => navigate('/assessment-select')}>
                Take Your First Assessment
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center space-x-4">
          <Button variant="ghost" onClick={() => navigate('/home')}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1>Progress Tracker</h1>
            <p className="text-muted-foreground">Monitor your mental health journey</p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-4 pt-8 space-y-6">
        {/* Summary Cards */}
        <div className="grid md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm">Total Assessments</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{assessmentResults.length}</div>
              <p className="text-xs text-muted-foreground">
                Since {new Date(assessmentResults[0]?.date).toLocaleDateString()}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm">Latest Anxiety</CardTitle>
              <div className="flex items-center space-x-1">
                <Brain className="h-4 w-4 text-blue-600" />
                {anxietyTrend && (
                  anxietyTrend.direction === 'down' ? 
                    <TrendingDown className="h-3 w-3 text-green-600" /> :
                    anxietyTrend.direction === 'up' ?
                      <TrendingUp className="h-3 w-3 text-red-600" /> : null
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {getLatestScore('anxiety')?.score ?? 'No data'}/21
              </div>
              <p className="text-xs text-muted-foreground">
                {anxietyTrend && `${anxietyTrend.change > 0 ? '+' : ''}${anxietyTrend.change} from last assessment`}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm">Latest Depression</CardTitle>
              <div className="flex items-center space-x-1">
                <Heart className="h-4 w-4 text-red-500" />
                {depressionTrend && (
                  depressionTrend.direction === 'down' ? 
                    <TrendingDown className="h-3 w-3 text-green-600" /> :
                    depressionTrend.direction === 'up' ?
                      <TrendingUp className="h-3 w-3 text-red-600" /> : null
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {getLatestScore('depression')?.score ?? 'No data'}/27
              </div>
              <p className="text-xs text-muted-foreground">
                {depressionTrend && `${depressionTrend.change > 0 ? '+' : ''}${depressionTrend.change} from last assessment`}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <Card>
          <CardHeader>
            <CardTitle>Progress Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="line" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="line">Line Chart</TabsTrigger>
                <TabsTrigger value="bar">Bar Chart</TabsTrigger>
              </TabsList>

              <TabsContent value="line" className="space-y-6">
                {anxietyData.length > 0 && (
                  <div>
                    <h3 className="font-medium mb-4 flex items-center space-x-2">
                      <Brain className="h-4 w-4 text-blue-600" />
                      <span>Anxiety Scores</span>
                    </h3>
                    <ResponsiveContainer width="100%" height={200}>
                      <LineChart data={anxietyData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis domain={[0, 21]} />
                        <Tooltip />
                        <Line type="monotone" dataKey="score" stroke="#2563eb" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                )}

                {depressionData.length > 0 && (
                  <div>
                    <h3 className="font-medium mb-4 flex items-center space-x-2">
                      <Heart className="h-4 w-4 text-red-500" />
                      <span>Depression Scores</span>
                    </h3>
                    <ResponsiveContainer width="100%" height={200}>
                      <LineChart data={depressionData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis domain={[0, 27]} />
                        <Tooltip />
                        <Line type="monotone" dataKey="score" stroke="#ef4444" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="bar" className="space-y-6">
                {anxietyData.length > 0 && (
                  <div>
                    <h3 className="font-medium mb-4 flex items-center space-x-2">
                      <Brain className="h-4 w-4 text-blue-600" />
                      <span>Anxiety Scores</span>
                    </h3>
                    <ResponsiveContainer width="100%" height={200}>
                      <BarChart data={anxietyData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis domain={[0, 21]} />
                        <Tooltip />
                        <Bar dataKey="score" fill="#2563eb" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                )}

                {depressionData.length > 0 && (
                  <div>
                    <h3 className="font-medium mb-4 flex items-center space-x-2">
                      <Heart className="h-4 w-4 text-red-500" />
                      <span>Depression Scores</span>
                    </h3>
                    <ResponsiveContainer width="100%" height={200}>
                      <BarChart data={depressionData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis domain={[0, 27]} />
                        <Tooltip />
                        <Bar dataKey="score" fill="#ef4444" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Assessment History */}
        <Card>
          <CardHeader>
            <CardTitle>Assessment History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {assessmentResults.slice().reverse().map((result) => (
                <div key={result.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    {result.type === 'anxiety' ? (
                      <Brain className="h-5 w-5 text-blue-600" />
                    ) : (
                      <Heart className="h-5 w-5 text-red-500" />
                    )}
                    <div>
                      <p className="font-medium capitalize">{result.type} Assessment</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(result.date).toLocaleDateString()} at {new Date(result.date).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="font-medium">
                        {result.score}/{result.type === 'anxiety' ? '21' : '27'}
                      </p>
                      <p 
                        className="text-sm capitalize"
                        style={{ color: levelColors[result.level] }}
                      >
                        {result.level}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-center space-x-4">
          <Button onClick={() => navigate('/assessment-select')}>
            Take New Assessment
          </Button>
          <Button variant="outline" onClick={() => navigate('/home')}>
            Return to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
}