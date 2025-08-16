export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const apiUrl = process.env.CKKS_API_URL || process.env.API;
    
    if (!apiUrl) {
      console.error("No API URL configured. Set CKKS_API_URL or API environment variable.");
      return res.status(500).json({ message: "API configuration error" });
    }
    
    const response = await fetch(`${apiUrl}/newsletter`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req.body),
    });

    const data = await response.text();

    if (response.ok) {
      res.status(200).json(data);
    } else {
      res.status(response.status).json(data);
    }
  } catch (error) {
    console.error('Newsletter API error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}