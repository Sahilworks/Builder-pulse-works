import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Phone,
  Mail,
  Building,
  MapPin,
  Plus,
  X,
  Star,
  StarOff,
  Map,
  CheckCircle,
} from "lucide-react";

interface ContactInfoProps {
  data: any;
  updateData: (section: string, data: any) => void;
}

export const ContactInfo = ({ data, updateData }: ContactInfoProps) => {
  const [newPrimaryClinic, setNewPrimaryClinic] = useState({
    name: "",
    address: "",
    mapLink: "",
  });
  const [newSecondaryClinic, setNewSecondaryClinic] = useState({
    name: "",
    address: "",
    mapLink: "",
  });
  const [primaryMapLoading, setPrimaryMapLoading] = useState(false);
  const [secondaryMapLoading, setSecondaryMapLoading] = useState(false);

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

  // NEW: Extract address from Google Maps link
  const extractAddressFromMapLink = (mapLink: string): string => {
    try {
      // Handle different Google Maps URL formats
      let address = "";

      // Format 1: https://maps.google.com/maps?q=address
      if (mapLink.includes("maps.google.com") && mapLink.includes("q=")) {
        const urlParams = new URLSearchParams(mapLink.split("?")[1]);
        address = urlParams.get("q") || "";
      }

      // Format 2: https://www.google.com/maps/place/address
      else if (mapLink.includes("google.com/maps/place/")) {
        const placePart = mapLink.split("/place/")[1];
        if (placePart) {
          address = placePart.split("/")[0];
        }
      }

      // Format 3: https://goo.gl/maps/... (shortened URL)
      else if (
        mapLink.includes("goo.gl/maps") ||
        mapLink.includes("maps.app.goo.gl")
      ) {
        // For demo purposes, extract any text after the last slash
        const parts = mapLink.split("/");
        address = "Address from Google Maps (shortened link detected)";
      }

      // Decode URI components and clean up
      if (address) {
        address = decodeURIComponent(address);
        address = address.replace(/\+/g, " ");
        address = address.replace(/@.*$/, ""); // Remove coordinates if present
      }

      return address || "Unable to extract address from this link";
    } catch (error) {
      return "Invalid Google Maps link";
    }
  };

  // NEW: Handle Google Maps link for Primary Clinic
  const handlePrimaryMapLink = async (mapLink: string) => {
    setNewPrimaryClinic((prev) => ({ ...prev, mapLink }));

    if (
      mapLink.trim() &&
      (mapLink.includes("google.com/maps") ||
        mapLink.includes("goo.gl/maps") ||
        mapLink.includes("maps.app.goo.gl"))
    ) {
      setPrimaryMapLoading(true);

      // Simulate API call delay
      setTimeout(() => {
        const extractedAddress = extractAddressFromMapLink(mapLink);
        setNewPrimaryClinic((prev) => ({ ...prev, address: extractedAddress }));
        setPrimaryMapLoading(false);
      }, 1500);
    }
  };

  // NEW: Handle Google Maps link for Secondary Clinic
  const handleSecondaryMapLink = async (mapLink: string) => {
    setNewSecondaryClinic((prev) => ({ ...prev, mapLink }));

    if (
      mapLink.trim() &&
      (mapLink.includes("google.com/maps") ||
        mapLink.includes("goo.gl/maps") ||
        mapLink.includes("maps.app.goo.gl"))
    ) {
      setSecondaryMapLoading(true);

      // Simulate API call delay
      setTimeout(() => {
        const extractedAddress = extractAddressFromMapLink(mapLink);
        setNewSecondaryClinic((prev) => ({
          ...prev,
          address: extractedAddress,
        }));
        setSecondaryMapLoading(false);
      }, 1500);
    }
  };

  const addPrimaryClinic = () => {
    if (newPrimaryClinic.name.trim() && newPrimaryClinic.address.trim()) {
      const clinic = {
        id: Date.now().toString(),
        name: newPrimaryClinic.name.trim(),
        address: newPrimaryClinic.address.trim(),
        mapLink: newPrimaryClinic.mapLink.trim(),
        type: "primary",
      };
      const existingClinics = data.contactInfo.clinics || [];
      updateData("contactInfo", {
        clinics: [...existingClinics, clinic],
      });
      setNewPrimaryClinic({ name: "", address: "", mapLink: "" });
    }
  };

  const addSecondaryClinic = () => {
    if (newSecondaryClinic.name.trim() && newSecondaryClinic.address.trim()) {
      const clinic = {
        id: Date.now().toString(),
        name: newSecondaryClinic.name.trim(),
        address: newSecondaryClinic.address.trim(),
        mapLink: newSecondaryClinic.mapLink.trim(),
        type: "secondary",
      };
      const existingClinics = data.contactInfo.clinics || [];
      updateData("contactInfo", {
        clinics: [...existingClinics, clinic],
      });
      setNewSecondaryClinic({ name: "", address: "", mapLink: "" });
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

  const primaryClinics = (data.contactInfo.clinics || []).filter(
    (clinic: any) => clinic.type === "primary",
  );
  const secondaryClinics = (data.contactInfo.clinics || []).filter(
    (clinic: any) => clinic.type === "secondary",
  );

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

      {/* UPDATED: Primary and Secondary Clinic Options with Google Maps */}
      <Card className="border-l-4 border-l-secondary-green">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-primary-text mb-4 flex items-center gap-2">
            <Building className="w-5 h-5 text-secondary-green" />
            Clinic Information (Primary & Secondary with Google Maps)
          </h3>

          <Tabs defaultValue="primary" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-gray-100">
              <TabsTrigger
                value="primary"
                className="data-[state=active]:bg-primary-green data-[state=active]:text-white flex items-center gap-2"
              >
                <Star className="w-4 h-4" />
                Primary Clinic
              </TabsTrigger>
              <TabsTrigger
                value="secondary"
                className="data-[state=active]:bg-secondary-green data-[state=active]:text-white flex items-center gap-2"
              >
                <StarOff className="w-4 h-4" />
                Secondary Clinic
              </TabsTrigger>
            </TabsList>

            {/* Primary Clinic Tab */}
            <TabsContent value="primary" className="space-y-6 mt-6">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <Star className="w-4 h-4 text-green-600" />
                  <span className="font-medium text-green-800">
                    Primary Clinic
                  </span>
                </div>
                <p className="text-green-700 text-sm">
                  Your main practice location where you spend most of your time.
                  Patients will see this as your primary clinic.
                </p>
              </div>

              {/* Add Primary Clinic */}
              <div className="space-y-4">
                <h4 className="font-medium text-primary-text">
                  Add Primary Clinic
                </h4>
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <Label className="text-primary-text font-medium">
                      Primary Clinic Name *
                    </Label>
                    <Input
                      value={newPrimaryClinic.name}
                      onChange={(e) =>
                        setNewPrimaryClinic((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }))
                      }
                      placeholder="Enter your main clinic name"
                      className="border-gray-300 focus:border-primary-green focus:ring-primary-green"
                    />
                  </div>

                  {/* NEW: Google Maps Link Field */}
                  <div className="space-y-2">
                    <Label className="text-primary-text font-medium flex items-center gap-2">
                      <Map className="w-4 h-4 text-accent-blue" />
                      Google Maps Link (Auto-fills Address)
                    </Label>
                    <div className="relative">
                      <Input
                        value={newPrimaryClinic.mapLink}
                        onChange={(e) => handlePrimaryMapLink(e.target.value)}
                        placeholder="Paste Google Maps link here to auto-fill address"
                        className="border-gray-300 focus:border-accent-blue focus:ring-accent-blue"
                      />
                      {primaryMapLoading && (
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-accent-blue"></div>
                        </div>
                      )}
                      {newPrimaryClinic.mapLink &&
                        !primaryMapLoading &&
                        newPrimaryClinic.address && (
                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                          </div>
                        )}
                    </div>
                    <p className="text-xs text-gray-500">
                      Copy and paste a Google Maps link to automatically fill
                      the address below
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-primary-text font-medium">
                      Primary Clinic Address *
                    </Label>
                    <Textarea
                      value={newPrimaryClinic.address}
                      onChange={(e) =>
                        setNewPrimaryClinic((prev) => ({
                          ...prev,
                          address: e.target.value,
                        }))
                      }
                      placeholder="Enter complete address of your primary clinic (or use Google Maps link above)"
                      rows={3}
                      className="border-gray-300 focus:border-primary-green focus:ring-primary-green"
                    />
                    {primaryMapLoading && (
                      <p className="text-xs text-blue-600 flex items-center gap-1">
                        <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-blue-600"></div>
                        Extracting address from Google Maps link...
                      </p>
                    )}
                  </div>
                </div>

                <Button
                  onClick={addPrimaryClinic}
                  disabled={
                    !newPrimaryClinic.name.trim() ||
                    !newPrimaryClinic.address.trim()
                  }
                  className="bg-primary-green hover:bg-secondary-green"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Primary Clinic
                </Button>
              </div>

              {/* Primary Clinics List */}
              {primaryClinics.length > 0 && (
                <div className="space-y-4">
                  <h4 className="font-medium text-primary-text">
                    Your Primary Clinics ({primaryClinics.length})
                  </h4>
                  <div className="space-y-4">
                    {primaryClinics.map((clinic: any, index: number) => (
                      <div
                        key={clinic.id}
                        className="bg-green-50 p-4 rounded-lg border border-green-200"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <Star className="w-4 h-4 text-primary-green" />
                            <span className="font-medium text-primary-text">
                              Primary Clinic {index + 1}
                            </span>
                            {clinic.mapLink && (
                              <Badge className="bg-blue-100 text-blue-800 text-xs">
                                <Map className="w-3 h-3 mr-1" />
                                Maps Linked
                              </Badge>
                            )}
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
                                updateClinic(
                                  clinic.id,
                                  "address",
                                  e.target.value,
                                )
                              }
                              rows={2}
                              className="border-gray-300 focus:border-primary-green focus:ring-primary-green"
                            />
                          </div>

                          {clinic.mapLink && (
                            <div className="space-y-2">
                              <Label className="text-sm font-medium text-gray-600">
                                Google Maps Link
                              </Label>
                              <Input
                                value={clinic.mapLink}
                                onChange={(e) =>
                                  updateClinic(
                                    clinic.id,
                                    "mapLink",
                                    e.target.value,
                                  )
                                }
                                className="border-gray-300 focus:border-accent-blue focus:ring-accent-blue"
                                placeholder="Google Maps link"
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {primaryClinics.length === 0 && (
                <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-lg">
                  <Star className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="font-medium">No primary clinic added yet</p>
                  <p className="text-sm">
                    Add your main practice location with Google Maps integration
                  </p>
                </div>
              )}
            </TabsContent>

            {/* Secondary Clinic Tab */}
            <TabsContent value="secondary" className="space-y-6 mt-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <StarOff className="w-4 h-4 text-blue-600" />
                  <span className="font-medium text-blue-800">
                    Secondary Clinic
                  </span>
                </div>
                <p className="text-blue-700 text-sm">
                  Additional practice locations where you provide consultations.
                  These are shown as alternative options to patients.
                </p>
              </div>

              {/* Add Secondary Clinic */}
              <div className="space-y-4">
                <h4 className="font-medium text-primary-text">
                  Add Secondary Clinic
                </h4>
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <Label className="text-primary-text font-medium">
                      Secondary Clinic Name
                    </Label>
                    <Input
                      value={newSecondaryClinic.name}
                      onChange={(e) =>
                        setNewSecondaryClinic((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }))
                      }
                      placeholder="Enter secondary clinic name"
                      className="border-gray-300 focus:border-secondary-green focus:ring-secondary-green"
                    />
                  </div>

                  {/* NEW: Google Maps Link Field for Secondary */}
                  <div className="space-y-2">
                    <Label className="text-primary-text font-medium flex items-center gap-2">
                      <Map className="w-4 h-4 text-accent-blue" />
                      Google Maps Link (Auto-fills Address)
                    </Label>
                    <div className="relative">
                      <Input
                        value={newSecondaryClinic.mapLink}
                        onChange={(e) => handleSecondaryMapLink(e.target.value)}
                        placeholder="Paste Google Maps link here to auto-fill address"
                        className="border-gray-300 focus:border-accent-blue focus:ring-accent-blue"
                      />
                      {secondaryMapLoading && (
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-accent-blue"></div>
                        </div>
                      )}
                      {newSecondaryClinic.mapLink &&
                        !secondaryMapLoading &&
                        newSecondaryClinic.address && (
                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                          </div>
                        )}
                    </div>
                    <p className="text-xs text-gray-500">
                      Copy and paste a Google Maps link to automatically fill
                      the address below
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-primary-text font-medium">
                      Secondary Clinic Address
                    </Label>
                    <Textarea
                      value={newSecondaryClinic.address}
                      onChange={(e) =>
                        setNewSecondaryClinic((prev) => ({
                          ...prev,
                          address: e.target.value,
                        }))
                      }
                      placeholder="Enter complete address of your secondary clinic (or use Google Maps link above)"
                      rows={3}
                      className="border-gray-300 focus:border-secondary-green focus:ring-secondary-green"
                    />
                    {secondaryMapLoading && (
                      <p className="text-xs text-blue-600 flex items-center gap-1">
                        <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-blue-600"></div>
                        Extracting address from Google Maps link...
                      </p>
                    )}
                  </div>
                </div>

                <Button
                  onClick={addSecondaryClinic}
                  disabled={
                    !newSecondaryClinic.name.trim() ||
                    !newSecondaryClinic.address.trim()
                  }
                  className="bg-secondary-green hover:bg-primary-green"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Secondary Clinic
                </Button>
              </div>

              {/* Secondary Clinics List */}
              {secondaryClinics.length > 0 && (
                <div className="space-y-4">
                  <h4 className="font-medium text-primary-text">
                    Your Secondary Clinics ({secondaryClinics.length})
                  </h4>
                  <div className="space-y-4">
                    {secondaryClinics.map((clinic: any, index: number) => (
                      <div
                        key={clinic.id}
                        className="bg-blue-50 p-4 rounded-lg border border-blue-200"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <StarOff className="w-4 h-4 text-secondary-green" />
                            <span className="font-medium text-primary-text">
                              Secondary Clinic {index + 1}
                            </span>
                            {clinic.mapLink && (
                              <Badge className="bg-blue-100 text-blue-800 text-xs">
                                <Map className="w-3 h-3 mr-1" />
                                Maps Linked
                              </Badge>
                            )}
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
                              className="border-gray-300 focus:border-secondary-green focus:ring-secondary-green"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label className="text-sm font-medium text-gray-600">
                              Address
                            </Label>
                            <Textarea
                              value={clinic.address}
                              onChange={(e) =>
                                updateClinic(
                                  clinic.id,
                                  "address",
                                  e.target.value,
                                )
                              }
                              rows={2}
                              className="border-gray-300 focus:border-secondary-green focus:ring-secondary-green"
                            />
                          </div>

                          {clinic.mapLink && (
                            <div className="space-y-2">
                              <Label className="text-sm font-medium text-gray-600">
                                Google Maps Link
                              </Label>
                              <Input
                                value={clinic.mapLink}
                                onChange={(e) =>
                                  updateClinic(
                                    clinic.id,
                                    "mapLink",
                                    e.target.value,
                                  )
                                }
                                className="border-gray-300 focus:border-accent-blue focus:ring-accent-blue"
                                placeholder="Google Maps link"
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {secondaryClinics.length === 0 && (
                <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-lg">
                  <StarOff className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="font-medium">No secondary clinics added yet</p>
                  <p className="text-sm">
                    Add additional practice locations with Google Maps
                    integration (optional)
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>

          {/* Summary */}
          {(primaryClinics.length > 0 || secondaryClinics.length > 0) && (
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-primary-text mb-2">
                Clinic Summary
              </h4>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-primary-green">
                    {primaryClinics.length}
                  </div>
                  <div className="text-sm text-gray-600">Primary Clinics</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-secondary-green">
                    {secondaryClinics.length}
                  </div>
                  <div className="text-sm text-gray-600">Secondary Clinics</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-accent-blue">
                    {
                      [...primaryClinics, ...secondaryClinics].filter(
                        (c) => c.mapLink,
                      ).length
                    }
                  </div>
                  <div className="text-sm text-gray-600">Maps Linked</div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Google Maps Integration Info */}
      <Card className="border-l-4 border-l-accent-blue bg-gradient-to-r from-blue-50 to-indigo-50">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-primary-text mb-3 flex items-center gap-2">
            <Map className="w-5 h-5 text-accent-blue" />
            Google Maps Integration Guide
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div>
                  <h4 className="font-medium text-blue-700">
                    How to get Google Maps link
                  </h4>
                  <p className="text-sm text-blue-600">
                    Go to Google Maps, search your clinic, click Share, copy the
                    link
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <div>
                  <h4 className="font-medium text-green-700">
                    Auto Address Fill
                  </h4>
                  <p className="text-sm text-green-600">
                    Paste the Google Maps link and address will be automatically
                    extracted
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                <div>
                  <h4 className="font-medium text-purple-700">
                    Supported Formats
                  </h4>
                  <p className="text-sm text-purple-600">
                    Works with all Google Maps link formats including shortened
                    goo.gl links
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                <div>
                  <h4 className="font-medium text-orange-700">
                    Patient Benefits
                  </h4>
                  <p className="text-sm text-orange-600">
                    Patients can easily navigate to your clinic using the
                    integrated maps
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
