export const summarizeNote = async (noteText) => {
    const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  
    if (!apiKey) {
      return "🧪 [Mock Summary] No API key set. Returning placeholder summary.";
    }
  
    try {
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "user",
              content: `Summarize this note:\n\n${noteText}`,
            },
          ],
          max_tokens: 150,
        }),
      });
  
      const data = await res.json();
  
      if (data.error) {
        return `🧪 [Mock Summary] Error: ${data.error.message}`;
      }
  
      return data.choices?.[0]?.message?.content?.trim() || "🧪 [Mock Summary] No response from AI.";
    } catch (err) {
      return "🧪 [Mock Summary] Request failed. Showing placeholder.";
    }
  };
  