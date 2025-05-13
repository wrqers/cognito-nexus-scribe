
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
  Pencil,
  ExternalLink
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
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";

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

interface NoteCardProps {
  note: typeof notesData[0];
  onOpenInNewTab: (noteId: number) => void;
  onEdit: (noteId: number) => void;
}

const NoteCard = ({ note, onOpenInNewTab, onEdit }: NoteCardProps) => {
  const date = new Date(note.created);
  const formattedDate = `${date.toLocaleDateString()} at ${date.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}`;
  
  return (
    <Card className="mb-4 border-neuropen-border bg-neuropen-surface hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-semibold text-neuropen-text">{note.title}</h3>
          <div className="flex gap-1">
            <Button variant="ghost" size="sm" className="p-1 h-8 w-8" onClick={() => onEdit(note.id)}>
              <Pencil className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="p-1 h-8 w-8" onClick={() => onOpenInNewTab(note.id)}>
              <ExternalLink className="h-4 w-4" />
            </Button>
          </div>
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
          <Button 
            variant="outline" 
            size="sm" 
            className="h-7 text-xs border-neuropen-border"
            onClick={() => onOpenInNewTab(note.id)}
          >
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
  const [isNoteDialogOpen, setIsNoteDialogOpen] = useState(false);
  const [newNoteTitle, setNewNoteTitle] = useState("");
  const [newNoteContent, setNewNoteContent] = useState("");
  const [newNoteTags, setNewNoteTags] = useState("");
  const [editingNoteId, setEditingNoteId] = useState<number | null>(null);
  const [notes, setNotes] = useState(notesData);

  const handleCreateNote = () => {
    setEditingNoteId(null);
    setNewNoteTitle("");
    setNewNoteContent("");
    setNewNoteTags("");
    setIsNoteDialogOpen(true);
  };

  const handleEditNote = (noteId: number) => {
    const note = notes.find(n => n.id === noteId);
    if (note) {
      setEditingNoteId(noteId);
      setNewNoteTitle(note.title);
      setNewNoteContent(note.content);
      setNewNoteTags(note.tags.join(", "));
      setIsNoteDialogOpen(true);
    }
  };

  const handleSaveNote = () => {
    if (!newNoteTitle.trim()) return;

    if (editingNoteId) {
      // Edit existing note
      setNotes(notes.map(note => 
        note.id === editingNoteId ? {
          ...note,
          title: newNoteTitle,
          content: newNoteContent,
          tags: newNoteTags.split(",").map(tag => tag.trim()).filter(tag => tag)
        } : note
      ));

      toast({
        title: "Note Updated",
        description: `Updated note: "${newNoteTitle}"`,
      });
    } else {
      // Create new note
      const newNote = {
        id: Date.now(),
        title: newNoteTitle,
        content: newNoteContent,
        created: new Date().toISOString(),
        tags: newNoteTags.split(",").map(tag => tag.trim()).filter(tag => tag),
        links: 0
      };

      setNotes([newNote, ...notes]);

      toast({
        title: "Note Created",
        description: `Created note: "${newNoteTitle}"`,
      });
    }

    setIsNoteDialogOpen(false);
  };

  const handleOpenNoteInNewTab = (noteId: number) => {
    const note = notes.find(n => n.id === noteId);
    if (note) {
      // In a real app, we'd navigate to a dedicated note page
      // For now, we'll simulate it by opening a new window with note data
      const noteUrl = `/notes/${noteId}`;
      window.open(noteUrl, '_blank');
      
      toast({
        title: "Note Opened",
        description: `Opened "${note.title}" in new tab`,
      });
    }
  };

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
        <Button 
          className="bg-neuropen-primary hover:bg-neuropen-primary/90"
          onClick={handleCreateNote}
        >
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

      {notes.length > 0 ? (
        <div>
          {notes.map(note => (
            <NoteCard 
              key={note.id} 
              note={note} 
              onOpenInNewTab={handleOpenNoteInNewTab}
              onEdit={handleEditNote}
            />
          ))}
        </div>
      ) : (
        <Card className="bg-neuropen-surface border-neuropen-border h-[400px] flex flex-col items-center justify-center">
          <FileText className="h-16 w-16 text-neuropen-muted mb-4" />
          <h3 className="text-xl font-medium text-neuropen-text mb-2">No Notes Yet</h3>
          <p className="text-neuropen-muted text-center max-w-md mb-4">
            Start creating notes to organize your knowledge and build your personal knowledge base.
          </p>
          <Button 
            className="bg-neuropen-primary hover:bg-neuropen-primary/90"
            onClick={handleCreateNote}
          >
            Create Your First Note
          </Button>
        </Card>
      )}

      {/* Note Dialog for creating/editing */}
      <Dialog open={isNoteDialogOpen} onOpenChange={setIsNoteDialogOpen}>
        <DialogContent className="bg-neuropen-surface border-neuropen-border max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editingNoteId ? "Edit Note" : "Create Note"}</DialogTitle>
            <DialogDescription>
              {editingNoteId ? "Edit your note details" : "Add a new note to your knowledge base"}
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={newNoteTitle}
                onChange={(e) => setNewNoteTitle(e.target.value)}
                placeholder="Note title"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="content">Content</Label>
              <textarea
                id="content"
                value={newNoteContent}
                onChange={(e) => setNewNoteContent(e.target.value)}
                placeholder="Note content"
                className="min-h-[200px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="tags">Tags (comma separated)</Label>
              <Input
                id="tags"
                value={newNoteTags}
                onChange={(e) => setNewNoteTags(e.target.value)}
                placeholder="AI, Machine Learning, Research"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsNoteDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveNote}>
              {editingNoteId ? "Save Changes" : "Create Note"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default NotesPage;
