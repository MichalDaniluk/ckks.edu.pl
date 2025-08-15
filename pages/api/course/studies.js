export default async function handler(req, res) {
  try {
    const response = await fetch(`${process.env.API}/course/studies`);
    
    if (response.ok) {
      const data = await response.json();
      res.status(200).json(data);
    } else {
      res.status(response.status).json({ message: 'Failed to fetch studies courses' });
    }
  } catch (error) {
    console.error('Studies courses API error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}