
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
import { BookText, Plus, Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";

const FlashcardsPage = () => {
  return (
    <div className="flex flex-col gap-4">
      <section className="mb-4">
        <h1 className="text-3xl font-bold text-neuropen-text mb-2">Flashcards</h1>
        <p className="text-neuropen-muted">Study with adaptive spaced repetition.</p>
      </section>

      <div className="flex items-center gap-2 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-neuropen-muted h-4 w-4" />
          <Input 
            className="pl-8 bg-neuropen-surface border-neuropen-border text-neuropen-text"
            placeholder="Search flashcard decks..." 
          />
        </div>
        <Button className="bg-neuropen-primary hover:bg-neuropen-primary/90">
          <Plus className="h-4 w-4 mr-2" /> New Deck
        </Button>
      </div>

      <Card className="bg-neuropen-surface border-neuropen-border h-[400px] flex flex-col items-center justify-center">
        <BookText className="h-16 w-16 text-neuropen-muted mb-4" />
        <h3 className="text-xl font-medium text-neuropen-text mb-2">Your Flashcard Decks</h3>
        <p className="text-neuropen-muted text-center max-w-md mb-4">
          Create your first flashcard deck to start studying with spaced repetition.
        </p>
        <Button className="bg-neuropen-primary hover:bg-neuropen-primary/90">
          Create Your First Deck
        </Button>
      </Card>
    </div>
  );
};

export default FlashcardsPage;
