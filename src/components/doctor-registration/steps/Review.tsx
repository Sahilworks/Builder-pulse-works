import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
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
  Calendar,
  FileText,
  Building,
} from "lucide-react";
import { FormData } from "../RegistrationForm";

interface ReviewProps {
  data: FormData;
  updateData: (section: keyof FormData, data: any) => void;
}

export const Review = ({ data }: ReviewProps) => {
  const handleSubmit = () => {
    // Here you would typically submit the form data to your backend
    console.log("Submitting registration data:", data);
    alert(
      "Registration submitted successfully! You will receive a confirmation email shortly.",
    );
  };

  const getCompletionStatus = () => {
    const sections = [
      {
        name: "Personal Info",
        complete: !!(data.personalInfo.fullName && data.personalInfo.bio),
      },
      {
        name: "Contact Info",
        complete: !!(data.contactInfo.email && data.contactInfo.phoneNumber),
      },
      {
        name: "Education",
        complete: !!(
          data.education.highestDegree && data.education.medicalLicenceNumber
        ),
      },
      {
        name: "Specialization",
        complete: data.specialization.specialties.length > 0,
      },
      {
        name: "Availability",
        complete: Object.values(data.availability.schedule).some(
          (day) => day.isWorking,
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
    const workingDays = Object.entries(data.availability.schedule)
      .filter(([_, schedule]) => schedule.isWorking)
      .map(([day, _]) => day.charAt(0).toUpperCase() + day.slice(1));

    if (workingDays.length === 0) return "No working days set";
    if (workingDays.length === 7) return "All days";
    return workingDays.join(", ");
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

      {/* Personal Information Review */}
      <Card className="border-l-4 border-l-primary-green">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-primary-text mb-4 flex items-center gap-2">
            <User className="w-5 h-5 text-primary-green" />
            Personal Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div>
                <span className="font-medium text-primary-text">
                  Full Name:
                </span>
                <p className="text-gray-700">
                  {data.personalInfo.fullName || "Not provided"}
                </p>
              </div>
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
                  Mobile Number:
                </span>
                <p className="text-gray-700">
                  {data.personalInfo.mobileNumber || "Not provided"}
                </p>
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <span className="font-medium text-primary-text">
                  Languages Spoken:
                </span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {data.personalInfo.languages.length > 0 ? (
                    data.personalInfo.languages.map((lang) => (
                      <Badge
                        key={lang}
                        variant="secondary"
                        className="bg-primary-green text-white"
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
          {data.personalInfo.bio && (
            <div className="mt-4">
              <span className="font-medium text-primary-text">Bio:</span>
              <p className="text-gray-700 mt-1 text-sm bg-gray-50 p-3 rounded-lg">
                {data.personalInfo.bio}
              </p>
            </div>
          )}
          {data.personalInfo.awards.length > 0 && (
            <div className="mt-4">
              <span className="font-medium text-primary-text">
                Awards & Recognition:
              </span>
              <ul className="mt-1 space-y-1">
                {data.personalInfo.awards.map((award, index) => (
                  <li
                    key={index}
                    className="text-sm text-gray-700 flex items-center gap-2"
                  >
                    <div className="w-1 h-1 bg-primary-green rounded-full"></div>
                    {award}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Contact Information Review */}
      <Card className="border-l-4 border-l-secondary-green">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-primary-text mb-4 flex items-center gap-2">
            <Phone className="w-5 h-5 text-secondary-green" />
            Contact Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-secondary-green" />
                <span className="font-medium text-primary-text">Phone:</span>
                <span className="text-gray-700">
                  {data.contactInfo.phoneNumber || "Not provided"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-secondary-green" />
                <span className="font-medium text-primary-text">Email:</span>
                <span className="text-gray-700">
                  {data.contactInfo.email || "Not provided"}
                </span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Building className="w-4 h-4 text-secondary-green" />
                <span className="font-medium text-primary-text">Clinic:</span>
                <span className="text-gray-700">
                  {data.contactInfo.clinicName || "Not provided"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-secondary-green" />
                <span className="font-medium text-primary-text">Office:</span>
                <span className="text-gray-700">
                  {data.contactInfo.officeNumber || "Not provided"}
                </span>
              </div>
            </div>
          </div>
          {data.contactInfo.clinicAddress && (
            <div className="mt-4">
              <span className="font-medium text-primary-text">
                Clinic Address:
              </span>
              <p className="text-gray-700 text-sm bg-gray-50 p-3 rounded-lg mt-1">
                {data.contactInfo.clinicAddress}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Education & Qualification Review */}
      <Card className="border-l-4 border-l-accent-blue">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-primary-text mb-4 flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-accent-blue" />
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
      <Card className="border-l-4 border-l-accent-green">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-primary-text mb-4 flex items-center gap-2">
            <Stethoscope className="w-5 h-5 text-accent-green" />
            Specialization
          </h3>
          <div className="space-y-4">
            <div>
              <span className="font-medium text-primary-text">
                Specialties:
              </span>
              <div className="flex flex-wrap gap-2 mt-2">
                {data.specialization.specialties.length > 0 ? (
                  data.specialization.specialties.map((specialty) => (
                    <Badge
                      key={specialty}
                      className="bg-primary-green text-white"
                    >
                      {specialty}
                    </Badge>
                  ))
                ) : (
                  <span className="text-gray-500 text-sm">
                    No specialties selected
                  </span>
                )}
              </div>
            </div>
            <div>
              <span className="font-medium text-primary-text">
                Conditions Treated:
              </span>
              <div className="flex flex-wrap gap-2 mt-2">
                {data.specialization.conditionsTreated.length > 0 ? (
                  data.specialization.conditionsTreated.map((condition) => (
                    <Badge
                      key={condition}
                      variant="secondary"
                      className="bg-secondary-green text-white"
                    >
                      {condition}
                    </Badge>
                  ))
                ) : (
                  <span className="text-gray-500 text-sm">
                    No conditions specified
                  </span>
                )}
              </div>
            </div>
            <div>
              <span className="font-medium text-primary-text">
                Treatment Areas:
              </span>
              <div className="flex flex-wrap gap-2 mt-2">
                {data.specialization.otherTreatmentAreas.length > 0 ? (
                  data.specialization.otherTreatmentAreas.map((area) => (
                    <Badge
                      key={area}
                      variant="outline"
                      className="border-accent-blue text-accent-blue"
                    >
                      {area}
                    </Badge>
                  ))
                ) : (
                  <span className="text-gray-500 text-sm">
                    No treatment areas specified
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
                Working Days:
              </span>
              <p className="text-gray-700">{formatWorkingDays()}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
              {Object.entries(data.availability.schedule)
                .filter(([_, schedule]) => schedule.isWorking)
                .map(([day, schedule]) => (
                  <div key={day} className="bg-gray-50 p-3 rounded-lg">
                    <div className="font-medium text-primary-text capitalize">
                      {day}
                    </div>
                    <div className="text-sm text-gray-700">
                      {schedule.workHours.start} - {schedule.workHours.end}
                    </div>
                    {schedule.breakTimes.length > 0 && (
                      <div className="text-xs text-gray-500 mt-1">
                        Breaks:{" "}
                        {schedule.breakTimes
                          .map((b) => `${b.start}-${b.end}`)
                          .join(", ")}
                      </div>
                    )}
                  </div>
                ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Charges Review */}
      <Card className="border-l-4 border-l-green-500">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-primary-text mb-4 flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-green-500" />
            Charges & Payment
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="bg-gray-50 p-4 rounded-lg text-center">
              <div className="font-medium text-primary-text">Clinic Visit</div>
              <div className="text-lg font-bold text-green-600">
                {data.charges.clinicVisit
                  ? `$${data.charges.clinicVisit}`
                  : "Not set"}
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg text-center">
              <div className="font-medium text-primary-text">
                Online Consultation
              </div>
              <div className="text-lg font-bold text-blue-600">
                {data.charges.onlineConsultation
                  ? `$${data.charges.onlineConsultation}`
                  : "Not set"}
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg text-center">
              <div className="font-medium text-primary-text">Home Visit</div>
              <div className="text-lg font-bold text-purple-600">
                {data.charges.homeVisit
                  ? `$${data.charges.homeVisit}`
                  : "Not set"}
              </div>
            </div>
          </div>
          <div>
            <span className="font-medium text-primary-text">
              Payment Methods:
            </span>
            <div className="flex flex-wrap gap-2 mt-2">
              {data.charges.paymentMethods.length > 0 ? (
                data.charges.paymentMethods.map((method) => (
                  <Badge
                    key={method}
                    variant="outline"
                    className="border-green-500 text-green-700"
                  >
                    {method
                      .replace("-", " ")
                      .replace(/\b\w/g, (l) => l.toUpperCase())}
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
            Please review all information above. Once submitted, your
            registration will be reviewed by our team. You will receive an email
            confirmation and updates about your application status.
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
