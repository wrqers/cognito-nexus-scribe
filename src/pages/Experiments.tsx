
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
import { FlaskConical, Plus, Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";

const ExperimentsPage = () => {
  return (
    <div className="flex flex-col gap-4">
      <section className="mb-4">
        <h1 className="text-3xl font-bold text-neuropen-text mb-2">Experiments</h1>
        <p className="text-neuropen-muted">Test new learning approaches and AI capabilities.</p>
      </section>

      <Card className="bg-neuropen-surface border-neuropen-border h-[400px] flex flex-col items-center justify-center">
        <FlaskConical className="h-16 w-16 text-neuropen-muted mb-4" />
        <h3 className="text-xl font-medium text-neuropen-text mb-2">Experimental Features</h3>
        <p className="text-neuropen-muted text-center max-w-md mb-4">
          This area will contain experimental learning tools and AI capabilities as they are developed.
        </p>
        <Button className="bg-neuropen-primary hover:bg-neuropen-primary/90">
          Coming Soon
        </Button>
      </Card>
    </div>
  );
};

export default ExperimentsPage;
