
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import KnowledgeGraph from "./pages/KnowledgeGraph";
import MaterialsPage from "./pages/Materials";
import NotesPage from "./pages/Notes";
import ReaderPage from "./pages/Reader";
import FlashcardsPage from "./pages/Flashcards";
import ExperimentsPage from "./pages/Experiments";
import SettingsPage from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout><Dashboard /></Layout>} />
          <Route path="/graph" element={<Layout><KnowledgeGraph /></Layout>} />
          <Route path="/materials" element={<Layout><MaterialsPage /></Layout>} />
          <Route path="/notes" element={<Layout><NotesPage /></Layout>} />
          <Route path="/reader" element={<Layout><ReaderPage /></Layout>} />
          <Route path="/flashcards" element={<Layout><FlashcardsPage /></Layout>} />
          <Route path="/experiments" element={<Layout><ExperimentsPage /></Layout>} />
          <Route path="/settings" element={<Layout><SettingsPage /></Layout>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
