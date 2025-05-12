import React, { useRef, useEffect } from "react";
import { PageHeader } from "@/components/PageHeader";
import { AnimatedCard, CardContent, CardHeader, CardTitle } from "@/components/AnimatedCard";
import { CustomTooltip } from "@/components/CustomTooltip";
import { ParallaxBackground } from "@/components/ParallaxBackground";
import { Button } from "@/components/ui/button";
import { AnimatedButton } from "@/components/AnimatedButton";
import { Brain, Plus, Search, ConnectionsNet, ZoomIn, ZoomOut, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { gsap } from 'gsap';

const KnowledgeGraph = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    // Setup canvas
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const container = containerRef.current;
    
    // Set canvas size
    const resizeCanvas = () => {
      if (!canvas || !container) return;
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
    };
    
    // Create nodes
    const nodes = [
      { id: 1, x: 0.3, y: 0.3, radius: 20, label: 'AI', color: '#1EAEDB' },
      { id: 2, x: 0.7, y: 0.4, radius: 25, label: 'Neural Networks', color: '#9b87f5' },
      { id: 3, x: 0.5, y: 0.6, radius: 18, label: 'Algorithms', color: '#7DE2D1' },
      { id: 4, x: 0.2, y: 0.7, radius: 22, label: 'Data Structures', color: '#FFFFFF' },
      { id: 5, x: 0.8, y: 0.6, radius: 20, label: 'Machine Learning', color: '#9b87f5' },
      { id: 6, x: 0.6, y: 0.2, radius: 15, label: 'Ethics', color: '#7DE2D1' },
      { id: 7, x: 0.4, y: 0.8, radius: 17, label: 'Cognitive Science', color: '#1EAEDB' },
    ];
    
    // Create connections between nodes
    const connections = [
      { source: 1, target: 2 },
      { source: 1, target: 3 },
      { source: 1, target: 5 },
      { source: 1, target: 6 },
      { source: 2, target: 3 },
      { source: 2, target: 5 },
      { source: 3, target: 4 },
      { source: 5, target: 6 },
      { source: 4, target: 7 },
      { source: 7, target: 1 },
    ];
    
    // Initialize

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Animation frame
    let animationFrame: number;
    let mouseX = 0;
    let mouseY = 0;
    let time = 0;
    
    const animate = () => {
      if (!ctx || !canvas) return;
      
      time += 0.005;
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update node positions slightly for floating effect
      nodes.forEach(node => {
        node.x += Math.sin(time + node.id) * 0.0002;
        node.y += Math.cos(time + node.id * 0.5) * 0.0002;
        
        // Keep within bounds
        node.x = Math.max(0.1, Math.min(0.9, node.x));
        node.y = Math.max(0.1, Math.min(0.9, node.y));
      });
      
      // Draw connections
      ctx.lineWidth = 1;
      connections.forEach(conn => {
        const source = nodes.find(n => n.id === conn.source);
        const target = nodes.find(n => n.id === conn.target);
        
        if (source && target) {
          const sourceX = source.x * canvas.width;
          const sourceY = source.y * canvas.height;
          const targetX = target.x * canvas.width;
          const targetY = target.y * canvas.height;
          
          // Draw connection with gradient
          const gradient = ctx.createLinearGradient(sourceX, sourceY, targetX, targetY);
          gradient.addColorStop(0, source.color + '80');
          gradient.addColorStop(1, target.color + '80');
          
          ctx.strokeStyle = gradient;
          ctx.beginPath();
          ctx.moveTo(sourceX, sourceY);
          ctx.lineTo(targetX, targetY);
          ctx.stroke();
        }
      });
      
      // Draw nodes
      nodes.forEach(node => {
        const x = node.x * canvas.width;
        const y = node.y * canvas.height;
        
        // Node glow
        const glow = ctx.createRadialGradient(x, y, 0, x, y, node.radius * 2);
        glow.addColorStop(0, node.color + '40');
        glow.addColorStop(1, 'transparent');
        
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(x, y, node.radius * 2, 0, Math.PI * 2);
        ctx.fill();
        
        // Node circle
        ctx.fillStyle = node.color + '90';
        ctx.beginPath();
        ctx.arc(x, y, node.radius, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.strokeStyle = node.color;
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // Node label
        ctx.font = '12px Inter, sans-serif';
        ctx.fillStyle = '#FFFFFF';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(node.label, x, y);
      });
      
      animationFrame = requestAnimationFrame(animate);
    };
    
    animate();
    
    // Mouse interaction
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = (e.clientX - rect.left) / canvas.width;
      mouseY = (e.clientY - rect.top) / canvas.height;
    };
    
    canvas.addEventListener('mousemove', handleMouseMove);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrame);
    };
  }, []);
  
  return (
    <div className="flex flex-col gap-4">
      <ParallaxBackground particleCount={15} />
      
      <PageHeader
        title="Knowledge Graph"
        description="Explore connections between your knowledge nodes."
      />

      <div className="flex items-center gap-2 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-neuropen-muted h-4 w-4" />
          <Input 
            className="pl-8 bg-neuropen-surface border-neuropen-border text-neuropen-text focus-visible:ring-neuropen-primary focus:shadow-[0_0_10px_rgba(30,174,219,0.3)]"
            placeholder="Search knowledge nodes..." 
          />
        </div>
        <CustomTooltip content="Filter nodes">
          <Button variant="outline" className="border-neuropen-border text-neuropen-text">
            <Filter className="h-4 w-4" />
          </Button>
        </CustomTooltip>
        <CustomTooltip content="Zoom in">
          <Button variant="outline" className="border-neuropen-border text-neuropen-text">
            <ZoomIn className="h-4 w-4" />
          </Button>
        </CustomTooltip>
        <CustomTooltip content="Zoom out">
          <Button variant="outline" className="border-neuropen-border text-neuropen-text">
            <ZoomOut className="h-4 w-4" />
          </Button>
        </CustomTooltip>
        <AnimatedButton className="bg-neuropen-primary hover:bg-neuropen-primary/90 transition-all duration-300">
          <Plus className="h-4 w-4 mr-2" /> New Concept
        </AnimatedButton>
      </div>

      <AnimatedCard 
        className="bg-neuropen-surface border-neuropen-border h-[600px] flex flex-col relative overflow-hidden"
        animationType="fade-in"
      >
        <div ref={containerRef} className="absolute inset-0">
          <canvas ref={canvasRef} className="w-full h-full"></canvas>
        </div>
        
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          {/* Overlay for empty state, will be hidden when there's actual data */}
          <div className="hidden">
            <Brain className="h-16 w-16 text-neuropen-muted mb-4" />
            <h3 className="text-xl font-medium text-neuropen-text mb-2">Your Knowledge Graph Visualization</h3>
            <p className="text-neuropen-muted text-center max-w-md mb-4">
              This is where your interactive knowledge graph will appear as you add concepts, notes, and materials.
            </p>
            <Button className="bg-neuropen-primary hover:bg-neuropen-primary/90 pointer-events-auto">
              Get Started
            </Button>
          </div>
        </div>
      </AnimatedCard>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
        <AnimatedCard className="bg-neuropen-surface border-neuropen-border" delay={0.1}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-neuropen-muted">Total Nodes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-neuropen-primary">107</div>
          </CardContent>
        </AnimatedCard>
        
        <AnimatedCard className="bg-neuropen-surface border-neuropen-border" delay={0.2}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-neuropen-muted">Connections</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-neuropen-primary">243</div>
          </CardContent>
        </AnimatedCard>
        
        <AnimatedCard className="bg-neuropen-surface border-neuropen-border" delay={0.3}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-neuropen-muted">Main Subjects</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-neuropen-primary">12</div>
          </CardContent>
        </AnimatedCard>
        
        <AnimatedCard className="bg-neuropen-surface border-neuropen-border" delay={0.4}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-neuropen-muted">Knowledge Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-neuropen-primary">84%</div>
          </CardContent>
        </AnimatedCard>
      </div>
    </div>
  );
};

export default KnowledgeGraph;
