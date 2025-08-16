export default async function handler(req, res) {
  try {
    const { placeId } = req.query;
    
    const apiUrl = process.env.CKKS_API_URL || process.env.API;
    
    if (!apiUrl) {
      console.error("No API URL configured. Set CKKS_API_URL or API environment variable.");
      return res.status(500).json({ message: "API configuration error" });
    }
    
    const response = await fetch(`${apiUrl}/course/map/${placeId}`);
    
    if (response.ok) {
      const data = await response.json();
      res.status(200).json(data);
    } else {
      res.status(response.status).json({ message: 'Failed to fetch course map' });
    }
  } catch (error) {
    console.error('Course map API error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}