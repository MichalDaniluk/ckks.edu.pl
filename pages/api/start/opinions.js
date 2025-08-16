export default async function handler(req, res) {
  try {
    const apiUrl = process.env.CKKS_API_URL || process.env.API;
    
    if (!apiUrl) {
      console.error('No API URL configured. Set CKKS_API_URL or API environment variable.');
      return res.status(500).json({ message: 'API configuration error' });
    }
    
    const response = await fetch(`${apiUrl}/start/opinions`);
    
    if (response.ok) {
      const data = await response.json();
      res.status(200).json(data);
    } else {
      res.status(response.status).json({ message: 'Failed to fetch opinions' });
    }
  } catch (error) {
    console.error('Opinions API error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}