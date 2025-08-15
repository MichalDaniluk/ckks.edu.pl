/**
 * Get all visible courses
 * Proxies to local CKKS API
 */
export default async function handler(req, res) {
  try {
    const apiUrl = process.env.CKKS_API_URL || process.env.API || 'https://api.ckks.pl';
    const response = await fetch(`${apiUrl}/api/course`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    // Check if response is JSON
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      throw new Error(`Expected JSON response, got: ${contentType}`);
    }
    
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('Course API error:', error);
    // Return empty array as fallback for frontend components
    res.status(200).json([]);
  }
}