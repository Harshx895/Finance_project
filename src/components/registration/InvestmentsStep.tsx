
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { ArrowRight, ArrowLeft, LineChart, Landmark, Coins, TrendingUp, Home, Building, Bitcoin } from "lucide-react";
import { Label } from "@/components/ui/label";

interface InvestmentsStepProps {
  formData: {
    investments: {
      equity: string;
      gold: string;
      etf: string;
      crypto: string;
      real_estate: string;
      fixed_deposits: string;
      others: string;
    }
  };
  updateFormData: (data: Partial<{ investments: InvestmentsStepProps['formData']['investments'] }>) => void;
  nextStep: () => void;
  prevStep: () => void;
}

const InvestmentsStep: React.FC<InvestmentsStepProps> = ({
  formData,
  updateFormData,
  nextStep,
  prevStep,
}) => {
  const [investments, setInvestments] = useState({
    equity: formData.investments?.equity || "",
    gold: formData.investments?.gold || "",
    etf: formData.investments?.etf || "",
    crypto: formData.investments?.crypto || "",
    real_estate: formData.investments?.real_estate || "",
    fixed_deposits: formData.investments?.fixed_deposits || "",
    others: formData.investments?.others || "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInvestments({ ...investments, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // At least one investment should be filled
    const hasInvestment = Object.values(investments).some(value => value.trim() !== "");
    
    if (!hasInvestment) {
      toast.error("Please provide at least one investment amount");
      return;
    }
    
    setLoading(true);
    setTimeout(() => {
      updateFormData({ investments });
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
        <h2 className="text-2xl font-bold">Investment Portfolio</h2>
        <p className="text-sm text-muted-foreground mt-2">
          Tell us about your investment allocations
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="equity">Equity/Stocks</Label>
          <div className="relative">
            <LineChart className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              id="equity"
              name="equity"
              placeholder="₹50,000"
              value={investments.equity}
              onChange={handleChange}
              className="pl-10"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="gold">Gold</Label>
          <div className="relative">
            <Coins className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              id="gold"
              name="gold"
              placeholder="₹20,000"
              value={investments.gold}
              onChange={handleChange}
              className="pl-10"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="etf">ETFs/Mutual Funds</Label>
          <div className="relative">
            <TrendingUp className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              id="etf"
              name="etf"
              placeholder="₹30,000"
              value={investments.etf}
              onChange={handleChange}
              className="pl-10"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="crypto">Cryptocurrency</Label>
          <div className="relative">
            <Bitcoin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              id="crypto"
              name="crypto"
              placeholder="₹10,000"
              value={investments.crypto}
              onChange={handleChange}
              className="pl-10"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="real_estate">Real Estate</Label>
          <div className="relative">
            <Home className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              id="real_estate"
              name="real_estate"
              placeholder="₹500,000"
              value={investments.real_estate}
              onChange={handleChange}
              className="pl-10"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="fixed_deposits">Fixed Deposits</Label>
          <div className="relative">
            <Landmark className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              id="fixed_deposits"
              name="fixed_deposits"
              placeholder="₹100,000"
              value={investments.fixed_deposits}
              onChange={handleChange}
              className="pl-10"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="others">Other Investments</Label>
          <div className="relative">
            <Building className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              id="others"
              name="others"
              placeholder="₹25,000"
              value={investments.others}
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

export default InvestmentsStep;
