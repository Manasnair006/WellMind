import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { ArrowLeft, Phone, MessageCircle, Users, MapPin, ExternalLink, AlertTriangle } from 'lucide-react';

const crisisResources = [
  {
    name: "National Suicide Prevention Lifeline",
    number: "988",
    description: "24/7 free and confidential support for people in distress",
    type: "Crisis"
  },
  {
    name: "Crisis Text Line",
    number: "Text HOME to 741741",
    description: "24/7 crisis support via text message",
    type: "Crisis"
  },
  {
    name: "National Domestic Violence Hotline", 
    number: "1-800-799-7233",
    description: "24/7 confidential support for domestic violence survivors",
    type: "Crisis"
  }
];

const professionalResources = [
  {
    name: "Psychology Today",
    description: "Find therapists, psychiatrists, and support groups in your area",
    website: "psychologytoday.com",
    type: "Directory"
  },
  {
    name: "BetterHelp",
    description: "Online therapy platform with licensed professionals",
    website: "betterhelp.com",
    type: "Online Therapy"
  },
  {
    name: "NAMI (National Alliance on Mental Illness)",
    description: "Education, support groups, and advocacy for mental health",
    website: "nami.org",
    type: "Support Organization"
  },
  {
    name: "Anxiety and Depression Association",
    description: "Resources and treatment information for anxiety and depression",
    website: "adaa.org",
    type: "Support Organization"
  }
];

const supportGroups = [
  {
    name: "Depression and Bipolar Support Alliance",
    description: "Peer support groups for depression and bipolar disorder",
    website: "dbsalliance.org"
  },
  {
    name: "Anxiety and Depression Support Group of Los Angeles",
    description: "Local support groups for anxiety and depression",
    website: "adsgla.org"
  },
  {
    name: "Mental Health America Support Groups",
    description: "Find local mental health support groups",
    website: "mhanational.org"
  },
  {
    name: "7 Cups",
    description: "Free online peer support and counseling",
    website: "7cups.com"
  }
];

const apps = [
  {
    name: "Headspace",
    description: "Guided meditation and mindfulness exercises",
    type: "Meditation"
  },
  {
    name: "Calm",
    description: "Sleep stories, meditation, and relaxation tools",
    type: "Meditation"
  },
  {
    name: "Sanvello",
    description: "Mood tracking and anxiety management tools",
    type: "Mental Health"
  },
  {
    name: "PTSD Coach",
    description: "Tools for managing PTSD symptoms",
    type: "Mental Health"
  }
];

export function Resources() {
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
            <h1>Mental Health Resources</h1>
            <p className="text-muted-foreground">Professional help and support options</p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4 pt-8 space-y-8">
        {/* Crisis Resources */}
        <Card className="border-red-200 bg-red-50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-red-800">
              <AlertTriangle className="h-5 w-5" />
              <span>Crisis Resources - Available 24/7</span>
            </CardTitle>
            <p className="text-red-700">If you're in immediate danger or having thoughts of self-harm, please reach out now:</p>
          </CardHeader>
          <CardContent className="space-y-4">
            {crisisResources.map((resource, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-white rounded-lg border">
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-red-600" />
                  <div>
                    <h3 className="font-medium">{resource.name}</h3>
                    <p className="text-sm text-muted-foreground">{resource.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-red-600">{resource.number}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Professional Resources */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MapPin className="h-5 w-5" />
              <span>Find Professional Help</span>
            </CardTitle>
            <p className="text-muted-foreground">Connect with licensed mental health professionals</p>
          </CardHeader>
          <CardContent className="space-y-4">
            {professionalResources.map((resource, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted transition-colors">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 rounded-full">
                    <ExternalLink className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">{resource.name}</h3>
                    <p className="text-sm text-muted-foreground">{resource.description}</p>
                    <p className="text-sm text-blue-600">{resource.website}</p>
                  </div>
                </div>
                <div className="px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                  {resource.type}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Support Groups */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-5 w-5" />
              <span>Support Groups & Communities</span>
            </CardTitle>
            <p className="text-muted-foreground">Connect with others who understand your experiences</p>
          </CardHeader>
          <CardContent className="space-y-4">
            {supportGroups.map((group, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted transition-colors">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-green-100 rounded-full">
                    <Users className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">{group.name}</h3>
                    <p className="text-sm text-muted-foreground">{group.description}</p>
                    <p className="text-sm text-green-600">{group.website}</p>
                  </div>
                </div>
                <ExternalLink className="h-4 w-4 text-muted-foreground" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Mental Health Apps */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MessageCircle className="h-5 w-5" />
              <span>Mental Health Apps</span>
            </CardTitle>
            <p className="text-muted-foreground">Mobile apps to support your daily mental health</p>
          </CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-4">
            {apps.map((app, index) => (
              <div key={index} className="p-4 border rounded-lg hover:bg-muted transition-colors">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="p-2 bg-purple-100 rounded-full">
                    <MessageCircle className="h-4 w-4 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">{app.name}</h3>
                    <div className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
                      {app.type}
                    </div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{app.description}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Important Notes */}
        <Card>
          <CardHeader>
            <CardTitle>Important Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p>• Always consult with a healthcare professional for proper diagnosis and treatment</p>
            <p>• Insurance may cover mental health services - check with your provider</p>
            <p>• Many resources offer sliding scale fees or free services based on income</p>
            <p>• Don't hesitate to try different therapists until you find the right fit</p>
            <p>• Mental health treatment is a process - be patient with yourself</p>
          </CardContent>
        </Card>

        <div className="flex justify-center">
          <Button onClick={() => navigate('/home')}>
            Return to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
}