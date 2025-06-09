import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  Shield,
  Settings,
  Download,
  Bell,
  CreditCard,
  FileText
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import FloatingAIAssistant from "@/components/FloatingAIAssistant";

const Account = () => {
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
              <h1 className="text-2xl font-bold text-foreground">Account Settings</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Section */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">John Doe</h3>
                    <p className="text-muted-foreground">Tax Professional</p>
                    <Badge variant="secondary">🇺🇸 United States</Badge>
                  </div>
                </div>
                
                <Separator />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Email</p>
                      <p className="text-sm text-muted-foreground">john.doe@email.com</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Phone</p>
                      <p className="text-sm text-muted-foreground">+1 (555) 123-4567</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Location</p>
                      <p className="text-sm text-muted-foreground">New York, NY</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Member Since</p>
                      <p className="text-sm text-muted-foreground">January 2023</p>
                    </div>
                  </div>
                </div>
                
                <Button className="w-full md:w-auto">
                  <Settings className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              </CardContent>
            </Card>

            {/* Tax Documents */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Tax Documents
                </CardTitle>
                <CardDescription>Download your filed tax returns and receipts</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { year: "2023", status: "Filed", date: "March 15, 2024" },
                  { year: "2022", status: "Filed", date: "March 10, 2023" },
                  { year: "2021", status: "Filed", date: "April 05, 2022" }
                ].map((doc) => (
                  <div key={doc.year} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div>
                      <p className="font-medium">Tax Return {doc.year}</p>
                      <p className="text-sm text-muted-foreground">Filed on {doc.date}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={doc.status === "Filed" ? "default" : "secondary"}>
                        {doc.status}
                      </Badge>
                      <Button size="sm" variant="outline">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Side Panel */}
          <div className="space-y-6">
            {/* Account Security */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Security
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Two-Factor Auth</span>
                  <Badge variant="default">Enabled</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Password</span>
                  <Button size="sm" variant="outline">Change</Button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Login Sessions</span>
                  <Button size="sm" variant="outline">Manage</Button>
                </div>
              </CardContent>
            </Card>

            {/* Preferences */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Notifications
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Email Alerts</span>
                  <Badge variant="default">On</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">SMS Alerts</span>
                  <Badge variant="secondary">Off</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Tax Reminders</span>
                  <Badge variant="default">On</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Billing */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Billing
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm font-medium">Current Plan</p>
                  <p className="text-sm text-muted-foreground">Professional Plan</p>
                  <Badge variant="default" className="mt-1">Active</Badge>
                </div>
                <Button size="sm" variant="outline" className="w-full">
                  View Billing History
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      <FloatingAIAssistant />
    </div>
  );
};

export default Account;