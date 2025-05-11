
import React, { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BookText, 
  ArrowRight, 
  ArrowLeft, 
  Sparkles, 
  Network, 
  Lightbulb,
  RotateCw
} from "lucide-react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const AdaptiveFlashcards = () => {
  const [flipped, setFlipped] = useState(false);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  const flashcards = [
    {
      front: "What is the key difference between backpropagation and forward propagation in neural networks?",
      back: "Forward propagation computes the output of a neural network by passing inputs through layers sequentially from input to output. Backpropagation calculates gradients by propagating errors backward from the output to update weights during training.",
      type: "understanding",
      difficulty: 4.2,
      nextReview: "2 days"
    },
    {
      front: "Explain the relationship between Bayes' Theorem and conditional probability.",
      back: "Bayes' Theorem is a specific formula for calculating conditional probability. It provides a way to update probability estimates based on new evidence, showing how the probability of an event A given event B relates to the probability of B given A.",
      type: "connection",
      difficulty: 3.8,
      nextReview: "4 days"
    },
    {
      front: "Why might eventual consistency be preferred over strong consistency in distributed systems?",
      back: "Eventual consistency might be preferred over strong consistency in distributed systems when prioritizing availability and partition tolerance over immediate consistency. It offers better performance, scalability, and fault tolerance in geographically distributed systems where network latency is inevitable.",
      type: "why",
      difficulty: 4.5,
      nextReview: "1 day"
    }
  ];

  const currentCard = flashcards[currentCardIndex];
  
  const handleNext = () => {
    setFlipped(false);
    setCurrentCardIndex((prev) => (prev + 1) % flashcards.length);
  };
  
  const handlePrevious = () => {
    setFlipped(false);
    setCurrentCardIndex((prev) => (prev - 1 + flashcards.length) % flashcards.length);
  };

  return (
    <div className="flex flex-col gap-6">
      <section className="mb-4 animate-fade-in">
        <h1 className="text-3xl font-bold text-neuropen-text mb-2">Adaptive Flashcards</h1>
        <p className="text-neuropen-muted">Neural spaced repetition system tailored to your learning patterns</p>
      </section>

      <Tabs defaultValue="practice" className="animate-fade-in">
        <TabsList className="bg-neuropen-surface-lighter">
          <TabsTrigger value="practice" className="text-neuropen-muted data-[state=active]:text-neuropen-text">
            Practice
          </TabsTrigger>
          <TabsTrigger value="insights" className="text-neuropen-muted data-[state=active]:text-neuropen-text">
            Insights
          </TabsTrigger>
          <TabsTrigger value="settings" className="text-neuropen-muted data-[state=active]:text-neuropen-text">
            Settings
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="practice" className="mt-4">
          <div className="flex flex-col items-center">
            <div 
              className="w-full max-w-2xl h-64 md:h-80 perspective-1000 mb-6"
              onClick={() => setFlipped(!flipped)}
            >
              <div className={`relative w-full h-full transition-transform duration-500 transform-style-3d ${flipped ? 'rotate-y-180' : ''}`}>
                <Card className="absolute w-full h-full bg-neuropen-surface border-neuropen-border cursor-pointer backface-hidden">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <BookText className="h-5 w-5 text-neuropen-primary" />
                        <CardTitle className="text-neuropen-text">{currentCard.type === "why" ? "Deep Understanding" : currentCard.type === "connection" ? "Connection-Based" : "Concept Review"}</CardTitle>
                      </div>
                      <div className="bg-neuropen-background px-2 py-1 rounded text-xs text-neuropen-muted">
                        {currentCard.type === "why" ? "Why Question" : currentCard.type === "connection" ? "Relationship" : "Core Concept"}
                      </div>
                    </div>
                    <CardDescription className="text-neuropen-muted">Click card to reveal answer</CardDescription>
                  </CardHeader>
                  <CardContent className="flex items-center justify-center px-6">
                    <p className="text-neuropen-text text-lg">{currentCard.front}</p>
                  </CardContent>
                </Card>

                <Card className="absolute w-full h-full bg-neuropen-surface border-neuropen-border cursor-pointer backface-hidden rotate-y-180">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-neuropen-text text-lg">Answer</CardTitle>
                      <div className="bg-neuropen-background px-2 py-1 rounded text-xs text-neuropen-muted">
                        Difficulty: {currentCard.difficulty}/5
                      </div>
                    </div>
                    <CardDescription className="text-neuropen-muted">Next review: {currentCard.nextReview}</CardDescription>
                  </CardHeader>
                  <CardContent className="px-6">
                    <p className="text-neuropen-text">{currentCard.back}</p>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <div className="text-xs text-neuropen-muted">Rate your understanding:</div>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((rating) => (
                        <Button 
                          key={rating}
                          variant="outline"
                          size="sm"
                          className="w-8 h-8 p-0 text-xs bg-neuropen-background hover:bg-neuropen-primary hover:text-black border-neuropen-border"
                        >
                          {rating}
                        </Button>
                      ))}
                    </div>
                  </CardFooter>
                </Card>
              </div>
            </div>

            <div className="flex items-center justify-between w-full max-w-2xl">
              <Button
                variant="outline"
                className="bg-neuropen-surface-lighter border-neuropen-border text-neuropen-text hover:bg-neuropen-primary hover:text-black"
                onClick={handlePrevious}
              >
                <ArrowLeft className="mr-2 h-4 w-4" /> Previous
              </Button>
              <div className="text-sm text-neuropen-muted">
                Card {currentCardIndex + 1} of {flashcards.length}
              </div>
              <Button
                className="bg-neuropen-primary hover:bg-neuropen-primary/90 text-black"
                onClick={handleNext}
              >
                Next <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="insights" className="mt-4">
          <Card className="bg-neuropen-surface border-neuropen-border">
            <CardHeader>
              <CardTitle className="text-neuropen-text flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-neuropen-primary" />
                <span>Learning Analytics</span>
              </CardTitle>
              <CardDescription className="text-neuropen-muted">
                Insights from your flashcard performance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-neuropen-background rounded-md">
                  <h4 className="text-neuropen-text font-medium mb-2">Retention Rate</h4>
                  <div className="flex items-end gap-1">
                    <div className="text-3xl font-bold text-neuropen-primary">76%</div>
                    <div className="text-xs text-neuropen-muted mb-1.5">+4% this week</div>
                  </div>
                  <p className="text-xs text-neuropen-muted mt-2">Based on your performance across 215 cards this month</p>
                </div>
                
                <div className="p-4 bg-neuropen-background rounded-md">
                  <h4 className="text-neuropen-text font-medium mb-2">Study Consistency</h4>
                  <div className="flex items-end gap-1">
                    <div className="text-3xl font-bold text-neuropen-primary">5/7</div>
                    <div className="text-xs text-neuropen-muted mb-1.5">days this week</div>
                  </div>
                  <p className="text-xs text-neuropen-muted mt-2">Your study streak is currently 5 days</p>
                </div>
                
                <div className="p-4 bg-neuropen-background rounded-md">
                  <h4 className="text-neuropen-text font-medium mb-2">Concept Connections</h4>
                  <div className="flex items-end gap-1">
                    <div className="text-3xl font-bold text-neuropen-primary">87%</div>
                    <div className="text-xs text-neuropen-muted mb-1.5">accuracy on connection tests</div>
                  </div>
                  <p className="text-xs text-neuropen-muted mt-2">You excel at relating connected concepts</p>
                </div>
                
                <div className="p-4 bg-neuropen-background rounded-md">
                  <h4 className="text-neuropen-text font-medium mb-2">Deep Understanding</h4>
                  <div className="flex items-end gap-1">
                    <div className="text-3xl font-bold text-neuropen-primary">63%</div>
                    <div className="text-xs text-neuropen-muted mb-1.5">accuracy on "why" questions</div>
                  </div>
                  <p className="text-xs text-neuropen-muted mt-2">Focus on underlying principles to improve</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="mt-4">
          <Card className="bg-neuropen-surface border-neuropen-border">
            <CardHeader>
              <CardTitle className="text-neuropen-text flex items-center gap-2">
                <RotateCw className="h-5 w-5 text-neuropen-primary" />
                <span>Algorithm Settings</span>
              </CardTitle>
              <CardDescription className="text-neuropen-muted">
                Customize your neural spaced repetition system
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="algorithm" className="text-neuropen-text">Base Algorithm</Label>
                <select 
                  id="algorithm" 
                  className="w-full p-2 bg-neuropen-background border border-neuropen-border rounded-md text-neuropen-text"
                >
                  <option value="fsrs">FSRS (Free Spaced Repetition Scheduler)</option>
                  <option value="sm2">SM-2 (SuperMemo 2)</option>
                  <option value="neural">Neural-Enhanced Custom</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="context" className="text-neuropen-text">Contextual Learning</Label>
                <select 
                  id="context" 
                  className="w-full p-2 bg-neuropen-background border border-neuropen-border rounded-md text-neuropen-text"
                >
                  <option value="high">High (Strongly prioritize connected concepts)</option>
                  <option value="medium">Medium (Balance isolated and connected review)</option>
                  <option value="low">Low (Focus on individual concepts)</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="focus" className="text-neuropen-text">Prioritize Focus Areas</Label>
                <Textarea 
                  id="focus" 
                  placeholder="Enter topics to prioritize, separated by commas"
                  className="w-full bg-neuropen-background border border-neuropen-border text-neuropen-text"
                />
              </div>
              
              <Button className="w-full bg-neuropen-primary hover:bg-neuropen-primary/90 text-black">
                Save Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdaptiveFlashcards;
