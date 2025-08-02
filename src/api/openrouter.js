import axios from 'axios';

export const generateAIContent = async (prompt) => {
  try {
    const response = await axios.post('/api/ai', { prompt });
    return response.data.content;
  } catch (error) {
    console.error('AI Proxy Error:', error);
    return null;
  }
};
