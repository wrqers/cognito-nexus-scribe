
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
import { FileText, Plus, Search, Filter, Book, BookOpen, Upload, File, Library } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ReaderPage = () => {
  // Sample documents data
  const documents = [
    {
      id: 1,
      title: "Principles of Neural Science",
      author: "Eric R. Kandel",
      type: "PDF",
      lastOpened: "2 days ago",
      progress: 45
    },
    {
      id: 2,
      title: "Computer Systems: A Programmer's Perspective",
      author: "Randal E. Bryant",
      type: "PDF",
      lastOpened: "Yesterday",
      progress: 63
    },
    {
      id: 3,
      title: "Thinking, Fast and Slow",
      author: "Daniel Kahneman",
      type: "EPUB",
      lastOpened: "4 days ago",
      progress: 28
    },
    {
      id: 4,
      title: "Introduction to Algorithms",
      author: "Thomas H. Cormen",
      type: "PDF",
      lastOpened: "1 week ago",
      progress: 72
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      <section className="mb-4">
        <h1 className="text-3xl font-bold text-neuropen-text mb-2">Reader</h1>
        <p className="text-neuropen-muted">Manage and annotate your documents and study materials.</p>
      </section>

      <div className="flex items-center gap-2 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-neuropen-muted h-4 w-4" />
          <Input 
            className="pl-8 bg-neuropen-surface border-neuropen-border text-neuropen-text"
            placeholder="Search materials..." 
          />
        </div>
        <Button variant="outline" className="border-neuropen-border text-neuropen-text">
          <Filter className="h-4 w-4 mr-2" /> Filter
        </Button>
        <Button className="bg-neuropen-primary hover:bg-neuropen-primary/90">
          <Upload className="h-4 w-4 mr-2" /> Import
        </Button>
      </div>

      <Tabs defaultValue="recent" className="w-full">
        <TabsList className="bg-neuropen-surface border border-neuropen-border">
          <TabsTrigger value="recent" className="data-[state=active]:bg-neuropen-primary data-[state=active]:text-white">
            Recent
          </TabsTrigger>
          <TabsTrigger value="all" className="data-[state=active]:bg-neuropen-primary data-[state=active]:text-white">
            All Documents
          </TabsTrigger>
          <TabsTrigger value="favorites" className="data-[state=active]:bg-neuropen-primary data-[state=active]:text-white">
            Favorites
          </TabsTrigger>
        </TabsList>
        <TabsContent value="recent" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {documents.map(doc => (
              <Card key={doc.id} className="bg-neuropen-surface border-neuropen-border hover:border-neuropen-primary transition-colors cursor-pointer">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-neuropen-text text-base">{doc.title}</CardTitle>
                      <CardDescription className="text-neuropen-muted text-xs">
                        {doc.author}
                      </CardDescription>
                    </div>
                    <span className="px-2 py-1 rounded-md text-xs bg-neuropen-primary/20 text-neuropen-accent">
                      {doc.type}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <p className="text-xs text-neuropen-muted mb-1">Last opened: {doc.lastOpened}</p>
                  <div className="w-full h-1 bg-neuropen-background rounded-full overflow-hidden mt-2">
                    <div 
                      className="h-full bg-neuropen-primary" 
                      style={{ width: `${doc.progress}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-right text-neuropen-muted mt-1">{doc.progress}%</p>
                </CardContent>
                <CardFooter className="pt-0">
                  <Button variant="ghost" size="sm" className="text-neuropen-primary hover:text-neuropen-secondary hover:bg-neuropen-primary/10">
                    <BookOpen className="h-4 w-4 mr-2" /> Open
                  </Button>
                </CardFooter>
              </Card>
            ))}
            
            <Card className="bg-neuropen-surface border-neuropen-border border-dashed flex flex-col items-center justify-center p-6 h-[166px]">
              <Upload className="h-8 w-8 text-neuropen-muted mb-2" />
              <p className="text-neuropen-muted text-sm text-center">
                Drag and drop files here or click to import
              </p>
              <Button variant="ghost" className="mt-2 text-neuropen-primary text-sm">
                Import Document
              </Button>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="all">
          <div className="flex flex-col items-center justify-center p-8">
            <Library className="h-12 w-12 text-neuropen-muted mb-4" />
            <h3 className="text-neuropen-text text-xl mb-2">Your Document Library</h3>
            <p className="text-neuropen-muted text-center">
              All your imported documents will be organized here.
            </p>
          </div>
        </TabsContent>
        <TabsContent value="favorites">
          <div className="flex flex-col items-center justify-center p-8">
            <Book className="h-12 w-12 text-neuropen-muted mb-4" />
            <h3 className="text-neuropen-text text-xl mb-2">Your Favorite Documents</h3>
            <p className="text-neuropen-muted text-center">
              Mark documents as favorites for quick access.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ReaderPage;
