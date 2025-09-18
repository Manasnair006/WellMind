import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../App';
import { Button } from './ui/button';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Brain, Heart, TrendingUp, BookOpen, Phone, LogOut } from 'lucide-react';
import Logo from "./Logo"; 

export function Home() {
  const context = useContext(AppContext);
  if (!context) throw new Error('Home must be used within AppContext');

  const { user, setUser, assessmentResults } = context;
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('mentalHealthApp_user');
    localStorage.removeItem('mentalHealthApp_results');
  };

  const getLatestScore = (type: 'anxiety' | 'depression') => {
    const typeResults = assessmentResults.filter(r => r.type === type);
    return typeResults.length > 0 ? typeResults[typeResults.length - 1] : null;
  };

  const anxietyScore = getLatestScore('anxiety');
  const depressionScore = getLatestScore('depression');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            {/* Logo */}
            <Logo size="h-10 w-10" />
            <div>
              <h1>WellMind</h1>
              <p className="text-muted-foreground">Welcome back, {user?.name}</p>
            </div>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4 space-y-6">
        {/* Quick Stats */}
        <div className="grid md:grid-cols-2 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm">Latest Anxiety Score</CardTitle>
              <Brain className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {anxietyScore ? `${anxietyScore.score}/21` : 'No data'}
              </div>
              <p className="text-xs text-muted-foreground">
                {anxietyScore ? `${anxietyScore.level} level` : 'Take your first assessment'}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm">Latest Depression Score</CardTitle>
              <Heart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {depressionScore ? `${depressionScore.score}/27` : 'No data'}
              </div>
              <p className="text-xs text-muted-foreground">
                {depressionScore ? `${depressionScore.level} level` : 'Take your first assessment'}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Actions */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => navigate('/assessment-select')}>
            <CardContent className="flex flex-col items-center justify-center p-6 text-center">
              <div className="p-3 bg-blue-100 rounded-full mb-3">
                <Brain className="h-6 w-6 text-blue-600" />
              </div>
              <h3>New Assessment</h3>
              <p className="text-muted-foreground text-sm">Take a mental health check</p>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => navigate('/progress')}>
            <CardContent className="flex flex-col items-center justify-center p-6 text-center">
              <div className="p-3 bg-green-100 rounded-full mb-3">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
              <h3>Progress Tracker</h3>
              <p className="text-muted-foreground text-sm">View your journey</p>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => navigate('/guidance')}>
            <CardContent className="flex flex-col items-center justify-center p-6 text-center">
              <div className="p-3 bg-purple-100 rounded-full mb-3">
                <BookOpen className="h-6 w-6 text-purple-600" />
              </div>
              <h3>Guidance</h3>
              <p className="text-muted-foreground text-sm">Coping strategies</p>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => navigate('/resources')}>
            <CardContent className="flex flex-col items-center justify-center p-6 text-center">
              <div className="p-3 bg-orange-100 rounded-full mb-3">
                <Phone className="h-6 w-6 text-orange-600" />
              </div>
              <h3>Resources</h3>
              <p className="text-muted-foreground text-sm">Get professional help</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        {assessmentResults.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Recent Assessments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {assessmentResults.slice(-3).reverse().map((result) => (
                  <div key={result.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex items-center space-x-3">
                      {result.type === 'anxiety' ? (
                        <Brain className="h-4 w-4 text-blue-600" />
                      ) : (
                        <Heart className="h-4 w-4 text-red-500" />
                      )}
                      <div>
                        <p className="font-medium capitalize">{result.type} Assessment</p>
                        <p className="text-sm text-muted-foreground">{new Date(result.date).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{result.score}/{result.type === 'anxiety' ? '21' : '27'}</p>
                      <p className="text-sm text-muted-foreground capitalize">{result.level}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
