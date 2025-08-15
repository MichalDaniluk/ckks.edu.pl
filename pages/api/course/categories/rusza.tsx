/**
 * Get courses from "rusza" category
 * Proxies to local CKKS API
 */
export default async function handler(req, res) {
  try {
    const apiUrl = process.env.CKKS_API_URL || process.env.API || 'https://api.ckks.pl';
    const response = await fetch(`${apiUrl}/api/course/rusza`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('Rusza courses API error:', error);
    res.status(500).json({ error: 'Błąd pobierania kursów kategorii "rusza"' });
  }
}