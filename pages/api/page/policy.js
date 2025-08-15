export default async function handler(req, res) {
  try {
    const response = await fetch(`${process.env.API}/page/policy`);
    
    if (response.ok) {
      const data = await response.json();
      res.status(200).json(data);
    } else {
      res.status(response.status).json({ message: 'Failed to fetch policy page' });
    }
  } catch (error) {
    console.error('Policy page API error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}