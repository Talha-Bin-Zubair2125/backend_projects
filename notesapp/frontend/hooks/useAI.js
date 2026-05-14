import { useState } from "react";

const useAI = () => {
  const [loading, setLoading] = useState(false);

  // for add note page — generates or refines based on input
  const generateNote = async (userPrompt = "", title = "", content = "") => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3000/api/ai/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "generate",
          userPrompt,
          title,
          content,
        }),
      });
      const result = await response.json();
      return {
        title: result.title || "",
        content: result.content || "",
      };
    } catch (error) {
      console.error("AI generation failed:", error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // for update note page — improves or regenerates based on userPrompt
  const improveNote = async (
    existingTitle,
    existingContent,
    userPrompt = "",
  ) => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3000/api/ai/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "improve",
          title: existingTitle,
          content: existingContent,
          userPrompt, // ← if user typed new topic, use it ✅
        }),
      });
      const result = await response.json();
      return {
        title: result.title || "",
        content: result.content || "",
      };
    } catch (error) {
      console.error("AI improvement failed:", error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { generateNote, improveNote, loading };
};

export default useAI;
