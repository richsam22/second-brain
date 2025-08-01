
  export const useOpenAI = () => {
    const summarizeNote = async (noteText) => {
      try {
        const res = await fetch('https://ollama-ai-backend-1.onrender.com/summarize', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ noteText }),
        });
        const data = await res.json();
        return data.response;
      } catch (error) {
        console.error('Summarize error:', error);
        throw error;
      }
    };

    const suggestTitle = async (noteText) => {
      try {
        const res = await fetch('https://ollama-ai-backend-1.onrender.com/title', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ noteText }),
        });
        const data = await res.json();
        return data.response;
      } catch (error) {
        console.error('Title suggestion error:', error);
        throw error;
      }
    };
    
  
    const suggestTags = async (noteText) => {
      try {
        const res = await fetch('https://ollama-ai-backend-1.onrender.com/tags', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ noteText }),
        });
        const data = await res.json();
        console.log('AI Suggested Tags Raw:', data.response);
        return data.response;
      } catch (error) {
        console.error('Tag suggestion error:', error);
        throw error;
      }
    };
  
    return { summarizeNote, suggestTitle, suggestTags };
  };
  
  
  
  
  
  

  