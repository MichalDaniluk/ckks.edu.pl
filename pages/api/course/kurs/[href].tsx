/**
 * Get course by href/URL slug
 * Proxies to local CKKS API
 */
export default async function handler(req, res) {
  const { href } = req.query;
  
  if (!href) {
    return res.status(400).json({ error: 'Brak parametru href' });
  }
  
  try {
    const apiUrl = process.env.CKKS_API_URL || (process.env.NODE_ENV === 'production' ? 'https://api.ckks.pl' : 'http://localhost:3001');
    const response = await fetch(`${apiUrl}/api/course/kurs/${href}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('Course by href API error:', error);
    res.status(500).json({ error: 'Błąd pobierania kursu' });
  }
}