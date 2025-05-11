
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LayoutDashboard, Brain, LibraryBig, FileText, BookOpen, BookText, FlaskConical } from "lucide-react";

const Index = () => {
  const featureCards = [
    {
      title: "Knowledge Graph",
      description: "Visualize connections between concepts",
      icon: Brain,
      route: "/graph"
    },
    {
      title: "Study Materials",
      description: "Organize and access your learning resources",
      icon: LibraryBig,
      route: "/materials"
    },
    {
      title: "Notes",
      description: "Capture and organize your thoughts",
      icon: FileText,
      route: "/notes"
    },
    {
      title: "Reader",
      description: "Read and annotate your documents",
      icon: BookOpen,
      route: "/reader"
    },
    {
      title: "Flashcards",
      description: "Reinforce your learning with spaced repetition",
      icon: BookText,
      route: "/flashcards"
    },
    {
      title: "Experiments",
      description: "Test new learning approaches",
      icon: FlaskConical,
      route: "/experiments"
    }
  ];

  return (
    <div className="flex flex-col gap-6">
      <section className="mb-2">
        <h1 className="text-3xl font-bold text-neuropen-text mb-2">Dashboard</h1>
        <p className="text-neuropen-muted">Welcome to NeuroPen, your personal learning ecosystem.</p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {featureCards.map((card) => (
          <Card key={card.title} className="bg-neuropen-surface border-neuropen-border hover:border-neuropen-primary transition-colors">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-xl font-medium">{card.title}</CardTitle>
              <card.icon className="h-6 w-6 text-neuropen-primary" />
            </CardHeader>
            <CardContent>
              <p className="text-neuropen-muted">{card.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Index;
