
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
import { KnowledgeGraphVisualization } from "@/components/KnowledgeGraphVisualization";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";

const KnowledgeGraph = () => {
  const [zoomLevel, setZoomLevel] = useState([50]);
  const [showGraph, setShowGraph] = useState(false);
  const [isNodeDialogOpen, setIsNodeDialogOpen] = useState(false);
  const [newNodeName, setNewNodeName] = useState("");
  const [newNodeCategory, setNewNodeCategory] = useState("knowledge");

  const handleCreateNode = () => {
    setIsNodeDialogOpen(true);
  };
  
  const handleSaveNode = () => {
    if (newNodeName.trim()) {
      toast({
        title: "Node Created",
        description: `Created node: "${newNodeName}" in category: ${newNodeCategory}`,
      });
      setIsNodeDialogOpen(false);
      setShowGraph(true);
      setNewNodeName("");
    }
  };

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
        <Button 
          className="bg-neuropen-primary hover:bg-neuropen-primary/90"
          onClick={handleCreateNode}
        >
          <Plus className="h-4 w-4 mr-2" /> New Node
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
          <KnowledgeGraphVisualization 
            isEmpty={!showGraph} 
            onCreateNode={handleCreateNode} 
          />
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
      
      <Dialog open={isNodeDialogOpen} onOpenChange={setIsNodeDialogOpen}>
        <DialogContent className="bg-neuropen-surface border-neuropen-border">
          <DialogHeader>
            <DialogTitle>Create New Node</DialogTitle>
            <DialogDescription>
              Add a new concept or idea to your knowledge graph.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={newNodeName}
                onChange={(e) => setNewNodeName(e.target.value)}
                className="col-span-3"
                placeholder="E.g., Quantum Entanglement"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category" className="text-right">
                Category
              </Label>
              <select
                id="category"
                value={newNodeCategory}
                onChange={(e) => setNewNodeCategory(e.target.value)}
                className="col-span-3 flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="physics">Physics</option>
                <option value="philosophy">Philosophy</option>
                <option value="ai">Artificial Intelligence</option>
                <option value="mathematics">Mathematics</option>
                <option value="knowledge">General Knowledge</option>
              </select>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsNodeDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveNode}>Create Node</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default KnowledgeGraph;
