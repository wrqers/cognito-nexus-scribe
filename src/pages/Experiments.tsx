
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
import { 
  FlaskConical, 
  Plus, 
  Search, 
  Filter, 
  BrainCircuit, 
  Network, 
  MessageCircle,
  Sparkles,
  Lightbulb
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { AnimatedIcon } from "../components/icons/AnimatedIcon";
import { NeuropenLoader } from "../components/NeuropenLoader";

const ExperimentCard = ({ 
  title, 
  description, 
  icon: Icon, 
  status, 
  progress = 0,
  onClick
}: { 
  title: string, 
  description: string, 
  icon: React.ElementType, 
  status: "coming-soon" | "alpha" | "beta" | "stable",
  progress?: number,
  onClick?: () => void
}) => {
  const getStatusBadge = () => {
    switch (status) {
      case "coming-soon":
        return <Badge variant="secondary" className="bg-neuropen-muted/10 text-neuropen-muted">Coming Soon</Badge>;
      case "alpha":
        return <Badge variant="secondary" className="bg-neuropen-accent-purple/20 text-neuropen-accent-purple">Alpha</Badge>;
      case "beta":
        return <Badge variant="secondary" className="bg-neuropen-accent-blue/20 text-neuropen-accent-blue">Beta</Badge>;
      case "stable":
        return <Badge variant="secondary" className="bg-neuropen-accent-green/20 text-neuropen-accent-green">Stable</Badge>;
    }
  };
  
  return (
    <Card className="bg-neuropen-surface border-neuropen-border hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div className="p-2 bg-neuropen-accent-blue/10 rounded-md">
            <Icon className="h-5 w-5 text-neuropen-accent-blue" />
          </div>
          {getStatusBadge()}
        </div>
        <CardTitle className="text-lg font-medium text-neuropen-text mt-2">{title}</CardTitle>
        <CardDescription className="text-neuropen-muted">{description}</CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        {progress > 0 && (
          <div className="mb-4">
            <div className="flex justify-between text-xs mb-1">
              <span>Development Progress</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full"
          disabled={status === "coming-soon"}
          onClick={onClick}
          variant={status === "coming-soon" ? "ghost" : "default"}
        >
          {status === "coming-soon" ? "Coming Soon" : "Try Now"}
        </Button>
      </CardFooter>
    </Card>
  );
};

const RAGDemoInterface = ({ onBack }: { onBack: () => void }) => {
  const [query, setQuery] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [response, setResponse] = useState<string | null>(null);
  
  const handleDemoQuery = () => {
    if (!query) return;
    
    setIsProcessing(true);
    setResponse(null);
    
    // Simulate RAG pipeline processing
    setTimeout(() => {
      setIsProcessing(false);
      setResponse(
        "The concept of local-first software combines the responsiveness of local applications with the collaboration features of cloud services. By storing data locally first and then syncing with the cloud when available, local-first software ensures users can work effectively regardless of internet connectivity.\n\nThis approach provides several benefits:\n\n1. **Responsiveness**: Applications remain fast as they don't depend on network latency\n2. **Resilience**: Work continues uninterrupted during network outages\n3. **User autonomy**: Data remains under user control\n\nThe key technical challenge is conflict resolution when changes are made across multiple devices while offline. This is typically solved using Conflict-free Replicated Data Types (CRDTs) or Operational Transformation."
      );
    }, 2500);
  };
  
  return (
    <Card className="bg-neuropen-surface border-neuropen-border">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-medium text-neuropen-text">RAG Pipeline Demo</CardTitle>
          <Button variant="outline" size="sm" onClick={onBack}>
            Back to Experiments
          </Button>
        </div>
        <CardDescription>
          Experience a Retrieval Augmented Generation pipeline that provides AI responses enhanced with context from your knowledge base.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Enter a query about any concept:</label>
          <div className="flex gap-2">
            <Input 
              value={query} 
              onChange={(e) => setQuery(e.target.value)} 
              placeholder="e.g., Explain local-first software and its benefits"
              className="flex-1"
            />
            <Button 
              onClick={handleDemoQuery} 
              disabled={isProcessing || !query.trim()} 
              className="bg-neuropen-primary hover:bg-neuropen-primary/90"
            >
              {isProcessing ? "Processing" : "Generate"}
            </Button>
          </div>
        </div>
        
        {isProcessing && (
          <div className="py-8 flex flex-col items-center justify-center">
            <NeuropenLoader size="lg" variant="primary" />
            <div className="mt-4 text-center">
              <h4 className="font-medium mb-1">Processing Your Query</h4>
              <p className="text-sm text-neuropen-muted">Retrieving context and generating response...</p>
            </div>
          </div>
        )}
        
        {response && !isProcessing && (
          <div className="border rounded-lg p-4 bg-white dark:bg-slate-900">
            <h4 className="font-medium mb-3 flex items-center">
              <AnimatedIcon 
                animateOnHover="pulse" 
                hoverColor="#6366F1"
              >
                <Sparkles className="h-4 w-4 mr-2 text-neuropen-accent-blue" />
              </AnimatedIcon>
              AI Response
            </h4>
            <div className="prose dark:prose-invert max-w-none">
              {response.split('\n\n').map((paragraph, i) => (
                <p key={i} className="mb-4">{paragraph}</p>
              ))}
            </div>
            
            <div className="mt-6 pt-4 border-t">
              <h5 className="text-sm font-medium mb-2">Context Sources</h5>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="bg-neuropen-surface/50">Local-First Software (Note)</Badge>
                <Badge variant="outline" className="bg-neuropen-surface/50">Distributed Systems.pdf (p. 42-45)</Badge>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

const ExperimentsPage = () => {
  const [activeExperiment, setActiveExperiment] = useState<string | null>(null);
  
  const experiments = [
    {
      id: "rag-pipeline",
      title: "RAG Pipeline",
      description: "Experience how AI uses your knowledge to provide better answers.",
      icon: BrainCircuit,
      status: "beta" as const,
      progress: 80
    },
    {
      id: "mind-mapping",
      title: "AI Mind Mapping",
      description: "Automatically generate visual mind maps from your notes and concepts.",
      icon: Network,
      status: "alpha" as const,
      progress: 60
    },
    {
      id: "socratic-tutor",
      title: "Socratic Tutor",
      description: "An AI tutor that asks probing questions to deepen your understanding.",
      icon: MessageCircle,
      status: "alpha" as const,
      progress: 40
    },
    {
      id: "concept-linker",
      title: "Concept Linker",
      description: "Discover connections between concepts across your knowledge base.",
      icon: Lightbulb,
      status: "coming-soon" as const,
      progress: 20
    }
  ];
  
  if (activeExperiment === "rag-pipeline") {
    return <RAGDemoInterface onBack={() => setActiveExperiment(null)} />;
  }
  
  return (
    <div className="flex flex-col gap-4">
      <section className="mb-4">
        <h1 className="text-3xl font-bold text-neuropen-text mb-2">Neural Experiments</h1>
        <p className="text-neuropen-muted">Test new learning approaches and AI capabilities.</p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {experiments.map(exp => (
          <ExperimentCard 
            key={exp.id}
            title={exp.title}
            description={exp.description}
            icon={exp.icon}
            status={exp.status}
            progress={exp.progress}
            onClick={() => setActiveExperiment(exp.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default ExperimentsPage;
