
import React, { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Network, Search, Filter, Plus, ZoomIn, ZoomOut, FolderPlus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { KnowledgeGraphVisualization } from "@/components/KnowledgeGraphVisualization";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Define types for graph data
interface GraphData {
  id: string;
  name: string;
  category: string;
  isEmpty: boolean;
  tags: string[];
  created: Date;
}

const KnowledgeGraph = () => {
  const [zoomLevel, setZoomLevel] = useState([50]);
  const [isNodeDialogOpen, setIsNodeDialogOpen] = useState(false);
  const [isGraphDialogOpen, setIsGraphDialogOpen] = useState(false);
  const [newNodeName, setNewNodeName] = useState("");
  const [newNodeCategory, setNewNodeCategory] = useState("knowledge");
  const [newGraphName, setNewGraphName] = useState("");
  const [newGraphCategory, setNewGraphCategory] = useState("general");
  const [activeGraphId, setActiveGraphId] = useState<string | null>(null);

  // Sample knowledge graphs
  const [graphs, setGraphs] = useState<GraphData[]>([
    {
      id: "graph-1",
      name: "Physics Concepts",
      category: "physics",
      isEmpty: false,
      tags: ["Quantum Physics", "Mechanics", "Relativity"],
      created: new Date(2025, 4, 10)
    },
    {
      id: "graph-2",
      name: "Machine Learning",
      category: "ai",
      isEmpty: false,
      tags: ["Neural Networks", "Deep Learning", "Algorithms"],
      created: new Date(2025, 4, 12)
    }
  ]);

  const handleCreateNode = () => {
    setIsNodeDialogOpen(true);
  };
  
  const handleSaveNode = () => {
    if (newNodeName.trim()) {
      toast({
        title: "Node Created",
        description: `Added node "${newNodeName}" to ${getActiveGraph()?.name || "knowledge graph"}`,
      });
      setIsNodeDialogOpen(false);
      // If no active graph, activate the first one
      if (!activeGraphId && graphs.length > 0) {
        setActiveGraphId(graphs[0].id);
      }
      setNewNodeName("");
    }
  };

  const handleCreateGraph = () => {
    setIsGraphDialogOpen(true);
  };

  const handleSaveGraph = () => {
    if (newGraphName.trim()) {
      const newGraphId = `graph-${graphs.length + 1}`;
      const newGraph: GraphData = {
        id: newGraphId,
        name: newGraphName,
        category: newGraphCategory,
        isEmpty: true,
        tags: [],
        created: new Date()
      };
      
      setGraphs([...graphs, newGraph]);
      setActiveGraphId(newGraphId);
      
      toast({
        title: "Knowledge Graph Created",
        description: `Created new graph: "${newGraphName}"`,
      });
      
      setIsGraphDialogOpen(false);
      setNewGraphName("");
    }
  };

  const getActiveGraph = (): GraphData | undefined => {
    return graphs.find(graph => graph.id === activeGraphId);
  };

  const activeGraph = getActiveGraph();
  const showGraph = activeGraph?.isEmpty === false;

  return (
    <div className="flex flex-col gap-4">
      <section className="mb-4">
        <h1 className="text-3xl font-bold text-neuropen-text mb-2">Knowledge Graphs</h1>
        <p className="text-neuropen-muted">Visualize connections between your notes and concepts across different domains.</p>
      </section>

      <div className="flex items-center gap-2 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-neuropen-muted h-4 w-4" />
          <Input 
            className="pl-8 bg-neuropen-surface border-neuropen-border text-neuropen-text"
            placeholder="Search graphs or concepts..." 
          />
        </div>
        <Button variant="outline" className="border-neuropen-border">
          <Filter className="h-4 w-4 mr-2" /> Filter
        </Button>
        <Button 
          className="bg-neuropen-primary hover:bg-neuropen-primary/90"
          onClick={handleCreateGraph}
        >
          <FolderPlus className="h-4 w-4 mr-2" /> New Graph
        </Button>
        <Button 
          className="bg-neuropen-accent-purple hover:bg-neuropen-accent-purple/90 text-white"
          onClick={handleCreateNode}
          disabled={!activeGraphId}
        >
          <Plus className="h-4 w-4 mr-2" /> Add Node
        </Button>
      </div>

      {graphs.length > 0 ? (
        <Tabs 
          value={activeGraphId || graphs[0].id} 
          onValueChange={setActiveGraphId}
          className="w-full"
        >
          <TabsList className="mb-4 bg-neuropen-surface border border-neuropen-border w-full justify-start overflow-x-auto">
            {graphs.map((graph) => (
              <TabsTrigger 
                key={graph.id} 
                value={graph.id}
                className="data-[state=active]:bg-neuropen-primary/20"
              >
                {graph.name}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {graphs.map((graph) => (
            <TabsContent key={graph.id} value={graph.id} className="mt-0">
              <Card className="bg-neuropen-surface border-neuropen-border min-h-[500px] relative">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl font-medium text-neuropen-text flex justify-between items-center">
                    <span>{graph.name}</span>
                    <span className="text-sm text-neuropen-muted font-normal">
                      Created: {graph.created.toLocaleDateString()}
                    </span>
                  </CardTitle>
                  <div className="flex gap-2 mt-2">
                    {graph.tags.map((tag, i) => (
                      <Badge 
                        key={i} 
                        variant="secondary"
                        className={
                          graph.category === 'physics' ? "bg-neuropen-accent-blue/20 text-neuropen-accent-blue" :
                          graph.category === 'ai' ? "bg-neuropen-accent-purple/20 text-neuropen-accent-purple" :
                          "bg-neuropen-accent-green/20 text-neuropen-accent-green"
                        }
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardHeader>
                <CardContent className="pt-2">
                  <KnowledgeGraphVisualization 
                    isEmpty={graph.isEmpty} 
                    onCreateNode={handleCreateNode}
                    graphCategory={graph.category}
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
            </TabsContent>
          ))}
        </Tabs>
      ) : (
        <Card className="bg-neuropen-surface border-neuropen-border min-h-[500px] flex flex-col items-center justify-center">
          <Network className="h-16 w-16 text-neuropen-muted mb-4" />
          <h3 className="text-xl font-medium text-neuropen-text mb-2">No Knowledge Graphs Yet</h3>
          <p className="text-neuropen-muted text-center max-w-md mb-4">
            Start creating knowledge graphs to visualize connections between your notes and concepts.
          </p>
          <Button 
            className="bg-neuropen-primary hover:bg-neuropen-primary/90"
            onClick={handleCreateGraph}
          >
            Create Your First Graph
          </Button>
        </Card>
      )}
      
      {/* Node Creation Dialog */}
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
      
      {/* Graph Creation Dialog */}
      <Dialog open={isGraphDialogOpen} onOpenChange={setIsGraphDialogOpen}>
        <DialogContent className="bg-neuropen-surface border-neuropen-border">
          <DialogHeader>
            <DialogTitle>Create New Knowledge Graph</DialogTitle>
            <DialogDescription>
              Create a new graph to organize a specific domain of knowledge.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="graphName" className="text-right">
                Name
              </Label>
              <Input
                id="graphName"
                value={newGraphName}
                onChange={(e) => setNewGraphName(e.target.value)}
                className="col-span-3"
                placeholder="E.g., Computer Science Concepts"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="graphCategory" className="text-right">
                Domain
              </Label>
              <select
                id="graphCategory"
                value={newGraphCategory}
                onChange={(e) => setNewGraphCategory(e.target.value)}
                className="col-span-3 flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="general">General</option>
                <option value="physics">Physics</option>
                <option value="ai">Artificial Intelligence</option>
                <option value="philosophy">Philosophy</option>
                <option value="mathematics">Mathematics</option>
                <option value="biology">Biology</option>
                <option value="history">History</option>
              </select>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsGraphDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveGraph}>Create Graph</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default KnowledgeGraph;
