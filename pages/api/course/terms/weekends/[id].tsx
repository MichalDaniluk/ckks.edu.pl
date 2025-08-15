/**
 * Weekend schedule for course
 * 
 * Backend SQL Query:
 * SELECT t.* FROM termin t 
 * INNER JOIN szkolenie s ON s.termin_id = t.termin_id 
 * WHERE s.kurs_id = {id} 
 * AND t.forma_kursu = 'weekend' 
 * AND t.data_od >= CURDATE() 
 * AND t.zablokowany = 'N'
 * ORDER BY t.data_od ASC;
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
		
		const response = await fetch(`${apiUrl}/api/course/terms/weekends/${id}`);
		
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		
		const data = await response.json();
		res.status(200).json(data || []);
	}
	catch(error) {
		console.error('Weekend schedule error:', error);
		res.status(500).json({'error':'Niewłaściwy format danych'});
	}
}