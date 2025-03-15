
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ContactDetailsStep from "@/components/registration/ContactDetailsStep";
import VerifyOtpStep from "@/components/registration/VerifyOtpStep";
import PersonnelInfoStep from "@/components/registration/PersonnelInfoStep";
import ExpensesStep from "@/components/registration/ExpensesStep";
import InvestmentsStep from "@/components/registration/InvestmentsStep";
import DebtStep from "@/components/registration/DebtStep";
import GoalsStep from "@/components/registration/GoalsStep";
import SuccessStep from "@/components/registration/SuccessStep";

const Register = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Contact details
    name: "",
    phone: "",
    email: "",
    age: "",
    
    // Personnel info
    salary: "",
    marital_status: "",
    kids: "0",
    job_stability: "",
    savings: "",
    emergency_fund: "",
    
    // Monthly expenses
    expenses: [
      { name: "Rent/Mortgage", amount: "" },
      { name: "Food/Groceries", amount: "" },
      { name: "Transportation", amount: "" },
      { name: "Utilities", amount: "" },
      { name: "Entertainment", amount: "" }
    ],
    
    // Investments
    investments: {
      equity: "",
      gold: "",
      etf: "",
      crypto: "",
      real_estate: "",
      fixed_deposits: "",
      others: ""
    },
    
    // Debts
    debts: [
      { name: "Credit Card", amount: "", interest_rate: "", monthly_payment: "" },
      { name: "Home Loan", amount: "", interest_rate: "", monthly_payment: "" },
      { name: "Personal Loan", amount: "", interest_rate: "", monthly_payment: "" },
      { name: "Education Loan", amount: "", interest_rate: "", monthly_payment: "" },
      { name: "Car Loan", amount: "", interest_rate: "", monthly_payment: "" }
    ],
    
    // Goals
    short_term_goals: "",
    long_term_goals: "",
    risk_tolerance: "",
    habits: ""
  });

  const updateFormData = (newData: Partial<typeof formData>) => {
    setFormData({ ...formData, ...newData });
  };

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      navigate("/login");
    }
  };

  const getProgressPercentage = () => {
    const totalSteps = 8;
    return (currentStep / totalSteps) * 100;
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <ContactDetailsStep
            formData={formData}
            updateFormData={updateFormData}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        );
      case 2:
        return (
          <VerifyOtpStep
            phone={formData.phone}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        );
      case 3:
        return (
          <PersonnelInfoStep
            formData={formData}
            updateFormData={updateFormData}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        );
      case 4:
        return (
          <ExpensesStep
            formData={formData}
            updateFormData={updateFormData}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        );
      case 5:
        return (
          <InvestmentsStep
            formData={formData}
            updateFormData={updateFormData}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        );
      case 6:
        return (
          <DebtStep
            formData={formData}
            updateFormData={updateFormData}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        );
      case 7:
        return (
          <GoalsStep
            formData={formData}
            updateFormData={updateFormData}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        );
      case 8:
        return <SuccessStep navigate={navigate} />;
      default:
        return <ContactDetailsStep formData={formData} updateFormData={updateFormData} nextStep={nextStep} prevStep={prevStep} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-background/70 via-secondary/20">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-lg mx-auto mb-8">
          <div className="w-full bg-secondary/40 h-2 rounded-full overflow-hidden">
            <div 
              className="h-full progress-gradient transition-all duration-300 ease-out"
              style={{ width: `${getProgressPercentage()}%` }}
            ></div>
          </div>
          <div className="mt-2 flex justify-between text-xs text-muted-foreground">
            <span>Step {currentStep} of 8</span>
            <span>{Math.round(getProgressPercentage())}% Complete</span>
          </div>
        </div>
        <div className="flex justify-center">
          {renderStep()}
        </div>
      </div>
    </div>
  );
};

export default Register;
