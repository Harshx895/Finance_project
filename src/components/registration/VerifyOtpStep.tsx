
import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { ArrowRight, ArrowLeft, Clock } from "lucide-react";

interface VerifyOtpStepProps {
  phone: string;
  nextStep: () => void;
  prevStep: () => void;
}

const VerifyOtpStep: React.FC<VerifyOtpStepProps> = ({ phone, nextStep, prevStep }) => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(30);
  const inputRef = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    inputRef.current?.focus();
    
    const countdown = setInterval(() => {
      setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
    }, 1000);
    
    return () => clearInterval(countdown);
  }, []);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== 4) {
      toast.error("Please enter a valid OTP");
      return;
    }
    
    setLoading(true);
    // Simulate API verification
    setTimeout(() => {
      setLoading(false);
      nextStep();
    }, 1000);
  };
  
  const handleResendOtp = () => {
    if (timer === 0) {
      toast.success("OTP resent successfully");
      setTimer(30);
    }
  };
  
  return (
    <div className="glass-card max-w-md w-full p-8 animate-in">
      <Button 
        variant="ghost" 
        size="icon"
        onClick={prevStep}
        className="absolute left-4 top-4 hover:bg-secondary/60"
      >
        <ArrowLeft className="h-4 w-4" />
      </Button>
      
      <div className="text-left mb-6">
        <h2 className="text-2xl font-bold">Enter the OTP</h2>
        <p className="text-sm text-muted-foreground mt-2">
          We have sent you a 4-digit code to {phone}
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Input
            ref={inputRef}
            type="text"
            placeholder="Enter 4-digit OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').substring(0, 4))}
            className="py-6 text-center text-xl tracking-widest bg-secondary/40 border-secondary"
            maxLength={4}
            inputMode="numeric"
            required
          />
        </div>
        
        <Button
          type="submit"
          className="ai-chat-button w-full flex items-center gap-2"
          disabled={loading || otp.length !== 4}
        >
          {loading ? "Verifying..." : "Verify & Continue"}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
        
        <div className="text-center mt-2 flex items-center justify-center gap-2">
          {timer > 0 && <Clock className="h-4 w-4 text-muted-foreground" />}
          <button
            type="button"
            className={`text-sm ${
              timer === 0 ? "text-primary" : "text-muted-foreground"
            }`}
            onClick={handleResendOtp}
            disabled={timer > 0}
          >
            {timer > 0 ? `Resend OTP in ${timer}s` : "Resend OTP"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default VerifyOtpStep;
