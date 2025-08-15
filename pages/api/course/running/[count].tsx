/**
 * Get running courses with limit
 * Proxies to local CKKS API
 */
export default async function handler(req, res) {
  const { count } = req.query;
  
  if (!count || isNaN(Number(count))) {
    return res.status(400).json({ error: 'Nieprawidłowy parametr count' });
  }
  
  try {
    const apiUrl = process.env.CKKS_API_URL || process.env.API || 'https://api.ckks.pl';
    const response = await fetch(`${apiUrl}/api/course/running/${count}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    // Get response text first to check if it's valid JSON
    const responseText = await response.text();
    
    // Check if response looks like HTML (403/404 error pages)
    if (responseText.trim().startsWith('<html') || responseText.trim().startsWith('<!DOCTYPE')) {
      throw new Error('Received HTML response instead of JSON (likely API error page)');
    }
    
    // Try to parse JSON
    let data;
    try {
      data = responseText ? JSON.parse(responseText) : [];
    } catch (parseError) {
      throw new Error(`Invalid JSON response: ${parseError.message}`);
    }
    res.status(200).json(data);
  } catch (error) {
    console.error('Running courses API error:', error);
    // Return empty array as fallback for frontend components
    res.status(200).json([]);
  }
}