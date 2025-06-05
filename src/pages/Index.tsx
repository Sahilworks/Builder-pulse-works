import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { UserPlus, Stethoscope, Calendar, CreditCard } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-green to-secondary-green text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Medical Platform</h1>
          <p className="text-xl text-white/90 mb-8">
            Join our network of healthcare professionals and start serving
            patients today
          </p>
          <Link to="/doctor-registration">
            <Button
              size="lg"
              className="bg-white text-primary-green hover:bg-gray-100 px-8 py-3 text-lg font-semibold"
            >
              <UserPlus className="w-5 h-5 mr-2" />
              Register as Doctor
            </Button>
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-primary-text mb-4">
            Why Join Our Platform?
          </h2>
          <p className="text-gray-600 text-lg">
            Everything you need to manage your medical practice in one place
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="border-l-4 border-l-primary-green hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <Stethoscope className="w-12 h-12 text-primary-green mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-primary-text mb-2">
                Professional Profile
              </h3>
              <p className="text-gray-600">
                Showcase your qualifications, specializations, and experience to
                attract patients
              </p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-secondary-green hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <Calendar className="w-12 h-12 text-secondary-green mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-primary-text mb-2">
                Flexible Scheduling
              </h3>
              <p className="text-gray-600">
                Set your availability for clinic visits, online consultations,
                and home visits
              </p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-accent-blue hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <CreditCard className="w-12 h-12 text-accent-blue mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-primary-text mb-2">
                Multiple Payment Options
              </h3>
              <p className="text-gray-600">
                Accept payments through various methods and set your
                consultation rates
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <Card className="bg-gradient-to-r from-primary-green to-secondary-green text-white">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">Ready to Get Started?</h3>
              <p className="text-white/90 mb-6">
                Complete our comprehensive registration process and join
                thousands of doctors already on our platform
              </p>
              <Link to="/doctor-registration">
                <Button
                  size="lg"
                  className="bg-white text-primary-green hover:bg-gray-100 px-8 py-3 text-lg font-semibold"
                >
                  Start Registration Process
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
