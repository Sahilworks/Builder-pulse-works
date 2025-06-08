import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Upload, X, Plus, CheckCircle, Shield } from "lucide-react";

interface PersonalInfoProps {
  data: any;
  updateData: (section: string, data: any) => void;
}

const commonLanguages = [
  "English",
  "Hindi",
  "Marathi",
  "Tamil",
  "Telugu",
  "Bengali",
  "Gujarati",
  "Kannada",
  "Malayalam",
  "Punjabi",
  "Urdu",
  "French",
  "German",
];

export const PersonalInfo = ({ data, updateData }: PersonalInfoProps) => {
  const [newLanguage, setNewLanguage] = useState("");
  const [newAward, setNewAward] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);

  const handleInputChange = (field: string, value: any) => {
    updateData("personalInfo", { [field]: value });
  };

  const addLanguage = (language: string) => {
    if (language && !data.personalInfo.languages.includes(language)) {
      handleInputChange("languages", [
        ...data.personalInfo.languages,
        language,
      ]);
    }
    setNewLanguage("");
  };

  const removeLanguage = (language: string) => {
    handleInputChange(
      "languages",
      data.personalInfo.languages.filter((lang: string) => lang !== language),
    );
  };

  const addAward = () => {
    if (newAward.trim()) {
      handleInputChange("awards", [
        ...data.personalInfo.awards,
        newAward.trim(),
      ]);
      setNewAward("");
    }
  };

  const removeAward = (index: number) => {
    handleInputChange(
      "awards",
      data.personalInfo.awards.filter((_: any, i: number) => i !== index),
    );
  };

  const handleFileChange = (field: string, file: File | null) => {
    handleInputChange(field, file);

    // AUTO-FETCH BIO FROM RESUME
    if (field === "resume" && file) {
      const simulatedBio = `Experienced medical professional with expertise in ${data.specialization?.selectedSpecialty || "healthcare"}. Dedicated to providing quality patient care with a focus on evidence-based medicine and compassionate treatment. Committed to continuous learning and staying updated with the latest medical advancements.`;
      handleInputChange("bio", simulatedBio);
    }
  };

  const sendOTP = async () => {
    if (!data.personalInfo.mobileNumber) return;

    setIsVerifying(true);
    setTimeout(() => {
      setOtpSent(true);
      setIsVerifying(false);
    }, 2000);
  };

  const verifyOTP = async () => {
    if (!otp) return;

    setIsVerifying(true);
    setTimeout(() => {
      if (otp === "123456") {
        handleInputChange("mobileVerified", true);
        // Auto-fill phone number in contact info
        updateData("contactInfo", {
          phoneNumber: data.personalInfo.mobileNumber,
        });
        setIsVerifying(false);
      } else {
        alert("Invalid OTP. Use 123456 for demo.");
        setIsVerifying(false);
      }
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {/* CHANGED: First Name & Last Name instead of Full Name */}
      <Card className="border-l-4 border-l-primary-green">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-primary-text mb-4">
            Basic Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* NEW: First Name Field */}
            <div className="space-y-2">
              <Label
                htmlFor="firstName"
                className="text-primary-text font-medium"
              >
                First Name *
              </Label>
              <Input
                id="firstName"
                value={data.personalInfo.firstName || ""}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
                placeholder="Enter your first name"
                className="border-gray-300 focus:border-primary-green focus:ring-primary-green"
              />
            </div>

            {/* NEW: Last Name Field */}
            <div className="space-y-2">
              <Label
                htmlFor="lastName"
                className="text-primary-text font-medium"
              >
                Last Name *
              </Label>
              <Input
                id="lastName"
                value={data.personalInfo.lastName || ""}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
                placeholder="Enter your last name"
                className="border-gray-300 focus:border-primary-green focus:ring-primary-green"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="dateOfBirth"
                className="text-primary-text font-medium"
              >
                Date of Birth *
              </Label>
              <Input
                id="dateOfBirth"
                type="date"
                value={data.personalInfo.dateOfBirth || ""}
                onChange={(e) =>
                  handleInputChange("dateOfBirth", e.target.value)
                }
                className="border-gray-300 focus:border-primary-green focus:ring-primary-green"
              />
            </div>

            {/* CHANGED: Mobile Number with OTP Verification */}
            <div className="space-y-2">
              <Label
                htmlFor="mobileNumber"
                className="text-primary-text font-medium"
              >
                Mobile Number *
              </Label>
              <div className="flex gap-2">
                <Input
                  id="mobileNumber"
                  value={data.personalInfo.mobileNumber || ""}
                  onChange={(e) =>
                    handleInputChange("mobileNumber", e.target.value)
                  }
                  placeholder="+91 9876543210"
                  className="border-gray-300 focus:border-primary-green focus:ring-primary-green"
                  disabled={data.personalInfo.mobileVerified}
                />
                {!data.personalInfo.mobileVerified ? (
                  <Button
                    onClick={sendOTP}
                    disabled={!data.personalInfo.mobileNumber || isVerifying}
                    className="bg-primary-green hover:bg-secondary-green"
                  >
                    {isVerifying ? "Sending..." : "Verify"}
                  </Button>
                ) : (
                  <div className="flex items-center gap-2 px-3 py-2 bg-green-100 rounded-md">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-green-700 text-sm font-medium">
                      Verified
                    </span>
                  </div>
                )}
              </div>

              {otpSent && !data.personalInfo.mobileVerified && (
                <div className="flex gap-2 mt-2">
                  <Input
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="Enter OTP (use 123456 for demo)"
                    className="border-gray-300 focus:border-primary-green focus:ring-primary-green"
                  />
                  <Button
                    onClick={verifyOTP}
                    disabled={!otp || isVerifying}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    {isVerifying ? "Verifying..." : "Submit OTP"}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Languages Section */}
      <Card className="border-l-4 border-l-secondary-green">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-primary-text mb-4">
            Languages Spoken
          </h3>
          <Tabs defaultValue="common" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-gray-100">
              <TabsTrigger
                value="common"
                className="data-[state=active]:bg-primary-green data-[state=active]:text-white"
              >
                Common Languages
              </TabsTrigger>
              <TabsTrigger
                value="custom"
                className="data-[state=active]:bg-primary-green data-[state=active]:text-white"
              >
                Add Custom
              </TabsTrigger>
            </TabsList>

            <TabsContent value="common" className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {commonLanguages.map((language) => (
                  <Button
                    key={language}
                    variant={
                      data.personalInfo.languages.includes(language)
                        ? "default"
                        : "outline"
                    }
                    size="sm"
                    onClick={() =>
                      data.personalInfo.languages.includes(language)
                        ? removeLanguage(language)
                        : addLanguage(language)
                    }
                    className={
                      data.personalInfo.languages.includes(language)
                        ? "bg-primary-green hover:bg-secondary-green"
                        : "border-primary-green text-primary-green hover:bg-primary-green hover:text-white"
                    }
                  >
                    {language}
                  </Button>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="custom" className="space-y-4">
              <div className="flex gap-2">
                <Input
                  value={newLanguage}
                  onChange={(e) => setNewLanguage(e.target.value)}
                  placeholder="Enter language name"
                  className="border-gray-300 focus:border-primary-green focus:ring-primary-green"
                  onKeyPress={(e) =>
                    e.key === "Enter" && addLanguage(newLanguage)
                  }
                />
                <Button
                  onClick={() => addLanguage(newLanguage)}
                  className="bg-primary-green hover:bg-secondary-green"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </TabsContent>
          </Tabs>

          {data.personalInfo.languages.length > 0 && (
            <div className="mt-4">
              <Label className="text-primary-text font-medium">
                Selected Languages:
              </Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {data.personalInfo.languages.map((language: string) => (
                  <Badge
                    key={language}
                    variant="secondary"
                    className="bg-primary-green text-white hover:bg-secondary-green"
                  >
                    {language}
                    <X
                      className="w-3 h-3 ml-1 cursor-pointer"
                      onClick={() => removeLanguage(language)}
                    />
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* File Uploads with Auto Bio Fetch */}
      <Card className="border-l-4 border-l-accent-blue">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-primary-text mb-4">
            Documents & Profile
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="text-primary-text font-medium">
                Resume/CV * (Auto-fills Bio)
              </Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary-green transition-colors">
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <div className="text-sm text-gray-600 mb-2">
                  {data.personalInfo.resume
                    ? data.personalInfo.resume.name
                    : "Upload resume to auto-fill bio"}
                </div>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) =>
                    handleFileChange("resume", e.target.files?.[0] || null)
                  }
                  className="hidden"
                  id="resume-upload"
                />
                <Label
                  htmlFor="resume-upload"
                  className="cursor-pointer text-primary-green hover:text-secondary-green"
                >
                  Browse Files
                </Label>
                {data.personalInfo.resume && (
                  <div className="text-xs text-green-600 mt-2 flex items-center justify-center gap-1">
                    <Shield className="w-3 h-3" />
                    Bio auto-filled from resume
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-primary-text font-medium">
                Profile Picture
              </Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary-green transition-colors">
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <div className="text-sm text-gray-600 mb-2">
                  {data.personalInfo.profilePicture
                    ? data.personalInfo.profilePicture.name
                    : "Upload profile picture"}
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    handleFileChange(
                      "profilePicture",
                      e.target.files?.[0] || null,
                    )
                  }
                  className="hidden"
                  id="profile-upload"
                />
                <Label
                  htmlFor="profile-upload"
                  className="cursor-pointer text-primary-green hover:text-secondary-green"
                >
                  Browse Files
                </Label>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bio and Awards */}
      <Card className="border-l-4 border-l-accent-green">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-primary-text mb-4">
            Professional Summary
          </h3>
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="bio" className="text-primary-text font-medium">
                Bio/Description *
                {data.personalInfo.resume && (
                  <span className="text-xs text-green-600 ml-2">
                    (Auto-filled from resume)
                  </span>
                )}
              </Label>
              <Textarea
                id="bio"
                value={data.personalInfo.bio || ""}
                onChange={(e) => handleInputChange("bio", e.target.value)}
                placeholder="Tell patients about yourself, your experience, and your approach to medicine..."
                rows={5}
                className="border-gray-300 focus:border-primary-green focus:ring-primary-green"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-primary-text font-medium">
                Awards & Recognition
              </Label>
              <div className="flex gap-2">
                <Input
                  value={newAward}
                  onChange={(e) => setNewAward(e.target.value)}
                  placeholder="Enter award or recognition"
                  className="border-gray-300 focus:border-primary-green focus:ring-primary-green"
                  onKeyPress={(e) => e.key === "Enter" && addAward()}
                />
                <Button
                  onClick={addAward}
                  className="bg-primary-green hover:bg-secondary-green"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>

              {data.personalInfo.awards.length > 0 && (
                <div className="space-y-2 mt-3">
                  {data.personalInfo.awards.map(
                    (award: string, index: number) => (
                      <div
                        key={index}
                        className="flex items-center justify-between bg-gray-50 p-3 rounded-lg"
                      >
                        <span className="text-sm text-gray-700">{award}</span>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => removeAward(index)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ),
                  )}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
