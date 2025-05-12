
import React, { useEffect, useRef } from "react";
import { PageHeader } from "@/components/PageHeader";
import { AnimatedCard, CardContent, CardHeader, CardTitle } from "@/components/AnimatedCard";
import { TiltCard } from "@/components/TiltCard";
import { Button } from "@/components/ui/button";
import { AnimatedButton } from "@/components/AnimatedButton";
import { ActivityChart } from "@/components/analytics/ActivityChart";
import { ParallaxBackground } from "@/components/ParallaxBackground";
import { AnimatedIcon } from "@/components/icons/AnimatedIcon";
import { AnimatedWrapper } from "@/components/AnimatedWrapper";
import { CustomTooltip } from "@/components/CustomTooltip";
import { gsap } from 'gsap';
import { 
  BookOpen, 
  FileText, 
  Brain, 
  Plus, 
  BookText,
  Activity,
  Clock,
  Lightbulb,
  ChevronRight,
  Settings,
  Zap,
  BarChart3
} from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const chartRef = useRef<HTMLDivElement>(null);
  
  // Sample activity data for charts
  const studyActivityData = [
    { date: 'Mon', value: 4 },
    { date: 'Tue', value: 3 },
    { date: 'Wed', value: 6 },
    { date: 'Thu', value: 2 },
    { date: 'Fri', value: 5 },
    { date: 'Sat', value: 8 },
    { date: 'Sun', value: 7 }
  ];
  
  const knowledgeGrowthData = [
    { date: 'Week 1', value: 20 },
    { date: 'Week 2', value: 35 },
    { date: 'Week 3', value: 45 },
    { date: 'Week 4', value: 60 },
    { date: 'Week 5', value: 85 },
    { date: 'Week 6', value: 90 }
  ];
  
  useEffect(() => {
    // Create floating particles in the background
    const createParticles = () => {
      const particles = document.querySelectorAll('.particle');
      
      particles.forEach((particle) => {
        gsap.to(particle, {
          y: -Math.random() * 100 - 50,
          x: Math.random() * 30 - 15,
          opacity: 0,
          duration: 5 + Math.random() * 10,
          repeat: -1,
          delay: Math.random() * 5,
          ease: "none",
          yoyo: true
        });
      });
    };
    
    createParticles();
    
    // Animate stat numbers
    const statsElements = document.querySelectorAll('.stat-number');
    statsElements.forEach((stat) => {
      const target = Number(stat.textContent);
      gsap.fromTo(
        stat, 
        { textContent: '0' }, 
        {
          textContent: target,
          duration: 2,
          ease: 'power2.out',
          snap: { textContent: 1 },
          delay: 0.5
        }
      );
    });
  }, []);

  return (
    <div className="flex flex-col gap-6 relative">
      <ParallaxBackground particleCount={30} particleColor="bg-white/5" particleSizeMax={4} />
      
      <PageHeader
        title="Welcome back"
        description="Continue where you left off or start something new."
        actions={
          <>
            <CustomTooltip content="View recent activity">
              <AnimatedIcon animateOnHover="pulse" hoverColor="#9b87f5">
                <Button 
                  variant="ghost" 
                  className="gap-2 text-neuropen-muted hover:text-neuropen-text hover:bg-neuropen-surface-lighter transition-all duration-300"
                >
                  <Clock className="h-4 w-4" /> 
                  <span>Recent</span>
                </Button>
              </AnimatedIcon>
            </CustomTooltip>
            
            <CustomTooltip content="View your statistics">
              <AnimatedIcon animateOnHover="pulse" hoverColor="#1EAEDB">
                <Button 
                  variant="ghost" 
                  className="gap-2 text-neuropen-muted hover:text-neuropen-text hover:bg-neuropen-surface-lighter transition-all duration-300"
                >
                  <BarChart3 className="h-4 w-4" /> 
                  <span>Stats</span>
                </Button>
              </AnimatedIcon>
            </CustomTooltip>
            
            <CustomTooltip content="Adjust your settings">
              <AnimatedIcon animateOnHover="spin" hoverColor="#7DE2D1">
                <Button 
                  variant="ghost" 
                  className="gap-2 text-neuropen-muted hover:text-neuropen-text hover:bg-neuropen-surface-lighter transition-all duration-300"
                >
                  <Settings className="h-4 w-4" /> 
                  <span>Settings</span>
                </Button>
              </AnimatedIcon>
            </CustomTooltip>
          </>
        }
      />

      {/* Quick stats */}
      <AnimatedWrapper type="fade-in" delay={0.3}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <TiltCard className="bg-neuropen-surface border-neuropen-border py-4 px-6">
            <div className="flex flex-col items-center justify-center">
              <h3 className="text-neuropen-muted text-sm uppercase tracking-wider">Study time</h3>
              <div className="text-3xl font-bold text-neuropen-accent-blue mt-2 stat-number">24</div>
              <p className="text-neuropen-muted text-sm">hours this week</p>
            </div>
          </TiltCard>
          
          <TiltCard className="bg-neuropen-surface border-neuropen-border py-4 px-6">
            <div className="flex flex-col items-center justify-center">
              <h3 className="text-neuropen-muted text-sm uppercase tracking-wider">Notes created</h3>
              <div className="text-3xl font-bold text-neuropen-accent-purple mt-2 stat-number">16</div>
              <p className="text-neuropen-muted text-sm">this week</p>
            </div>
          </TiltCard>
          
          <TiltCard className="bg-neuropen-surface border-neuropen-border py-4 px-6">
            <div className="flex flex-col items-center justify-center">
              <h3 className="text-neuropen-muted text-sm uppercase tracking-wider">Focus score</h3>
              <div className="text-3xl font-bold text-neuropen-accent-mint mt-2 stat-number">92</div>
              <p className="text-neuropen-muted text-sm">out of 100</p>
            </div>
          </TiltCard>
          
          <TiltCard className="bg-neuropen-surface border-neuropen-border py-4 px-6">
            <div className="flex flex-col items-center justify-center">
              <h3 className="text-neuropen-muted text-sm uppercase tracking-wider">Retention rate</h3>
              <div className="text-3xl font-bold text-neuropen-primary mt-2 stat-number">88</div>
              <p className="text-neuropen-muted text-sm">percent</p>
            </div>
          </TiltCard>
        </div>
      </AnimatedWrapper>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <AnimatedWrapper type="stagger-fade" staggerChildren=".card-item" staggerDelay={0.1}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <AnimatedCard 
                className="card-item bg-neuropen-surface border-neuropen-border hover:border-neuropen-accent-blue transition-all duration-300"
              >
                <CardHeader className="pb-2">
                  <CardTitle className="text-neuropen-text flex items-center gap-2">
                    <Activity className="h-5 w-5 text-neuropen-primary" />
                    <span>Current Focus</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {['Advanced Mathematics', 'Computer Science', 'Cognitive Psychology'].map((item, index) => (
                      <div key={index} className="p-3 bg-neuropen-background rounded-md flex justify-between items-center hover:bg-neuropen-background/80 transition-colors">
                        <span className="text-neuropen-text">{item}</span>
                        <CustomTooltip content="Open materials">
                          <Button variant="ghost" size="sm" className="text-neuropen-primary hover:text-neuropen-accent hover:bg-neuropen-primary/10">
                            <BookOpen className="h-4 w-4" />
                          </Button>
                        </CustomTooltip>
                      </div>
                    ))}
                    <Link to="/materials" className="flex items-center gap-1 text-sm text-neuropen-accent-blue mt-2 hover:text-neuropen-accent-purple transition-colors">
                      <span>All subjects</span>
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                  </div>
                </CardContent>
              </AnimatedCard>

              <AnimatedCard 
                className="card-item bg-neuropen-surface border-neuropen-border hover:border-neuropen-accent-purple transition-all duration-300"
                animationType="slide-up"
              >
                <CardHeader className="pb-2">
                  <CardTitle className="text-neuropen-text flex items-center gap-2">
                    <Clock className="h-5 w-5 text-neuropen-primary" />
                    <span>Recent Notes</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {['Understanding Neural Networks', 'Bayes Theorem Applications', 'System Design Patterns'].map((item, index) => (
                      <div key={index} className="p-3 bg-neuropen-background rounded-md flex justify-between items-center hover:bg-neuropen-background/80 transition-colors">
                        <span className="text-neuropen-text">{item}</span>
                        <CustomTooltip content="View note">
                          <Button variant="ghost" size="sm" className="text-neuropen-primary hover:text-neuropen-accent hover:bg-neuropen-primary/10 group">
                            <FileText className="h-4 w-4 group-hover:scale-110 transition-transform" />
                          </Button>
                        </CustomTooltip>
                      </div>
                    ))}
                    <Link to="/notes" className="flex items-center gap-1 text-sm text-neuropen-accent-blue mt-2 hover:text-neuropen-accent-purple transition-colors">
                      <span>All notes</span>
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                  </div>
                </CardContent>
              </AnimatedCard>
            </div>
          </AnimatedWrapper>

          {/* Activity chart section */}
          <div ref={chartRef} className="mb-6">
            <h2 className="text-xl font-semibold text-neuropen-text mb-4">Your Activity</h2>
            <div className="grid grid-cols-1 gap-4">
              <ActivityChart 
                title="Study Sessions (hours)" 
                data={studyActivityData} 
                color="#1EAEDB"
              />
              <ActivityChart 
                title="Knowledge Growth" 
                data={knowledgeGrowthData} 
                color="#9b87f5"
              />
            </div>
          </div>
        </div>
        
        <div className="md:col-span-1">
          <AnimatedWrapper type="slide-up" delay={0.3}>
            {/* Suggestions and insights */}
            <TiltCard className="bg-neuropen-surface border-neuropen-border mb-4">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-neuropen-accent-mint" />
                  <span>Learning Insights</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-neuropen-accent-blue/10 rounded-md">
                    <h4 className="text-neuropen-text font-medium mb-1">Retention improving</h4>
                    <p className="text-sm text-neuropen-muted">Your retention rate has improved by 12% this month.</p>
                  </div>
                  
                  <div className="p-3 bg-neuropen-accent-purple/10 rounded-md">
                    <h4 className="text-neuropen-text font-medium mb-1">Knowledge gaps</h4>
                    <p className="text-sm text-neuropen-muted">Consider revisiting concepts in Neural Networks.</p>
                  </div>
                  
                  <div className="p-3 bg-neuropen-accent-mint/10 rounded-md">
                    <h4 className="text-neuropen-text font-medium mb-1">Study suggestion</h4>
                    <p className="text-sm text-neuropen-muted">Your best focus time appears to be between 9-11am.</p>
                  </div>
                </div>
                
                <Link to="/metacognitive-insights">
                  <Button variant="outline" className="w-full mt-4 border-neuropen-border text-neuropen-text hover:bg-neuropen-surface-lighter">
                    View all insights
                    <Zap className="ml-2 h-4 w-4 text-neuropen-accent-mint" />
                  </Button>
                </Link>
              </CardContent>
            </TiltCard>
            
            {/* Quick actions */}
            <div>
              <h2 className="text-xl font-semibold text-neuropen-text mb-3">Quick Actions</h2>
              <div className="grid grid-cols-2 gap-3">
                <AnimatedButton className="h-auto p-4 flex flex-col items-center gap-2 bg-gradient-to-br from-neuropen-accent-blue/20 to-neuropen-background border border-neuropen-border hover:border-neuropen-accent-blue">
                  <FileText className="h-6 w-6" />
                  <span>New Note</span>
                </AnimatedButton>
                <AnimatedButton className="h-auto p-4 flex flex-col items-center gap-2 bg-gradient-to-br from-neuropen-accent-purple/20 to-neuropen-background border border-neuropen-border hover:border-neuropen-accent-purple">
                  <BookOpen className="h-6 w-6" />
                  <span>Import PDF</span>
                </AnimatedButton>
                <AnimatedButton className="h-auto p-4 flex flex-col items-center gap-2 bg-gradient-to-br from-neuropen-accent-mint/20 to-neuropen-background border border-neuropen-border hover:border-neuropen-accent-mint">
                  <Brain className="h-6 w-6" />
                  <span>Explore Graph</span>
                </AnimatedButton>
                <AnimatedButton className="h-auto p-4 flex flex-col items-center gap-2 bg-gradient-to-br from-neuropen-primary/10 to-neuropen-background border border-neuropen-border hover:border-neuropen-primary">
                  <BookText className="h-6 w-6" />
                  <span>Study Session</span>
                </AnimatedButton>
              </div>
            </div>
          </AnimatedWrapper>
        </div>
      </div>
      
      {/* Background particles for visual effect */}
      <div className="absolute bottom-10 left-10 w-4 h-4 rounded-full bg-neuropen-accent-blue/30 blur-md particle"></div>
      <div className="absolute top-40 right-20 w-3 h-3 rounded-full bg-neuropen-accent-purple/30 blur-md particle"></div>
      <div className="absolute top-60 left-40 w-2 h-2 rounded-full bg-neuropen-accent-mint/30 blur-sm particle"></div>
      <div className="absolute bottom-40 right-40 w-5 h-5 rounded-full bg-neuropen-primary/10 blur-md particle"></div>
    </div>
  );
};

export default Dashboard;
