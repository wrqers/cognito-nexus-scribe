
import React from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Settings, Save, Database, Lock, PenTool, UserCog, BookOpen } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";

const SettingsPage = () => {
  return (
    <div className="flex flex-col gap-4">
      <section className="mb-4">
        <h1 className="text-3xl font-bold text-neuropen-text mb-2">Settings</h1>
        <p className="text-neuropen-muted">Configure NeuroPen to match your preferences.</p>
      </section>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="bg-neuropen-surface border border-neuropen-border mb-4">
          <TabsTrigger value="general" className="data-[state=active]:bg-neuropen-primary data-[state=active]:text-white">
            General
          </TabsTrigger>
          <TabsTrigger value="privacy" className="data-[state=active]:bg-neuropen-primary data-[state=active]:text-white">
            Privacy & Data
          </TabsTrigger>
          <TabsTrigger value="personalization" className="data-[state=active]:bg-neuropen-primary data-[state=active]:text-white">
            Personalization
          </TabsTrigger>
          <TabsTrigger value="appearance" className="data-[state=active]:bg-neuropen-primary data-[state=active]:text-white">
            Appearance
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="general">
          <Card className="bg-neuropen-surface border-neuropen-border mb-4">
            <CardHeader>
              <CardTitle className="text-neuropen-text flex items-center gap-2">
                <Settings className="h-5 w-5 text-neuropen-primary" />
                <span>General Settings</span>
              </CardTitle>
              <CardDescription className="text-neuropen-muted">
                Configure basic application settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-neuropen-text">Auto-save notes</Label>
                  <p className="text-sm text-neuropen-muted">
                    Automatically save your notes as you type
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-neuropen-text">Auto-backup</Label>
                  <p className="text-sm text-neuropen-muted">
                    Automatically create local backups
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="space-y-2">
                <Label className="text-neuropen-text">Backup location</Label>
                <Input 
                  className="bg-neuropen-background border-neuropen-border text-neuropen-text"
                  defaultValue="/user/documents/neuropen/backups"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="privacy">
          <Card className="bg-neuropen-surface border-neuropen-border mb-4">
            <CardHeader>
              <CardTitle className="text-neuropen-text flex items-center gap-2">
                <Lock className="h-5 w-5 text-neuropen-primary" />
                <span>Privacy & Data</span>
              </CardTitle>
              <CardDescription className="text-neuropen-muted">
                Control your data security settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-neuropen-text">End-to-end encryption</Label>
                  <p className="text-sm text-neuropen-muted">
                    Encrypt all your data for maximum security
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-neuropen-text">Password protection</Label>
                  <p className="text-sm text-neuropen-muted">
                    Require password to access the app
                  </p>
                </div>
                <Switch />
              </div>
              
              <div className="space-y-2">
                <Button className="bg-neuropen-primary hover:bg-neuropen-primary/90">
                  <Database className="h-4 w-4 mr-2" /> Reset Knowledge Base
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="personalization">
          <Card className="bg-neuropen-surface border-neuropen-border mb-4">
            <CardHeader>
              <CardTitle className="text-neuropen-text flex items-center gap-2">
                <UserCog className="h-5 w-5 text-neuropen-primary" />
                <span>Personalization</span>
              </CardTitle>
              <CardDescription className="text-neuropen-muted">
                Customize your learning experience
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label className="text-neuropen-text">Preferred learning style</Label>
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" className="justify-start border-neuropen-primary text-neuropen-text">
                    Visual
                  </Button>
                  <Button variant="outline" className="justify-start border-neuropen-border text-neuropen-text">
                    Auditory
                  </Button>
                  <Button variant="outline" className="justify-start border-neuropen-border text-neuropen-text">
                    Reading/Writing
                  </Button>
                  <Button variant="outline" className="justify-start border-neuropen-border text-neuropen-text">
                    Kinesthetic
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label className="text-neuropen-text">Explanation complexity</Label>
                <div className="pt-2">
                  <Slider defaultValue={[75]} max={100} step={1} />
                  <div className="flex justify-between mt-1">
                    <span className="text-xs text-neuropen-muted">Simple</span>
                    <span className="text-xs text-neuropen-muted">Complex</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="appearance">
          <Card className="bg-neuropen-surface border-neuropen-border mb-4">
            <CardHeader>
              <CardTitle className="text-neuropen-text flex items-center gap-2">
                <PenTool className="h-5 w-5 text-neuropen-primary" />
                <span>Appearance</span>
              </CardTitle>
              <CardDescription className="text-neuropen-muted">
                Customize the look and feel
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label className="text-neuropen-text">Theme</Label>
                <div className="grid grid-cols-3 gap-2">
                  <Button variant="outline" className="border-neuropen-primary text-neuropen-text">
                    Dark (Default)
                  </Button>
                  <Button variant="outline" className="border-neuropen-border text-neuropen-text">
                    Light
                  </Button>
                  <Button variant="outline" className="border-neuropen-border text-neuropen-text">
                    System
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label className="text-neuropen-text">Font size</Label>
                <div className="pt-2">
                  <Slider defaultValue={[50]} max={100} step={1} />
                  <div className="flex justify-between mt-1">
                    <span className="text-xs text-neuropen-muted">Small</span>
                    <span className="text-xs text-neuropen-muted">Large</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsPage;
