import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import TaxCalculator from "./pages/TaxCalculator";
import TaxChatBot from "./pages/TaxChatBot";
import Account from "./pages/Account";
import TaxFiling from "./pages/TaxFiling";
import TaxOptimization from "./pages/TaxOptimization";
import NewsArticles from "./pages/NewsArticles";
import MetricsDashboard from "./pages/MetricsDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/calculator" element={<TaxCalculator />} />
          <Route path="/chat" element={<TaxChatBot />} />
          <Route path="/account" element={<Account />} />
          <Route path="/filing" element={<TaxFiling />} />
          <Route path="/optimization" element={<TaxOptimization />} />
          <Route path="/news" element={<NewsArticles />} />
          <Route path="/metrics" element={<MetricsDashboard />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
