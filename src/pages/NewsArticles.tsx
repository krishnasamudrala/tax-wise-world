import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Calendar, Clock, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import FloatingAIAssistant from "@/components/FloatingAIAssistant";

const NewsArticles = () => {
  const navigate = useNavigate();

  const articles = [
    {
      id: 1,
      title: "2024 Tax Changes: What You Need to Know",
      description: "Key updates to tax laws and how they affect your filing for the 2024 tax year",
      category: "Tax Laws",
      date: "March 15, 2024",
      readTime: "5 min read",
      views: "12.5k"
    },
    {
      id: 2,
      title: "Maximize Your Retirement Savings in 2024",
      description: "New contribution limits and strategies for 401(k), IRA, and other retirement accounts",
      category: "Retirement",
      date: "March 12, 2024",
      readTime: "7 min read",
      views: "8.9k"
    },
    {
      id: 3,
      title: "Small Business Tax Deductions Guide",
      description: "Complete guide to legitimate business expense deductions for small business owners",
      category: "Business",
      date: "March 10, 2024",
      readTime: "10 min read",
      views: "15.2k"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-card border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={() => navigate("/dashboard")}>
                ← Back to Dashboard
              </Button>
              <h1 className="text-2xl font-bold text-foreground">Tax News & Updates</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <Card key={article.id} className="hover:shadow-lg transition-shadow cursor-pointer">
              <div className="h-48 bg-muted flex items-center justify-center">
                <BookOpen className="h-8 w-8 text-muted-foreground" />
              </div>
              <CardHeader>
                <Badge variant="outline" className="w-fit">{article.category}</Badge>
                <CardTitle className="text-lg">{article.title}</CardTitle>
                <CardDescription>{article.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {article.date}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {article.readTime}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <FloatingAIAssistant />
    </div>
  );
};

export default NewsArticles;