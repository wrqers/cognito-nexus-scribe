
import React, { useState } from "react";
import { 
  Card, 
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  BookText, 
  Plus, 
  Search, 
  Filter, 
  Clock,
  ChevronLeft,
  ChevronRight,
  Check,
  X,
  RotateCcw,
  Settings,
  Calendar
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";

// Simplified SM-2 algorithm implementation for spaced repetition
const calculateNextReview = (quality: number, currentInterval: number, easeFactor: number) => {
  let newEaseFactor = Math.max(1.3, easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02)));
  let newInterval: number;
  
  if (quality < 3) {
    // If response was poor, reset interval to 1
    newInterval = 1;
  } else if (currentInterval === 0) {
    newInterval = 1;
  } else if (currentInterval === 1) {
    newInterval = 6;
  } else {
    newInterval = Math.round(currentInterval * newEaseFactor);
  }
  
  const nextReviewDate = new Date();
  nextReviewDate.setDate(nextReviewDate.getDate() + newInterval);
  
  return {
    interval: newInterval,
    easeFactor: newEaseFactor,
    nextReview: nextReviewDate
  };
};

// Sample flashcard deck data
const deckData = {
  id: 1,
  title: "Quantum Physics Fundamentals",
  description: "Core concepts of quantum mechanics",
  totalCards: 42,
  dueCards: 8,
  lastStudied: "2025-05-12T15:30:00",
  progress: 65
};

const sampleFlashcards = [
  {
    id: 1,
    front: "What is quantum entanglement?",
    back: "Quantum entanglement is a physical phenomenon that occurs when a group of particles are generated, interact, or share spatial proximity in a way such that the quantum state of each particle of the group cannot be described independently of the state of the others, including when the particles are separated by a large distance.",
    interval: 4,
    easeFactor: 2.5,
    nextReview: new Date(2025, 4, 16)
  },
  {
    id: 2,
    front: "State the Heisenberg Uncertainty Principle",
    back: "The Heisenberg Uncertainty Principle states that it is impossible to simultaneously measure the position and momentum of a particle with absolute precision. The more precisely one quantity is measured, the less precisely the other can be measured.",
    interval: 2,
    easeFactor: 2.2,
    nextReview: new Date(2025, 4, 14)
  },
  {
    id: 3,
    front: "What is a quantum superposition?",
    back: "A quantum superposition is a fundamental principle of quantum mechanics that states that any two (or more) quantum states can be added together (superposed) and the result will be another valid quantum state. Conversely, that any quantum state can be represented as a sum of two or more distinct quantum states.",
    interval: 6,
    easeFactor: 2.7,
    nextReview: new Date(2025, 4, 18)
  }
];

const FlashcardStudyMode = ({ onBack }: { onBack: () => void }) => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [studiedCards, setStudiedCards] = useState<number[]>([]);
  
  const currentCard = sampleFlashcards[currentCardIndex];
  
  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };
  
  const handleResponse = (quality: number) => {
    // Mark current card as studied
    setStudiedCards([...studiedCards, currentCardIndex]);
    
    // Calculate next review using SM-2 algorithm (simplified)
    const nextReviewInfo = calculateNextReview(
      quality,
      currentCard.interval,
      currentCard.easeFactor
    );
    
    console.log(`Card ${currentCard.id} next review:`, nextReviewInfo);
    
    // Move to next card or end session
    if (currentCardIndex < sampleFlashcards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
      setIsFlipped(false);
    } else {
      // End of session
      onBack();
    }
  };
  
  const progressPercentage = (studiedCards.length / sampleFlashcards.length) * 100;
  
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <Button variant="outline" onClick={onBack}>
          <ChevronLeft className="h-4 w-4 mr-2" /> Back to Decks
        </Button>
        <span className="text-neuropen-muted">
          {currentCardIndex + 1} / {sampleFlashcards.length}
        </span>
      </div>
      
      <Progress value={progressPercentage} className="h-2 mb-2" />
      
      <Card className={`bg-neuropen-surface border-neuropen-border h-[400px] cursor-pointer transition-all ${isFlipped ? 'bg-neuropen-surface/90' : ''}`} onClick={handleFlip}>
        <CardContent className="flex items-center justify-center h-full p-8">
          <div className="text-center max-w-2xl">
            <h3 className="text-xl font-semibold mb-4 text-neuropen-text">
              {isFlipped ? "Answer:" : "Question:"}
            </h3>
            <p className="text-lg">
              {isFlipped ? currentCard.back : currentCard.front}
            </p>
            <p className="text-sm text-neuropen-muted mt-6">
              Click to {isFlipped ? "see question" : "reveal answer"}
            </p>
          </div>
        </CardContent>
      </Card>
      
      {isFlipped && (
        <div className="grid grid-cols-4 gap-2 mt-2">
          <Button variant="outline" className="border-red-300 text-red-500 hover:bg-red-50 hover:text-red-600" onClick={() => handleResponse(0)}>
            <X className="h-4 w-4 mr-1" /> Again
          </Button>
          <Button variant="outline" className="border-orange-300 text-orange-500 hover:bg-orange-50 hover:text-orange-600" onClick={() => handleResponse(3)}>
            <Clock className="h-4 w-4 mr-1" /> Hard
          </Button>
          <Button variant="outline" className="border-blue-300 text-blue-500 hover:bg-blue-50 hover:text-blue-600" onClick={() => handleResponse(4)}>
            <RotateCcw className="h-4 w-4 mr-1" /> Good
          </Button>
          <Button variant="outline" className="border-green-300 text-green-500 hover:bg-green-50 hover:text-green-600" onClick={() => handleResponse(5)}>
            <Check className="h-4 w-4 mr-1" /> Easy
          </Button>
        </div>
      )}
    </div>
  );
};

const FlashcardDeckView = ({ onBack, onStudy }: { onBack: () => void; onStudy: () => void }) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <Button variant="outline" onClick={onBack}>
          <ChevronLeft className="h-4 w-4 mr-2" /> Back to Decks
        </Button>
        <Button variant="outline" size="sm">
          <Settings className="h-4 w-4 mr-1" /> Deck Settings
        </Button>
      </div>
      
      <Card className="bg-neuropen-surface border-neuropen-border">
        <CardHeader>
          <CardTitle>{deckData.title}</CardTitle>
          <CardDescription>{deckData.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="bg-neuropen-surface/50 p-4 rounded-md border border-neuropen-border">
              <div className="text-2xl font-semibold mb-1">{deckData.dueCards}</div>
              <div className="text-sm text-neuropen-muted">Cards due today</div>
            </div>
            <div className="bg-neuropen-surface/50 p-4 rounded-md border border-neuropen-border">
              <div className="text-2xl font-semibold mb-1">{deckData.totalCards}</div>
              <div className="text-sm text-neuropen-muted">Total cards</div>
            </div>
          </div>
          
          <div className="mb-4">
            <div className="flex justify-between text-sm mb-1">
              <span>Overall mastery</span>
              <span>{deckData.progress}%</span>
            </div>
            <Progress value={deckData.progress} className="h-2" />
          </div>
          
          <div className="text-sm text-neuropen-muted flex items-center">
            <Calendar className="h-3 w-3 mr-1" /> Last studied: {new Date(deckData.lastStudied).toLocaleString()}
          </div>
        </CardContent>
        <CardFooter className="flex gap-2">
          <Button className="flex-1 bg-neuropen-primary hover:bg-neuropen-primary/90" onClick={onStudy}>
            Start Review
          </Button>
          <Button variant="outline" className="flex-1">
            <Plus className="h-4 w-4 mr-1" /> Add Cards
          </Button>
        </CardFooter>
      </Card>
      
      <h3 className="text-lg font-semibold mt-4 mb-2">Cards in this deck</h3>
      <div className="space-y-3">
        {sampleFlashcards.map(card => (
          <Card key={card.id} className="bg-neuropen-surface border-neuropen-border overflow-hidden">
            <div className="grid grid-cols-2 divide-x divide-neuropen-border">
              <CardContent className="p-4">
                <h4 className="text-xs uppercase text-neuropen-muted mb-2">Question</h4>
                <p className="line-clamp-3">{card.front}</p>
              </CardContent>
              <CardContent className="p-4">
                <h4 className="text-xs uppercase text-neuropen-muted mb-2">Answer</h4>
                <p className="line-clamp-3">{card.back}</p>
              </CardContent>
            </div>
            <CardFooter className="px-4 py-2 bg-neuropen-surface/50 border-t border-neuropen-border text-xs text-neuropen-muted">
              Next review: {card.nextReview.toLocaleDateString()}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

const FlashcardsPage = () => {
  const [view, setView] = useState<"list" | "deck" | "study">("list");
  
  // Sample deck list data
  const decks = [
    {
      id: 1,
      title: "Quantum Physics Fundamentals",
      totalCards: 42,
      dueCards: 8,
      progress: 65,
      lastStudied: "2 days ago"
    },
    {
      id: 2,
      title: "Neural Networks Architecture",
      totalCards: 28,
      dueCards: 12,
      progress: 40,
      lastStudied: "5 days ago"
    }
  ];
  
  if (view === "study") {
    return <FlashcardStudyMode onBack={() => setView("deck")} />;
  }
  
  if (view === "deck") {
    return <FlashcardDeckView onBack={() => setView("list")} onStudy={() => setView("study")} />;
  }
  
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

      {decks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {decks.map(deck => (
            <Card 
              key={deck.id} 
              className="bg-neuropen-surface border-neuropen-border hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => setView("deck")}
            >
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{deck.title}</CardTitle>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="grid grid-cols-2 gap-2 mb-3">
                  <div className="bg-neuropen-surface/50 p-2 rounded text-center">
                    <div className="text-lg font-semibold">{deck.dueCards}</div>
                    <div className="text-xs text-neuropen-muted">Due</div>
                  </div>
                  <div className="bg-neuropen-surface/50 p-2 rounded text-center">
                    <div className="text-lg font-semibold">{deck.totalCards}</div>
                    <div className="text-xs text-neuropen-muted">Total</div>
                  </div>
                </div>
                <div className="mb-1 flex justify-between text-xs">
                  <span>Mastery</span>
                  <span>{deck.progress}%</span>
                </div>
                <Progress value={deck.progress} className="h-1.5" />
              </CardContent>
              <CardFooter className="text-xs text-neuropen-muted pt-0 flex justify-between">
                <span>Last studied: {deck.lastStudied}</span>
                <Button variant="ghost" size="sm" className="h-6 p-0">Study</Button>
              </CardFooter>
            </Card>
          ))}

          <Card className="bg-neuropen-surface border-neuropen-border border-dashed flex flex-col items-center justify-center p-6 h-[200px]">
            <Plus className="h-12 w-12 text-neuropen-muted mb-4" />
            <h3 className="text-lg font-medium text-neuropen-text mb-2">Create New Deck</h3>
            <p className="text-neuropen-muted text-center text-sm mb-4">
              Add a new flashcard deck to learn and retain knowledge
            </p>
          </Card>
        </div>
      ) : (
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
      )}
    </div>
  );
};

export default FlashcardsPage;
