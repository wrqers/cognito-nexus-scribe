
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { PageTransition } from "./components/PageTransition";
import { ScrollToTopButton } from "./components/ScrollToTopButton";
import Dashboard from "./pages/Dashboard";
import KnowledgeGraph from "./pages/KnowledgeGraph";
import MaterialsPage from "./pages/Materials";
import NotesPage from "./pages/Notes";
import ReaderPage from "./pages/Reader";
import FlashcardsPage from "./pages/Flashcards";
import ExperimentsPage from "./pages/Experiments";
import SettingsPage from "./pages/Settings";
import MetacognitiveInsights from "./pages/MetacognitiveInsights";
import AdaptiveFlashcards from "./pages/AdaptiveFlashcards";
import IntelligenceAmplification from "./pages/IntelligenceAmplification";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <Layout>
              <PageTransition transitionType="fade">
                <Dashboard />
              </PageTransition>
            </Layout>
          } />
          <Route path="/graph" element={
            <Layout>
              <PageTransition transitionType="slide">
                <KnowledgeGraph />
              </PageTransition>
            </Layout>
          } />
          <Route path="/materials" element={
            <Layout>
              <PageTransition transitionType="fade">
                <MaterialsPage />
              </PageTransition>
            </Layout>
          } />
          <Route path="/notes" element={
            <Layout>
              <PageTransition transitionType="slide">
                <NotesPage />
              </PageTransition>
            </Layout>
          } />
          <Route path="/reader" element={
            <Layout>
              <PageTransition transitionType="zoom">
                <ReaderPage />
              </PageTransition>
            </Layout>
          } />
          <Route path="/flashcards" element={
            <Layout>
              <PageTransition transitionType="slide">
                <FlashcardsPage />
              </PageTransition>
            </Layout>
          } />
          <Route path="/experiments" element={
            <Layout>
              <PageTransition transitionType="zoom">
                <ExperimentsPage />
              </PageTransition>
            </Layout>
          } />
          <Route path="/settings" element={
            <Layout>
              <PageTransition transitionType="fade">
                <SettingsPage />
              </PageTransition>
            </Layout>
          } />
          <Route path="/metacognitive-insights" element={
            <Layout>
              <PageTransition transitionType="slide">
                <MetacognitiveInsights />
              </PageTransition>
            </Layout>
          } />
          <Route path="/adaptive-flashcards" element={
            <Layout>
              <PageTransition transitionType="zoom">
                <AdaptiveFlashcards />
              </PageTransition>
            </Layout>
          } />
          <Route path="/intelligence-amplification" element={
            <Layout>
              <PageTransition transitionType="fade">
                <IntelligenceAmplification />
              </PageTransition>
            </Layout>
          } />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <ScrollToTopButton />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
