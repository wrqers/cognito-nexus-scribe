
import React, { useState } from "react";
import { 
  Card, 
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  BrainCircuit,
  MessageSquare,
  BookPlus,
  FlaskConical,
  Sparkles,
  Network,
  BookOpen,
  Search,
  Loader2,
  ArrowRight,
  Send
} from "lucide-react";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AnimatedIcon } from "@/components/icons/AnimatedIcon";
import { NeuropenLoader } from "@/components/NeuropenLoader";

type MessageType = {
  id: number;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  thinking?: boolean;
  withContext?: boolean;
};

const IntelligenceAmplification = () => {
  const [activeTab, setActiveTab] = useState("chat");
  const [query, setQuery] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [messages, setMessages] = useState<MessageType[]>([
    {
      id: 1,
      type: 'assistant',
      content: "I'm your NeuroPen Intelligence Amplifier. How can I enhance your thinking today?",
      timestamp: new Date(),
    }
  ]);
  
  const handleSendMessage = () => {
    if (!query.trim()) return;
    
    // Add user message
    const userMessage: MessageType = {
      id: messages.length + 1,
      type: 'user',
      content: query,
      timestamp: new Date()
    };
    
    setMessages([...messages, userMessage]);
    setQuery("");
    setIsThinking(true);
    
    // Simulate AI thinking and response
    setTimeout(() => {
      const aiThinking: MessageType = {
        id: messages.length + 2,
        type: 'assistant',
        content: "Searching your knowledge base for relevant context...",
        timestamp: new Date(),
        thinking: true
      };
      
      setMessages(prev => [...prev, aiThinking]);
      
      setTimeout(() => {
        // Replace thinking message with actual response
        setMessages(prev => {
          const newMessages = [...prev];
          const thinkingIndex = newMessages.findIndex(msg => msg.thinking);
          
          if (thinkingIndex !== -1) {
            newMessages.splice(thinkingIndex, 1);
          }
          
          newMessages.push({
            id: messages.length + 3,
            type: 'assistant',
            content: generateResponse(query),
            timestamp: new Date(),
            withContext: true
          });
          
          return newMessages;
        });
        
        setIsThinking(false);
      }, 2000);
    }, 1000);
  };
  
  // Generate mock responses based on user query
  const generateResponse = (query: string): string => {
    if (query.toLowerCase().includes("quantum")) {
      return "Based on your notes on quantum physics, quantum entanglement represents one of the most fascinating phenomena in quantum mechanics. The principle of superposition allows quantum systems to exist in multiple states simultaneously until measured.\n\nThis connects to your recent interest in quantum computing, where entanglement and superposition enable computational advantages impossible in classical computing. Would you like me to elaborate on these connections or explore how this relates to the quantum information theory you were studying last week?";
    } else if (query.toLowerCase().includes("neural") || query.toLowerCase().includes("ai")) {
      return "Drawing from your notes on neural networks, I notice you've been exploring transformer architectures. The attention mechanism you highlighted in your recent reading is central to large language models.\n\nYour knowledge graph shows interesting connections between your AI studies and your notes on cognitive science, particularly regarding representational learning. This interdisciplinary connection might be worth exploring further. Would you like me to help you synthesize these ideas?";
    } else {
      return "I've synthesized information from your knowledge base on this topic. The concept you're exploring connects to several areas in your notes. I notice patterns in your learning that suggest this relates to your work on systems thinking.\n\nYour previous notes on this subject highlighted three key principles that might be relevant to your current inquiry. Would you like me to elaborate on these connections or suggest related concepts to explore?";
    }
  };
  
  return (
    <div className="flex flex-col gap-4">
      <section className="mb-4">
        <h1 className="text-3xl font-bold text-neuropen-text mb-2">Intelligence Amplification</h1>
        <p className="text-neuropen-muted">Enhanced thinking tools powered by your knowledge base.</p>
      </section>
      
      <Card className="bg-neuropen-surface border-neuropen-border flex flex-col">
        <CardHeader className="pb-2">
          <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-3">
              <TabsTrigger value="chat">
                <MessageSquare className="h-4 w-4 mr-2" /> Neural Chat
              </TabsTrigger>
              <TabsTrigger value="synthesis">
                <BookPlus className="h-4 w-4 mr-2" /> Knowledge Synthesis
              </TabsTrigger>
              <TabsTrigger value="explore">
                <FlaskConical className="h-4 w-4 mr-2" /> Concept Explorer
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        
        <TabsContent value="chat" className="flex-1 mt-0">
          <CardContent className="flex flex-col h-[600px] p-0">
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4 pb-4">
                {messages.map((message) => (
                  <div 
                    key={message.id} 
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div 
                      className={`max-w-[80%] rounded-lg px-4 py-3 ${
                        message.type === 'user' 
                        ? 'bg-neuropen-primary text-white' 
                        : message.thinking 
                          ? 'bg-neuropen-surface/50 border border-neuropen-border' 
                          : 'bg-neuropen-surface border border-neuropen-border'
                      }`}
                    >
                      {message.thinking ? (
                        <div className="flex items-center">
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          <span>{message.content}</span>
                        </div>
                      ) : (
                        <>
                          {message.content.split('\n\n').map((paragraph, i) => (
                            <p key={i} className={`${i > 0 ? 'mt-3' : ''}`}>{paragraph}</p>
                          ))}
                          
                          {message.withContext && message.type === 'assistant' && (
                            <div className="mt-3 pt-2 border-t border-neuropen-border/30 text-xs text-neuropen-muted">
                              <div className="flex items-center">
                                <Search className="h-3 w-3 mr-1" />
                                <span>Context from your knowledge base</span>
                              </div>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            
            <div className="border-t border-neuropen-border p-4">
              <div className="flex gap-2">
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Ask anything or explore your knowledge..."
                  className="flex-1"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && !isThinking) {
                      handleSendMessage();
                    }
                  }}
                  disabled={isThinking}
                />
                <Button 
                  onClick={handleSendMessage} 
                  disabled={isThinking || !query.trim()} 
                  className="bg-neuropen-primary hover:bg-neuropen-primary/90"
                >
                  {isThinking ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </TabsContent>
        
        <TabsContent value="synthesis" className="flex-1 mt-0">
          <CardContent className="h-[600px] flex flex-col">
            <div className="mb-4">
              <h3 className="text-lg font-medium mb-1">Knowledge Synthesis</h3>
              <p className="text-sm text-neuropen-muted">
                Generate summaries, connections, and insights across your knowledge base.
              </p>
            </div>
            
            <Card className="border-neuropen-border bg-neuropen-surface/50 mb-4">
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-neuropen-primary" />
                    <h4 className="font-medium">Select Knowledge Sources</h4>
                  </div>
                  <div className="pl-7 space-y-2">
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="notes" className="rounded border-neuropen-border" />
                      <label htmlFor="notes">Notes (42)</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="documents" className="rounded border-neuropen-border" />
                      <label htmlFor="documents">Documents (8)</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="highlights" className="rounded border-neuropen-border" />
                      <label htmlFor="highlights">Highlights (56)</label>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-neuropen-border bg-neuropen-surface/50 mb-4 flex-1">
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Network className="h-5 w-5 text-neuropen-primary" />
                    <h4 className="font-medium">Synthesis Parameters</h4>
                  </div>
                  <div className="pl-7 space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm" htmlFor="synthesis-type">Synthesis Type</label>
                      <select 
                        id="synthesis-type" 
                        className="w-full rounded-md border border-neuropen-border bg-transparent p-2"
                      >
                        <option>Summary</option>
                        <option>Connections Map</option>
                        <option>Knowledge Gaps Analysis</option>
                        <option>Concept Extraction</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm" htmlFor="focus-area">Focus Area (Optional)</label>
                      <Input id="focus-area" placeholder="E.g., Quantum Computing, Neural Networks" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm" htmlFor="synthesis-depth">Synthesis Depth</label>
                      <input 
                        type="range" 
                        id="synthesis-depth" 
                        min="1" 
                        max="5" 
                        defaultValue="3" 
                        className="w-full" 
                      />
                      <div className="flex justify-between text-xs text-neuropen-muted">
                        <span>High-level</span>
                        <span>Detailed</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Button className="bg-neuropen-primary hover:bg-neuropen-primary/90">
              <Sparkles className="h-4 w-4 mr-2" /> Generate Synthesis
            </Button>
          </CardContent>
        </TabsContent>
        
        <TabsContent value="explore" className="flex-1 mt-0">
          <CardContent className="h-[600px]">
            <div className="flex flex-col items-center justify-center h-full">
              <AnimatedIcon animateOnHover="pulse">
                <BrainCircuit className="h-16 w-16 mb-4 text-neuropen-accent-purple" />
              </AnimatedIcon>
              <h3 className="text-xl font-medium mb-2">Concept Explorer</h3>
              <p className="text-neuropen-muted text-center max-w-md mb-8">
                Deeply explore concepts across your knowledge base by traversing connections and discovering new insights.
              </p>
              <div className="w-full max-w-md mb-6">
                <Input 
                  placeholder="Enter a concept to explore..." 
                  className="mb-3 bg-neuropen-surface"
                />
                <Button className="w-full bg-neuropen-primary hover:bg-neuropen-primary/90">
                  <Search className="h-4 w-4 mr-2" /> Start Exploration
                </Button>
              </div>
              <div className="text-sm text-neuropen-muted">
                Popular concepts: Quantum Computing, Neural Networks, Systems Thinking
              </div>
            </div>
          </CardContent>
        </TabsContent>
      </Card>
    </div>
  );
};

export default IntelligenceAmplification;
