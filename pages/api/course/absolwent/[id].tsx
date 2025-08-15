/**
 * Course graduates
 * 
 * Backend SQL Query:
 * SELECT sk.*, s.*, t.* FROM szkolenie_kursant sk 
 * INNER JOIN szkolenie s ON s.szkolenie_id = sk.szkolenie_id 
 * INNER JOIN termin t ON s.termin_id = t.termin_id 
 * WHERE s.kurs_id = {id} 
 * AND sk.status = 'Absolwent' 
 * ORDER BY t.data_do DESC 
 * LIMIT 20;
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
		
		const response = await fetch(`${apiUrl}/api/course/absolwent/${id}`);
		
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		
		// Check if response is JSON
		const contentType = response.headers.get('content-type');
		if (!contentType || !contentType.includes('application/json')) {
			throw new Error(`Expected JSON response, got: ${contentType}`);
		}
		
		const data = await response.json();
		res.status(200).json(data || []);
	}
	catch(error) {
		console.error('Course graduates error:', error);
		// Return empty array as fallback for frontend components
		res.status(200).json([]);
	}
}