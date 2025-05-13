
import React, { useState } from "react";
import { 
  Card, 
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Sparkles,
  FileText,
  Brain,
  ChevronRight,
  Zap,
  BarChart3,
  Settings,
  Lightbulb,
  Check,
  X,
  Clock,
  Loader2
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { AnimatedIcon } from "@/components/icons/AnimatedIcon";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AdaptiveFlashcards = () => {
  const [generatingCards, setGeneratingCards] = useState(false);
  const [selectedNotes, setSelectedNotes] = useState<string[]>([]);
  const [generatedCards, setGeneratedCards] = useState<any[]>([]);
  const [activeStep, setActiveStep] = useState<'select' | 'generate' | 'review' | 'practice'>('select');
  
  // Sample notes for selection
  const availableNotes = [
    { id: '1', title: 'Quantum Computing Basics', selected: false },
    { id: '2', title: 'Neural Networks Architecture', selected: false },
    { id: '3', title: 'Philosophy of Mind', selected: false }
  ];
  
  const toggleNoteSelection = (id: string) => {
    if (selectedNotes.includes(id)) {
      setSelectedNotes(selectedNotes.filter(noteId => noteId !== id));
    } else {
      setSelectedNotes([...selectedNotes, id]);
    }
  };
  
  const handleGenerateCards = () => {
    setGeneratingCards(true);
    setActiveStep('generate');
    
    // Simulate AI generation process
    setTimeout(() => {
      setGeneratingCards(false);
      setGeneratedCards([
        { id: 1, question: "What is quantum entanglement?", answer: "A phenomenon where particles become correlated in such a way that the quantum state of each particle cannot be described independently of the state of the others." },
        { id: 2, question: "Explain the difference between qubits and classical bits.", answer: "Classical bits can be in one of two states (0 or 1), while qubits can exist in a superposition of both states simultaneously, allowing quantum computers to process vast amounts of information in parallel." },
        { id: 3, question: "What is Heisenberg's Uncertainty Principle?", answer: "A fundamental principle in quantum mechanics stating that it's impossible to simultaneously know both the position and momentum of a particle with perfect precision." }
      ]);
      setActiveStep('review');
    }, 3000);
  };
  
  const handleApproveCards = () => {
    setActiveStep('practice');
  };
  
  const renderStep = () => {
    switch (activeStep) {
      case 'select':
        return (
          <Card className="bg-neuropen-surface border-neuropen-border">
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="h-5 w-5 mr-2 text-neuropen-accent-blue" />
                Select Content for Flashcards
              </CardTitle>
              <CardDescription>
                Choose notes or materials from your knowledge base to generate adaptive flashcards
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 mb-6">
                {availableNotes.map(note => (
                  <div
                    key={note.id}
                    className={`p-3 border rounded-md cursor-pointer flex justify-between items-center ${
                      selectedNotes.includes(note.id) 
                      ? 'bg-neuropen-primary/10 border-neuropen-primary' 
                      : 'border-neuropen-border'
                    }`}
                    onClick={() => toggleNoteSelection(note.id)}
                  >
                    <span>{note.title}</span>
                    {selectedNotes.includes(note.id) && <Check className="h-4 w-4 text-neuropen-primary" />}
                  </div>
                ))}
              </div>
              
              <div className="bg-neuropen-accent-blue/10 p-4 rounded-md">
                <h4 className="text-sm font-medium flex items-center mb-2">
                  <Lightbulb className="h-4 w-4 mr-1 text-neuropen-accent-blue" /> 
                  Recommendation
                </h4>
                <p className="text-sm">
                  Based on your study patterns, generating flashcards from <strong>Neural Networks Architecture</strong> would 
                  complement your learning progress.
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full bg-neuropen-primary hover:bg-neuropen-primary/90"
                disabled={selectedNotes.length === 0}
                onClick={handleGenerateCards}
              >
                <Brain className="h-4 w-4 mr-2" /> 
                Generate Adaptive Flashcards
              </Button>
            </CardFooter>
          </Card>
        );
        
      case 'generate':
        return (
          <Card className="bg-neuropen-surface border-neuropen-border">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <div className="mb-6">
                <AnimatedIcon animateOnHover="pulse">
                  <Sparkles className="h-12 w-12 text-neuropen-accent-blue" />
                </AnimatedIcon>
              </div>
              <h3 className="text-xl font-medium mb-2">Generating Adaptive Flashcards</h3>
              <p className="text-neuropen-muted text-center mb-6">
                Our AI is analyzing your selected content and creating optimized flashcards for effective learning.
              </p>
              <div className="w-full max-w-md mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span>Processing content</span>
                  <span>75%</span>
                </div>
                <Progress value={75} className="h-2" />
              </div>
              <div className="text-sm text-neuropen-muted animate-pulse">
                Creating question-answer pairs...
              </div>
            </CardContent>
          </Card>
        );
        
      case 'review':
        return (
          <Card className="bg-neuropen-surface border-neuropen-border">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Zap className="h-5 w-5 mr-2 text-neuropen-accent-purple" />
                Review Generated Flashcards
              </CardTitle>
              <CardDescription>
                Review and edit the generated flashcards before adding them to your collection
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 mb-6">
                {generatedCards.map((card, index) => (
                  <Card key={card.id} className="border-neuropen-border bg-neuropen-surface/50">
                    <CardHeader className="p-3 pb-0">
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium">Card {index + 1}</h4>
                        <Button variant="ghost" size="sm" className="h-8 px-2">Edit</Button>
                      </div>
                    </CardHeader>
                    <CardContent className="p-3 space-y-3">
                      <div>
                        <h5 className="text-xs font-medium text-neuropen-muted mb-1">Question:</h5>
                        <p>{card.question}</p>
                      </div>
                      <div>
                        <h5 className="text-xs font-medium text-neuropen-muted mb-1">Answer:</h5>
                        <p>{card.answer}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex gap-2">
              <Button variant="outline" className="flex-1">
                Generate More
              </Button>
              <Button 
                className="flex-1 bg-neuropen-primary hover:bg-neuropen-primary/90"
                onClick={handleApproveCards}
              >
                <Check className="h-4 w-4 mr-2" /> 
                Add to Collection
              </Button>
            </CardFooter>
          </Card>
        );
        
      case 'practice':
        return (
          <Card className="bg-neuropen-surface border-neuropen-border">
            <CardHeader>
              <CardTitle>Practice Your New Flashcards</CardTitle>
              <CardDescription>
                Cards have been added to your "Quantum Computing" deck
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Card className="bg-white dark:bg-slate-900 border-neuropen-border h-[300px] flex flex-col items-center justify-center mb-6 cursor-pointer">
                <div className="text-center p-6 max-w-lg">
                  <h3 className="text-xl font-medium mb-6">What is quantum entanglement?</h3>
                  <p className="text-neuropen-muted text-sm">Click to reveal answer</p>
                </div>
              </Card>
              
              <div className="grid grid-cols-3 gap-2">
                <Button variant="outline" className="border-red-300 text-red-500 hover:bg-red-50 hover:text-red-600">
                  <X className="h-4 w-4 mr-1" /> Hard
                </Button>
                <Button variant="outline" className="border-amber-300 text-amber-500 hover:bg-amber-50 hover:text-amber-600">
                  <Clock className="h-4 w-4 mr-1" /> Medium
                </Button>
                <Button variant="outline" className="border-green-300 text-green-500 hover:bg-green-50 hover:text-green-600">
                  <Check className="h-4 w-4 mr-1" /> Easy
                </Button>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">
                End Session
              </Button>
              <div className="text-sm text-neuropen-muted">
                Card 1 of {generatedCards.length}
              </div>
              <Button className="bg-neuropen-primary hover:bg-neuropen-primary/90">
                Next <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </CardFooter>
          </Card>
        );
    }
  };
  
  return (
    <div className="flex flex-col gap-4">
      <section className="mb-4">
        <h1 className="text-3xl font-bold text-neuropen-text mb-2">Adaptive Flashcards</h1>
        <p className="text-neuropen-muted">AI-generated flashcards optimized for your learning style.</p>
      </section>
      
      <div className="flex items-center gap-2 mb-6">
        <div className="flex-1">
          <div className="flex items-center space-x-2 text-sm">
            <div className={`flex items-center ${activeStep === 'select' ? 'text-neuropen-primary font-medium' : 'text-neuropen-muted'}`}>
              <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-1 ${activeStep === 'select' ? 'bg-neuropen-primary text-white' : 'bg-neuropen-surface border border-neuropen-border'}`}>
                1
              </div>
              Select
            </div>
            <div className="w-8 h-px bg-neuropen-border"></div>
            <div className={`flex items-center ${activeStep === 'generate' || activeStep === 'review' ? 'text-neuropen-primary font-medium' : 'text-neuropen-muted'}`}>
              <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-1 ${activeStep === 'generate' || activeStep === 'review' ? 'bg-neuropen-primary text-white' : 'bg-neuropen-surface border border-neuropen-border'}`}>
                2
              </div>
              Generate
            </div>
            <div className="w-8 h-px bg-neuropen-border"></div>
            <div className={`flex items-center ${activeStep === 'practice' ? 'text-neuropen-primary font-medium' : 'text-neuropen-muted'}`}>
              <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-1 ${activeStep === 'practice' ? 'bg-neuropen-primary text-white' : 'bg-neuropen-surface border border-neuropen-border'}`}>
                3
              </div>
              Practice
            </div>
          </div>
        </div>
        
        <Tabs defaultValue="ai" className="w-auto">
          <TabsList>
            <TabsTrigger value="ai">AI Generated</TabsTrigger>
            <TabsTrigger value="manual">Manual</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      {renderStep()}
    </div>
  );
};

export default AdaptiveFlashcards;
