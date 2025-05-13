
import React, { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Network, Search, Filter, Plus, ZoomIn, ZoomOut } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";

const KnowledgeGraph = () => {
  const [zoomLevel, setZoomLevel] = useState([50]);

  return (
    <div className="flex flex-col gap-4">
      <section className="mb-4">
        <h1 className="text-3xl font-bold text-neuropen-text mb-2">Knowledge Graph</h1>
        <p className="text-neuropen-muted">Visualize connections between your notes and concepts.</p>
      </section>

      <div className="flex items-center gap-2 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-neuropen-muted h-4 w-4" />
          <Input 
            className="pl-8 bg-neuropen-surface border-neuropen-border text-neuropen-text"
            placeholder="Search concepts..." 
          />
        </div>
        <Button variant="outline" className="border-neuropen-border">
          <Filter className="h-4 w-4 mr-2" /> Filter
        </Button>
        <Button className="bg-neuropen-primary hover:bg-neuropen-primary/90">
          <Plus className="h-4 w-4 mr-2" /> New Connection
        </Button>
      </div>

      <Card className="bg-neuropen-surface border-neuropen-border min-h-[500px] relative">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl font-medium text-neuropen-text">Concept Map</CardTitle>
          <div className="flex gap-2 mt-2">
            <Badge variant="secondary" className="bg-neuropen-accent-blue/20 text-neuropen-accent-blue">Quantum Physics</Badge>
            <Badge variant="secondary" className="bg-neuropen-accent-purple/20 text-neuropen-accent-purple">Machine Learning</Badge>
            <Badge variant="secondary" className="bg-neuropen-accent-green/20 text-neuropen-accent-green">Philosophy</Badge>
          </div>
        </CardHeader>
        <CardContent className="pt-2">
          <div className="flex items-center justify-center min-h-[400px] border-2 border-dashed border-neuropen-border rounded-lg">
            <div className="text-center">
              <Network className="h-16 w-16 text-neuropen-muted mx-auto mb-4" />
              <h3 className="text-xl font-medium text-neuropen-text mb-2">Your Knowledge Graph</h3>
              <p className="text-neuropen-muted text-center max-w-md mb-4">
                Start adding notes and connections to visualize your knowledge network.
              </p>
              <Button className="bg-neuropen-primary hover:bg-neuropen-primary/90">
                Create Your First Node
              </Button>
            </div>
          </div>
        </CardContent>
        <div className="absolute bottom-4 right-4 flex items-center gap-2 bg-neuropen-surface/80 backdrop-blur-sm p-2 rounded-md">
          <ZoomOut className="h-4 w-4 text-neuropen-muted" />
          <Slider 
            className="w-32" 
            value={zoomLevel} 
            onValueChange={setZoomLevel} 
            max={100} 
            step={1}
          />
          <ZoomIn className="h-4 w-4 text-neuropen-muted" />
        </div>
      </Card>
    </div>
  );
};

export default KnowledgeGraph;
