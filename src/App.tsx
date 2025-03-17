
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Home, CreditCard, CircleDollarSign, Users } from "lucide-react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";

const queryClient = new QueryClient();

const BottomNav = () => {
  return (
    <div className="bottom-nav fixed bottom-0 left-0 right-0 h-16 flex items-center justify-around z-50">
      <Link to="/" className="flex flex-col items-center justify-center text-muted-foreground hover:text-primary p-2">
        <Home size={20} />
        <span className="text-xs mt-1">Home</span>
      </Link>
      <Link to="/" className="flex flex-col items-center justify-center text-muted-foreground hover:text-primary p-2">
        <CreditCard size={20} />
        <span className="text-xs mt-1">Cards</span>
      </Link>
      <Link to="/" className="flex flex-col items-center justify-center rounded-full p-3 nav-pill">
        <CircleDollarSign size={24} color="white" />
      </Link>
      <Link to="/" className="flex flex-col items-center justify-center text-muted-foreground hover:text-primary p-2">
        <CircleDollarSign size={20} />
        <span className="text-xs mt-1">Money</span>
      </Link>
      <Link to="/" className="flex flex-col items-center justify-center text-muted-foreground hover:text-primary p-2">
        <Users size={20} />
        <span className="text-xs mt-1">Club</span>
      </Link>
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="pb-16">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <BottomNav />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
