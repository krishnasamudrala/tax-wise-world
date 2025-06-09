import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  MessageCircle, 
  Send, 
  Bot, 
  User, 
  ArrowLeft, 
  FileText, 
  Calculator,
  TrendingUp,
  Clock
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  suggestions?: string[];
}

const TaxChatBot = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: 'Hello! I\'m your AI Tax Assistant. I can help you with tax questions, calculations, filing guidance, and optimization strategies. What would you like to know?',
      timestamp: new Date(),
      suggestions: [
        'Calculate my tax liability',
        'What deductions can I claim?',
        'When is the filing deadline?',
        'Help me optimize my taxes'
      ]
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const quickActions = [
    {
      title: "Tax Calculator",
      icon: Calculator,
      action: () => navigate("/calculator")
    },
    {
      title: "Start Filing",
      icon: FileText,
      action: () => navigate("/filing")
    },
    {
      title: "Tax Optimization",
      icon: TrendingUp,
      action: () => navigate("/optimization")
    }
  ];

  const generateBotResponse = (userMessage: string): Message => {
    const lowerMessage = userMessage.toLowerCase();
    let response = '';
    let suggestions: string[] = [];

    if (lowerMessage.includes('calculate') || lowerMessage.includes('tax') && lowerMessage.includes('liability')) {
      response = 'I can help you calculate your tax liability! You\'ll need your annual income, filing status, and deductions. Would you like me to redirect you to our Tax Calculator, or would you prefer to provide the details here?';
      suggestions = ['Open Tax Calculator', 'Provide details here', 'What information do I need?'];
    } else if (lowerMessage.includes('deduction') || lowerMessage.includes('claim')) {
      response = 'Common deductions include:\n\n🏠 Mortgage interest\n💼 Business expenses\n🎓 Education expenses\n💰 Retirement contributions\n🏥 Medical expenses\n\nWhich category interests you most?';
      suggestions = ['Mortgage interest details', 'Business expense guide', 'Education deductions', 'Retirement contributions'];
    } else if (lowerMessage.includes('deadline') || lowerMessage.includes('due')) {
      response = 'Tax filing deadlines vary by region:\n\n🇺🇸 US: April 15, 2024\n🇮🇳 India: July 31, 2024\n\nYou can request extensions in most cases. Would you like help with filing or extension procedures?';
      suggestions = ['How to file extension', 'Filing requirements', 'Late filing penalties'];
    } else if (lowerMessage.includes('optimize') || lowerMessage.includes('save')) {
      response = 'Great question! Tax optimization strategies include:\n\n💡 Maximizing deductions\n📈 Strategic investment timing\n🏦 Retirement account contributions\n🎯 Tax-loss harvesting\n\nI can analyze your situation for personalized recommendations. Share your income range?';
      suggestions = ['$50K-$100K income', '$100K-$200K income', '$200K+ income', 'Business owner'];
    } else {
      response = 'I understand you\'re asking about tax matters. Could you be more specific? I can help with calculations, deductions, filing procedures, deadlines, or optimization strategies.';
      suggestions = ['Tax calculations', 'Available deductions', 'Filing deadlines', 'Optimization tips'];
    }

    return {
      id: Date.now().toString(),
      type: 'bot',
      content: response,
      timestamp: new Date(),
      suggestions
    };
  };

  const handleSendMessage = async (message?: string) => {
    const messageToSend = message || inputMessage.trim();
    if (!messageToSend) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: messageToSend,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const botResponse = generateBotResponse(messageToSend);
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="bg-card border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center">
              <Button variant="ghost" onClick={() => navigate("/dashboard")} className="mr-4">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-primary rounded-lg">
                  <Bot className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-foreground">Tax Q&A Assistant</h1>
                  <p className="text-sm text-muted-foreground">Powered by AI • Always online</p>
                </div>
              </div>
            </div>
            <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              Online
            </Badge>
          </div>
        </div>
      </div>

      <div className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-full">
          {/* Chat Area */}
          <div className="lg:col-span-3 flex flex-col">
            <Card className="flex-1 flex flex-col">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center">
                  <MessageCircle className="h-5 w-5 mr-2" />
                  Chat with Tax Assistant
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col p-0">
                <ScrollArea className="flex-1 px-6">
                  <div className="space-y-4 pb-4">
                    {messages.map((message) => (
                      <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`flex max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'} items-start space-x-2`}>
                          <div className={`p-2 rounded-full ${message.type === 'user' ? 'bg-primary ml-2' : 'bg-muted mr-2'}`}>
                            {message.type === 'user' ? (
                              <User className="h-4 w-4 text-primary-foreground" />
                            ) : (
                              <Bot className="h-4 w-4 text-muted-foreground" />
                            )}
                          </div>
                          <div className={`rounded-lg px-4 py-2 ${
                            message.type === 'user' 
                              ? 'bg-primary text-primary-foreground' 
                              : 'bg-muted'
                          }`}>
                            <p className="whitespace-pre-wrap">{message.content}</p>
                            <p className="text-xs opacity-70 mt-1">
                              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}

                    {/* Suggestions */}
                    {messages.length > 0 && messages[messages.length - 1].type === 'bot' && messages[messages.length - 1].suggestions && (
                      <div className="flex justify-start">
                        <div className="max-w-[80%] space-y-2">
                          <p className="text-xs text-muted-foreground px-2">Quick replies:</p>
                          <div className="flex flex-wrap gap-2">
                            {messages[messages.length - 1].suggestions?.map((suggestion, index) => (
                              <Button
                                key={index}
                                variant="outline"
                                size="sm"
                                onClick={() => handleSendMessage(suggestion)}
                                className="text-xs"
                              >
                                {suggestion}
                              </Button>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {isTyping && (
                      <div className="flex justify-start">
                        <div className="flex items-start space-x-2">
                          <div className="p-2 rounded-full bg-muted">
                            <Bot className="h-4 w-4 text-muted-foreground" />
                          </div>
                          <div className="bg-muted rounded-lg px-4 py-2">
                            <div className="flex space-x-1">
                              <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                              <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                              <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                </ScrollArea>

                {/* Input Area */}
                <div className="border-t p-4">
                  <div className="flex space-x-2">
                    <Input
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Ask me about taxes, deductions, filing, or optimization..."
                      className="flex-1"
                    />
                    <Button 
                      onClick={() => handleSendMessage()} 
                      disabled={!inputMessage.trim() || isTyping}
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {quickActions.map((action, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full justify-start"
                    onClick={action.action}
                  >
                    <action.icon className="h-4 w-4 mr-2" />
                    {action.title}
                  </Button>
                ))}
              </CardContent>
            </Card>

            {/* Common Topics */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Popular Topics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {[
                  'Tax filing deadlines',
                  'Standard vs itemized deductions',
                  'Retirement account contributions',
                  'Capital gains tax',
                  'Business expense deductions'
                ].map((topic, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start text-left h-auto py-2"
                    onClick={() => handleSendMessage(`Tell me about ${topic}`)}
                  >
                    <div className="text-sm">{topic}</div>
                  </Button>
                ))}
              </CardContent>
            </Card>

            {/* Status */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Clock className="h-4 w-4 mr-2" />
                  Session Info
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Messages:</span>
                  <span>{messages.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Started:</span>
                  <span>{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Region:</span>
                  <Badge variant="secondary">🇺🇸 US</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaxChatBot;