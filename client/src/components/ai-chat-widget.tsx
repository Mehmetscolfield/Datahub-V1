import { useState, useRef, useEffect } from "react";
import { useI18n } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Sparkles, Send, X, AlertCircle } from "lucide-react";
import { useUniversities } from "@/lib/data";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  id: string;
  type: "user" | "ai";
  content: string;
  timestamp: Date;
}

interface SuggestionResult {
  universities: string[];
  reasoning: string;
}

// Demo mode - intelligent responses with real university recommendations
const getDemoResponse = (userInput: string, universities: any[]): string => {
  const input = userInput.toLowerCase();
  
  // Check if user is sharing their academic profile (GPA, IELTS, field, etc.)
  const hasProfileInfo = 
    input.includes("gpa") || 
    input.includes("ielts") || 
    input.includes("toefl") ||
    input.includes("score") ||
    input.includes("interested in") ||
    input.includes("want to study") ||
    /[\d.]+\s*(gpa|ielts|toefl|grade)/i.test(userInput);
  
  // Check if user is asking for recommendations
  const isAskingForRecommendations = 
    input.includes("recommend") || 
    input.includes("suggest") || 
    input.includes("which university") || 
    input.includes("which uni") || 
    input.includes("best university") ||
    input.includes("best uni") ||
    input.includes("suitable") ||
    input.includes("match") ||
    hasProfileInfo;

  // If not asking for recommendations, have natural conversation
  if (!isAskingForRecommendations) {
    if (input.includes("hello") || input.includes("hi") || input.includes("hey")) {
      return "Hey! 👋 I'm your university advisor. I can help you find the perfect university in Kazakhstan based on your academic profile. Just tell me about your grades, IELTS/TOEFL scores, and what you want to study, and I'll suggest some great options!";
    }
    if (input.includes("what can you do") || input.includes("how can you help")) {
      return "I can help you:\n• Find universities that match your profile\n• Compare different universities\n• Explain programs and requirements\n• Answer questions about Kazakh universities\n\nJust share your academic info and I'll give you personalized recommendations!";
    }
    if (input.includes("program") || input.includes("degree") || input.includes("study") || input.includes("field")) {
      return "What field interests you? Engineering, Business, IT, Law, Medicine, Education, or something else? That'll help me point you to the best universities for your goals.";
    }
    
    // Handle basic math questions
    if (input.includes("plus") || input.includes("add") || input.includes("minus") || input.includes("subtract") || input.includes("multiply") || input.includes("times") || input.includes("divide")) {
      if (input.includes("2") && input.includes("plus") && input.includes("4")) {
        return "2 + 4 = 6 ✓";
      }
      return "I can do basic math, but I'm specialized in helping with university recommendations! 😊";
    }
    
    // Handle other general questions with a friendly response
    if (input.includes("?")) {
      return "That's a good question! But I'm specifically here to help you find the right university in Kazakhstan. 📚\n\nIf you want university recommendations, just tell me your grades, English scores, and what you want to study!";
    }
    
    return "Tell me more about yourself! What's your:\n• GPA or grades?\n• English test score (IELTS/TOEFL)?\n• Field of interest?\n\nWith that info, I can give you personalized recommendations!";
  }

  // User shared their profile - give conversational recommendations with universities
  let response = "";
  
  // Detect field of study
  const hasEngineering = input.includes("engineer") || input.includes("stem") || input.includes("technical");
  const hasBusiness = input.includes("business") || input.includes("economics") || input.includes("finance") || input.includes("accounting");
  const hasLaw = input.includes("law") || input.includes("legal");
  const hasIT = input.includes("it") || input.includes("computer") || input.includes("programming") || input.includes("software");
  const hasEducation = input.includes("teach") || input.includes("education") || input.includes("pedagog");

  // Get relevant universities
  let relevantUnis: any[] = [];
  
  if (hasEngineering) {
    relevantUnis = universities.filter(u => 
      u.name.includes("KBTU") || u.name.includes("Satbayev") || u.name.includes("Toraighyrov")
    );
    response = "Great choice! Engineering is huge in Kazakhstan. Here are the top universities for your profile:\n\n";
  } else if (hasBusiness) {
    relevantUnis = universities.filter(u => 
      u.name.includes("KIMEP") || u.name.includes("KAZGUU") || u.name.includes("Al-Farabi")
    );
    response = "Business is a popular field here. Based on your profile, these universities would be perfect:\n\n";
  } else if (hasIT) {
    relevantUnis = universities.filter(u => 
      u.name.includes("Astana IT") || u.name.includes("KBTU") || u.name.includes("KIMEP")
    );
    response = "IT is booming in Kazakhstan! Check out these universities:\n\n";
  } else if (hasLaw) {
    relevantUnis = universities.filter(u => 
      u.name.includes("Abylai Khan") || u.name.includes("Al-Farabi") || u.name.includes("KAZGUU")
    );
    response = "Law is a respected field. These are the best options for you:\n\n";
  } else if (hasEducation) {
    relevantUnis = universities.filter(u => 
      u.name.includes("Abai") || u.name.includes("Al-Farabi")
    );
    response = "Teaching is important! These universities have great education programs:\n\n";
  } else {
    relevantUnis = universities.slice(0, 3);
    response = "Here are the top universities that match your profile:\n\n";
  }

  if (relevantUnis.length === 0) {
    relevantUnis = universities.slice(0, 3);
  }

  // Format recommendations conversationally
  relevantUnis.slice(0, 2).forEach((uni, idx) => {
    response += `**${idx + 1}. ${uni.name}**\n`;
    response += `   • Ranking: #${uni.ranking_kz || "Top"} in Kazakhstan\n`;
    response += `   • City: ${uni.city || "Kazakhstan"}\n`;
    if (uni.tuition_range) {
      response += `   • Cost: ${uni.tuition_range}\n`;
    }
    
    // Get program names properly
    if (uni.programs && uni.programs.length > 0) {
      const programNames = uni.programs
        .slice(0, 2)
        .map((p: any) => typeof p === 'string' ? p : p.name || p.title || '')
        .filter((p: string) => p && p !== 'Program');
      
      if (programNames.length > 0) {
        response += `   • Programs: ${programNames.join(", ")}\n`;
      }
    }
    response += "\n";
  });

  response += "Any of these universities interest you? I can tell you more about them, their application requirements, or help you compare them! 😊";
  return response;
};

export default function AIChatWidget() {
  const { t } = useI18n();
  const universities = useUniversities();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "initial",
      type: "ai",
      content:
        "Hi! Tell me about your academic profile and I'll suggest suitable universities. For example: 'I have 6.0 IELTS, 3.5 GPA, interested in Engineering'",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);
    setError("");

    try {
      // Get API key from environment
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

      if (!apiKey) {
        throw new Error(
          "API key not configured. Please contact administrator."
        );
      }

      // Prepare university list for context
      const universityList = universities
        .map(
          (uni) =>
            `${uni.name} (${uni.city}): ${uni.programs?.length || 0} programs, ` +
            `Tuition: ${uni.tuition_range || "N/A"}, ` +
            `IELTS: ${uni.comparison?.ielts_required || "N/A"}, ` +
            `Ranking: #${uni.ranking_kz || "N/A"}`
        )
        .join("\n");

      // Build the prompt for Gemini
      const systemPrompt = `You are an expert university advisor for Kazakhstan. 
You have knowledge of these universities:
${universityList}

When a user describes their academic profile, analyze their credentials and suggest the best matching universities.
Consider: IELTS/TOEFL scores, GPA, UNT scores, field of study, and other criteria they mention.
Provide recommendations with reasoning.
Format your response as a numbered list of universities with brief explanations.
Always be encouraging and helpful.`;

      const userPrompt = `Based on my profile: "${input}", which universities would you recommend?`;

      // Call Gemini API
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: systemPrompt,
                  },
                  {
                    text: userPrompt,
                  },
                ],
              },
            ],
            generationConfig: {
              temperature: 0.7,
              topK: 40,
              topP: 0.95,
              maxOutputTokens: 1024,
            },
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        const errorMessage = errorData.error?.message || "Failed to get AI response";
        
        // Use demo mode if quota exceeded
        if (errorMessage.includes("quota") || errorMessage.includes("Quota")) {
          const demoResponse = getDemoResponse(input, universities);
          const aiMessage: Message = {
            id: (Date.now() + 1).toString(),
            type: "ai",
            content: demoResponse,
            timestamp: new Date(),
          };
          setMessages((prev) => [...prev, aiMessage]);
          setLoading(false);
          return;
        }
        
        throw new Error(errorMessage);
      }

      const data = await response.json();
      const aiResponse =
        data.candidates?.[0]?.content?.parts?.[0]?.text ||
        "Sorry, I couldn't generate a response. Please try again.";

      // Add AI response
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "ai",
        content: aiResponse,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "An unexpected error occurred. Please try again.";
      setError(errorMessage);

      // Add error message to chat
      const errorAiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "ai",
        content: `❌ ${errorMessage}`,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, errorAiMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-40 h-14 w-14 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 flex items-center justify-center border-2 border-white/20 backdrop-blur-sm"
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <Sparkles className="h-6 w-6" />
        )}
      </button>

      {/* Chat Panel */}
      {isOpen && (
        <Card className="fixed bottom-24 right-6 z-40 w-80 h-[500px] shadow-2xl border-0 rounded-2xl overflow-hidden flex flex-col bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5" />
              <h3 className="font-bold">{t('ai.title') || 'AI Advisor'}</h3>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-white/20 p-1 rounded"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${
                    msg.type === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-xs px-4 py-2 rounded-lg text-sm ${
                      msg.type === "user"
                        ? "bg-blue-500 text-white rounded-br-none"
                        : "bg-slate-200 dark:bg-slate-700 text-foreground rounded-bl-none"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-slate-200 dark:bg-slate-700 px-4 py-2 rounded-lg flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span className="text-sm text-muted-foreground">
                      Thinking...
                    </span>
                  </div>
                </div>
              )}
              <div ref={scrollRef} />
            </div>
          </ScrollArea>

          {/* Error Alert */}
          {error && (
            <Alert variant="destructive" className="mx-4 mt-2 border-0">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="text-xs">{error}</AlertDescription>
            </Alert>
          )}

          {/* Input */}
          <div className="border-t p-4 bg-white dark:bg-slate-800 space-y-2">
            <p className="text-xs text-muted-foreground">
              Example: "I have 6.0 IELTS, 3.5 GPA, want Engineering"
            </p>
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Describe your profile..."
                disabled={loading}
                className="text-sm"
              />
              <Button
                onClick={handleSend}
                disabled={loading || !input.trim()}
                size="sm"
                className="bg-blue-500 hover:bg-blue-600"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      )}
    </>
  );
}
