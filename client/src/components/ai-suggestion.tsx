import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Sparkles, AlertCircle } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import universities from "@/data/universities";
import path from "path";
import * as fs from "fs";

interface SuggestionResult {
  universities: string[];
  reasoning: string;
}

export default function AISuggestion() {
  const { t } = useI18n();
  const [apiKey, setApiKey] = useState("");
  const [userProfile, setUserProfile] = useState("");
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<SuggestionResult | null>(null);
  const [error, setError] = useState("");
  const [showApiKeyInput, setShowApiKeyInput] = useState(false);

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
      // Get all university names and basic info
      const universityList = universities
        .map(
          (uni) =>
            `${uni.name} (${uni.location}, ${uni.type}, Rank: ${uni.ranking})`
        )
        .join("\n");

      const prompt = `You are an expert education advisor. Based on the following user profile, recommend the 3-5 most suitable universities from the list provided.

USER PROFILE:
${userProfile}

AVAILABLE UNIVERSITIES:
${universityList}

Please respond in JSON format like this:
{
  "universities": ["University Name 1", "University Name 2", "University Name 3"],
  "reasoning": "Brief explanation of why these universities match the student's profile"
}

Only respond with valid JSON, no other text.`;

      const response = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" +
          apiKey,
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
                    text: prompt,
                  },
                ],
              },
            ],
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        if (response.status === 400 && errorData.error?.message) {
          throw new Error(errorData.error.message);
        }
        throw new Error("Failed to get suggestions. Please check your API key.");
      }

      const data = await response.json();

      if (
        !data.candidates ||
        !data.candidates[0] ||
        !data.candidates[0].content ||
        !data.candidates[0].content.parts ||
        !data.candidates[0].content.parts[0]
      ) {
        throw new Error("Invalid response from AI. Please try again.");
      }

      const content = data.candidates[0].content.parts[0].text;

      // Parse JSON from response
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error("Could not parse AI response. Please try again.");
      }

      const result = JSON.parse(jsonMatch[0]) as SuggestionResult;

      // Validate universities exist
      const validUniversities = result.universities.filter((name) =>
        universities.some(
          (uni) =>
            uni.name.toLowerCase() === name.toLowerCase() ||
            uni.name.includes(name)
        )
      );

      if (validUniversities.length === 0) {
        throw new Error("No matching universities found. Please try again.");
      }

      setSuggestions({
        universities: validUniversities,
        reasoning: result.reasoning || "Based on your profile preferences",
      });
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An error occurred";
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
    <section className="py-12 md:py-16 px-4 md:px-8 max-w-7xl mx-auto bg-gradient-to-b from-slate-50 to-white rounded-2xl border border-slate-200 shadow-sm">
      <div className="space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-3 mb-2">
            <Sparkles className="h-6 w-6 text-primary" />
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-foreground">
              Find Your Perfect University
            </h2>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Use AI powered by Google Gemini to get personalized university recommendations based on your profile, preferences, and academic goals.
          </p>
        </div>

        {/* Main Input Area */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* User Profile Section */}
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
              <button
                onClick={() => setShowApiKeyInput(!showApiKeyInput)}
                className="text-sm font-semibold text-blue-700 hover:text-blue-900 flex items-center gap-2"
              >
                {showApiKeyInput ? "▼" : "▶"} API Key Configuration
              </button>

              {showApiKeyInput && (
                <div className="space-y-2">
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
              )}
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
              className="w-full md:w-auto bg-primary hover:bg-primary/90 text-white font-semibold"
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
                        <span className="font-semibold">Location:</span>{" "}
                        {uni.location}
                      </div>
                      <div>
                        <span className="font-semibold">Ranking:</span>{" "}
                        {uni.ranking}
                      </div>
                      <div className="col-span-2">
                        <span className="font-semibold">Type:</span> {uni.type}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
