
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { ArrowRight, Phone } from "lucide-react";
import { Link } from "react-router-dom";

interface PhoneStepProps {
  phone: string;
  updateFormData: (data: { phone: string }) => void;
  nextStep: () => void;
  prevStep: () => void;
}

const PhoneStep: React.FC<PhoneStepProps> = ({ phone, updateFormData, nextStep }) => {
  const [value, setValue] = useState(phone);
  const [loading, setLoading] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!value || value.length < 10) {
      toast.error("Please enter a valid phone number");
      return;
    }

    if (!agreed) {
      toast.error("Please agree to the terms of service");
      return;
    }

    setLoading(true);
    // Simulate API call to send OTP
    setTimeout(() => {
      updateFormData({ phone: value });
      setLoading(false);
      nextStep();
    }, 1000);
  };

  return (
    <div className="glass-card max-w-md w-full p-8 animate-in">
      <div className="text-left mb-6">
        <h2 className="text-2xl font-bold">Give us your mobile number</h2>
        <p className="text-sm text-muted-foreground mt-2">
          We'll send you a verification code for security
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative">
          <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            type="tel"
            placeholder="9999999999"
            value={value}
            onChange={(e) => setValue(e.target.value.replace(/\D/g, '').substring(0, 10))}
            className="pl-10 py-6 text-lg"
            maxLength={10}
            required
          />
        </div>

        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              id="terms"
              aria-describedby="terms-description"
              name="terms"
              type="checkbox"
              checked={agreed}
              onChange={() => setAgreed(!agreed)}
              className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
            />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor="terms" className="text-foreground">
              I agree to the{" "}
              <Link to="#" className="text-primary hover:underline">
                terms of service
              </Link>{" "}
              and{" "}
              <Link to="#" className="text-primary hover:underline">
                privacy policy
              </Link>
            </label>
          </div>
        </div>

        <Button
          type="submit"
          className="ai-chat-button w-full"
          disabled={loading || !value || !agreed}
        >
          {loading ? "Sending OTP..." : "Agree & Continue"}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>

        <div className="text-center mt-4">
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link to="/login" className="text-primary hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default PhoneStep;
