
import React, { useEffect, useRef } from 'react';
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
import { AnimatedWrapper } from '@/components/AnimatedWrapper';
import { gsap } from 'gsap';
import { EnhancedCard } from '@/components/EnhancedCard';
import { AnimatedButton } from '@/components/AnimatedButton';
import { AnimatedIcon } from '@/components/icons/AnimatedIcon';

const Index = () => {
  const navigate = useNavigate();
  const cardsRef = useRef<HTMLDivElement>(null);
  const recentRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Create a floating particle effect in the background
    const container = document.createElement('div');
    container.className = 'absolute inset-0 pointer-events-none';
    document.querySelector('main')?.appendChild(container);
    
    // Create particles
    for (let i = 0; i < 20; i++) {
      const particle = document.createElement('div');
      const size = Math.random() * 3 + 1;
      particle.className = 'absolute rounded-full bg-white/5';
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      
      container.appendChild(particle);
      
      gsap.to(particle, {
        y: -100 - Math.random() * 200,
        x: Math.random() * 50 - 25,
        opacity: 0,
        duration: 5 + Math.random() * 10,
        repeat: -1,
        delay: Math.random() * 5,
        ease: "none",
        yoyo: true
      });
    }
    
    return () => {
      if (container.parentNode) {
        container.parentNode.removeChild(container);
      }
    };
  }, []);
  
  const featureCards = [
    {
      title: "Knowledge Graph",
      description: "Visualize connections between concepts",
      icon: Brain,
      route: "/graph",
      color: "from-neuropen-accent-purple/20 to-transparent"
    },
    {
      title: "Study Materials",
      description: "Organize and access your learning resources",
      icon: LibraryBig,
      route: "/materials",
      color: "from-neuropen-accent-blue/20 to-transparent"
    },
    {
      title: "Notes",
      description: "Capture and organize your thoughts",
      icon: FileText,
      route: "/notes",
      color: "from-neuropen-accent-mint/20 to-transparent"
    },
    {
      title: "Reader",
      description: "Read and annotate your documents",
      icon: BookOpen,
      route: "/reader",
      color: "from-neuropen-accent-purple/20 to-transparent"
    },
    {
      title: "Flashcards",
      description: "Reinforce your learning with spaced repetition",
      icon: BookText,
      route: "/flashcards",
      color: "from-neuropen-accent-blue/20 to-transparent"
    },
    {
      title: "Experiments",
      description: "Test new learning approaches",
      icon: FlaskConical,
      route: "/experiments",
      color: "from-neuropen-accent-mint/20 to-transparent"
    }
  ];

  return (
    <div className="flex flex-col gap-6">
      <section className="mb-4">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-2">
          <AnimatedWrapper type="slide-up">
            <h1 className="text-3xl font-bold text-gradient mb-2 relative">
              Welcome back
              <div className="absolute -left-2 -top-2 h-8 w-8 rounded-full bg-gradient-to-br from-neuropen-accent-purple/30 to-transparent blur-md"></div>
            </h1>
            <p className="text-neuropen-muted">Continue where you left off or explore your knowledge.</p>
          </AnimatedWrapper>
          
          <AnimatedWrapper type="fade-in" delay={0.4}>
            <div className="flex gap-4">
              <AnimatedIcon animateOnHover="pulse" hoverColor="#9b87f5">
                <Button 
                  variant="ghost" 
                  className="gap-2 text-neuropen-muted hover:text-neuropen-text hover:bg-neuropen-surface-lighter transition-all duration-300"
                >
                  <Clock className="h-4 w-4" /> 
                  <span>Recent</span>
                </Button>
              </AnimatedIcon>
              
              <AnimatedIcon animateOnHover="pulse" hoverColor="#1EAEDB">
                <Button 
                  variant="ghost" 
                  className="gap-2 text-neuropen-muted hover:text-neuropen-text hover:bg-neuropen-surface-lighter transition-all duration-300"
                >
                  <Star className="h-4 w-4" /> 
                  <span>Favorites</span>
                </Button>
              </AnimatedIcon>
              
              <AnimatedIcon animateOnHover="pulse" hoverColor="#7DE2D1">
                <Button 
                  variant="ghost" 
                  className="gap-2 text-neuropen-muted hover:text-neuropen-text hover:bg-neuropen-surface-lighter transition-all duration-300"
                >
                  <BarChart3 className="h-4 w-4" /> 
                  <span>Statistics</span>
                </Button>
              </AnimatedIcon>
            </div>
          </AnimatedWrapper>
        </div>
      </section>

      <AnimatedWrapper type="stagger-fade" staggerChildren=".card-item" staggerDelay={0.1}>
        <section ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {featureCards.map((card, index) => (
            <EnhancedCard
              key={card.title}
              className="card-item bg-neuropen-surface border-neuropen-border bg-gradient-card hover:border-neuropen-highlight/50 cursor-pointer"
              hoverEffect="scale"
              cardProps={{
                onClick: () => navigate(card.route)
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
                <AnimatedButton 
                  variant="ghost" 
                  size="sm" 
                  className="text-neuropen-primary hover:bg-neuropen-primary/10 p-0 group-hover:translate-x-1 transition-transform group"
                >
                  Explore <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                </AnimatedButton>
              </CardContent>
            </EnhancedCard>
          ))}
        </section>
      </AnimatedWrapper>

      <AnimatedWrapper type="slide-up" delay={0.5}>
        <section ref={recentRef} className="relative">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-neuropen-text">Recent Activity</h2>
            <Button variant="link" size="sm" className="text-neuropen-primary hover:text-neuropen-accent-blue transition-colors duration-300">
              View all
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <EnhancedCard className="bg-neuropen-surface border-neuropen-border" hoverEffect="glow">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg">Neural Networks</CardTitle>
                  <FileText className="h-5 w-5 text-neuropen-accent-purple" />
                </div>
                <p className="text-xs text-neuropen-muted">Notes • Updated 2 hours ago</p>
              </CardHeader>
              <CardContent>
                <p className="line-clamp-2 text-sm text-neuropen-muted">Explored backpropagation algorithms and their applications in computer vision models...</p>
              </CardContent>
            </EnhancedCard>
            
            <EnhancedCard className="bg-neuropen-surface border-neuropen-border" hoverEffect="glow">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg">Systems Design</CardTitle>
                  <BookOpen className="h-5 w-5 text-neuropen-accent-blue" />
                </div>
                <p className="text-xs text-neuropen-muted">Reader • Read 5 hours ago</p>
              </CardHeader>
              <CardContent>
                <p className="line-clamp-2 text-sm text-neuropen-muted">Reviewing distributed systems concepts and reliability patterns in large scale applications...</p>
              </CardContent>
            </EnhancedCard>
            
            <EnhancedCard className="bg-neuropen-surface border-neuropen-border" hoverEffect="glow">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg">Bayesian Networks</CardTitle>
                  <Brain className="h-5 w-5 text-neuropen-accent-mint" />
                </div>
                <p className="text-xs text-neuropen-muted">Knowledge Graph • Explored yesterday</p>
              </CardHeader>
              <CardContent>
                <p className="line-clamp-2 text-sm text-neuropen-muted">Mapped relationships between probability theory concepts and practical inference methods...</p>
              </CardContent>
            </EnhancedCard>
          </div>
        </section>
      </AnimatedWrapper>
    </div>
  );
};

export default Index;
