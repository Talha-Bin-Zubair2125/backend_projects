const express = require("express");
const router = express.Router();

router.post("/generate", async (req, res) => {
  const { type, title, content, userPrompt } = req.body;

  let prompt;

  if (type === "generate") {
    if (userPrompt) {
      prompt = `You are a note writing assistant.
                     Write a detailed and informative note about: ${userPrompt}
                     
                     IMPORTANT: 
                     - content must be a single plain paragraph string
                     - do NOT explain what you are doing
                     - do NOT mention JSON or formatting instructions
                     - just write the actual note content
                     Return JSON only, no extra text, no backticks, no markdown:
                     { "title": "your title here", "content": "your plain text note content here" }`;
    } else if (title && content) {
      prompt = `You are a note writing assistant.
                     Improve this note by making the title more catchy and the content more detailed and informative.
                     
                     Current title: ${title}
                     Current content: ${content}
                     
                     IMPORTANT:
                     - content must be a single plain paragraph string
                     - do NOT explain what you are doing
                     - do NOT mention JSON or formatting instructions
                     - just write the actual improved note content
                     Return JSON only, no extra text, no backticks, no markdown:
                     { "title": "your improved title here", "content": "your improved plain text content here" }`;
    } else {
      prompt = `You are a note writing assistant.
                     Write a helpful and interesting note on any topic of your choice.
                     
                     IMPORTANT:
                     - content must be a single plain paragraph string
                     - do NOT explain what you are doing
                     - do NOT mention JSON or formatting instructions
                     - just write the actual note content
                     Return JSON only, no extra text, no backticks, no markdown:
                     { "title": "your title here", "content": "your plain text note content here" }`;
    }
  } else if (type === "improve") {
    if (userPrompt) {
      prompt = `You are a note writing assistant.
                     The user wants you to: ${userPrompt}
                     
                     Current title: ${title}
                     Current content: ${content}
                     
                     Follow the user instruction and rewrite the note accordingly.
                     IMPORTANT:
                     - content must be a single plain paragraph string
                     - do NOT explain what you are doing
                     - do NOT mention JSON or formatting instructions
                     - just write the actual rewritten note content
                     Return JSON only, no extra text, no backticks, no markdown:
                     { "title": "your rewritten title here", "content": "your rewritten plain text content here" }`;
    } else {
      prompt = `You are a note writing assistant.
                     Improve this note by making the title more catchy and the content more detailed and informative.
                     
                     Current title: ${title}
                     Current content: ${content}
                     
                     IMPORTANT:
                     - content must be a single plain paragraph string
                     - do NOT explain what you are doing
                     - do NOT mention JSON or formatting instructions
                     - just write the actual improved note content
                     Return JSON only, no extra text, no backticks, no markdown:
                     { "title": "your improved title here", "content": "your improved plain text content here" }`;
    }
  }

  try {
    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [{ role: "user", content: prompt }],
          max_tokens: 1000,
        }),
      },
    );

    const data = await response.json();

    if (!data.choices || data.choices.length === 0) {
      return res.status(500).json({ message: "AI returned empty response" });
    }

    const rawText = data.choices[0].message.content;
    const cleaned = rawText.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(cleaned);

    // force content to always be a plain string
    const result = {
      title: String(parsed.title || ""),
      content:
        typeof parsed.content === "object"
          ? Object.values(parsed.content)
              .map((val) =>
                typeof val === "string" ? val : JSON.stringify(val),
              )
              .join(" ")
          : String(parsed.content || ""),
    };

    res.json(result); // { title: string, content: string } ✅
  } catch (error) {
    console.error("AI Error:", error);
    res.status(500).json({ message: "AI generation failed" });
  }
});

module.exports = router;
