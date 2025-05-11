import React from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  Brain, 
  AlertCircle, 
  BadgeCheck, 
  BarChart3,
  Lightbulb
} from "lucide-react";
import { ArrowRightLeft } from "@/components/icons/ArrowRightLeft";

const MetacognitiveInsights = () => {
  return (
    <div className="flex flex-col gap-6">
      <section className="mb-4 animate-fade-in">
        <h1 className="text-3xl font-bold text-neuropen-text mb-2">Metacognitive Insights</h1>
        <p className="text-neuropen-muted">Understand your learning patterns and cognitive blind spots</p>
      </section>

      <Tabs defaultValue="understanding" className="animate-fade-in">
        <TabsList className="bg-neuropen-surface-lighter">
          <TabsTrigger value="understanding" className="text-neuropen-muted data-[state=active]:text-neuropen-text">
            Understanding vs. Recognition
          </TabsTrigger>
          <TabsTrigger value="blindspots" className="text-neuropen-muted data-[state=active]:text-neuropen-text">
            Blind Spot Identification
          </TabsTrigger>
          <TabsTrigger value="depth" className="text-neuropen-muted data-[state=active]:text-neuropen-text">
            Conceptual Depth Analysis
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="understanding" className="mt-4">
          <Card className="bg-neuropen-surface border-neuropen-border">
            <CardHeader>
              <CardTitle className="text-neuropen-text flex items-center gap-2">
                <BadgeCheck className="h-5 w-5 text-neuropen-primary" />
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
                    <Progress value={80} className="h-2 bg-neuropen-background" indicatorClassName="bg-neuropen-primary" />
                    <Progress value={64} className="h-2 bg-neuropen-background" indicatorClassName="bg-white/50" />
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
                    <Progress value={60} className="h-2 bg-neuropen-background" indicatorClassName="bg-neuropen-primary" />
                    <Progress value={42} className="h-2 bg-neuropen-background" indicatorClassName="bg-white/50" />
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
                    <Progress value={80} className="h-2 bg-neuropen-background" indicatorClassName="bg-neuropen-primary" />
                    <Progress value={86} className="h-2 bg-neuropen-background" indicatorClassName="bg-white/50" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="blindspots" className="mt-4">
          <Card className="bg-neuropen-surface border-neuropen-border">
            <CardHeader>
              <CardTitle className="text-neuropen-text flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-neuropen-primary" />
                <span>Blind Spot Identification</span>
              </CardTitle>
              <CardDescription className="text-neuropen-muted">
                Uncover misconceptions and knowledge gaps
              </CardDescription>
            </CardHeader>
            <CardContent>
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
                  <div key={index} className="p-4 bg-neuropen-background rounded-md">
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
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="depth" className="mt-4">
          <Card className="bg-neuropen-surface border-neuropen-border">
            <CardHeader>
              <CardTitle className="text-neuropen-text flex items-center gap-2">
                <ArrowRightLeft className="h-5 w-5 text-neuropen-primary" />
                <span>Conceptual Depth Analysis</span>
              </CardTitle>
              <CardDescription className="text-neuropen-muted">
                Measure understanding of fundamental principles
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  <div key={index} className="p-4 bg-neuropen-background rounded-md">
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="text-neuropen-text font-medium">{item.concept}</h4>
                      <div className="text-sm font-medium text-neuropen-primary">{item.depth}%</div>
                    </div>
                    <div className="w-full h-1.5 bg-neuropen-surface-lighter rounded-full mb-3">
                      <div 
                        className="h-full bg-neuropen-primary rounded-full" 
                        style={{ width: `${item.depth}%` }}
                      ></div>
                    </div>
                    <div className="text-xs space-y-1.5">
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
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MetacognitiveInsights;
