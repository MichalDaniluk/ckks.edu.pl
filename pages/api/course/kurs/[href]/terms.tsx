/**
 * Get course terms by href/URL slug
 * Proxies to local CKKS API
 */
export default async function handler(req, res) {
  const { href } = req.query;
  
  if (!href) {
    return res.status(400).json({ error: 'Brak parametru href' });
  }
  
  try {
    const response = await fetch(`${process.env.CKKS_API_URL || 'http://localhost:3001'}/api/course/kurs/${href}/terms`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('Course terms API error:', error);
    res.status(500).json({ error: 'Błąd pobierania terminów kursu' });
  }
}