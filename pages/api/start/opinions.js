export default async function handler(req, res) {
  try {
    const response = await fetch(`${process.env.API}/start/opinions`);
    
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