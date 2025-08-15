export default async function handler(req, res) {
  try {
    const { placeId } = req.query;
    
    const response = await fetch(`${process.env.API}/course/map/${placeId}`);
    
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