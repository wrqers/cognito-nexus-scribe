
import React from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  BookOpen, 
  FileText, 
  Brain, 
  Plus, 
  BookText,
  Activity,
  Clock,
  Lightbulb 
} from "lucide-react";

const Dashboard = () => {
  return (
    <div className="flex flex-col gap-6">
      <section className="mb-4 animate-fade-in">
        <h1 className="text-3xl font-bold text-neuropen-text mb-2">Welcome back</h1>
        <p className="text-neuropen-muted">Continue where you left off or start something new.</p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-fade-in">
        <Card className="bg-neuropen-surface border-neuropen-border">
          <CardHeader>
            <CardTitle className="text-neuropen-text flex items-center gap-2">
              <Activity className="h-5 w-5 text-neuropen-primary" />
              <span>Current Focus</span>
            </CardTitle>
            <CardDescription className="text-neuropen-muted">Your active study areas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {['Advanced Mathematics', 'Computer Science', 'Cognitive Psychology'].map((item, index) => (
                <div key={index} className="p-3 bg-neuropen-background rounded-md flex justify-between items-center">
                  <span className="text-neuropen-text">{item}</span>
                  <Button variant="ghost" size="sm" className="text-neuropen-primary hover:text-neuropen-accent hover:bg-neuropen-primary/10">
                    <BookOpen className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-neuropen-surface border-neuropen-border">
          <CardHeader>
            <CardTitle className="text-neuropen-text flex items-center gap-2">
              <Clock className="h-5 w-5 text-neuropen-primary" />
              <span>Recent Notes</span>
            </CardTitle>
            <CardDescription className="text-neuropen-muted">Your latest thoughts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {['Understanding Neural Networks', 'Bayes Theorem Applications', 'System Design Patterns'].map((item, index) => (
                <div key={index} className="p-3 bg-neuropen-background rounded-md flex justify-between items-center">
                  <span className="text-neuropen-text">{item}</span>
                  <Button variant="ghost" size="sm" className="text-neuropen-primary hover:text-neuropen-accent hover:bg-neuropen-primary/10">
                    <FileText className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-neuropen-surface border-neuropen-border">
          <CardHeader>
            <CardTitle className="text-neuropen-text flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-neuropen-primary" />
              <span>Knowledge Insights</span>
            </CardTitle>
            <CardDescription className="text-neuropen-muted">Your understanding progress</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-neuropen-text">Cognitive Science</span>
                <div className="w-24 h-2 bg-neuropen-background rounded-full overflow-hidden">
                  <div className="h-full bg-neuropen-primary" style={{ width: '65%' }}></div>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-neuropen-text">Data Structures</span>
                <div className="w-24 h-2 bg-neuropen-background rounded-full overflow-hidden">
                  <div className="h-full bg-neuropen-primary" style={{ width: '80%' }}></div>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-neuropen-text">Deep Learning</span>
                <div className="w-24 h-2 bg-neuropen-background rounded-full overflow-hidden">
                  <div className="h-full bg-neuropen-primary" style={{ width: '40%' }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="animate-fade-in">
        <h2 className="text-xl font-semibold text-neuropen-text mb-3">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Button className="h-auto py-6 flex flex-col items-center gap-2 bg-neuropen-primary hover:bg-neuropen-primary/90">
            <FileText className="h-6 w-6" />
            <span>New Note</span>
          </Button>
          <Button className="h-auto py-6 flex flex-col items-center gap-2 bg-neuropen-primary hover:bg-neuropen-primary/90">
            <BookOpen className="h-6 w-6" />
            <span>Import PDF</span>
          </Button>
          <Button className="h-auto py-6 flex flex-col items-center gap-2 bg-neuropen-primary hover:bg-neuropen-primary/90">
            <Brain className="h-6 w-6" />
            <span>Explore Graph</span>
          </Button>
          <Button className="h-auto py-6 flex flex-col items-center gap-2 bg-neuropen-primary hover:bg-neuropen-primary/90">
            <BookText className="h-6 w-6" />
            <span>Study Session</span>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
