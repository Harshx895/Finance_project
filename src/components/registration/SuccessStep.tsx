
import React from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight } from "lucide-react";

interface SuccessStepProps {
  navigate: (path: string) => void;
}

const SuccessStep: React.FC<SuccessStepProps> = ({ navigate }) => {
  return (
    <div className="glass-card max-w-md w-full p-8 animate-in text-center">
      <div className="flex flex-col items-center justify-center space-y-4">
        <div className="rounded-full bg-primary/20 p-3">
          <CheckCircle className="h-12 w-12 text-primary" />
        </div>
        
        <h2 className="text-3xl font-bold mt-4">Welcome!</h2>
        
        <p className="text-muted-foreground">
          Your financial journey is about to begin. We've created your account and
          you're all set to take control of your finances.
        </p>
        
        <div className="mt-8 space-y-4 w-full">
          <Button 
            className="ai-chat-button w-full flex items-center gap-2" 
            onClick={() => navigate("/")}
          >
            Go to Dashboard
            <ArrowRight className="h-4 w-4" />
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full border-gray-600" 
            onClick={() => navigate("/login")}
          >
            Sign out
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SuccessStep;
