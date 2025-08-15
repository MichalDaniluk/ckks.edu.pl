export default async function handler(req, res) {
  try {
    const { pid } = req.query;
    
    const response = await fetch(`${process.env.API}/instructor/course/${pid}`);
    
    if (response.ok) {
      const data = await response.json();
      res.status(200).json(data);
    } else {
      res.status(response.status).json({ message: 'Failed to fetch course instructors' });
    }
  } catch (error) {
    console.error('Course instructors API error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}