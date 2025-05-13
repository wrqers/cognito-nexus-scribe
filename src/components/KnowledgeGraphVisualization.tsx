
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
  graphCategory?: string;
}

export const KnowledgeGraphVisualization: React.FC<KnowledgeGraphVisualizationProps> = ({ 
  isEmpty = true,
  onCreateNode,
  graphCategory = 'general'
}) => {
  const canvasRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (isEmpty || !canvasRef.current) return;
    
    const container = canvasRef.current;
    
    // Clear any previous content
    container.innerHTML = '';
    
    // Mock nodes based on graph category
    const nodes: Node[] = getNodesForCategory(graphCategory);
    
    // Mock edges based on graph category
    const edges: Edge[] = getEdgesForCategory(graphCategory);
    
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
        case 'biology':
          nodeEl.className += ' bg-amber-100 text-amber-700 border border-amber-300';
          break;
        case 'history':
          nodeEl.className += ' bg-rose-100 text-rose-700 border border-rose-300';
          break;
        case 'mathematics':
          nodeEl.className += ' bg-indigo-100 text-indigo-700 border border-indigo-300';
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
    
  }, [isEmpty, graphCategory]);
  
  // Generate mock nodes based on graph category
  const getNodesForCategory = (category: string): Node[] => {
    switch (category) {
      case 'physics':
        return [
          { id: 'p1', label: 'Quantum Physics', group: 'physics' },
          { id: 'p2', label: 'Wave Function', group: 'physics' },
          { id: 'p3', label: 'Superposition', group: 'physics' },
          { id: 'p4', label: 'Relativity', group: 'physics' },
          { id: 'p5', label: 'Quantum Field Theory', group: 'physics' }
        ];
      case 'ai':
        return [
          { id: 'ai1', label: 'Machine Learning', group: 'ai' },
          { id: 'ai2', label: 'Neural Networks', group: 'ai' },
          { id: 'ai3', label: 'Deep Learning', group: 'ai' },
          { id: 'ai4', label: 'Natural Language Processing', group: 'ai' },
          { id: 'ai5', label: 'Reinforcement Learning', group: 'ai' }
        ];
      case 'philosophy':
        return [
          { id: 'ph1', label: 'Epistemology', group: 'philosophy' },
          { id: 'ph2', label: 'Metaphysics', group: 'philosophy' },
          { id: 'ph3', label: 'Ethics', group: 'philosophy' },
          { id: 'ph4', label: 'Philosophy of Mind', group: 'philosophy' }
        ];
      case 'mathematics':
        return [
          { id: 'm1', label: 'Calculus', group: 'mathematics' },
          { id: 'm2', label: 'Algebra', group: 'mathematics' },
          { id: 'm3', label: 'Geometry', group: 'mathematics' },
          { id: 'm4', label: 'Number Theory', group: 'mathematics' }
        ];
      case 'biology':
        return [
          { id: 'b1', label: 'Genetics', group: 'biology' },
          { id: 'b2', label: 'Cell Biology', group: 'biology' },
          { id: 'b3', label: 'Ecology', group: 'biology' },
          { id: 'b4', label: 'Evolution', group: 'biology' }
        ];
      case 'history':
        return [
          { id: 'h1', label: 'Ancient History', group: 'history' },
          { id: 'h2', label: 'Medieval Period', group: 'history' },
          { id: 'h3', label: 'Modern History', group: 'history' },
          { id: 'h4', label: 'World Wars', group: 'history' }
        ];
      default:
        return [
          { id: '1', label: 'Main Concept', group: 'general' },
          { id: '2', label: 'Related Idea', group: 'general' },
          { id: '3', label: 'Supporting Theory', group: 'general' },
          { id: '4', label: 'Application', group: 'general' }
        ];
    }
  };
  
  // Generate mock edges based on graph category
  const getEdgesForCategory = (category: string): Edge[] => {
    switch (category) {
      case 'physics':
        return [
          { from: 'p1', to: 'p2' },
          { from: 'p1', to: 'p3' },
          { from: 'p2', to: 'p5', label: 'extends' },
          { from: 'p4', to: 'p5', label: 'complements' }
        ];
      case 'ai':
        return [
          { from: 'ai1', to: 'ai2' },
          { from: 'ai2', to: 'ai3' },
          { from: 'ai1', to: 'ai5', label: 'includes' },
          { from: 'ai4', to: 'ai3', label: 'uses' }
        ];
      case 'philosophy':
        return [
          { from: 'ph1', to: 'ph2' },
          { from: 'ph2', to: 'ph3' },
          { from: 'ph3', to: 'ph4', label: 'informs' },
          { from: 'ph1', to: 'ph4', label: 'supports' }
        ];
      default:
        return [
          { from: '1', to: '2' },
          { from: '1', to: '3' },
          { from: '2', to: '4', label: 'influences' }
        ];
    }
  };
  
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
