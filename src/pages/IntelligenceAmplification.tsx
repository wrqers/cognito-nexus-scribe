
import React, { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Lightbulb, 
  Brain, 
  MessageCircle, 
  BarChart3, 
  Settings,
  Sparkles,
  HelpCircle
} from "lucide-react";
import { ArrowRightLeft } from "@/components/icons/ArrowRightLeft";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

const IntelligenceAmplification = () => {
  const [activeChat, setActiveChat] = useState('socratic');
  const [messages, setMessages] = useState([
    { id: 1, sender: 'tutor', content: "Let's explore the concept of neural networks. What do you already understand about them?", time: "2 minutes ago" },
    { id: 2, sender: 'user', content: "I understand that they're inspired by the human brain and use interconnected nodes organized in layers.", time: "1 minute ago" },
    { id: 3, sender: 'tutor', content: "Good start. How would you explain the difference between supervised and unsupervised learning in neural networks?", time: "Just now" }
  ]);
  
  return (
    <div className="flex flex-col gap-6">
      <section className="mb-4 animate-fade-in">
        <h1 className="text-3xl font-bold text-neuropen-text mb-2">Intelligence Amplification</h1>
        <p className="text-neuropen-muted">AI-powered tools to enhance your cognitive abilities</p>
      </section>

      <Tabs defaultValue="tutor" className="animate-fade-in">
        <TabsList className="bg-neuropen-surface-lighter">
          <TabsTrigger value="tutor" className="text-neuropen-muted data-[state=active]:text-neuropen-text">
            Socratic Tutor
          </TabsTrigger>
          <TabsTrigger value="explanation" className="text-neuropen-muted data-[state=active]:text-neuropen-text">
            Explanation Generator
          </TabsTrigger>
          <TabsTrigger value="perspective" className="text-neuropen-muted data-[state=active]:text-neuropen-text">
            Perspective Expansion
          </TabsTrigger>
          <TabsTrigger value="analogies" className="text-neuropen-muted data-[state=active]:text-neuropen-text">
            Analogical Reasoning
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="tutor" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="bg-neuropen-surface border-neuropen-border md:col-span-1">
              <CardHeader>
                <CardTitle className="text-neuropen-text text-lg">Topics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-1.5 p-2">
                <Button 
                  variant="ghost" 
                  className={`w-full justify-start text-left px-3 py-2 ${activeChat === 'socratic' ? 'bg-neuropen-surface-lighter text-neuropen-text' : 'text-neuropen-muted hover:bg-neuropen-surface-lighter'}`}
                  onClick={() => setActiveChat('socratic')}
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  <div>
                    <div className="font-medium">Neural Networks</div>
                    <div className="text-xs text-neuropen-muted">Socratic discussion</div>
                  </div>
                </Button>
                
                <Button 
                  variant="ghost" 
                  className={`w-full justify-start text-left px-3 py-2 ${activeChat === 'quantum' ? 'bg-neuropen-surface-lighter text-neuropen-text' : 'text-neuropen-muted hover:bg-neuropen-surface-lighter'}`}
                  onClick={() => setActiveChat('quantum')}
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  <div>
                    <div className="font-medium">Quantum Computing</div>
                    <div className="text-xs text-neuropen-muted">Exploration session</div>
                  </div>
                </Button>
                
                <Button 
                  variant="ghost" 
                  className={`w-full justify-start text-left px-3 py-2 ${activeChat === 'systems' ? 'bg-neuropen-surface-lighter text-neuropen-text' : 'text-neuropen-muted hover:bg-neuropen-surface-lighter'}`}
                  onClick={() => setActiveChat('systems')}
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  <div>
                    <div className="font-medium">Distributed Systems</div>
                    <div className="text-xs text-neuropen-muted">Connection inquiry</div>
                  </div>
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full mt-4 bg-neuropen-surface-lighter border-neuropen-border text-neuropen-text hover:bg-neuropen-primary hover:text-black"
                >
                  <span className="mr-1">+</span> New Topic
                </Button>
              </CardContent>
            </Card>
            
            <Card className="bg-neuropen-surface border-neuropen-border md:col-span-3">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-neuropen-text flex items-center gap-2">
                    <HelpCircle className="h-5 w-5 text-neuropen-primary" />
                    <span>Socratic Tutor</span>
                  </CardTitle>
                  <CardDescription className="text-neuropen-muted">
                    A tutor that asks probing questions to deepen understanding
                  </CardDescription>
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="sm" className="text-neuropen-muted hover:text-neuropen-text">
                    <Settings className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-neuropen-muted hover:text-neuropen-text">
                    <BarChart3 className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              
              <CardContent className="pt-0">
                <div className="mb-4 h-96 overflow-y-auto space-y-4 p-1">
                  {messages.map(message => (
                    <div 
                      key={message.id} 
                      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div 
                        className={`max-w-[80%] p-3 rounded-lg ${
                          message.sender === 'user' 
                            ? 'bg-neuropen-primary text-black' 
                            : 'bg-neuropen-background text-neuropen-text'
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                        <div className="text-xs mt-1 opacity-70">{message.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              
              <CardFooter>
                <div className="w-full">
                  <div className="flex gap-2">
                    <Textarea 
                      placeholder="Type your response..." 
                      className="bg-neuropen-background border-neuropen-border text-neuropen-text min-h-12 max-h-32"
                    />
                    <Button className="bg-neuropen-primary hover:bg-neuropen-primary/90 text-black h-12">
                      Send
                    </Button>
                  </div>
                  <div className="mt-2 flex justify-between items-center">
                    <div className="text-xs text-neuropen-muted">Using local LLM: Phi-3-mini</div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="h-7 text-xs bg-neuropen-background border-neuropen-border text-neuropen-muted hover:bg-neuropen-surface-lighter hover:text-neuropen-text">
                        Clarifying
                      </Button>
                      <Button variant="outline" size="sm" className="h-7 text-xs bg-neuropen-background border-neuropen-border text-neuropen-muted hover:bg-neuropen-surface-lighter hover:text-neuropen-text">
                        Probing
                      </Button>
                      <Button variant="outline" size="sm" className="h-7 text-xs bg-neuropen-background border-neuropen-border text-neuropen-muted hover:bg-neuropen-surface-lighter hover:text-neuropen-text">
                        Evidence
                      </Button>
                    </div>
                  </div>
                </div>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="explanation" className="mt-4">
          <Card className="bg-neuropen-surface border-neuropen-border">
            <CardHeader>
              <CardTitle className="text-neuropen-text flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-neuropen-primary" />
                <span>Multi-Level Explanation Generator</span>
              </CardTitle>
              <CardDescription className="text-neuropen-muted">
                Generate explanations at different levels of depth and complexity
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="space-y-3">
                <label className="text-sm font-medium text-neuropen-text">What concept would you like explained?</label>
                <Input 
                  placeholder="Enter a concept or topic (e.g., Quantum Entanglement)" 
                  className="bg-neuropen-background border-neuropen-border text-neuropen-text"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-neuropen-background rounded-md">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-neuropen-text font-medium">Beginner Level</h4>
                    <Lightbulb className="h-4 w-4 text-neuropen-primary" />
                  </div>
                  <p className="text-sm text-neuropen-muted">Simple explanation using everyday analogies and minimal jargon.</p>
                </div>
                
                <div className="p-4 bg-neuropen-background rounded-md">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-neuropen-text font-medium">Intermediate Level</h4>
                    <Lightbulb className="h-4 w-4 text-neuropen-primary" />
                  </div>
                  <p className="text-sm text-neuropen-muted">More detailed explanation with some technical terms and underlying principles.</p>
                </div>
                
                <div className="p-4 bg-neuropen-background rounded-md">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-neuropen-text font-medium">Advanced Level</h4>
                    <Lightbulb className="h-4 w-4 text-neuropen-primary" />
                  </div>
                  <p className="text-sm text-neuropen-muted">Deep explanation with technical details and connections to related concepts.</p>
                </div>
              </div>
              
              <Button className="w-full bg-neuropen-primary hover:bg-neuropen-primary/90 text-black">
                Generate Explanations
              </Button>
              
              <div className="p-5 bg-neuropen-background rounded-md">
                <h3 className="text-lg font-medium text-neuropen-text mb-3">Preview</h3>
                <p className="text-neuropen-text mb-4">Choose a concept and level above to generate an explanation</p>
                <p className="text-xs text-neuropen-muted italic">Generated explanations will appear here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="perspective" className="mt-4">
          <Card className="bg-neuropen-surface border-neuropen-border">
            <CardHeader>
              <CardTitle className="text-neuropen-text flex items-center gap-2">
                <Brain className="h-5 w-5 text-neuropen-primary" />
                <span>Perspective Expansion</span>
              </CardTitle>
              <CardDescription className="text-neuropen-muted">
                Explore alternative viewpoints on any topic
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="space-y-3">
                <label className="text-sm font-medium text-neuropen-text">What topic would you like to explore different perspectives on?</label>
                <Textarea 
                  placeholder="Describe a concept, theory, or topic" 
                  className="min-h-24 bg-neuropen-background border-neuropen-border text-neuropen-text"
                />
              </div>
              
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" className="bg-neuropen-background border-neuropen-border text-neuropen-text hover:bg-neuropen-surface-lighter">
                  Historical Perspectives
                </Button>
                <Button variant="outline" className="bg-neuropen-background border-neuropen-border text-neuropen-text hover:bg-neuropen-surface-lighter">
                  Disciplinary Approaches
                </Button>
                <Button variant="outline" className="bg-neuropen-background border-neuropen-border text-neuropen-text hover:bg-neuropen-surface-lighter">
                  Opposing Viewpoints
                </Button>
                <Button variant="outline" className="bg-neuropen-background border-neuropen-border text-neuropen-text hover:bg-neuropen-surface-lighter">
                  Cultural Contexts
                </Button>
              </div>
              
              <Button className="w-full bg-neuropen-primary hover:bg-neuropen-primary/90 text-black">
                Generate Perspectives
              </Button>
              
              <div className="p-5 bg-neuropen-background rounded-md">
                <h3 className="text-lg font-medium text-neuropen-text mb-3">Preview</h3>
                <p className="text-neuropen-text mb-4">Enter a topic above to explore different perspectives</p>
                <p className="text-xs text-neuropen-muted italic">Generated perspectives will appear here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="analogies" className="mt-4">
          <Card className="bg-neuropen-surface border-neuropen-border">
            <CardHeader>
              <CardTitle className="text-neuropen-text flex items-center gap-2">
                <ArrowRightLeft className="h-5 w-5 text-neuropen-primary" />
                <span>Analogical Reasoning Support</span>
              </CardTitle>
              <CardDescription className="text-neuropen-muted">
                Find and create connections to familiar concepts
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="space-y-3">
                <label className="text-sm font-medium text-neuropen-text">Enter a complex concept you'd like to understand better:</label>
                <Input 
                  placeholder="e.g., Quantum Superposition" 
                  className="bg-neuropen-background border-neuropen-border text-neuropen-text"
                />
              </div>
              
              <div className="space-y-3">
                <label className="text-sm font-medium text-neuropen-text">What domains are you familiar with?</label>
                <Input 
                  placeholder="e.g., Music, Sports, Cooking" 
                  className="bg-neuropen-background border-neuropen-border text-neuropen-text"
                />
                <p className="text-xs text-neuropen-muted">This helps generate analogies that connect to your existing knowledge</p>
              </div>
              
              <Button className="w-full bg-neuropen-primary hover:bg-neuropen-primary/90 text-black">
                Generate Analogies
              </Button>
              
              <div className="p-5 bg-neuropen-background rounded-md">
                <h3 className="text-lg font-medium text-neuropen-text mb-3">Preview</h3>
                <p className="text-neuropen-text mb-4">Enter a concept above to find helpful analogies</p>
                <p className="text-xs text-neuropen-muted italic">Generated analogies will appear here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default IntelligenceAmplification;
