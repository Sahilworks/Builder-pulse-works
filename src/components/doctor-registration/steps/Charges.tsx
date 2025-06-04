import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DollarSign, CreditCard, MapPin, Video, Home } from "lucide-react";
import { FormData } from "../RegistrationForm";

interface ChargesProps {
  data: FormData;
  updateData: (section: keyof FormData, data: any) => void;
}

const paymentMethods = [
  { id: "cash", label: "Cash", icon: "💵" },
  { id: "credit-card", label: "Credit Card", icon: "💳" },
  { id: "debit-card", label: "Debit Card", icon: "💳" },
  { id: "upi", label: "UPI/Digital Wallets", icon: "📱" },
  { id: "bank-transfer", label: "Bank Transfer", icon: "🏦" },
  { id: "cheque", label: "Cheque", icon: "📝" },
  { id: "insurance", label: "Insurance", icon: "🛡️" },
  { id: "emi", label: "EMI/Installments", icon: "📊" },
];

const currencies = ["USD", "EUR", "INR", "GBP", "CAD", "AUD"];

export const Charges = ({ data, updateData }: ChargesProps) => {
  const [currency, setCurrency] = useState("USD");

  const handleInputChange = (field: string, value: string) => {
    updateData("charges", { [field]: value });
  };

  const togglePaymentMethod = (method: string) => {
    const currentMethods = data.charges.paymentMethods;
    const newMethods = currentMethods.includes(method)
      ? currentMethods.filter((m) => m !== method)
      : [...currentMethods, method];

    updateData("charges", { paymentMethods: newMethods });
  };

  const formatCurrency = (value: string) => {
    if (!value) return "";
    const formatted = parseFloat(value).toLocaleString();
    return `${currency} ${formatted}`;
  };

  return (
    <div className="space-y-6">
      {/* Currency Selection */}
      <Card className="border-l-4 border-l-primary-green bg-gradient-to-r from-green-50 to-emerald-50">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-primary-text mb-4 flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-primary-green" />
            Currency & Pricing
          </h3>
          <div className="max-w-xs">
            <Label className="text-primary-text font-medium">
              Select Currency
            </Label>
            <Select value={currency} onValueChange={setCurrency}>
              <SelectTrigger className="border-gray-300 focus:border-primary-green focus:ring-primary-green">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {currencies.map((curr) => (
                  <SelectItem key={curr} value={curr}>
                    {curr}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Service Charges */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Clinic Visit */}
        <Card className="border-l-4 border-l-secondary-green">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-primary-text mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-secondary-green" />
              Clinic Visit
            </h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-primary-text font-medium">
                  Consultation Fee
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">
                    {currency}
                  </span>
                  <Input
                    type="number"
                    value={data.charges.clinicVisit}
                    onChange={(e) =>
                      handleInputChange("clinicVisit", e.target.value)
                    }
                    placeholder="0.00"
                    className="pl-12 border-gray-300 focus:border-secondary-green focus:ring-secondary-green"
                  />
                </div>
                {data.charges.clinicVisit && (
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
              Online Consultation
            </h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-primary-text font-medium">
                  Video Call Fee
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">
                    {currency}
                  </span>
                  <Input
                    type="number"
                    value={data.charges.onlineConsultation}
                    onChange={(e) =>
                      handleInputChange("onlineConsultation", e.target.value)
                    }
                    placeholder="0.00"
                    className="pl-12 border-gray-300 focus:border-accent-blue focus:ring-accent-blue"
                  />
                </div>
                {data.charges.onlineConsultation && (
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

        {/* Home Visit */}
        <Card className="border-l-4 border-l-accent-green">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-primary-text mb-4 flex items-center gap-2">
              <Home className="w-5 h-5 text-accent-green" />
              Home Visit
            </h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-primary-text font-medium">
                  Home Visit Fee
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">
                    {currency}
                  </span>
                  <Input
                    type="number"
                    value={data.charges.homeVisit}
                    onChange={(e) =>
                      handleInputChange("homeVisit", e.target.value)
                    }
                    placeholder="0.00"
                    className="pl-12 border-gray-300 focus:border-accent-green focus:ring-accent-green"
                  />
                </div>
                {data.charges.homeVisit && (
                  <p className="text-sm text-gray-600">
                    Display Price: {formatCurrency(data.charges.homeVisit)}
                  </p>
                )}
              </div>
              <div className="bg-accent-green bg-opacity-10 p-3 rounded-lg">
                <p className="text-sm text-accent-green font-medium">
                  At-Home Care
                </p>
                <p className="text-xs text-gray-600 mt-1">
                  Consultation at patient's location (may include travel
                  charges)
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Payment Methods */}
      <Card className="border-l-4 border-l-primary-green">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-primary-text mb-4 flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-primary-green" />
            Accepted Payment Methods
          </h3>
          <div className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {paymentMethods.map((method) => (
                <Button
                  key={method.id}
                  variant={
                    data.charges.paymentMethods.includes(method.id)
                      ? "default"
                      : "outline"
                  }
                  onClick={() => togglePaymentMethod(method.id)}
                  className={`p-4 h-auto flex flex-col items-center gap-2 ${
                    data.charges.paymentMethods.includes(method.id)
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

            {data.charges.paymentMethods.length > 0 && (
              <div className="space-y-2">
                <Label className="text-primary-text font-medium">
                  Selected Payment Methods:
                </Label>
                <div className="flex flex-wrap gap-2">
                  {data.charges.paymentMethods.map((methodId) => {
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
            Pricing Summary
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-white rounded-lg shadow-sm">
              <MapPin className="w-8 h-8 text-secondary-green mx-auto mb-2" />
              <div className="text-2xl font-bold text-primary-text">
                {data.charges.clinicVisit
                  ? formatCurrency(data.charges.clinicVisit)
                  : "Not Set"}
              </div>
              <div className="text-sm text-gray-600">Clinic Visit</div>
            </div>
            <div className="text-center p-4 bg-white rounded-lg shadow-sm">
              <Video className="w-8 h-8 text-accent-blue mx-auto mb-2" />
              <div className="text-2xl font-bold text-primary-text">
                {data.charges.onlineConsultation
                  ? formatCurrency(data.charges.onlineConsultation)
                  : "Not Set"}
              </div>
              <div className="text-sm text-gray-600">Online Consultation</div>
            </div>
            <div className="text-center p-4 bg-white rounded-lg shadow-sm">
              <Home className="w-8 h-8 text-accent-green mx-auto mb-2" />
              <div className="text-2xl font-bold text-primary-text">
                {data.charges.homeVisit
                  ? formatCurrency(data.charges.homeVisit)
                  : "Not Set"}
              </div>
              <div className="text-sm text-gray-600">Home Visit</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Pricing Guidelines */}
      <Card className="border-l-4 border-l-accent-green bg-gradient-to-r from-amber-50 to-orange-50">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-primary-text mb-3">
            Pricing Guidelines
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
                    Research local market rates to set competitive prices
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div>
                  <h4 className="font-medium text-blue-700">
                    Service Differentiation
                  </h4>
                  <p className="text-sm text-blue-600">
                    Price different services based on time and complexity
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                <div>
                  <h4 className="font-medium text-purple-700">
                    Payment Flexibility
                  </h4>
                  <p className="text-sm text-purple-600">
                    Offer multiple payment options for patient convenience
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
                    Clearly communicate all fees and additional charges
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
