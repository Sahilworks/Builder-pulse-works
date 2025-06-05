import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  CheckCircle,
  Mail,
  Calendar,
  Phone,
  Home,
  FileText,
  Clock,
  Users,
} from "lucide-react";

const RegistrationSuccess = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-8">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-green-400 to-green-600 rounded-full mb-6">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-primary-text mb-4">
            Registration Successful! 🎉
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Congratulations! Your doctor registration has been submitted
            successfully. We're excited to have you join our medical platform.
          </p>
        </div>

        {/* What Happens Next */}
        <Card className="max-w-4xl mx-auto mb-8 border-l-4 border-l-primary-green">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold text-primary-text mb-6 flex items-center gap-3">
              <Clock className="w-6 h-6 text-primary-green" />
              What Happens Next?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="flex items-center justify-center w-8 h-8 bg-primary-green text-white rounded-full text-sm font-bold">
                    1
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary-text">
                      Document Verification
                    </h3>
                    <p className="text-sm text-gray-600">
                      Our team will verify your medical license and educational
                      credentials within 24-48 hours.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex items-center justify-center w-8 h-8 bg-secondary-green text-white rounded-full text-sm font-bold">
                    2
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary-text">
                      Profile Review
                    </h3>
                    <p className="text-sm text-gray-600">
                      We'll review your specializations, availability, and
                      pricing information.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="flex items-center justify-center w-8 h-8 bg-accent-blue text-white rounded-full text-sm font-bold">
                    3
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary-text">
                      Account Activation
                    </h3>
                    <p className="text-sm text-gray-600">
                      Once approved, you'll receive login credentials and access
                      to your doctor dashboard.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex items-center justify-center w-8 h-8 bg-accent-green text-white rounded-full text-sm font-bold">
                    4
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary-text">
                      Start Serving Patients
                    </h3>
                    <p className="text-sm text-gray-600">
                      Begin accepting appointments and consultations through our
                      platform.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="border-l-4 border-l-primary-green">
            <CardContent className="p-6 text-center">
              <Mail className="w-10 h-10 text-primary-green mx-auto mb-4" />
              <h3 className="font-semibold text-primary-text mb-2">
                Email Confirmation
              </h3>
              <p className="text-sm text-gray-600 mb-3">
                Check your email for a detailed confirmation and next steps.
              </p>
              <p className="text-xs text-primary-green font-medium">
                support@medicalplatform.com
              </p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-secondary-green">
            <CardContent className="p-6 text-center">
              <Phone className="w-10 h-10 text-secondary-green mx-auto mb-4" />
              <h3 className="font-semibold text-primary-text mb-2">
                Support Hotline
              </h3>
              <p className="text-sm text-gray-600 mb-3">
                Have questions? Our support team is here to help.
              </p>
              <p className="text-xs text-secondary-green font-medium">
                +1 (555) 123-DOCS
              </p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-accent-blue">
            <CardContent className="p-6 text-center">
              <Calendar className="w-10 h-10 text-accent-blue mx-auto mb-4" />
              <h3 className="font-semibold text-primary-text mb-2">
                Processing Time
              </h3>
              <p className="text-sm text-gray-600 mb-3">
                Typical verification and approval timeframe.
              </p>
              <p className="text-xs text-accent-blue font-medium">
                24-48 Hours
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Important Information */}
        <Card className="max-w-4xl mx-auto mb-8 bg-gradient-to-r from-amber-50 to-orange-50 border-l-4 border-l-amber-500">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-amber-800 mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Important Information
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-amber-500 rounded-full mt-2"></div>
                <p className="text-amber-700">
                  <strong>Registration ID:</strong> DOC-
                  {Math.random().toString(36).substr(2, 9).toUpperCase()}
                  (Save this for your records)
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-amber-500 rounded-full mt-2"></div>
                <p className="text-amber-700">
                  <strong>Document Status:</strong> All uploaded documents are
                  secure and will only be used for verification purposes.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-amber-500 rounded-full mt-2"></div>
                <p className="text-amber-700">
                  <strong>Profile Visibility:</strong> Your profile will be
                  visible to patients only after successful verification and
                  approval.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Platform Benefits */}
        <Card className="max-w-4xl mx-auto mb-8 border-l-4 border-l-accent-green">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold text-primary-text mb-6 flex items-center gap-3">
              <Users className="w-6 h-6 text-accent-green" />
              Welcome to Our Medical Community
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-semibold text-primary-text">
                  Patient Access
                </h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Connect with patients in your area
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Offer multiple consultation types
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Build your patient base organically
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold text-primary-text">
                  Platform Features
                </h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Integrated scheduling system
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Secure payment processing
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Patient management tools
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="text-center space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/">
              <Button
                variant="outline"
                size="lg"
                className="border-primary-green text-primary-green hover:bg-primary-green hover:text-white px-8"
              >
                <Home className="w-5 h-5 mr-2" />
                Back to Homepage
              </Button>
            </Link>

            <Button
              size="lg"
              className="bg-gradient-to-r from-primary-green to-secondary-green hover:from-secondary-green hover:to-primary-green text-white px-8"
              onClick={() =>
                window.open("mailto:support@medicalplatform.com", "_blank")
              }
            >
              <Mail className="w-5 h-5 mr-2" />
              Contact Support
            </Button>
          </div>

          <p className="text-sm text-gray-500">
            Need to make changes? Contact our support team within 24 hours of
            registration.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegistrationSuccess;
