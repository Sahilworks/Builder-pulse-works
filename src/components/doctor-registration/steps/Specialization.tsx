import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Plus, X, Stethoscope, Settings } from "lucide-react";

interface SpecializationProps {
  data: any;
  updateData: (section: string, data: any) => void;
}

const medicalSpecialties = [
  "Cardiology",
  "Dermatology",
  "Endocrinology",
  "Gastroenterology",
  "Neurology",
  "Oncology",
  "Orthopedics",
  "Pediatrics",
  "Psychiatry",
  "Radiology",
  "General Medicine",
  "Surgery",
  "Gynecology",
  "Ophthalmology",
  "ENT",
  "Anesthesiology",
  "Emergency Medicine",
  "Family Medicine",
  "Internal Medicine",
  "Pathology",
  "Pulmonology",
  "Urology",
  "Nephrology",
  "Rheumatology",
];

// SERVICES BASED ON SELECTED SPECIALTY
const specialtyServices: { [key: string]: string[] } = {
  Cardiology: [
    "Heart Disease Consultation",
    "ECG",
    "Echocardiography",
    "Stress Testing",
    "Cardiac Catheterization",
    "Pacemaker Consultation",
    "Angioplasty Consultation",
    "Heart Surgery Consultation",
  ],
  Dermatology: [
    "Skin Consultation",
    "Acne Treatment",
    "Skin Cancer Screening",
    "Laser Treatment",
    "Chemical Peels",
    "Hair Loss Treatment",
    "Mole Removal",
    "Cosmetic Procedures",
  ],
  Pediatrics: [
    "Child Health Checkup",
    "Vaccination",
    "Growth Monitoring",
    "Developmental Assessment",
    "Fever Management",
    "Respiratory Infections",
    "Digestive Issues",
    "Behavioral Counseling",
  ],
  Orthopedics: [
    "Bone & Joint Consultation",
    "Fracture Treatment",
    "Sports Injury",
    "Arthritis Management",
    "Joint Replacement Consultation",
    "Spine Treatment",
    "Physiotherapy",
    "X-ray Interpretation",
  ],
  "General Medicine": [
    "General Health Checkup",
    "Diabetes Management",
    "Hypertension Treatment",
    "Fever Treatment",
    "Preventive Care",
    "Health Screening",
    "Chronic Disease Management",
    "Medical Consultation",
  ],
  Gynecology: [
    "Women's Health Consultation",
    "Pregnancy Care",
    "Menstrual Disorders",
    "Contraception Counseling",
    "Pap Smear",
    "Ultrasound",
    "Fertility Consultation",
    "Menopause Management",
  ],
  Ophthalmology: [
    "Eye Examination",
    "Vision Testing",
    "Cataract Consultation",
    "Glaucoma Treatment",
    "Retinal Examination",
    "Contact Lens Fitting",
    "Laser Eye Surgery Consultation",
    "Eye Infection Treatment",
  ],
  ENT: [
    "Ear Examination",
    "Hearing Test",
    "Throat Infection Treatment",
    "Sinus Treatment",
    "Tonsillectomy Consultation",
    "Nasal Surgery Consultation",
    "Voice Disorders",
    "Allergy Treatment",
  ],
  Neurology: [
    "Neurological Consultation",
    "Headache Treatment",
    "Epilepsy Management",
    "Stroke Care",
    "Memory Assessment",
    "Movement Disorders",
    "Nerve Conduction Studies",
    "Brain Health",
  ],
  Psychiatry: [
    "Mental Health Consultation",
    "Depression Treatment",
    "Anxiety Management",
    "Counseling",
    "Medication Management",
    "Therapy Sessions",
    "Stress Management",
    "Behavioral Therapy",
  ],
};

export const Specialization = ({ data, updateData }: SpecializationProps) => {
  const [customService, setCustomService] = useState("");
  const [availableServices, setAvailableServices] = useState<string[]>([]);

  useEffect(() => {
    if (data.specialization?.selectedSpecialty) {
      setAvailableServices(
        specialtyServices[data.specialization.selectedSpecialty] || [],
      );
    } else {
      setAvailableServices([]);
    }
  }, [data.specialization?.selectedSpecialty]);

  // CHANGED: Only allow SINGLE specialty selection
  const handleSpecialtySelect = (specialty: string) => {
    if (data.specialization?.selectedSpecialty === specialty) {
      // Deselect if already selected
      updateData("specialization", { selectedSpecialty: "", services: [] });
    } else {
      // Select new specialty and reset services
      updateData("specialization", {
        selectedSpecialty: specialty,
        services: [],
      });
    }
  };

  const toggleService = (service: string) => {
    const currentServices = data.specialization?.services || [];
    const newServices = currentServices.includes(service)
      ? currentServices.filter((s: string) => s !== service)
      : [...currentServices, service];

    updateData("specialization", { services: newServices });
  };

  const addCustomService = () => {
    if (
      customService.trim() &&
      !(data.specialization?.services || []).includes(customService.trim())
    ) {
      updateData("specialization", {
        services: [
          ...(data.specialization?.services || []),
          customService.trim(),
        ],
      });
      setCustomService("");
    }
  };

  const removeService = (service: string) => {
    updateData("specialization", {
      services: (data.specialization?.services || []).filter(
        (s: string) => s !== service,
      ),
    });
  };

  return (
    <div className="space-y-6">
      {/* CHANGED: Only 2 tabs - Specialty and Services (removed Conditions & Treatments) */}
      <Tabs defaultValue="specialty" className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-gray-100 p-1 rounded-lg">
          <TabsTrigger
            value="specialty"
            className="data-[state=active]:bg-primary-green data-[state=active]:text-white flex items-center gap-2"
          >
            <Stethoscope className="w-4 h-4" />
            Select ONE Specialty
          </TabsTrigger>
          <TabsTrigger
            value="services"
            className="data-[state=active]:bg-primary-green data-[state=active]:text-white flex items-center gap-2"
            disabled={!data.specialization?.selectedSpecialty}
          >
            <Settings className="w-4 h-4" />
            Services Offered
          </TabsTrigger>
        </TabsList>

        {/* CHANGED: Single Specialty Selection Tab */}
        <TabsContent value="specialty" className="space-y-6">
          <Card className="border-l-4 border-l-primary-green">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-primary-text mb-4 flex items-center gap-2">
                <Stethoscope className="w-5 h-5 text-primary-green" />
                Select Your PRIMARY Medical Specialty (Only ONE)
              </h3>

              <div className="mb-4 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                <p className="text-amber-800 text-sm">
                  <strong>Important:</strong> You can select only ONE primary
                  specialty. Once selected, you cannot choose another specialty.
                  Choose carefully.
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {medicalSpecialties.map((specialty) => (
                  <Button
                    key={specialty}
                    variant={
                      data.specialization?.selectedSpecialty === specialty
                        ? "default"
                        : "outline"
                    }
                    size="sm"
                    onClick={() => handleSpecialtySelect(specialty)}
                    disabled={
                      data.specialization?.selectedSpecialty &&
                      data.specialization?.selectedSpecialty !== specialty
                    }
                    className={
                      data.specialization?.selectedSpecialty === specialty
                        ? "bg-primary-green hover:bg-secondary-green text-white"
                        : data.specialization?.selectedSpecialty
                          ? "border-gray-300 text-gray-400 cursor-not-allowed"
                          : "border-primary-green text-primary-green hover:bg-primary-green hover:text-white"
                    }
                  >
                    {specialty}
                  </Button>
                ))}
              </div>

              {data.specialization?.selectedSpecialty && (
                <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Stethoscope className="w-4 h-4 text-green-600" />
                    <span className="font-medium text-green-800">
                      Selected Specialty:
                    </span>
                  </div>
                  <Badge className="bg-primary-green text-white text-base px-3 py-1">
                    {data.specialization.selectedSpecialty}
                  </Badge>
                  <p className="text-green-700 text-sm mt-2">
                    Perfect! Now you can proceed to select the services you
                    offer in this specialty.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* NEW: Services Tab Based on Selected Specialty */}
        <TabsContent value="services" className="space-y-6">
          <Card className="border-l-4 border-l-secondary-green">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-primary-text mb-4 flex items-center gap-2">
                <Settings className="w-5 h-5 text-secondary-green" />
                Services Offered in {data.specialization?.selectedSpecialty}
              </h3>

              {availableServices.length > 0 && (
                <div className="space-y-4">
                  <h4 className="font-medium text-primary-text">
                    Common Services in {data.specialization?.selectedSpecialty}
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {availableServices.map((service) => (
                      <Button
                        key={service}
                        variant={
                          (data.specialization?.services || []).includes(
                            service,
                          )
                            ? "default"
                            : "outline"
                        }
                        size="sm"
                        onClick={() => toggleService(service)}
                        className={
                          (data.specialization?.services || []).includes(
                            service,
                          )
                            ? "bg-secondary-green hover:bg-primary-green text-white text-left h-auto py-3 px-4 justify-start"
                            : "border-secondary-green text-secondary-green hover:bg-secondary-green hover:text-white text-left h-auto py-3 px-4 justify-start"
                        }
                      >
                        {service}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              <div className="space-y-4 mt-6">
                <h4 className="font-medium text-primary-text">
                  Add Custom Service
                </h4>
                <div className="flex gap-2">
                  <Input
                    value={customService}
                    onChange={(e) => setCustomService(e.target.value)}
                    placeholder="Enter custom service name"
                    className="border-gray-300 focus:border-secondary-green focus:ring-secondary-green"
                    onKeyPress={(e) => e.key === "Enter" && addCustomService()}
                  />
                  <Button
                    onClick={addCustomService}
                    disabled={!customService.trim()}
                    className="bg-secondary-green hover:bg-primary-green"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {(data.specialization?.services || []).length > 0 && (
                <div className="space-y-3 mt-6">
                  <h4 className="font-medium text-primary-text">
                    Selected Services (
                    {(data.specialization?.services || []).length})
                  </h4>
                  <div className="space-y-2">
                    {(data.specialization?.services || []).map(
                      (service: string, index: number) => (
                        <div
                          key={index}
                          className="flex items-center justify-between bg-gray-50 p-3 rounded-lg"
                        >
                          <span className="text-sm text-gray-700 flex items-center gap-2">
                            <Settings className="w-3 h-3 text-secondary-green" />
                            {service}
                          </span>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => removeService(service)}
                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      ),
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Summary Card */}
      <Card className="border-l-4 border-l-accent-green bg-gradient-to-r from-slate-50 to-slate-100">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-primary-text mb-4">
            Specialization Summary
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-green">
                {data.specialization?.selectedSpecialty ? "1" : "0"}
              </div>
              <div className="text-sm text-gray-600">Primary Specialty</div>
              {data.specialization?.selectedSpecialty && (
                <div className="text-xs text-primary-green mt-1 font-medium">
                  {data.specialization.selectedSpecialty}
                </div>
              )}
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-secondary-green">
                {(data.specialization?.services || []).length}
              </div>
              <div className="text-sm text-gray-600">Services Offered</div>
              {(data.specialization?.services || []).length > 0 && (
                <div className="text-xs text-secondary-green mt-1 font-medium">
                  Ready to serve patients
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
