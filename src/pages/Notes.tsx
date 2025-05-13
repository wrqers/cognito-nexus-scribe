
import React, { useState } from "react";
import { 
  Card, 
  CardContent
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Filter, 
  Plus, 
  FileText, 
  Calendar, 
  Tag, 
  Check, 
  Clock,
  Link as LinkIcon,
  Pencil
} from "lucide-react";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from "@/components/ui/collapsible";

// Sample note data
const notesData = [
  {
    id: 1,
    title: "Quantum Entanglement",
    content: "Quantum entanglement is a physical phenomenon that occurs when a group of particles are generated...",
    created: "2025-05-10T10:30:00",
    tags: ["Physics", "Quantum", "Research"],
    links: 3
  },
  {
    id: 2,
    title: "Neural Networks Architecture",
    content: "The architecture of neural networks consists of input layers, hidden layers, and output layers...",
    created: "2025-05-08T14:15:00",
    tags: ["AI", "Machine Learning", "Computer Science"],
    links: 5
  }
];

const NoteCard = ({ note }: { note: typeof notesData[0] }) => {
  const date = new Date(note.created);
  const formattedDate = `${date.toLocaleDateString()} at ${date.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}`;
  
  return (
    <Card className="mb-4 border-neuropen-border bg-neuropen-surface hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-semibold text-neuropen-text">{note.title}</h3>
          <Button variant="ghost" size="sm" className="p-1 h-8 w-8">
            <Pencil className="h-4 w-4" />
          </Button>
        </div>
        <p className="text-neuropen-muted mt-2 line-clamp-2">{note.content}</p>
        <div className="flex items-center text-xs text-neuropen-muted mt-3 gap-2">
          <Clock className="h-3 w-3" />
          <span>{formattedDate}</span>
        </div>
        <div className="flex flex-wrap gap-2 mt-3">
          {note.tags.map((tag, i) => (
            <Badge 
              key={i} 
              variant="secondary" 
              className="bg-neuropen-accent-blue/10 text-neuropen-accent-blue text-xs"
            >
              {tag}
            </Badge>
          ))}
        </div>
        <div className="flex justify-between items-center mt-3 pt-3 border-t border-neuropen-border">
          <span className="text-xs flex items-center gap-1 text-neuropen-muted">
            <LinkIcon className="h-3 w-3" /> {note.links} connections
          </span>
          <Button variant="outline" size="sm" className="h-7 text-xs border-neuropen-border">
            View Note
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

const NotesPage = () => {
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortOption, setSortOption] = useState("newest");

  return (
    <div className="flex flex-col gap-4">
      <section className="mb-4">
        <h1 className="text-3xl font-bold text-neuropen-text mb-2">Notes</h1>
        <p className="text-neuropen-muted">Organize your knowledge and connect ideas.</p>
      </section>

      <div className="flex items-center gap-2 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-neuropen-muted h-4 w-4" />
          <Input 
            className="pl-8 bg-neuropen-surface border-neuropen-border text-neuropen-text"
            placeholder="Search notes..." 
          />
        </div>
        <Popover open={filterOpen} onOpenChange={setFilterOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" className="border-neuropen-border">
              <Filter className="h-4 w-4 mr-2" /> Filter
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-72 p-4">
            <h4 className="font-medium mb-3">Filter Notes</h4>
            
            <div className="mb-4">
              <h5 className="text-sm font-medium mb-2 flex items-center gap-1">
                <Tag className="h-3 w-3" /> Tags
              </h5>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Checkbox id="tag-physics" />
                  <Label htmlFor="tag-physics">Physics</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox id="tag-ai" />
                  <Label htmlFor="tag-ai">AI</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox id="tag-research" />
                  <Label htmlFor="tag-research">Research</Label>
                </div>
              </div>
            </div>
            
            <div className="mb-4">
              <h5 className="text-sm font-medium mb-2 flex items-center gap-1">
                <Calendar className="h-3 w-3" /> Date Range
              </h5>
              <div className="grid grid-cols-2 gap-2">
                <Input type="date" className="text-xs" placeholder="From" />
                <Input type="date" className="text-xs" placeholder="To" />
              </div>
            </div>
            
            <div className="pt-2 border-t">
              <Button 
                onClick={() => setFilterOpen(false)} 
                className="bg-neuropen-primary hover:bg-neuropen-primary/90 w-full"
              >
                <Check className="h-4 w-4 mr-2" /> Apply Filters
              </Button>
            </div>
          </PopoverContent>
        </Popover>
        <Button className="bg-neuropen-primary hover:bg-neuropen-primary/90">
          <Plus className="h-4 w-4 mr-2" /> New Note
        </Button>
      </div>

      <Collapsible className="mb-4">
        <div className="flex justify-between items-center bg-neuropen-surface border border-neuropen-border rounded-lg p-2 px-4">
          <div className="flex items-center gap-2">
            <span className="text-sm">Sort by:</span>
            <RadioGroup 
              defaultValue={sortOption}
              onValueChange={setSortOption}
              className="flex items-center gap-4"
            >
              <div className="flex items-center gap-1.5">
                <RadioGroupItem id="sort-newest" value="newest" />
                <Label htmlFor="sort-newest" className="text-sm">Newest</Label>
              </div>
              <div className="flex items-center gap-1.5">
                <RadioGroupItem id="sort-oldest" value="oldest" />
                <Label htmlFor="sort-oldest" className="text-sm">Oldest</Label>
              </div>
              <div className="flex items-center gap-1.5">
                <RadioGroupItem id="sort-az" value="az" />
                <Label htmlFor="sort-az" className="text-sm">A-Z</Label>
              </div>
            </RadioGroup>
          </div>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm">
              Advanced Options
            </Button>
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent className="bg-neuropen-surface border-x border-b border-neuropen-border rounded-b-lg p-4 space-y-2">
          <div className="flex items-center gap-2">
            <Checkbox id="show-archived" />
            <Label htmlFor="show-archived">Show archived notes</Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="show-linked-only" />
            <Label htmlFor="show-linked-only">Show only notes with connections</Label>
          </div>
        </CollapsibleContent>
      </Collapsible>

      {notesData.length > 0 ? (
        <div>
          {notesData.map(note => (
            <NoteCard key={note.id} note={note} />
          ))}
        </div>
      ) : (
        <Card className="bg-neuropen-surface border-neuropen-border h-[400px] flex flex-col items-center justify-center">
          <FileText className="h-16 w-16 text-neuropen-muted mb-4" />
          <h3 className="text-xl font-medium text-neuropen-text mb-2">No Notes Yet</h3>
          <p className="text-neuropen-muted text-center max-w-md mb-4">
            Start creating notes to organize your knowledge and build your personal knowledge base.
          </p>
          <Button className="bg-neuropen-primary hover:bg-neuropen-primary/90">
            Create Your First Note
          </Button>
        </Card>
      )}
    </div>
  );
};

export default NotesPage;
