
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PhoneStep from "@/components/registration/PhoneStep";
import VerifyOtpStep from "@/components/registration/VerifyOtpStep";
import BasicInfoStep from "@/components/registration/BasicInfoStep";
import FinancialDetailsStep from "@/components/registration/FinancialDetailsStep";
import GoalsAndRiskStep from "@/components/registration/GoalsAndRiskStep";
import SuccessStep from "@/components/registration/SuccessStep";

const Register = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    phone: "",
    name: "",
    email: "",
    age: "",
    gender: "",
    salary: "",
    marital_status: "",
    kids: "0",
    job_stability: "",
    savings: "",
    debt: "",
    monthly_expenses: {
      rent: "",
      food: "",
      outings: "",
      school_fees: "",
      self_care: "",
      others: ""
    },
    emergency_fund: "",
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
          <PhoneStep
            phone={formData.phone}
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
          <BasicInfoStep
            formData={formData}
            updateFormData={updateFormData}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        );
      case 4:
        return (
          <FinancialDetailsStep
            formData={formData}
            updateFormData={updateFormData}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        );
      case 5:
        return (
          <GoalsAndRiskStep
            formData={formData}
            updateFormData={updateFormData}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        );
      case 6:
        return <SuccessStep navigate={navigate} />;
      default:
        return <PhoneStep phone={formData.phone} updateFormData={updateFormData} nextStep={nextStep} prevStep={prevStep} />;
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
