import React, { useEffect, useRef } from "react";
import { 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { gsap } from "gsap";
import { 
  Brain, 
  AlertCircle, 
  BadgeCheck, 
  BarChart3,
  Lightbulb
} from "lucide-react";
import { ArrowRightLeft } from "@/components/icons/ArrowRightLeft";
import { AnimatedProgress } from "@/components/ui/animated-progress";
import { EnhancedCard } from "@/components/EnhancedCard";
import { AnimatedWrapper } from "@/components/AnimatedWrapper";
import { AnimatedIcon } from "@/components/icons/AnimatedIcon";
import { PageHeader } from "@/components/PageHeader";
import { ParallaxBackground } from "@/components/ParallaxBackground";

const MetacognitiveInsights = () => {
  // References for GSAP animations
  const headerRef = useRef(null);
  const tabsRef = useRef(null);
  const cardsRef = useRef(null);
  const parallaxRef = useRef(null);

  // Initialize GSAP animations
  useEffect(() => {
    // Create parallax effect on mouse movement
    const parallaxElements = document.querySelectorAll('.parallax-element');
    
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      
      // Calculate distance from center (0 at center, 1 at edge)
      const distanceX = (clientX - centerX) / centerX;
      const distanceY = (clientY - centerY) / centerY;
      
      parallaxElements.forEach((element, index) => {
        const depth = 0.05 * (index % 3 + 1);  // Creates different parallax depths
        gsap.to(element, {
          x: distanceX * 20 * depth,
          y: distanceY * 20 * depth,
          duration: 1,
          ease: "power2.out"
        });
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    // Clean up
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <ParallaxBackground particleCount={15} />
      
      <PageHeader 
        title="Metacognitive Insights"
        description="Understand your learning patterns and cognitive blind spots"
      />

      <Tabs defaultValue="understanding" className="animate-fade-in" ref={tabsRef}>
        <TabsList className="bg-neuropen-surface-lighter relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-neuropen-accent-purple/5 to-neuropen-accent-blue/5"></div>
          <TabsTrigger value="understanding" className="text-neuropen-muted data-[state=active]:text-neuropen-text relative z-10">
            <AnimatedIcon animateOnHover="pulse" hoverColor="#9b87f5">
              Understanding vs. Recognition
            </AnimatedIcon>
          </TabsTrigger>
          <TabsTrigger value="blindspots" className="text-neuropen-muted data-[state=active]:text-neuropen-text relative z-10">
            <AnimatedIcon animateOnHover="pulse" hoverColor="#1EAEDB">
              Blind Spot Identification
            </AnimatedIcon>
          </TabsTrigger>
          <TabsTrigger value="depth" className="text-neuropen-muted data-[state=active]:text-neuropen-text relative z-10">
            <AnimatedIcon animateOnHover="pulse" hoverColor="#7DE2D1">
              Conceptual Depth Analysis
            </AnimatedIcon>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="understanding" className="mt-4">
          <EnhancedCard className="bg-neuropen-surface border-neuropen-border" hoverEffect="none">
            <CardHeader>
              <CardTitle className="text-neuropen-text flex items-center gap-2">
                <BadgeCheck className="h-5 w-5 text-neuropen-accent-purple" />
                <span>Understanding vs. Recognition</span>
              </CardTitle>
              <CardDescription className="text-neuropen-muted">
                Distinguish between familiarity and true mastery of concepts
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-neuropen-text">Neural Networks</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-neuropen-muted">Self-assessed: 4/5</span>
                      <span className="text-xs text-neuropen-muted">|</span>
                      <span className="text-xs text-neuropen-muted">Actual: 3.2/5</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <div className="relative w-full">
                      <AnimatedProgress 
                        value={80} 
                        className="h-2 bg-neuropen-background" 
                        animationDelay={0.2}
                      />
                      <div className="absolute top-0 left-0 h-2 bg-white/50 rounded-full shadow-[0_0_10px_rgba(255,255,255,0.2)]" 
                        style={{ width: '64%', opacity: 0.5 }}>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-neuropen-text">Quantum Computing</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-neuropen-muted">Self-assessed: 3/5</span>
                      <span className="text-xs text-neuropen-muted">|</span>
                      <span className="text-xs text-neuropen-muted">Actual: 2.1/5</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <div className="relative w-full">
                      <AnimatedProgress 
                        value={60} 
                        className="h-2 bg-neuropen-background" 
                        animationDelay={0.4}
                      />
                      <div className="absolute top-0 left-0 h-2 bg-white/50 rounded-full" 
                        style={{ width: '42%', opacity: 0.5 }}>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-neuropen-text">Bayesian Statistics</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-neuropen-muted">Self-assessed: 4/5</span>
                      <span className="text-xs text-neuropen-muted">|</span>
                      <span className="text-xs text-neuropen-muted">Actual: 4.3/5</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <div className="relative w-full">
                      <AnimatedProgress 
                        value={80} 
                        className="h-2 bg-neuropen-background" 
                        animationDelay={0.6}
                      />
                      <div className="absolute top-0 left-0 h-2 bg-white/50 rounded-full" 
                        style={{ width: '86%', opacity: 0.5 }}>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </EnhancedCard>
        </TabsContent>
        
        <TabsContent value="blindspots" className="mt-4">
          <EnhancedCard className="bg-neuropen-surface border-neuropen-border">
            <CardHeader>
              <CardTitle className="text-neuropen-text flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-neuropen-accent-blue" />
                <span>Blind Spot Identification</span>
              </CardTitle>
              <CardDescription className="text-neuropen-muted">
                Uncover misconceptions and knowledge gaps
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AnimatedWrapper type="stagger-fade" staggerChildren=".blindspot-item" staggerDelay={0.15}>
                <div className="space-y-4">
                  {[
                    {
                      topic: "Deep Learning",
                      issue: "Confusion between backpropagation and forward propagation mechanisms",
                      evidence: "Consistent errors in related flashcards, contradictions in notes"
                    },
                    {
                      topic: "Distributed Systems",
                      issue: "Misconception about eventual consistency guarantees",
                      evidence: "Pattern of incorrect answers in consistency model questions"
                    },
                    {
                      topic: "Cognitive Psychology",
                      issue: "Gap in understanding between working memory and long-term memory",
                      evidence: "Missing connections in knowledge graph, tutor highlighted inconsistency"
                    }
                  ].map((item, index) => (
                    <div key={index} className="p-4 bg-neuropen-background rounded-md blindspot-item hover:bg-white/5 transition-colors duration-300">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertCircle className="h-4 w-4 text-white/70" />
                        <h4 className="text-neuropen-text font-medium">{item.topic}</h4>
                      </div>
                      <p className="text-sm text-neuropen-muted mb-2">{item.issue}</p>
                      <div className="text-xs text-neuropen-muted pt-2 border-t border-white/10">
                        <span className="font-medium">Evidence:</span> {item.evidence}
                      </div>
                    </div>
                  ))}
                </div>
              </AnimatedWrapper>
            </CardContent>
          </EnhancedCard>
        </TabsContent>

        <TabsContent value="depth" className="mt-4">
          <EnhancedCard className="bg-neuropen-surface border-neuropen-border">
            <CardHeader>
              <CardTitle className="text-neuropen-text flex items-center gap-2">
                <ArrowRightLeft className="h-5 w-5 text-neuropen-accent-mint" />
                <span>Conceptual Depth Analysis</span>
              </CardTitle>
              <CardDescription className="text-neuropen-muted">
                Measure understanding of fundamental principles
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AnimatedWrapper type="stagger-fade" staggerChildren=".depth-item" staggerDelay={0.15}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 depth-grid">
                  {[
                    {
                      concept: "Statistical Learning",
                      depth: 78,
                      details: {
                        connections: "High (23 connections)",
                        explanation: "Excellent",
                        performance: "Strong on 'why' questions",
                        evolution: "Significant refinement over time"
                      }
                    },
                    {
                      concept: "Graph Theory",
                      depth: 65,
                      details: {
                        connections: "Medium (14 connections)",
                        explanation: "Good",
                        performance: "Mixed performance on applications",
                        evolution: "Steady improvement"
                      }
                    },
                    {
                      concept: "Blockchain Fundamentals",
                      depth: 42,
                      details: {
                        connections: "Low (7 connections)",
                        explanation: "Basic",
                        performance: "Weak on technical questions",
                        evolution: "Limited note development"
                      }
                    },
                    {
                      concept: "Cognitive Biases",
                      depth: 83,
                      details: {
                        connections: "Very High (31 connections)",
                        explanation: "Excellent",
                        performance: "Strong on applications",
                        evolution: "Rich refinement pattern"
                      }
                    }
                  ].map((item, index) => (
                    <div key={index} className="p-4 bg-neuropen-background rounded-md depth-item relative group overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-neuropen-accent-purple/10 via-transparent to-neuropen-accent-blue/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                      <div className="flex justify-between items-center mb-3 relative z-10">
                        <h4 className="text-neuropen-text font-medium">{item.concept}</h4>
                        <div className="text-sm font-medium text-neuropen-primary">{item.depth}%</div>
                      </div>
                      <div className="w-full h-1.5 bg-neuropen-surface-lighter rounded-full mb-3 progress-bar-container relative z-10">
                        <AnimatedProgress 
                          value={item.depth} 
                          className="h-1.5 bg-gradient-to-r from-neuropen-accent-purple to-neuropen-accent-blue rounded-full" 
                          animationDelay={index * 0.2}
                        />
                      </div>
                      <div className="text-xs space-y-1.5 relative z-10">
                        <div className="flex justify-between">
                          <span className="text-neuropen-muted">Graph Connections:</span>
                          <span className="text-neuropen-text">{item.details.connections}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-neuropen-muted">Explanation Quality:</span>
                          <span className="text-neuropen-text">{item.details.explanation}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-neuropen-muted">Test Performance:</span>
                          <span className="text-neuropen-text">{item.details.performance}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-neuropen-muted">Note Evolution:</span>
                          <span className="text-neuropen-text">{item.details.evolution}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </AnimatedWrapper>
            </CardContent>
          </EnhancedCard>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MetacognitiveInsights;
