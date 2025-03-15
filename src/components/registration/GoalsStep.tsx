
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { ArrowRight, ArrowLeft, Target, TrendingUp, BadgeDollarSign, Heart, Calendar, ThumbsUp, ThumbsDown } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface GoalsStepProps {
  formData: {
    short_term_goals: string;
    long_term_goals: string;
    risk_tolerance: string;
    habits: string;
  };
  updateFormData: (data: Partial<GoalsStepProps['formData']>) => void;
  nextStep: () => void;
  prevStep: () => void;
}

const GoalsStep: React.FC<GoalsStepProps> = ({
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

  const handleRiskToleranceChange = (value: string) => {
    setData({ ...data, risk_tolerance: value });
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
        <CardTitle className="text-2xl font-bold flex items-center gap-2">
          <Target className="h-5 w-5 text-primary" />
          Goals & Preferences
        </CardTitle>
        <CardDescription>
          Tell us about your financial goals and preferences
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="short_term_goals" className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-primary" />
              Short Term Financial Goals
            </Label>
            <Textarea
              id="short_term_goals"
              name="short_term_goals"
              placeholder="e.g., Save for a vacation, Buy a car"
              value={data.short_term_goals}
              onChange={handleChange}
              rows={2}
              className="bg-secondary/20"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="long_term_goals" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-primary" />
              Long Term Financial Goals
            </Label>
            <Textarea
              id="long_term_goals"
              name="long_term_goals"
              placeholder="e.g., Buy a house, Children's education, Retirement"
              value={data.long_term_goals}
              onChange={handleChange}
              rows={2}
              className="bg-secondary/20"
            />
          </div>

          <div className="space-y-3">
            <Label className="flex items-center gap-2">
              <BadgeDollarSign className="h-4 w-4 text-primary" />
              Risk Tolerance
            </Label>
            <div className="grid grid-cols-3 gap-3">
              <Button
                type="button"
                variant={data.risk_tolerance === "low" ? "default" : "outline"}
                className={data.risk_tolerance === "low" ? "bg-primary" : ""}
                onClick={() => handleRiskToleranceChange("low")}
              >
                <ThumbsDown className="h-4 w-4 mr-2" />
                Low
              </Button>
              <Button
                type="button"
                variant={data.risk_tolerance === "medium" ? "default" : "outline"}
                className={data.risk_tolerance === "medium" ? "bg-primary" : ""}
                onClick={() => handleRiskToleranceChange("medium")}
              >
                <ThumbsUp className="h-4 w-4 mr-2" />
                Medium
              </Button>
              <Button
                type="button"
                variant={data.risk_tolerance === "high" ? "default" : "outline"}
                className={data.risk_tolerance === "high" ? "bg-primary" : ""}
                onClick={() => handleRiskToleranceChange("high")}
              >
                <TrendingUp className="h-4 w-4 mr-2" />
                High
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              {data.risk_tolerance === "low" && "You prefer safer investments with stable returns"}
              {data.risk_tolerance === "medium" && "You can accept moderate risk for better returns"}
              {data.risk_tolerance === "high" && "You can tolerate significant risk for potentially higher returns"}
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="habits" className="flex items-center gap-2">
              <Heart className="h-4 w-4 text-primary" />
              Lifestyle & Habits (Optional)
            </Label>
            <Textarea
              id="habits"
              name="habits"
              placeholder="e.g., Regularly dine out, Travel frequently, No habits"
              value={data.habits}
              onChange={handleChange}
              rows={2}
              className="bg-secondary/20"
            />
          </div>

          <div className="bg-secondary/30 p-3 rounded-lg border border-border/40 text-sm text-center text-muted-foreground">
            <Target className="h-4 w-4 inline mr-1 text-primary" />
            Setting clear financial goals helps create a more personalized financial plan.
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
      </CardContent>
    </Card>
  );
};

export default GoalsStep;
