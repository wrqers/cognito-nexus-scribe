
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  Brain, 
  LibraryBig, 
  FileText, 
  BookOpen, 
  BookText, 
  FlaskConical,
  ArrowRight,
  Star,
  BarChart3,
  Clock
} from "lucide-react";
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();
  
  const featureCards = [
    {
      title: "Knowledge Graph",
      description: "Visualize connections between concepts",
      icon: Brain,
      route: "/graph",
      color: "from-white/20 to-transparent"
    },
    {
      title: "Study Materials",
      description: "Organize and access your learning resources",
      icon: LibraryBig,
      route: "/materials",
      color: "from-white/20 to-transparent"
    },
    {
      title: "Notes",
      description: "Capture and organize your thoughts",
      icon: FileText,
      route: "/notes",
      color: "from-white/20 to-transparent"
    },
    {
      title: "Reader",
      description: "Read and annotate your documents",
      icon: BookOpen,
      route: "/reader",
      color: "from-white/20 to-transparent"
    },
    {
      title: "Flashcards",
      description: "Reinforce your learning with spaced repetition",
      icon: BookText,
      route: "/flashcards",
      color: "from-white/20 to-transparent"
    },
    {
      title: "Experiments",
      description: "Test new learning approaches",
      icon: FlaskConical,
      route: "/experiments",
      color: "from-white/20 to-transparent"
    }
  ];

  return (
    <div className="flex flex-col gap-6">
      <section className="mb-4">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-2">
          <div className="opacity-0 animate-fade-in">
            <h1 className="text-3xl font-bold text-gradient mb-2">Welcome back</h1>
            <p className="text-neuropen-muted">Continue where you left off or explore your knowledge.</p>
          </div>
          
          <div className="flex gap-4 opacity-0 animate-fade-in-delay-2">
            <Button 
              variant="ghost" 
              className="gap-2 text-neuropen-muted hover:text-neuropen-text hover:bg-neuropen-surface-lighter"
            >
              <Clock className="h-4 w-4" /> 
              <span>Recent</span>
            </Button>
            <Button 
              variant="ghost" 
              className="gap-2 text-neuropen-muted hover:text-neuropen-text hover:bg-neuropen-surface-lighter"
            >
              <Star className="h-4 w-4" /> 
              <span>Favorites</span>
            </Button>
            <Button 
              variant="ghost" 
              className="gap-2 text-neuropen-muted hover:text-neuropen-text hover:bg-neuropen-surface-lighter"
            >
              <BarChart3 className="h-4 w-4" /> 
              <span>Statistics</span>
            </Button>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {featureCards.map((card, index) => (
          <Card 
            key={card.title}
            onClick={() => navigate(card.route)}
            className="bg-neuropen-surface border-neuropen-border bg-gradient-card hover:border-neuropen-highlight/50 transition-all duration-300 cursor-pointer card-glow opacity-0 group"
            style={{
              animationDelay: `${index * 0.1}s`,
              animationFillMode: "forwards",
              animation: "fade-in 0.3s ease-out forwards"
            }}
          >
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <div className={`p-2 rounded-lg bg-gradient-to-br ${card.color}`}>
                <card.icon className="h-5 w-5 text-neuropen-text" />
              </div>
              <CardTitle className="text-xl font-medium">{card.title}</CardTitle>
            </CardHeader>
            <CardContent className="pb-4">
              <p className="text-neuropen-muted mb-4">{card.description}</p>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-neuropen-primary hover:bg-neuropen-primary/10 p-0 group-hover:translate-x-1 transition-transform"
              >
                Explore <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="opacity-0 animate-fade-in-delay-3">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-neuropen-text">Recent Activity</h2>
          <Button variant="link" size="sm" className="text-neuropen-primary">
            View all
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-neuropen-surface border-neuropen-border">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg">Neural Networks</CardTitle>
                <FileText className="h-5 w-5 text-neuropen-primary" />
              </div>
              <p className="text-xs text-neuropen-muted">Notes • Updated 2 hours ago</p>
            </CardHeader>
            <CardContent>
              <p className="line-clamp-2 text-sm text-neuropen-muted">Explored backpropagation algorithms and their applications in computer vision models...</p>
            </CardContent>
          </Card>
          
          <Card className="bg-neuropen-surface border-neuropen-border">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg">Systems Design</CardTitle>
                <BookOpen className="h-5 w-5 text-neuropen-primary" />
              </div>
              <p className="text-xs text-neuropen-muted">Reader • Read 5 hours ago</p>
            </CardHeader>
            <CardContent>
              <p className="line-clamp-2 text-sm text-neuropen-muted">Reviewing distributed systems concepts and reliability patterns in large scale applications...</p>
            </CardContent>
          </Card>
          
          <Card className="bg-neuropen-surface border-neuropen-border">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg">Bayesian Networks</CardTitle>
                <Brain className="h-5 w-5 text-neuropen-primary" />
              </div>
              <p className="text-xs text-neuropen-muted">Knowledge Graph • Explored yesterday</p>
            </CardHeader>
            <CardContent>
              <p className="line-clamp-2 text-sm text-neuropen-muted">Mapped relationships between probability theory concepts and practical inference methods...</p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Index;
