import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Phone, Mail, Building, MapPin, Plus, X } from "lucide-react";

interface ContactInfoProps {
  data: any;
  updateData: (section: string, data: any) => void;
}

export const ContactInfo = ({ data, updateData }: ContactInfoProps) => {
  const [newClinic, setNewClinic] = useState({ name: "", address: "" });

  // AUTO-FILL PHONE NUMBER FROM STEP 1
  useEffect(() => {
    if (data.personalInfo.mobileNumber && !data.contactInfo.phoneNumber) {
      updateData("contactInfo", {
        phoneNumber: data.personalInfo.mobileNumber,
      });
    }
  }, [data.personalInfo.mobileNumber]);

  const handleInputChange = (field: string, value: string) => {
    updateData("contactInfo", { [field]: value });
  };

  const addClinic = () => {
    if (newClinic.name.trim() && newClinic.address.trim()) {
      const clinic = {
        id: Date.now().toString(),
        name: newClinic.name.trim(),
        address: newClinic.address.trim(),
      };
      updateData("contactInfo", {
        clinics: [...(data.contactInfo.clinics || []), clinic],
      });
      setNewClinic({ name: "", address: "" });
    }
  };

  const removeClinic = (clinicId: string) => {
    updateData("contactInfo", {
      clinics: data.contactInfo.clinics.filter(
        (clinic: any) => clinic.id !== clinicId,
      ),
    });
  };

  const updateClinic = (clinicId: string, field: string, value: string) => {
    const updatedClinics = data.contactInfo.clinics.map((clinic: any) =>
      clinic.id === clinicId ? { ...clinic, [field]: value } : clinic,
    );
    updateData("contactInfo", { clinics: updatedClinics });
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
                Phone Number * (Auto-filled)
              </Label>
              <Input
                id="phoneNumber"
                value={data.contactInfo.phoneNumber || ""}
                onChange={(e) =>
                  handleInputChange("phoneNumber", e.target.value)
                }
                placeholder="+91 9876543210"
                className="border-gray-300 focus:border-primary-green focus:ring-primary-green bg-green-50"
                disabled
              />
              <p className="text-xs text-green-600">
                Auto-filled from mobile number verification
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
                value={data.contactInfo.email || ""}
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

      {/* CHANGED: Multiple Clinics Support (Removed Office Number) */}
      <Card className="border-l-4 border-l-secondary-green">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-primary-text mb-4 flex items-center gap-2">
            <Building className="w-5 h-5 text-secondary-green" />
            Clinic Information (Multiple Clinics Supported)
          </h3>

          {/* Add New Clinic */}
          <div className="space-y-4 mb-6">
            <h4 className="font-medium text-primary-text">Add New Clinic</h4>
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label className="text-primary-text font-medium">
                  Clinic Name *
                </Label>
                <Input
                  value={newClinic.name}
                  onChange={(e) =>
                    setNewClinic((prev) => ({ ...prev, name: e.target.value }))
                  }
                  placeholder="Enter clinic name"
                  className="border-gray-300 focus:border-primary-green focus:ring-primary-green"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-primary-text font-medium">
                  Clinic Address *
                </Label>
                <Textarea
                  value={newClinic.address}
                  onChange={(e) =>
                    setNewClinic((prev) => ({
                      ...prev,
                      address: e.target.value,
                    }))
                  }
                  placeholder="Enter complete clinic address including street, city, state, and postal code"
                  rows={3}
                  className="border-gray-300 focus:border-primary-green focus:ring-primary-green"
                />
              </div>
            </div>

            <Button
              onClick={addClinic}
              disabled={!newClinic.name.trim() || !newClinic.address.trim()}
              className="bg-primary-green hover:bg-secondary-green"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Clinic
            </Button>
          </div>

          {/* Existing Clinics */}
          {data.contactInfo.clinics?.length > 0 && (
            <div className="space-y-4">
              <h4 className="font-medium text-primary-text">
                Your Clinics ({data.contactInfo.clinics.length})
              </h4>
              <div className="space-y-4">
                {data.contactInfo.clinics.map((clinic: any, index: number) => (
                  <div
                    key={clinic.id}
                    className="bg-gray-50 p-4 rounded-lg border border-gray-200"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Building className="w-4 h-4 text-primary-green" />
                        <span className="font-medium text-primary-text">
                          Clinic {index + 1}
                        </span>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => removeClinic(clinic.id)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>

                    <div className="space-y-3">
                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-gray-600">
                          Clinic Name
                        </Label>
                        <Input
                          value={clinic.name}
                          onChange={(e) =>
                            updateClinic(clinic.id, "name", e.target.value)
                          }
                          className="border-gray-300 focus:border-primary-green focus:ring-primary-green"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-gray-600">
                          Address
                        </Label>
                        <Textarea
                          value={clinic.address}
                          onChange={(e) =>
                            updateClinic(clinic.id, "address", e.target.value)
                          }
                          rows={2}
                          className="border-gray-300 focus:border-primary-green focus:ring-primary-green"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {(!data.contactInfo.clinics ||
            data.contactInfo.clinics.length === 0) && (
            <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-lg">
              <Building className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="font-medium">No clinics added yet</p>
              <p className="text-sm">Add your first clinic to continue</p>
            </div>
          )}
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
                    Multiple Clinics
                  </h4>
                  <p className="text-sm text-gray-600">
                    Add all clinics where you practice for better patient reach
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-secondary-green rounded-full mt-2"></div>
                <div>
                  <h4 className="font-medium text-primary-text">
                    Phone Verification
                  </h4>
                  <p className="text-sm text-gray-600">
                    Your verified mobile number is automatically used
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-accent-blue rounded-full mt-2"></div>
                <div>
                  <h4 className="font-medium text-primary-text">
                    Accurate Addresses
                  </h4>
                  <p className="text-sm text-gray-600">
                    Provide complete addresses for easy patient navigation
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-accent-green rounded-full mt-2"></div>
                <div>
                  <h4 className="font-medium text-primary-text">
                    Professional Email
                  </h4>
                  <p className="text-sm text-gray-600">
                    Use a professional email for patient communications
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
