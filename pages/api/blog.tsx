export default async function handler(req, res) {
	try {
		const apiUrl = process.env.CKKS_API_URL || process.env.API || 'https://api.ckks.pl';
		const response = await fetch(`${apiUrl}/api/blog`);
		const data = await response.json();
		res.status(200).json(data);
	}
	catch(error) {
		console.error('Blog API error:', error);
		res.status(500).json({'error':'Błąd pobierania blogów'});
	}
}
