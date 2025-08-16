export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { searchInput } = req.query;
    
    if (!searchInput) {
      return res.status(400).json({ message: 'Search input is required' });
    }

    const apiUrl = process.env.CKKS_API_URL || process.env.API;
    
    if (!apiUrl) {
      console.error("No API URL configured. Set CKKS_API_URL or API environment variable.");
      return res.status(500).json({ message: "API configuration error" });
    }
    
    const response = await fetch(`${apiUrl}/search?searchInput=${searchInput}`, {
      method: 'POST',
    });

    if (response.ok) {
      const data = await response.json();
      res.status(200).json(data);
    } else {
      res.status(response.status).json({ message: 'Search failed' });
    }
  } catch (error) {
    console.error('Search API error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}