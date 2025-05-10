
import React from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Plus, Search, Filter, CalendarDays, Tag, Clock } from "lucide-react";
import { Input } from "@/components/ui/input";

const NotesPage = () => {
  // Sample notes data
  const notes = [
    {
      id: 1,
      title: "Understanding Deep Neural Networks",
      excerpt: "Key concepts and architectures of modern neural networks, including transformers and CNNs.",
      date: "May 8, 2025",
      tags: ["AI", "Deep Learning"]
    },
    {
      id: 2,
      title: "Cognitive Science Fundamentals",
      excerpt: "Exploring the intersection of psychology, neuroscience, linguistics, and AI.",
      date: "May 7, 2025",
      tags: ["Cognitive Science", "Psychology"]
    },
    {
      id: 3,
      title: "Advanced Data Structures",
      excerpt: "A comprehensive overview of trees, graphs, and their applications in computer science.",
      date: "May 5, 2025",
      tags: ["Computer Science", "Algorithms"]
    },
    {
      id: 4,
      title: "Quantum Computing Principles",
      excerpt: "Notes on quantum bits, quantum gates, and their implications for computational complexity.",
      date: "May 3, 2025",
      tags: ["Quantum Computing", "Physics"]
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      <section className="mb-4">
        <h1 className="text-3xl font-bold text-neuropen-text mb-2">Notes</h1>
        <p className="text-neuropen-muted">Capture and organize your thoughts and insights.</p>
      </section>

      <div className="flex items-center gap-2 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-neuropen-muted h-4 w-4" />
          <Input 
            className="pl-8 bg-neuropen-surface border-neuropen-border text-neuropen-text"
            placeholder="Search notes..." 
          />
        </div>
        <Button variant="outline" className="border-neuropen-border text-neuropen-text">
          <Filter className="h-4 w-4 mr-2" /> Filter
        </Button>
        <Button className="bg-neuropen-primary hover:bg-neuropen-primary/90">
          <Plus className="h-4 w-4 mr-2" /> New Note
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {notes.map(note => (
          <Card key={note.id} className="bg-neuropen-surface border-neuropen-border hover:border-neuropen-primary transition-colors cursor-pointer">
            <CardHeader>
              <CardTitle className="text-neuropen-text">{note.title}</CardTitle>
              <CardDescription className="text-neuropen-muted flex items-center gap-1">
                <CalendarDays className="h-3 w-3" /> {note.date}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-neuropen-text">{note.excerpt}</p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="flex gap-2">
                {note.tags.map((tag, index) => (
                  <span key={index} className="px-2 py-1 rounded-full text-xs bg-neuropen-primary/20 text-neuropen-accent">
                    {tag}
                  </span>
                ))}
              </div>
              <Button variant="ghost" size="icon" className="text-neuropen-muted hover:text-neuropen-text">
                <FileText className="h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default NotesPage;
