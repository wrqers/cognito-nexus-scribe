
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
  BrainCircuit, 
  BarChart3, 
  TrendingUp, 
  Activity, 
  Calendar,
  Clock,
  ArrowUp,
  ArrowDown,
  ArrowRight,
  Info,
  ChevronDown,
  HelpCircle,
  AlertCircle
} from "lucide-react";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from "@/components/ui/collapsible";

// Import recharts components
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

// Sample data for charts
const studyTimeData = [
  { name: 'Mon', hours: 1.2 },
  { name: 'Tue', hours: 2.1 },
  { name: 'Wed', hours: 1.5 },
  { name: 'Thu', hours: 2.8 },
  { name: 'Fri', hours: 1.7 },
  { name: 'Sat', hours: 3.2 },
  { name: 'Sun', hours: 2.4 },
];

const subjectDistributionData = [
  { name: 'Physics', value: 35 },
  { name: 'Computer Science', value: 40 },
  { name: 'Philosophy', value: 15 },
  { name: 'Mathematics', value: 10 },
];

const COLORS = ['#4F46E5', '#0EA5E9', '#8B5CF6', '#10B981'];

const conceptStrengthData = [
  { concept: 'Quantum Computing', strength: 85 },
  { concept: 'Neural Networks', strength: 72 },
  { concept: 'Consciousness', strength: 44 },
  { concept: 'Graph Theory', strength: 68 },
  { concept: 'Quantum Entanglement', strength: 78 },
];

const learningPatternData = [
  {
    name: 'Week 1',
    flashcards: 28,
    reading: 45,
    notes: 15,
  },
  {
    name: 'Week 2',
    flashcards: 32,
    reading: 40,
    notes: 22,
  },
  {
    name: 'Week 3',
    flashcards: 45,
    reading: 38,
    notes: 30,
  },
  {
    name: 'Week 4',
    flashcards: 52,
    reading: 52,
    notes: 40,
  },
];

const MetacognitiveInsights = () => {
  const [openInsight, setOpenInsight] = useState<string | null>(null);
  
  const toggleInsight = (id: string) => {
    setOpenInsight(openInsight === id ? null : id);
  };
  
  return (
    <div className="flex flex-col gap-4">
      <section className="mb-4">
        <h1 className="text-3xl font-bold text-neuropen-text mb-2">Metacognitive Insights</h1>
        <p className="text-neuropen-muted">Understand your learning patterns and optimize knowledge acquisition.</p>
      </section>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <Card className="bg-neuropen-surface border-neuropen-border">
          <CardContent className="p-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm font-medium flex items-center">
                <Clock className="h-4 w-4 mr-1 text-neuropen-accent-blue" />
                Weekly Study Time
              </h3>
              <span className="text-xl font-semibold">14.9h</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-green-500 mb-4">
              <ArrowUp className="h-3 w-3" />
              <span>12% from last week</span>
            </div>
            <div className="h-[60px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={studyTimeData}
                  margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#4F46E5" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" hide={true} />
                  <YAxis hide={true} />
                  <Tooltip 
                    contentStyle={{ 
                      background: 'rgba(17, 24, 39, 0.8)', 
                      border: 'none', 
                      borderRadius: '4px',
                      color: 'white'
                    }} 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="hours" 
                    stroke="#4F46E5" 
                    fillOpacity={1} 
                    fill="url(#colorHours)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-neuropen-surface border-neuropen-border">
          <CardContent className="p-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm font-medium flex items-center">
                <TrendingUp className="h-4 w-4 mr-1 text-neuropen-accent-green" />
                Retention Rate
              </h3>
              <span className="text-xl font-semibold">78%</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-green-500 mb-4">
              <ArrowUp className="h-3 w-3" />
              <span>5% from last month</span>
            </div>
            <Progress value={78} className="h-2 mb-2" />
            <div className="flex justify-between text-xs text-neuropen-muted">
              <span>May 1</span>
              <span>May 31</span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-neuropen-surface border-neuropen-border">
          <CardContent className="p-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm font-medium flex items-center">
                <Activity className="h-4 w-4 mr-1 text-neuropen-accent-purple" />
                Knowledge Connections
              </h3>
              <span className="text-xl font-semibold">126</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-green-500 mb-4">
              <ArrowUp className="h-3 w-3" />
              <span>18 new connections</span>
            </div>
            <div className="h-[60px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={[
                    { week: 'W1', connections: 82 },
                    { week: 'W2', connections: 95 },
                    { week: 'W3', connections: 108 },
                    { week: 'W4', connections: 126 }
                  ]}
                  margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
                >
                  <XAxis dataKey="week" hide={true} />
                  <YAxis hide={true} />
                  <Tooltip 
                    contentStyle={{ 
                      background: 'rgba(17, 24, 39, 0.8)', 
                      border: 'none', 
                      borderRadius: '4px',
                      color: 'white'
                    }} 
                  />
                  <Bar dataKey="connections" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="bg-neuropen-surface border-neuropen-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Learning Patterns</CardTitle>
            <CardDescription>Your activity across different learning methods</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={learningPatternData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorFlashcards" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#4F46E5" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorReading" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0EA5E9" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#0EA5E9" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorNotes" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.2} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="flashcards" stroke="#4F46E5" fillOpacity={1} fill="url(#colorFlashcards)" />
                  <Area type="monotone" dataKey="reading" stroke="#0EA5E9" fillOpacity={1} fill="url(#colorReading)" />
                  <Area type="monotone" dataKey="notes" stroke="#8B5CF6" fillOpacity={1} fill="url(#colorNotes)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-4 mt-2">
              <div className="flex items-center">
                <div className="h-3 w-3 rounded-full bg-[#4F46E5] mr-1"></div>
                <span className="text-xs">Flashcards</span>
              </div>
              <div className="flex items-center">
                <div className="h-3 w-3 rounded-full bg-[#0EA5E9] mr-1"></div>
                <span className="text-xs">Reading</span>
              </div>
              <div className="flex items-center">
                <div className="h-3 w-3 rounded-full bg-[#8B5CF6] mr-1"></div>
                <span className="text-xs">Notes</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-neuropen-surface border-neuropen-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Subject Distribution</CardTitle>
            <CardDescription>Time spent across knowledge domains</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={subjectDistributionData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {subjectDistributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card className="bg-neuropen-surface border-neuropen-border mt-4">
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <BrainCircuit className="h-5 w-5 mr-2 text-neuropen-accent-purple" />
            Metacognitive Analysis
          </CardTitle>
          <CardDescription>
            AI-generated insights about your learning patterns and knowledge acquisition
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <Collapsible 
            open={openInsight === "insight1"} 
            className="border rounded-md"
          >
            <CollapsibleTrigger 
              className="flex justify-between items-center w-full p-3 text-left"
              onClick={() => toggleInsight("insight1")}
            >
              <div className="flex items-center">
                <div className="bg-blue-100 dark:bg-blue-900 p-1.5 rounded-full mr-3">
                  <TrendingUp className="h-4 w-4 text-blue-600 dark:text-blue-300" />
                </div>
                <div>
                  <h3 className="font-medium">Learning Efficiency Pattern</h3>
                  <p className="text-sm text-neuropen-muted">Your optimal study times and methods</p>
                </div>
              </div>
              <ChevronDown className={`h-4 w-4 transition-transform ${openInsight === "insight1" ? "transform rotate-180" : ""}`} />
            </CollapsibleTrigger>
            <CollapsibleContent className="px-4 pb-4 pt-1 border-t">
              <div className="space-y-3">
                <p>
                  Based on your study patterns, your learning efficiency peaks between <strong>8:00 AM - 10:00 AM</strong> and <strong>4:00 PM - 6:00 PM</strong>. 
                  During these periods, you demonstrate 23% higher retention rates compared to other times.
                </p>
                <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-md text-sm">
                  <h4 className="font-medium flex items-center mb-1">
                    <Info className="h-4 w-4 mr-1" /> Recommendation
                  </h4>
                  <p>Schedule complex topics during your morning peak and use the afternoon peak for review and consolidation.</p>
                </div>
                <div className="flex gap-2 mt-3">
                  <Button variant="outline" size="sm" className="text-xs">
                    <Calendar className="h-3 w-3 mr-1" /> Adjust Schedule
                  </Button>
                  <Button size="sm" className="bg-neuropen-primary hover:bg-neuropen-primary/90 text-xs">
                    <ArrowRight className="h-3 w-3 mr-1" /> Apply Insights
                  </Button>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
          
          <Collapsible 
            open={openInsight === "insight2"} 
            className="border rounded-md"
          >
            <CollapsibleTrigger 
              className="flex justify-between items-center w-full p-3 text-left"
              onClick={() => toggleInsight("insight2")}
            >
              <div className="flex items-center">
                <div className="bg-purple-100 dark:bg-purple-900 p-1.5 rounded-full mr-3">
                  <Activity className="h-4 w-4 text-purple-600 dark:text-purple-300" />
                </div>
                <div>
                  <h3 className="font-medium">Knowledge Connections Analysis</h3>
                  <p className="text-sm text-neuropen-muted">Interdisciplinary connection opportunities</p>
                </div>
              </div>
              <ChevronDown className={`h-4 w-4 transition-transform ${openInsight === "insight2" ? "transform rotate-180" : ""}`} />
            </CollapsibleTrigger>
            <CollapsibleContent className="px-4 pb-4 pt-1 border-t">
              <div className="space-y-3">
                <p>
                  Your knowledge graph shows strong connections within domains but fewer interdisciplinary links.
                  There's significant potential to connect your quantum computing notes with your neural network studies,
                  particularly in the area of quantum machine learning.
                </p>
                <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-md text-sm">
                  <h4 className="font-medium flex items-center mb-1">
                    <Info className="h-4 w-4 mr-1" /> Opportunity
                  </h4>
                  <p>Creating connections between quantum superposition principles and neural network architectures could lead to breakthrough insights in your understanding of both domains.</p>
                </div>
                <div className="flex gap-2 mt-3">
                  <Button variant="outline" size="sm" className="text-xs">
                    <HelpCircle className="h-3 w-3 mr-1" /> Learn More
                  </Button>
                  <Button size="sm" className="bg-neuropen-primary hover:bg-neuropen-primary/90 text-xs">
                    <ArrowRight className="h-3 w-3 mr-1" /> Explore Connections
                  </Button>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
          
          <Collapsible 
            open={openInsight === "insight3"} 
            className="border rounded-md"
          >
            <CollapsibleTrigger 
              className="flex justify-between items-center w-full p-3 text-left"
              onClick={() => toggleInsight("insight3")}
            >
              <div className="flex items-center">
                <div className="bg-amber-100 dark:bg-amber-900 p-1.5 rounded-full mr-3">
                  <AlertCircle className="h-4 w-4 text-amber-600 dark:text-amber-300" />
                </div>
                <div>
                  <h3 className="font-medium">Knowledge Blindspots</h3>
                  <p className="text-sm text-neuropen-muted">Areas that need reinforcement</p>
                </div>
              </div>
              <ChevronDown className={`h-4 w-4 transition-transform ${openInsight === "insight3" ? "transform rotate-180" : ""}`} />
            </CollapsibleTrigger>
            <CollapsibleContent className="px-4 pb-4 pt-1 border-t">
              <div className="space-y-3">
                <p>
                  Based on your study patterns and review sessions, we've identified potential knowledge gaps in:
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Quantum error correction principles</li>
                  <li>Advanced neural network optimization techniques</li>
                  <li>Connections between consciousness theories and quantum phenomena</li>
                </ul>
                <div className="bg-amber-50 dark:bg-amber-900/20 p-3 rounded-md text-sm">
                  <h4 className="font-medium flex items-center mb-1">
                    <Info className="h-4 w-4 mr-1" /> Action Plan
                  </h4>
                  <p>Focusing on these areas would significantly strengthen your overall knowledge framework and enable deeper connections between domains.</p>
                </div>
                <div className="flex gap-2 mt-3">
                  <Button variant="outline" size="sm" className="text-xs">
                    <AlertCircle className="h-3 w-3 mr-1" /> View All Blindspots
                  </Button>
                  <Button size="sm" className="bg-neuropen-primary hover:bg-neuropen-primary/90 text-xs">
                    <ArrowRight className="h-3 w-3 mr-1" /> Create Study Plan
                  </Button>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </CardContent>
      </Card>
      
      <Card className="bg-neuropen-surface border-neuropen-border mt-4">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Concept Strength Analysis</CardTitle>
          <CardDescription>Mastery level across key concepts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {conceptStrengthData.map((item, index) => (
              <div key={index}>
                <div className="flex justify-between items-center mb-1">
                  <span>{item.concept}</span>
                  <span className="text-sm font-medium">{item.strength}%</span>
                </div>
                <Progress value={item.strength} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MetacognitiveInsights;
