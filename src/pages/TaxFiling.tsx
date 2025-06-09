import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  FileText, 
  Upload, 
  CheckCircle, 
  Clock, 
  AlertTriangle,
  Globe,
  ArrowRight,
  Calendar,
  DollarSign
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import FloatingAIAssistant from "@/components/FloatingAIAssistant";

const TaxFiling = () => {
  const navigate = useNavigate();
  const [selectedCountry, setSelectedCountry] = useState("US");

  const countries = [
    { code: "US", name: "United States", flag: "🇺🇸", filingDeadline: "April 15, 2024", taxType: "Federal & State" },
    { code: "IN", name: "India", flag: "🇮🇳", filingDeadline: "July 31, 2024", taxType: "ITR & GST" },
    { code: "GB", name: "United Kingdom", flag: "🇬🇧", filingDeadline: "January 31, 2024", taxType: "HMRC" },
    { code: "CA", name: "Canada", flag: "🇨🇦", filingDeadline: "April 30, 2024", taxType: "CRA" }
  ];

  const currentCountry = countries.find(c => c.code === selectedCountry);

  const filingSteps = {
    US: [
      { step: 1, title: "Personal Information", status: "completed", description: "Basic details and SSN" },
      { step: 2, title: "Income Documents", status: "completed", description: "W-2, 1099s, etc." },
      { step: 3, title: "Deductions & Credits", status: "in-progress", description: "Itemized or standard deductions" },
      { step: 4, title: "Review & Sign", status: "pending", description: "Final review before submission" },
      { step: 5, title: "E-File", status: "pending", description: "Submit to IRS" }
    ],
    IN: [
      { step: 1, title: "Personal Details", status: "completed", description: "PAN, Aadhar verification" },
      { step: 2, title: "Income Sources", status: "completed", description: "Salary, business, capital gains" },
      { step: 3, title: "Tax Computation", status: "in-progress", description: "Calculate tax liability" },
      { step: 4, title: "Tax Payments", status: "pending", description: "TDS, advance tax" },
      { step: 5, title: "ITR Submission", status: "pending", description: "File with Income Tax Dept" }
    ]
  };

  const globalComparison = [
    { aspect: "Filing Deadline", US: "April 15", IN: "July 31", GB: "January 31", CA: "April 30" },
    { aspect: "Tax Year", US: "Calendar Year", IN: "Financial Year", GB: "Tax Year", CA: "Calendar Year" },
    { aspect: "Standard Deduction", US: "$13,850", IN: "₹50,000", GB: "£12,570", CA: "CAD 15,000" },
    { aspect: "Top Tax Rate", US: "37%", IN: "30%", GB: "45%", CA: "33%" },
    { aspect: "Digital Filing", US: "Mandatory", IN: "Mandatory", GB: "Online Only", CA: "Encouraged" }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={() => navigate("/dashboard")}>
                ← Back to Dashboard
              </Button>
              <h1 className="text-2xl font-bold text-foreground">Tax Filing</h1>
              <Badge variant="secondary" className="text-sm">
                {currentCountry?.flag} {currentCountry?.name}
              </Badge>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">Deadline: {currentCountry?.filingDeadline}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="filing" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="filing">Current Filing</TabsTrigger>
            <TabsTrigger value="comparison">Global Comparison</TabsTrigger>
            <TabsTrigger value="history">Filing History</TabsTrigger>
          </TabsList>

          <TabsContent value="filing" className="space-y-6">
            {/* Country Selector */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  Select Tax Jurisdiction
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {countries.map((country) => (
                    <Card 
                      key={country.code} 
                      className={`cursor-pointer transition-all ${selectedCountry === country.code ? 'ring-2 ring-primary' : 'hover:shadow-md'}`}
                      onClick={() => setSelectedCountry(country.code)}
                    >
                      <CardContent className="p-4 text-center">
                        <div className="text-2xl mb-2">{country.flag}</div>
                        <h3 className="font-semibold text-sm">{country.name}</h3>
                        <p className="text-xs text-muted-foreground">{country.taxType}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Filing Progress */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Filing Progress - {currentCountry?.name}</CardTitle>
                    <CardDescription>Complete your tax return step by step</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Overall Progress</span>
                      <span className="text-sm text-muted-foreground">40% Complete</span>
                    </div>
                    <Progress value={40} className="w-full" />
                    
                    <div className="space-y-4">
                      {filingSteps[selectedCountry as keyof typeof filingSteps]?.map((step) => (
                        <div key={step.step} className="flex items-center space-x-4 p-4 rounded-lg border">
                          <div className="flex-shrink-0">
                            {step.status === "completed" && <CheckCircle className="h-6 w-6 text-green-500" />}
                            {step.status === "in-progress" && <Clock className="h-6 w-6 text-yellow-500" />}
                            {step.status === "pending" && <div className="h-6 w-6 rounded-full border-2 border-muted-foreground" />}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold">{step.title}</h4>
                            <p className="text-sm text-muted-foreground">{step.description}</p>
                          </div>
                          <Badge variant={step.status === "completed" ? "default" : step.status === "in-progress" ? "secondary" : "outline"}>
                            {step.status}
                          </Badge>
                        </div>
                      ))}
                    </div>

                    <Button className="w-full">
                      Continue Filing
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Quick Stats */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Filing Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Tax Year</span>
                      <span className="font-semibold">2023</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Filing Status</span>
                      <span className="font-semibold">Single</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Estimated Refund</span>
                      <span className="font-semibold text-green-600">$1,240</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Upload Documents</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button variant="outline" className="w-full">
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Tax Documents
                    </Button>
                    <div className="text-xs text-muted-foreground">
                      Supported: W-2, 1099, receipts, etc.
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-yellow-500" />
                      Important Reminders
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <p className="text-sm">• Deadline: {currentCountry?.filingDeadline}</p>
                    <p className="text-sm">• Don't forget quarterly payments</p>
                    <p className="text-sm">• Keep digital copies of all documents</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="comparison" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Global Tax Filing Comparison</CardTitle>
                <CardDescription>Compare tax filing requirements across different countries</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">Aspect</th>
                        <th className="text-center p-2">🇺🇸 USA</th>
                        <th className="text-center p-2">🇮🇳 India</th>
                        <th className="text-center p-2">🇬🇧 UK</th>
                        <th className="text-center p-2">🇨🇦 Canada</th>
                      </tr>
                    </thead>
                    <tbody>
                      {globalComparison.map((row, index) => (
                        <tr key={index} className="border-b">
                          <td className="p-2 font-medium">{row.aspect}</td>
                          <td className="p-2 text-center">{row.US}</td>
                          <td className="p-2 text-center">{row.IN}</td>
                          <td className="p-2 text-center">{row.GB}</td>
                          <td className="p-2 text-center">{row.CA}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Filing History</CardTitle>
                <CardDescription>Your past tax filings across all jurisdictions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { year: "2023", country: "🇺🇸 USA", status: "Filed", refund: "$1,240", date: "March 15, 2024" },
                    { year: "2022", country: "🇺🇸 USA", status: "Filed", refund: "$980", date: "March 10, 2023" },
                    { year: "2023", country: "🇮🇳 India", status: "Filed", refund: "₹15,000", date: "July 20, 2023" }
                  ].map((filing, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div>
                          <p className="font-semibold">{filing.year} Tax Return</p>
                          <p className="text-sm text-muted-foreground">{filing.country}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-green-600">{filing.refund}</p>
                        <p className="text-sm text-muted-foreground">{filing.date}</p>
                      </div>
                      <Badge variant="default">{filing.status}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <FloatingAIAssistant />
    </div>
  );
};

export default TaxFiling;