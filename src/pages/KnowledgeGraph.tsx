
import React from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const KnowledgeGraph = () => {
  return (
    <div className="flex flex-col gap-4">
      <section className="mb-4">
        <h1 className="text-3xl font-bold text-neuropen-text mb-2">Knowledge Graph</h1>
        <p className="text-neuropen-muted">Explore connections between your knowledge nodes.</p>
      </section>

      <div className="flex items-center gap-2 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-neuropen-muted h-4 w-4" />
          <Input 
            className="pl-8 bg-neuropen-surface border-neuropen-border text-neuropen-text"
            placeholder="Search knowledge nodes..." 
          />
        </div>
        <Button className="bg-neuropen-primary hover:bg-neuropen-primary/90">
          <Plus className="h-4 w-4 mr-2" /> New Concept
        </Button>
      </div>

      <Card className="bg-neuropen-surface border-neuropen-border h-[600px] flex flex-col items-center justify-center">
        <Brain className="h-16 w-16 text-neuropen-muted mb-4" />
        <h3 className="text-xl font-medium text-neuropen-text mb-2">Your Knowledge Graph Visualization</h3>
        <p className="text-neuropen-muted text-center max-w-md mb-4">
          This is where your interactive knowledge graph will appear as you add concepts, notes, and materials.
        </p>
        <Button className="bg-neuropen-primary hover:bg-neuropen-primary/90">
          Get Started
        </Button>
      </Card>
    </div>
  );
};

export default KnowledgeGraph;
