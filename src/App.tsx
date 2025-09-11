import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Login } from './components/Login';
import { Home } from './components/Home';
import { AssessmentSelect } from './components/AssessmentSelect';
import { Assessment } from './components/Assessment';
import { Results } from './components/Results';
import { Guidance } from './components/Guidance';
import { Resources } from './components/Resources';
import { ProgressTracker } from './components/ProgressTracker';

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface AssessmentResult {
  id: string;
  type: 'anxiety' | 'depression';
  score: number;
  level: 'minimal' | 'mild' | 'moderate' | 'severe';
  date: string;
  answers: number[];
}

export interface AppContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  assessmentResults: AssessmentResult[];
  addAssessmentResult: (result: AssessmentResult) => void;
  currentAssessment: AssessmentResult | null;
  setCurrentAssessment: (result: AssessmentResult | null) => void;
}

export const AppContext = React.createContext<AppContextType | undefined>(undefined);

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [assessmentResults, setAssessmentResults] = useState<AssessmentResult[]>([]);
  const [currentAssessment, setCurrentAssessment] = useState<AssessmentResult | null>(null);

  useEffect(() => {
    // Load user data from localStorage
    const savedUser = localStorage.getItem('mentalHealthApp_user');
    const savedResults = localStorage.getItem('mentalHealthApp_results');
    
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    if (savedResults) {
      setAssessmentResults(JSON.parse(savedResults));
    }
  }, []);

  const addAssessmentResult = (result: AssessmentResult) => {
    const updatedResults = [...assessmentResults, result];
    setAssessmentResults(updatedResults);
    localStorage.setItem('mentalHealthApp_results', JSON.stringify(updatedResults));
  };

  const contextValue: AppContextType = {
    user,
    setUser: (newUser) => {
      setUser(newUser);
      if (newUser) {
        localStorage.setItem('mentalHealthApp_user', JSON.stringify(newUser));
      } else {
        localStorage.removeItem('mentalHealthApp_user');
      }
    },
    assessmentResults,
    addAssessmentResult,
    currentAssessment,
    setCurrentAssessment,
  };

  // Handle preview_page.html redirect
  useEffect(() => {
    if (window.location.pathname === '/preview_page.html') {
      window.location.replace(user ? '/home' : '/login');
    }
  }, [user]);

  return (
    <AppContext.Provider value={contextValue}>
      <Router>
        <div className="min-h-screen bg-background">
          <Routes>
            <Route path="/login" element={!user ? <Login /> : <Navigate to="/home" replace />} />
            <Route path="/home" element={user ? <Home /> : <Navigate to="/login" replace />} />
            <Route path="/assessment-select" element={user ? <AssessmentSelect /> : <Navigate to="/login" replace />} />
            <Route path="/assessment/:type" element={user ? <Assessment /> : <Navigate to="/login" replace />} />
            <Route path="/results" element={user ? <Results /> : <Navigate to="/login" replace />} />
            <Route path="/guidance" element={user ? <Guidance /> : <Navigate to="/login" replace />} />
            <Route path="/resources" element={user ? <Resources /> : <Navigate to="/login" replace />} />
            <Route path="/progress" element={user ? <ProgressTracker /> : <Navigate to="/login" replace />} />
            <Route path="/" element={<Navigate to={user ? "/home" : "/login"} replace />} />
            <Route path="*" element={<Navigate to={user ? "/home" : "/login"} replace />} />
          </Routes>
        </div>
      </Router>
    </AppContext.Provider>
  );
}