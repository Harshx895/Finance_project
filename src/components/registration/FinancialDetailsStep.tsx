
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { Label } from "@/components/ui/label";

interface FinancialDetailsStepProps {
  formData: {
    salary: string;
    marital_status: string;
    kids: string;
    job_stability: string;
    savings: string;
    debt: string;
    monthly_expenses: {
      rent: string;
      food: string;
      outings: string;
      school_fees: string;
      self_care: string;
      others: string;
    };
    emergency_fund: string;
  };
  updateFormData: (data: Partial<FinancialDetailsStepProps['formData']>) => void;
  nextStep: () => void;
  prevStep: () => void;
}

const FinancialDetailsStep: React.FC<FinancialDetailsStepProps> = ({
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
    debt: formData.debt || "",
    monthly_expenses: {
      rent: formData.monthly_expenses?.rent || "",
      food: formData.monthly_expenses?.food || "",
      outings: formData.monthly_expenses?.outings || "",
      school_fees: formData.monthly_expenses?.school_fees || "",
      self_care: formData.monthly_expenses?.self_care || "",
      others: formData.monthly_expenses?.others || "",
    },
    emergency_fund: formData.emergency_fund || "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleExpenseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData({
      ...data,
      monthly_expenses: {
        ...data.monthly_expenses,
        [name]: value,
      },
    });
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
    <div className="glass-card max-w-lg w-full p-8 animate-in">
      <Button
        variant="ghost"
        size="icon"
        onClick={prevStep}
        className="absolute left-4 top-4"
      >
        <ArrowLeft className="h-4 w-4" />
      </Button>

      <div className="text-left mb-6">
        <h2 className="text-2xl font-bold">Financial Information</h2>
        <p className="text-sm text-muted-foreground mt-2">
          Help us understand your financial situation
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="salary">Annual Salary</Label>
            <Input
              type="text"
              id="salary"
              name="salary"
              placeholder="₹12 LPA"
              value={data.salary}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="marital_status">Marital Status</Label>
            <select
              id="marital_status"
              name="marital_status"
              value={data.marital_status}
              onChange={handleChange}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
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

          <div className="space-y-2">
            <Label htmlFor="kids">Number of Kids</Label>
            <Input
              type="number"
              id="kids"
              name="kids"
              placeholder="0"
              value={data.kids}
              onChange={handleChange}
              min="0"
              max="10"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="job_stability">Job Stability</Label>
            <select
              id="job_stability"
              name="job_stability"
              value={data.job_stability}
              onChange={handleChange}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
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
          <Input
            type="text"
            id="savings"
            name="savings"
            placeholder="₹100,000"
            value={data.savings}
            onChange={handleChange}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="debt">Current Debt (if any)</Label>
          <Input
            type="text"
            id="debt"
            name="debt"
            placeholder="₹0"
            value={data.debt}
            onChange={handleChange}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="emergency_fund">Emergency Fund</Label>
          <Input
            type="text"
            id="emergency_fund"
            name="emergency_fund"
            placeholder="₹50,000"
            value={data.emergency_fund}
            onChange={handleChange}
          />
        </div>

        <div className="space-y-2">
          <Label>Monthly Expenses</Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              type="text"
              name="rent"
              placeholder="Rent"
              value={data.monthly_expenses.rent}
              onChange={handleExpenseChange}
            />
            <Input
              type="text"
              name="food"
              placeholder="Food/Groceries"
              value={data.monthly_expenses.food}
              onChange={handleExpenseChange}
            />
            <Input
              type="text"
              name="outings"
              placeholder="Outings"
              value={data.monthly_expenses.outings}
              onChange={handleExpenseChange}
            />
            <Input
              type="text"
              name="school_fees"
              placeholder="School Fees"
              value={data.monthly_expenses.school_fees}
              onChange={handleExpenseChange}
            />
            <Input
              type="text"
              name="self_care"
              placeholder="Self Care"
              value={data.monthly_expenses.self_care}
              onChange={handleExpenseChange}
            />
            <Input
              type="text"
              name="others"
              placeholder="Others"
              value={data.monthly_expenses.others}
              onChange={handleExpenseChange}
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

export default FinancialDetailsStep;
