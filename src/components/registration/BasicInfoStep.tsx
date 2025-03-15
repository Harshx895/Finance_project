
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { ArrowRight, ArrowLeft, User, Mail } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";

interface BasicInfoStepProps {
  formData: {
    name: string;
    email: string;
    age: string;
    gender: string;
  };
  updateFormData: (data: Partial<typeof formData>) => void;
  nextStep: () => void;
  prevStep: () => void;
}

const BasicInfoStep: React.FC<BasicInfoStepProps> = ({ 
  formData, 
  updateFormData, 
  nextStep, 
  prevStep 
}) => {
  const [data, setData] = useState({
    name: formData.name || "",
    email: formData.email || "",
    age: formData.age || "",
    gender: formData.gender || ""
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
    
    if (!data.email.trim() || !/^\S+@\S+\.\S+$/.test(data.email)) {
      toast.error("Please enter a valid email address");
      return;
    }
    
    if (!data.age || isNaN(Number(data.age)) || Number(data.age) < 18) {
      toast.error("Please enter a valid age (18+)");
      return;
    }
    
    if (!data.gender) {
      toast.error("Please select your gender");
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
    <div className="glass-card max-w-md w-full p-8 animate-in">
      <Button 
        variant="ghost" 
        size="icon"
        onClick={prevStep}
        className="absolute left-4 top-4"
      >
        <ArrowLeft className="h-4 w-4" />
      </Button>
      
      <div className="text-left mb-6">
        <h2 className="text-2xl font-bold">Tell us about yourself</h2>
        <p className="text-sm text-muted-foreground mt-2">
          Basic information to set up your account
        </p>
      </div>
      
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
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="age">Age</Label>
            <Input
              type="number"
              id="age"
              name="age"
              placeholder="25"
              value={data.age}
              onChange={handleChange}
              min="18"
              max="100"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="gender">Gender</Label>
            <select
              id="gender"
              name="gender"
              value={data.gender}
              onChange={handleChange}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              required
            >
              <option value="" disabled>Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>
        
        <Button
          type="submit"
          className="ai-chat-button w-full mt-4"
          disabled={loading}
        >
          {loading ? "Saving..." : "Continue"}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </form>
    </div>
  );
};

export default BasicInfoStep;
