import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import {
  Upload,
  GraduationCap,
  Award,
  FileText,
  Calendar,
  Building,
} from "lucide-react";
import { FormData } from "../RegistrationForm";

interface EducationProps {
  data: FormData;
  updateData: (section: keyof FormData, data: any) => void;
}

const degreeOptions = [
  "MBBS",
  "MD",
  "MS",
  "DM",
  "MCh",
  "DNB",
  "BAMS",
  "BHMS",
  "BDS",
  "MDS",
  "BUMS",
  "BNYS",
  "BPT",
  "MPT",
  "B.Sc Nursing",
  "M.Sc Nursing",
  "PharmD",
  "BVSc",
  "MVSc",
  "Other",
];

const medicalCouncils = [
  "Medical Council of India (MCI)",
  "National Medical Commission (NMC)",
  "State Medical Council",
  "Dental Council of India (DCI)",
  "Pharmacy Council of India (PCI)",
  "Indian Nursing Council (INC)",
  "Central Council of Homoeopathy (CCH)",
  "Central Council of Indian Medicine (CCIM)",
  "Other",
];

export const Education = ({ data, updateData }: EducationProps) => {
  const handleInputChange = (field: string, value: any) => {
    updateData("education", { [field]: value });
  };

  const handleFileChange = (file: File | null) => {
    handleInputChange("medicalLicence", file);
  };

  return (
    <div className="space-y-6">
      {/* Educational Background */}
      <Card className="border-l-4 border-l-primary-green">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-primary-text mb-4 flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-primary-green" />
            Educational Background
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="text-primary-text font-medium flex items-center gap-2">
                <Award className="w-4 h-4 text-secondary-green" />
                Highest Medical Degree *
              </Label>
              <Select
                value={data.education.highestDegree}
                onValueChange={(value) =>
                  handleInputChange("highestDegree", value)
                }
              >
                <SelectTrigger className="border-gray-300 focus:border-primary-green focus:ring-primary-green">
                  <SelectValue placeholder="Select your highest degree" />
                </SelectTrigger>
                <SelectContent>
                  {degreeOptions.map((degree) => (
                    <SelectItem key={degree} value={degree}>
                      {degree}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-gray-500">
                Select your highest medical qualification
              </p>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="university"
                className="text-primary-text font-medium flex items-center gap-2"
              >
                <Building className="w-4 h-4 text-secondary-green" />
                University/Institute *
              </Label>
              <Input
                id="university"
                value={data.education.university}
                onChange={(e) =>
                  handleInputChange("university", e.target.value)
                }
                placeholder="Enter university or institute name"
                className="border-gray-300 focus:border-primary-green focus:ring-primary-green"
              />
              <p className="text-xs text-gray-500">
                Institution where you completed your degree
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Medical License Information */}
      <Card className="border-l-4 border-l-secondary-green">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-primary-text mb-4 flex items-center gap-2">
            <FileText className="w-5 h-5 text-secondary-green" />
            Medical License Information
          </h3>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label
                  htmlFor="medicalLicenceNumber"
                  className="text-primary-text font-medium"
                >
                  Medical License Number *
                </Label>
                <Input
                  id="medicalLicenceNumber"
                  value={data.education.medicalLicenceNumber}
                  onChange={(e) =>
                    handleInputChange("medicalLicenceNumber", e.target.value)
                  }
                  placeholder="Enter your license number"
                  className="border-gray-300 focus:border-primary-green focus:ring-primary-green"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-primary-text font-medium">
                  Issuing Authority *
                </Label>
                <Select
                  value={data.education.issuingAuthority}
                  onValueChange={(value) =>
                    handleInputChange("issuingAuthority", value)
                  }
                >
                  <SelectTrigger className="border-gray-300 focus:border-primary-green focus:ring-primary-green">
                    <SelectValue placeholder="Select issuing authority" />
                  </SelectTrigger>
                  <SelectContent>
                    {medicalCouncils.map((council) => (
                      <SelectItem key={council} value={council}>
                        {council}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="licenceExpiryDate"
                className="text-primary-text font-medium flex items-center gap-2"
              >
                <Calendar className="w-4 h-4 text-accent-blue" />
                License Expiry Date *
              </Label>
              <Input
                id="licenceExpiryDate"
                type="date"
                value={data.education.licenceExpiryDate}
                onChange={(e) =>
                  handleInputChange("licenceExpiryDate", e.target.value)
                }
                className="border-gray-300 focus:border-primary-green focus:ring-primary-green"
              />
              <p className="text-xs text-gray-500">
                Ensure your license is valid and up to date
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* License Document Upload */}
      <Card className="border-l-4 border-l-accent-blue">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-primary-text mb-4 flex items-center gap-2">
            <Upload className="w-5 h-5 text-accent-blue" />
            Upload Medical License Document
          </h3>
          <div className="space-y-4">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-primary-green transition-colors">
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <div className="text-lg font-medium text-gray-700 mb-2">
                {data.education.medicalLicence
                  ? data.education.medicalLicence.name
                  : "Upload Medical License"}
              </div>
              <div className="text-sm text-gray-500 mb-4">
                Accepted formats: PDF, JPG, PNG (Max size: 10MB)
              </div>
              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
                className="hidden"
                id="license-upload"
              />
              <Label
                htmlFor="license-upload"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-green hover:bg-secondary-green cursor-pointer transition-colors"
              >
                {data.education.medicalLicence
                  ? "Change Document"
                  : "Choose File"}
              </Label>
            </div>

            {data.education.medicalLicence && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-green-600" />
                  <div>
                    <div className="font-medium text-green-800">
                      Document Uploaded Successfully
                    </div>
                    <div className="text-sm text-green-600">
                      {data.education.medicalLicence.name}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Important Notes */}
      <Card className="border-l-4 border-l-accent-green bg-gradient-to-r from-amber-50 to-orange-50">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-primary-text mb-3">
            Important Information
          </h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
              <div>
                <h4 className="font-medium text-red-700">
                  License Verification
                </h4>
                <p className="text-sm text-red-600">
                  Your medical license will be verified with the issuing
                  authority. Please ensure all information is accurate.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-amber-500 rounded-full mt-2"></div>
              <div>
                <h4 className="font-medium text-amber-700">Document Quality</h4>
                <p className="text-sm text-amber-600">
                  Upload clear, high-quality scans of your license. Blurry or
                  unclear documents may delay verification.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <div>
                <h4 className="font-medium text-blue-700">License Validity</h4>
                <p className="text-sm text-blue-600">
                  Ensure your license is current and valid. Expired licenses
                  will require renewal before approval.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
