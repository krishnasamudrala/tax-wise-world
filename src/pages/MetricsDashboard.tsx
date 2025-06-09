import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  DollarSign,
  TrendingUp,
  Clock,
  Calendar,
  BarChart3,
  PieChart,
  ArrowUp,
  ArrowDown
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import FloatingAIAssistant from "@/components/FloatingAIAssistant";

const MetricsDashboard = () => {
  const navigate = useNavigate();

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
              <h1 className="text-2xl font-bold text-foreground">Tax Metrics Dashboard</h1>
              <Badge variant="secondary" className="text-sm">
                🇺🇸 United States
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Current Tax Year</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$15,420</div>
              <p className="text-xs text-muted-foreground">Estimated tax liability</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Potential Savings</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">$2,340</div>
              <p className="text-xs text-muted-foreground">Through optimizations</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Filing Status</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">85%</div>
              <p className="text-xs text-muted-foreground">Preparation complete</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Income vs Tax Paid Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Income vs Tax Paid
              </CardTitle>
              <CardDescription>Real-time forecasting for current year</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center border rounded-lg bg-muted/30">
                <div className="text-center">
                  <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-sm text-muted-foreground">Chart visualization</p>
                  <p className="text-xs text-muted-foreground mt-2">Income: $95,000 → Tax: $15,420 (16.2%)</p>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="text-center">
                  <p className="text-sm font-medium">Total Income</p>
                  <p className="text-2xl font-bold">$95,000</p>
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium">Tax Paid</p>
                  <p className="text-2xl font-bold">$15,420</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tax Paid Year to Year */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChart className="h-5 w-5" />
                Tax Paid Year to Year
              </CardTitle>
              <CardDescription>Historical tax payment analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center border rounded-lg bg-muted/30">
                <div className="text-center">
                  <PieChart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-sm text-muted-foreground">Year-over-year comparison</p>
                </div>
              </div>
              <div className="mt-4 space-y-2">
                {[
                  { year: "2023", amount: "$15,420", change: "+8.5%", trend: "up" },
                  { year: "2022", amount: "$14,200", change: "+12.3%", trend: "up" },
                  { year: "2021", amount: "$12,650", change: "-3.2%", trend: "down" }
                ].map((item) => (
                  <div key={item.year} className="flex items-center justify-between">
                    <span className="text-sm font-medium">{item.year}</span>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{item.amount}</span>
                      <div className={`flex items-center gap-1 text-xs ${item.trend === 'up' ? 'text-red-600' : 'text-green-600'}`}>
                        {item.trend === 'up' ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
                        {item.change}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Tax Saved Year to Year */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Tax Savings Year to Year
              </CardTitle>
              <CardDescription>Optimization impact over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center border rounded-lg bg-muted/30">
                <div className="text-center">
                  <TrendingUp className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-sm text-muted-foreground">Tax savings trend analysis</p>
                </div>
              </div>
              <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
                {[
                  { year: "2023", saved: "$2,340", strategy: "401k + HSA", efficiency: "95%" },
                  { year: "2022", saved: "$1,890", strategy: "Deductions", efficiency: "87%" },
                  { year: "2021", saved: "$1,650", strategy: "Credits", efficiency: "82%" },
                  { year: "2020", saved: "$980", strategy: "Basic", efficiency: "65%" }
                ].map((item) => (
                  <div key={item.year} className="text-center p-4 bg-muted/50 rounded-lg">
                    <p className="text-sm font-medium">{item.year}</p>
                    <p className="text-xl font-bold text-green-600">{item.saved}</p>
                    <p className="text-xs text-muted-foreground">{item.strategy}</p>
                    <Badge variant="secondary" className="mt-1 text-xs">{item.efficiency}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Button onClick={() => navigate("/optimization")} className="w-full">
                  Optimize Taxes
                </Button>
                <Button onClick={() => navigate("/filing")} variant="outline" className="w-full">
                  Start Filing
                </Button>
                <Button onClick={() => navigate("/calculator")} variant="outline" className="w-full">
                  Tax Calculator
                </Button>
                <Button onClick={() => navigate("/chat")} variant="outline" className="w-full">
                  Ask AI Assistant
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <FloatingAIAssistant />
    </div>
  );
};

export default MetricsDashboard;