
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { Label } from "@/components/ui/label";

interface GoalsAndRiskStepProps {
  formData: {
    short_term_goals: string;
    long_term_goals: string;
    risk_tolerance: string;
    habits: string;
  };
  updateFormData: (data: Partial<GoalsAndRiskStepProps['formData']>) => void;
  nextStep: () => void;
  prevStep: () => void;
}

const GoalsAndRiskStep: React.FC<GoalsAndRiskStepProps> = ({
  formData,
  updateFormData,
  nextStep,
  prevStep,
}) => {
  const [data, setData] = useState({
    short_term_goals: formData.short_term_goals || "",
    long_term_goals: formData.long_term_goals || "",
    risk_tolerance: formData.risk_tolerance || "",
    habits: formData.habits || "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!data.risk_tolerance) {
      toast.error("Please select your risk tolerance");
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
        <h2 className="text-2xl font-bold">Goals & Preferences</h2>
        <p className="text-sm text-muted-foreground mt-2">
          Tell us about your financial goals and preferences
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="short_term_goals">Short Term Financial Goals</Label>
          <Textarea
            id="short_term_goals"
            name="short_term_goals"
            placeholder="e.g., Save for a vacation, Buy a car"
            value={data.short_term_goals}
            onChange={handleChange}
            rows={2}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="long_term_goals">Long Term Financial Goals</Label>
          <Textarea
            id="long_term_goals"
            name="long_term_goals"
            placeholder="e.g., Buy a house, Children's education, Retirement"
            value={data.long_term_goals}
            onChange={handleChange}
            rows={2}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="risk_tolerance">Risk Tolerance</Label>
          <select
            id="risk_tolerance"
            name="risk_tolerance"
            value={data.risk_tolerance}
            onChange={handleChange}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            required
          >
            <option value="" disabled>Select risk tolerance</option>
            <option value="low">Low - I prefer safer investments</option>
            <option value="medium">Medium - I can accept some risk</option>
            <option value="high">High - I can tolerate significant risk</option>
          </select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="habits">Lifestyle & Habits (Optional)</Label>
          <Textarea
            id="habits"
            name="habits"
            placeholder="e.g., Regularly dine out, Travel frequently, No habits"
            value={data.habits}
            onChange={handleChange}
            rows={2}
          />
        </div>

        <Button
          type="submit"
          className="ai-chat-button w-full mt-4"
          disabled={loading}
        >
          {loading ? "Completing..." : "Complete Registration"}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </form>
    </div>
  );
};

export default GoalsAndRiskStep;
