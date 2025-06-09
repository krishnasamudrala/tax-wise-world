import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Calculator, 
  FileText, 
  TrendingUp, 
  BookOpen, 
  MessageCircle, 
  Settings,
  Bell,
  User,
  DollarSign,
  Clock,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [selectedRegion] = useState("US"); // This would come from login context

  const quickActions = [
    {
      title: "Tax Calculator",
      description: "Calculate your tax liability",
      icon: Calculator,
      route: "/calculator",
      color: "bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400"
    },
    {
      title: "File ITR/GST",
      description: "Start your tax filing",
      icon: FileText,
      route: "/filing",
      color: "bg-green-50 text-green-600 dark:bg-green-950 dark:text-green-400"
    },
    {
      title: "Tax Optimization",
      description: "Find savings opportunities",
      icon: TrendingUp,
      route: "/optimization",
      color: "bg-purple-50 text-purple-600 dark:bg-purple-950 dark:text-purple-400"
    },
    {
      title: "Tax Updates",
      description: "Latest news & articles",
      icon: BookOpen,
      route: "/updates",
      color: "bg-orange-50 text-orange-600 dark:bg-orange-950 dark:text-orange-400"
    }
  ];

  const recentActivity = [
    { action: "2023 Tax Return Filed", status: "completed", date: "March 15, 2024" },
    { action: "Q4 GST Return", status: "pending", date: "Due April 30, 2024" },
    { action: "Tax Optimization Review", status: "scheduled", date: "April 5, 2024" }
  ];

  const taxAlerts = [
    { title: "Filing Deadline Approaching", message: "Q1 GST return due in 7 days", type: "warning" },
    { title: "New Tax Benefits Available", message: "Check new deductions for 2024", type: "info" }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-foreground">TaxWise Global</h1>
              <Badge variant="secondary" className="text-sm">
                🇺🇸 United States
              </Badge>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Settings className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">Welcome back, John!</h2>
          <p className="text-muted-foreground">Here's your tax overview for the United States</p>
        </div>

        {/* Tax Summary Cards */}
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <div className="lg:col-span-2">
            <h3 className="text-xl font-semibold mb-4">Quick Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {quickActions.map((action) => (
                <Card key={action.title} className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className={`p-3 rounded-lg ${action.color}`}>
                        <action.icon className="h-6 w-6" />
                      </div>
                      <div>
                        <h4 className="font-semibold">{action.title}</h4>
                        <p className="text-sm text-muted-foreground">{action.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your latest tax-related actions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        {activity.status === "completed" && <CheckCircle className="h-5 w-5 text-green-500" />}
                        {activity.status === "pending" && <Clock className="h-5 w-5 text-yellow-500" />}
                        {activity.status === "scheduled" && <AlertCircle className="h-5 w-5 text-blue-500" />}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{activity.action}</p>
                        <p className="text-sm text-muted-foreground">{activity.date}</p>
                      </div>
                      <Badge variant={activity.status === "completed" ? "default" : "secondary"}>
                        {activity.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Tax Alerts */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Tax Alerts</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {taxAlerts.map((alert, index) => (
                  <div key={index} className="p-3 rounded-lg bg-muted">
                    <div className="flex items-start space-x-2">
                      <AlertCircle className={`h-4 w-4 mt-0.5 ${alert.type === 'warning' ? 'text-yellow-500' : 'text-blue-500'}`} />
                      <div>
                        <p className="font-medium text-sm">{alert.title}</p>
                        <p className="text-xs text-muted-foreground">{alert.message}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* AI Assistant */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Tax Q&A Assistant</CardTitle>
                <CardDescription>Get instant help with tax questions</CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  className="w-full" 
                  onClick={() => navigate("/chat")}
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Start Chat
                </Button>
              </CardContent>
            </Card>

            {/* Region Switcher */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Tax Jurisdictions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Badge variant="default" className="w-full justify-start">
                    🇺🇸 United States (Active)
                  </Badge>
                  <Badge variant="outline" className="w-full justify-start">
                    🇮🇳 India
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;