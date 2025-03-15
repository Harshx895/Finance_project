
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { ArrowRight, ArrowLeft, User, Mail, Phone, CalendarDays, ShieldCheck } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface ContactDetailsStepProps {
  formData: {
    name: string;
    phone: string;
    email: string;
    age: string;
  };
  updateFormData: (data: Partial<ContactDetailsStepProps['formData']>) => void;
  nextStep: () => void;
  prevStep: () => void;
}

const ContactDetailsStep: React.FC<ContactDetailsStepProps> = ({ 
  formData, 
  updateFormData, 
  nextStep, 
  prevStep 
}) => {
  const [data, setData] = useState({
    name: formData.name || "",
    phone: formData.phone || "",
    email: formData.email || "",
    age: formData.age || "",
  });
  const [loading, setLoading] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!data.name.trim()) {
      toast.error("Please enter your name");
      return;
    }
    
    if (!data.phone || data.phone.length < 10) {
      toast.error("Please enter a valid phone number");
      return;
    }
    
    if (!data.email.trim() || !/^\S+@\S+\.\S+$/.test(data.email)) {
      toast.error("Please enter a valid email address");
      return;
    }
    
    if (!data.age || isNaN(Number(data.age)) || Number(data.age) < 18) {
      toast.error("Please enter a valid age (18+)");
      return;
    }
    
    if (!agreed) {
      toast.error("Please agree to the terms of service");
      return;
    }
    
    setLoading(true);
    setTimeout(() => {
      updateFormData(data);
      setLoading(false);
      nextStep();
    }, 500);
  };

  return (
    <Card className="glass-card max-w-md w-full animate-in border-0 shadow-xl">
      <Button 
        variant="ghost" 
        size="icon"
        onClick={prevStep}
        className="absolute left-4 top-4"
      >
        <ArrowLeft className="h-4 w-4" />
      </Button>
      
      <CardHeader className="pb-4">
        <CardTitle className="text-2xl font-bold">Contact Details</CardTitle>
        <CardDescription>
          Please provide your basic contact information
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                id="name"
                name="name"
                placeholder="John Doe"
                value={data.name}
                onChange={handleChange}
                className="pl-10"
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <div className="relative">
              <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                type="tel"
                id="phone"
                name="phone"
                placeholder="9999999999"
                value={data.phone}
                onChange={(e) => setData({...data, phone: e.target.value.replace(/\D/g, '').substring(0, 10)})}
                className="pl-10"
                maxLength={10}
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                type="email"
                id="email"
                name="email"
                placeholder="your@email.com"
                value={data.email}
                onChange={handleChange}
                className="pl-10"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="age">Age</Label>
            <div className="relative">
              <CalendarDays className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                type="number"
                id="age"
                name="age"
                placeholder="25"
                value={data.age}
                onChange={handleChange}
                className="pl-10"
                min="18"
                max="100"
                required
              />
            </div>
          </div>
          
          <div className="flex items-start mt-4">
            <div className="flex items-center h-5">
              <input
                id="terms"
                aria-describedby="terms-description"
                name="terms"
                type="checkbox"
                checked={agreed}
                onChange={() => setAgreed(!agreed)}
                className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
              />
            </div>
            <div className="ml-3 text-sm flex items-start gap-2">
              <ShieldCheck className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
              <label htmlFor="terms" className="text-foreground">
                I agree to the terms of service and privacy policy
              </label>
            </div>
          </div>
          
          <Button
            type="submit"
            className="ai-chat-button w-full mt-4"
            disabled={loading || !agreed}
          >
            {loading ? "Saving..." : "Continue"}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ContactDetailsStep;
