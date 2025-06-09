import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRight, Globe } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [step, setStep] = useState(1);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [mobile, setMobile] = useState("");
  const [identifier, setIdentifier] = useState("");
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const countries = [
    { code: "US", name: "United States", flag: "🇺🇸", identifier: "SSN" },
    { code: "IN", name: "India", flag: "🇮🇳", identifier: "PAN" },
    { code: "UK", name: "United Kingdom", flag: "🇬🇧", identifier: "UTR" },
    { code: "CA", name: "Canada", flag: "🇨🇦", identifier: "SIN" },
  ];

  const handleCountrySelect = (countryCode: string) => {
    setSelectedCountry(countryCode);
    setStep(2);
  };

  const handleCredentialsSubmit = () => {
    setStep(3);
  };

  const handleOtpSubmit = () => {
    navigate("/dashboard");
  };

  const selectedCountryData = countries.find(c => c.code === selectedCountry);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Globe className="h-8 w-8 text-primary mr-2" />
            <h1 className="text-2xl font-bold text-foreground">TaxWise Global</h1>
          </div>
          <p className="text-muted-foreground">Your global tax filing companion</p>
        </div>

        {/* Step 1: Country Selection */}
        {step === 1 && (
          <Card>
            <CardHeader>
              <CardTitle>Select Your Country</CardTitle>
              <CardDescription>Choose your tax jurisdiction to get started</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {countries.map((country) => (
                <Button
                  key={country.code}
                  variant="outline"
                  className="w-full justify-start h-auto p-4"
                  onClick={() => handleCountrySelect(country.code)}
                >
                  <span className="text-2xl mr-3">{country.flag}</span>
                  <div className="text-left">
                    <div className="font-medium">{country.name}</div>
                    <div className="text-sm text-muted-foreground">Tax ID: {country.identifier}</div>
                  </div>
                  <ArrowRight className="h-4 w-4 ml-auto" />
                </Button>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Step 2: Mobile & Identifier */}
        {step === 2 && selectedCountryData && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <span className="text-2xl mr-2">{selectedCountryData.flag}</span>
                {selectedCountryData.name}
              </CardTitle>
              <CardDescription>Enter your mobile number and tax identifier</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="mobile">Mobile Number</Label>
                <Input
                  id="mobile"
                  type="tel"
                  placeholder="+1 (555) 123-4567"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="identifier">{selectedCountryData.identifier}</Label>
                <Input
                  id="identifier"
                  placeholder={`Enter your ${selectedCountryData.identifier}`}
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                />
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                  Back
                </Button>
                <Button onClick={handleCredentialsSubmit} className="flex-1">
                  Send OTP
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: OTP Verification */}
        {step === 3 && (
          <Card>
            <CardHeader>
              <CardTitle>Verify OTP</CardTitle>
              <CardDescription>
                Enter the 6-digit code sent to {mobile}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="otp">OTP Code</Label>
                <Input
                  id="otp"
                  placeholder="123456"
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="text-center text-lg tracking-widest"
                />
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" onClick={() => setStep(2)} className="flex-1">
                  Back
                </Button>
                <Button onClick={handleOtpSubmit} className="flex-1">
                  Verify & Continue
                </Button>
              </div>
              <Button variant="link" className="w-full">
                Resend OTP
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Login;