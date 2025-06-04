import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Circle } from "lucide-react";
import { cn } from "@/lib/utils";

import { PersonalInfo } from "./steps/PersonalInfo";
import { ContactInfo } from "./steps/ContactInfo";
import { Education } from "./steps/Education";
import { Specialization } from "./steps/Specialization";
import { Availability } from "./steps/Availability";
import { Charges } from "./steps/Charges";
import { Review } from "./steps/Review";

export interface FormData {
  personalInfo: {
    fullName: string;
    dateOfBirth: string;
    languages: string[];
    mobileNumber: string;
    resume: File | null;
    profilePicture: File | null;
    bio: string;
    awards: string[];
  };
  contactInfo: {
    phoneNumber: string;
    email: string;
    clinicName: string;
    clinicAddress: string;
    officeNumber: string;
  };
  education: {
    highestDegree: string;
    university: string;
    medicalLicenceNumber: string;
    issuingAuthority: string;
    medicalLicence: File | null;
    licenceExpiryDate: string;
  };
  specialization: {
    specialties: string[];
    conditionsTreated: string[];
    otherTreatmentAreas: string[];
  };
  availability: {
    schedule: {
      [key: string]: {
        isWorking: boolean;
        workHours: { start: string; end: string };
        breakTimes: { start: string; end: string }[];
      };
    };
  };
  charges: {
    clinicVisit: string;
    onlineConsultation: string;
    homeVisit: string;
    paymentMethods: string[];
  };
}

const initialFormData: FormData = {
  personalInfo: {
    fullName: "",
    dateOfBirth: "",
    languages: [],
    mobileNumber: "",
    resume: null,
    profilePicture: null,
    bio: "",
    awards: [],
  },
  contactInfo: {
    phoneNumber: "",
    email: "",
    clinicName: "",
    clinicAddress: "",
    officeNumber: "",
  },
  education: {
    highestDegree: "",
    university: "",
    medicalLicenceNumber: "",
    issuingAuthority: "",
    medicalLicence: null,
    licenceExpiryDate: "",
  },
  specialization: {
    specialties: [],
    conditionsTreated: [],
    otherTreatmentAreas: [],
  },
  availability: {
    schedule: {
      monday: {
        isWorking: false,
        workHours: { start: "", end: "" },
        breakTimes: [],
      },
      tuesday: {
        isWorking: false,
        workHours: { start: "", end: "" },
        breakTimes: [],
      },
      wednesday: {
        isWorking: false,
        workHours: { start: "", end: "" },
        breakTimes: [],
      },
      thursday: {
        isWorking: false,
        workHours: { start: "", end: "" },
        breakTimes: [],
      },
      friday: {
        isWorking: false,
        workHours: { start: "", end: "" },
        breakTimes: [],
      },
      saturday: {
        isWorking: false,
        workHours: { start: "", end: "" },
        breakTimes: [],
      },
      sunday: {
        isWorking: false,
        workHours: { start: "", end: "" },
        breakTimes: [],
      },
    },
  },
  charges: {
    clinicVisit: "",
    onlineConsultation: "",
    homeVisit: "",
    paymentMethods: [],
  },
};

const steps = [
  { id: 1, title: "Personal Information", component: PersonalInfo },
  { id: 2, title: "Contact Information", component: ContactInfo },
  { id: 3, title: "Education & Qualification", component: Education },
  { id: 4, title: "Specialization", component: Specialization },
  { id: 5, title: "Availability", component: Availability },
  { id: 6, title: "Charges & Payment", component: Charges },
  { id: 7, title: "Review & Submit", component: Review },
];

export const RegistrationForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const updateFormData = (section: keyof FormData, data: any) => {
    setFormData((prev) => ({
      ...prev,
      [section]: { ...prev[section], ...data },
    }));
  };

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCompletedSteps((prev) => [
        ...prev.filter((step) => step !== currentStep),
        currentStep,
      ]);
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleStepClick = (stepNumber: number) => {
    setCurrentStep(stepNumber);
  };

  const CurrentStepComponent = steps[currentStep - 1].component;

  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <Card className="sticky top-8 bg-gradient-to-b from-primary-green to-secondary-green border-0 shadow-xl">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold text-white mb-6">
                Registration Steps
              </h3>
              <div className="space-y-4">
                {steps.map((step) => (
                  <div
                    key={step.id}
                    onClick={() => handleStepClick(step.id)}
                    className={cn(
                      "flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all duration-200",
                      currentStep === step.id
                        ? "bg-white bg-opacity-20 border border-white border-opacity-30"
                        : "hover:bg-white hover:bg-opacity-10",
                      completedSteps.includes(step.id) &&
                        "bg-accent-green bg-opacity-20",
                    )}
                  >
                    <div className="flex-shrink-0">
                      {completedSteps.includes(step.id) ? (
                        <CheckCircle2 className="w-6 h-6 text-white" />
                      ) : (
                        <Circle
                          className={cn(
                            "w-6 h-6",
                            currentStep === step.id
                              ? "text-white"
                              : "text-white text-opacity-60",
                          )}
                        />
                      )}
                    </div>
                    <div>
                      <div className="text-xs text-white text-opacity-80 font-medium">
                        Step {step.id}
                      </div>
                      <div
                        className={cn(
                          "text-sm font-medium",
                          currentStep === step.id
                            ? "text-white"
                            : "text-white text-opacity-80",
                        )}
                      >
                        {step.title}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <Card className="shadow-xl border-0">
            <CardContent className="p-8">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-primary-text mb-2">
                  {steps[currentStep - 1].title}
                </h2>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span>
                    Step {currentStep} of {steps.length}
                  </span>
                  <div className="flex-1 bg-gray-200 rounded-full h-2 ml-4">
                    <div
                      className="bg-gradient-to-r from-primary-green to-secondary-green h-2 rounded-full transition-all duration-300"
                      style={{
                        width: `${(currentStep / steps.length) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              </div>

              <CurrentStepComponent
                data={formData}
                updateData={updateFormData}
              />

              <div className="flex justify-between mt-8">
                <Button
                  onClick={handlePrevious}
                  disabled={currentStep === 1}
                  variant="outline"
                  className="border-primary-green text-primary-green hover:bg-primary-green hover:text-white"
                >
                  Previous
                </Button>

                <Button
                  onClick={handleNext}
                  disabled={currentStep === steps.length}
                  className="bg-gradient-to-r from-primary-green to-secondary-green hover:from-secondary-green hover:to-primary-green text-white px-8"
                >
                  {currentStep === steps.length ? "Submit" : "Next"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
