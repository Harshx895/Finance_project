
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { ArrowRight, ArrowLeft, Briefcase, UserCircle, Users, Shield, PiggyBank, Banknote } from "lucide-react";
import { Label } from "@/components/ui/label";

interface PersonnelInfoStepProps {
  formData: {
    salary: string;
    marital_status: string;
    kids: string;
    job_stability: string;
    savings: string;
    emergency_fund: string;
  };
  updateFormData: (data: Partial<PersonnelInfoStepProps['formData']>) => void;
  nextStep: () => void;
  prevStep: () => void;
}

const PersonnelInfoStep: React.FC<PersonnelInfoStepProps> = ({
  formData,
  updateFormData,
  nextStep,
  prevStep,
}) => {
  const [data, setData] = useState({
    salary: formData.salary || "",
    marital_status: formData.marital_status || "",
    kids: formData.kids || "0",
    job_stability: formData.job_stability || "",
    savings: formData.savings || "",
    emergency_fund: formData.emergency_fund || "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!data.salary) {
      toast.error("Please enter your salary");
      return;
    }
    
    if (!data.marital_status) {
      toast.error("Please select your marital status");
      return;
    }
    
    if (!data.job_stability) {
      toast.error("Please select your job stability");
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
        <h2 className="text-2xl font-bold">Personal Information</h2>
        <p className="text-sm text-muted-foreground mt-2">
          Help us understand your financial situation
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="salary">Annual Salary</Label>
          <div className="relative">
            <Briefcase className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              id="salary"
              name="salary"
              placeholder="₹12 LPA"
              value={data.salary}
              onChange={handleChange}
              className="pl-10"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="marital_status">Marital Status</Label>
          <div className="relative">
            <UserCircle className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <select
              id="marital_status"
              name="marital_status"
              value={data.marital_status}
              onChange={handleChange}
              className="flex h-10 w-full rounded-md border border-input bg-background pl-10 pr-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              required
            >
              <option value="" disabled>Select status</option>
              <option value="single">Single</option>
              <option value="married">Married</option>
              <option value="divorced">Divorced</option>
              <option value="widowed">Widowed</option>
              <option value="student">Student</option>
              <option value="retired">Retired</option>
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="kids">Number of Kids</Label>
          <div className="relative">
            <Users className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              type="number"
              id="kids"
              name="kids"
              placeholder="0"
              value={data.kids}
              onChange={handleChange}
              className="pl-10"
              min="0"
              max="10"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="job_stability">Job Stability</Label>
          <div className="relative">
            <Shield className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <select
              id="job_stability"
              name="job_stability"
              value={data.job_stability}
              onChange={handleChange}
              className="flex h-10 w-full rounded-md border border-input bg-background pl-10 pr-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              required
            >
              <option value="" disabled>Select stability</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="savings">Total Savings</Label>
          <div className="relative">
            <PiggyBank className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              id="savings"
              name="savings"
              placeholder="₹100,000"
              value={data.savings}
              onChange={handleChange}
              className="pl-10"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="emergency_fund">Emergency Fund</Label>
          <div className="relative">
            <Banknote className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              id="emergency_fund"
              name="emergency_fund"
              placeholder="₹50,000"
              value={data.emergency_fund}
              onChange={handleChange}
              className="pl-10"
            />
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

export default PersonnelInfoStep;
