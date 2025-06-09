import { useState } from "react";
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
  Search,
} from "lucide-react";

interface EducationProps {
  data: any;
  updateData: (section: string, data: any) => void;
}

// COMPREHENSIVE DEGREE OPTIONS WITH SUGGESTIONS
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
  "MBBS, MD",
  "MBBS, MS",
  "MBBS, DNB",
  "Other",
];

// COMPREHENSIVE INDIAN MEDICAL COLLEGES/UNIVERSITIES
const indianMedicalInstitutes = [
  // AIIMS
  "All India Institute of Medical Sciences (AIIMS), New Delhi",
  "AIIMS Bhopal",
  "AIIMS Bhubaneswar",
  "AIIMS Jodhpur",
  "AIIMS Patna",
  "AIIMS Raipur",
  "AIIMS Rishikesh",
  "AIIMS Nagpur",
  "AIIMS Mangalagiri",

  // Top Medical Colleges
  "Armed Forces Medical College (AFMC), Pune",
  "Christian Medical College (CMC), Vellore",
  "Grant Medical College, Mumbai",
  "King George's Medical University (KGMU), Lucknow",
  "Maulana Azad Medical College (MAMC), New Delhi",
  "University College of Medical Sciences (UCMS), Delhi",
  "Vardhman Mahavir Medical College (VMMC), Delhi",
  "Lady Hardinge Medical College, New Delhi",
  "Madras Medical College, Chennai",
  "Stanley Medical College, Chennai",
  "Government Medical College, Thiruvananthapuram",
  "B.J. Medical College, Pune",
  "T.N. Medical College, Mumbai",
  "Seth G.S. Medical College, Mumbai",
  "Lokmanya Tilak Municipal Medical College, Mumbai",

  // State Medical Colleges
  "Government Medical College, Kozhikode",
  "Government Medical College, Thrissur",
  "Mysore Medical College & Research Institute",
  "Bangalore Medical College and Research Institute",
  "Kempegowda Institute of Medical Sciences, Bangalore",
  "Jawaharlal Institute of Postgraduate Medical Education & Research (JIPMER), Puducherry",
  "Sree Chitra Tirunal Institute for Medical Sciences, Trivandrum",
  "Postgraduate Institute of Medical Education and Research (PGIMER), Chandigarh",
  "Sanjay Gandhi Postgraduate Institute of Medical Sciences, Lucknow",
  "Institute of Medical Sciences, BHU, Varanasi",
  "Aligarh Muslim University, Faculty of Medicine",
  "Jamia Hamdard, New Delhi",
  "Hamdard Institute of Medical Sciences, New Delhi",

  // Private Medical Colleges
  "Kasturba Medical College, Manipal",
  "St. John's Medical College, Bangalore",
  "JSS Medical College, Mysore",
  "Amrita Institute of Medical Sciences, Kochi",
  "SRM Medical College Hospital & Research Centre, Chennai",
  "VIT University School of Medicine, Vellore",
  "Saveetha Medical College, Chennai",
  "Dr. D.Y. Patil Medical College, Pune",
  "Bharati Vidyapeeth Medical College, Pune",
  "KLE University, Belgaum",
  "Manipal College of Medical Sciences, Pokhara",

  // Dental Colleges
  "Maulana Azad Institute of Dental Sciences, New Delhi",
  "Government Dental College, Mumbai",
  "King George's Medical University, Faculty of Dental Sciences",
  "Government Dental College, Thiruvananthapuram",

  // Nursing Colleges
  "College of Nursing, AIIMS, New Delhi",
  "National Institute of Nursing Education, PGIMER, Chandigarh",
  "Rajkumari Amrit Kaur College of Nursing, New Delhi",

  // Pharmacy Colleges
  "Jamia Hamdard, Faculty of Pharmacy",
  "Institute of Chemical Technology, Mumbai",
  "National Institute of Pharmaceutical Education and Research (NIPER)",

  // Enter Custom
  "Other (Enter Custom)",
];

// COMPREHENSIVE MEDICAL COUNCILS AND AUTHORITIES
const medicalAuthorities = [
  // National Bodies
  "National Medical Commission (NMC)",
  "Medical Council of India (MCI)",
  "Dental Council of India (DCI)",
  "Pharmacy Council of India (PCI)",
  "Indian Nursing Council (INC)",
  "Central Council of Homoeopathy (CCH)",
  "Central Council of Indian Medicine (CCIM)",
  "All India Institute of Medical Sciences (AIIMS)",
  "National Board of Examinations (NBE)",

  // State Medical Councils
  "Delhi Medical Council",
  "Maharashtra Medical Council",
  "Tamil Nadu Medical Council",
  "Karnataka Medical Council",
  "Kerala Medical Council",
  "Gujarat Medical Council",
  "Rajasthan Medical Council",
  "Uttar Pradesh Medical Council",
  "West Bengal Medical Council",
  "Andhra Pradesh Medical Council",
  "Telangana Medical Council",
  "Punjab Medical Council",
  "Haryana Medical Council",
  "Madhya Pradesh Medical Council",
  "Odisha Medical Council",
  "Assam Medical Council",
  "Bihar Medical Council",
  "Jharkhand Medical Council",
  "Chhattisgarh Medical Council",
  "Himachal Pradesh Medical Council",
  "Jammu & Kashmir Medical Council",
  "Uttarakhand Medical Council",
  "Goa Medical Council",

  // Specialty Councils
  "Indian Council of Medical Research (ICMR)",
  "Indian Medical Association (IMA)",
  "Association of Physicians of India (API)",
  "Indian Academy of Pediatrics (IAP)",
  "Cardiological Society of India (CSI)",
  "Indian Psychiatric Society",
  "Indian Orthopaedic Association",
  "Indian Society of Anesthesiologists",

  // Other
  "Other Authority",
];

export const Education = ({ data, updateData }: EducationProps) => {
  const [degreeSearch, setDegreeSearch] = useState("");
  const [instituteSearch, setInstituteSearch] = useState("");
  const [authoritySearch, setAuthoritySearch] = useState("");
  const [showDegreeSuggestions, setShowDegreeSuggestions] = useState(false);
  const [showInstituteSuggestions, setShowInstituteSuggestions] =
    useState(false);
  const [showAuthoritySuggestions, setShowAuthoritySuggestions] =
    useState(false);

  const handleInputChange = (field: string, value: any) => {
    updateData("education", { [field]: value });
  };

  const handleFileChange = (file: File | null) => {
    handleInputChange("medicalLicence", file);
  };

  // Filter functions for suggestions
  const getFilteredDegrees = () => {
    if (!degreeSearch) return degreeOptions.slice(0, 8);
    return degreeOptions
      .filter((degree) =>
        degree.toLowerCase().includes(degreeSearch.toLowerCase()),
      )
      .slice(0, 8);
  };

  const getFilteredInstitutes = () => {
    if (!instituteSearch) return indianMedicalInstitutes.slice(0, 10);
    return indianMedicalInstitutes
      .filter((institute) =>
        institute.toLowerCase().includes(instituteSearch.toLowerCase()),
      )
      .slice(0, 10);
  };

  const getFilteredAuthorities = () => {
    if (!authoritySearch) return medicalAuthorities.slice(0, 10);
    return medicalAuthorities
      .filter((authority) =>
        authority.toLowerCase().includes(authoritySearch.toLowerCase()),
      )
      .slice(0, 10);
  };

  // Handle selection from suggestions
  const selectDegree = (degree: string) => {
    handleInputChange("highestDegree", degree);
    setDegreeSearch(degree);
    setShowDegreeSuggestions(false);
  };

  const selectInstitute = (institute: string) => {
    if (institute === "Other (Enter Custom)") {
      handleInputChange("university", "");
      setInstituteSearch("");
    } else {
      handleInputChange("university", institute);
      setInstituteSearch(institute);
    }
    setShowInstituteSuggestions(false);
  };

  const selectAuthority = (authority: string) => {
    handleInputChange("issuingAuthority", authority);
    setAuthoritySearch(authority);
    setShowAuthoritySuggestions(false);
  };

  return (
    <div className="space-y-6">
      {/* Educational Background */}
      <Card className="border-l-4 border-l-primary-green">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-primary-text mb-4 flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-primary-green" />
            Educational Background (With Smart Suggestions)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* UPDATED: Degree with Auto-Suggestions */}
            <div className="space-y-2 relative">
              <Label className="text-primary-text font-medium flex items-center gap-2">
                <Award className="w-4 h-4 text-secondary-green" />
                Highest Medical Degree *
              </Label>
              <div className="relative">
                <Input
                  value={degreeSearch || data.education.highestDegree || ""}
                  onChange={(e) => {
                    setDegreeSearch(e.target.value);
                    handleInputChange("highestDegree", e.target.value);
                    setShowDegreeSuggestions(true);
                  }}
                  onFocus={() => setShowDegreeSuggestions(true)}
                  onBlur={() =>
                    setTimeout(() => setShowDegreeSuggestions(false), 200)
                  }
                  placeholder="Type to search degrees (e.g., MBBS, MD, MS...)"
                  className="border-gray-300 focus:border-primary-green focus:ring-primary-green"
                />
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>

              {/* Degree Suggestions Dropdown */}
              {showDegreeSuggestions && (
                <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                  {getFilteredDegrees().map((degree) => (
                    <div
                      key={degree}
                      onClick={() => selectDegree(degree)}
                      className="p-3 hover:bg-primary-green hover:text-white cursor-pointer border-b border-gray-100 last:border-b-0"
                    >
                      <div className="font-medium">{degree}</div>
                      {degree === "MBBS" && (
                        <div className="text-xs opacity-75">
                          Bachelor of Medicine, Bachelor of Surgery
                        </div>
                      )}
                      {degree === "MD" && (
                        <div className="text-xs opacity-75">
                          Doctor of Medicine
                        </div>
                      )}
                      {degree === "MS" && (
                        <div className="text-xs opacity-75">
                          Master of Surgery
                        </div>
                      )}
                      {degree === "DNB" && (
                        <div className="text-xs opacity-75">
                          Diplomate of National Board
                        </div>
                      )}
                    </div>
                  ))}
                  {getFilteredDegrees().length === 0 && (
                    <div className="p-3 text-gray-500 text-center">
                      No degrees found. Try typing a different term.
                    </div>
                  )}
                </div>
              )}
              <p className="text-xs text-gray-500">
                Start typing to see degree suggestions
              </p>
            </div>

            {/* UPDATED: University with Auto-Suggestions */}
            <div className="space-y-2 relative">
              <Label className="text-primary-text font-medium flex items-center gap-2">
                <Building className="w-4 h-4 text-secondary-green" />
                University/Institute *
              </Label>
              <div className="relative">
                <Input
                  value={instituteSearch || data.education.university || ""}
                  onChange={(e) => {
                    setInstituteSearch(e.target.value);
                    handleInputChange("university", e.target.value);
                    setShowInstituteSuggestions(true);
                  }}
                  onFocus={() => setShowInstituteSuggestions(true)}
                  onBlur={() =>
                    setTimeout(() => setShowInstituteSuggestions(false), 200)
                  }
                  placeholder="Type to search institutes (e.g., AIIMS, CMC...)"
                  className="border-gray-300 focus:border-primary-green focus:ring-primary-green"
                />
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>

              {/* Institute Suggestions Dropdown */}
              {showInstituteSuggestions && (
                <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-64 overflow-y-auto">
                  {getFilteredInstitutes().map((institute) => (
                    <div
                      key={institute}
                      onClick={() => selectInstitute(institute)}
                      className="p-3 hover:bg-primary-green hover:text-white cursor-pointer border-b border-gray-100 last:border-b-0"
                    >
                      <div className="font-medium text-sm">{institute}</div>
                      {institute.includes("AIIMS") && (
                        <div className="text-xs opacity-75">
                          All India Institute of Medical Sciences
                        </div>
                      )}
                      {institute.includes("CMC") && (
                        <div className="text-xs opacity-75">
                          Christian Medical College
                        </div>
                      )}
                      {institute.includes("Government Medical College") && (
                        <div className="text-xs opacity-75">
                          Government Institution
                        </div>
                      )}
                    </div>
                  ))}
                  {getFilteredInstitutes().length === 0 && (
                    <div className="p-3 text-gray-500 text-center">
                      No institutes found. Try typing a different term.
                    </div>
                  )}
                </div>
              )}
              <p className="text-xs text-gray-500">
                Search from 100+ Indian medical colleges
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
            Medical License Information (With Authority Suggestions)
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
                  value={data.education.medicalLicenceNumber || ""}
                  onChange={(e) =>
                    handleInputChange("medicalLicenceNumber", e.target.value)
                  }
                  placeholder="Enter your license number"
                  className="border-gray-300 focus:border-primary-green focus:ring-primary-green"
                />
              </div>

              {/* UPDATED: Issuing Authority with Auto-Suggestions */}
              <div className="space-y-2 relative">
                <Label className="text-primary-text font-medium">
                  Issuing Authority *
                </Label>
                <div className="relative">
                  <Input
                    value={
                      authoritySearch || data.education.issuingAuthority || ""
                    }
                    onChange={(e) => {
                      setAuthoritySearch(e.target.value);
                      handleInputChange("issuingAuthority", e.target.value);
                      setShowAuthoritySuggestions(true);
                    }}
                    onFocus={() => setShowAuthoritySuggestions(true)}
                    onBlur={() =>
                      setTimeout(() => setShowAuthoritySuggestions(false), 200)
                    }
                    placeholder="Type to search authorities (e.g., NMC, State Medical Council...)"
                    className="border-gray-300 focus:border-primary-green focus:ring-primary-green"
                  />
                  <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                </div>

                {/* Authority Suggestions Dropdown */}
                {showAuthoritySuggestions && (
                  <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-64 overflow-y-auto">
                    {getFilteredAuthorities().map((authority) => (
                      <div
                        key={authority}
                        onClick={() => selectAuthority(authority)}
                        className="p-3 hover:bg-primary-green hover:text-white cursor-pointer border-b border-gray-100 last:border-b-0"
                      >
                        <div className="font-medium text-sm">{authority}</div>
                        {authority.includes("NMC") && (
                          <div className="text-xs opacity-75">
                            National regulatory body for medical education
                          </div>
                        )}
                        {authority.includes("State Medical Council") && (
                          <div className="text-xs opacity-75">
                            State-level medical regulation
                          </div>
                        )}
                        {authority.includes("DCI") && (
                          <div className="text-xs opacity-75">
                            For dental professionals
                          </div>
                        )}
                      </div>
                    ))}
                    {getFilteredAuthorities().length === 0 && (
                      <div className="p-3 text-gray-500 text-center">
                        No authorities found. Try typing a different term.
                      </div>
                    )}
                  </div>
                )}
                <p className="text-xs text-gray-500">
                  Search from national and state medical councils
                </p>
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
                value={data.education.licenceExpiryDate || ""}
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
              <label
                htmlFor="license-upload"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-green hover:bg-secondary-green cursor-pointer transition-colors"
              >
                {data.education.medicalLicence
                  ? "Change Document"
                  : "Choose File"}
              </label>
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

      {/* Suggestions Guide */}
      <Card className="border-l-4 border-l-accent-green bg-gradient-to-r from-blue-50 to-indigo-50">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-primary-text mb-3">
            Smart Suggestions Guide
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary-green rounded-full mt-2"></div>
                <div>
                  <h4 className="font-medium text-primary-green">
                    Degree Suggestions
                  </h4>
                  <p className="text-sm text-gray-600">
                    Get instant suggestions for medical degrees like MBBS, MD,
                    MS, DNB
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-secondary-green rounded-full mt-2"></div>
                <div>
                  <h4 className="font-medium text-secondary-green">
                    Institute Database
                  </h4>
                  <p className="text-sm text-gray-600">
                    Search from 100+ Indian medical colleges and institutes
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-accent-blue rounded-full mt-2"></div>
                <div>
                  <h4 className="font-medium text-accent-blue">
                    Authority Finder
                  </h4>
                  <p className="text-sm text-gray-600">
                    Quick access to NMC, state councils, and specialty boards
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Important Notes */}
      <Card className="border-l-4 border-l-orange-500 bg-gradient-to-r from-amber-50 to-orange-50">
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
                <h4 className="font-medium text-blue-700">Quick Tips</h4>
                <p className="text-sm text-blue-600">
                  Use the search feature to quickly find your degree, institute,
                  or issuing authority from our comprehensive database.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
