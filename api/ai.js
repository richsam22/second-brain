export default async function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method Not Allowed' });
    }
  
    const { prompt } = req.body;
  
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }
  
    try {
      const openRes = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'mistralai/mistral-7b-instruct',
          messages: [
            { role: 'system', content: 'You are a helpful assistant that summarizes and tags notes.' },
            { role: 'user', content: prompt },
          ]
        })
      });
  
      const data = await openRes.json();
  
      if (!data.choices || !data.choices[0]?.message?.content) {
        return res.status(500).json({ error: 'Invalid AI response' });
      }
  
      return res.status(200).json({ content: data.choices[0].message.content });
  
    } catch (error) {
      console.error('API Proxy Error:', error);
      return res.status(500).json({ error: 'AI proxy failed' });
    }
  }
  