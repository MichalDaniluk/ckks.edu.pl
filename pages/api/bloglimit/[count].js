export default async function handler(req, res) {
  try {
    const { count } = req.query;
    
    const response = await fetch(`${process.env.API}/bloglimit/${count}`);
    
    if (response.ok) {
      const data = await response.json();
      res.status(200).json(data);
    } else {
      res.status(response.status).json({ message: 'Failed to fetch blog limit' });
    }
  } catch (error) {
    console.error('Blog limit API error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}