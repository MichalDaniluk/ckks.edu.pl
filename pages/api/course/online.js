export default async function handler(req, res) {
  try {
    const response = await fetch(`${process.env.API}/course/online`);
    
    if (response.ok) {
      const data = await response.json();
      res.status(200).json(data);
    } else {
      res.status(response.status).json({ message: 'Failed to fetch online courses' });
    }
  } catch (error) {
    console.error('Online courses API error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}