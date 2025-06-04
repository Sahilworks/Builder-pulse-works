import { RegistrationForm } from "@/components/doctor-registration/RegistrationForm";

const DoctorRegistration = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary-text mb-2">
            Doctor Registration
          </h1>
          <p className="text-lg text-gray-600">
            Join our medical platform and start serving patients
          </p>
        </div>
        <RegistrationForm />
      </div>
    </div>
  );
};

export default DoctorRegistration;
