export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const response = await fetch(`${process.env.API}/newsletter`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req.body),
    });

    const data = await response.text();

    if (response.ok) {
      res.status(200).json(data);
    } else {
      res.status(response.status).json(data);
    }
  } catch (error) {
    console.error('Newsletter API error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}