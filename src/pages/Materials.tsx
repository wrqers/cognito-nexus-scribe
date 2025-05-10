
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
import { 
  FileText, 
  Plus, 
  Search, 
  Filter, 
  FolderOpen, 
  File, 
  Upload,
  BookOpen,
  Video,
  FileImage,
  FileAudio,
  Folder
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const MaterialsPage = () => {
  // Sample materials data
  const materials = [
    {
      id: 1,
      title: "AI Fundamentals",
      type: "folder",
      items: 12,
      lastModified: "May 7, 2025"
    },
    {
      id: 2,
      title: "Neural Networks.pdf",
      type: "pdf",
      size: "4.2 MB",
      lastModified: "May 5, 2025"
    },
    {
      id: 3,
      title: "Cognitive Science",
      type: "folder",
      items: 8,
      lastModified: "May 3, 2025"
    },
    {
      id: 4,
      title: "Learning Strategies.md",
      type: "markdown",
      size: "245 KB",
      lastModified: "May 8, 2025"
    },
    {
      id: 5,
      title: "Understanding Transformers.mp4",
      type: "video",
      size: "128 MB",
      lastModified: "May 1, 2025"
    },
    {
      id: 6,
      title: "Data Structures Diagrams",
      type: "folder",
      items: 5,
      lastModified: "Apr 29, 2025"
    }
  ];

  const getIcon = (type: string) => {
    switch(type) {
      case 'folder':
        return <Folder className="h-5 w-5 text-neuropen-primary" />;
      case 'pdf':
        return <FileText className="h-5 w-5 text-neuropen-accent" />;
      case 'markdown':
        return <File className="h-5 w-5 text-neuropen-secondary" />;
      case 'video':
        return <Video className="h-5 w-5 text-neuropen-accent" />;
      case 'image':
        return <FileImage className="h-5 w-5 text-neuropen-accent" />;
      case 'audio':
        return <FileAudio className="h-5 w-5 text-neuropen-accent" />;
      default:
        return <File className="h-5 w-5 text-neuropen-muted" />;
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <section className="mb-4">
        <h1 className="text-3xl font-bold text-neuropen-text mb-2">Study Materials</h1>
        <p className="text-neuropen-muted">Organize and manage your learning resources.</p>
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
          <FolderOpen className="h-4 w-4 mr-2" /> New Folder
        </Button>
        <Button className="bg-neuropen-primary hover:bg-neuropen-primary/90">
          <Upload className="h-4 w-4 mr-2" /> Upload
        </Button>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="bg-neuropen-surface border border-neuropen-border">
          <TabsTrigger value="all" className="data-[state=active]:bg-neuropen-primary data-[state=active]:text-white">
            All Files
          </TabsTrigger>
          <TabsTrigger value="recent" className="data-[state=active]:bg-neuropen-primary data-[state=active]:text-white">
            Recent
          </TabsTrigger>
          <TabsTrigger value="favorites" className="data-[state=active]:bg-neuropen-primary data-[state=active]:text-white">
            Favorites
          </TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-4">
          <Card className="bg-neuropen-surface border-neuropen-border">
            <CardContent className="p-0">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-neuropen-border">
                    <th className="text-left p-4 text-neuropen-muted font-medium">Name</th>
                    <th className="text-left p-4 text-neuropen-muted font-medium">Type</th>
                    <th className="text-left p-4 text-neuropen-muted font-medium hidden md:table-cell">Modified</th>
                    <th className="text-right p-4 text-neuropen-muted font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {materials.map(item => (
                    <tr key={item.id} className="border-b border-neuropen-border hover:bg-neuropen-background/50">
                      <td className="p-4 flex items-center gap-3">
                        {getIcon(item.type)}
                        <span className="text-neuropen-text">{item.title}</span>
                      </td>
                      <td className="p-4 text-neuropen-muted capitalize">{item.type}</td>
                      <td className="p-4 text-neuropen-muted hidden md:table-cell">{item.lastModified}</td>
                      <td className="p-4 text-right">
                        <Button variant="ghost" size="sm" className="text-neuropen-muted hover:text-neuropen-text">
                          <BookOpen className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="recent">
          <div className="flex flex-col items-center justify-center p-8">
            <File className="h-12 w-12 text-neuropen-muted mb-4" />
            <h3 className="text-neuropen-text text-xl mb-2">Recent Files</h3>
            <p className="text-neuropen-muted text-center">
              Your recently accessed files will appear here.
            </p>
          </div>
        </TabsContent>
        <TabsContent value="favorites">
          <div className="flex flex-col items-center justify-center p-8">
            <BookOpen className="h-12 w-12 text-neuropen-muted mb-4" />
            <h3 className="text-neuropen-text text-xl mb-2">Favorite Files</h3>
            <p className="text-neuropen-muted text-center">
              Mark files as favorites for quick access.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MaterialsPage;
