/**
 * Get all instructors
 * Proxies to local CKKS API
 */
export default async function handler(req, res) {
  try {
    const response = await fetch(`${process.env.CKKS_API_URL || 'http://localhost:3001'}/api/instructors`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('Instructors API error:', error);
    res.status(500).json({ error: 'Błąd pobierania instruktorów' });
  }
}