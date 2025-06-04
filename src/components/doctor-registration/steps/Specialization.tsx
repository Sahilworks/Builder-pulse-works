import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Plus, X, Stethoscope, Heart, Brain } from "lucide-react";
import { FormData } from "../RegistrationForm";

interface SpecializationProps {
  data: FormData;
  updateData: (section: keyof FormData, data: any) => void;
}

const commonSpecialties = [
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

const commonConditions = [
  "Diabetes",
  "Hypertension",
  "Heart Disease",
  "Asthma",
  "Depression",
  "Anxiety",
  "Arthritis",
  "Back Pain",
  "Migraine",
  "Allergies",
  "Skin Conditions",
  "Digestive Issues",
  "Sleep Disorders",
  "Obesity",
  "Chronic Pain",
  "Thyroid Disorders",
  "COPD",
  "Cancer",
  "Stroke",
  "Kidney Disease",
  "Liver Disease",
  "Autoimmune Disorders",
];

const treatmentAreas = [
  "Preventive Care",
  "Acute Care",
  "Chronic Disease Management",
  "Rehabilitation",
  "Pain Management",
  "Mental Health",
  "Women's Health",
  "Men's Health",
  "Pediatric Care",
  "Geriatric Care",
  "Sports Medicine",
  "Occupational Health",
  "Travel Medicine",
  "Addiction Medicine",
  "Palliative Care",
  "Emergency Care",
  "Surgical Procedures",
  "Diagnostic Services",
  "Telemedicine",
  "Home Visits",
];

export const Specialization = ({ data, updateData }: SpecializationProps) => {
  const [newSpecialty, setNewSpecialty] = useState("");
  const [newCondition, setNewCondition] = useState("");
  const [newTreatmentArea, setNewTreatmentArea] = useState("");

  const handleArrayUpdate = (
    field: keyof typeof data.specialization,
    value: string[],
  ) => {
    updateData("specialization", { [field]: value });
  };

  const addItem = (
    field: keyof typeof data.specialization,
    item: string,
    setter: (value: string) => void,
  ) => {
    if (item && !data.specialization[field].includes(item)) {
      handleArrayUpdate(field, [...data.specialization[field], item]);
    }
    setter("");
  };

  const removeItem = (
    field: keyof typeof data.specialization,
    item: string,
  ) => {
    handleArrayUpdate(
      field,
      data.specialization[field].filter((i) => i !== item),
    );
  };

  const toggleItem = (
    field: keyof typeof data.specialization,
    item: string,
  ) => {
    if (data.specialization[field].includes(item)) {
      removeItem(field, item);
    } else {
      handleArrayUpdate(field, [...data.specialization[field], item]);
    }
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="specialties" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-gray-100 p-1 rounded-lg">
          <TabsTrigger
            value="specialties"
            className="data-[state=active]:bg-primary-green data-[state=active]:text-white flex items-center gap-2"
          >
            <Stethoscope className="w-4 h-4" />
            Specialties
          </TabsTrigger>
          <TabsTrigger
            value="conditions"
            className="data-[state=active]:bg-primary-green data-[state=active]:text-white flex items-center gap-2"
          >
            <Heart className="w-4 h-4" />
            Conditions
          </TabsTrigger>
          <TabsTrigger
            value="treatments"
            className="data-[state=active]:bg-primary-green data-[state=active]:text-white flex items-center gap-2"
          >
            <Brain className="w-4 h-4" />
            Treatments
          </TabsTrigger>
        </TabsList>

        {/* Medical Specialties Tab */}
        <TabsContent value="specialties" className="space-y-6">
          <Card className="border-l-4 border-l-primary-green">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-primary-text mb-4 flex items-center gap-2">
                <Stethoscope className="w-5 h-5 text-primary-green" />
                Medical Specialties
              </h3>

              <div className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {commonSpecialties.map((specialty) => (
                    <Button
                      key={specialty}
                      variant={
                        data.specialization.specialties.includes(specialty)
                          ? "default"
                          : "outline"
                      }
                      size="sm"
                      onClick={() => toggleItem("specialties", specialty)}
                      className={
                        data.specialization.specialties.includes(specialty)
                          ? "bg-primary-green hover:bg-secondary-green text-white"
                          : "border-primary-green text-primary-green hover:bg-primary-green hover:text-white"
                      }
                    >
                      {specialty}
                    </Button>
                  ))}
                </div>

                <div className="flex gap-2">
                  <Input
                    value={newSpecialty}
                    onChange={(e) => setNewSpecialty(e.target.value)}
                    placeholder="Add custom specialty"
                    className="border-gray-300 focus:border-primary-green focus:ring-primary-green"
                    onKeyPress={(e) =>
                      e.key === "Enter" &&
                      addItem("specialties", newSpecialty, setNewSpecialty)
                    }
                  />
                  <Button
                    onClick={() =>
                      addItem("specialties", newSpecialty, setNewSpecialty)
                    }
                    className="bg-primary-green hover:bg-secondary-green"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>

                {data.specialization.specialties.length > 0 && (
                  <div className="space-y-2">
                    <Label className="text-primary-text font-medium">
                      Selected Specialties:
                    </Label>
                    <div className="flex flex-wrap gap-2">
                      {data.specialization.specialties.map((specialty) => (
                        <Badge
                          key={specialty}
                          variant="secondary"
                          className="bg-primary-green text-white hover:bg-secondary-green"
                        >
                          {specialty}
                          <X
                            className="w-3 h-3 ml-1 cursor-pointer"
                            onClick={() => removeItem("specialties", specialty)}
                          />
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Conditions Treated Tab */}
        <TabsContent value="conditions" className="space-y-6">
          <Card className="border-l-4 border-l-secondary-green">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-primary-text mb-4 flex items-center gap-2">
                <Heart className="w-5 h-5 text-secondary-green" />
                Conditions Treated
              </h3>

              <div className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {commonConditions.map((condition) => (
                    <Button
                      key={condition}
                      variant={
                        data.specialization.conditionsTreated.includes(
                          condition,
                        )
                          ? "default"
                          : "outline"
                      }
                      size="sm"
                      onClick={() => toggleItem("conditionsTreated", condition)}
                      className={
                        data.specialization.conditionsTreated.includes(
                          condition,
                        )
                          ? "bg-secondary-green hover:bg-primary-green text-white"
                          : "border-secondary-green text-secondary-green hover:bg-secondary-green hover:text-white"
                      }
                    >
                      {condition}
                    </Button>
                  ))}
                </div>

                <div className="flex gap-2">
                  <Input
                    value={newCondition}
                    onChange={(e) => setNewCondition(e.target.value)}
                    placeholder="Add custom condition"
                    className="border-gray-300 focus:border-secondary-green focus:ring-secondary-green"
                    onKeyPress={(e) =>
                      e.key === "Enter" &&
                      addItem(
                        "conditionsTreated",
                        newCondition,
                        setNewCondition,
                      )
                    }
                  />
                  <Button
                    onClick={() =>
                      addItem(
                        "conditionsTreated",
                        newCondition,
                        setNewCondition,
                      )
                    }
                    className="bg-secondary-green hover:bg-primary-green"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>

                {data.specialization.conditionsTreated.length > 0 && (
                  <div className="space-y-2">
                    <Label className="text-primary-text font-medium">
                      Selected Conditions:
                    </Label>
                    <div className="flex flex-wrap gap-2">
                      {data.specialization.conditionsTreated.map(
                        (condition) => (
                          <Badge
                            key={condition}
                            variant="secondary"
                            className="bg-secondary-green text-white hover:bg-primary-green"
                          >
                            {condition}
                            <X
                              className="w-3 h-3 ml-1 cursor-pointer"
                              onClick={() =>
                                removeItem("conditionsTreated", condition)
                              }
                            />
                          </Badge>
                        ),
                      )}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Other Treatment Areas Tab */}
        <TabsContent value="treatments" className="space-y-6">
          <Card className="border-l-4 border-l-accent-blue">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-primary-text mb-4 flex items-center gap-2">
                <Brain className="w-5 h-5 text-accent-blue" />
                Other Treatment Areas
              </h3>

              <div className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {treatmentAreas.map((area) => (
                    <Button
                      key={area}
                      variant={
                        data.specialization.otherTreatmentAreas.includes(area)
                          ? "default"
                          : "outline"
                      }
                      size="sm"
                      onClick={() => toggleItem("otherTreatmentAreas", area)}
                      className={
                        data.specialization.otherTreatmentAreas.includes(area)
                          ? "bg-accent-blue hover:bg-blue-600 text-white"
                          : "border-accent-blue text-accent-blue hover:bg-accent-blue hover:text-white"
                      }
                    >
                      {area}
                    </Button>
                  ))}
                </div>

                <div className="flex gap-2">
                  <Input
                    value={newTreatmentArea}
                    onChange={(e) => setNewTreatmentArea(e.target.value)}
                    placeholder="Add custom treatment area"
                    className="border-gray-300 focus:border-accent-blue focus:ring-accent-blue"
                    onKeyPress={(e) =>
                      e.key === "Enter" &&
                      addItem(
                        "otherTreatmentAreas",
                        newTreatmentArea,
                        setNewTreatmentArea,
                      )
                    }
                  />
                  <Button
                    onClick={() =>
                      addItem(
                        "otherTreatmentAreas",
                        newTreatmentArea,
                        setNewTreatmentArea,
                      )
                    }
                    className="bg-accent-blue hover:bg-blue-600"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>

                {data.specialization.otherTreatmentAreas.length > 0 && (
                  <div className="space-y-2">
                    <Label className="text-primary-text font-medium">
                      Selected Treatment Areas:
                    </Label>
                    <div className="flex flex-wrap gap-2">
                      {data.specialization.otherTreatmentAreas.map((area) => (
                        <Badge
                          key={area}
                          variant="secondary"
                          className="bg-accent-blue text-white hover:bg-blue-600"
                        >
                          {area}
                          <X
                            className="w-3 h-3 ml-1 cursor-pointer"
                            onClick={() =>
                              removeItem("otherTreatmentAreas", area)
                            }
                          />
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary-green">
                {data.specialization.specialties.length}
              </div>
              <div className="text-sm text-gray-600">Medical Specialties</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-secondary-green">
                {data.specialization.conditionsTreated.length}
              </div>
              <div className="text-sm text-gray-600">Conditions Treated</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-accent-blue">
                {data.specialization.otherTreatmentAreas.length}
              </div>
              <div className="text-sm text-gray-600">Treatment Areas</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
