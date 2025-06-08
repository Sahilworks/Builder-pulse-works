import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DollarSign, CreditCard, MapPin, Video } from "lucide-react";

interface ChargesProps {
  data: any;
  updateData: (section: string, data: any) => void;
}

// CHANGED: Only Indian payment methods
const paymentMethods = [
  { id: "gpay", label: "Google Pay", icon: "📱" },
  { id: "paytm", label: "Paytm", icon: "💳" },
  { id: "phonepe", label: "PhonePe", icon: "📲" },
  { id: "netbanking", label: "Net Banking", icon: "🏦" },
  { id: "upi", label: "UPI", icon: "💰" },
];

export const Charges = ({ data, updateData }: ChargesProps) => {
  const handleInputChange = (field: string, value: string) => {
    updateData("charges", { [field]: value });
  };

  const togglePaymentMethod = (method: string) => {
    const currentMethods = data.charges?.paymentMethods || [];
    const newMethods = currentMethods.includes(method)
      ? currentMethods.filter((m: string) => m !== method)
      : [...currentMethods, method];

    updateData("charges", { paymentMethods: newMethods });
  };

  const formatCurrency = (value: string) => {
    if (!value) return "";
    const formatted = parseFloat(value).toLocaleString("en-IN");
    return `₹ ${formatted}`;
  };

  return (
    <div className="space-y-6">
      {/* CHANGED: Only Rupees - No Currency Selection */}
      <Card className="border-l-4 border-l-primary-green bg-gradient-to-r from-green-50 to-emerald-50">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-primary-text mb-4 flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-primary-green" />
            Consultation Charges (Indian Rupees ₹ Only)
          </h3>
          <p className="text-sm text-gray-600">
            All charges are in Indian Rupees (₹). Set competitive rates based on
            your experience and location.
          </p>
        </CardContent>
      </Card>

      {/* CHANGED: Service Charges - Removed Home Visit */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Clinic Visit */}
        <Card className="border-l-4 border-l-secondary-green">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-primary-text mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-secondary-green" />
              Clinic Visit Charges
            </h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-primary-text font-medium">
                  Consultation Fee (₹)
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">
                    ₹
                  </span>
                  <Input
                    type="number"
                    value={data.charges?.clinicVisit || ""}
                    onChange={(e) =>
                      handleInputChange("clinicVisit", e.target.value)
                    }
                    placeholder="500"
                    className="pl-8 border-gray-300 focus:border-secondary-green focus:ring-secondary-green"
                  />
                </div>
                {data.charges?.clinicVisit && (
                  <p className="text-sm text-gray-600">
                    Display Price: {formatCurrency(data.charges.clinicVisit)}
                  </p>
                )}
              </div>
              <div className="bg-secondary-green bg-opacity-10 p-3 rounded-lg">
                <p className="text-sm text-secondary-green font-medium">
                  In-Person Consultation
                </p>
                <p className="text-xs text-gray-600 mt-1">
                  Physical examination and consultation at your clinic
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Online Consultation */}
        <Card className="border-l-4 border-l-accent-blue">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-primary-text mb-4 flex items-center gap-2">
              <Video className="w-5 h-5 text-accent-blue" />
              Online Consultation Charges
            </h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-primary-text font-medium">
                  Video Call Fee (₹)
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">
                    ₹
                  </span>
                  <Input
                    type="number"
                    value={data.charges?.onlineConsultation || ""}
                    onChange={(e) =>
                      handleInputChange("onlineConsultation", e.target.value)
                    }
                    placeholder="300"
                    className="pl-8 border-gray-300 focus:border-accent-blue focus:ring-accent-blue"
                  />
                </div>
                {data.charges?.onlineConsultation && (
                  <p className="text-sm text-gray-600">
                    Display Price:{" "}
                    {formatCurrency(data.charges.onlineConsultation)}
                  </p>
                )}
              </div>
              <div className="bg-accent-blue bg-opacity-10 p-3 rounded-lg">
                <p className="text-sm text-accent-blue font-medium">
                  Virtual Consultation
                </p>
                <p className="text-xs text-gray-600 mt-1">
                  Remote consultation via video call or chat
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* CHANGED: Only Indian Payment Methods */}
      <Card className="border-l-4 border-l-primary-green">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-primary-text mb-4 flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-primary-green" />
            Accepted Payment Methods (Indian Only)
          </h3>
          <div className="space-y-4">
            <p className="text-sm text-gray-600 mb-4">
              Select the Indian digital payment methods you accept for
              consultations
            </p>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {paymentMethods.map((method) => (
                <Button
                  key={method.id}
                  variant={
                    (data.charges?.paymentMethods || []).includes(method.id)
                      ? "default"
                      : "outline"
                  }
                  onClick={() => togglePaymentMethod(method.id)}
                  className={`p-4 h-auto flex flex-col items-center gap-2 ${
                    (data.charges?.paymentMethods || []).includes(method.id)
                      ? "bg-primary-green hover:bg-secondary-green text-white"
                      : "border-gray-300 hover:border-primary-green hover:bg-primary-green hover:text-white"
                  }`}
                >
                  <span className="text-2xl">{method.icon}</span>
                  <span className="text-xs font-medium text-center">
                    {method.label}
                  </span>
                </Button>
              ))}
            </div>

            {(data.charges?.paymentMethods || []).length > 0 && (
              <div className="space-y-2">
                <Label className="text-primary-text font-medium">
                  Selected Payment Methods:
                </Label>
                <div className="flex flex-wrap gap-2">
                  {data.charges.paymentMethods.map((methodId: string) => {
                    const method = paymentMethods.find(
                      (m) => m.id === methodId,
                    );
                    return (
                      <Badge
                        key={methodId}
                        variant="secondary"
                        className="bg-primary-green text-white"
                      >
                        {method?.icon} {method?.label}
                      </Badge>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Pricing Summary */}
      <Card className="border-l-4 border-l-accent-blue bg-gradient-to-r from-blue-50 to-indigo-50">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-primary-text mb-4">
            Pricing Summary (₹ Rupees)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="text-center p-4 bg-white rounded-lg shadow-sm">
              <MapPin className="w-8 h-8 text-secondary-green mx-auto mb-2" />
              <div className="text-2xl font-bold text-primary-text">
                {data.charges?.clinicVisit
                  ? formatCurrency(data.charges.clinicVisit)
                  : "Not Set"}
              </div>
              <div className="text-sm text-gray-600">Clinic Visit</div>
            </div>
            <div className="text-center p-4 bg-white rounded-lg shadow-sm">
              <Video className="w-8 h-8 text-accent-blue mx-auto mb-2" />
              <div className="text-2xl font-bold text-primary-text">
                {data.charges?.onlineConsultation
                  ? formatCurrency(data.charges.onlineConsultation)
                  : "Not Set"}
              </div>
              <div className="text-sm text-gray-600">Online Consultation</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Pricing Guidelines */}
      <Card className="border-l-4 border-l-accent-green bg-gradient-to-r from-amber-50 to-orange-50">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-primary-text mb-3">
            Pricing Guidelines for Indian Market
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <div>
                  <h4 className="font-medium text-green-700">
                    Competitive Pricing
                  </h4>
                  <p className="text-sm text-green-600">
                    Research local market rates in your city for competitive
                    pricing
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div>
                  <h4 className="font-medium text-blue-700">
                    Online vs Clinic
                  </h4>
                  <p className="text-sm text-blue-600">
                    Online consultations are typically 20-30% less than clinic
                    visits
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                <div>
                  <h4 className="font-medium text-purple-700">
                    Digital Payments
                  </h4>
                  <p className="text-sm text-purple-600">
                    Accept popular Indian payment methods for patient
                    convenience
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                <div>
                  <h4 className="font-medium text-orange-700">
                    Transparent Pricing
                  </h4>
                  <p className="text-sm text-orange-600">
                    Clearly communicate all fees to build patient trust
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
