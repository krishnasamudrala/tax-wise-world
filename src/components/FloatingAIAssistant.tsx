import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const FloatingAIAssistant = () => {
  const navigate = useNavigate();

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Button
        size="lg"
        className="rounded-full h-14 w-14 shadow-lg hover:shadow-xl transition-all duration-200 animate-pulse"
        onClick={() => navigate("/chat")}
        title="Ask AI Assistant"
      >
        <MessageCircle className="h-6 w-6" />
        <span className="sr-only">Ask AI Assistant</span>
      </Button>
    </div>
  );
};

export default FloatingAIAssistant;