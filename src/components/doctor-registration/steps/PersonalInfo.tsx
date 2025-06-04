import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Upload, X, Plus } from "lucide-react";
import { FormData } from "../RegistrationForm";

interface PersonalInfoProps {
  data: FormData;
  updateData: (section: keyof FormData, data: any) => void;
}

const commonLanguages = [
  "English",
  "Hindi",
  "Spanish",
  "French",
  "German",
  "Mandarin",
  "Arabic",
  "Portuguese",
  "Russian",
  "Japanese",
  "Korean",
  "Italian",
  "Dutch",
];

export const PersonalInfo = ({ data, updateData }: PersonalInfoProps) => {
  const [newLanguage, setNewLanguage] = useState("");
  const [newAward, setNewAward] = useState("");

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
      data.personalInfo.languages.filter((lang) => lang !== language),
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
      data.personalInfo.awards.filter((_, i) => i !== index),
    );
  };

  const handleFileChange = (field: string, file: File | null) => {
    handleInputChange(field, file);
  };

  return (
    <div className="space-y-6">
      {/* Basic Information */}
      <Card className="border-l-4 border-l-primary-green">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-primary-text mb-4">
            Basic Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label
                htmlFor="fullName"
                className="text-primary-text font-medium"
              >
                Full Name *
              </Label>
              <Input
                id="fullName"
                value={data.personalInfo.fullName}
                onChange={(e) => handleInputChange("fullName", e.target.value)}
                placeholder="Enter your full name"
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
                value={data.personalInfo.dateOfBirth}
                onChange={(e) =>
                  handleInputChange("dateOfBirth", e.target.value)
                }
                className="border-gray-300 focus:border-primary-green focus:ring-primary-green"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="mobileNumber"
                className="text-primary-text font-medium"
              >
                Mobile Number *
              </Label>
              <Input
                id="mobileNumber"
                value={data.personalInfo.mobileNumber}
                onChange={(e) =>
                  handleInputChange("mobileNumber", e.target.value)
                }
                placeholder="+1 (555) 123-4567"
                className="border-gray-300 focus:border-primary-green focus:ring-primary-green"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Languages Spoken */}
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
                {data.personalInfo.languages.map((language) => (
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

      {/* File Uploads */}
      <Card className="border-l-4 border-l-accent-blue">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-primary-text mb-4">
            Documents & Profile
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="text-primary-text font-medium">
                Resume/CV *
              </Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary-green transition-colors">
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <div className="text-sm text-gray-600 mb-2">
                  {data.personalInfo.resume
                    ? data.personalInfo.resume.name
                    : "Click to upload resume"}
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
              </Label>
              <Textarea
                id="bio"
                value={data.personalInfo.bio}
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
                  {data.personalInfo.awards.map((award, index) => (
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
                  ))}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
