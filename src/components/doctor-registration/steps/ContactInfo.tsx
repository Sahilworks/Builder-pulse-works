import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Phone, Mail, Building, MapPin, Hash } from "lucide-react";
import { FormData } from "../RegistrationForm";

interface ContactInfoProps {
  data: FormData;
  updateData: (section: keyof FormData, data: any) => void;
}

export const ContactInfo = ({ data, updateData }: ContactInfoProps) => {
  const handleInputChange = (field: string, value: string) => {
    updateData("contactInfo", { [field]: value });
  };

  return (
    <div className="space-y-6">
      {/* Personal Contact */}
      <Card className="border-l-4 border-l-primary-green">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-primary-text mb-4 flex items-center gap-2">
            <Phone className="w-5 h-5 text-primary-green" />
            Personal Contact Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label
                htmlFor="phoneNumber"
                className="text-primary-text font-medium flex items-center gap-2"
              >
                <Phone className="w-4 h-4 text-secondary-green" />
                Phone Number *
              </Label>
              <Input
                id="phoneNumber"
                value={data.contactInfo.phoneNumber}
                onChange={(e) =>
                  handleInputChange("phoneNumber", e.target.value)
                }
                placeholder="+1 (555) 123-4567"
                className="border-gray-300 focus:border-primary-green focus:ring-primary-green"
              />
              <p className="text-xs text-gray-500">
                Primary contact number for patients
              </p>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-primary-text font-medium flex items-center gap-2"
              >
                <Mail className="w-4 h-4 text-secondary-green" />
                Email Address *
              </Label>
              <Input
                id="email"
                type="email"
                value={data.contactInfo.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="doctor@example.com"
                className="border-gray-300 focus:border-primary-green focus:ring-primary-green"
              />
              <p className="text-xs text-gray-500">
                Professional email for appointments and communication
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Clinic Information */}
      <Card className="border-l-4 border-l-secondary-green">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-primary-text mb-4 flex items-center gap-2">
            <Building className="w-5 h-5 text-secondary-green" />
            Clinic Information
          </h3>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label
                  htmlFor="clinicName"
                  className="text-primary-text font-medium flex items-center gap-2"
                >
                  <Building className="w-4 h-4 text-accent-blue" />
                  Clinic Name *
                </Label>
                <Input
                  id="clinicName"
                  value={data.contactInfo.clinicName}
                  onChange={(e) =>
                    handleInputChange("clinicName", e.target.value)
                  }
                  placeholder="Enter clinic name"
                  className="border-gray-300 focus:border-primary-green focus:ring-primary-green"
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="officeNumber"
                  className="text-primary-text font-medium flex items-center gap-2"
                >
                  <Hash className="w-4 h-4 text-accent-blue" />
                  Office/Room Number
                </Label>
                <Input
                  id="officeNumber"
                  value={data.contactInfo.officeNumber}
                  onChange={(e) =>
                    handleInputChange("officeNumber", e.target.value)
                  }
                  placeholder="Office or room number"
                  className="border-gray-300 focus:border-primary-green focus:ring-primary-green"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="clinicAddress"
                className="text-primary-text font-medium flex items-center gap-2"
              >
                <MapPin className="w-4 h-4 text-accent-blue" />
                Clinic Address *
              </Label>
              <Textarea
                id="clinicAddress"
                value={data.contactInfo.clinicAddress}
                onChange={(e) =>
                  handleInputChange("clinicAddress", e.target.value)
                }
                placeholder="Enter complete clinic address including street, city, state, and postal code"
                rows={4}
                className="border-gray-300 focus:border-primary-green focus:ring-primary-green"
              />
              <p className="text-xs text-gray-500">
                Provide a detailed address that patients can easily find using
                GPS navigation
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contact Guidelines */}
      <Card className="border-l-4 border-l-accent-green bg-gradient-to-r from-slate-50 to-slate-100">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-primary-text mb-3">
            Contact Information Guidelines
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary-green rounded-full mt-2"></div>
                <div>
                  <h4 className="font-medium text-primary-text">
                    Professional Email
                  </h4>
                  <p className="text-sm text-gray-600">
                    Use a professional email address that you check regularly
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-secondary-green rounded-full mt-2"></div>
                <div>
                  <h4 className="font-medium text-primary-text">
                    Phone Availability
                  </h4>
                  <p className="text-sm text-gray-600">
                    Ensure your phone number is accessible during working hours
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-accent-blue rounded-full mt-2"></div>
                <div>
                  <h4 className="font-medium text-primary-text">
                    Clinic Details
                  </h4>
                  <p className="text-sm text-gray-600">
                    Provide accurate clinic information for patient visits
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-accent-green rounded-full mt-2"></div>
                <div>
                  <h4 className="font-medium text-primary-text">
                    Address Accuracy
                  </h4>
                  <p className="text-sm text-gray-600">
                    Double-check address details for easy patient navigation
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
