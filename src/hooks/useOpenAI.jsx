export const useOpenAI = () => {
    const summarizeNote = async (noteText) => {
      try {
        const res = await fetch('http://localhost:11434/api/generate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            model: 'mistral',
            prompt: `Summarize the following:\n\n${noteText}`,
            stream: false
          })
        });
  
        const text = await res.text(); // 👈 read plain text response
        const parsed = JSON.parse(text); // now parse cleanly
        return parsed.response; // or parsed.text depending on your Ollama output structure
      } catch (error) {
        console.error('Ollama API Error:', error);
        throw error;
      }
    };
  
    const sendPrompt = async (prompt, system = '') => {
      try {
        const res = await fetch('http://localhost:11434/api/generate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            model: 'mistral',
            prompt,
            system,
            stream: false
          })
        });
  
        const text = await res.text(); // 👈 read plain text
        const parsed = JSON.parse(text);
        return parsed.response; // or whatever key contains the output
      } catch (error) {
        console.error('Ollama API Error:', error);
        throw error;
      }
    };

    const suggestTags = async (noteText) => {
        const prompt = `Suggest 3 to 7 short, relevant tags (no hashtags) for this note:\n\n${noteText}`;
        const systemMessage = 'You are an assistant that helps categorize notes with helpful tags. Return only a comma-separated list of tags.';
        const response = await sendPrompt(prompt, systemMessage);
        console.log('AI Suggested Tags Raw:', response);
        return response;
      };
      
      
  
    return { summarizeNote, sendPrompt, suggestTags };
  };
  
  
  
  
  
  
  

//   console.log("OpenAI Key:", import.meta.env.VITE_OPENAI_API_KEY);

  