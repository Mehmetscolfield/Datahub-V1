import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Sparkles, AlertCircle, ChevronDown, ChevronUp } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { useUniversities } from "@/lib/data";

interface SuggestionResult {
  universities: string[];
  reasoning: string;
}

export default function AISuggestion() {
  const { t } = useI18n();
  const universities = useUniversities();
  const [isExpanded, setIsExpanded] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const [userProfile, setUserProfile] = useState("");
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<SuggestionResult | null>(null);
  const [error, setError] = useState("");

  const handleSuggest = async () => {
    if (!apiKey.trim()) {
      setError("Please enter your Google Gemini API key");
      return;
    }

    if (!userProfile.trim()) {
      setError("Please tell us about yourself (GPA, preferences, etc.)");
      return;
    }

    setLoading(true);
    setError("");
    setSuggestions(null);

    try {
      // Validate API key format
      if (apiKey.length < 10) {
        throw new Error("API key seems too short. Please check you copied the full key.");
      }

      // Get all university names and basic info
      const universityList = universities
        .map(
          (uni) =>
            `${uni.name} (${uni.city}, Ranking: ${uni.ranking_kz || 'N/A'})`
        )
        .join("\n");

      const prompt = `You are an expert education advisor. Based on the following user profile, recommend the 3-5 most suitable universities from the list provided.

USER PROFILE:
${userProfile}

AVAILABLE UNIVERSITIES:
${universityList}

Please respond ONLY with valid JSON in this exact format:
{
  "universities": ["University Name 1", "University Name 2", "University Name 3"],
  "reasoning": "Brief explanation of why these universities match the student's profile"
}`;

      // Use the correct API endpoint format
      const apiUrl = `https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent`;
      
      const response = await fetch(`${apiUrl}?key=${encodeURIComponent(apiKey.trim())}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
          safetySettings: [
            {
              category: "HARM_CATEGORY_HARASSMENT",
              threshold: "BLOCK_NONE",
            },
            {
              category: "HARM_CATEGORY_HATE_SPEECH",
              threshold: "BLOCK_NONE",
            },
            {
              category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
              threshold: "BLOCK_NONE",
            },
            {
              category: "HARM_CATEGORY_DANGEROUS_CONTENT",
              threshold: "BLOCK_NONE",
            },
          ],
          generationConfig: {
            temperature: 0.1,
            topP: 0.8,
            maxOutputTokens: 500,
          },
        }),
      });

      console.log("Response status:", response.status);
      const responseText = await response.text();
      console.log("Raw response:", responseText);

      if (!response.ok) {
        let errorMessage = `API Error (${response.status})`;
        
        try {
          const errorData = JSON.parse(responseText);
          console.error("API Error Data:", errorData);
          
          if (errorData.error?.message) {
            errorMessage = errorData.error.message;
          }
          
          if (response.status === 401 || response.status === 403) {
            errorMessage = "Invalid or expired API key. Please get a new key from https://ai.google.dev/";
          } else if (response.status === 404) {
            errorMessage = "API endpoint not found. This might be a temporary issue or the model name changed.";
          } else if (response.status === 429) {
            errorMessage = "Rate limited. Please wait a few seconds and try again.";
          } else if (response.status === 500) {
            errorMessage = "Google API server error. Please try again in a moment.";
          }
        } catch (e) {
          console.error("Could not parse error response:", e);
        }
        
        throw new Error(errorMessage);
      }

      let data;
      try {
        data = JSON.parse(responseText);
      } catch (e) {
        console.error("JSON Parse error:", e);
        throw new Error("Invalid JSON response from API. The API may be temporarily unavailable.");
      }

      if (!data.candidates || !data.candidates[0]) {
        console.error("No candidates in response:", data);
        throw new Error("AI returned no suggestions. Please try with more specific preferences.");
      }

      const candidate = data.candidates[0];
      
      if (candidate.finishReason === "SAFETY") {
        throw new Error("Request was blocked by safety filters. Please rephrase your university preferences.");
      }

      if (!candidate.content?.parts?.[0]?.text) {
        console.error("Invalid response structure:", data);
        throw new Error("Could not extract recommendations from AI response.");
      }

      const content = candidate.content.parts[0].text;
      console.log("AI Response text:", content);

      // Parse JSON from response
      let result: SuggestionResult;
      try {
        // Try to find JSON in the response
        const jsonMatch = content.match(/\{[\s\S]*\}/);
        if (!jsonMatch) {
          throw new Error("No JSON found");
        }
        result = JSON.parse(jsonMatch[0]);
      } catch (parseError) {
        console.error("JSON Parse Error:", parseError);
        console.error("Response content:", content);
        throw new Error("Could not parse recommendations. Try again with simpler input.");
      }

      if (!result.universities || !Array.isArray(result.universities) || result.universities.length === 0) {
        throw new Error("Invalid response: no universities in recommendation");
      }

      // Validate universities exist
      const validUniversities = result.universities.filter((name) =>
        universities.some(
          (uni) =>
            uni.name.toLowerCase() === name.toLowerCase() ||
            uni.name.includes(name)
        )
      );

      if (validUniversities.length === 0) {
        // If no exact matches, show the response anyway
        setSuggestions({
          universities: result.universities.slice(0, 5),
          reasoning: result.reasoning || "Based on your profile preferences",
        });
        return;
      }

      setSuggestions({
        universities: validUniversities,
        reasoning: result.reasoning || "Based on your profile preferences",
      });
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An unexpected error occurred";
      console.error("Full error:", err);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const getSuggestedUniversities = () => {
    if (!suggestions) return [];
    return universities.filter((uni) =>
      suggestions.universities.some(
        (name) =>
          uni.name.toLowerCase() === name.toLowerCase() ||
          uni.name.includes(name)
      )
    );
  };

  return (
    <section className="py-6 md:py-8 px-4 md:px-8 max-w-7xl mx-auto">
      {/* Collapsible Header Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-4 rounded-lg bg-gradient-to-r from-primary/10 to-blue-500/10 border border-primary/30 hover:border-primary/60 transition-all"
      >
        <div className="flex items-center gap-3">
          <Sparkles className="h-6 w-6 text-primary" />
          <div className="text-left">
            <h3 className="font-bold text-lg text-foreground">
              Find Your Perfect University with AI
            </h3>
            <p className="text-sm text-muted-foreground">
              Click to get personalized recommendations
            </p>
          </div>
        </div>
        {isExpanded ? (
          <ChevronUp className="h-6 w-6 text-primary flex-shrink-0" />
        ) : (
          <ChevronDown className="h-6 w-6 text-primary flex-shrink-0" />
        )}
      </button>

      {/* Expandable Content */}
      {isExpanded && (
        <div className="mt-4 space-y-6 p-6 rounded-lg bg-gradient-to-b from-slate-50 to-white border border-slate-200 shadow-lg">
          <p className="text-muted-foreground">
            Share your profile and get AI-powered university recommendations based on your GPA, interests, and preferences.
          </p>

          {/* Main Input Area */}
          <div className="grid md:grid-cols-3 gap-6">
            {/* User Profile Input */}
            <div className="md:col-span-2 space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2 text-foreground">
                  Tell Us About Yourself
                </label>
                <Textarea
                  placeholder="Example: I have a 4.0 GPA and I'm interested in computer science. I prefer universities with high international rankings and good campus life. I want a university in a capital city."
                  value={userProfile}
                  onChange={(e) => setUserProfile(e.target.value)}
                  className="min-h-32 resize-none"
                />
                <p className="text-xs text-muted-foreground mt-2">
                  Include your GPA, field of interest, ranking preferences, location, and any other relevant details.
                </p>
              </div>

              {/* API Key Input */}
              <div className="space-y-3 bg-blue-50 p-4 rounded-lg border border-blue-200">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-blue-900">
                    Google Gemini API Key
                  </label>
                  <p className="text-xs text-slate-600">
                    Get your free API key from{" "}
                    <a
                      href="https://ai.google.dev"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline font-semibold"
                    >
                      Google AI Studio
                    </a>
                    . Your API key is only used for this session and never stored.
                  </p>
                  <Input
                    type="password"
                    placeholder="Paste your Google Gemini API key here"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    className="font-mono text-sm"
                  />
                </div>
              </div>

              {/* Error Alert */}
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {/* Submit Button */}
              <Button
                onClick={handleSuggest}
                disabled={loading}
                size="lg"
                className="w-full bg-primary hover:bg-primary/90 text-white font-semibold"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Get AI Recommendations
                  </>
                )}
              </Button>
            </div>

            {/* Info Card */}
            <div className="md:col-span-1">
              <Card className="p-4 bg-blue-50 border-blue-200 h-full flex flex-col justify-between">
                <div className="space-y-3">
                  <h3 className="font-semibold text-sm text-foreground">
                    How It Works
                  </h3>
                  <ul className="text-xs space-y-2 text-muted-foreground">
                    <li className="flex gap-2">
                      <span className="text-primary font-bold">1.</span>
                      <span>Share your profile (GPA, preferences, goals)</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-primary font-bold">2.</span>
                      <span>Add your Google Gemini API key</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-primary font-bold">3.</span>
                      <span>Get personalized recommendations instantly</span>
                    </li>
                  </ul>
                </div>
                <p className="text-xs text-slate-600 pt-4 border-t border-blue-200">
                  Free • Secure • Private • Your data is never stored
                </p>
              </Card>
            </div>
          </div>

          {/* Suggestions Results */}
          {suggestions && (
            <div className="space-y-6 pt-6 border-t border-slate-200">
              <div>
                <h3 className="text-xl font-bold text-foreground mb-2">
                  Recommended Universities
                </h3>
                <p className="text-muted-foreground mb-4">{suggestions.reasoning}</p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {getSuggestedUniversities().map((uni) => (
                  <Card
                    key={uni.id}
                    className="p-4 border-2 border-primary/30 hover:border-primary hover:shadow-lg transition-all"
                  >
                    <div className="space-y-2">
                      <h4 className="font-bold text-foreground">{uni.name}</h4>
                      <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                        <div>
                          <span className="font-semibold">City:</span> {uni.city}
                        </div>
                        <div>
                          <span className="font-semibold">Ranking:</span>{" "}
                          {uni.ranking_kz || "N/A"}
                        </div>
                        <div className="col-span-2">
                          <span className="font-semibold">Founded:</span>{" "}
                          {uni.founded || "N/A"}
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
