export default async function handler(req, res) {
  try {
    const { _limit } = req.query;
    const limitParam = _limit ? `?_limit=${_limit}` : '';
    
    const response = await fetch(`${process.env.API}/start/tabs${limitParam}`);
    
    if (response.ok) {
      const data = await response.json();
      res.status(200).json(data);
    } else {
      res.status(response.status).json({ message: 'Failed to fetch start tabs' });
    }
  } catch (error) {
    console.error('Start tabs API error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}