
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { ArrowRight, ArrowLeft, CreditCard, Plus, Minus } from "lucide-react";
import { Label } from "@/components/ui/label";

interface DebtItem {
  name: string;
  amount: string;
  interest_rate: string;
  monthly_payment: string;
}

interface DebtStepProps {
  formData: {
    debts: DebtItem[];
  };
  updateFormData: (data: Partial<DebtStepProps['formData']>) => void;
  nextStep: () => void;
  prevStep: () => void;
}

const DebtStep: React.FC<DebtStepProps> = ({
  formData,
  updateFormData,
  nextStep,
  prevStep,
}) => {
  const initialDebts = formData.debts && formData.debts.length > 0 
    ? formData.debts 
    : [{ name: "", amount: "", interest_rate: "", monthly_payment: "" }];

  const [debts, setDebts] = useState<DebtItem[]>(initialDebts);
  const [loading, setLoading] = useState(false);

  const handleChange = (index: number, field: keyof DebtItem, value: string) => {
    const updatedDebts = [...debts];
    updatedDebts[index] = { ...updatedDebts[index], [field]: value };
    setDebts(updatedDebts);
  };

  const addDebtField = () => {
    setDebts([...debts, { name: "", amount: "", interest_rate: "", monthly_payment: "" }]);
  };

  const removeDebtField = (index: number) => {
    if (debts.length > 1) {
      const updatedDebts = debts.filter((_, i) => i !== index);
      setDebts(updatedDebts);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Filter out empty debts
    const filledDebts = debts.filter(debt => debt.name.trim() !== "" && debt.amount.trim() !== "");
    
    if (filledDebts.length === 0) {
      // If no debts, just add a placeholder
      setDebts([{ name: "No Debt", amount: "0", interest_rate: "0", monthly_payment: "0" }]);
      updateFormData({ debts: [{ name: "No Debt", amount: "0", interest_rate: "0", monthly_payment: "0" }] });
      nextStep();
      return;
    }
    
    // Validate the filled debts have required fields
    for (const debt of filledDebts) {
      if (!debt.name || !debt.amount) {
        toast.error("Please fill in at least the name and amount for each debt");
        return;
      }
    }
    
    setLoading(true);
    setTimeout(() => {
      updateFormData({ debts: filledDebts });
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
        <h2 className="text-2xl font-bold">Debt Information</h2>
        <p className="text-sm text-muted-foreground mt-2">
          Add information about your current debts (if any)
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {debts.map((debt, index) => (
          <div key={index} className="p-4 border border-gray-200 rounded-lg space-y-3">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium">Debt #{index + 1}</h3>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => removeDebtField(index)}
                disabled={debts.length === 1}
              >
                <Minus className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor={`name-${index}`}>Debt Name</Label>
              <div className="relative">
                <CreditCard className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  id={`name-${index}`}
                  placeholder="Credit Card, Home Loan, etc."
                  value={debt.name}
                  onChange={(e) => handleChange(index, "name", e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor={`amount-${index}`}>Total Amount</Label>
              <Input
                type="text"
                id={`amount-${index}`}
                placeholder="₹100,000"
                value={debt.amount}
                onChange={(e) => handleChange(index, "amount", e.target.value)}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor={`interest-${index}`}>Interest Rate (%)</Label>
                <Input
                  type="text"
                  id={`interest-${index}`}
                  placeholder="8.5"
                  value={debt.interest_rate}
                  onChange={(e) => handleChange(index, "interest_rate", e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor={`payment-${index}`}>Monthly Payment</Label>
                <Input
                  type="text"
                  id={`payment-${index}`}
                  placeholder="₹5,000"
                  value={debt.monthly_payment}
                  onChange={(e) => handleChange(index, "monthly_payment", e.target.value)}
                />
              </div>
            </div>
          </div>
        ))}
        
        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={addDebtField}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Another Debt
        </Button>

        <div className="text-sm text-center text-muted-foreground">
          If you don't have any debts, you can leave this section empty or add "No Debt".
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

export default DebtStep;
