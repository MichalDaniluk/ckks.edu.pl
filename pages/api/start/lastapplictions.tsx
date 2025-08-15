import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const apiUrl = process.env.CKKS_API_URL || process.env.API;
    const response = await axios.get(`${apiUrl}/api/start/lastapplictions`, {
      params: req.query
    });
    res.status(200).json(response.data);
  } catch (error) {
    console.error('API Error:', error.response?.data || error.message);
    
    // Return empty array if API fails - this will hide the component
    res.status(200).json([]);
  }
}