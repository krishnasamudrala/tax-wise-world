import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calculator, Info, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const TaxCalculator = () => {
  const navigate = useNavigate();
  const [selectedRegion, setSelectedRegion] = useState("US");
  const [calculatorData, setCalculatorData] = useState({
    income: "",
    filingStatus: "",
    deductions: "",
    dependents: "",
    age: ""
  });
  const [results, setResults] = useState(null);

  const regions = [
    { code: "US", name: "United States", flag: "🇺🇸" },
    { code: "IN", name: "India", flag: "🇮🇳" }
  ];

  const filingStatusOptions = {
    US: [
      { value: "single", label: "Single" },
      { value: "married", label: "Married Filing Jointly" },
      { value: "married-separate", label: "Married Filing Separately" },
      { value: "head", label: "Head of Household" }
    ],
    IN: [
      { value: "individual", label: "Individual" },
      { value: "huf", label: "Hindu Undivided Family" },
      { value: "senior", label: "Senior Citizen (60-80)" },
      { value: "super-senior", label: "Super Senior Citizen (80+)" }
    ]
  };

  const calculateTax = () => {
    const income = parseFloat(calculatorData.income) || 0;
    let tax = 0;
    let effectiveRate = 0;

    if (selectedRegion === "US") {
      // Simplified US tax calculation
      if (income <= 10275) tax = income * 0.10;
      else if (income <= 41775) tax = 1027.50 + (income - 10275) * 0.12;
      else if (income <= 89450) tax = 4807.50 + (income - 41775) * 0.22;
      else if (income <= 190750) tax = 15213.50 + (income - 89450) * 0.24;
      else if (income <= 364200) tax = 36985.50 + (income - 190750) * 0.32;
      else if (income <= 462500) tax = 92385.50 + (income - 364200) * 0.35;
      else tax = 126855.50 + (income - 462500) * 0.37;
      
      effectiveRate = (tax / income) * 100;
    } else {
      // Simplified India tax calculation
      if (income <= 250000) tax = 0;
      else if (income <= 500000) tax = (income - 250000) * 0.05;
      else if (income <= 1000000) tax = 12500 + (income - 500000) * 0.20;
      else tax = 112500 + (income - 1000000) * 0.30;
      
      effectiveRate = (tax / income) * 100;
    }

    setResults({
      grossIncome: income,
      taxLiability: tax,
      netIncome: income - tax,
      effectiveRate: effectiveRate,
      marginalRate: selectedRegion === "US" ? getMarginalRateUS(income) : getMarginalRateIN(income)
    });
  };

  const getMarginalRateUS = (income) => {
    if (income <= 10275) return 10;
    if (income <= 41775) return 12;
    if (income <= 89450) return 22;
    if (income <= 190750) return 24;
    if (income <= 364200) return 32;
    if (income <= 462500) return 35;
    return 37;
  };

  const getMarginalRateIN = (income) => {
    if (income <= 250000) return 0;
    if (income <= 500000) return 5;
    if (income <= 1000000) return 20;
    return 30;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center py-4">
            <Button variant="ghost" onClick={() => navigate("/dashboard")} className="mr-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <div className="flex items-center space-x-4">
              <Calculator className="h-6 w-6 text-primary" />
              <h1 className="text-2xl font-bold text-foreground">Tax Calculator</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Region Selector */}
        <div className="mb-8">
          <Label className="text-base font-medium mb-4 block">Select Tax Jurisdiction</Label>
          <div className="flex space-x-4">
            {regions.map((region) => (
              <Button
                key={region.code}
                variant={selectedRegion === region.code ? "default" : "outline"}
                onClick={() => setSelectedRegion(region.code)}
                className="flex items-center space-x-2"
              >
                <span>{region.flag}</span>
                <span>{region.name}</span>
              </Button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Calculator Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <span className="text-2xl mr-2">
                  {regions.find(r => r.code === selectedRegion)?.flag}
                </span>
                {selectedRegion === "US" ? "US Tax Calculator" : "India Tax Calculator"}
              </CardTitle>
              <CardDescription>
                Calculate your tax liability for {selectedRegion === "US" ? "2024 tax year" : "FY 2024-25"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Annual Income */}
              <div className="space-y-2">
                <Label htmlFor="income">
                  Annual Income ({selectedRegion === "US" ? "USD" : "INR"})
                </Label>
                <Input
                  id="income"
                  type="number"
                  placeholder={selectedRegion === "US" ? "75,000" : "1,200,000"}
                  value={calculatorData.income}
                  onChange={(e) => setCalculatorData({...calculatorData, income: e.target.value})}
                />
              </div>

              {/* Filing Status */}
              <div className="space-y-2">
                <Label>Filing Status</Label>
                <Select 
                  value={calculatorData.filingStatus}
                  onValueChange={(value) => setCalculatorData({...calculatorData, filingStatus: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select filing status" />
                  </SelectTrigger>
                  <SelectContent>
                    {filingStatusOptions[selectedRegion]?.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Deductions */}
              <div className="space-y-2">
                <Label htmlFor="deductions">
                  {selectedRegion === "US" ? "Standard/Itemized Deductions" : "Deductions under 80C, etc."}
                </Label>
                <Input
                  id="deductions"
                  type="number"
                  placeholder={selectedRegion === "US" ? "13,850" : "150,000"}
                  value={calculatorData.deductions}
                  onChange={(e) => setCalculatorData({...calculatorData, deductions: e.target.value})}
                />
              </div>

              {selectedRegion === "US" && (
                <div className="space-y-2">
                  <Label htmlFor="dependents">Number of Dependents</Label>
                  <Input
                    id="dependents"
                    type="number"
                    placeholder="0"
                    value={calculatorData.dependents}
                    onChange={(e) => setCalculatorData({...calculatorData, dependents: e.target.value})}
                  />
                </div>
              )}

              <Button onClick={calculateTax} className="w-full">
                <Calculator className="h-4 w-4 mr-2" />
                Calculate Tax
              </Button>
            </CardContent>
          </Card>

          {/* Results */}
          <div className="space-y-6">
            {results ? (
              <Card>
                <CardHeader>
                  <CardTitle>Tax Calculation Results</CardTitle>
                  <CardDescription>Based on current tax laws</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Gross Income</p>
                      <p className="text-2xl font-bold">
                        {selectedRegion === "US" ? "$" : "₹"}{results.grossIncome.toLocaleString()}
                      </p>
                    </div>
                    <div className="p-4 bg-destructive/10 rounded-lg">
                      <p className="text-sm text-muted-foreground">Tax Liability</p>
                      <p className="text-2xl font-bold text-destructive">
                        {selectedRegion === "US" ? "$" : "₹"}{results.taxLiability.toLocaleString()}
                      </p>
                    </div>
                    <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg">
                      <p className="text-sm text-muted-foreground">Net Income</p>
                      <p className="text-2xl font-bold text-green-600">
                        {selectedRegion === "US" ? "$" : "₹"}{results.netIncome.toLocaleString()}
                      </p>
                    </div>
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Effective Rate</p>
                      <p className="text-2xl font-bold">{results.effectiveRate.toFixed(1)}%</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                    <div>
                      <p className="font-medium">Marginal Tax Rate</p>
                      <p className="text-sm text-muted-foreground">Your next dollar will be taxed at</p>
                    </div>
                    <Badge variant="secondary" className="text-lg px-3 py-1">
                      {results.marginalRate}%
                    </Badge>
                  </div>

                  <Button 
                    className="w-full" 
                    onClick={() => navigate("/optimization")}
                  >
                    Optimize Tax Savings
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="flex items-center justify-center py-16">
                  <div className="text-center">
                    <Calculator className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">Enter your details to calculate tax</p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Tax Slabs Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Info className="h-5 w-5 mr-2" />
                  Tax Slabs {selectedRegion === "US" ? "2024" : "FY 2024-25"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="rates">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="rates">Tax Rates</TabsTrigger>
                    <TabsTrigger value="deductions">Deductions</TabsTrigger>
                  </TabsList>
                  <TabsContent value="rates" className="space-y-2">
                    {selectedRegion === "US" ? (
                      <div className="text-sm space-y-1">
                        <p>10%: $0 - $10,275</p>
                        <p>12%: $10,276 - $41,775</p>
                        <p>22%: $41,776 - $89,450</p>
                        <p>24%: $89,451 - $190,750</p>
                        <p>32%: $190,751 - $364,200</p>
                        <p>35%: $364,201 - $462,500</p>
                        <p>37%: $462,501+</p>
                      </div>
                    ) : (
                      <div className="text-sm space-y-1">
                        <p>0%: ₹0 - ₹2,50,000</p>
                        <p>5%: ₹2,50,001 - ₹5,00,000</p>
                        <p>20%: ₹5,00,001 - ₹10,00,000</p>
                        <p>30%: ₹10,00,001+</p>
                      </div>
                    )}
                  </TabsContent>
                  <TabsContent value="deductions" className="text-sm space-y-1">
                    {selectedRegion === "US" ? (
                      <div>
                        <p>Standard Deduction: $13,850</p>
                        <p>Child Tax Credit: $2,000</p>
                        <p>401(k) Contribution Limit: $23,000</p>
                      </div>
                    ) : (
                      <div>
                        <p>Section 80C: ₹1,50,000</p>
                        <p>Section 80D: ₹25,000</p>
                        <p>Section 80TTA: ₹10,000</p>
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaxCalculator;