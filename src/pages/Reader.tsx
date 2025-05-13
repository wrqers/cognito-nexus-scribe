
import React, { useState } from "react";
import { 
  Card, 
  CardContent 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  FileUp, 
  BookOpen, 
  BookText,
  FileText,
  MessageSquareText,
  Highlighter,
  Plus,
  Menu,
  ChevronLeft,
  ChevronRight,
  Search,
  Bookmark,
  Send
} from "lucide-react";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle
} from "@/components/ui/resizable";
import { 
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useRagChat, ChatMessage } from "@/hooks/useRagChat";
import { NeuropenLoader } from "@/components/NeuropenLoader"; 
import { AnimatedIcon } from "@/components/icons/AnimatedIcon";

const ReaderPage = () => {
  const [isDocumentOpen, setIsDocumentOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState("");
  const { messages, isLoading, sendMessage } = useRagChat("quantum-physics");
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputMessage.trim()) {
      sendMessage(inputMessage);
      setInputMessage("");
    }
  };

  const ChatMessage = ({ message }: { message: ChatMessage }) => {
    const isUser = message.role === "user";
    
    return (
      <div className={`mb-4 ${isUser ? "flex flex-row-reverse" : ""}`}>
        <div className={`max-w-[80%] ${isUser ? "bg-neuropen-primary/10" : "bg-neuropen-surface"} p-3 rounded-lg`}>
          <div className="font-medium mb-1">{isUser ? "You" : "AI Assistant"}</div>
          <div className="text-sm whitespace-pre-wrap">
            {message.content.split('\n\n').map((paragraph, i) => (
              <p key={i} className="mb-2">{paragraph}</p>
            ))}
          </div>
          <div className="text-xs text-neuropen-muted mt-2">
            {message.timestamp.toLocaleTimeString()}
          </div>
        </div>
      </div>
    );
  };
  
  return (
    <div className="flex flex-col gap-4">
      <section className="mb-4">
        <h1 className="text-3xl font-bold text-neuropen-text mb-2">Neural Reader</h1>
        <p className="text-neuropen-muted">Read, annotate, and extract knowledge from documents.</p>
      </section>
      
      {!isDocumentOpen ? (
        <>
          <Card className="bg-neuropen-surface border-neuropen-border mb-6">
            <CardContent className="p-6">
              <div className="flex flex-col items-center justify-center py-8 border-2 border-dashed border-neuropen-border rounded-lg">
                <FileUp className="h-12 w-12 text-neuropen-muted mb-4" />
                <h3 className="text-xl font-medium text-neuropen-text mb-2">Upload Document</h3>
                <p className="text-neuropen-muted text-center max-w-md mb-6">
                  Drag and drop your document here or click to browse. Supported formats: PDF, EPUB, DOCX, TXT, MD.
                </p>
                <Button className="bg-neuropen-primary hover:bg-neuropen-primary/90">
                  Browse Files
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <h2 className="text-xl font-semibold text-neuropen-text mb-4">Recent Documents</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Empty state */}
            <Card className="bg-neuropen-surface border-neuropen-border flex flex-col items-center justify-center p-6 h-[220px]">
              <BookOpen className="h-12 w-12 text-neuropen-muted mb-4" />
              <h3 className="text-lg font-medium text-neuropen-text mb-2">No Documents Yet</h3>
              <p className="text-neuropen-muted text-center mb-4">
                Upload your first document to start reading and learning.
              </p>
            </Card>
          </div>
        </>
      ) : (
        <ResizablePanelGroup
          direction="horizontal"
          className="min-h-[600px] rounded-lg border border-neuropen-border"
        >
          <ResizablePanel defaultSize={75} minSize={50}>
            <div className="h-full flex flex-col bg-neuropen-surface">
              <div className="p-4 border-b border-neuropen-border flex items-center justify-between">
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem>
                      <BreadcrumbLink href="/reader">Documents</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbPage>Quantum Physics Introduction.pdf</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm">
                    <Search className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Bookmark className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="flex-1 overflow-auto p-6 bg-white dark:bg-slate-900">
                {/* Document content would go here */}
                <div className="max-w-2xl mx-auto">
                  <h1 className="text-2xl font-bold mb-4">Introduction to Quantum Physics</h1>
                  <p className="mb-4">
                    Quantum physics is the branch of physics that deals with the behavior of matter and light on a subatomic and atomic level. It attempts to explain the properties of atoms and molecules and their fundamental particles like protons, neutrons, electrons, gluons, and quarks.
                  </p>
                  <p className="mb-4">
                    The birth of quantum mechanics is attributed to Max Planck's quantum hypothesis in 1900. Planck was working on the problem of how the radiation from a glowing body changes with temperature. He proposed that energy could only be emitted or absorbed in discrete units, which he called quanta.
                  </p>
                  <p className="mb-4">
                    This was followed by Albert Einstein's paper on the photoelectric effect in 1905, which proposed that light also delivers its energy in chunks, later called photons.
                  </p>
                </div>
              </div>
              
              <div className="p-2 border-t border-neuropen-border flex items-center justify-between">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink isActive>1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink>2</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink>3</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationNext />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            </div>
          </ResizablePanel>
          
          <ResizableHandle withHandle />
          
          <ResizablePanel defaultSize={25} minSize={20}>
            <Tabs defaultValue="ai" className="h-full flex flex-col">
              <TabsList className="mx-4 my-2 justify-start">
                <TabsTrigger value="notes">
                  <FileText className="h-4 w-4 mr-2" /> Notes
                </TabsTrigger>
                <TabsTrigger value="ai">
                  <MessageSquareText className="h-4 w-4 mr-2" /> AI Chat
                </TabsTrigger>
                <TabsTrigger value="highlights">
                  <Highlighter className="h-4 w-4 mr-2" /> Highlights
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="notes" className="flex-1 p-4 overflow-auto">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-medium">Document Notes</h3>
                  <Button size="sm" variant="outline" className="h-8">
                    <Plus className="h-3 w-3 mr-1" /> Add Note
                  </Button>
                </div>
                <div className="border border-dashed border-neuropen-border rounded-lg p-4 text-center text-neuropen-muted">
                  No notes yet. Add notes while reading to organize your thoughts.
                </div>
              </TabsContent>
              
              <TabsContent value="ai" className="flex-1 p-4 overflow-auto flex flex-col h-full">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-medium flex items-center">
                    <AnimatedIcon animateOnHover="pulse" hoverColor="#9b87f5">
                      <MessageSquareText className="h-4 w-4 mr-2" />
                    </AnimatedIcon>
                    AI Learning Assistant
                  </h3>
                </div>
                
                <div className="border border-neuropen-border rounded-lg bg-neuropen-surface p-4 mb-4">
                  <p className="text-sm">
                    Ask me questions about quantum physics, request explanations, or generate learning materials.
                  </p>
                </div>
                
                <div className="flex-1 overflow-auto mb-4">
                  {messages.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-center">
                      <AnimatedIcon animateOnHover="pulse" hoverColor="#9b87f5">
                        <MessageSquareText className="h-10 w-10 text-neuropen-muted mb-4" />
                      </AnimatedIcon>
                      <h4 className="font-medium mb-2">Start a Conversation</h4>
                      <p className="text-sm text-neuropen-muted max-w-xs">
                        Ask questions about this document to deepen your understanding with AI assistance.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {messages.map((message) => (
                        <ChatMessage key={message.id} message={message} />
                      ))}
                      {isLoading && (
                        <div className="flex justify-center py-4">
                          <NeuropenLoader size="sm" variant="primary" />
                        </div>
                      )}
                    </div>
                  )}
                </div>
                
                <form onSubmit={handleSendMessage} className="mt-auto">
                  <div className="relative">
                    <Input 
                      className="pr-10" 
                      placeholder="Ask about quantum physics..." 
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      disabled={isLoading}
                    />
                    <Button 
                      type="submit" 
                      size="icon" 
                      className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
                      disabled={isLoading || !inputMessage.trim()}
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </form>
              </TabsContent>
              
              <TabsContent value="highlights" className="flex-1 p-4 overflow-auto">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-medium">Highlights & Annotations</h3>
                </div>
                <div className="border border-dashed border-neuropen-border rounded-lg p-4 text-center text-neuropen-muted">
                  No highlights yet. Highlight text in the document to save important concepts.
                </div>
              </TabsContent>
            </Tabs>
          </ResizablePanel>
        </ResizablePanelGroup>
      )}
      
      {/* Quick action button to simulate opening a document */}
      {!isDocumentOpen && (
        <div className="fixed bottom-6 right-6">
          <Button 
            className="bg-neuropen-primary hover:bg-neuropen-primary/90 rounded-full w-12 h-12 p-0"
            onClick={() => setIsDocumentOpen(true)}
          >
            <BookText className="h-5 w-5" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default ReaderPage;
