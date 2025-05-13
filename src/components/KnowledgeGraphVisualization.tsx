
import React, { useEffect, useRef } from 'react';
import { Network, Search, Filter, Plus, ZoomIn, ZoomOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { gsap } from 'gsap';

// This is a simplified mock knowledge graph
// In a production app, this would be generated from actual user data
interface Node {
  id: string;
  label: string;
  group: string;
}

interface Edge {
  from: string;
  to: string;
  label?: string;
}

interface KnowledgeGraphVisualizationProps {
  isEmpty?: boolean;
  onCreateNode?: () => void;
}

export const KnowledgeGraphVisualization: React.FC<KnowledgeGraphVisualizationProps> = ({ 
  isEmpty = true,
  onCreateNode 
}) => {
  const canvasRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (isEmpty || !canvasRef.current) return;
    
    const container = canvasRef.current;
    
    // Mock nodes
    const nodes: Node[] = [
      { id: '1', label: 'Quantum Physics', group: 'physics' },
      { id: '2', label: 'Wave Function', group: 'physics' },
      { id: '3', label: 'Superposition', group: 'physics' },
      { id: '4', label: 'Machine Learning', group: 'ai' },
      { id: '5', label: 'Neural Networks', group: 'ai' },
      { id: '6', label: 'Philosophy of Mind', group: 'philosophy' }
    ];
    
    // Mock edges
    const edges: Edge[] = [
      { from: '1', to: '2' },
      { from: '1', to: '3' },
      { from: '4', to: '5' },
      { from: '1', to: '6', label: 'relates to' }
    ];
    
    // Create a simple visualization
    // In a production app, use a proper graph visualization library like vis.js or react-force-graph
    
    // Clear any previous content
    container.innerHTML = '';
    
    const width = container.offsetWidth;
    const height = container.offsetHeight;
    
    // Create node elements
    nodes.forEach((node) => {
      const nodeEl = document.createElement('div');
      nodeEl.className = `absolute rounded-full flex items-center justify-center text-xs font-medium p-2 transition-all duration-300 cursor-pointer hover:scale-110`;
      
      // Set color based on group
      switch(node.group) {
        case 'physics':
          nodeEl.className += ' bg-neuropen-accent-blue/20 text-neuropen-accent-blue border border-neuropen-accent-blue/30';
          break;
        case 'ai':
          nodeEl.className += ' bg-neuropen-accent-purple/20 text-neuropen-accent-purple border border-neuropen-accent-purple/30';
          break;
        case 'philosophy':
          nodeEl.className += ' bg-neuropen-accent-green/20 text-neuropen-accent-green border border-neuropen-accent-green/30';
          break;
        default:
          nodeEl.className += ' bg-neuropen-muted/20 text-neuropen-muted border border-neuropen-muted/30';
      }
      
      nodeEl.innerHTML = node.label;
      nodeEl.style.width = 'auto';
      nodeEl.style.minWidth = '80px';
      nodeEl.style.textAlign = 'center';
      
      // Random position (would be force-directed in a real implementation)
      const x = Math.random() * (width - 150) + 75;
      const y = Math.random() * (height - 150) + 75;
      
      nodeEl.style.left = `${x}px`;
      nodeEl.style.top = `${y}px`;
      nodeEl.setAttribute('data-node-id', node.id);
      
      // Animation
      gsap.from(nodeEl, {
        opacity: 0,
        scale: 0.5,
        duration: 0.5,
        delay: Math.random() * 0.5,
        ease: "back.out(1.5)"
      });
      
      container.appendChild(nodeEl);
    });
    
    // In a real app, edges would be SVG paths
    // This is just a simplified representation
    
    // Create a simulation effect using GSAP
    const nodeEls = container.querySelectorAll('[data-node-id]');
    
    nodeEls.forEach((nodeEl) => {
      // Create a slight floating animation for each node
      gsap.to(nodeEl, {
        y: "-=10",
        duration: 2 + Math.random() * 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    });
    
  }, [isEmpty]);
  
  if (isEmpty) {
    return (
      <div className="flex items-center justify-center min-h-[400px] border-2 border-dashed border-neuropen-border rounded-lg">
        <div className="text-center">
          <Network className="h-16 w-16 text-neuropen-muted mx-auto mb-4" />
          <h3 className="text-xl font-medium text-neuropen-text mb-2">Your Knowledge Graph</h3>
          <p className="text-neuropen-muted text-center max-w-md mb-4">
            Start adding notes and connections to visualize your knowledge network.
          </p>
          <Button
            className="bg-neuropen-primary hover:bg-neuropen-primary/90"
            onClick={onCreateNode}
          >
            Create Your First Node
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="relative min-h-[400px] border border-neuropen-border rounded-lg overflow-hidden bg-neuropen-surface/30">
      <div ref={canvasRef} className="absolute inset-0"></div>
    </div>
  );
};
