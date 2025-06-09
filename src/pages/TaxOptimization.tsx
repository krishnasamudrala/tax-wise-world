import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { TrendingUp, DollarSign, Lightbulb, Target } from "lucide-react";
import { useNavigate } from "react-router-dom";
import FloatingAIAssistant from "@/components/FloatingAIAssistant";

const TaxOptimization = () => {
  const navigate = useNavigate();
  const [selectedOptimizations, setSelectedOptimizations] = useState<string[]>([]);

  const optimizationStrategies = [
    {
      id: "retirement",
      title: "Maximize Retirement Contributions",
      description: "Contribute to 401(k), IRA, or other retirement accounts",
      potentialSavings: 2450,
      difficulty: "Easy",
      category: "Retirement"
    },
    {
      id: "hsa",
      title: "Health Savings Account (HSA)",
      description: "Triple tax advantage for medical expenses",
      potentialSavings: 980,
      difficulty: "Easy",
      category: "Healthcare"
    },
    {
      id: "charitable",
      title: "Charitable Donations",
      description: "Donate to qualified charities for deductions",
      potentialSavings: 1200,
      difficulty: "Medium",
      category: "Deductions"
    }
  ];

  const toggleOptimization = (id: string) => {
    setSelectedOptimizations(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const totalSavings = optimizationStrategies
    .filter(strategy => selectedOptimizations.includes(strategy.id))
    .reduce((sum, strategy) => sum + strategy.potentialSavings, 0);

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-card border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={() => navigate("/dashboard")}>
                ← Back to Dashboard
              </Button>
              <h1 className="text-2xl font-bold text-foreground">Tax Optimization</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5" />
                  Available Tax Optimization Strategies
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {optimizationStrategies.map((strategy) => (
                  <div key={strategy.id} className="flex items-start space-x-4 p-4 border rounded-lg">
                    <Checkbox 
                      checked={selectedOptimizations.includes(strategy.id)}
                      onCheckedChange={() => toggleOptimization(strategy.id)}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold">{strategy.title}</h4>
                      <p className="text-sm text-muted-foreground">{strategy.description}</p>
                      <div className="flex items-center mt-2">
                        <DollarSign className="h-4 w-4 text-green-600 mr-1" />
                        <span className="text-sm font-semibold text-green-600">
                          Potential Savings: ${strategy.potentialSavings.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Your Optimization Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center p-4 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground">Total Potential Savings</p>
                  <p className="text-3xl font-bold text-green-600">${totalSavings.toLocaleString()}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <FloatingAIAssistant />
    </div>
  );
};

export default TaxOptimization;