import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Globe, Calculator, FileText, TrendingUp, MessageCircle, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Calculator,
      title: "Tax Calculator",
      description: "Calculate taxes for any jurisdiction"
    },
    {
      icon: FileText,
      title: "Smart Filing",
      description: "Automated ITR & GST filing"
    },
    {
      icon: TrendingUp,
      title: "Tax Optimization",
      description: "AI-powered savings suggestions"
    },
    {
      icon: MessageCircle,
      title: "Expert Assistant",
      description: "24/7 AI tax consultant"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="flex items-center justify-center mb-8">
              <Globe className="h-12 w-12 text-primary mr-4" />
              <h1 className="text-5xl font-bold text-foreground">TaxWise Global</h1>
            </div>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              The world's most intelligent tax platform. File taxes, optimize savings, 
              and get expert guidance across all major jurisdictions.
            </p>
            <div className="flex justify-center space-x-4">
              <Button size="lg" onClick={() => navigate("/login")}>
                Get Started
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
              <Button variant="outline" size="lg" onClick={() => navigate("/calculator")}>
                Try Calculator
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Everything you need for global tax compliance
            </h2>
            <p className="text-lg text-muted-foreground">
              Powered by AI, trusted by professionals worldwide
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-lg w-fit">
                    <feature.icon className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Global Coverage */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Global Tax Expertise
            </h2>
            <p className="text-lg text-muted-foreground">
              Supporting major tax jurisdictions worldwide
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { flag: "🇺🇸", country: "United States", coverage: "Federal & State" },
              { flag: "🇮🇳", country: "India", coverage: "ITR & GST" },
              { flag: "🇬🇧", country: "United Kingdom", coverage: "HMRC Filing" },
              { flag: "🇨🇦", country: "Canada", coverage: "CRA Compliance" }
            ].map((region, index) => (
              <Card key={index} className="text-center hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="text-4xl mb-4">{region.flag}</div>
                  <h3 className="font-semibold text-lg mb-2">{region.country}</h3>
                  <p className="text-sm text-muted-foreground">{region.coverage}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="py-16 bg-primary">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-primary-foreground mb-4">
            Ready to simplify your taxes?
          </h2>
          <p className="text-xl text-primary-foreground/80 mb-8">
            Join thousands of users who trust TaxWise Global for their tax needs
          </p>
          <Button size="lg" variant="secondary" onClick={() => navigate("/login")}>
            Start Free Trial
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
