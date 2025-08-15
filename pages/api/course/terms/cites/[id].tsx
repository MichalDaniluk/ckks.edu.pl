/**
 * Course cities/locations
 * 
 * Backend SQL Query:
 * SELECT DISTINCT t.miejscowosc 
 * FROM termin t 
 * INNER JOIN szkolenie s ON s.termin_id = t.termin_id 
 * WHERE s.kurs_id = {id} 
 * AND t.zablokowany = 'N';
 */
export default async function handler(req, res) {
	const { id } = req.query;
	
	if (!id) {
		return res.status(400).json({'error':'Brak identyfikatora kursu'});
	}
	
	try {
		const apiUrl = process.env.CKKS_API_URL || process.env.API;
		if (!apiUrl) {
			throw new Error('API URL not configured');
		}
		
		const response = await fetch(`${apiUrl}/api/course/terms/cites/${id}`);
		
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		
		const data = await response.json();
		res.status(200).json(data || []);
	}
	catch(error) {
		console.error('Course cities error:', error);
		res.status(500).json({'error':'Niewłaściwy format danych'});
	}
}