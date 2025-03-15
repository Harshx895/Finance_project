
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
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center">
          {renderStep()}
        </div>
      </div>
    </div>
  );
};

export default Register;
