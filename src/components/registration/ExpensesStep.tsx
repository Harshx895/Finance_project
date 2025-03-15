
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { ArrowRight, ArrowLeft, Receipt, Plus, Minus, DollarSign, ShoppingBag, BadgeDollarSign } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface ExpenseItem {
  name: string;
  amount: string;
}

interface ExpensesStepProps {
  formData: {
    expenses: ExpenseItem[];
  };
  updateFormData: (data: Partial<ExpensesStepProps['formData']>) => void;
  nextStep: () => void;
  prevStep: () => void;
}

const ExpensesStep: React.FC<ExpensesStepProps> = ({
  formData,
  updateFormData,
  nextStep,
  prevStep,
}) => {
  const initialExpenses = formData.expenses && formData.expenses.length > 0 
    ? formData.expenses 
    : [{ name: "", amount: "" }];

  const [expenses, setExpenses] = useState<ExpenseItem[]>(initialExpenses);
  const [loading, setLoading] = useState(false);

  // Sample expense categories with icons
  const expenseCategories = [
    { name: "Rent/Mortgage", icon: <BadgeDollarSign className="h-4 w-4" /> },
    { name: "Groceries", icon: <ShoppingBag className="h-4 w-4" /> },
    { name: "Utilities", icon: <Receipt className="h-4 w-4" /> },
    { name: "Transportation", icon: <Receipt className="h-4 w-4" /> },
    { name: "Entertainment", icon: <Receipt className="h-4 w-4" /> },
  ];

  const handleChange = (index: number, field: keyof ExpenseItem, value: string) => {
    const updatedExpenses = [...expenses];
    updatedExpenses[index] = { ...updatedExpenses[index], [field]: value };
    setExpenses(updatedExpenses);
  };

  const addExpenseField = () => {
    setExpenses([...expenses, { name: "", amount: "" }]);
  };

  const removeExpenseField = (index: number) => {
    if (expenses.length > 1) {
      const updatedExpenses = expenses.filter((_, i) => i !== index);
      setExpenses(updatedExpenses);
    }
  };

  const selectCategory = (index: number, category: string) => {
    handleChange(index, "name", category);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Filter out empty expenses
    const filledExpenses = expenses.filter(expense => expense.name.trim() !== "" && expense.amount.trim() !== "");
    
    if (filledExpenses.length === 0) {
      // If no expenses, add a placeholder
      setExpenses([{ name: "No Regular Expenses", amount: "0" }]);
      updateFormData({ expenses: [{ name: "No Regular Expenses", amount: "0" }] });
      nextStep();
      return;
    }
    
    // Validate the filled expenses have required fields
    for (const expense of filledExpenses) {
      if (!expense.name || !expense.amount) {
        toast.error("Please fill in both the name and amount for each expense");
        return;
      }
    }
    
    setLoading(true);
    setTimeout(() => {
      updateFormData({ expenses: filledExpenses });
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
        <CardTitle className="text-2xl font-bold">Monthly Expenses</CardTitle>
        <CardDescription>
          Add your regular monthly expenses
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {expenses.map((expense, index) => (
            <div key={index} className="p-4 bg-secondary/50 rounded-lg border border-border/50 shadow-sm space-y-3">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium flex items-center gap-2">
                  <BadgeDollarSign className="h-4 w-4 text-primary" />
                  Expense #{index + 1}
                </h3>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeExpenseField(index)}
                  disabled={expenses.length === 1}
                  className="h-6 w-6"
                >
                  <Minus className="h-3 w-3" />
                </Button>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor={`name-${index}`}>Expense Category</Label>
                <div className="relative">
                  <Receipt className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="text"
                    id={`name-${index}`}
                    placeholder="Rent, Groceries, Utilities, etc."
                    value={expense.name}
                    onChange={(e) => handleChange(index, "name", e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex flex-wrap gap-2 mt-1">
                  {expenseCategories.map((category, i) => (
                    <Button 
                      key={i} 
                      type="button" 
                      variant="outline" 
                      size="sm" 
                      onClick={() => selectCategory(index, category.name)}
                      className={expense.name === category.name ? "bg-secondary border-primary" : ""}
                    >
                      {category.icon}
                      <span className="text-xs">{category.name}</span>
                    </Button>
                  ))}
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor={`amount-${index}`}>Monthly Amount</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="text"
                    id={`amount-${index}`}
                    placeholder="₹5,000"
                    value={expense.amount}
                    onChange={(e) => handleChange(index, "amount", e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            </div>
          ))}
          
          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={addExpenseField}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Another Expense
          </Button>

          <div className="bg-secondary/30 p-3 rounded-lg border border-border/40 text-sm text-center text-muted-foreground">
            <BadgeDollarSign className="h-4 w-4 inline mr-1 text-primary" />
            Enter all your significant monthly expenses to get a better financial analysis.
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
      </CardContent>
    </Card>
  );
};

export default ExpensesStep;
