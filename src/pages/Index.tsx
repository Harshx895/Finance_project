
import { useState } from "react";
import { MetricCard } from "@/components/MetricCard";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bell, MessageCircle, User, ChevronDown } from "lucide-react";

const Index = () => {
  const [showAIChat, setShowAIChat] = useState(false);

  return (
    <div className="min-h-screen px-4 py-6 bg-background">
      <div className="max-w-md mx-auto space-y-6">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-4">
          <div className="w-10 h-10 rounded-full bg-background border border-border flex items-center justify-center">
            <User size={18} className="text-foreground" />
          </div>
          
          <div className="flex space-x-4">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
              <Bell size={16} className="text-primary" />
            </div>
            <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
              <MessageCircle size={16} className="text-foreground" />
            </div>
          </div>
        </div>
        
        {/* Welcome Section */}
        <div className="space-y-2 mt-6">
          <h1 className="text-2xl font-bold tracking-tight">daphne, welcome to CRED</h1>
          <p className="text-sm text-muted-foreground">here are today's recommended actions for you</p>
        </div>

        {/* Credit Card Section */}
        <Card className="payment-card border-none shadow-lg overflow-hidden">
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-lg">citi platinum</span>
                </div>
                <p className="text-xs text-muted-foreground">XXXX 5434</p>
                {true && (
                  <span className="text-xs uppercase font-bold text-destructive">OVERDUE</span>
                )}
                <p className="text-xl font-bold mt-3">₹44,898.00</p>
              </div>
              <Button className="bg-black text-white rounded-full text-sm px-4 py-2">
                Pay now
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Top Picks Section */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-medium">top picks for you</h2>
            <a href="#" className="text-xs text-muted-foreground">
              view all
            </a>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <Card className="feature-card border-none shadow-lg overflow-hidden mint">
              <CardContent className="p-4 flex flex-col h-full">
                <h3 className="text-base font-medium text-white">NIKE</h3>
                <p className="text-xs text-white/80 mt-1">best copy & details product</p>
                <div className="mt-auto pt-8">
                  <p className="text-xs text-white/80 mb-1">ARRIVES BY FRI DEC 25</p>
                  <Button className="bg-black text-white rounded-full text-xs px-3 py-1.5 mt-1">
                    buy now
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card className="feature-card border-none shadow-lg overflow-hidden purple">
              <CardContent className="p-4 flex flex-col h-full">
                <h3 className="text-base font-medium text-white">BOAT</h3>
                <p className="text-xs text-white/80 mt-1">best copy & details product</p>
                <div className="mt-auto pt-8">
                  <p className="text-xs text-white/80 mb-1">ARRIVES BY FRI DEC 25</p>
                  <Button className="bg-black text-white rounded-full text-xs px-3 py-1.5 mt-1">
                    buy now
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
