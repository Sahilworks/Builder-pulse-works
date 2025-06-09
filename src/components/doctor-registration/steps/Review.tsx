import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  User,
  Phone,
  Mail,
  GraduationCap,
  Stethoscope,
  Clock,
  DollarSign,
  CheckCircle,
  AlertCircle,
  MapPin,
  Building,
  Shield,
  Camera,
  Crown,
  StarOff,
} from "lucide-react";

interface ReviewProps {
  data: any;
  updateData: (section: string, data: any) => void;
}

export const Review = ({ data }: ReviewProps) => {
  const navigate = useNavigate();

  const handleSubmit = () => {
    // Here you would typically submit the form data to your backend
    console.log("Submitting registration data:", data);

    // Simulate form submission
    setTimeout(() => {
      navigate("/registration-success");
    }, 1000);
  };

  const getCompletionStatus = () => {
    const sections = [
      {
        name: "Personal Info",
        complete: !!(
          data.personalInfo.firstName &&
          data.personalInfo.lastName &&
          data.personalInfo.bio &&
          data.personalInfo.mobileVerified
        ),
      },
      {
        name: "Contact Info",
        complete: !!(
          data.contactInfo.email &&
          data.contactInfo.phoneNumber &&
          data.contactInfo.clinics?.length > 0
        ),
      },
      {
        name: "Education",
        complete: !!(
          data.education.highestDegree && data.education.medicalLicenceNumber
        ),
      },
      {
        name: "Specialization",
        complete: !!(
          data.specialization.selectedSpecialty &&
          data.specialization.services?.length > 0
        ),
      },
      {
        name: "Availability",
        complete: !!(
          data.availability.selectedClinicId &&
          Object.values(data.availability.schedule || {}).some(
            (day: any) => day.isWorking,
          )
        ),
      },
      {
        name: "Charges",
        complete: !!(
          data.charges.clinicVisit || data.charges.onlineConsultation
        ),
      },
    ];
    return sections;
  };

  const completionStatus = getCompletionStatus();
  const allComplete = completionStatus.every((section) => section.complete);

  const formatWorkingDays = () => {
    const workingDays = Object.entries(data.availability.schedule || {})
      .filter(([_, schedule]: [string, any]) => schedule.isWorking)
      .map(([day, _]) => day.charAt(0).toUpperCase() + day.slice(1));

    if (workingDays.length === 0) return "No working days set";
    if (workingDays.length === 7) return "All days";
    return workingDays.join(", ");
  };

  const selectedClinic = data.contactInfo.clinics?.find(
    (clinic: any) => clinic.id === data.availability.selectedClinicId,
  );
  const primaryClinics = (data.contactInfo.clinics || []).filter(
    (clinic: any) => clinic.type === "primary",
  );
  const secondaryClinics = (data.contactInfo.clinics || []).filter(
    (clinic: any) => clinic.type === "secondary",
  );

  // Format currency in rupees
  const formatRupees = (value: string | number) => {
    if (!value) return "Not set";
    const formatted = parseFloat(value.toString()).toLocaleString("en-IN");
    return `₹${formatted}`;
  };

  return (
    <div className="space-y-6">
      {/* Completion Status */}
      <Card
        className={`border-l-4 ${allComplete ? "border-l-green-500 bg-green-50" : "border-l-orange-500 bg-orange-50"}`}
      >
        <CardContent className="p-6">
          <h3
            className={`text-lg font-semibold mb-4 flex items-center gap-2 ${allComplete ? "text-green-700" : "text-orange-700"}`}
          >
            {allComplete ? (
              <CheckCircle className="w-5 h-5" />
            ) : (
              <AlertCircle className="w-5 h-5" />
            )}
            Registration Completion Status
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {completionStatus.map((section) => (
              <div key={section.name} className="flex items-center gap-2">
                {section.complete ? (
                  <CheckCircle className="w-4 h-4 text-green-500" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-orange-500" />
                )}
                <span
                  className={`text-sm ${section.complete ? "text-green-700" : "text-orange-700"}`}
                >
                  {section.name}
                </span>
              </div>
            ))}
          </div>
          {!allComplete && (
            <p className="text-sm text-orange-600 mt-3">
              Please complete all sections before submitting your registration.
            </p>
          )}
        </CardContent>
      </Card>

      {/* NEW: Doctor Profile Header with Photo */}
      <Card className="border-l-4 border-l-primary-green">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-primary-text mb-6 flex items-center gap-2">
            <User className="w-5 h-5 text-primary-green" />
            Doctor Profile Summary
          </h3>
          <div className="flex items-start gap-6">
            {/* Doctor Photo */}
            <div className="flex-shrink-0">
              <Avatar className="w-32 h-32 border-4 border-primary-green">
                {data.personalInfo.profilePicture ? (
                  <AvatarImage
                    src={URL.createObjectURL(data.personalInfo.profilePicture)}
                    alt="Doctor Profile"
                    className="object-cover"
                  />
                ) : (
                  <AvatarFallback className="bg-primary-green text-white text-4xl">
                    {data.personalInfo.firstName?.[0] || "D"}
                    {data.personalInfo.lastName?.[0] || "R"}
                  </AvatarFallback>
                )}
              </Avatar>
              <div className="text-center mt-2">
                <div className="flex items-center justify-center gap-1 text-xs text-gray-500">
                  <Camera className="w-3 h-3" />
                  {data.personalInfo.profilePicture
                    ? "Photo Uploaded"
                    : "No Photo"}
                </div>
              </div>
            </div>

            {/* Doctor Information */}
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-primary-text mb-3">
                Dr. {data.personalInfo.firstName || "First"}{" "}
                {data.personalInfo.lastName || "Last"}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Stethoscope className="w-4 h-4 text-primary-green" />
                    <span className="font-medium text-primary-green">
                      {data.specialization.selectedSpecialty ||
                        "Specialty not selected"}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-secondary-green" />
                    <span className="text-gray-700">
                      {data.personalInfo.mobileNumber || "Phone not provided"}
                    </span>
                    {data.personalInfo.mobileVerified && (
                      <Badge className="bg-green-100 text-green-800">
                        <Shield className="w-3 h-3 mr-1" />
                        Verified
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-secondary-green" />
                    <span className="text-gray-700">
                      {data.contactInfo.email || "Email not provided"}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Building className="w-4 h-4 text-accent-blue" />
                    <span className="text-gray-700">
                      {primaryClinics.length} Primary +{" "}
                      {secondaryClinics.length} Secondary Clinics
                    </span>
                  </div>
                </div>
              </div>

              {/* Bio Preview */}
              {data.personalInfo.bio && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-primary-text mb-2">
                    Professional Bio
                  </h4>
                  <p className="text-sm text-gray-700 line-clamp-3">
                    {data.personalInfo.bio}
                  </p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Personal Information Review */}
      <Card className="border-l-4 border-l-secondary-green">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-primary-text mb-4 flex items-center gap-2">
            <User className="w-5 h-5 text-secondary-green" />
            Personal Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div>
                <span className="font-medium text-primary-text">
                  Date of Birth:
                </span>
                <p className="text-gray-700">
                  {data.personalInfo.dateOfBirth || "Not provided"}
                </p>
              </div>
              <div>
                <span className="font-medium text-primary-text">
                  Languages Spoken:
                </span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {data.personalInfo.languages?.length > 0 ? (
                    data.personalInfo.languages.map((lang: string) => (
                      <Badge
                        key={lang}
                        variant="secondary"
                        className="bg-secondary-green text-white"
                      >
                        {lang}
                      </Badge>
                    ))
                  ) : (
                    <span className="text-gray-500 text-sm">
                      No languages specified
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <span className="font-medium text-primary-text">
                  Documents:
                </span>
                <div className="text-sm text-gray-700 mt-1">
                  <div>
                    Resume:{" "}
                    {data.personalInfo.resume ? "✓ Uploaded" : "Not uploaded"}
                  </div>
                  <div>
                    Profile Picture:{" "}
                    {data.personalInfo.profilePicture
                      ? "✓ Uploaded"
                      : "Not uploaded"}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {data.personalInfo.awards?.length > 0 && (
            <div className="mt-4">
              <span className="font-medium text-primary-text">
                Awards & Recognition:
              </span>
              <ul className="mt-1 space-y-1">
                {data.personalInfo.awards.map(
                  (award: string, index: number) => (
                    <li
                      key={index}
                      className="text-sm text-gray-700 flex items-center gap-2"
                    >
                      <div className="w-1 h-1 bg-secondary-green rounded-full"></div>
                      {award}
                    </li>
                  ),
                )}
              </ul>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Clinic Information Review */}
      <Card className="border-l-4 border-l-accent-blue">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-primary-text mb-4 flex items-center gap-2">
            <Building className="w-5 h-5 text-accent-blue" />
            Clinic Information ({(data.contactInfo.clinics || []).length} clinic
            {(data.contactInfo.clinics || []).length !== 1 ? "s" : ""})
          </h3>

          {/* Primary Clinics */}
          {primaryClinics.length > 0 && (
            <div className="mb-6">
              <h4 className="font-medium text-primary-text mb-3 flex items-center gap-2">
                <Crown className="w-4 h-4 text-primary-green" />
                Primary Clinic
              </h4>
              <div className="space-y-3">
                {primaryClinics.map((clinic: any) => (
                  <div
                    key={clinic.id}
                    className="bg-green-50 p-4 rounded-lg border border-green-200"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Crown className="w-4 h-4 text-primary-green" />
                      <span className="font-medium text-primary-text">
                        {clinic.name}
                      </span>
                      {clinic.mapLink && (
                        <Badge className="bg-blue-100 text-blue-800 text-xs">
                          <MapPin className="w-3 h-3 mr-1" />
                          Maps Linked
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">{clinic.address}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Secondary Clinics */}
          {secondaryClinics.length > 0 && (
            <div>
              <h4 className="font-medium text-primary-text mb-3 flex items-center gap-2">
                <StarOff className="w-4 h-4 text-secondary-green" />
                Secondary Clinics ({secondaryClinics.length})
              </h4>
              <div className="space-y-3">
                {secondaryClinics.map((clinic: any, index: number) => (
                  <div
                    key={clinic.id}
                    className="bg-blue-50 p-4 rounded-lg border border-blue-200"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <StarOff className="w-4 h-4 text-secondary-green" />
                      <span className="font-medium text-primary-text">
                        {clinic.name}
                      </span>
                      {clinic.mapLink && (
                        <Badge className="bg-blue-100 text-blue-800 text-xs">
                          <MapPin className="w-3 h-3 mr-1" />
                          Maps Linked
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">{clinic.address}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {(!data.contactInfo.clinics ||
            data.contactInfo.clinics.length === 0) && (
            <p className="text-gray-500">No clinics added</p>
          )}
        </CardContent>
      </Card>

      {/* Education & Qualification Review */}
      <Card className="border-l-4 border-l-accent-green">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-primary-text mb-4 flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-accent-green" />
            Education & Qualification
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div>
                <span className="font-medium text-primary-text">
                  Highest Degree:
                </span>
                <p className="text-gray-700">
                  {data.education.highestDegree || "Not provided"}
                </p>
              </div>
              <div>
                <span className="font-medium text-primary-text">
                  University/Institute:
                </span>
                <p className="text-gray-700">
                  {data.education.university || "Not provided"}
                </p>
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <span className="font-medium text-primary-text">
                  License Number:
                </span>
                <p className="text-gray-700">
                  {data.education.medicalLicenceNumber || "Not provided"}
                </p>
              </div>
              <div>
                <span className="font-medium text-primary-text">
                  Issuing Authority:
                </span>
                <p className="text-gray-700">
                  {data.education.issuingAuthority || "Not provided"}
                </p>
              </div>
              <div>
                <span className="font-medium text-primary-text">
                  License Expiry:
                </span>
                <p className="text-gray-700">
                  {data.education.licenceExpiryDate || "Not provided"}
                </p>
              </div>
              <div>
                <span className="font-medium text-primary-text">
                  License Document:
                </span>
                <p className="text-gray-700">
                  {data.education.medicalLicence
                    ? "✓ Uploaded"
                    : "Not uploaded"}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Specialization Review */}
      <Card className="border-l-4 border-l-primary-green">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-primary-text mb-4 flex items-center gap-2">
            <Stethoscope className="w-5 h-5 text-primary-green" />
            Specialization & Services
          </h3>
          <div className="space-y-4">
            <div>
              <span className="font-medium text-primary-text">
                Primary Specialty:
              </span>
              <div className="mt-2">
                {data.specialization.selectedSpecialty ? (
                  <Badge className="bg-primary-green text-white text-base px-3 py-1">
                    {data.specialization.selectedSpecialty}
                  </Badge>
                ) : (
                  <span className="text-gray-500 text-sm">
                    No specialty selected
                  </span>
                )}
              </div>
            </div>
            <div>
              <span className="font-medium text-primary-text">
                Services Offered ({data.specialization.services?.length || 0}):
              </span>
              <div className="flex flex-wrap gap-2 mt-2">
                {data.specialization.services?.length > 0 ? (
                  data.specialization.services.map((service: string) => (
                    <Badge
                      key={service}
                      variant="secondary"
                      className="bg-secondary-green text-white"
                    >
                      {service}
                    </Badge>
                  ))
                ) : (
                  <span className="text-gray-500 text-sm">
                    No services specified
                  </span>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Availability Review */}
      <Card className="border-l-4 border-l-purple-500">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-primary-text mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-purple-500" />
            Availability
          </h3>
          <div className="space-y-3">
            <div>
              <span className="font-medium text-primary-text">
                Selected Clinic:
              </span>
              <p className="text-gray-700">
                {selectedClinic?.name || "No clinic selected"}
              </p>
            </div>
            <div>
              <span className="font-medium text-primary-text">
                Working Days:
              </span>
              <p className="text-gray-700">{formatWorkingDays()}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
              {Object.entries(data.availability.schedule || {})
                .filter(([_, schedule]: [string, any]) => schedule.isWorking)
                .map(([day, schedule]: [string, any]) => (
                  <div key={day} className="bg-gray-50 p-3 rounded-lg">
                    <div className="font-medium text-primary-text capitalize">
                      {day}
                    </div>
                    <div className="text-sm text-gray-700">
                      {schedule.workHours?.start} - {schedule.workHours?.end}
                    </div>
                    {schedule.breakTimes?.length > 0 && (
                      <div className="text-xs text-gray-500 mt-1">
                        Breaks:{" "}
                        {schedule.breakTimes
                          .map((b: any) => `${b.start}-${b.end}`)
                          .join(", ")}
                      </div>
                    )}
                    {schedule.onlineConsultTimes?.length > 0 && (
                      <div className="text-xs text-blue-500 mt-1">
                        Online:{" "}
                        {schedule.onlineConsultTimes
                          .map((o: any) => `${o.start}-${o.end}`)
                          .join(", ")}
                      </div>
                    )}
                  </div>
                ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* UPDATED: Charges Review with Rupees Symbol */}
      <Card className="border-l-4 border-l-green-500">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-primary-text mb-4 flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-green-500" />
            Charges & Payment (₹ Rupees)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="bg-gray-50 p-4 rounded-lg text-center">
              <div className="font-medium text-primary-text">Clinic Visit</div>
              <div className="text-lg font-bold text-green-600">
                {formatRupees(data.charges.clinicVisit)}
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg text-center">
              <div className="font-medium text-primary-text">
                Online Consultation
              </div>
              <div className="text-lg font-bold text-blue-600">
                {formatRupees(data.charges.onlineConsultation)}
              </div>
            </div>
          </div>
          <div>
            <span className="font-medium text-primary-text">
              Payment Methods:
            </span>
            <div className="flex flex-wrap gap-2 mt-2">
              {data.charges.paymentMethods?.length > 0 ? (
                data.charges.paymentMethods.map((method: string) => (
                  <Badge
                    key={method}
                    variant="outline"
                    className="border-green-500 text-green-700"
                  >
                    {method
                      .replace(/([A-Z])/g, " $1")
                      .replace(/^./, (str) => str.toUpperCase())}
                  </Badge>
                ))
              ) : (
                <span className="text-gray-500 text-sm">
                  No payment methods selected
                </span>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Final Submission */}
      <Card className="border-l-4 border-l-primary-green bg-gradient-to-r from-green-50 to-emerald-50">
        <CardContent className="p-8 text-center">
          <h3 className="text-xl font-bold text-primary-text mb-4">
            Ready to Submit Your Registration?
          </h3>
          <p className="text-gray-600 mb-6">
            Please review all information above including your profile photo.
            Once submitted, your registration will be reviewed by our team. You
            will receive an email confirmation and updates about your
            application status.
          </p>
          <Button
            onClick={handleSubmit}
            disabled={!allComplete}
            size="lg"
            className="bg-gradient-to-r from-primary-green to-secondary-green hover:from-secondary-green hover:to-primary-green text-white px-12 py-3 text-lg"
          >
            {allComplete
              ? "Submit Registration"
              : "Complete All Sections First"}
          </Button>
          {!allComplete && (
            <p className="text-orange-600 text-sm mt-3">
              Please complete all required sections before submitting.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
